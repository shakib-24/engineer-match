import type { SupabaseClient } from "@supabase/supabase-js";
import {
  listBusinessAssessments,
  listHumanAssessments,
  listLatestAttempts,
} from "@/lib/engineer/skill-assessments";

/**
 * Supabase's untyped client (no generated schema types in this project) can't
 * determine embedded-resource cardinality, so a to-one join types as an array
 * even though PostgREST returns a single object at runtime for a many-to-one
 * FK. Mirrors firstEmbedded() in src/lib/company/applicants.ts.
 */
function firstEmbedded<T>(value: T | T[] | null | undefined): T | null {
  if (value == null) return null;
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

export interface EngineerSearchListItem {
  id: string; // users.id / engineer_profiles.id
  name: string;
  prefecture: string | null;
  yearsOfExperience: number | null;
  workStyle: "REMOTE" | "ONSITE" | "HYBRID" | null;
  technicalSkills: { name: string; level: number | null }[];
  qualificationCount: number;
  humanAssessedCount: number;
  businessAssessedCount: number;
}

/**
 * Every ACTIVE, is_public=true ENGINEER -- scoped entirely by RLS
 * (engineer_profiles_select_public / users_select_public_engineer /
 * user_skills_select_public_engineer / user_qualifications_select_public_engineer,
 * 035_engineer_search_visibility_policies.sql). This is engineer DISCOVERY,
 * not applicant review, so it does not require any application relationship.
 * Batched lookups (no N+1), same shape as listCompanyApplicants()
 * (src/lib/company/applicants.ts).
 */
export async function listSearchableEngineers(
  supabase: SupabaseClient,
): Promise<EngineerSearchListItem[]> {
  const { data: profiles, error: profilesError } = await supabase
    .from("engineer_profiles")
    .select("id, prefecture, years_of_experience, work_style");

  if (profilesError) {
    console.error("[company-engineers] failed to list engineer profiles:", profilesError);
    return [];
  }
  if (!profiles || profiles.length === 0) return [];

  const ids = profiles.map((p) => p.id as string);

  const [
    { data: users },
    { data: skillRows },
    { data: qualificationRows },
    humanAssessments,
    businessAssessments,
  ] = await Promise.all([
    supabase.from("users").select("id, name").in("id", ids),
    supabase.from("user_skills").select("user_id, skill_level, skills(name)").in("user_id", ids),
    supabase.from("user_qualifications").select("user_id").in("user_id", ids),
    listHumanAssessments(supabase),
    listBusinessAssessments(supabase),
  ]);

  const assessmentIds = [...humanAssessments, ...businessAssessments].map((a) => a.id);
  const humanIds = new Set(humanAssessments.map((a) => a.id));
  const businessIds = new Set(businessAssessments.map((a) => a.id));

  // listLatestAttempts is scoped to one user_id; batch it ourselves here
  // across all searchable engineers in a single query instead.
  const attemptsByUser = new Map<string, { assessment_id: string }[]>();
  if (assessmentIds.length > 0) {
    const { data: attempts, error: attemptsError } = await supabase
      .from("skill_assessment_attempts")
      .select("user_id, assessment_id")
      .in("user_id", ids)
      .in("assessment_id", assessmentIds);

    if (attemptsError) {
      console.error("[company-engineers] failed to list assessment attempts:", attemptsError);
    } else {
      for (const row of (attempts ?? []) as { user_id: string; assessment_id: string }[]) {
        const list = attemptsByUser.get(row.user_id) ?? [];
        list.push({ assessment_id: row.assessment_id });
        attemptsByUser.set(row.user_id, list);
      }
    }
  }

  const nameById = new Map((users ?? []).map((u) => [u.id as string, u.name as string]));
  const profileById = new Map(profiles.map((p) => [p.id as string, p]));

  const skillsByUser = new Map<string, { name: string; level: number | null }[]>();
  for (const row of (skillRows ?? []) as {
    user_id: string;
    skill_level: number | null;
    skills: unknown;
  }[]) {
    const skillName = firstEmbedded(row.skills as { name: string } | { name: string }[])?.name;
    if (!skillName) continue;
    const list = skillsByUser.get(row.user_id) ?? [];
    list.push({ name: skillName, level: row.skill_level });
    skillsByUser.set(row.user_id, list);
  }

  const qualificationCountByUser = new Map<string, number>();
  for (const row of (qualificationRows ?? []) as { user_id: string }[]) {
    qualificationCountByUser.set(row.user_id, (qualificationCountByUser.get(row.user_id) ?? 0) + 1);
  }

  return ids
    .filter((id) => nameById.has(id))
    .map((id) => {
      const profile = profileById.get(id);
      const attempts = attemptsByUser.get(id) ?? [];
      return {
        id,
        name: nameById.get(id) ?? "",
        prefecture: (profile?.prefecture as string | null) ?? null,
        yearsOfExperience: (profile?.years_of_experience as number | null) ?? null,
        workStyle: (profile?.work_style as EngineerSearchListItem["workStyle"]) ?? null,
        technicalSkills: skillsByUser.get(id) ?? [],
        qualificationCount: qualificationCountByUser.get(id) ?? 0,
        humanAssessedCount: attempts.filter((a) => humanIds.has(a.assessment_id)).length,
        businessAssessedCount: attempts.filter((a) => businessIds.has(a.assessment_id)).length,
      };
    });
}

export interface EngineerAssessmentSummary {
  code: string;
  name: string;
  finalLevel: number | null;
}

export interface EngineerDetail {
  id: string;
  name: string;
  prefecture: string | null;
  yearsOfExperience: number | null;
  selfPr: string | null;
  workStyle: "REMOTE" | "ONSITE" | "HYBRID" | null;
  desiredRateMin: number | null;
  desiredRateMax: number | null;
  portfolioUrl: string | null;
  technicalSkills: { name: string; level: number | null }[];
  qualifications: { name: string; organization: string; obtainedYear: number | null }[];
  humanAssessments: EngineerAssessmentSummary[];
  businessAssessments: EngineerAssessmentSummary[];
}

/**
 * One searchable engineer's detail. Returns null uniformly for "doesn't
 * exist", "not an engineer", and "no longer public/active" -- RLS
 * (035_engineer_search_visibility_policies.sql) makes all three collapse to
 * the same "no row" result, so there is nothing to branch on here. Does not
 * select users.email: the search/discovery detail spec lists name,
 * prefecture, years_of_experience, self_pr, work_style, desired rate,
 * portfolio_url, skills, qualifications, and assessment final levels only --
 * email is intentionally not part of pre-application discovery.
 */
export async function getSearchableEngineerDetail(
  supabase: SupabaseClient,
  id: string,
): Promise<EngineerDetail | null> {
  const { data: profile, error: profileError } = await supabase
    .from("engineer_profiles")
    .select(
      "id, prefecture, years_of_experience, self_pr, work_style, desired_rate_min, desired_rate_max, portfolio_url",
    )
    .eq("id", id)
    .maybeSingle();

  if (profileError) {
    console.error("[company-engineers] failed to load engineer profile:", profileError);
    return null;
  }
  if (!profile) return null;

  const { data: userRow, error: userError } = await supabase
    .from("users")
    .select("id, name")
    .eq("id", id)
    .maybeSingle();

  if (userError) {
    console.error("[company-engineers] failed to load user row:", userError);
    return null;
  }
  if (!userRow) return null;

  const [{ data: skillRows }, { data: qualificationRows }, humanAssessments, businessAssessments] =
    await Promise.all([
      supabase.from("user_skills").select("skill_level, skills(name)").eq("user_id", id),
      supabase
        .from("user_qualifications")
        .select("obtained_year, qualifications(name, organization)")
        .eq("user_id", id),
      listHumanAssessments(supabase),
      listBusinessAssessments(supabase),
    ]);

  const latestAttempts = await listLatestAttempts(
    supabase,
    id,
    [...humanAssessments, ...businessAssessments].map((a) => a.id),
  );

  return {
    id: userRow.id as string,
    name: userRow.name as string,
    prefecture: (profile.prefecture as string | null) ?? null,
    yearsOfExperience: (profile.years_of_experience as number | null) ?? null,
    selfPr: (profile.self_pr as string | null) ?? null,
    workStyle: (profile.work_style as EngineerDetail["workStyle"]) ?? null,
    desiredRateMin: (profile.desired_rate_min as number | null) ?? null,
    desiredRateMax: (profile.desired_rate_max as number | null) ?? null,
    portfolioUrl: (profile.portfolio_url as string | null) ?? null,
    technicalSkills: ((skillRows ?? []) as { skill_level: number | null; skills: unknown }[]).map(
      (row) => ({
        name: firstEmbedded(row.skills as { name: string } | { name: string }[])?.name ?? "",
        level: row.skill_level,
      }),
    ),
    qualifications: (
      (qualificationRows ?? []) as { obtained_year: number | null; qualifications: unknown }[]
    ).map((row) => {
      const qualification = firstEmbedded(
        row.qualifications as
          | { name: string; organization: string }
          | { name: string; organization: string }[],
      );
      return {
        name: qualification?.name ?? "",
        organization: qualification?.organization ?? "",
        obtainedYear: row.obtained_year,
      };
    }),
    humanAssessments: humanAssessments.map((a) => ({
      code: a.code,
      name: a.name,
      finalLevel: latestAttempts.get(a.id)?.final_level ?? null,
    })),
    businessAssessments: businessAssessments.map((a) => ({
      code: a.code,
      name: a.name,
      finalLevel: latestAttempts.get(a.id)?.final_level ?? null,
    })),
  };
}
