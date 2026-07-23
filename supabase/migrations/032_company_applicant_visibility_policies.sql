-- Company Applicant Management needs a company reviewing an applicant to be
-- able to read that applicant's public.users row (name/email), user_skills,
-- and user_qualifications -- none of which had an applicant-company SELECT
-- policy yet (only engineer_profiles / instructor_profiles /
-- skill_assessment_attempts got one in earlier phases). This migration adds
-- the same "applied to my opportunity" visibility policy to the three
-- remaining tables, mirroring engineer_profiles_select_applicant_company
-- (023_profile_policies.sql) exactly. No schema change, no existing policy
-- touched, no answers/private data exposed -- skill_assessment_answers still
-- has no company policy at all (029/030), and this migration does not add one.

DROP POLICY IF EXISTS users_select_applicant_company ON public.users;
CREATE POLICY users_select_applicant_company
    ON public.users
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.applications a
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE a.applicant_id = users.id
              AND o.posted_by = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS user_skills_select_applicant_company ON public.user_skills;
CREATE POLICY user_skills_select_applicant_company
    ON public.user_skills
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.applications a
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE a.applicant_id = user_skills.user_id
              AND o.posted_by = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS user_qualifications_select_applicant_company ON public.user_qualifications;
CREATE POLICY user_qualifications_select_applicant_company
    ON public.user_qualifications
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.applications a
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE a.applicant_id = user_qualifications.user_id
              AND o.posted_by = (SELECT auth.uid())
        )
    );
