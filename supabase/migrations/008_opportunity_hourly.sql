CREATE TABLE IF NOT EXISTS public.opportunity_hourly (
    opportunity_id UUID PRIMARY KEY REFERENCES public.opportunities (id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    time_start TIME NOT NULL,
    time_end TIME NOT NULL,
    hourly_rate INTEGER NOT NULL,
    is_online BOOLEAN NOT NULL,
    headcount INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_opportunity_hourly_period_order CHECK (period_start <= period_end),
    CONSTRAINT chk_opportunity_hourly_time_order CHECK (time_start < time_end),
    CONSTRAINT chk_opportunity_hourly_rate CHECK (hourly_rate >= 1),
    CONSTRAINT chk_opportunity_hourly_headcount CHECK (headcount >= 1)
);
