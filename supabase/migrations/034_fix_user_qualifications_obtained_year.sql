-- Fixes a pre-existing schema drift discovered while building real
-- Qualification CRUD (Engineer Profile / Skills / Qualifications phase):
-- 016_user_qualifications.sql declares public.user_qualifications with an
-- obtained_year INTEGER column (and its CHECK constraint), but the live
-- database's user_qualifications table does not actually have that column
-- (confirmed via direct REST probing -- Postgres itself returns
-- "42703 column user_qualifications.obtained_year does not exist", not a
-- PostgREST schema-cache issue). user_skills and engineer_profiles were
-- verified to match their migration files exactly, so this drift is isolated
-- to this one column on this one table. Additive, idempotent, matches
-- 016's original declared definition exactly -- brings the live schema back
-- in line with the migration file already checked into this repo.

ALTER TABLE public.user_qualifications
    ADD COLUMN IF NOT EXISTS obtained_year INTEGER;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'chk_user_qualifications_obtained_year'
          AND conrelid = 'public.user_qualifications'::regclass
    ) THEN
        ALTER TABLE public.user_qualifications
            ADD CONSTRAINT chk_user_qualifications_obtained_year
            CHECK (obtained_year BETWEEN 1950 AND 2100);
    END IF;
END $$;
