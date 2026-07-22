CREATE TABLE IF NOT EXISTS public.opportunity_required_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_id UUID NOT NULL REFERENCES public.opportunities (id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills (id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_opp_req_skills ON public.opportunity_required_skills (opportunity_id, skill_id);
CREATE INDEX IF NOT EXISTS idx_opp_req_skills_skill ON public.opportunity_required_skills (skill_id);
