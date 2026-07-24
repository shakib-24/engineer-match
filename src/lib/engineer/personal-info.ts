import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * public.engineer_personal_info (041_engineer_personal_info.sql) and
 * public.engineer_contact_details (040_engineer_contact_details.sql) are
 * deliberately two separate tables with two separate RLS visibility tiers:
 * personal_info (birth date, gender) is owner+ADMIN only, forever -- never
 * company-visible, even to a company the engineer has applied to.
 * contact_details (phone, nearest station) additionally allows an
 * applicant-company to read it, mirroring engineer_profiles_select_applicant_company.
 * Kept as genuinely separate functions/types here (never merged into one
 * object) so that distinction can't accidentally collapse in application code.
 */
export interface EngineerPersonalInfo {
  id: string;
  birth_date: string | null;
  gender: "MALE" | "FEMALE" | "UNSPECIFIED" | null;
  created_at: string;
  updated_at: string;
}

export type EngineerPersonalInfoInput = Omit<
  EngineerPersonalInfo,
  "id" | "created_at" | "updated_at"
>;

export interface EngineerContactDetails {
  id: string;
  phone: string | null;
  nearest_station: string | null;
  created_at: string;
  updated_at: string;
}

export type EngineerContactDetailsInput = Omit<
  EngineerContactDetails,
  "id" | "created_at" | "updated_at"
>;

/** A freshly-signed-up ENGINEER has no row here yet -- .maybeSingle() returns null, mirrors getEngineerProfile(). */
export async function getPersonalInfo(
  supabase: SupabaseClient,
  userId: string,
): Promise<EngineerPersonalInfo | null> {
  const { data, error } = await supabase
    .from("engineer_personal_info")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("[engineer-personal-info] failed to load engineer_personal_info row:", error);
    return null;
  }

  return data as EngineerPersonalInfo | null;
}

/** Upserts the caller's own engineer_personal_info row -- same shape as saveEngineerProfile(). */
export async function savePersonalInfo(
  supabase: SupabaseClient,
  userId: string,
  input: EngineerPersonalInfoInput,
) {
  return supabase
    .from("engineer_personal_info")
    .upsert({ id: userId, ...input }, { onConflict: "id" })
    .select("*")
    .single();
}

export async function getContactDetails(
  supabase: SupabaseClient,
  userId: string,
): Promise<EngineerContactDetails | null> {
  const { data, error } = await supabase
    .from("engineer_contact_details")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("[engineer-personal-info] failed to load engineer_contact_details row:", error);
    return null;
  }

  return data as EngineerContactDetails | null;
}

export async function saveContactDetails(
  supabase: SupabaseClient,
  userId: string,
  input: EngineerContactDetailsInput,
) {
  return supabase
    .from("engineer_contact_details")
    .upsert({ id: userId, ...input }, { onConflict: "id" })
    .select("*")
    .single();
}
