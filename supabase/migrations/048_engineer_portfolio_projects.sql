-- Engineer Profile full restoration, part 10/10: ポートフォリオ/プロジェクト
-- (portfolio projects), restoring PORTFOLIO_PROJECTS[] from the old UI-only
-- mock (src/constants/engineer-profile.ts, pre-a1ecd75) and the deleted
-- PortfolioCard.tsx / EngineerProfilePortfolio.tsx components. Distinct from
-- the already-real engineer_profiles.portfolio_url (a single personal-site
-- link) -- this is a list of individual project case studies.
--
-- Same parent (mutable, full CRUD) + child (pure tag list, gated through
-- parent) shape as engineer_work_experiences (045).

CREATE TABLE IF NOT EXISTS public.engineer_portfolio_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users (id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    role VARCHAR(100),
    description TEXT,
    url VARCHAR(255),
    period VARCHAR(100),
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_engineer_portfolio_projects_description_length CHECK (char_length(description) <= 2000)
);

CREATE INDEX IF NOT EXISTS idx_engineer_portfolio_projects_user ON public.engineer_portfolio_projects (user_id, display_order);

DROP TRIGGER IF EXISTS trg_engineer_portfolio_projects_updated_at ON public.engineer_portfolio_projects;
CREATE TRIGGER trg_engineer_portfolio_projects_updated_at
    BEFORE UPDATE ON public.engineer_portfolio_projects
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.engineer_portfolio_project_technologies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_project_id UUID NOT NULL REFERENCES public.engineer_portfolio_projects (id) ON DELETE CASCADE,
    technology VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_engineer_portfolio_project_technologies ON public.engineer_portfolio_project_technologies (portfolio_project_id, technology);

ALTER TABLE public.engineer_portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engineer_portfolio_project_technologies ENABLE ROW LEVEL SECURITY;

-- engineer_portfolio_projects ---------------------------------------------------

DROP POLICY IF EXISTS engineer_portfolio_projects_select_own ON public.engineer_portfolio_projects;
CREATE POLICY engineer_portfolio_projects_select_own
    ON public.engineer_portfolio_projects
    FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS engineer_portfolio_projects_select_public_engineer ON public.engineer_portfolio_projects;
CREATE POLICY engineer_portfolio_projects_select_public_engineer
    ON public.engineer_portfolio_projects
    FOR SELECT
    TO authenticated
    USING (
        (SELECT private.is_active_engineer(engineer_portfolio_projects.user_id))
        AND (SELECT private.has_public_engineer_profile(engineer_portfolio_projects.user_id))
    );

DROP POLICY IF EXISTS engineer_portfolio_projects_select_applicant_company ON public.engineer_portfolio_projects;
CREATE POLICY engineer_portfolio_projects_select_applicant_company
    ON public.engineer_portfolio_projects
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.applications a
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE a.applicant_id = engineer_portfolio_projects.user_id
              AND o.posted_by = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS engineer_portfolio_projects_select_admin ON public.engineer_portfolio_projects;
CREATE POLICY engineer_portfolio_projects_select_admin
    ON public.engineer_portfolio_projects
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_portfolio_projects_insert_own ON public.engineer_portfolio_projects;
CREATE POLICY engineer_portfolio_projects_insert_own
    ON public.engineer_portfolio_projects
    FOR INSERT
    TO authenticated
    WITH CHECK (
        user_id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'ENGINEER'
    );

DROP POLICY IF EXISTS engineer_portfolio_projects_admin_insert ON public.engineer_portfolio_projects;
CREATE POLICY engineer_portfolio_projects_admin_insert
    ON public.engineer_portfolio_projects
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_portfolio_projects_update_own ON public.engineer_portfolio_projects;
CREATE POLICY engineer_portfolio_projects_update_own
    ON public.engineer_portfolio_projects
    FOR UPDATE
    TO authenticated
    USING (user_id = (SELECT auth.uid()))
    WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS engineer_portfolio_projects_admin_update ON public.engineer_portfolio_projects;
CREATE POLICY engineer_portfolio_projects_admin_update
    ON public.engineer_portfolio_projects
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_portfolio_projects_delete_own ON public.engineer_portfolio_projects;
CREATE POLICY engineer_portfolio_projects_delete_own
    ON public.engineer_portfolio_projects
    FOR DELETE
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS engineer_portfolio_projects_admin_delete ON public.engineer_portfolio_projects;
CREATE POLICY engineer_portfolio_projects_admin_delete
    ON public.engineer_portfolio_projects
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- engineer_portfolio_project_technologies ----------------------------------------

DROP POLICY IF EXISTS engineer_portfolio_project_technologies_select_own ON public.engineer_portfolio_project_technologies;
CREATE POLICY engineer_portfolio_project_technologies_select_own
    ON public.engineer_portfolio_project_technologies
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.engineer_portfolio_projects pp
            WHERE pp.id = engineer_portfolio_project_technologies.portfolio_project_id
              AND pp.user_id = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS engineer_portfolio_project_technologies_select_public_engineer ON public.engineer_portfolio_project_technologies;
CREATE POLICY engineer_portfolio_project_technologies_select_public_engineer
    ON public.engineer_portfolio_project_technologies
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.engineer_portfolio_projects pp
            WHERE pp.id = engineer_portfolio_project_technologies.portfolio_project_id
              AND (SELECT private.is_active_engineer(pp.user_id))
              AND (SELECT private.has_public_engineer_profile(pp.user_id))
        )
    );

DROP POLICY IF EXISTS engineer_portfolio_project_technologies_select_applicant_company ON public.engineer_portfolio_project_technologies;
CREATE POLICY engineer_portfolio_project_technologies_select_applicant_company
    ON public.engineer_portfolio_project_technologies
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.engineer_portfolio_projects pp
            JOIN public.applications a ON a.applicant_id = pp.user_id
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE pp.id = engineer_portfolio_project_technologies.portfolio_project_id
              AND o.posted_by = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS engineer_portfolio_project_technologies_select_admin ON public.engineer_portfolio_project_technologies;
CREATE POLICY engineer_portfolio_project_technologies_select_admin
    ON public.engineer_portfolio_project_technologies
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_portfolio_project_technologies_insert_own ON public.engineer_portfolio_project_technologies;
CREATE POLICY engineer_portfolio_project_technologies_insert_own
    ON public.engineer_portfolio_project_technologies
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.engineer_portfolio_projects pp
            WHERE pp.id = engineer_portfolio_project_technologies.portfolio_project_id
              AND pp.user_id = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS engineer_portfolio_project_technologies_admin_insert ON public.engineer_portfolio_project_technologies;
CREATE POLICY engineer_portfolio_project_technologies_admin_insert
    ON public.engineer_portfolio_project_technologies
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS engineer_portfolio_project_technologies_delete_own ON public.engineer_portfolio_project_technologies;
CREATE POLICY engineer_portfolio_project_technologies_delete_own
    ON public.engineer_portfolio_project_technologies
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.engineer_portfolio_projects pp
            WHERE pp.id = engineer_portfolio_project_technologies.portfolio_project_id
              AND pp.user_id = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS engineer_portfolio_project_technologies_admin_delete ON public.engineer_portfolio_project_technologies;
CREATE POLICY engineer_portfolio_project_technologies_admin_delete
    ON public.engineer_portfolio_project_technologies
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');
