import { Bookmark, CheckCircle2, CircleDashed, Clock } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { FAVORITE_SUMMARY_LABELS } from "@/constants/favorites";

interface FavoriteSummaryCardsProps {
  savedCount: number;
  appliedCount: number;
  notAppliedCount: number;
  recentlyAddedCount: number;
}

export function FavoriteSummaryCards({
  savedCount,
  appliedCount,
  notAppliedCount,
  recentlyAddedCount,
}: FavoriteSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label={FAVORITE_SUMMARY_LABELS.saved.label}
        value={String(savedCount)}
        helper={FAVORITE_SUMMARY_LABELS.saved.helper}
        icon={Bookmark}
      />
      <StatCard
        label={FAVORITE_SUMMARY_LABELS.applied.label}
        value={String(appliedCount)}
        helper={FAVORITE_SUMMARY_LABELS.applied.helper}
        icon={CheckCircle2}
      />
      <StatCard
        label={FAVORITE_SUMMARY_LABELS.notApplied.label}
        value={String(notAppliedCount)}
        helper={FAVORITE_SUMMARY_LABELS.notApplied.helper}
        icon={CircleDashed}
      />
      <StatCard
        label={FAVORITE_SUMMARY_LABELS.recentlyAdded.label}
        value={String(recentlyAddedCount)}
        helper={FAVORITE_SUMMARY_LABELS.recentlyAdded.helper}
        icon={Clock}
      />
    </div>
  );
}
