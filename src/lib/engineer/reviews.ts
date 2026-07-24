import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Engineer's own reply to a review they received — engineer_reviews_update_engineer
 * RLS enforces engineer_user_id = auth.uid() and locks rating/comment from
 * being touched here.
 */
export async function updateEngineerReply(supabase: SupabaseClient, reviewId: string, reply: string) {
  return supabase
    .from("engineer_reviews")
    .update({ engineer_reply: reply, replied_at: new Date().toISOString() })
    .eq("id", reviewId)
    .select("id, engineer_reply, replied_at")
    .single();
}

/**
 * Global review-visibility toggle — same upsert pattern as
 * updateProfileVisibility (src/lib/engineer/profile.ts), backed by
 * engineer_profiles.show_reviews (050_engineer_reviews.sql). One switch for
 * every review, by explicit requirement — there is no per-review variant.
 */
export async function updateReviewVisibility(supabase: SupabaseClient, userId: string, showReviews: boolean) {
  return supabase
    .from("engineer_profiles")
    .upsert({ id: userId, show_reviews: showReviews }, { onConflict: "id" })
    .select("id, show_reviews")
    .single();
}
