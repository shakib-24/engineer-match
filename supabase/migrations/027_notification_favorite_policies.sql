-- notifications
-- No INSERT policy for anyone (not even admin): notifications are system-
-- generated (new application, status change, new message, listing closed) and
-- must never be client-forgeable. Real writes happen via a service-role /
-- SECURITY DEFINER path (not yet built), which bypasses RLS entirely.
--
-- Unlike messages, there's no documented "content is immutable" rule for
-- notifications, so UPDATE here is scoped by row ownership only (no
-- column-level GRANT/REVOKE) -- keeping it simple on purpose, not an oversight.

DROP POLICY IF EXISTS notifications_select_own ON public.notifications;
CREATE POLICY notifications_select_own
    ON public.notifications
    FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS notifications_select_admin ON public.notifications;
CREATE POLICY notifications_select_admin
    ON public.notifications
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS notifications_update_own ON public.notifications;
CREATE POLICY notifications_update_own
    ON public.notifications
    FOR UPDATE
    TO authenticated
    USING (user_id = (SELECT auth.uid()))
    WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS notifications_admin_update ON public.notifications;
CREATE POLICY notifications_admin_update
    ON public.notifications
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

-- Notifications have low historical value and may be physically deleted
-- (unlike applications/chat), so owners can clear their own.
DROP POLICY IF EXISTS notifications_delete_own ON public.notifications;
CREATE POLICY notifications_delete_own
    ON public.notifications
    FOR DELETE
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS notifications_admin_delete ON public.notifications;
CREATE POLICY notifications_admin_delete
    ON public.notifications
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- favorites
-- Scoped to ENGINEER per the original design ("エンジニアの掲載お気に入り登録を
-- 管理する", T-03) -- INSTRUCTOR is intentionally excluded here; flag if
-- favorites should extend to instructors too.
DROP POLICY IF EXISTS favorites_select_own ON public.favorites;
CREATE POLICY favorites_select_own
    ON public.favorites
    FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS favorites_select_admin ON public.favorites;
CREATE POLICY favorites_select_admin
    ON public.favorites
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS favorites_insert_own ON public.favorites;
CREATE POLICY favorites_insert_own
    ON public.favorites
    FOR INSERT
    TO authenticated
    WITH CHECK (
        user_id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'ENGINEER'
    );

DROP POLICY IF EXISTS favorites_delete_own ON public.favorites;
CREATE POLICY favorites_delete_own
    ON public.favorites
    FOR DELETE
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS favorites_admin_delete ON public.favorites;
CREATE POLICY favorites_admin_delete
    ON public.favorites
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');
