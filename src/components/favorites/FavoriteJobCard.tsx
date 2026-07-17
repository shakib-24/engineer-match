import Link from "next/link";
import { CheckCircle2, MapPin } from "lucide-react";
import { ItssBadge } from "@/components/engineer/profile/ItssBadge";
import {
  CONTRACT_TYPE_BADGE_STYLES,
  JOB_LIST_META,
  WORK_STYLE_BADGE_STYLES,
  type Job,
} from "@/constants/jobs";
import { FAVORITE_CARD_LABELS } from "@/constants/favorites";
import { formatBookmarkedDate } from "@/lib/favorite-jobs-store";

interface FavoriteJobCardProps {
  job: Job;
  addedAtISO: string;
  hasApplied: boolean;
  onApply: (jobId: string) => void;
  onRequestRemove: (jobId: string) => void;
}

export function FavoriteJobCard({
  job,
  addedAtISO,
  hasApplied,
  onApply,
  onRequestRemove,
}: FavoriteJobCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${CONTRACT_TYPE_BADGE_STYLES[job.contractType]}`}
        >
          {job.contractType}
        </span>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${WORK_STYLE_BADGE_STYLES[job.workStyle]}`}
        >
          {job.workStyle}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {job.location}
        </span>
        {hasApplied && (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            {FAVORITE_CARD_LABELS.appliedBadgeLabel}
          </span>
        )}
      </div>

      <h3 className="mt-2 truncate text-base font-semibold text-foreground">
        {job.title}
      </h3>
      <p className="mt-0.5 truncate text-sm text-muted-foreground">{job.company}</p>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <p className="text-sm font-semibold text-foreground">{job.salaryLabel}</p>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <ItssBadge level={job.itssLevel} size="sm" />
          {FAVORITE_CARD_LABELS.itssRecommendationLabel}
        </span>
      </div>

      <ul className="mt-3 flex flex-wrap gap-1.5">
        {job.requiredSkills.slice(0, 5).map((skill) => (
          <li
            key={skill}
            className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
          >
            {skill}
          </li>
        ))}
      </ul>

      <p className="mt-3 text-xs text-muted-foreground">
        {FAVORITE_CARD_LABELS.bookmarkedPrefix}
        {formatBookmarkedDate(addedAtISO)}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Link
          href={`/engineer/jobs/${job.id}`}
          className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {JOB_LIST_META.detailButtonLabel}
        </Link>

        <button
          type="button"
          disabled={hasApplied}
          onClick={() => onApply(job.id)}
          className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
        >
          {hasApplied
            ? FAVORITE_CARD_LABELS.appliedButtonLabel
            : FAVORITE_CARD_LABELS.applyButtonLabel}
        </button>

        <button
          type="button"
          onClick={() => onRequestRemove(job.id)}
          className="ml-auto inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {FAVORITE_CARD_LABELS.removeButtonLabel}
        </button>
      </div>
    </div>
  );
}
