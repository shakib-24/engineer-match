-- Engineer Profile full restoration, part 5/10: qualification expiration
-- date + "no expiration" flag, restoring CERTIFICATIONS[].expirationDate /
-- the ProfileEditForm's noExpiration checkbox from the old UI-only mock
-- (src/constants/engineer-profile.ts, pre-a1ecd75). No RLS change -- every
-- existing user_qualifications policy already covers these columns row-wise.

ALTER TABLE public.user_qualifications
    ADD COLUMN IF NOT EXISTS expiration_date DATE,
    ADD COLUMN IF NOT EXISTS no_expiration BOOLEAN NOT NULL DEFAULT FALSE;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'chk_user_qualifications_expiration'
          AND conrelid = 'public.user_qualifications'::regclass
    ) THEN
        ALTER TABLE public.user_qualifications
            ADD CONSTRAINT chk_user_qualifications_expiration
            CHECK (NOT (no_expiration AND expiration_date IS NOT NULL));
    END IF;
END $$;
