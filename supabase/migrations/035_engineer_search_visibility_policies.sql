-- Company Engineer Search + Real Engineer Detail phase.
--
-- Goal: let a COMPANY discover/search public ENGINEER profiles it has no
-- application relationship with (existing 032 policies only cover "applied
-- to my opportunity", which is the wrong relationship for open discovery).
--
-- Root cause of the "infinite recursion detected in policy for relation"
-- errors hit while building this migration: it is NOT a SECURITY DEFINER
-- bypass failure (private.current_user_role(), 020_enable_rls.sql, proves
-- that pattern works fine) -- it is a genuine CIRCULAR TABLE DEPENDENCY.
-- An earlier version of this migration made engineer_profiles_select_public
-- depend on public.users (for a status check) WHILE ALSO adding
-- users_select_public_engineer, which depends on public.engineer_profiles.
-- That is a mutual A-depends-on-B-depends-on-A cycle across two different
-- tables' policies, which Postgres's RLS planner rejects outright
-- regardless of SECURITY DEFINER (that mechanism only elevates runtime
-- privilege for a *single* table reading itself, e.g. current_user_role()
-- reading public.users from a policy ON public.users -- it does not make a
-- two-table mutual cycle safe).
--
-- Fix: engineer_profiles_select_public is left EXACTLY as originally
-- defined in 023_profile_policies.sql (is_public = TRUE only, no
-- dependency on public.users at all). Only public.users and the leaf
-- tables (user_skills, user_qualifications, skill_assessment_attempts)
-- depend on engineer_profiles -- a one-way DAG, not a cycle. This means a
-- SUSPENDED/WITHDRAWN engineer's raw engineer_profiles row is still
-- technically fetchable by row id at the RLS layer if is_public happens to
-- still be TRUE, but every other table needed to identify or meaningfully
-- use that row (users.name, user_skills, user_qualifications,
-- skill_assessment_attempts) correctly requires ACTIVE status, and the
-- application code (src/lib/company/engineers.ts) always requires a
-- successful users-row read before showing anything -- so in practice a
-- SUSPENDED engineer is fully invisible through this feature. Documented as
-- a known residual limitation in the final report rather than risking
-- another recursion regression.
--
-- skill_assessment_answers deliberately gets NO new policy here -- it must
-- stay owner+ADMIN only forever, so a company can see final assessment
-- levels but never the individual Yes/No answers behind them.

-- Cleanup: drop the two earlier (recursive) helpers from prior attempts at
-- this migration.
DROP FUNCTION IF EXISTS private.is_public_searchable_engineer(UUID);

CREATE OR REPLACE FUNCTION private.is_active_engineer(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.users
        WHERE id = p_user_id
          AND role = 'ENGINEER'
          AND status = 'ACTIVE'
    );
$$;

REVOKE ALL ON FUNCTION private.is_active_engineer(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.is_active_engineer(UUID) TO authenticated, anon;

CREATE OR REPLACE FUNCTION private.has_public_engineer_profile(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.engineer_profiles
        WHERE id = p_user_id
          AND is_public = TRUE
    );
$$;

REVOKE ALL ON FUNCTION private.has_public_engineer_profile(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_public_engineer_profile(UUID) TO authenticated, anon;

-- 1. engineer_profiles_select_public: left EXACTLY as 023_profile_policies.sql
--    originally defined it -- NOT touched -- to keep this a one-way DAG
--    (see comment above). This DROP+CREATE is a no-op reapplication of the
--    original, not a change, so re-running this migration stays idempotent.
DROP POLICY IF EXISTS engineer_profiles_select_public ON public.engineer_profiles;
CREATE POLICY engineer_profiles_select_public
    ON public.engineer_profiles
    FOR SELECT
    TO anon, authenticated
    USING (is_public = TRUE);

-- 2. skill_assessment_attempts_select_public_profile (030_skill_assessments.sql):
--    add the missing ACTIVE-status check. This table is a leaf relative to
--    the users/engineer_profiles pair (neither of those depends on it), so
--    depending on both here is a DAG edge, not a cycle.
DROP POLICY IF EXISTS skill_assessment_attempts_select_public_profile ON public.skill_assessment_attempts;
CREATE POLICY skill_assessment_attempts_select_public_profile
    ON public.skill_assessment_attempts
    FOR SELECT
    TO authenticated
    USING (
        (SELECT private.has_public_engineer_profile(skill_assessment_attempts.user_id))
        AND (SELECT private.is_active_engineer(skill_assessment_attempts.user_id))
    );

-- 3. public.users has no "searchable engineer" SELECT policy at all today
--    (only self, admin, and applicant-company). Depends on
--    engineer_profiles only (one-way) -- engineer_profiles' policies do not
--    depend back on users, so no cycle.
DROP POLICY IF EXISTS users_select_public_engineer ON public.users;
CREATE POLICY users_select_public_engineer
    ON public.users
    FOR SELECT
    TO authenticated
    USING (
        role = 'ENGINEER'
        AND status = 'ACTIVE'
        AND (SELECT private.has_public_engineer_profile(users.id))
    );

-- 4. user_skills: same "searchable engineer" rule, mirrors
--    user_skills_select_applicant_company (032) but keyed on public
--    discoverability instead of an application relationship. Leaf table,
--    same DAG reasoning as skill_assessment_attempts above.
DROP POLICY IF EXISTS user_skills_select_public_engineer ON public.user_skills;
CREATE POLICY user_skills_select_public_engineer
    ON public.user_skills
    FOR SELECT
    TO authenticated
    USING (
        (SELECT private.is_active_engineer(user_skills.user_id))
        AND (SELECT private.has_public_engineer_profile(user_skills.user_id))
    );

-- 5. user_qualifications: same rule.
DROP POLICY IF EXISTS user_qualifications_select_public_engineer ON public.user_qualifications;
CREATE POLICY user_qualifications_select_public_engineer
    ON public.user_qualifications
    FOR SELECT
    TO authenticated
    USING (
        (SELECT private.is_active_engineer(user_qualifications.user_id))
        AND (SELECT private.has_public_engineer_profile(user_qualifications.user_id))
    );
