CREATE TABLE IF NOT EXISTS public.opportunity_project (
    opportunity_id UUID PRIMARY KEY REFERENCES public.opportunities (id) ON DELETE CASCADE,
    deadline DATE NOT NULL,
    budget INTEGER NOT NULL,
    headcount INTEGER NOT NULL DEFAULT 1,
    is_online BOOLEAN,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_opportunity_project_budget CHECK (budget >= 1),
    CONSTRAINT chk_opportunity_project_headcount CHECK (headcount >= 1)
);
