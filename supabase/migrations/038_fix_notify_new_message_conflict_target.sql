-- Browser E2E testing found that every real message send failed with
-- Postgres error 42P10 ("no unique or exclusion constraint matching the ON
-- CONFLICT specification") from private.notify_new_message()'s
-- "ON CONFLICT (event_key) DO NOTHING" clause (added in
-- 036_chat_mvp_and_message_notifications.sql).
--
-- Ground truth from the live database (SELECT indexname, indexdef FROM
-- pg_indexes WHERE tablename = 'notifications'):
--   uq_notifications_user_event_key UNIQUE btree (user_id, event_key)
-- There is no single-column unique index on event_key alone -- the actually
-- deployed schema differs from what 013_notifications.sql's file content
-- currently shows (that file's "event_key VARCHAR NOT NULL" + a single-
-- column "CREATE UNIQUE INDEX ... (event_key)" no longer matches what was
-- really run against this project at some point). 037's single-column index
-- was therefore the wrong fix for the real constraint shape.
--
-- The correct fix is to match the ON CONFLICT target to the real composite
-- index: (user_id, event_key). event_key is already globally unique per
-- message ('message:' || NEW.id), so this is equivalent in practice -- it
-- just has to name both columns for Postgres to find the arbiter index.
CREATE OR REPLACE FUNCTION private.notify_new_message()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog
AS $$
DECLARE
    v_recipient UUID;
BEGIN
    SELECT CASE WHEN cr.engineer_id = NEW.sender_id THEN cr.company_user_id ELSE cr.engineer_id END
    INTO v_recipient
    FROM public.chat_rooms cr
    WHERE cr.id = NEW.chat_room_id;

    IF v_recipient IS NOT NULL THEN
        INSERT INTO public.notifications
            (user_id, type, title, body, related_entity_type, related_entity_id, event_key)
        VALUES (
            v_recipient,
            'new_message',
            '新着メッセージ',
            left(NEW.body, 255),
            'chat_room',
            NEW.chat_room_id,
            'message:' || NEW.id
        )
        ON CONFLICT (user_id, event_key) DO NOTHING;
    END IF;

    RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION private.notify_new_message() FROM PUBLIC;
