import Link from "next/link";
import {
  CONTRACT_TYPE_BADGE_STYLES,
  CONTRACT_TYPE_LABEL,
  JOB_LIST_META,
  WORK_STYLE_BADGE_STYLES,
  WORK_STYLE_LABEL,
} from "@/constants/jobs";
import { FAVORITE_CARD_LABELS } from "@/constants/favorites";
import { formatDateJa, formatSalaryLabel } from "@/lib/engineer/format";
import type { FavoriteOpportunity } from "@/lib/engineer/favorites";

interface FavoriteJobCardProps {
  favorite: FavoriteOpportunity;
  onRequestRemove: (opportunityId: string) => void;
}

export function FavoriteJobCard({ favorite, onRequestRemove }: FavoriteJobCardProps) {
  const salaryLabel = formatSalaryLabel(favorite);

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${CONTRACT_TYPE_BADGE_STYLES[favorite.contract_type]}`}
        >
          {CONTRACT_TYPE_LABEL[favorite.contract_type]}
        </span>
        {favorite.workStyle && (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${WORK_STYLE_BADGE_STYLES[favorite.workStyle]}`}
          >
            {WORK_STYLE_LABEL[favorite.workStyle]}
          </span>
        )}
      </div>

      <h3 className="mt-2 truncate text-base font-semibold text-foreground">{favorite.title}</h3>
      <p className="mt-0.5 truncate text-sm text-muted-foreground">{favorite.companyName}</p>

      {salaryLabel && (
        <p className="mt-3 text-sm font-semibold text-foreground">{salaryLabel}</p>
      )}

      {favorite.requiredSkillNames.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {favorite.requiredSkillNames.slice(0, 5).map((skill) => (
            <li
              key={skill}
              className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {skill}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        {FAVORITE_CARD_LABELS.bookmarkedPrefix}
        {formatDateJa(favorite.favoritedAt)}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Link
          href={`/engineer/jobs/${favorite.id}`}
          className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {JOB_LIST_META.detailButtonLabel}
        </Link>

        <button
          type="button"
          onClick={() => onRequestRemove(favorite.id)}
          className="ml-auto inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {FAVORITE_CARD_LABELS.removeButtonLabel}
        </button>
      </div>
    </div>
  );
}
