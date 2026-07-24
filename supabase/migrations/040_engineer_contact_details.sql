-- Engineer Profile full restoration, part 2/10: contact details (phone,
-- nearest station). Split out of engineer_profiles specifically because that
-- table has a public/anon SELECT policy (023/035) -- these two fields must
-- never be anonymous- or open-search-readable. This table's own SELECT
-- policy grants owner + a company that has an actual applicant relationship
-- with this engineer (mirrors engineer_profiles_select_applicant_company,
-- 023_profile_policies.sql, exactly) + ADMIN. No public, no anon, ever.
--
-- Deliberately NOT the same table as birth_date/gender (041_engineer_personal_info.sql):
-- those two must stay invisible to companies even after an application
-- exists, so they need a narrower policy set than phone/nearest_station.
-- Postgres RLS is row-level, not column-level, so two visibility tiers for
-- "the engineer's private info" require two tables.

CREATE TABLE IF NOT EXISTS public.engineer_contact_details (
    id UUID PRIMARY KEY REFERENCES public.users (id) ON DELETE CASCADE,
    phone VARCHAR(20),
    nearest_station VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS trg_engineer_contact_details_updated_at ON public.engineer_contact_details;
CREATE TRIGGER trg_engineer_contact_details_updated_at
    BEFORE UPDATE ON public.engineer_contact_details
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.engineer_contact_details ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS engineer_contact_details_select_own ON public.engineer_contact_details;
CREATE POLICY engineer_contact_details_select_own
    ON public.engineer_contact_details
    FOR SELECT
    TO authenticated
    USING (id = (SELECT auth.uid()));

DROP POLICY IF EXISTS engineer_contact_details_select_applicant_company ON public.engineer_contact_details;
CREATE POLICY engineer_contact_details_select_applicant_company
    ON public.engineer_contact_details
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.applications a
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE a.applicant_id = engineer_contact_details.id
              AND o.posted_by = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS engineer_contact_details_select_admin ON public.engineer_contact_details;
CREATE POLICY engineer_contact_details_select_admin
    ON public.engineer_contact_details
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_contact_details_insert_own ON public.engineer_contact_details;
CREATE POLICY engineer_contact_details_insert_own
    ON public.engineer_contact_details
    FOR INSERT
    TO authenticated
    WITH CHECK (
        id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'ENGINEER'
    );

DROP POLICY IF EXISTS engineer_contact_details_admin_insert ON public.engineer_contact_details;
CREATE POLICY engineer_contact_details_admin_insert
    ON public.engineer_contact_details
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_contact_details_update_own ON public.engineer_contact_details;
CREATE POLICY engineer_contact_details_update_own
    ON public.engineer_contact_details
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

DROP POLICY IF EXISTS engineer_contact_details_admin_update ON public.engineer_contact_details;
CREATE POLICY engineer_contact_details_admin_update
    ON public.engineer_contact_details
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

-- No self-service DELETE, matching engineer_profiles' own convention
-- (023_profile_policies.sql) -- row is removed only via ON DELETE CASCADE
-- from auth.users, or by an admin.
DROP POLICY IF EXISTS engineer_contact_details_admin_delete ON public.engineer_contact_details;
CREATE POLICY engineer_contact_details_admin_delete
    ON public.engineer_contact_details
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');
