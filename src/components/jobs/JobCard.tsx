"use client";

import Link from "next/link";
import { Bookmark, MapPin } from "lucide-react";
import { ItssBadge } from "@/components/engineer/profile/ItssBadge";
import {
  CONTRACT_TYPE_BADGE_STYLES,
  JOB_LIST_META,
  WORK_STYLE_BADGE_STYLES,
  type Job,
} from "@/constants/jobs";

interface JobCardProps {
  job: Job;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export function JobCard({ job, isBookmarked, onToggleBookmark }: JobCardProps) {
  return (
    <div className="group rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
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
          </div>
          <h3 className="mt-2 truncate text-base font-semibold text-foreground">
            {job.title}
          </h3>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">
            {job.company}
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

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <p className="text-sm font-semibold text-foreground">{job.salaryLabel}</p>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <ItssBadge level={job.itssLevel} size="sm" />
          {JOB_LIST_META.itssRecommendationLabel}
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

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground">
          {JOB_LIST_META.postedPrefix}
          {job.postedLabel}
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
