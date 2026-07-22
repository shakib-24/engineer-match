-- chat_rooms
-- No DELETE policy anywhere on chat_rooms or messages: chat history is never
-- physically deleted (all FKs on these tables are ON DELETE RESTRICT by design).

DROP POLICY IF EXISTS chat_rooms_select_participant ON public.chat_rooms;
CREATE POLICY chat_rooms_select_participant
    ON public.chat_rooms
    FOR SELECT
    TO authenticated
    USING (
        engineer_id = (SELECT auth.uid())
        OR company_user_id = (SELECT auth.uid())
    );

DROP POLICY IF EXISTS chat_rooms_select_admin ON public.chat_rooms;
CREATE POLICY chat_rooms_select_admin
    ON public.chat_rooms
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- No participant INSERT policy: per the original design, a chat_room is
-- auto-created when an application is completed ("応募完了時に自動作成"), which
-- belongs in a SECURITY DEFINER trigger on public.applications (not yet built),
-- not a client-side insert -- letting either party freely INSERT a room row
-- referencing an arbitrary application_id would let them attach to conversations
-- they aren't part of. Admin can INSERT for support/manual correction until that
-- trigger exists.
DROP POLICY IF EXISTS chat_rooms_admin_insert ON public.chat_rooms;
CREATE POLICY chat_rooms_admin_insert
    ON public.chat_rooms
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS chat_rooms_admin_update ON public.chat_rooms;
CREATE POLICY chat_rooms_admin_update
    ON public.chat_rooms
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

-- messages
DROP POLICY IF EXISTS messages_select_participant ON public.messages;
CREATE POLICY messages_select_participant
    ON public.messages
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.chat_rooms cr
            WHERE cr.id = messages.chat_room_id
              AND (
                  cr.engineer_id = (SELECT auth.uid())
                  OR cr.company_user_id = (SELECT auth.uid())
              )
        )
    );

DROP POLICY IF EXISTS messages_select_admin ON public.messages;
CREATE POLICY messages_select_admin
    ON public.messages
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- Sender must be the authenticated user and a participant of the room; the
-- client-supplied sender_id is never trusted on its own (BR-67).
DROP POLICY IF EXISTS messages_insert_participant ON public.messages;
CREATE POLICY messages_insert_participant
    ON public.messages
    FOR INSERT
    TO authenticated
    WITH CHECK (
        sender_id = (SELECT auth.uid())
        AND EXISTS (
            SELECT 1 FROM public.chat_rooms cr
            WHERE cr.id = messages.chat_room_id
              AND (
                  cr.engineer_id = (SELECT auth.uid())
                  OR cr.company_user_id = (SELECT auth.uid())
              )
        )
    );

DROP POLICY IF EXISTS messages_admin_insert ON public.messages;
CREATE POLICY messages_admin_insert
    ON public.messages
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

-- Only read receipts are mutable (message edit/delete is out of MVP scope,
-- BR-73). Row-level policy scopes UPDATE to the *other* participant (the
-- recipient marks a message read, not the sender); column-level grants below
-- additionally block every column except read_at from being touched at all,
-- so this can't be used to silently rewrite body/sender_id even by mistake.
DROP POLICY IF EXISTS messages_update_read_receipt ON public.messages;
CREATE POLICY messages_update_read_receipt
    ON public.messages
    FOR UPDATE
    TO authenticated
    USING (
        sender_id <> (SELECT auth.uid())
        AND EXISTS (
            SELECT 1 FROM public.chat_rooms cr
            WHERE cr.id = messages.chat_room_id
              AND (
                  cr.engineer_id = (SELECT auth.uid())
                  OR cr.company_user_id = (SELECT auth.uid())
              )
        )
    )
    WITH CHECK (
        sender_id <> (SELECT auth.uid())
        AND EXISTS (
            SELECT 1 FROM public.chat_rooms cr
            WHERE cr.id = messages.chat_room_id
              AND (
                  cr.engineer_id = (SELECT auth.uid())
                  OR cr.company_user_id = (SELECT auth.uid())
              )
        )
    );

-- Supabase has no separate Postgres role for "admin" -- every logged-in user,
-- admin included, reaches PostgREST as the same authenticated role, and column
-- grants apply on top of RLS (both must pass). So this GRANT caps every
-- authenticated UPDATE -- admins too -- at read_at; there is intentionally no
-- messages_admin_update policy, since one would be silently inert against this
-- grant. Admin-level content moderation (if ever needed) has to go through the
-- service role, bypassing PostgREST grants entirely, not through an admin's own
-- authenticated session.
REVOKE UPDATE ON public.messages FROM authenticated;
GRANT UPDATE (read_at) ON public.messages TO authenticated;
