CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_id UUID NOT NULL REFERENCES public.opportunities (id) ON DELETE RESTRICT,
    applicant_id UUID NOT NULL REFERENCES public.users (id) ON DELETE RESTRICT,
    status VARCHAR(20) NOT NULL DEFAULT 'applied',
    applied_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_applications_status CHECK (
        status IN ('applied', 'screening', 'interview', 'accepted', 'rejected', 'withdrawn')
    )
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_applications_opp_applicant ON public.applications (opportunity_id, applicant_id);
CREATE INDEX IF NOT EXISTS idx_applications_applicant ON public.applications (applicant_id);
CREATE INDEX IF NOT EXISTS idx_applications_opportunity ON public.applications (opportunity_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications (status);
