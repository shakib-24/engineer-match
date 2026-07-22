-- Applies the public.set_updated_at() trigger function (defined in 002_users.sql)
-- to every table that has an updated_at column. public.users already has its own
-- trigger (trg_users_updated_at, created in 002_users.sql) and is intentionally
-- skipped here. Tables with no updated_at column (opportunity_required_skills,
-- messages, notifications, favorites, user_skills, user_qualifications,
-- admin_audit_logs) are append-only or event-log style and are also skipped.

DROP TRIGGER IF EXISTS trg_skill_categories_updated_at ON public.skill_categories;
CREATE TRIGGER trg_skill_categories_updated_at
    BEFORE UPDATE ON public.skill_categories
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_skill_subcategories_updated_at ON public.skill_subcategories;
CREATE TRIGGER trg_skill_subcategories_updated_at
    BEFORE UPDATE ON public.skill_subcategories
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_skills_updated_at ON public.skills;
CREATE TRIGGER trg_skills_updated_at
    BEFORE UPDATE ON public.skills
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_qualifications_updated_at ON public.qualifications;
CREATE TRIGGER trg_qualifications_updated_at
    BEFORE UPDATE ON public.qualifications
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_skill_levels_updated_at ON public.skill_levels;
CREATE TRIGGER trg_skill_levels_updated_at
    BEFORE UPDATE ON public.skill_levels
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_engineer_profiles_updated_at ON public.engineer_profiles;
CREATE TRIGGER trg_engineer_profiles_updated_at
    BEFORE UPDATE ON public.engineer_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_instructor_profiles_updated_at ON public.instructor_profiles;
CREATE TRIGGER trg_instructor_profiles_updated_at
    BEFORE UPDATE ON public.instructor_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_company_profiles_updated_at ON public.company_profiles;
CREATE TRIGGER trg_company_profiles_updated_at
    BEFORE UPDATE ON public.company_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_opportunities_updated_at ON public.opportunities;
CREATE TRIGGER trg_opportunities_updated_at
    BEFORE UPDATE ON public.opportunities
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_opportunity_employment_updated_at ON public.opportunity_employment;
CREATE TRIGGER trg_opportunity_employment_updated_at
    BEFORE UPDATE ON public.opportunity_employment
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_opportunity_project_updated_at ON public.opportunity_project;
CREATE TRIGGER trg_opportunity_project_updated_at
    BEFORE UPDATE ON public.opportunity_project
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_opportunity_hourly_updated_at ON public.opportunity_hourly;
CREATE TRIGGER trg_opportunity_hourly_updated_at
    BEFORE UPDATE ON public.opportunity_hourly
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_opportunity_training_updated_at ON public.opportunity_training;
CREATE TRIGGER trg_opportunity_training_updated_at
    BEFORE UPDATE ON public.opportunity_training
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_applications_updated_at ON public.applications;
CREATE TRIGGER trg_applications_updated_at
    BEFORE UPDATE ON public.applications
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_chat_rooms_updated_at ON public.chat_rooms;
CREATE TRIGGER trg_chat_rooms_updated_at
    BEFORE UPDATE ON public.chat_rooms
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_abuse_reports_updated_at ON public.abuse_reports;
CREATE TRIGGER trg_abuse_reports_updated_at
    BEFORE UPDATE ON public.abuse_reports
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();
