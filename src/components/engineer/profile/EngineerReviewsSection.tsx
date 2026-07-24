"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { ProfileSection } from "@/components/engineer/profile/ProfileSection";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { StarRatingDisplay } from "@/components/reviews/StarRatingDisplay";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  REVIEW_COUNT_SUFFIX,
  REVIEW_EMPTY_STATE_LABELS,
  REVIEW_SECTION_LABELS,
  REVIEW_VISIBILITY_LABELS,
} from "@/constants/reviews";
import { updateReviewVisibility } from "@/lib/engineer/reviews";
import { summarizeReviews, type EngineerReview } from "@/lib/reviews";
import { createClient } from "@/lib/supabase/client";

interface EngineerReviewsSectionProps {
  userId: string;
  reviews: EngineerReview[];
  initialShowReviews: boolean;
}

/**
 * Engineer's own reviews section (自分のプロフィール). Always shows the
 * engineer their own received reviews regardless of the visibility toggle —
 * the toggle only controls whether OTHER companies/public viewers can see
 * them (enforced by engineer_reviews_select_public RLS), never the
 * engineer's own access (president's requirement, explicit).
 */
export function EngineerReviewsSection({ userId, reviews, initialShowReviews }: EngineerReviewsSectionProps) {
  const [showReviews, setShowReviews] = useState(initialShowReviews);
  const [toggleError, setToggleError] = useState(false);
  const summary = summarizeReviews(reviews);

  async function handleToggle(checked: boolean) {
    const previous = showReviews;
    setShowReviews(checked);
    setToggleError(false);

    const supabase = createClient();
    const { error } = await updateReviewVisibility(supabase, userId, checked);

    if (error) {
      console.error("[engineer-reviews] failed to update visibility:", error);
      setShowReviews(previous);
      setToggleError(true);
    }
  }

  return (
    <ProfileSection title={REVIEW_SECTION_LABELS.title} icon={Star} description={REVIEW_SECTION_LABELS.description}>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          {summary.count > 0 ? (
            <div className="flex items-center gap-2">
              <StarRatingDisplay rating={summary.average ?? 0} />
              <span className="text-lg font-bold text-foreground">{(summary.average ?? 0).toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">
                {summary.count}
                {REVIEW_COUNT_SUFFIX}
              </span>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{REVIEW_EMPTY_STATE_LABELS.noReviews}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="review-visibility-toggle" className="text-sm text-foreground">
            {REVIEW_VISIBILITY_LABELS.toggleLabel}
          </Label>
          <Switch
            id="review-visibility-toggle"
            checked={showReviews}
            onCheckedChange={(checked) => void handleToggle(checked)}
          />
        </div>
      </div>

      {toggleError && (
        <p className="mt-3 text-xs font-medium text-red-600" role="alert">
          {REVIEW_VISIBILITY_LABELS.saveError}
        </p>
      )}

      {!showReviews && (
        <p className="mt-4 text-sm text-muted-foreground">{REVIEW_VISIBILITY_LABELS.hiddenNotice}</p>
      )}

      {reviews.length > 0 && (
        <div className="mt-5 flex flex-col gap-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} canReply />
          ))}
        </div>
      )}
    </ProfileSection>
  );
}
