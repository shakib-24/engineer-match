-- 1. chat_rooms
CREATE TABLE IF NOT EXISTS public.chat_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES public.applications (id) ON DELETE RESTRICT,
    engineer_id UUID NOT NULL REFERENCES public.users (id) ON DELETE RESTRICT,
    company_user_id UUID NOT NULL REFERENCES public.users (id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_chat_rooms_application ON public.chat_rooms (application_id);
CREATE INDEX IF NOT EXISTS idx_chat_rooms_engineer ON public.chat_rooms (engineer_id);
CREATE INDEX IF NOT EXISTS idx_chat_rooms_company ON public.chat_rooms (company_user_id);

-- 2. messages
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_room_id UUID NOT NULL REFERENCES public.chat_rooms (id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.users (id) ON DELETE RESTRICT,
    body TEXT NOT NULL,
    sent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_messages_body_length CHECK (char_length(body) BETWEEN 1 AND 2000)
);

CREATE INDEX IF NOT EXISTS idx_messages_room_sent ON public.messages (chat_room_id, sent_at);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON public.messages (sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_unread ON public.messages (chat_room_id, read_at);
