import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * public.skill_assessments, per 030_skill_assessments.sql. Deliberately
 * independent of skill_categories/skills (003_master_tables.sql) — see that
 * migration's header comment for why. Only HUMAN rows exist today; BUSINESS
 * rows (論理的思考力 / 問題解決力 / 情報収集力 / プロジェクトマネジメント力 /
 * 交渉力) are reserved for a later phase once their questionnaires are supplied.
 */
export interface SkillAssessment {
  id: string;
  code: string;
  category: "HUMAN" | "BUSINESS";
  name: string;
  display_order: number;
}

export interface SkillAssessmentQuestion {
  id: string;
  assessment_id: string;
  level: 1 | 2 | 3 | 4 | 5;
  question_order: number;
  question_text: string;
}

export interface SkillAssessmentAttempt {
  id: string;
  user_id: string;
  assessment_id: string;
  yes_count: number;
  yes_count_level: 1 | 2 | 3 | 4 | 5;
  cumulative_level: 1 | 2 | 3 | 4 | 5;
  final_level: 1 | 2 | 3 | 4 | 5;
  completed_at: string;
  created_at: string;
}

export interface AssessmentScore {
  yesCount: number;
  yesCountLevel: 1 | 2 | 3 | 4 | 5;
  cumulativeLevel: 1 | 2 | 3 | 4 | 5;
  finalLevel: 1 | 2 | 3 | 4 | 5;
}

function yesCountToLevel(yesCount: number): 1 | 2 | 3 | 4 | 5 {
  if (yesCount <= 2) return 1;
  if (yesCount <= 4) return 2;
  if (yesCount <= 6) return 3;
  if (yesCount <= 8) return 4;
  return 5;
}

/**
 * Preserves the exact two-part scoring rule from the spec: the Yes-count
 * table (0-2=>1 ... 9-10=>5) and the level-by-level cumulative check (both
 * questions at a level must be Yes to "achieve" it; stop at the first level
 * that isn't fully cleared). finalLevel = min(yesCountLevel, cumulativeLevel).
 *
 * `answersInOrder` must have exactly 10 entries indexed by question_order-1
 * (i.e. answersInOrder[0]/[1] are the two Level-1 questions, [2]/[3] Level 2,
 * and so on).
 *
 * Edge case not spelled out by the spec: if even Level 1 isn't fully cleared,
 * the literal "count of fully-cleared levels" would be 0 -- but this product
 * has no "Level 0" anywhere else (ITSS is 1-7, human/business rating is 1-5),
 * so the cumulative floor is clamped to 1. This still fully enforces "don't
 * reward a high level while missing foundational ability": min(yesCountLevel, 1)
 * collapses to 1 regardless of how high the Yes-count alone would score.
 */
export function computeAssessmentScore(answersInOrder: boolean[]): AssessmentScore {
  const yesCount = answersInOrder.filter(Boolean).length;
  const yesCountLevel = yesCountToLevel(yesCount);

  let cumulativeLevel = 0;
  for (let level = 1; level <= 5; level++) {
    const first = answersInOrder[(level - 1) * 2];
    const second = answersInOrder[(level - 1) * 2 + 1];
    if (first && second) {
      cumulativeLevel = level;
    } else {
      break;
    }
  }
  const clampedCumulativeLevel = Math.max(1, cumulativeLevel) as 1 | 2 | 3 | 4 | 5;

  const finalLevel = Math.min(yesCountLevel, clampedCumulativeLevel) as 1 | 2 | 3 | 4 | 5;

  return { yesCount, yesCountLevel, cumulativeLevel: clampedCumulativeLevel, finalLevel };
}

/** The three HUMAN assessments (this phase's scope), ordered for display. */
export async function listHumanAssessments(supabase: SupabaseClient): Promise<SkillAssessment[]> {
  const { data, error } = await supabase
    .from("skill_assessments")
    .select("id, code, category, name, display_order")
    .eq("category", "HUMAN")
    .order("display_order");

  if (error) {
    console.error("[skill-assessments] failed to list HUMAN assessments:", error);
    return [];
  }

  return (data ?? []) as SkillAssessment[];
}

/** One assessment + its 10 questions, ordered 1-10, by its stable `code`. */
export async function getAssessmentByCode(
  supabase: SupabaseClient,
  code: string,
): Promise<{ assessment: SkillAssessment; questions: SkillAssessmentQuestion[] } | null> {
  const { data: assessment, error } = await supabase
    .from("skill_assessments")
    .select("id, code, category, name, display_order")
    .eq("code", code)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("[skill-assessments] failed to load assessment:", error);
    return null;
  }
  if (!assessment) return null;

  const { data: questions, error: questionsError } = await supabase
    .from("skill_assessment_questions")
    .select("id, assessment_id, level, question_order, question_text")
    .eq("assessment_id", assessment.id)
    .order("question_order");

  if (questionsError) {
    console.error("[skill-assessments] failed to load questions:", questionsError);
    return null;
  }

  return {
    assessment: assessment as SkillAssessment,
    questions: (questions ?? []) as SkillAssessmentQuestion[],
  };
}

/**
 * The most recent attempt per assessment for this user, batched into one
 * query (not one round-trip per card) for the profile page's 3 HUMAN skill
 * cards. Retaking an assessment inserts a new row rather than updating the
 * old one (030_skill_assessments.sql), so "most recent by completed_at" is
 * always the current displayed result.
 */
export async function listLatestAttempts(
  supabase: SupabaseClient,
  userId: string,
  assessmentIds: string[],
): Promise<Map<string, SkillAssessmentAttempt>> {
  if (assessmentIds.length === 0) return new Map();

  const { data, error } = await supabase
    .from("skill_assessment_attempts")
    .select("*")
    .eq("user_id", userId)
    .in("assessment_id", assessmentIds)
    .order("completed_at", { ascending: false });

  if (error) {
    console.error("[skill-assessments] failed to list latest attempts:", error);
    return new Map();
  }

  const latestByAssessment = new Map<string, SkillAssessmentAttempt>();
  for (const row of (data ?? []) as SkillAssessmentAttempt[]) {
    if (!latestByAssessment.has(row.assessment_id)) {
      latestByAssessment.set(row.assessment_id, row);
    }
  }
  return latestByAssessment;
}

export interface SubmitAnswer {
  questionId: string;
  value: boolean;
}

/**
 * Records one completed diagnosis: parent attempt row (with the computed
 * score) then its 10 answer rows. supabase-js has no cross-table transaction
 * -- if the answers insert fails after the attempt succeeded, this attempts a
 * best-effort DELETE of the attempt as cleanup, mirroring
 * createCompanyOpportunity()'s documented tradeoff (src/lib/company/jobs.ts).
 * Note skill_assessment_attempts has no owner-DELETE RLS policy (only ADMIN),
 * so as an ENGINEER caller that delete is always a harmless no-op rather than
 * real cleanup -- the orphaned attempt would have no answer rows, which is an
 * accepted, documented rare-failure risk rather than a design gap.
 */
export async function submitAssessment(
  supabase: SupabaseClient,
  userId: string,
  assessmentId: string,
  answers: SubmitAnswer[],
  score: AssessmentScore,
) {
  const { data: attempt, error: attemptError } = await supabase
    .from("skill_assessment_attempts")
    .insert({
      user_id: userId,
      assessment_id: assessmentId,
      yes_count: score.yesCount,
      yes_count_level: score.yesCountLevel,
      cumulative_level: score.cumulativeLevel,
    })
    .select("*")
    .single();

  if (attemptError || !attempt) {
    return { data: null, error: attemptError, stage: "attempt" as const };
  }

  const { error: answersError } = await supabase.from("skill_assessment_answers").insert(
    answers.map((answer) => ({
      attempt_id: attempt.id,
      question_id: answer.questionId,
      answer: answer.value,
    })),
  );

  if (answersError) {
    await supabase.from("skill_assessment_attempts").delete().eq("id", attempt.id);
    return { data: null, error: answersError, stage: "answers" as const };
  }

  return { data: attempt as SkillAssessmentAttempt, error: null, stage: null };
}
