-- Engineer Profile full restoration, part 8/10: 学歴 (education), restoring
-- EDUCATION[] from the old UI-only mock (src/constants/engineer-profile.ts,
-- pre-a1ecd75). period is free text, matching the old plain <Input> field
-- (never structured dates). Same full-CRUD + public/applicant-company/admin
-- RLS shape as engineer_work_experiences (045).

CREATE TABLE IF NOT EXISTS public.engineer_educations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users (id) ON DELETE CASCADE,
    school_name VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    period VARCHAR(100),
    description TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_engineer_educations_description_length CHECK (char_length(description) <= 2000)
);

CREATE INDEX IF NOT EXISTS idx_engineer_educations_user ON public.engineer_educations (user_id, display_order);

DROP TRIGGER IF EXISTS trg_engineer_educations_updated_at ON public.engineer_educations;
CREATE TRIGGER trg_engineer_educations_updated_at
    BEFORE UPDATE ON public.engineer_educations
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.engineer_educations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS engineer_educations_select_own ON public.engineer_educations;
CREATE POLICY engineer_educations_select_own
    ON public.engineer_educations
    FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS engineer_educations_select_public_engineer ON public.engineer_educations;
CREATE POLICY engineer_educations_select_public_engineer
    ON public.engineer_educations
    FOR SELECT
    TO authenticated
    USING (
        (SELECT private.is_active_engineer(engineer_educations.user_id))
        AND (SELECT private.has_public_engineer_profile(engineer_educations.user_id))
    );

DROP POLICY IF EXISTS engineer_educations_select_applicant_company ON public.engineer_educations;
CREATE POLICY engineer_educations_select_applicant_company
    ON public.engineer_educations
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.applications a
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE a.applicant_id = engineer_educations.user_id
              AND o.posted_by = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS engineer_educations_select_admin ON public.engineer_educations;
CREATE POLICY engineer_educations_select_admin
    ON public.engineer_educations
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_educations_insert_own ON public.engineer_educations;
CREATE POLICY engineer_educations_insert_own
    ON public.engineer_educations
    FOR INSERT
    TO authenticated
    WITH CHECK (
        user_id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'ENGINEER'
    );

DROP POLICY IF EXISTS engineer_educations_admin_insert ON public.engineer_educations;
CREATE POLICY engineer_educations_admin_insert
    ON public.engineer_educations
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_educations_update_own ON public.engineer_educations;
CREATE POLICY engineer_educations_update_own
    ON public.engineer_educations
    FOR UPDATE
    TO authenticated
    USING (user_id = (SELECT auth.uid()))
    WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS engineer_educations_admin_update ON public.engineer_educations;
CREATE POLICY engineer_educations_admin_update
    ON public.engineer_educations
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_educations_delete_own ON public.engineer_educations;
CREATE POLICY engineer_educations_delete_own
    ON public.engineer_educations
    FOR DELETE
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS engineer_educations_admin_delete ON public.engineer_educations;
CREATE POLICY engineer_educations_admin_delete
    ON public.engineer_educations
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');
