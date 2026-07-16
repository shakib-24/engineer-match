"use client";

import { useState } from "react";
import { Bookmark, CheckCircle2, MapPin, Share2 } from "lucide-react";
import {
  APPLY_SIDEBAR_LABELS,
  CONTRACT_TYPE_BADGE_STYLES,
  type Job,
} from "@/constants/jobs";

interface ApplySidebarProps {
  job: Job;
}

export function ApplySidebar({ job }: ApplySidebarProps) {
  const [hasApplied, setHasApplied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasShared, setHasShared] = useState(false);

  function handleShare() {
    setHasShared(true);
    window.setTimeout(() => setHasShared(false), 2000);
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${CONTRACT_TYPE_BADGE_STYLES[job.contractType]}`}
      >
        {job.contractType}
      </span>

      <p className="mt-3 text-lg font-bold text-foreground">{job.salaryLabel}</p>

      <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
        {job.location}
      </p>

      {hasApplied ? (
        <div className="mt-5 flex items-start gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{APPLY_SIDEBAR_LABELS.appliedMessage}</span>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setHasApplied(true)}
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {APPLY_SIDEBAR_LABELS.applyLabel}
        </button>
      )}

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setIsBookmarked((prev) => !prev)}
          aria-pressed={isBookmarked}
          className={`inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border text-sm font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none ${
            isBookmarked
              ? "border-primary bg-primary/5 text-primary"
              : "border-border bg-surface text-foreground hover:bg-muted"
          }`}
        >
          <Bookmark
            className={`h-4 w-4 ${isBookmarked ? "fill-primary" : ""}`}
            aria-hidden="true"
          />
          {isBookmarked
            ? APPLY_SIDEBAR_LABELS.favoritedLabel
            : APPLY_SIDEBAR_LABELS.favoriteLabel}
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <Share2 className="h-4 w-4" aria-hidden="true" />
          {hasShared ? APPLY_SIDEBAR_LABELS.sharedLabel : APPLY_SIDEBAR_LABELS.shareLabel}
        </button>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        {APPLY_SIDEBAR_LABELS.demoNote}
      </p>

      <p className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
        {APPLY_SIDEBAR_LABELS.updatedLabel}：{job.updatedLabel}
      </p>
    </div>
  );
}
