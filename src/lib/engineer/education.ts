import type { SupabaseClient } from "@supabase/supabase-js";

/** public.engineer_educations (046_engineer_educations.sql). */
export interface EducationItem {
  id: string;
  schoolName: string;
  department: string | null;
  period: string | null;
  description: string | null;
  displayOrder: number;
}

export interface EducationInput {
  schoolName: string;
  department: string | null;
  period: string | null;
  description: string | null;
  displayOrder: number;
}

export async function listEducations(
  supabase: SupabaseClient,
  userId: string,
): Promise<EducationItem[]> {
  const { data, error } = await supabase
    .from("engineer_educations")
    .select("id, school_name, department, period, description, display_order")
    .eq("user_id", userId)
    .order("display_order")
    .order("created_at");

  if (error) {
    console.error("[education] failed to list educations:", error);
    return [];
  }

  return (
    (data ?? []) as {
      id: string;
      school_name: string;
      department: string | null;
      period: string | null;
      description: string | null;
      display_order: number;
    }[]
  ).map((row) => ({
    id: row.id,
    schoolName: row.school_name,
    department: row.department,
    period: row.period,
    description: row.description,
    displayOrder: row.display_order,
  }));
}

export async function addEducation(supabase: SupabaseClient, userId: string, input: EducationInput) {
  return supabase
    .from("engineer_educations")
    .insert({
      user_id: userId,
      school_name: input.schoolName,
      department: input.department,
      period: input.period,
      description: input.description,
      display_order: input.displayOrder,
    })
    .select("id, school_name, department, period, description, display_order")
    .single();
}

export async function updateEducation(supabase: SupabaseClient, id: string, input: EducationInput) {
  return supabase
    .from("engineer_educations")
    .update({
      school_name: input.schoolName,
      department: input.department,
      period: input.period,
      description: input.description,
      display_order: input.displayOrder,
    })
    .eq("id", id)
    .select("id, school_name, department, period, description, display_order")
    .single();
}

export async function removeEducation(supabase: SupabaseClient, id: string) {
  return supabase.from("engineer_educations").delete().eq("id", id);
}
