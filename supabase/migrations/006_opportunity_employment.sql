CREATE TABLE IF NOT EXISTS public.opportunity_employment (
    opportunity_id UUID PRIMARY KEY REFERENCES public.opportunities (id) ON DELETE CASCADE,
    work_style VARCHAR(20) NOT NULL,
    salary_min INTEGER NOT NULL,
    salary_max INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_opportunity_employment_work_style CHECK (work_style IN ('REMOTE', 'ONSITE', 'HYBRID')),
    CONSTRAINT chk_opportunity_employment_salary_min CHECK (salary_min BETWEEN 1 AND 9999),
    CONSTRAINT chk_opportunity_employment_salary_max CHECK (salary_max BETWEEN 1 AND 9999),
    CONSTRAINT chk_opportunity_employment_salary_order CHECK (salary_min <= salary_max)
);
