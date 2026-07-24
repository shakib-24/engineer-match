import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * public.company_profiles shape, per 004_profile_tables.sql. Hand-written
 * (no Supabase codegen has been run for this project). `id` is both the
 * primary key and the FK to public.users(id) — one row per company account.
 */
export interface CompanyProfile {
  id: string;
  company_name: string;
  logo_url: string | null;
  prefecture: string | null;
  address: string | null;
  business_description: string | null;
  website_url: string | null;
  contact_person: string | null;
  company_size: string | null;
  industry: string | null;
  established_year: number | null;
  created_at: string;
  updated_at: string;
}

export type CompanyProfileInput = Omit<
  CompanyProfile,
  "id" | "created_at" | "updated_at"
>;

/**
 * A freshly-signed-up COMPANY account has no company_profiles row yet — no
 * trigger creates one at signup (handle_new_user only inserts into
 * public.users). .maybeSingle() returns null for that case instead of
 * throwing, mirroring getUserAccount()'s pattern in src/lib/auth/account.ts.
 */
export async function getCompanyProfile(
  supabase: SupabaseClient,
  userId: string,
): Promise<CompanyProfile | null> {
  const { data, error } = await supabase
    .from("company_profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("[company] failed to load company_profiles row:", error);
    return null;
  }

  return data as CompanyProfile | null;
}

/**
 * Upserts the caller's own company_profiles row. Works for both first-time
 * create (no existing row) and subsequent updates — RLS enforces
 * id = auth.uid() and role = 'COMPANY' on both the insert and update paths
 * (company_profiles_insert_own / company_profiles_update_own in
 * 023_profile_policies.sql), so this never needs a service-role client.
 */
export async function saveCompanyProfile(
  supabase: SupabaseClient,
  userId: string,
  input: CompanyProfileInput,
) {
  return supabase
    .from("company_profiles")
    .upsert({ id: userId, ...input }, { onConflict: "id" })
    .select("*")
    .single();
}

export interface CompanyHeaderIdentity {
  name: string;
  email: string;
  initials: string;
}

const COMPANY_HEADER_FALLBACK_NAME = "企業アカウント";

/**
 * Real display identity for the shared UserMenu header -- replaces the old
 * hardcoded USER_MENU.company placeholder, mirroring
 * getEngineerHeaderIdentity() in src/lib/engineer/profile.ts. Prefers the
 * company_profiles.company_name (the name the company itself set), falling
 * back to public.users.name (populated from signup metadata, present even
 * before a company_profiles row exists) and finally to a generic account
 * label -- never a name that could be mistaken for a real company.
 */
export async function getCompanyHeaderIdentity(
  supabase: SupabaseClient,
  authUser: { id: string; email?: string | null } | null,
): Promise<CompanyHeaderIdentity> {
  if (!authUser) {
    return { name: COMPANY_HEADER_FALLBACK_NAME, email: "", initials: "?" };
  }

  const [{ data: userRow }, { data: profileRow }] = await Promise.all([
    supabase.from("users").select("name, email").eq("id", authUser.id).maybeSingle(),
    supabase.from("company_profiles").select("company_name").eq("id", authUser.id).maybeSingle(),
  ]);

  const name =
    (profileRow?.company_name as string | undefined)?.trim() ||
    (userRow?.name as string | undefined)?.trim() ||
    COMPANY_HEADER_FALLBACK_NAME;
  const email = (userRow?.email as string | undefined) ?? authUser.email ?? "";

  return { name, email, initials: name.charAt(0) || "?" };
}
