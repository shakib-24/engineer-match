CREATE TABLE IF NOT EXISTS public.user_qualifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users (id) ON DELETE CASCADE,
    qualification_id UUID NOT NULL REFERENCES public.qualifications (id) ON DELETE RESTRICT,
    obtained_year INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    -- Upper bound is a fixed sanity ceiling; current-year validation is handled in the application layer.
    CONSTRAINT chk_user_qualifications_obtained_year CHECK (obtained_year BETWEEN 1950 AND 2100)
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_user_qualifications ON public.user_qualifications (user_id, qualification_id);
CREATE INDEX IF NOT EXISTS idx_user_qualifications_qual ON public.user_qualifications (qualification_id);
