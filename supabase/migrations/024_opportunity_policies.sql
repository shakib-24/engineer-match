-- opportunities
-- "ACTIVE" maps to the actual status/visibility columns on this table: a listing
-- is publicly live when status = 'published', it hasn't been unpublished by an
-- admin, and it isn't soft-deleted.
DROP POLICY IF EXISTS opportunities_select_active ON public.opportunities;
CREATE POLICY opportunities_select_active
    ON public.opportunities
    FOR SELECT
    TO authenticated
    USING (
        status = 'published'
        AND unpublished_by_admin = FALSE
        AND deleted_at IS NULL
    );

DROP POLICY IF EXISTS opportunities_select_own ON public.opportunities;
CREATE POLICY opportunities_select_own
    ON public.opportunities
    FOR SELECT
    TO authenticated
    USING (posted_by = (SELECT auth.uid()));

DROP POLICY IF EXISTS opportunities_select_admin ON public.opportunities;
CREATE POLICY opportunities_select_admin
    ON public.opportunities
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS opportunities_insert_own ON public.opportunities;
CREATE POLICY opportunities_insert_own
    ON public.opportunities
    FOR INSERT
    TO authenticated
    WITH CHECK (
        posted_by = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'COMPANY'
    );

DROP POLICY IF EXISTS opportunities_update_own ON public.opportunities;
CREATE POLICY opportunities_update_own
    ON public.opportunities
    FOR UPDATE
    TO authenticated
    USING (
        posted_by = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'COMPANY'
    )
    WITH CHECK (
        posted_by = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'COMPANY'
    );

DROP POLICY IF EXISTS opportunities_admin_update ON public.opportunities;
CREATE POLICY opportunities_admin_update
    ON public.opportunities
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

-- No company self-delete: only admin can delete an opportunity.
DROP POLICY IF EXISTS opportunities_admin_delete ON public.opportunities;
CREATE POLICY opportunities_admin_delete
    ON public.opportunities
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- opportunity_employment (parent contract_type = 'employment', per
-- chk_opportunities_contract_type in 005_opportunities.sql -- lowercase)
DROP POLICY IF EXISTS opportunity_employment_select_via_opportunity ON public.opportunity_employment;
CREATE POLICY opportunity_employment_select_via_opportunity
    ON public.opportunity_employment
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = opportunity_employment.opportunity_id
              AND o.contract_type = 'employment'
        )
    );

DROP POLICY IF EXISTS opportunity_employment_insert_owner ON public.opportunity_employment;
CREATE POLICY opportunity_employment_insert_owner
    ON public.opportunity_employment
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = opportunity_employment.opportunity_id
              AND o.posted_by = (SELECT auth.uid())
              AND o.contract_type = 'employment'
        )
        AND (SELECT private.current_user_role()) = 'COMPANY'
    );

DROP POLICY IF EXISTS opportunity_employment_admin_insert ON public.opportunity_employment;
CREATE POLICY opportunity_employment_admin_insert
    ON public.opportunity_employment
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS opportunity_employment_update_owner ON public.opportunity_employment;
CREATE POLICY opportunity_employment_update_owner
    ON public.opportunity_employment
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = opportunity_employment.opportunity_id
              AND o.posted_by = (SELECT auth.uid())
              AND o.contract_type = 'employment'
        )
        AND (SELECT private.current_user_role()) = 'COMPANY'
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = opportunity_employment.opportunity_id
              AND o.posted_by = (SELECT auth.uid())
              AND o.contract_type = 'employment'
        )
        AND (SELECT private.current_user_role()) = 'COMPANY'
    );

DROP POLICY IF EXISTS opportunity_employment_admin_update ON public.opportunity_employment;
CREATE POLICY opportunity_employment_admin_update
    ON public.opportunity_employment
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS opportunity_employment_admin_delete ON public.opportunity_employment;
CREATE POLICY opportunity_employment_admin_delete
    ON public.opportunity_employment
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- opportunity_project (parent contract_type = 'project')
DROP POLICY IF EXISTS opportunity_project_select_via_opportunity ON public.opportunity_project;
CREATE POLICY opportunity_project_select_via_opportunity
    ON public.opportunity_project
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = opportunity_project.opportunity_id
              AND o.contract_type = 'project'
        )
    );

DROP POLICY IF EXISTS opportunity_project_insert_owner ON public.opportunity_project;
CREATE POLICY opportunity_project_insert_owner
    ON public.opportunity_project
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = opportunity_project.opportunity_id
              AND o.posted_by = (SELECT auth.uid())
              AND o.contract_type = 'project'
        )
        AND (SELECT private.current_user_role()) = 'COMPANY'
    );

DROP POLICY IF EXISTS opportunity_project_admin_insert ON public.opportunity_project;
CREATE POLICY opportunity_project_admin_insert
    ON public.opportunity_project
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS opportunity_project_update_owner ON public.opportunity_project;
CREATE POLICY opportunity_project_update_owner
    ON public.opportunity_project
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = opportunity_project.opportunity_id
              AND o.posted_by = (SELECT auth.uid())
              AND o.contract_type = 'project'
        )
        AND (SELECT private.current_user_role()) = 'COMPANY'
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = opportunity_project.opportunity_id
              AND o.posted_by = (SELECT auth.uid())
              AND o.contract_type = 'project'
        )
        AND (SELECT private.current_user_role()) = 'COMPANY'
    );

DROP POLICY IF EXISTS opportunity_project_admin_update ON public.opportunity_project;
CREATE POLICY opportunity_project_admin_update
    ON public.opportunity_project
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS opportunity_project_admin_delete ON public.opportunity_project;
CREATE POLICY opportunity_project_admin_delete
    ON public.opportunity_project
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- opportunity_hourly (parent contract_type = 'hourly')
DROP POLICY IF EXISTS opportunity_hourly_select_via_opportunity ON public.opportunity_hourly;
CREATE POLICY opportunity_hourly_select_via_opportunity
    ON public.opportunity_hourly
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = opportunity_hourly.opportunity_id
              AND o.contract_type = 'hourly'
        )
    );

DROP POLICY IF EXISTS opportunity_hourly_insert_owner ON public.opportunity_hourly;
CREATE POLICY opportunity_hourly_insert_owner
    ON public.opportunity_hourly
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = opportunity_hourly.opportunity_id
              AND o.posted_by = (SELECT auth.uid())
              AND o.contract_type = 'hourly'
        )
        AND (SELECT private.current_user_role()) = 'COMPANY'
    );

DROP POLICY IF EXISTS opportunity_hourly_admin_insert ON public.opportunity_hourly;
CREATE POLICY opportunity_hourly_admin_insert
    ON public.opportunity_hourly
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS opportunity_hourly_update_owner ON public.opportunity_hourly;
CREATE POLICY opportunity_hourly_update_owner
    ON public.opportunity_hourly
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = opportunity_hourly.opportunity_id
              AND o.posted_by = (SELECT auth.uid())
              AND o.contract_type = 'hourly'
        )
        AND (SELECT private.current_user_role()) = 'COMPANY'
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = opportunity_hourly.opportunity_id
              AND o.posted_by = (SELECT auth.uid())
              AND o.contract_type = 'hourly'
        )
        AND (SELECT private.current_user_role()) = 'COMPANY'
    );

DROP POLICY IF EXISTS opportunity_hourly_admin_update ON public.opportunity_hourly;
CREATE POLICY opportunity_hourly_admin_update
    ON public.opportunity_hourly
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS opportunity_hourly_admin_delete ON public.opportunity_hourly;
CREATE POLICY opportunity_hourly_admin_delete
    ON public.opportunity_hourly
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- opportunity_training (parent contract_type = 'training')
DROP POLICY IF EXISTS opportunity_training_select_via_opportunity ON public.opportunity_training;
CREATE POLICY opportunity_training_select_via_opportunity
    ON public.opportunity_training
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = opportunity_training.opportunity_id
              AND o.contract_type = 'training'
        )
    );

DROP POLICY IF EXISTS opportunity_training_insert_owner ON public.opportunity_training;
CREATE POLICY opportunity_training_insert_owner
    ON public.opportunity_training
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = opportunity_training.opportunity_id
              AND o.posted_by = (SELECT auth.uid())
              AND o.contract_type = 'training'
        )
        AND (SELECT private.current_user_role()) = 'COMPANY'
    );

DROP POLICY IF EXISTS opportunity_training_admin_insert ON public.opportunity_training;
CREATE POLICY opportunity_training_admin_insert
    ON public.opportunity_training
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS opportunity_training_update_owner ON public.opportunity_training;
CREATE POLICY opportunity_training_update_owner
    ON public.opportunity_training
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = opportunity_training.opportunity_id
              AND o.posted_by = (SELECT auth.uid())
              AND o.contract_type = 'training'
        )
        AND (SELECT private.current_user_role()) = 'COMPANY'
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = opportunity_training.opportunity_id
              AND o.posted_by = (SELECT auth.uid())
              AND o.contract_type = 'training'
        )
        AND (SELECT private.current_user_role()) = 'COMPANY'
    );

DROP POLICY IF EXISTS opportunity_training_admin_update ON public.opportunity_training;
CREATE POLICY opportunity_training_admin_update
    ON public.opportunity_training
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS opportunity_training_admin_delete ON public.opportunity_training;
CREATE POLICY opportunity_training_admin_delete
    ON public.opportunity_training
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- opportunity_required_skills
-- Not restricted to one contract_type -- required skills apply to every
-- opportunity type. Junction table has no mutable non-key columns, so no
-- UPDATE policy.
DROP POLICY IF EXISTS opportunity_required_skills_select_via_opportunity ON public.opportunity_required_skills;
CREATE POLICY opportunity_required_skills_select_via_opportunity
    ON public.opportunity_required_skills
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = opportunity_required_skills.opportunity_id
        )
    );

DROP POLICY IF EXISTS opportunity_required_skills_insert_owner ON public.opportunity_required_skills;
CREATE POLICY opportunity_required_skills_insert_owner
    ON public.opportunity_required_skills
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = opportunity_required_skills.opportunity_id
              AND o.posted_by = (SELECT auth.uid())
        )
        AND (SELECT private.current_user_role()) = 'COMPANY'
    );

DROP POLICY IF EXISTS opportunity_required_skills_admin_insert ON public.opportunity_required_skills;
CREATE POLICY opportunity_required_skills_admin_insert
    ON public.opportunity_required_skills
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS opportunity_required_skills_delete_owner ON public.opportunity_required_skills;
CREATE POLICY opportunity_required_skills_delete_owner
    ON public.opportunity_required_skills
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = opportunity_required_skills.opportunity_id
              AND o.posted_by = (SELECT auth.uid())
        )
        AND (SELECT private.current_user_role()) = 'COMPANY'
    );

DROP POLICY IF EXISTS opportunity_required_skills_admin_delete ON public.opportunity_required_skills;
CREATE POLICY opportunity_required_skills_admin_delete
    ON public.opportunity_required_skills
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');
