import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * public.engineer_work_experiences / .engineer_work_experience_technologies
 * (045_engineer_work_experiences.sql). technologies is a free-text list
 * (comma-separated in the UI, per the old ProfileEditForm's single "使用技術
 * （カンマ区切り）" Input) rather than a catalog-linked skill -- restored as
 * such via setWorkExperienceTechnologies(), which replaces the full set in
 * one call instead of exposing per-row add/remove.
 */
export type EmploymentType = "FULL_TIME" | "CONTRACT" | "FREELANCE" | "DISPATCH" | "PART_TIME";

export interface WorkExperienceItem {
  id: string;
  companyName: string;
  position: string | null;
  period: string | null;
  employmentType: EmploymentType | null;
  summary: string | null;
  displayOrder: number;
  technologies: string[];
}

export interface WorkExperienceInput {
  companyName: string;
  position: string | null;
  period: string | null;
  employmentType: EmploymentType | null;
  summary: string | null;
  displayOrder: number;
}

export async function listWorkExperiences(
  supabase: SupabaseClient,
  userId: string,
): Promise<WorkExperienceItem[]> {
  const { data, error } = await supabase
    .from("engineer_work_experiences")
    .select(
      "id, company_name, position, period, employment_type, summary, display_order, engineer_work_experience_technologies(technology)",
    )
    .eq("user_id", userId)
    .order("display_order")
    .order("created_at");

  if (error) {
    console.error("[work-experience] failed to list work experiences:", error);
    return [];
  }

  return (
    (data ?? []) as {
      id: string;
      company_name: string;
      position: string | null;
      period: string | null;
      employment_type: EmploymentType | null;
      summary: string | null;
      display_order: number;
      engineer_work_experience_technologies: { technology: string }[] | null;
    }[]
  ).map((row) => ({
    id: row.id,
    companyName: row.company_name,
    position: row.position,
    period: row.period,
    employmentType: row.employment_type,
    summary: row.summary,
    displayOrder: row.display_order,
    technologies: (row.engineer_work_experience_technologies ?? []).map((t) => t.technology),
  }));
}

export async function addWorkExperience(
  supabase: SupabaseClient,
  userId: string,
  input: WorkExperienceInput,
) {
  return supabase
    .from("engineer_work_experiences")
    .insert({
      user_id: userId,
      company_name: input.companyName,
      position: input.position,
      period: input.period,
      employment_type: input.employmentType,
      summary: input.summary,
      display_order: input.displayOrder,
    })
    .select("id, company_name, position, period, employment_type, summary, display_order")
    .single();
}

export async function updateWorkExperience(
  supabase: SupabaseClient,
  id: string,
  input: WorkExperienceInput,
) {
  return supabase
    .from("engineer_work_experiences")
    .update({
      company_name: input.companyName,
      position: input.position,
      period: input.period,
      employment_type: input.employmentType,
      summary: input.summary,
      display_order: input.displayOrder,
    })
    .eq("id", id)
    .select("id, company_name, position, period, employment_type, summary, display_order")
    .single();
}

export async function removeWorkExperience(supabase: SupabaseClient, id: string) {
  return supabase.from("engineer_work_experiences").delete().eq("id", id);
}

/** Replaces the full technology list for one work experience (delete-all then insert). */
export async function setWorkExperienceTechnologies(
  supabase: SupabaseClient,
  workExperienceId: string,
  technologies: string[],
) {
  const { error: deleteError } = await supabase
    .from("engineer_work_experience_technologies")
    .delete()
    .eq("work_experience_id", workExperienceId);

  if (deleteError) return { error: deleteError };

  const unique = [...new Set(technologies.map((t) => t.trim()).filter(Boolean))];
  if (unique.length === 0) return { error: null };

  return supabase.from("engineer_work_experience_technologies").insert(
    unique.map((technology) => ({ work_experience_id: workExperienceId, technology })),
  );
}
