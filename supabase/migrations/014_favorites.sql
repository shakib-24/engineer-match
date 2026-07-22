CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users (id) ON DELETE CASCADE,
    opportunity_id UUID NOT NULL REFERENCES public.opportunities (id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_favorites ON public.favorites (user_id, opportunity_id);
CREATE INDEX IF NOT EXISTS idx_favorites_opportunity ON public.favorites (opportunity_id);
