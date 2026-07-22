-- Role-check helper for RLS policies (021_rls_policies.sql).
-- SECURITY DEFINER + STABLE so it bypasses RLS on public.users when reading the
-- caller's own role, avoiding self-referential recursion if a policy on
-- public.users itself needed to check "is this user an admin".
--
-- Lives in a private, non-API-exposed schema rather than public: SECURITY DEFINER
-- functions run with the privileges of their owner, so leaving one reachable from
-- the public schema (and therefore from PostgREST as a callable RPC) would let any
-- authenticated client invoke it directly instead of only via RLS policy checks.
-- search_path is pinned to pg_catalog only, so every referenced object below must
-- be fully schema-qualified -- this closes the classic SECURITY DEFINER search_path
-- hijack (a malicious "public.users" or similar shadowing the intended table).
CREATE SCHEMA IF NOT EXISTS private;

CREATE OR REPLACE FUNCTION private.current_user_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog
AS $$
    SELECT role FROM public.users WHERE id = auth.uid();
$$;

-- private schema and this function are not part of the PostgREST API surface;
-- only RLS policies (evaluated as the querying role) and other server-side SQL
-- should ever call this. Explicitly lock down PUBLIC and open it only to
-- authenticated, since a new schema/function is not automatically callable by
-- anyone in modern Postgres, but making the grant explicit avoids relying on that
-- default.
REVOKE ALL ON FUNCTION private.current_user_role() FROM PUBLIC;
GRANT USAGE ON SCHEMA private TO authenticated;
GRANT EXECUTE ON FUNCTION private.current_user_role() TO authenticated;

-- public.users already has RLS enabled (002_users.sql). Every other table gets it
-- here. With RLS enabled and no policies yet, all of these become inaccessible via
-- the API until 021_rls_policies.sql adds policies -- this is the intended
-- default-deny state, not a bug.

ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qualifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_levels ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.engineer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instructor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_profiles ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_employment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_project ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_hourly ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_training ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_required_skills ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_qualifications ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.abuse_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;
