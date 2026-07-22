-- Helper for public.users self-update guard. Unlike a bare correlated subquery
-- on public.users embedded directly inside a public.users policy (which trips
-- Postgres's "infinite recursion detected in policy for relation" check),
-- indirecting through a SECURITY DEFINER function is safe: the function owner
-- bypasses RLS on public.users entirely, so its internal SELECT never
-- re-enters policy evaluation. This is the same mechanism private.
-- current_user_role() already uses safely inside public.users' own policies.
--
-- Hardcoded to auth.uid() (no id parameter), so it can never be used to probe
-- another user's protected fields -- it only ever answers "do these proposed
-- values match MY current row".
CREATE OR REPLACE FUNCTION private.users_protected_fields_unchanged(
    p_role TEXT,
    p_status TEXT,
    p_deleted_at TIMESTAMPTZ
)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.users
        WHERE id = auth.uid()
          AND role = p_role
          AND status = p_status
          AND deleted_at IS NOT DISTINCT FROM p_deleted_at
    );
$$;

REVOKE ALL ON FUNCTION private.users_protected_fields_unchanged(TEXT, TEXT, TIMESTAMPTZ) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.users_protected_fields_unchanged(TEXT, TEXT, TIMESTAMPTZ) TO authenticated;

-- public.users
DROP POLICY IF EXISTS users_select_own ON public.users;
CREATE POLICY users_select_own
    ON public.users
    FOR SELECT
    TO authenticated
    USING (id = (SELECT auth.uid()));

DROP POLICY IF EXISTS users_select_admin ON public.users;
CREATE POLICY users_select_admin
    ON public.users
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- Self-update: role / status / deleted_at (id's own protected triad) must come
-- back unchanged, verified via the SECURITY DEFINER helper above rather than a
-- direct subquery on this same table. name/email (and any other non-protected
-- column) remain freely editable.
DROP POLICY IF EXISTS users_update_own ON public.users;
CREATE POLICY users_update_own
    ON public.users
    FOR UPDATE
    TO authenticated
    USING (id = (SELECT auth.uid()))
    WITH CHECK (
        id = (SELECT auth.uid())
        AND (SELECT private.users_protected_fields_unchanged(role, status, deleted_at))
    );

DROP POLICY IF EXISTS users_admin_update ON public.users;
CREATE POLICY users_admin_update
    ON public.users
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

-- No INSERT policy: rows are created by handle_new_user() (SECURITY DEFINER,
-- 002_users.sql), which bypasses RLS entirely. No DELETE policy: withdrawal is
-- status = 'WITHDRAWN', not a row deletion.

-- public.user_skills
-- Schema (015_user_skills.sql): id, user_id, skill_id, skill_level, created_at.
-- skill_level is a genuine mutable non-key field (proficiency changes over
-- time), so UPDATE is kept -- this is not a pure junction table. user_id
-- appears in both USING (gates which existing rows are touchable) and WITH
-- CHECK (gates what the row can become), so it can never be reassigned to
-- another user's id.
DROP POLICY IF EXISTS user_skills_select_own ON public.user_skills;
CREATE POLICY user_skills_select_own
    ON public.user_skills
    FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS user_skills_select_admin ON public.user_skills;
CREATE POLICY user_skills_select_admin
    ON public.user_skills
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS user_skills_insert_own ON public.user_skills;
CREATE POLICY user_skills_insert_own
    ON public.user_skills
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS user_skills_admin_insert ON public.user_skills;
CREATE POLICY user_skills_admin_insert
    ON public.user_skills
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS user_skills_update_own ON public.user_skills;
CREATE POLICY user_skills_update_own
    ON public.user_skills
    FOR UPDATE
    TO authenticated
    USING (user_id = (SELECT auth.uid()))
    WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS user_skills_admin_update ON public.user_skills;
CREATE POLICY user_skills_admin_update
    ON public.user_skills
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS user_skills_delete_own ON public.user_skills;
CREATE POLICY user_skills_delete_own
    ON public.user_skills
    FOR DELETE
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS user_skills_admin_delete ON public.user_skills;
CREATE POLICY user_skills_admin_delete
    ON public.user_skills
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- public.user_qualifications
-- Schema (016_user_qualifications.sql): id, user_id, qualification_id,
-- obtained_year, created_at. obtained_year is a genuine mutable non-key field
-- (correcting a mis-entered year), so UPDATE is kept for the same reason as
-- user_skills. Same user_id-in-USING-and-WITH-CHECK pattern prevents
-- reassignment to another user.
DROP POLICY IF EXISTS user_qualifications_select_own ON public.user_qualifications;
CREATE POLICY user_qualifications_select_own
    ON public.user_qualifications
    FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS user_qualifications_select_admin ON public.user_qualifications;
CREATE POLICY user_qualifications_select_admin
    ON public.user_qualifications
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS user_qualifications_insert_own ON public.user_qualifications;
CREATE POLICY user_qualifications_insert_own
    ON public.user_qualifications
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS user_qualifications_admin_insert ON public.user_qualifications;
CREATE POLICY user_qualifications_admin_insert
    ON public.user_qualifications
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS user_qualifications_update_own ON public.user_qualifications;
CREATE POLICY user_qualifications_update_own
    ON public.user_qualifications
    FOR UPDATE
    TO authenticated
    USING (user_id = (SELECT auth.uid()))
    WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS user_qualifications_admin_update ON public.user_qualifications;
CREATE POLICY user_qualifications_admin_update
    ON public.user_qualifications
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS user_qualifications_delete_own ON public.user_qualifications;
CREATE POLICY user_qualifications_delete_own
    ON public.user_qualifications
    FOR DELETE
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS user_qualifications_admin_delete ON public.user_qualifications;
CREATE POLICY user_qualifications_admin_delete
    ON public.user_qualifications
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- public.application_training_proposal
-- Parent opportunity's contract_type must be exactly 'training' (lowercase, per
-- chk_opportunities_contract_type in 005_opportunities.sql -- not guessed).
-- No DELETE policy for anyone (explicit requirement). Company gets SELECT only
-- -- no company INSERT/UPDATE/DELETE policy exists at all, so it cannot modify
-- proposal contents by construction. WITH CHECK on UPDATE re-validates
-- ownership + contract_type against the *new* application_id, so a proposal
-- can't be reassigned to an unrelated or non-training application either.
DROP POLICY IF EXISTS application_training_proposal_select_instructor ON public.application_training_proposal;
CREATE POLICY application_training_proposal_select_instructor
    ON public.application_training_proposal
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.applications a
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE a.id = application_training_proposal.application_id
              AND a.applicant_id = (SELECT auth.uid())
              AND o.contract_type = 'training'
        )
        AND (SELECT private.current_user_role()) = 'INSTRUCTOR'
    );

DROP POLICY IF EXISTS application_training_proposal_select_company ON public.application_training_proposal;
CREATE POLICY application_training_proposal_select_company
    ON public.application_training_proposal
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.applications a
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE a.id = application_training_proposal.application_id
              AND o.posted_by = (SELECT auth.uid())
              AND o.contract_type = 'training'
        )
        AND (SELECT private.current_user_role()) = 'COMPANY'
    );

DROP POLICY IF EXISTS application_training_proposal_select_admin ON public.application_training_proposal;
CREATE POLICY application_training_proposal_select_admin
    ON public.application_training_proposal
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS application_training_proposal_insert_owner ON public.application_training_proposal;
CREATE POLICY application_training_proposal_insert_owner
    ON public.application_training_proposal
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1
            FROM public.applications a
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE a.id = application_training_proposal.application_id
              AND a.applicant_id = (SELECT auth.uid())
              AND o.contract_type = 'training'
        )
        AND (SELECT private.current_user_role()) = 'INSTRUCTOR'
    );

DROP POLICY IF EXISTS application_training_proposal_update_owner ON public.application_training_proposal;
CREATE POLICY application_training_proposal_update_owner
    ON public.application_training_proposal
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.applications a
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE a.id = application_training_proposal.application_id
              AND a.applicant_id = (SELECT auth.uid())
              AND o.contract_type = 'training'
        )
        AND (SELECT private.current_user_role()) = 'INSTRUCTOR'
    )
    WITH CHECK (
        EXISTS (
            SELECT 1
            FROM public.applications a
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE a.id = application_training_proposal.application_id
              AND a.applicant_id = (SELECT auth.uid())
              AND o.contract_type = 'training'
        )
        AND (SELECT private.current_user_role()) = 'INSTRUCTOR'
    );

DROP POLICY IF EXISTS application_training_proposal_admin_update ON public.application_training_proposal;
CREATE POLICY application_training_proposal_admin_update
    ON public.application_training_proposal
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');
