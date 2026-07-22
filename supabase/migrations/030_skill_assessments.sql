-- Human/Business Skill self-assessment module.
--
-- Deliberately independent of skill_categories/skill_subcategories/skills
-- (003_master_tables.sql): that hierarchy has zero seeded rows today and its
-- user_skills.skill_level is a flat 1-7 scale shared with the ITSS technical
-- system (015_user_skills.sql). Human/Business self-assessment is a distinct
-- 1-5, Yes/No-questionnaire-driven scale that must never be confused with
-- ITSS, so it gets its own small table group instead of overloading the
-- existing one.
--
-- 1. skill_assessments -- one row per assessable HUMAN/BUSINESS skill topic.
-- This migration seeds only the three HUMAN assessments specified for this
-- phase (コミュニケーション能力 / ヒアリング力 / プレゼンテーション力). The five
-- BUSINESS assessments (論理的思考力 / 問題解決力 / 情報収集力 /
-- プロジェクトマネジメント力 / 交渉力) reuse this same schema and can be added
-- later via a plain data migration -- no schema change needed.
CREATE TABLE IF NOT EXISTS public.skill_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(30) NOT NULL,
    category VARCHAR(20) NOT NULL,
    name VARCHAR(50) NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_skill_assessments_category CHECK (category IN ('HUMAN', 'BUSINESS'))
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_skill_assessments_code ON public.skill_assessments (code);
CREATE INDEX IF NOT EXISTS idx_skill_assessments_category ON public.skill_assessments (category);
CREATE INDEX IF NOT EXISTS idx_skill_assessments_active ON public.skill_assessments (is_active);

-- 2. skill_assessment_questions -- the fixed 10 Yes/No questions per
-- assessment (2 per level, levels 1-5). question_order is the question's
-- fixed position (1-10) within its assessment; level is redundant with
-- question_order but kept as an explicit column since the scoring logic
-- (cumulative level) reasons in terms of "both questions at this level",
-- not raw order numbers.
CREATE TABLE IF NOT EXISTS public.skill_assessment_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL REFERENCES public.skill_assessments (id) ON DELETE RESTRICT,
    level SMALLINT NOT NULL,
    question_order SMALLINT NOT NULL,
    question_text TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_skill_assessment_questions_level CHECK (level BETWEEN 1 AND 5),
    CONSTRAINT chk_skill_assessment_questions_order CHECK (question_order BETWEEN 1 AND 10),
    CONSTRAINT chk_skill_assessment_questions_level_order CHECK (level = ((question_order + 1) / 2))
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_skill_assessment_questions_order
    ON public.skill_assessment_questions (assessment_id, question_order);
CREATE INDEX IF NOT EXISTS idx_skill_assessment_questions_assessment
    ON public.skill_assessment_questions (assessment_id);

-- 3. skill_assessment_attempts -- one row per completed diagnosis. Retaking
-- an assessment inserts a NEW row rather than updating the previous one, so
-- history is preserved for free (no separate "history" table needed); the
-- current/displayed result is simply the most recent row per (user_id,
-- assessment_id), ordered by completed_at. Write-once by design (matches the
-- applications-table philosophy of never physically deleting a user's own
-- history) -- no owner UPDATE/DELETE policy is added below.
--
-- yes_count / yes_count_level / cumulative_level are all persisted (not just
-- final_level) so the result screen and any future audit can show the
-- yes-count-vs-cumulative comparison without recomputing from raw answers.
-- final_level is a GENERATED column so the "lower of the two" rule is
-- enforced by Postgres itself and can never drift from what the two source
-- levels say, regardless of what a client sends.
CREATE TABLE IF NOT EXISTS public.skill_assessment_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users (id) ON DELETE CASCADE,
    assessment_id UUID NOT NULL REFERENCES public.skill_assessments (id) ON DELETE RESTRICT,
    yes_count SMALLINT NOT NULL,
    yes_count_level SMALLINT NOT NULL,
    cumulative_level SMALLINT NOT NULL,
    final_level SMALLINT GENERATED ALWAYS AS (LEAST(yes_count_level, cumulative_level)) STORED,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_skill_assessment_attempts_yes_count CHECK (yes_count BETWEEN 0 AND 10),
    CONSTRAINT chk_skill_assessment_attempts_yes_count_level CHECK (yes_count_level BETWEEN 1 AND 5),
    CONSTRAINT chk_skill_assessment_attempts_cumulative_level CHECK (cumulative_level BETWEEN 1 AND 5),
    -- Mirrors the exact Yes-count table from the spec: 0-2=>1, 3-4=>2, 5-6=>3, 7-8=>4, 9-10=>5.
    CONSTRAINT chk_skill_assessment_attempts_yes_count_mapping CHECK (
        (yes_count BETWEEN 0 AND 2 AND yes_count_level = 1)
        OR (yes_count BETWEEN 3 AND 4 AND yes_count_level = 2)
        OR (yes_count BETWEEN 5 AND 6 AND yes_count_level = 3)
        OR (yes_count BETWEEN 7 AND 8 AND yes_count_level = 4)
        OR (yes_count BETWEEN 9 AND 10 AND yes_count_level = 5)
    )
);

CREATE INDEX IF NOT EXISTS idx_skill_assessment_attempts_user ON public.skill_assessment_attempts (user_id);
CREATE INDEX IF NOT EXISTS idx_skill_assessment_attempts_assessment ON public.skill_assessment_attempts (assessment_id);
-- Fast "latest attempt per user+assessment" lookup (profile card, retake flow).
CREATE INDEX IF NOT EXISTS idx_skill_assessment_attempts_latest
    ON public.skill_assessment_attempts (user_id, assessment_id, completed_at DESC);

-- 4. skill_assessment_answers -- the individual Yes/No responses. Deliberately
-- has NO company-readable policy anywhere (see 030 policies below): only the
-- owning engineer and ADMIN may ever read these rows. attempt_id cascades so
-- an admin deleting an attempt cleans up its answers; question_id is RESTRICT
-- so a question can't be deleted out from under recorded answers.
CREATE TABLE IF NOT EXISTS public.skill_assessment_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID NOT NULL REFERENCES public.skill_assessment_attempts (id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.skill_assessment_questions (id) ON DELETE RESTRICT,
    answer BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_skill_assessment_answers_attempt_question
    ON public.skill_assessment_answers (attempt_id, question_id);
CREATE INDEX IF NOT EXISTS idx_skill_assessment_answers_attempt ON public.skill_assessment_answers (attempt_id);
CREATE INDEX IF NOT EXISTS idx_skill_assessment_answers_question ON public.skill_assessment_answers (question_id);

-- updated_at triggers (public.set_updated_at() defined in 002_users.sql), for
-- the two mutable master tables only. skill_assessment_attempts/_answers are
-- write-once event-log style rows (no updated_at column), matching the
-- convention already documented in 019_updated_at_trigger.sql for
-- favorites/user_skills/user_qualifications/etc.
DROP TRIGGER IF EXISTS trg_skill_assessments_updated_at ON public.skill_assessments;
CREATE TRIGGER trg_skill_assessments_updated_at
    BEFORE UPDATE ON public.skill_assessments
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_skill_assessment_questions_updated_at ON public.skill_assessment_questions;
CREATE TRIGGER trg_skill_assessment_questions_updated_at
    BEFORE UPDATE ON public.skill_assessment_questions
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

-- RLS -----------------------------------------------------------------------

ALTER TABLE public.skill_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_assessment_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_assessment_answers ENABLE ROW LEVEL SECURITY;

-- skill_assessments: master data, read-only to authenticated users, mirrors
-- skill_categories_select_active / skills_select_active (022_master_table_policies.sql).
DROP POLICY IF EXISTS skill_assessments_select_active ON public.skill_assessments;
CREATE POLICY skill_assessments_select_active
    ON public.skill_assessments
    FOR SELECT
    TO authenticated
    USING (is_active = TRUE);

DROP POLICY IF EXISTS skill_assessments_admin_insert ON public.skill_assessments;
CREATE POLICY skill_assessments_admin_insert
    ON public.skill_assessments
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS skill_assessments_admin_update ON public.skill_assessments;
CREATE POLICY skill_assessments_admin_update
    ON public.skill_assessments
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS skill_assessments_admin_delete ON public.skill_assessments;
CREATE POLICY skill_assessments_admin_delete
    ON public.skill_assessments
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- skill_assessment_questions: visibility follows the parent assessment's
-- is_active flag, mirroring the opportunity_employment_select_via_opportunity
-- child-table pattern (024_opportunity_policies.sql).
DROP POLICY IF EXISTS skill_assessment_questions_select_active ON public.skill_assessment_questions;
CREATE POLICY skill_assessment_questions_select_active
    ON public.skill_assessment_questions
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.skill_assessments sa
            WHERE sa.id = skill_assessment_questions.assessment_id
              AND sa.is_active = TRUE
        )
    );

DROP POLICY IF EXISTS skill_assessment_questions_admin_insert ON public.skill_assessment_questions;
CREATE POLICY skill_assessment_questions_admin_insert
    ON public.skill_assessment_questions
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS skill_assessment_questions_admin_update ON public.skill_assessment_questions;
CREATE POLICY skill_assessment_questions_admin_update
    ON public.skill_assessment_questions
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS skill_assessment_questions_admin_delete ON public.skill_assessment_questions;
CREATE POLICY skill_assessment_questions_admin_delete
    ON public.skill_assessment_questions
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- skill_assessment_attempts: owner + ADMIN, plus the SAME visibility rules
-- engineer_profiles already uses for company access (023_profile_policies.sql)
-- -- a company may see an engineer's final level (this table has no raw
-- answers) exactly when it could already see that engineer's profile: the
-- profile is public, or the company has an applicant relationship with them.
DROP POLICY IF EXISTS skill_assessment_attempts_select_own ON public.skill_assessment_attempts;
CREATE POLICY skill_assessment_attempts_select_own
    ON public.skill_assessment_attempts
    FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS skill_assessment_attempts_select_public_profile ON public.skill_assessment_attempts;
CREATE POLICY skill_assessment_attempts_select_public_profile
    ON public.skill_assessment_attempts
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.engineer_profiles ep
            WHERE ep.id = skill_assessment_attempts.user_id
              AND ep.is_public = TRUE
        )
    );

DROP POLICY IF EXISTS skill_assessment_attempts_select_applicant_company ON public.skill_assessment_attempts;
CREATE POLICY skill_assessment_attempts_select_applicant_company
    ON public.skill_assessment_attempts
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1
            FROM public.applications a
            JOIN public.opportunities o ON o.id = a.opportunity_id
            WHERE a.applicant_id = skill_assessment_attempts.user_id
              AND o.posted_by = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS skill_assessment_attempts_select_admin ON public.skill_assessment_attempts;
CREATE POLICY skill_assessment_attempts_select_admin
    ON public.skill_assessment_attempts
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS skill_assessment_attempts_insert_own ON public.skill_assessment_attempts;
CREATE POLICY skill_assessment_attempts_insert_own
    ON public.skill_assessment_attempts
    FOR INSERT
    TO authenticated
    WITH CHECK (
        user_id = (SELECT auth.uid())
        AND (SELECT private.current_user_role()) = 'ENGINEER'
    );

-- No owner UPDATE/DELETE: an attempt is complete and immutable the moment
-- it's inserted (retake = new row). Admin retains both for moderation/support.
DROP POLICY IF EXISTS skill_assessment_attempts_admin_update ON public.skill_assessment_attempts;
CREATE POLICY skill_assessment_attempts_admin_update
    ON public.skill_assessment_attempts
    FOR UPDATE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN')
    WITH CHECK ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS skill_assessment_attempts_admin_delete ON public.skill_assessment_attempts;
CREATE POLICY skill_assessment_attempts_admin_delete
    ON public.skill_assessment_attempts
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- skill_assessment_answers: owner (via parent attempt) + ADMIN ONLY. No
-- company policy exists here at all, by design -- this is what guarantees a
-- COMPANY can never read another user's individual Yes/No answers, even
-- though it may read that user's skill_assessment_attempts row (final level
-- only).
DROP POLICY IF EXISTS skill_assessment_answers_select_own ON public.skill_assessment_answers;
CREATE POLICY skill_assessment_answers_select_own
    ON public.skill_assessment_answers
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.skill_assessment_attempts sat
            WHERE sat.id = skill_assessment_answers.attempt_id
              AND sat.user_id = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS skill_assessment_answers_select_admin ON public.skill_assessment_answers;
CREATE POLICY skill_assessment_answers_select_admin
    ON public.skill_assessment_answers
    FOR SELECT
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

DROP POLICY IF EXISTS skill_assessment_answers_insert_own ON public.skill_assessment_answers;
CREATE POLICY skill_assessment_answers_insert_own
    ON public.skill_assessment_answers
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.skill_assessment_attempts sat
            WHERE sat.id = skill_assessment_answers.attempt_id
              AND sat.user_id = (SELECT auth.uid())
        )
        AND (SELECT private.current_user_role()) = 'ENGINEER'
    );

DROP POLICY IF EXISTS skill_assessment_answers_admin_delete ON public.skill_assessment_answers;
CREATE POLICY skill_assessment_answers_admin_delete
    ON public.skill_assessment_answers
    FOR DELETE
    TO authenticated
    USING ((SELECT private.current_user_role()) = 'ADMIN');

-- Seed data -------------------------------------------------------------
-- The three HUMAN assessments in scope for this phase. BUSINESS assessments
-- (論理的思考力 / 問題解決力 / 情報収集力 / プロジェクトマネジメント力 / 交渉力)
-- are intentionally NOT seeded yet -- their questionnaires have not been
-- supplied. Adding them later is a pure data insert against this same schema.

INSERT INTO public.skill_assessments (code, category, name, display_order) VALUES
    ('HUMAN_COMMUNICATION', 'HUMAN', 'コミュニケーション能力', 1),
    ('HUMAN_LISTENING', 'HUMAN', 'ヒアリング力', 2),
    ('HUMAN_PRESENTATION', 'HUMAN', 'プレゼンテーション力', 3)
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.skill_assessment_questions (assessment_id, level, question_order, question_text)
SELECT sa.id, q.level, q.question_order, q.question_text
FROM public.skill_assessments sa
JOIN (VALUES
    ('HUMAN_COMMUNICATION', 1, 1, '決まった相手・慣れた話題であれば、一対一で要件を伝えられる'),
    ('HUMAN_COMMUNICATION', 1, 2, '話す前に、伝えたい内容を整理してから話し始められる'),
    ('HUMAN_COMMUNICATION', 2, 3, '初対面の相手にも、要件を過不足なく伝えられる'),
    ('HUMAN_COMMUNICATION', 2, 4, '複数人が同席する場でも、必要な情報を伝えられる'),
    ('HUMAN_COMMUNICATION', 3, 5, '相手の反応を見ながら、話す内容や順序を調整できる'),
    ('HUMAN_COMMUNICATION', 3, 6, '専門用語を、相手の知識レベルに合わせて言い換えられる'),
    ('HUMAN_COMMUNICATION', 4, 7, '立場や意見が異なる相手とも、関係を崩さず話し合いを続けられる'),
    ('HUMAN_COMMUNICATION', 4, 8, '意見が対立する場面で、双方が納得できる着地点を提案できる'),
    ('HUMAN_COMMUNICATION', 5, 9, '利害が対立する複数の相手の間に立ち、合意形成を主導できる'),
    ('HUMAN_COMMUNICATION', 5, 10, '議論が停滞・紛糾した場面でも、話を前に進める役割を担える'),

    ('HUMAN_LISTENING', 1, 1, '相手の話を遮らず、最後まで聞くことができる'),
    ('HUMAN_LISTENING', 1, 2, '表面的な要望を正確に受け取れる'),
    ('HUMAN_LISTENING', 2, 3, '聞いた内容を正確に復唱・確認できる'),
    ('HUMAN_LISTENING', 2, 4, '聞いた内容を漏れなくメモや記録に残せる'),
    ('HUMAN_LISTENING', 3, 5, '質問を重ねて、相手が言葉にしていない前提や制約を引き出せる'),
    ('HUMAN_LISTENING', 3, 6, '曖昧な発言に対して、具体的な質問で深掘りできる'),
    ('HUMAN_LISTENING', 4, 7, '相手自身が気づいていない本質的な課題を言語化できる'),
    ('HUMAN_LISTENING', 4, 8, '話の矛盾点や違和感を指摘し、相手と一緒に整理できる'),
    ('HUMAN_LISTENING', 5, 9, '複数人へのヒアリングを統合し、組織全体の課題構造を描ける'),
    ('HUMAN_LISTENING', 5, 10, '異なる立場の意見を統合して、共通する本質的課題を見出せる'),

    ('HUMAN_PRESENTATION', 1, 1, '用意した資料を読み上げる形で、内容を説明できる'),
    ('HUMAN_PRESENTATION', 1, 2, '伝えたいポイントを事前に整理して臨める'),
    ('HUMAN_PRESENTATION', 2, 3, '資料に沿って、聞き手に伝わる順序で説明できる'),
    ('HUMAN_PRESENTATION', 2, 4, '時間内に収まるよう、話す内容の配分を調整できる'),
    ('HUMAN_PRESENTATION', 3, 5, '聞き手の反応を見ながら、説明の深さや順番を調整できる'),
    ('HUMAN_PRESENTATION', 3, 6, '聞き手のレベルに合わせて、専門用語を言い換えられる'),
    ('HUMAN_PRESENTATION', 4, 7, '質疑応答で想定外の質問にもその場で筋道立てて回答できる'),
    ('HUMAN_PRESENTATION', 4, 8, '反論や指摘に対して、冷静に根拠を示して応答できる'),
    ('HUMAN_PRESENTATION', 5, 9, '相手の意思決定や行動変容を促すプレゼンができる'),
    ('HUMAN_PRESENTATION', 5, 10, '複数の利害関係者が同席する場でも、合意形成に導けるプレゼンができる')
) AS q(code, level, question_order, question_text)
    ON q.code = sa.code
ON CONFLICT (assessment_id, question_order) DO NOTHING;
