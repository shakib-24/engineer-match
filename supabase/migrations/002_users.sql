CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL,
    name VARCHAR(50) NOT NULL,
    email CITEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT chk_users_role CHECK (role IN ('ENGINEER', 'INSTRUCTOR', 'COMPANY', 'ADMIN')),
    CONSTRAINT chk_users_status CHECK (status IN ('ACTIVE', 'SUSPENDED', 'WITHDRAWN')),
    CONSTRAINT chk_users_withdrawal_consistency CHECK (
        (status = 'WITHDRAWN' AND deleted_at IS NOT NULL)
        OR (status <> 'WITHDRAWN' AND deleted_at IS NULL)
    )
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_users_email ON public.users (email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users (role);
CREATE INDEX IF NOT EXISTS idx_users_status ON public.users (status);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_users_updated_at ON public.users;

CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

-- Only ENGINEER/INSTRUCTOR/COMPANY may originate from public signup metadata.
-- ADMIN rows must be provisioned out-of-band (service role), never via this trigger.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_role TEXT := NEW.raw_user_meta_data ->> 'role';
    v_name TEXT := NULLIF(TRIM(NEW.raw_user_meta_data ->> 'name'), '');
BEGIN
    IF v_role IS NULL OR v_role NOT IN ('ENGINEER', 'INSTRUCTOR', 'COMPANY') THEN
        RAISE EXCEPTION 'Invalid or missing role for public signup: %', v_role;
    END IF;

    INSERT INTO public.users (id, role, name, email)
    VALUES (
        NEW.id,
        v_role,
        COALESCE(v_name, split_part(NEW.email, '@', 1)),
        lower(NEW.email)
    )
    ON CONFLICT (id) DO NOTHING;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
