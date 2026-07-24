-- Engineer Profile full restoration, part 4/10: per-skill experience years,
-- restoring TECHNICAL_SKILLS[].experienceYears from the old UI-only mock
-- (src/constants/engineer-profile.ts, pre-a1ecd75). No RLS change -- every
-- existing user_skills policy (029_remaining_policies.sql,
-- 035_engineer_search_visibility_policies.sql) already covers this column
-- row-wise.

ALTER TABLE public.user_skills
    ADD COLUMN IF NOT EXISTS experience_years SMALLINT;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'chk_user_skills_experience_years'
          AND conrelid = 'public.user_skills'::regclass
    ) THEN
        ALTER TABLE public.user_skills
            ADD CONSTRAINT chk_user_skills_experience_years
            CHECK (experience_years BETWEEN 0 AND 50);
    END IF;
END $$;
