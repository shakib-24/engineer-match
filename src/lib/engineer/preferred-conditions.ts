import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * public.engineer_preferred_contract_types / .engineer_preferred_locations
 * (044_engineer_preferred_conditions.sql). Both are pure tag-set junction
 * tables (add/remove only, no update) -- same shape as favorites
 * (src/lib/engineer -- there is no favorites.ts today, but the RLS mirrors
 * 014_favorites.sql).
 */
export type ContractType = "EMPLOYMENT" | "PROJECT" | "HOURLY";

export interface PreferredContractTypeItem {
  id: string;
  contractType: ContractType;
}

export async function listPreferredContractTypes(
  supabase: SupabaseClient,
  userId: string,
): Promise<PreferredContractTypeItem[]> {
  const { data, error } = await supabase
    .from("engineer_preferred_contract_types")
    .select("id, contract_type")
    .eq("user_id", userId)
    .order("created_at");

  if (error) {
    console.error("[preferred-conditions] failed to list preferred contract types:", error);
    return [];
  }

  return ((data ?? []) as { id: string; contract_type: ContractType }[]).map((row) => ({
    id: row.id,
    contractType: row.contract_type,
  }));
}

export async function addPreferredContractType(
  supabase: SupabaseClient,
  userId: string,
  contractType: ContractType,
) {
  return supabase
    .from("engineer_preferred_contract_types")
    .insert({ user_id: userId, contract_type: contractType })
    .select("id, contract_type")
    .single();
}

export async function removePreferredContractType(supabase: SupabaseClient, id: string) {
  return supabase.from("engineer_preferred_contract_types").delete().eq("id", id);
}

export interface PreferredLocationItem {
  id: string;
  location: string;
}

export async function listPreferredLocations(
  supabase: SupabaseClient,
  userId: string,
): Promise<PreferredLocationItem[]> {
  const { data, error } = await supabase
    .from("engineer_preferred_locations")
    .select("id, location")
    .eq("user_id", userId)
    .order("created_at");

  if (error) {
    console.error("[preferred-conditions] failed to list preferred locations:", error);
    return [];
  }

  return (data ?? []) as PreferredLocationItem[];
}

export async function addPreferredLocation(
  supabase: SupabaseClient,
  userId: string,
  location: string,
) {
  return supabase
    .from("engineer_preferred_locations")
    .insert({ user_id: userId, location })
    .select("id, location")
    .single();
}

export async function removePreferredLocation(supabase: SupabaseClient, id: string) {
  return supabase.from("engineer_preferred_locations").delete().eq("id", id);
}
