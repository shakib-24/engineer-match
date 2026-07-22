CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users (id) ON DELETE CASCADE,
    type VARCHAR(40) NOT NULL,
    title VARCHAR(100) NOT NULL,
    body VARCHAR(255) NOT NULL,
    related_entity_type VARCHAR(40),
    related_entity_id UUID,
    event_key VARCHAR(255) NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_notifications_type CHECK (
        type IN ('application_received', 'application_status_changed', 'new_message', 'opportunity_closed')
    )
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_notifications_event_key ON public.notifications (event_key);
CREATE INDEX IF NOT EXISTS idx_notifications_user_created ON public.notifications (user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON public.notifications (user_id, is_read);
