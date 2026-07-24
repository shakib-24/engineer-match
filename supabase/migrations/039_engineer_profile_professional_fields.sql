-- Engineer Profile full restoration, part 1/10: professional (non-sensitive)
-- fields directly on public.engineer_profiles. Safe to add to this table
-- because they are exactly as public as prefecture/self_pr/portfolio_url
-- already are (engineer_profiles_select_public / _select_applicant_company /
-- _select_admin, 023_profile_policies.sql, and the anon-inclusive public
-- policy from 035_engineer_search_visibility_policies.sql -- no RLS change
-- needed here, every existing policy already covers new columns row-wise).
--
-- Personal/contact fields (birth date, gender, phone, nearest station) are
-- deliberately NOT here -- see 040/041, which give them their own tables with
-- much narrower RLS, because this table's SELECT policy is public-readable.
--
-- job_category matches the old company-search CATEGORY_OPTIONS
-- (src/constants/company-engineers.ts, pre-real-data-conversion mock).
-- availability_status matches the old engineer-side AVAILABILITY_OPTIONS
-- (src/constants/engineer-profile.ts) -- the company-side vocabulary
-- (今すぐ可能/1か月以内/相談可能/稼働中) is retired in favor of this one.
-- desired_annual_income_* / desired_hourly_rate_* restore the two rate shapes
-- (契約形態=就職 / 時間精算) that existed alongside the already-real monthly
-- desired_rate_min/max (契約形態=案件).

ALTER TABLE public.engineer_profiles
    ADD COLUMN IF NOT EXISTS job_title VARCHAR(100),
    ADD COLUMN IF NOT EXISTS job_category VARCHAR(30),
    ADD COLUMN IF NOT EXISTS availability_status VARCHAR(30),
    ADD COLUMN IF NOT EXISTS github_url VARCHAR(255),
    ADD COLUMN IF NOT EXISTS desired_annual_income_min INTEGER,
    ADD COLUMN IF NOT EXISTS desired_annual_income_max INTEGER,
    ADD COLUMN IF NOT EXISTS desired_hourly_rate_min INTEGER,
    ADD COLUMN IF NOT EXISTS desired_hourly_rate_max INTEGER,
    ADD COLUMN IF NOT EXISTS available_from DATE;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'chk_engineer_profiles_job_category'
          AND conrelid = 'public.engineer_profiles'::regclass
    ) THEN
        ALTER TABLE public.engineer_profiles
            ADD CONSTRAINT chk_engineer_profiles_job_category
            CHECK (job_category IN (
                'FRONTEND', 'BACKEND', 'FULLSTACK', 'INFRA', 'CLOUD',
                'AI_DATA', 'PM', 'QA', 'SECURITY'
            ));
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'chk_engineer_profiles_availability_status'
          AND conrelid = 'public.engineer_profiles'::regclass
    ) THEN
        ALTER TABLE public.engineer_profiles
            ADD CONSTRAINT chk_engineer_profiles_availability_status
            CHECK (availability_status IN (
                'IMMEDIATE', 'NEGOTIABLE', 'CURRENTLY_EMPLOYED', 'ON_LEAVE'
            ));
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'chk_engineer_profiles_annual_income_min'
          AND conrelid = 'public.engineer_profiles'::regclass
    ) THEN
        ALTER TABLE public.engineer_profiles
            ADD CONSTRAINT chk_engineer_profiles_annual_income_min
            CHECK (desired_annual_income_min BETWEEN 1 AND 9999);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'chk_engineer_profiles_annual_income_max'
          AND conrelid = 'public.engineer_profiles'::regclass
    ) THEN
        ALTER TABLE public.engineer_profiles
            ADD CONSTRAINT chk_engineer_profiles_annual_income_max
            CHECK (desired_annual_income_max BETWEEN 1 AND 9999);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'chk_engineer_profiles_annual_income_order'
          AND conrelid = 'public.engineer_profiles'::regclass
    ) THEN
        ALTER TABLE public.engineer_profiles
            ADD CONSTRAINT chk_engineer_profiles_annual_income_order
            CHECK (desired_annual_income_min <= desired_annual_income_max);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'chk_engineer_profiles_hourly_rate_min'
          AND conrelid = 'public.engineer_profiles'::regclass
    ) THEN
        ALTER TABLE public.engineer_profiles
            ADD CONSTRAINT chk_engineer_profiles_hourly_rate_min
            CHECK (desired_hourly_rate_min BETWEEN 1 AND 99999);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'chk_engineer_profiles_hourly_rate_max'
          AND conrelid = 'public.engineer_profiles'::regclass
    ) THEN
        ALTER TABLE public.engineer_profiles
            ADD CONSTRAINT chk_engineer_profiles_hourly_rate_max
            CHECK (desired_hourly_rate_max BETWEEN 1 AND 99999);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'chk_engineer_profiles_hourly_rate_order'
          AND conrelid = 'public.engineer_profiles'::regclass
    ) THEN
        ALTER TABLE public.engineer_profiles
            ADD CONSTRAINT chk_engineer_profiles_hourly_rate_order
            CHECK (desired_hourly_rate_min <= desired_hourly_rate_max);
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_engineer_profiles_job_category ON public.engineer_profiles (job_category);
CREATE INDEX IF NOT EXISTS idx_engineer_profiles_availability_status ON public.engineer_profiles (availability_status);
