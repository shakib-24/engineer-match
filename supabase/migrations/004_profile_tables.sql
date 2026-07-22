-- 1. engineer_profiles
CREATE TABLE IF NOT EXISTS public.engineer_profiles (
    id UUID PRIMARY KEY REFERENCES public.users (id) ON DELETE CASCADE,
    prefecture VARCHAR(20),
    years_of_experience INTEGER,
    self_pr TEXT,
    work_style VARCHAR(20),
    -- desired_rate_min / desired_rate_max are stored in 万円/month (10k-yen units, monthly),
    -- per the current original design.
    desired_rate_min INTEGER,
    desired_rate_max INTEGER,
    portfolio_url VARCHAR(255),
    avatar_url VARCHAR(255),
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_engineer_profiles_years CHECK (years_of_experience BETWEEN 0 AND 50),
    CONSTRAINT chk_engineer_profiles_self_pr_length CHECK (char_length(self_pr) <= 2000),
    CONSTRAINT chk_engineer_profiles_work_style CHECK (work_style IN ('REMOTE', 'ONSITE', 'HYBRID')),
    CONSTRAINT chk_engineer_profiles_rate_min CHECK (desired_rate_min BETWEEN 1 AND 999),
    CONSTRAINT chk_engineer_profiles_rate_max CHECK (desired_rate_max BETWEEN 1 AND 999),
    CONSTRAINT chk_engineer_profiles_rate_order CHECK (desired_rate_min <= desired_rate_max)
);

CREATE INDEX IF NOT EXISTS idx_engineer_profiles_public ON public.engineer_profiles (is_public);
CREATE INDEX IF NOT EXISTS idx_engineer_profiles_prefecture ON public.engineer_profiles (prefecture);

-- 2. instructor_profiles
CREATE TABLE IF NOT EXISTS public.instructor_profiles (
    id UUID PRIMARY KEY REFERENCES public.users (id) ON DELETE CASCADE,
    prefecture VARCHAR(20),
    years_of_experience INTEGER,
    self_pr TEXT,
    work_style VARCHAR(20),
    -- desired_rate_min / desired_rate_max are stored in 万円/month (10k-yen units, monthly),
    -- per the current original design.
    desired_rate_min INTEGER,
    desired_rate_max INTEGER,
    portfolio_url VARCHAR(255),
    avatar_url VARCHAR(255),
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_instructor_profiles_years CHECK (years_of_experience BETWEEN 0 AND 50),
    CONSTRAINT chk_instructor_profiles_self_pr_length CHECK (char_length(self_pr) <= 2000),
    CONSTRAINT chk_instructor_profiles_work_style CHECK (work_style IN ('ONLINE', 'ONSITE', 'HYBRID')),
    CONSTRAINT chk_instructor_profiles_rate_min CHECK (desired_rate_min >= 0),
    CONSTRAINT chk_instructor_profiles_rate_max CHECK (desired_rate_max >= 0),
    CONSTRAINT chk_instructor_profiles_rate_order CHECK (desired_rate_min <= desired_rate_max)
);

CREATE INDEX IF NOT EXISTS idx_instructor_profiles_public ON public.instructor_profiles (is_public);
CREATE INDEX IF NOT EXISTS idx_instructor_profiles_prefecture ON public.instructor_profiles (prefecture);

-- 3. company_profiles
CREATE TABLE IF NOT EXISTS public.company_profiles (
    id UUID PRIMARY KEY REFERENCES public.users (id) ON DELETE CASCADE,
    -- DEFAULT '' because an empty company profile is auto-created immediately after signup.
    company_name VARCHAR(100) NOT NULL DEFAULT '',
    logo_url VARCHAR(255),
    prefecture VARCHAR(20),
    address VARCHAR(200),
    business_description TEXT,
    website_url VARCHAR(255),
    contact_person VARCHAR(50),
    company_size VARCHAR(20),
    industry VARCHAR(50),
    established_year INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_company_profiles_business_description_length CHECK (char_length(business_description) <= 2000),
    CONSTRAINT chk_company_profiles_size CHECK (company_size IN ('1-10', '11-50', '51-100', '101-300', '301-1000', '1001+')),
    -- Upper bound is a fixed sanity ceiling; current-year validation is handled in the application layer.
    CONSTRAINT chk_company_profiles_established_year CHECK (established_year BETWEEN 1800 AND 2100)
);

CREATE INDEX IF NOT EXISTS idx_company_profiles_industry ON public.company_profiles (industry);
CREATE INDEX IF NOT EXISTS idx_company_profiles_prefecture ON public.company_profiles (prefecture);
