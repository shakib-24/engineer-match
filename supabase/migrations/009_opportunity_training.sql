CREATE TABLE IF NOT EXISTS public.opportunity_training (
    opportunity_id UUID PRIMARY KEY REFERENCES public.opportunities (id) ON DELETE CASCADE,
    target_audience VARCHAR(100),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    total_hours DECIMAL(6, 1) NOT NULL,
    hourly_rate INTEGER NOT NULL,
    is_online BOOLEAN NOT NULL,
    headcount INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_opportunity_training_period_order CHECK (period_start <= period_end),
    CONSTRAINT chk_opportunity_training_total_hours CHECK (total_hours > 0),
    CONSTRAINT chk_opportunity_training_rate CHECK (hourly_rate >= 1),
    CONSTRAINT chk_opportunity_training_headcount CHECK (headcount >= 1)
);
