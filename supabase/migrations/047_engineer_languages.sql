-- Engineer Profile full restoration, part 9/10: 言語 (languages), restoring
-- LANGUAGES[] from the old UI-only mock (src/constants/engineer-profile.ts,
-- pre-a1ecd75). level is a fixed 5-tier scale (matches old
-- LANGUAGE_LEVEL_OPTIONS). Mutable (level can be re-assessed), so owner gets
-- full CRUD -- same shape as engineer_educations (046), plus the
-- public/applicant-company/admin tiers.

CREATE TABLE IF NOT EXISTS public.engineer_languages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users (id) ON DELETE CASCADE,
    language_name VARCHAR(50) NOT NULL,
    level VARCHAR(20) NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_engineer_languages_level CHECK (
        level IN ('NATIVE', 'BUSINESS', 'CONVERSATIONAL', 'BASIC', 'LEARNING')
    )
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_engineer_languages ON public.engineer_languages (user_id, language_name);
CREATE INDEX IF NOT EXISTS idx_engineer_languages_user ON public.engineer_languages (user_id, display_order);

ALTER TABLE public.engineer_languages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS engineer_languages_select_own ON public.engineer_languages;
CREATE POLICY engineer_languages_select_own
    ON public.engineer_languages
    FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS engineer_languages_select_public_engineer ON public.engineer_languages;
CREATE POLICY engineer_languages_select_public_engineer
    ON public.engineer_languages
    FOR SELECT
    TO authenticated
    USING (
        (SELECT private.is_active_engineer(engineer_languages.user_id))
        AND (SELECT private.has_public_engineer_profile(engineer_languages.user_id))
    );

DROP POLICY IF EXISTS engineer_languages_select_applicant_company ON public.engineer_languages;
CREATE POLICY engineer_languages_select_applicant_company
    ON public.engineer_languages
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.applications a
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE a.applicant_id = engineer_languages.user_id
              AND o.posted_by = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS engineer_languages_select_admin ON public.engineer_languages;
CREATE POLICY engineer_languages_select_admin
    ON public.engineer_languages
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_languages_insert_own ON public.engineer_languages;
CREATE POLICY engineer_languages_insert_own
    ON public.engineer_languages
    FOR INSERT
    TO authenticated
    WITH CHECK (
        user_id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'ENGINEER'
    );

DROP POLICY IF EXISTS engineer_languages_admin_insert ON public.engineer_languages;
CREATE POLICY engineer_languages_admin_insert
    ON public.engineer_languages
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_languages_update_own ON public.engineer_languages;
CREATE POLICY engineer_languages_update_own
    ON public.engineer_languages
    FOR UPDATE
    TO authenticated
    USING (user_id = (SELECT auth.uid()))
    WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS engineer_languages_admin_update ON public.engineer_languages;
CREATE POLICY engineer_languages_admin_update
    ON public.engineer_languages
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_languages_delete_own ON public.engineer_languages;
CREATE POLICY engineer_languages_delete_own
    ON public.engineer_languages
    FOR DELETE
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS engineer_languages_admin_delete ON public.engineer_languages;
CREATE POLICY engineer_languages_admin_delete
    ON public.engineer_languages
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');
