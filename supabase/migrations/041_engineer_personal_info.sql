-- Engineer Profile full restoration, part 3/10: personal info (birth date,
-- gender). Owner + ADMIN ONLY -- no applicant-company policy at all, ever,
-- even after a real application relationship exists (explicit product
-- decision: unlike phone/nearest_station in 040_engineer_contact_details.sql,
-- these two must never become company-visible). No public, no anon.
--
-- This is the most restrictive table added in this whole restoration --
-- mirrors the owner+admin-only shape of skill_assessment_answers
-- (030_skill_assessments.sql), which never gets a company policy either.

CREATE TABLE IF NOT EXISTS public.engineer_personal_info (
    id UUID PRIMARY KEY REFERENCES public.users (id) ON DELETE CASCADE,
    birth_date DATE,
    gender VARCHAR(20),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_engineer_personal_info_gender CHECK (gender IN ('MALE', 'FEMALE', 'UNSPECIFIED'))
);

DROP TRIGGER IF EXISTS trg_engineer_personal_info_updated_at ON public.engineer_personal_info;
CREATE TRIGGER trg_engineer_personal_info_updated_at
    BEFORE UPDATE ON public.engineer_personal_info
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.engineer_personal_info ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS engineer_personal_info_select_own ON public.engineer_personal_info;
CREATE POLICY engineer_personal_info_select_own
    ON public.engineer_personal_info
    FOR SELECT
    TO authenticated
    USING (id = (SELECT auth.uid()));

DROP POLICY IF EXISTS engineer_personal_info_select_admin ON public.engineer_personal_info;
CREATE POLICY engineer_personal_info_select_admin
    ON public.engineer_personal_info
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_personal_info_insert_own ON public.engineer_personal_info;
CREATE POLICY engineer_personal_info_insert_own
    ON public.engineer_personal_info
    FOR INSERT
    TO authenticated
    WITH CHECK (
        id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'ENGINEER'
    );

DROP POLICY IF EXISTS engineer_personal_info_admin_insert ON public.engineer_personal_info;
CREATE POLICY engineer_personal_info_admin_insert
    ON public.engineer_personal_info
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_personal_info_update_own ON public.engineer_personal_info;
CREATE POLICY engineer_personal_info_update_own
    ON public.engineer_personal_info
    FOR UPDATE
    TO authenticated
    USING (
        id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'ENGINEER'
    )
    WITH CHECK (
        id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'ENGINEER'
    );

DROP POLICY IF EXISTS engineer_personal_info_admin_update ON public.engineer_personal_info;
CREATE POLICY engineer_personal_info_admin_update
    ON public.engineer_personal_info
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_personal_info_admin_delete ON public.engineer_personal_info;
CREATE POLICY engineer_personal_info_admin_delete
    ON public.engineer_personal_info
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');
