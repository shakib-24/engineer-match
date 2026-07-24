import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * public.engineer_portfolio_projects / .engineer_portfolio_project_technologies
 * (048_engineer_portfolio_projects.sql). Distinct from the already-real
 * engineer_profiles.portfolio_url (a single personal-site link) -- this is a
 * list of individual project case studies. technologies is free text
 * (comma-separated in the UI), same shape as work-experience.ts.
 */
export interface PortfolioProjectItem {
  id: string;
  title: string;
  role: string | null;
  description: string | null;
  url: string | null;
  period: string | null;
  displayOrder: number;
  technologies: string[];
}

export interface PortfolioProjectInput {
  title: string;
  role: string | null;
  description: string | null;
  url: string | null;
  period: string | null;
  displayOrder: number;
}

export async function listPortfolioProjects(
  supabase: SupabaseClient,
  userId: string,
): Promise<PortfolioProjectItem[]> {
  const { data, error } = await supabase
    .from("engineer_portfolio_projects")
    .select(
      "id, title, role, description, url, period, display_order, engineer_portfolio_project_technologies(technology)",
    )
    .eq("user_id", userId)
    .order("display_order")
    .order("created_at");

  if (error) {
    console.error("[portfolio] failed to list portfolio projects:", error);
    return [];
  }

  return (
    (data ?? []) as {
      id: string;
      title: string;
      role: string | null;
      description: string | null;
      url: string | null;
      period: string | null;
      display_order: number;
      engineer_portfolio_project_technologies: { technology: string }[] | null;
    }[]
  ).map((row) => ({
    id: row.id,
    title: row.title,
    role: row.role,
    description: row.description,
    url: row.url,
    period: row.period,
    displayOrder: row.display_order,
    technologies: (row.engineer_portfolio_project_technologies ?? []).map((t) => t.technology),
  }));
}

export async function addPortfolioProject(
  supabase: SupabaseClient,
  userId: string,
  input: PortfolioProjectInput,
) {
  return supabase
    .from("engineer_portfolio_projects")
    .insert({
      user_id: userId,
      title: input.title,
      role: input.role,
      description: input.description,
      url: input.url,
      period: input.period,
      display_order: input.displayOrder,
    })
    .select("id, title, role, description, url, period, display_order")
    .single();
}

export async function updatePortfolioProject(
  supabase: SupabaseClient,
  id: string,
  input: PortfolioProjectInput,
) {
  return supabase
    .from("engineer_portfolio_projects")
    .update({
      title: input.title,
      role: input.role,
      description: input.description,
      url: input.url,
      period: input.period,
      display_order: input.displayOrder,
    })
    .eq("id", id)
    .select("id, title, role, description, url, period, display_order")
    .single();
}

export async function removePortfolioProject(supabase: SupabaseClient, id: string) {
  return supabase.from("engineer_portfolio_projects").delete().eq("id", id);
}

/** Replaces the full technology list for one portfolio project (delete-all then insert). */
export async function setPortfolioProjectTechnologies(
  supabase: SupabaseClient,
  portfolioProjectId: string,
  technologies: string[],
) {
  const { error: deleteError } = await supabase
    .from("engineer_portfolio_project_technologies")
    .delete()
    .eq("portfolio_project_id", portfolioProjectId);

  if (deleteError) return { error: deleteError };

  const unique = [...new Set(technologies.map((t) => t.trim()).filter(Boolean))];
  if (unique.length === 0) return { error: null };

  return supabase.from("engineer_portfolio_project_technologies").insert(
    unique.map((technology) => ({ portfolio_project_id: portfolioProjectId, technology })),
  );
}
