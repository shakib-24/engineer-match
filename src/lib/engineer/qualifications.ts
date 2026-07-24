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
  /** 有効期限, per 043_user_qualifications_expiration.sql. */
  expirationDate: string | null;
  /** 有効期限なし. Mutually exclusive with expirationDate (chk_user_qualifications_expiration). */
  noExpiration: boolean;
}

const USER_QUALIFICATION_SELECT =
  "id, qualification_id, obtained_year, expiration_date, no_expiration, qualifications(name, organization)";

/** The caller's own qualifications -- user_qualifications_select_own RLS (029_remaining_policies.sql). */
export async function listUserQualifications(
  supabase: SupabaseClient,
  userId: string,
): Promise<UserQualificationItem[]> {
  const { data, error } = await supabase
    .from("user_qualifications")
    .select(USER_QUALIFICATION_SELECT)
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
      expiration_date: string | null;
      no_expiration: boolean;
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
      expirationDate: row.expiration_date,
      noExpiration: row.no_expiration,
    };
  });
}

export interface QualificationExpirationInput {
  obtainedYear: number | null;
  expirationDate: string | null;
  noExpiration: boolean;
}

/**
 * Adds one qualification, optionally with the year it was obtained and its
 * expiration. Duplicate (user_id, qualification_id) pairs are rejected by
 * uq_user_qualifications (016_user_qualifications.sql).
 */
export async function addUserQualification(
  supabase: SupabaseClient,
  userId: string,
  qualificationId: string,
  input: QualificationExpirationInput,
) {
  return supabase
    .from("user_qualifications")
    .insert({
      user_id: userId,
      qualification_id: qualificationId,
      obtained_year: input.obtainedYear,
      expiration_date: input.noExpiration ? null : input.expirationDate,
      no_expiration: input.noExpiration,
    })
    .select(USER_QUALIFICATION_SELECT)
    .single();
}

export async function updateUserQualification(
  supabase: SupabaseClient,
  userQualificationId: string,
  input: QualificationExpirationInput,
) {
  return supabase
    .from("user_qualifications")
    .update({
      obtained_year: input.obtainedYear,
      expiration_date: input.noExpiration ? null : input.expirationDate,
      no_expiration: input.noExpiration,
    })
    .eq("id", userQualificationId)
    .select(USER_QUALIFICATION_SELECT)
    .single();
}

export async function removeUserQualification(
  supabase: SupabaseClient,
  userQualificationId: string,
) {
  return supabase.from("user_qualifications").delete().eq("id", userQualificationId);
}
