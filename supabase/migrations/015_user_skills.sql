CREATE TABLE IF NOT EXISTS public.user_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users (id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills (id) ON DELETE RESTRICT,
    skill_level SMALLINT REFERENCES public.skill_levels (level) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_user_skills_skill_level CHECK (skill_level BETWEEN 1 AND 7)
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_user_skills ON public.user_skills (user_id, skill_id);
CREATE INDEX IF NOT EXISTS idx_user_skills_skill ON public.user_skills (skill_id);
