-- engineer_profiles
DROP POLICY IF EXISTS engineer_profiles_select_public ON public.engineer_profiles;
CREATE POLICY engineer_profiles_select_public
    ON public.engineer_profiles
    FOR SELECT
    TO anon, authenticated
    USING (is_public = TRUE);

DROP POLICY IF EXISTS engineer_profiles_select_own ON public.engineer_profiles;
CREATE POLICY engineer_profiles_select_own
    ON public.engineer_profiles
    FOR SELECT
    TO authenticated
    USING (id = (SELECT auth.uid()));

-- Non-public profile stays visible to a company the engineer has applied to
-- (C-02 BR-13). This is a no-op until applications/opportunities get their own
-- SELECT policies (applications currently has RLS enabled with zero policies,
-- so this subquery returns no rows for anyone yet) -- it activates automatically
-- once those policies land.
DROP POLICY IF EXISTS engineer_profiles_select_applicant_company ON public.engineer_profiles;
CREATE POLICY engineer_profiles_select_applicant_company
    ON public.engineer_profiles
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.applications a
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE a.applicant_id = engineer_profiles.id
              AND o.posted_by = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS engineer_profiles_select_admin ON public.engineer_profiles;
CREATE POLICY engineer_profiles_select_admin
    ON public.engineer_profiles
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- INSERT is restricted to the owning ENGINEER account and to admins, so a
-- COMPANY/INSTRUCTOR-role user can't create a mismatched engineer_profiles row
-- for their own id.
DROP POLICY IF EXISTS engineer_profiles_insert_own ON public.engineer_profiles;
CREATE POLICY engineer_profiles_insert_own
    ON public.engineer_profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (
        id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'ENGINEER'
    );

DROP POLICY IF EXISTS engineer_profiles_admin_insert ON public.engineer_profiles;
CREATE POLICY engineer_profiles_admin_insert
    ON public.engineer_profiles
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_profiles_update_own ON public.engineer_profiles;
CREATE POLICY engineer_profiles_update_own
    ON public.engineer_profiles
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

DROP POLICY IF EXISTS engineer_profiles_admin_update ON public.engineer_profiles;
CREATE POLICY engineer_profiles_admin_update
    ON public.engineer_profiles
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

-- No self-service DELETE: withdrawal is modeled as public.users.status='WITHDRAWN',
-- and this row is otherwise removed only by ON DELETE CASCADE from auth.users.
DROP POLICY IF EXISTS engineer_profiles_admin_delete ON public.engineer_profiles;
CREATE POLICY engineer_profiles_admin_delete
    ON public.engineer_profiles
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- instructor_profiles
DROP POLICY IF EXISTS instructor_profiles_select_public ON public.instructor_profiles;
CREATE POLICY instructor_profiles_select_public
    ON public.instructor_profiles
    FOR SELECT
    TO anon, authenticated
    USING (is_public = TRUE);

DROP POLICY IF EXISTS instructor_profiles_select_own ON public.instructor_profiles;
CREATE POLICY instructor_profiles_select_own
    ON public.instructor_profiles
    FOR SELECT
    TO authenticated
    USING (id = (SELECT auth.uid()));

DROP POLICY IF EXISTS instructor_profiles_select_applicant_company ON public.instructor_profiles;
CREATE POLICY instructor_profiles_select_applicant_company
    ON public.instructor_profiles
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.applications a
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE a.applicant_id = instructor_profiles.id
              AND o.posted_by = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS instructor_profiles_select_admin ON public.instructor_profiles;
CREATE POLICY instructor_profiles_select_admin
    ON public.instructor_profiles
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS instructor_profiles_insert_own ON public.instructor_profiles;
CREATE POLICY instructor_profiles_insert_own
    ON public.instructor_profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (
        id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'INSTRUCTOR'
    );

DROP POLICY IF EXISTS instructor_profiles_admin_insert ON public.instructor_profiles;
CREATE POLICY instructor_profiles_admin_insert
    ON public.instructor_profiles
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS instructor_profiles_update_own ON public.instructor_profiles;
CREATE POLICY instructor_profiles_update_own
    ON public.instructor_profiles
    FOR UPDATE
    TO authenticated
    USING (
        id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'INSTRUCTOR'
    )
    WITH CHECK (
        id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'INSTRUCTOR'
    );

DROP POLICY IF EXISTS instructor_profiles_admin_update ON public.instructor_profiles;
CREATE POLICY instructor_profiles_admin_update
    ON public.instructor_profiles
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS instructor_profiles_admin_delete ON public.instructor_profiles;
CREATE POLICY instructor_profiles_admin_delete
    ON public.instructor_profiles
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- company_profiles (always public, per C-03 BR-18 -- no is_public column)
DROP POLICY IF EXISTS company_profiles_select_all ON public.company_profiles;
CREATE POLICY company_profiles_select_all
    ON public.company_profiles
    FOR SELECT
    TO anon, authenticated
    USING (TRUE);

DROP POLICY IF EXISTS company_profiles_insert_own ON public.company_profiles;
CREATE POLICY company_profiles_insert_own
    ON public.company_profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (
        id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'COMPANY'
    );

DROP POLICY IF EXISTS company_profiles_admin_insert ON public.company_profiles;
CREATE POLICY company_profiles_admin_insert
    ON public.company_profiles
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS company_profiles_update_own ON public.company_profiles;
CREATE POLICY company_profiles_update_own
    ON public.company_profiles
    FOR UPDATE
    TO authenticated
    USING (
        id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'COMPANY'
    )
    WITH CHECK (
        id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'COMPANY'
    );

DROP POLICY IF EXISTS company_profiles_admin_update ON public.company_profiles;
CREATE POLICY company_profiles_admin_update
    ON public.company_profiles
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS company_profiles_admin_delete ON public.company_profiles;
CREATE POLICY company_profiles_admin_delete
    ON public.company_profiles
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');
