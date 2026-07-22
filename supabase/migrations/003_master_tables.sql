-- 1. skill_categories
CREATE TABLE IF NOT EXISTS public.skill_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(30) NOT NULL,
    name VARCHAR(50) NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_skill_categories_code CHECK (code IN ('TECHNICAL', 'HUMAN', 'BUSINESS'))
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_skill_categories_code ON public.skill_categories (code);
CREATE INDEX IF NOT EXISTS idx_skill_categories_active ON public.skill_categories (is_active);

-- 2. skill_subcategories
CREATE TABLE IF NOT EXISTS public.skill_subcategories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES public.skill_categories (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    name VARCHAR(50) NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_skill_subcategories_cat_name ON public.skill_subcategories (category_id, name);
CREATE INDEX IF NOT EXISTS idx_skill_subcategories_category ON public.skill_subcategories (category_id);
CREATE INDEX IF NOT EXISTS idx_skill_subcategories_active ON public.skill_subcategories (is_active);

-- 3. skills
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subcategory_id UUID NOT NULL REFERENCES public.skill_subcategories (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_skills_sub_name ON public.skills (subcategory_id, name);
CREATE INDEX IF NOT EXISTS idx_skills_subcategory ON public.skills (subcategory_id);
CREATE INDEX IF NOT EXISTS idx_skills_active ON public.skills (is_active);
CREATE INDEX IF NOT EXISTS idx_skills_name ON public.skills (name);

-- 4. qualifications
CREATE TABLE IF NOT EXISTS public.qualifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    organization VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_qualifications_org_name ON public.qualifications (organization, name);
CREATE INDEX IF NOT EXISTS idx_qualifications_active ON public.qualifications (is_active);
CREATE INDEX IF NOT EXISTS idx_qualifications_name ON public.qualifications (name);

-- 5. skill_levels
-- Natural key: user_skills.skill_level references skill_levels(level) in the original
-- design, so "level" (not a surrogate UUID) is the identifier used throughout the schema.
CREATE TABLE IF NOT EXISTS public.skill_levels (
    level SMALLINT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_skill_levels_level CHECK (level BETWEEN 1 AND 7)
);
