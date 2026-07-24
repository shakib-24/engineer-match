-- Engineer Review/Rating System, part 1/2: additive "completed" application
-- status. The existing chk_applications_status (011_applications.sql) only
-- reaches 'accepted' (内定/hired) as a terminal state -- there is no signal
-- anywhere in the schema for "the work/project actually finished", which is
-- the president's literal review trigger ("お仕事をお願いした人...が終わっ
-- た後に"). Rather than overload 'accepted' (which would let a company post
-- a review the moment an offer is made, before any work happens), this adds
-- one new terminal value reachable only from 'accepted', plus a nullable
-- completed_at timestamp for when it happened. No existing row can already
-- hold this value, so this is a pure widening of the allowed set -- existing
-- data and every other status/transition are untouched.
--
-- No RLS change is needed here: applications_update_poster
-- (025_application_policies.sql) already lets the owning company set any
-- status value with no DB-level transition graph (documented there as
-- intentionally deferred to the application layer) -- only the app-level
-- STATUS_NEXT_STEP map (src/lib/company/applicants.ts) needs to learn the
-- accepted -> completed step. This table has never been altered since
-- 011_applications.sql (verified against the full migration history), so
-- chk_applications_status is guaranteed to still be the constraint's real
-- name.

ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ;

ALTER TABLE public.applications DROP CONSTRAINT IF EXISTS chk_applications_status;
ALTER TABLE public.applications
    ADD CONSTRAINT chk_applications_status
    CHECK (status IN ('applied', 'screening', 'interview', 'accepted', 'rejected', 'withdrawn', 'completed'));
