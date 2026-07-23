-- Engineer-side production-readiness phase: real Chat MVP + real-message
-- notification producer.
--
-- 1. chat_rooms currently has NO participant INSERT policy at all
--    (026_chat_policies.sql explicitly defers this: "a chat_room is
--    auto-created when an application is completed... which belongs in a
--    SECURITY DEFINER trigger on public.applications (not yet built)").
--    Rather than an auto-create-on-apply trigger, this migration takes the
--    simpler, equally-safe "lazy create on first message" approach: either
--    real participant of a real application (the applicant, or the company
--    that posted the opportunity) may create the one chat_room for that
--    application, but only with engineer_id/company_user_id set to the
--    actual real values -- never an arbitrary pairing. uq_chat_rooms_application
--    (014/012) already guarantees at most one room per application.
--
-- 2. public.notifications has no INSERT policy anywhere (by design -- system
--    generated only). This migration adds exactly ONE narrow SECURITY
--    DEFINER trigger for the one real event this phase produces (a new chat
--    message), notifying the OTHER participant. This is intentionally not a
--    general notification engine -- application-status-change and
--    opportunity-closed notifications are not touched here (would require
--    changing the Company/Admin-side update paths, out of scope this phase).

-- chat_rooms: engineer-initiated (lazy room creation on first message from
-- the applicant side).
DROP POLICY IF EXISTS chat_rooms_insert_engineer ON public.chat_rooms;
CREATE POLICY chat_rooms_insert_engineer
    ON public.chat_rooms
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1
            FROM public.applications a
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE a.id = chat_rooms.application_id
              AND a.applicant_id = (SELECT auth.uid())
              AND a.applicant_id = chat_rooms.engineer_id
              AND o.posted_by = chat_rooms.company_user_id
        )
    );

-- chat_rooms: company-initiated (symmetric policy for the same lazy-create
-- flow from the company side -- no Company UI is added this phase, but the
-- backend rule is the correct, complete shape of the ownership model and
-- costs nothing extra to add now).
DROP POLICY IF EXISTS chat_rooms_insert_company ON public.chat_rooms;
CREATE POLICY chat_rooms_insert_company
    ON public.chat_rooms
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1
            FROM public.applications a
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE a.id = chat_rooms.application_id
              AND o.posted_by = (SELECT auth.uid())
              AND o.posted_by = chat_rooms.company_user_id
              AND a.applicant_id = chat_rooms.engineer_id
        )
    );

-- Notification producer for new_message. SECURITY DEFINER so it can insert
-- into notifications despite there being no client-facing INSERT policy on
-- that table (intentionally -- see 013_notifications.sql / 027's comment).
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
        ON CONFLICT (event_key) DO NOTHING;
    END IF;

    RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION private.notify_new_message() FROM PUBLIC;

DROP TRIGGER IF EXISTS trg_notify_new_message ON public.messages;
CREATE TRIGGER trg_notify_new_message
    AFTER INSERT ON public.messages
    FOR EACH ROW
    EXECUTE FUNCTION private.notify_new_message();
