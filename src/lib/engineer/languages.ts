import type { SupabaseClient } from "@supabase/supabase-js";

/** public.engineer_languages (047_engineer_languages.sql). */
export type LanguageLevel = "NATIVE" | "BUSINESS" | "CONVERSATIONAL" | "BASIC" | "LEARNING";

export interface LanguageItem {
  id: string;
  languageName: string;
  level: LanguageLevel;
  displayOrder: number;
}

export async function listLanguages(
  supabase: SupabaseClient,
  userId: string,
): Promise<LanguageItem[]> {
  const { data, error } = await supabase
    .from("engineer_languages")
    .select("id, language_name, level, display_order")
    .eq("user_id", userId)
    .order("display_order")
    .order("created_at");

  if (error) {
    console.error("[languages] failed to list languages:", error);
    return [];
  }

  return (
    (data ?? []) as { id: string; language_name: string; level: LanguageLevel; display_order: number }[]
  ).map((row) => ({
    id: row.id,
    languageName: row.language_name,
    level: row.level,
    displayOrder: row.display_order,
  }));
}

export async function addLanguage(
  supabase: SupabaseClient,
  userId: string,
  languageName: string,
  level: LanguageLevel,
) {
  return supabase
    .from("engineer_languages")
    .insert({ user_id: userId, language_name: languageName, level })
    .select("id, language_name, level, display_order")
    .single();
}

export async function updateLanguageLevel(
  supabase: SupabaseClient,
  id: string,
  level: LanguageLevel,
) {
  return supabase
    .from("engineer_languages")
    .update({ level })
    .eq("id", id)
    .select("id, language_name, level, display_order")
    .single();
}

export async function removeLanguage(supabase: SupabaseClient, id: string) {
  return supabase.from("engineer_languages").delete().eq("id", id);
}
