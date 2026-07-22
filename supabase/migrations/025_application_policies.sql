-- applications
-- No DELETE policy anywhere in this file: application history is never
-- physically deleted (C-07 / C-10 BR-88). Withdrawal is status = 'withdrawn'.

DROP POLICY IF EXISTS applications_select_own ON public.applications;
CREATE POLICY applications_select_own
    ON public.applications
    FOR SELECT
    TO authenticated
    USING (applicant_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS applications_select_poster ON public.applications;
CREATE POLICY applications_select_poster
    ON public.applications
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = applications.opportunity_id
              AND o.posted_by = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS applications_select_admin ON public.applications;
CREATE POLICY applications_select_admin
    ON public.applications
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- Only the applicant (ENGINEER or INSTRUCTOR) can apply, on their own behalf,
-- and only to an opportunity whose contract_type matches their role -- per the
-- side/contract_type pairing enforced by chk_opportunities_side_contract_type
-- in 005_opportunities.sql (side='ENGINEER' -> employment/project/hourly;
-- side='TRAINING' -> training). Values are the exact lowercase strings from
-- chk_opportunities_contract_type, not guessed casing.
DROP POLICY IF EXISTS applications_insert_own ON public.applications;
CREATE POLICY applications_insert_own
    ON public.applications
    FOR INSERT
    TO authenticated
    WITH CHECK (
        applicant_id = (SELECT auth.uid())
        AND EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = applications.opportunity_id
              AND (
                  (
                      (SELECT private.current_user_role()) = 'ENGINEER'
                      AND o.contract_type IN ('employment', 'project', 'hourly')
                  )
                  OR (
                      (SELECT private.current_user_role()) = 'INSTRUCTOR'
                      AND o.contract_type = 'training'
                  )
              )
        )
    );

-- Applicant may only ever move their own application to 'withdrawn'.
DROP POLICY IF EXISTS applications_update_withdraw ON public.applications;
CREATE POLICY applications_update_withdraw
    ON public.applications
    FOR UPDATE
    TO authenticated
    USING (
        applicant_id = (SELECT auth.uid())
        AND status <> 'withdrawn'
    )
    WITH CHECK (
        applicant_id = (SELECT auth.uid())
        AND status = 'withdrawn'
    );

-- Company (poster) manages the screening pipeline on its own opportunities.
-- Row-level ownership is enforced here; the applied -> screening -> interview ->
-- accepted/rejected transition graph (and terminal-state irreversibility) is a
-- sequencing rule, not a row-ownership rule, and belongs in a BEFORE UPDATE
-- trigger (not yet built) rather than RLS -- consistent with the audit's split
-- of Postgres-constraint vs. application-layer responsibilities.
DROP POLICY IF EXISTS applications_update_poster ON public.applications;
CREATE POLICY applications_update_poster
    ON public.applications
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = applications.opportunity_id
              AND o.posted_by = (SELECT auth.uid())
        )
        AND (SELECT private.current_user_role()) = 'COMPANY'
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.opportunities o
            WHERE o.id = applications.opportunity_id
              AND o.posted_by = (SELECT auth.uid())
        )
        AND (SELECT private.current_user_role()) = 'COMPANY'
    );

DROP POLICY IF EXISTS applications_admin_update ON public.applications;
CREATE POLICY applications_admin_update
    ON public.applications
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');
