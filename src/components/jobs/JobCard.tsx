"use client";

import Link from "next/link";
import { Bookmark } from "lucide-react";
import {
  CONTRACT_TYPE_BADGE_STYLES,
  CONTRACT_TYPE_LABEL,
  JOB_LIST_META,
  WORK_STYLE_BADGE_STYLES,
  WORK_STYLE_LABEL,
} from "@/constants/jobs";
import { formatRelativeDaysJa, formatSalaryLabel } from "@/lib/engineer/format";
import type { HydratedOpportunity } from "@/lib/engineer/opportunities";

interface JobCardProps {
  job: HydratedOpportunity;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export function JobCard({ job, isBookmarked, onToggleBookmark }: JobCardProps) {
  const salaryLabel = formatSalaryLabel(job);

  return (
    <div className="group rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${CONTRACT_TYPE_BADGE_STYLES[job.contract_type]}`}
            >
              {CONTRACT_TYPE_LABEL[job.contract_type]}
            </span>
            {job.workStyle && (
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${WORK_STYLE_BADGE_STYLES[job.workStyle]}`}
              >
                {WORK_STYLE_LABEL[job.workStyle]}
              </span>
            )}
          </div>
          <h3 className="mt-2 truncate text-base font-semibold text-foreground">
            {job.title}
          </h3>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">
            {job.companyName}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onToggleBookmark(job.id)}
          aria-pressed={isBookmarked}
          aria-label={
            isBookmarked ? JOB_LIST_META.bookmarkedLabel : JOB_LIST_META.bookmarkLabel
          }
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <Bookmark
            className={isBookmarked ? "fill-primary text-primary" : ""}
            aria-hidden="true"
          />
        </button>
      </div>

      {salaryLabel && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <p className="text-sm font-semibold text-foreground">{salaryLabel}</p>
        </div>
      )}

      {job.requiredSkillNames.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {job.requiredSkillNames.slice(0, 5).map((skill) => (
            <li
              key={skill}
              className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {skill}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground">
          {JOB_LIST_META.postedPrefix}
          {formatRelativeDaysJa(job.created_at)}
        </span>
        <Link
          href={`/engineer/jobs/${job.id}`}
          className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {JOB_LIST_META.detailButtonLabel}
        </Link>
      </div>
    </div>
  );
}
