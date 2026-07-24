import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * public.engineer_reviews shape, per 050_engineer_reviews.sql. Role-neutral:
 * consumed by the Engineer's own profile (full access to own reviews via
 * engineer_reviews_select_own_engineer RLS), and by Company Engineer Search /
 * Detail (engineer_reviews_select_public RLS, gated by the engineer's own
 * engineer_profiles.show_reviews toggle). Company Applicant Detail's
 * create/edit flow uses the narrower src/lib/company/reviews.ts instead.
 */
export interface EngineerReview {
  id: string;
  applicationId: string;
  opportunityId: string;
  opportunityTitle: string;
  companyUserId: string;
  companyName: string;
  engineerUserId: string;
  rating: number;
  comment: string;
  engineerReply: string | null;
  repliedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Every review about one engineer that the caller is allowed to see. RLS
 * does all the visibility work here: the engineer viewing their own reviews
 * sees everything (engineer_reviews_select_own_engineer); any other viewer
 * sees rows only if that engineer's global show_reviews toggle is on
 * (engineer_reviews_select_public) — there is no need to branch on viewer
 * identity in this function, the query is identical either way.
 */
export async function listEngineerReviews(
  supabase: SupabaseClient,
  engineerUserId: string,
): Promise<EngineerReview[]> {
  const { data: reviews, error } = await supabase
    .from("engineer_reviews")
    .select(
      "id, application_id, opportunity_id, company_user_id, engineer_user_id, rating, comment, engineer_reply, replied_at, created_at, updated_at",
    )
    .eq("engineer_user_id", engineerUserId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[reviews] failed to list engineer reviews:", error);
    return [];
  }
  if (!reviews || reviews.length === 0) return [];

  const opportunityIds = [...new Set(reviews.map((row) => row.opportunity_id as string))];
  const companyIds = [...new Set(reviews.map((row) => row.company_user_id as string))];

  const [{ data: opportunities }, { data: companyProfiles }] = await Promise.all([
    supabase.from("opportunities").select("id, title").in("id", opportunityIds),
    supabase.from("company_profiles").select("id, company_name").in("id", companyIds),
  ]);

  const titleById = new Map((opportunities ?? []).map((row) => [row.id as string, row.title as string]));
  const companyNameById = new Map(
    (companyProfiles ?? []).map((row) => [row.id as string, row.company_name as string]),
  );

  return reviews.map((row) => ({
    id: row.id as string,
    applicationId: row.application_id as string,
    opportunityId: row.opportunity_id as string,
    opportunityTitle: titleById.get(row.opportunity_id as string) ?? "",
    companyUserId: row.company_user_id as string,
    companyName: companyNameById.get(row.company_user_id as string) ?? "",
    engineerUserId: row.engineer_user_id as string,
    rating: row.rating as number,
    comment: row.comment as string,
    engineerReply: (row.engineer_reply as string | null) ?? null,
    repliedAt: (row.replied_at as string | null) ?? null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  }));
}

export interface ReviewSummary {
  average: number | null;
  count: number;
}

/**
 * Computed from real review rows only — no cached average column exists
 * anywhere (engineer_profiles has no such column, by design: the president's
 * requirement doc explicitly says not to store a fake cached average unless
 * necessary, and a JS reduce over already-fetched rows is cheap enough here).
 */
export function summarizeReviews(reviews: { rating: number }[]): ReviewSummary {
  if (reviews.length === 0) return { average: null, count: 0 };
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return { average: Math.round((total / reviews.length) * 10) / 10, count: reviews.length };
}
