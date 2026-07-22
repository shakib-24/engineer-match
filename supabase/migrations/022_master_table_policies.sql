-- skill_categories
DROP POLICY IF EXISTS skill_categories_select_active ON public.skill_categories;
CREATE POLICY skill_categories_select_active
    ON public.skill_categories
    FOR SELECT
    TO authenticated
    USING (is_active = TRUE);

DROP POLICY IF EXISTS skill_categories_admin_insert ON public.skill_categories;
CREATE POLICY skill_categories_admin_insert
    ON public.skill_categories
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS skill_categories_admin_update ON public.skill_categories;
CREATE POLICY skill_categories_admin_update
    ON public.skill_categories
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS skill_categories_admin_delete ON public.skill_categories;
CREATE POLICY skill_categories_admin_delete
    ON public.skill_categories
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- skill_subcategories
DROP POLICY IF EXISTS skill_subcategories_select_active ON public.skill_subcategories;
CREATE POLICY skill_subcategories_select_active
    ON public.skill_subcategories
    FOR SELECT
    TO authenticated
    USING (is_active = TRUE);

DROP POLICY IF EXISTS skill_subcategories_admin_insert ON public.skill_subcategories;
CREATE POLICY skill_subcategories_admin_insert
    ON public.skill_subcategories
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS skill_subcategories_admin_update ON public.skill_subcategories;
CREATE POLICY skill_subcategories_admin_update
    ON public.skill_subcategories
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS skill_subcategories_admin_delete ON public.skill_subcategories;
CREATE POLICY skill_subcategories_admin_delete
    ON public.skill_subcategories
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- skills
DROP POLICY IF EXISTS skills_select_active ON public.skills;
CREATE POLICY skills_select_active
    ON public.skills
    FOR SELECT
    TO authenticated
    USING (is_active = TRUE);

DROP POLICY IF EXISTS skills_admin_insert ON public.skills;
CREATE POLICY skills_admin_insert
    ON public.skills
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS skills_admin_update ON public.skills;
CREATE POLICY skills_admin_update
    ON public.skills
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS skills_admin_delete ON public.skills;
CREATE POLICY skills_admin_delete
    ON public.skills
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- qualifications
DROP POLICY IF EXISTS qualifications_select_active ON public.qualifications;
CREATE POLICY qualifications_select_active
    ON public.qualifications
    FOR SELECT
    TO authenticated
    USING (is_active = TRUE);

DROP POLICY IF EXISTS qualifications_admin_insert ON public.qualifications;
CREATE POLICY qualifications_admin_insert
    ON public.qualifications
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS qualifications_admin_update ON public.qualifications;
CREATE POLICY qualifications_admin_update
    ON public.qualifications
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS qualifications_admin_delete ON public.qualifications;
CREATE POLICY qualifications_admin_delete
    ON public.qualifications
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- skill_levels
DROP POLICY IF EXISTS skill_levels_select_active ON public.skill_levels;
CREATE POLICY skill_levels_select_active
    ON public.skill_levels
    FOR SELECT
    TO authenticated
    USING (is_active = TRUE);

DROP POLICY IF EXISTS skill_levels_admin_insert ON public.skill_levels;
CREATE POLICY skill_levels_admin_insert
    ON public.skill_levels
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS skill_levels_admin_update ON public.skill_levels;
CREATE POLICY skill_levels_admin_update
    ON public.skill_levels
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS skill_levels_admin_delete ON public.skill_levels;
CREATE POLICY skill_levels_admin_delete
    ON public.skill_levels
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');
