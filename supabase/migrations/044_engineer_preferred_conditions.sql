-- Engineer Profile full restoration, part 6/10: preferred contract types
-- (希望契約形態, multi-select) and preferred locations (希望勤務地, multi-value
-- free text -- old data included non-prefecture values like "フルリモート", so
-- this is deliberately not FK'd to a prefecture catalog). Restores
-- PREFERRED_CONDITIONS.contractTypes / .locations from the old UI-only mock
-- (src/constants/engineer-profile.ts, pre-a1ecd75).
--
-- Both are pure tag-set junction tables (no secondary mutable column), so
-- RLS follows the favorites shape (select/insert/delete, no update --
-- 014_favorites.sql / 027_notification_favorite_policies.sql) plus the
-- "public if searchable" + "applicant company" tiers already established for
-- user_skills/user_qualifications (035_engineer_search_visibility_policies.sql,
-- 032_company_applicant_visibility_policies.sql) since this is public profile
-- content, not private data.

CREATE TABLE IF NOT EXISTS public.engineer_preferred_contract_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users (id) ON DELETE CASCADE,
    contract_type VARCHAR(20) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_engineer_preferred_contract_types_type CHECK (contract_type IN ('EMPLOYMENT', 'PROJECT', 'HOURLY'))
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_engineer_preferred_contract_types ON public.engineer_preferred_contract_types (user_id, contract_type);

CREATE TABLE IF NOT EXISTS public.engineer_preferred_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users (id) ON DELETE CASCADE,
    location VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_engineer_preferred_locations ON public.engineer_preferred_locations (user_id, location);

ALTER TABLE public.engineer_preferred_contract_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engineer_preferred_locations ENABLE ROW LEVEL SECURITY;

-- engineer_preferred_contract_types ------------------------------------------

DROP POLICY IF EXISTS engineer_preferred_contract_types_select_own ON public.engineer_preferred_contract_types;
CREATE POLICY engineer_preferred_contract_types_select_own
    ON public.engineer_preferred_contract_types
    FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS engineer_preferred_contract_types_select_public_engineer ON public.engineer_preferred_contract_types;
CREATE POLICY engineer_preferred_contract_types_select_public_engineer
    ON public.engineer_preferred_contract_types
    FOR SELECT
    TO authenticated
    USING (
        (SELECT private.is_active_engineer(engineer_preferred_contract_types.user_id))
        AND (SELECT private.has_public_engineer_profile(engineer_preferred_contract_types.user_id))
    );

DROP POLICY IF EXISTS engineer_preferred_contract_types_select_applicant_company ON public.engineer_preferred_contract_types;
CREATE POLICY engineer_preferred_contract_types_select_applicant_company
    ON public.engineer_preferred_contract_types
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.applications a
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE a.applicant_id = engineer_preferred_contract_types.user_id
              AND o.posted_by = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS engineer_preferred_contract_types_select_admin ON public.engineer_preferred_contract_types;
CREATE POLICY engineer_preferred_contract_types_select_admin
    ON public.engineer_preferred_contract_types
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_preferred_contract_types_insert_own ON public.engineer_preferred_contract_types;
CREATE POLICY engineer_preferred_contract_types_insert_own
    ON public.engineer_preferred_contract_types
    FOR INSERT
    TO authenticated
    WITH CHECK (
        user_id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'ENGINEER'
    );

DROP POLICY IF EXISTS engineer_preferred_contract_types_admin_insert ON public.engineer_preferred_contract_types;
CREATE POLICY engineer_preferred_contract_types_admin_insert
    ON public.engineer_preferred_contract_types
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_preferred_contract_types_delete_own ON public.engineer_preferred_contract_types;
CREATE POLICY engineer_preferred_contract_types_delete_own
    ON public.engineer_preferred_contract_types
    FOR DELETE
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS engineer_preferred_contract_types_admin_delete ON public.engineer_preferred_contract_types;
CREATE POLICY engineer_preferred_contract_types_admin_delete
    ON public.engineer_preferred_contract_types
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- engineer_preferred_locations ------------------------------------------------

DROP POLICY IF EXISTS engineer_preferred_locations_select_own ON public.engineer_preferred_locations;
CREATE POLICY engineer_preferred_locations_select_own
    ON public.engineer_preferred_locations
    FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS engineer_preferred_locations_select_public_engineer ON public.engineer_preferred_locations;
CREATE POLICY engineer_preferred_locations_select_public_engineer
    ON public.engineer_preferred_locations
    FOR SELECT
    TO authenticated
    USING (
        (SELECT private.is_active_engineer(engineer_preferred_locations.user_id))
        AND (SELECT private.has_public_engineer_profile(engineer_preferred_locations.user_id))
    );

DROP POLICY IF EXISTS engineer_preferred_locations_select_applicant_company ON public.engineer_preferred_locations;
CREATE POLICY engineer_preferred_locations_select_applicant_company
    ON public.engineer_preferred_locations
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.applications a
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE a.applicant_id = engineer_preferred_locations.user_id
              AND o.posted_by = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS engineer_preferred_locations_select_admin ON public.engineer_preferred_locations;
CREATE POLICY engineer_preferred_locations_select_admin
    ON public.engineer_preferred_locations
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_preferred_locations_insert_own ON public.engineer_preferred_locations;
CREATE POLICY engineer_preferred_locations_insert_own
    ON public.engineer_preferred_locations
    FOR INSERT
    TO authenticated
    WITH CHECK (
        user_id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'ENGINEER'
    );

DROP POLICY IF EXISTS engineer_preferred_locations_admin_insert ON public.engineer_preferred_locations;
CREATE POLICY engineer_preferred_locations_admin_insert
    ON public.engineer_preferred_locations
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_preferred_locations_delete_own ON public.engineer_preferred_locations;
CREATE POLICY engineer_preferred_locations_delete_own
    ON public.engineer_preferred_locations
    FOR DELETE
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS engineer_preferred_locations_admin_delete ON public.engineer_preferred_locations;
CREATE POLICY engineer_preferred_locations_admin_delete
    ON public.engineer_preferred_locations
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');
