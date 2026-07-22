CREATE TABLE IF NOT EXISTS public.opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    side VARCHAR(20) NOT NULL,
    contract_type VARCHAR(20) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'draft',
    posted_by UUID NOT NULL REFERENCES public.users (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    unpublished_by_admin BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT chk_opportunities_side CHECK (side IN ('ENGINEER', 'TRAINING')),
    CONSTRAINT chk_opportunities_contract_type CHECK (contract_type IN ('employment', 'project', 'hourly', 'training')),
    CONSTRAINT chk_opportunities_status CHECK (status IN ('draft', 'published', 'closed')),
    CONSTRAINT chk_opportunities_side_contract_type CHECK (
        (side = 'TRAINING' AND contract_type = 'training')
        OR (side = 'ENGINEER' AND contract_type IN ('employment', 'project', 'hourly'))
    )
);

CREATE INDEX IF NOT EXISTS idx_opportunities_status ON public.opportunities (status);
CREATE INDEX IF NOT EXISTS idx_opportunities_side_type ON public.opportunities (side, contract_type);
CREATE INDEX IF NOT EXISTS idx_opportunities_posted_by ON public.opportunities (posted_by);
CREATE INDEX IF NOT EXISTS idx_opportunities_published ON public.opportunities (status, created_at);
