-- abuse_reports
-- No DELETE policy for anyone, including admin: report history is preserved
-- even after the reported target is gone (C-10 BR-95).

DROP POLICY IF EXISTS abuse_reports_select_own ON public.abuse_reports;
CREATE POLICY abuse_reports_select_own
    ON public.abuse_reports
    FOR SELECT
    TO authenticated
    USING (reporter_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS abuse_reports_select_admin ON public.abuse_reports;
CREATE POLICY abuse_reports_select_admin
    ON public.abuse_reports
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- Any authenticated user (ENGINEER/INSTRUCTOR/COMPANY/ADMIN) can file a report
-- on their own behalf; reporting isn't role-restricted.
DROP POLICY IF EXISTS abuse_reports_insert_own ON public.abuse_reports;
CREATE POLICY abuse_reports_insert_own
    ON public.abuse_reports
    FOR INSERT
    TO authenticated
    WITH CHECK (reporter_id = (SELECT auth.uid()));

-- Reporters cannot edit their own report after submission -- only admin
-- triages/resolves (status, admin_note, handled_by, handled_at).
DROP POLICY IF EXISTS abuse_reports_admin_update ON public.abuse_reports;
CREATE POLICY abuse_reports_admin_update
    ON public.abuse_reports
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

-- admin_audit_logs
-- SELECT only. No INSERT/UPDATE/DELETE policy for anyone, admin included: this
-- table must be append-only, and a compromised or malicious admin session must
-- not be able to write, alter, or erase its own trail via the API. Real writes
-- happen through a trusted SECURITY DEFINER function / service-role path (not
-- yet built), never through an admin's own authenticated session.
DROP POLICY IF EXISTS admin_audit_logs_select_admin ON public.admin_audit_logs;
CREATE POLICY admin_audit_logs_select_admin
    ON public.admin_audit_logs
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');
