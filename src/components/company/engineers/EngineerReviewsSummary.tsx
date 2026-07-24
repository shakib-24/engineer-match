import { Star } from "lucide-react";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { StarRatingDisplay } from "@/components/reviews/StarRatingDisplay";
import { REVIEW_COUNT_SUFFIX, REVIEW_SECTION_LABELS } from "@/constants/reviews";
import type { EngineerReview } from "@/lib/reviews";

interface EngineerReviewsSummaryProps {
  reviews: EngineerReview[];
  averageRating: number;
}

/**
 * Read-only Company-side view of an engineer's reviews (Engineer Search /
 * Engineer Detail). Renders nothing when there are no visible rows — RLS
 * (engineer_reviews_select_public, 050_engineer_reviews.sql) already
 * collapses "no reviews yet" and "reviews are hidden" into the same empty
 * result, so this component must not show any empty-state hint that would
 * leak which case it is (president's requirement: hidden reviews show
 * nothing at all, not even a placeholder).
 */
export function EngineerReviewsSummary({ reviews, averageRating }: EngineerReviewsSummaryProps) {
  if (reviews.length === 0) return null;

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Star className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">{REVIEW_SECTION_LABELS.title}</h3>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <StarRatingDisplay rating={averageRating} />
        <span className="text-lg font-bold text-foreground">{averageRating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">
          {reviews.length}
          {REVIEW_COUNT_SUFFIX}
        </span>
      </div>
      <div className="mt-5 flex flex-col gap-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} canReply={false} />
        ))}
      </div>
    </section>
  );
}
