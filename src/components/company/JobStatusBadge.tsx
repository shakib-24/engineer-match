"use client";

import { useState } from "react";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import { DeleteJobDialog } from "@/components/company/DeleteJobDialog";
import {
  CLOSE_RECRUITMENT_DIALOG_LABELS,
  JOB_DETAIL_META,
  JOB_STATUS_BADGE_STYLES,
  type JobPostingStatus,
} from "@/constants/company-jobs";
import { cn } from "@/lib/utils";

interface JobStatusBadgeProps {
  status: JobPostingStatus;
  className?: string;
}

export function JobStatusBadge({ status, className }: JobStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        JOB_STATUS_BADGE_STYLES[status],
        className,
      )}
    >
      {status}
    </span>
  );
}

interface JobDetailActionsProps {
  jobId: string;
  initialStatus: JobPostingStatus;
}

/**
 * Self-contained status badge + 編集/募集終了 action bar for the job detail
 * page. Owns its own (unpersisted) status so closing recruitment is
 * reflected immediately without needing a server round-trip.
 */
export function JobDetailActions({ jobId, initialStatus }: JobDetailActionsProps) {
  const [status, setStatus] = useState<JobPostingStatus>(initialStatus);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const canClose = status === "募集中" || status === "下書き";

  function handleConfirmClose() {
    setStatus("募集終了");
    setIsDialogOpen(false);
    setToastMessage(CLOSE_RECRUITMENT_DIALOG_LABELS.toastMessage);
    window.setTimeout(() => setToastMessage(null), 3000);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <JobStatusBadge status={status} />

      <div className="ml-auto flex flex-wrap items-center gap-3">
        <Link
          href={`/company/jobs/${jobId}/edit`}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <SquarePen className="h-4 w-4" aria-hidden="true" />
          {JOB_DETAIL_META.editLabel}
        </Link>
        {canClose && (
          <button
            type="button"
            onClick={() => setIsDialogOpen(true)}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-700 transition-colors duration-200 hover:bg-red-100 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {JOB_DETAIL_META.closeLabel}
          </button>
        )}
      </div>

      <DeleteJobDialog
        isOpen={isDialogOpen}
        onCancel={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmClose}
      />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 sm:justify-end sm:pr-6"
        >
          <div className="flex items-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-white shadow-lg">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}
