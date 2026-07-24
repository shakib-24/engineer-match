-- Engineer Profile full restoration, part 7/10: 職務経歴 (work experience),
-- restoring WORK_EXPERIENCE[] from the old UI-only mock
-- (src/constants/engineer-profile.ts, pre-a1ecd75) and the deleted
-- ExperienceTimeline.tsx / EngineerProfileExperience.tsx components.
--
-- engineer_work_experiences carries genuinely mutable fields, so owner gets
-- full CRUD (select/insert/update/delete), matching the user_skills shape
-- (029_remaining_policies.sql). engineer_work_experience_technologies is a
-- pure child tag list (no update), gated entirely through its parent row's
-- ownership/visibility via EXISTS -- mirrors skill_assessment_answers gating
-- through skill_assessment_attempts (030_skill_assessments.sql).
--
-- period is free text (e.g. "2022年4月 - 現在"), matching the old
-- ProfileEditForm's plain <Input> for this field -- never structured dates.

CREATE TABLE IF NOT EXISTS public.engineer_work_experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users (id) ON DELETE CASCADE,
    company_name VARCHAR(100) NOT NULL,
    position VARCHAR(100),
    period VARCHAR(100),
    employment_type VARCHAR(20),
    summary TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_engineer_work_experiences_employment_type CHECK (
        employment_type IN ('FULL_TIME', 'CONTRACT', 'FREELANCE', 'DISPATCH', 'PART_TIME')
    ),
    CONSTRAINT chk_engineer_work_experiences_summary_length CHECK (char_length(summary) <= 2000)
);

CREATE INDEX IF NOT EXISTS idx_engineer_work_experiences_user ON public.engineer_work_experiences (user_id, display_order);

DROP TRIGGER IF EXISTS trg_engineer_work_experiences_updated_at ON public.engineer_work_experiences;
CREATE TRIGGER trg_engineer_work_experiences_updated_at
    BEFORE UPDATE ON public.engineer_work_experiences
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.engineer_work_experience_technologies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    work_experience_id UUID NOT NULL REFERENCES public.engineer_work_experiences (id) ON DELETE CASCADE,
    technology VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_engineer_work_experience_technologies ON public.engineer_work_experience_technologies (work_experience_id, technology);

ALTER TABLE public.engineer_work_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engineer_work_experience_technologies ENABLE ROW LEVEL SECURITY;

-- engineer_work_experiences ---------------------------------------------------

DROP POLICY IF EXISTS engineer_work_experiences_select_own ON public.engineer_work_experiences;
CREATE POLICY engineer_work_experiences_select_own
    ON public.engineer_work_experiences
    FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS engineer_work_experiences_select_public_engineer ON public.engineer_work_experiences;
CREATE POLICY engineer_work_experiences_select_public_engineer
    ON public.engineer_work_experiences
    FOR SELECT
    TO authenticated
    USING (
        (SELECT private.is_active_engineer(engineer_work_experiences.user_id))
        AND (SELECT private.has_public_engineer_profile(engineer_work_experiences.user_id))
    );

DROP POLICY IF EXISTS engineer_work_experiences_select_applicant_company ON public.engineer_work_experiences;
CREATE POLICY engineer_work_experiences_select_applicant_company
    ON public.engineer_work_experiences
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.applications a
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE a.applicant_id = engineer_work_experiences.user_id
              AND o.posted_by = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS engineer_work_experiences_select_admin ON public.engineer_work_experiences;
CREATE POLICY engineer_work_experiences_select_admin
    ON public.engineer_work_experiences
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_work_experiences_insert_own ON public.engineer_work_experiences;
CREATE POLICY engineer_work_experiences_insert_own
    ON public.engineer_work_experiences
    FOR INSERT
    TO authenticated
    WITH CHECK (
        user_id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'ENGINEER'
    );

DROP POLICY IF EXISTS engineer_work_experiences_admin_insert ON public.engineer_work_experiences;
CREATE POLICY engineer_work_experiences_admin_insert
    ON public.engineer_work_experiences
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_work_experiences_update_own ON public.engineer_work_experiences;
CREATE POLICY engineer_work_experiences_update_own
    ON public.engineer_work_experiences
    FOR UPDATE
    TO authenticated
    USING (user_id = (SELECT auth.uid()))
    WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS engineer_work_experiences_admin_update ON public.engineer_work_experiences;
CREATE POLICY engineer_work_experiences_admin_update
    ON public.engineer_work_experiences
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_work_experiences_delete_own ON public.engineer_work_experiences;
CREATE POLICY engineer_work_experiences_delete_own
    ON public.engineer_work_experiences
    FOR DELETE
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS engineer_work_experiences_admin_delete ON public.engineer_work_experiences;
CREATE POLICY engineer_work_experiences_admin_delete
    ON public.engineer_work_experiences
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- engineer_work_experience_technologies ---------------------------------------
-- Gated entirely through the parent row -- no direct user_id column here.
-- Each policy explicitly replicates the matching parent-table condition
-- (rather than relying on the parent's own RLS implicitly applying inside
-- this EXISTS subquery) to keep the visibility rule readable in one place per
-- policy, matching this codebase's established explicit style (e.g.
-- skill_assessment_questions_select_active re-deriving sa.is_active = TRUE
-- rather than assuming it, 030_skill_assessments.sql).

DROP POLICY IF EXISTS engineer_work_experience_technologies_select_own ON public.engineer_work_experience_technologies;
CREATE POLICY engineer_work_experience_technologies_select_own
    ON public.engineer_work_experience_technologies
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.engineer_work_experiences we
            WHERE we.id = engineer_work_experience_technologies.work_experience_id
              AND we.user_id = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS engineer_work_experience_technologies_select_public_engineer ON public.engineer_work_experience_technologies;
CREATE POLICY engineer_work_experience_technologies_select_public_engineer
    ON public.engineer_work_experience_technologies
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.engineer_work_experiences we
            WHERE we.id = engineer_work_experience_technologies.work_experience_id
              AND (SELECT private.is_active_engineer(we.user_id))
              AND (SELECT private.has_public_engineer_profile(we.user_id))
        )
    );

DROP POLICY IF EXISTS engineer_work_experience_technologies_select_applicant_company ON public.engineer_work_experience_technologies;
CREATE POLICY engineer_work_experience_technologies_select_applicant_company
    ON public.engineer_work_experience_technologies
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.engineer_work_experiences we
            JOIN public.applications a ON a.applicant_id = we.user_id
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE we.id = engineer_work_experience_technologies.work_experience_id
              AND o.posted_by = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS engineer_work_experience_technologies_select_admin ON public.engineer_work_experience_technologies;
CREATE POLICY engineer_work_experience_technologies_select_admin
    ON public.engineer_work_experience_technologies
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_work_experience_technologies_insert_own ON public.engineer_work_experience_technologies;
CREATE POLICY engineer_work_experience_technologies_insert_own
    ON public.engineer_work_experience_technologies
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.engineer_work_experiences we
            WHERE we.id = engineer_work_experience_technologies.work_experience_id
              AND we.user_id = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS engineer_work_experience_technologies_admin_insert ON public.engineer_work_experience_technologies;
CREATE POLICY engineer_work_experience_technologies_admin_insert
    ON public.engineer_work_experience_technologies
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_work_experience_technologies_delete_own ON public.engineer_work_experience_technologies;
CREATE POLICY engineer_work_experience_technologies_delete_own
    ON public.engineer_work_experience_technologies
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.engineer_work_experiences we
            WHERE we.id = engineer_work_experience_technologies.work_experience_id
              AND we.user_id = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS engineer_work_experience_technologies_admin_delete ON public.engineer_work_experience_technologies;
CREATE POLICY engineer_work_experience_technologies_admin_delete
    ON public.engineer_work_experience_technologies
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');
