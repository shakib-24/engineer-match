import type { SupabaseClient } from "@supabase/supabase-js";

function firstEmbedded<T>(value: T | T[] | null | undefined): T | null {
  if (value == null) return null;
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

/** public.qualifications, per 003_master_tables.sql. */
export interface QualificationCatalogItem {
  id: string;
  name: string;
  organization: string;
}

/** Active qualifications only -- qualifications_select_active RLS (022_master_table_policies.sql). */
export async function listQualificationCatalog(
  supabase: SupabaseClient,
): Promise<QualificationCatalogItem[]> {
  const { data, error } = await supabase
    .from("qualifications")
    .select("id, name, organization")
    .order("display_order");

  if (error) {
    console.error("[engineer-qualifications] failed to list qualification catalog:", error);
    return [];
  }

  return (data ?? []) as QualificationCatalogItem[];
}

export interface UserQualificationItem {
  id: string; // user_qualifications.id
  qualificationId: string;
  name: string;
  organization: string;
  obtainedYear: number | null;
}

/** The caller's own qualifications -- user_qualifications_select_own RLS (029_remaining_policies.sql). */
export async function listUserQualifications(
  supabase: SupabaseClient,
  userId: string,
): Promise<UserQualificationItem[]> {
  const { data, error } = await supabase
    .from("user_qualifications")
    .select("id, qualification_id, obtained_year, qualifications(name, organization)")
    .eq("user_id", userId)
    .order("created_at");

  if (error) {
    console.error("[engineer-qualifications] failed to list user qualifications:", error);
    return [];
  }

  return (
    (data ?? []) as {
      id: string;
      qualification_id: string;
      obtained_year: number | null;
      qualifications: unknown;
    }[]
  ).map((row) => {
    const qualification = firstEmbedded(
      row.qualifications as { name: string; organization: string } | { name: string; organization: string }[],
    );
    return {
      id: row.id,
      qualificationId: row.qualification_id,
      name: qualification?.name ?? "",
      organization: qualification?.organization ?? "",
      obtainedYear: row.obtained_year,
    };
  });
}

/**
 * Adds one qualification, optionally with the year it was obtained.
 * Duplicate (user_id, qualification_id) pairs are rejected by
 * uq_user_qualifications (016_user_qualifications.sql).
 */
export async function addUserQualification(
  supabase: SupabaseClient,
  userId: string,
  qualificationId: string,
  obtainedYear: number | null,
) {
  return supabase
    .from("user_qualifications")
    .insert({ user_id: userId, qualification_id: qualificationId, obtained_year: obtainedYear })
    .select("id, qualification_id, obtained_year, qualifications(name, organization)")
    .single();
}

export async function updateUserQualificationYear(
  supabase: SupabaseClient,
  userQualificationId: string,
  obtainedYear: number | null,
) {
  return supabase
    .from("user_qualifications")
    .update({ obtained_year: obtainedYear })
    .eq("id", userQualificationId)
    .select("id, qualification_id, obtained_year, qualifications(name, organization)")
    .single();
}

export async function removeUserQualification(
  supabase: SupabaseClient,
  userQualificationId: string,
) {
  return supabase.from("user_qualifications").delete().eq("id", userQualificationId);
}
