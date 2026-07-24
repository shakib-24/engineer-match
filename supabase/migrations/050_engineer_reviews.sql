-- Engineer Review/Rating System, part 2/2: the review table itself, the
-- engineer's global visibility toggle, and notification producers.
--
-- President's requirement (already detailed in AGENTS.md's active task):
-- after a completed application (049_application_completion_status.sql's
-- new 'completed' status), the company that owns the opportunity may rate
-- the engineer (1-5 stars + required comment). The engineer may reply once.
-- The engineer controls exactly one GLOBAL show/hide switch for all their
-- reviews -- there is no per-review visibility control anywhere in this
-- design, by explicit requirement.
--
-- Model: one row per completed application (application_id is unique), with
-- the engineer's reply living on the same row rather than a child table,
-- mirroring how application_training_proposal (021) is a 1:1 extension of
-- applications rather than a separate reply table.

CREATE TABLE IF NOT EXISTS public.engineer_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES public.applications (id) ON DELETE RESTRICT,
    opportunity_id UUID NOT NULL REFERENCES public.opportunities (id) ON DELETE RESTRICT,
    company_user_id UUID NOT NULL REFERENCES public.users (id) ON DELETE RESTRICT,
    engineer_user_id UUID NOT NULL REFERENCES public.users (id) ON DELETE RESTRICT,
    rating INTEGER NOT NULL,
    comment TEXT NOT NULL,
    engineer_reply TEXT,
    replied_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_engineer_reviews_rating CHECK (rating BETWEEN 1 AND 5),
    CONSTRAINT chk_engineer_reviews_comment_length CHECK (char_length(comment) BETWEEN 1 AND 2000),
    CONSTRAINT chk_engineer_reviews_reply_length CHECK (engineer_reply IS NULL OR char_length(engineer_reply) BETWEEN 1 AND 2000)
);

-- One review per completed application -- the DB-level duplicate-review
-- block (president's explicit requirement: "duplicate reviews must be
-- blocked at DB level").
CREATE UNIQUE INDEX IF NOT EXISTS uq_engineer_reviews_application ON public.engineer_reviews (application_id);
CREATE INDEX IF NOT EXISTS idx_engineer_reviews_engineer ON public.engineer_reviews (engineer_user_id);
CREATE INDEX IF NOT EXISTS idx_engineer_reviews_company ON public.engineer_reviews (company_user_id);

ALTER TABLE public.engineer_reviews ENABLE ROW LEVEL SECURITY;

DROP TRIGGER IF EXISTS trg_engineer_reviews_updated_at ON public.engineer_reviews;
CREATE TRIGGER trg_engineer_reviews_updated_at
    BEFORE UPDATE ON public.engineer_reviews
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

-- Global review-visibility switch. Exactly one boolean, exactly like
-- engineer_profiles.is_public's existing precedent -- no per-review flag
-- exists anywhere (explicit requirement). No new RLS policy is needed on
-- engineer_profiles itself: it's just one more column on an already-policied
-- table, already covered by engineer_profiles_select_*/_update_own
-- (023_profile_policies.sql). This must run before engineer_reviews_select_public
-- below, which references it -- added here, immediately after the table this
-- migration owns is fully set up, rather than lower in the file where an
-- earlier version of this migration placed it (that ordering bug produced
-- "ERROR 42703: column ep.show_reviews does not exist" against a live
-- database, since engineer_reviews_select_public's CREATE POLICY ran before
-- this ADD COLUMN did).
ALTER TABLE public.engineer_profiles ADD COLUMN IF NOT EXISTS show_reviews BOOLEAN NOT NULL DEFAULT TRUE;

-- Column-lock helpers, mirroring private.users_protected_fields_unchanged
-- (029_remaining_policies.sql): rather than a BEFORE UPDATE trigger, each
-- role's UPDATE policy WITH CHECK calls a SECURITY DEFINER function that
-- re-reads the row's *current* stored values (bypassing RLS, hardcoded to
-- look up by the row's own id) and asserts every field outside that role's
-- allowed edit set comes back unchanged. This is what actually enforces
-- "Company cannot edit the Engineer reply" / "Engineer cannot edit Company
-- rating/comment" -- WITH CHECK alone (without this) cannot compare
-- old-vs-new values on an UPDATE.
CREATE OR REPLACE FUNCTION private.engineer_review_company_fields_locked(
    p_review_id UUID,
    p_application_id UUID,
    p_opportunity_id UUID,
    p_company_user_id UUID,
    p_engineer_user_id UUID,
    p_engineer_reply TEXT,
    p_replied_at TIMESTAMPTZ
)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.engineer_reviews
        WHERE id = p_review_id
          AND application_id = p_application_id
          AND opportunity_id = p_opportunity_id
          AND company_user_id = p_company_user_id
          AND engineer_user_id = p_engineer_user_id
          AND engineer_reply IS NOT DISTINCT FROM p_engineer_reply
          AND replied_at IS NOT DISTINCT FROM p_replied_at
    );
$$;

REVOKE ALL ON FUNCTION private.engineer_review_company_fields_locked(UUID, UUID, UUID, UUID, UUID, TEXT, TIMESTAMPTZ) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.engineer_review_company_fields_locked(UUID, UUID, UUID, UUID, UUID, TEXT, TIMESTAMPTZ) TO authenticated;

CREATE OR REPLACE FUNCTION private.engineer_review_engineer_fields_locked(
    p_review_id UUID,
    p_application_id UUID,
    p_opportunity_id UUID,
    p_company_user_id UUID,
    p_engineer_user_id UUID,
    p_rating INTEGER,
    p_comment TEXT
)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.engineer_reviews
        WHERE id = p_review_id
          AND application_id = p_application_id
          AND opportunity_id = p_opportunity_id
          AND company_user_id = p_company_user_id
          AND engineer_user_id = p_engineer_user_id
          AND rating = p_rating
          AND comment = p_comment
    );
$$;

REVOKE ALL ON FUNCTION private.engineer_review_engineer_fields_locked(UUID, UUID, UUID, UUID, UUID, INTEGER, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.engineer_review_engineer_fields_locked(UUID, UUID, UUID, UUID, UUID, INTEGER, TEXT) TO authenticated;

-- INSERT: company owns the opportunity, the application is really this
-- engineer's, and the work is really 'completed' (049) -- all three
-- eligibility rules from the president's requirement collapse into one
-- EXISTS, the same join-through-opportunities idiom applications_select_poster
-- (025_application_policies.sql) already uses for "is the current user the
-- company that owns this application". uq_engineer_reviews_application above
-- is what actually blocks a second review at the DB level; this policy only
-- gates who may attempt the insert at all.
DROP POLICY IF EXISTS engineer_reviews_insert_company ON public.engineer_reviews;
CREATE POLICY engineer_reviews_insert_company
    ON public.engineer_reviews
    FOR INSERT
    TO authenticated
    WITH CHECK (
        company_user_id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'COMPANY'
        AND EXISTS (
            SELECT 1
            FROM public.applications a
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE a.id = engineer_reviews.application_id
              AND a.applicant_id = engineer_reviews.engineer_user_id
              AND a.status = 'completed'
              AND o.posted_by = (SELECT auth.uid())
              AND o.id = engineer_reviews.opportunity_id
        )
    );

-- SELECT: the authoring company always sees its own submitted review
-- (explicit requirement -- the engineer's visibility toggle controls public/
-- profile display, never the reviewing company's own access to what it wrote).
DROP POLICY IF EXISTS engineer_reviews_select_own_company ON public.engineer_reviews;
CREATE POLICY engineer_reviews_select_own_company
    ON public.engineer_reviews
    FOR SELECT
    TO authenticated
    USING (company_user_id = (SELECT auth.uid()));

-- SELECT: the reviewed engineer always sees reviews about themselves,
-- regardless of their own show_reviews setting (explicit requirement --
-- the toggle hides reviews from others, never from the engineer themselves).
DROP POLICY IF EXISTS engineer_reviews_select_own_engineer ON public.engineer_reviews;
CREATE POLICY engineer_reviews_select_own_engineer
    ON public.engineer_reviews
    FOR SELECT
    TO authenticated
    USING (engineer_user_id = (SELECT auth.uid()));

-- SELECT: any other authenticated viewer (other companies browsing Engineer
-- Search / Engineer Detail) only when the engineer has opted in via the
-- global engineer_profiles.show_reviews switch added below. This is the one
-- and only place that switch is consulted -- there is no per-review flag.
DROP POLICY IF EXISTS engineer_reviews_select_public ON public.engineer_reviews;
CREATE POLICY engineer_reviews_select_public
    ON public.engineer_reviews
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.engineer_profiles ep
            WHERE ep.id = engineer_reviews.engineer_user_id
              AND ep.show_reviews = TRUE
        )
    );

DROP POLICY IF EXISTS engineer_reviews_select_admin ON public.engineer_reviews;
CREATE POLICY engineer_reviews_select_admin
    ON public.engineer_reviews
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- UPDATE: company may edit its own rating/comment after posting (recommended
-- default per the requirement doc, absent a stated immutability rule) --
-- the lock helper above forbids it from ever touching engineer_reply/
-- replied_at or reassigning the row to a different application/opportunity/
-- engineer.
DROP POLICY IF EXISTS engineer_reviews_update_company ON public.engineer_reviews;
CREATE POLICY engineer_reviews_update_company
    ON public.engineer_reviews
    FOR UPDATE
    TO authenticated
    USING (
        company_user_id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'COMPANY'
    )
    WITH CHECK (
        company_user_id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'COMPANY'
        AND (
            SELECT private.engineer_review_company_fields_locked(
                id, application_id, opportunity_id, company_user_id, engineer_user_id, engineer_reply, replied_at
            )
        )
    );

-- UPDATE: engineer may only write/edit their own engineer_reply (+ the
-- replied_at the app sets alongside it) -- the lock helper forbids touching
-- rating/comment or reassigning the row.
DROP POLICY IF EXISTS engineer_reviews_update_engineer ON public.engineer_reviews;
CREATE POLICY engineer_reviews_update_engineer
    ON public.engineer_reviews
    FOR UPDATE
    TO authenticated
    USING (
        engineer_user_id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'ENGINEER'
    )
    WITH CHECK (
        engineer_user_id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'ENGINEER'
        AND (
            SELECT private.engineer_review_engineer_fields_locked(
                id, application_id, opportunity_id, company_user_id, engineer_user_id, rating, comment
            )
        )
    );

DROP POLICY IF EXISTS engineer_reviews_admin_update ON public.engineer_reviews;
CREATE POLICY engineer_reviews_admin_update
    ON public.engineer_reviews
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

-- No DELETE policy for anyone (including admin), matching applications'
-- "history is never physically deleted" convention -- no delete UI is part
-- of this feature (president's requirement doc, explicit: no delete UI
-- initially).

-- Notification producers, mirroring private.notify_new_message() exactly
-- (036/038_*.sql): SECURITY DEFINER trigger, no client-facing INSERT policy
-- on notifications ever (027_notification_favorite_policies.sql), ON
-- CONFLICT targets the real live composite index (user_id, event_key) per
-- 038's documented migration/live-DB drift lesson, not the single-column
-- index the notifications table's own migration file (013) claims to have.
ALTER TABLE public.notifications DROP CONSTRAINT IF EXISTS chk_notifications_type;
ALTER TABLE public.notifications
    ADD CONSTRAINT chk_notifications_type
    CHECK (
        type IN (
            'application_received', 'application_status_changed', 'new_message', 'opportunity_closed',
            'review_received', 'review_reply_received'
        )
    );

CREATE OR REPLACE FUNCTION private.notify_new_review()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog
AS $$
BEGIN
    INSERT INTO public.notifications
        (user_id, type, title, body, related_entity_type, related_entity_id, event_key)
    VALUES (
        NEW.engineer_user_id,
        'review_received',
        '新しい評価が届きました',
        left(NEW.comment, 255),
        'engineer_review',
        NEW.id,
        'review:' || NEW.id
    )
    ON CONFLICT (user_id, event_key) DO NOTHING;

    RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION private.notify_new_review() FROM PUBLIC;

DROP TRIGGER IF EXISTS trg_notify_new_review ON public.engineer_reviews;
CREATE TRIGGER trg_notify_new_review
    AFTER INSERT ON public.engineer_reviews
    FOR EACH ROW
    EXECUTE FUNCTION private.notify_new_review();

CREATE OR REPLACE FUNCTION private.notify_new_review_reply()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog
AS $$
BEGIN
    IF OLD.engineer_reply IS NULL AND NEW.engineer_reply IS NOT NULL THEN
        INSERT INTO public.notifications
            (user_id, type, title, body, related_entity_type, related_entity_id, event_key)
        VALUES (
            NEW.company_user_id,
            'review_reply_received',
            '評価への返信が届きました',
            left(NEW.engineer_reply, 255),
            'engineer_review',
            NEW.id,
            'review_reply:' || NEW.id
        )
        ON CONFLICT (user_id, event_key) DO NOTHING;
    END IF;

    RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION private.notify_new_review_reply() FROM PUBLIC;

DROP TRIGGER IF EXISTS trg_notify_new_review_reply ON public.engineer_reviews;
CREATE TRIGGER trg_notify_new_review_reply
    AFTER UPDATE ON public.engineer_reviews
    FOR EACH ROW
    EXECUTE FUNCTION private.notify_new_review_reply();
