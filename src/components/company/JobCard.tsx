"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, Copy, MapPin, SquarePen, Users } from "lucide-react";
import { JobStatusBadge } from "@/components/company/JobStatusBadge";
import { DeleteJobDialog } from "@/components/company/DeleteJobDialog";
import {
  CONTRACT_TYPE_BADGE_STYLES,
  JOB_CARD_LABELS,
  type CompanyJob,
} from "@/constants/company-jobs";

interface JobCardProps {
  job: CompanyJob;
  onDuplicate: (id: string) => void;
  onCloseRecruitment: (id: string) => void;
}

export function JobCard({ job, onDuplicate, onCloseRecruitment }: JobCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const canClose = job.status === "募集中" || job.status === "下書き";

  function handleConfirmClose() {
    onCloseRecruitment(job.id);
    setIsDialogOpen(false);
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${CONTRACT_TYPE_BADGE_STYLES[job.contractType]}`}
            >
              {job.contractType}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {job.location}
            </span>
          </div>
          <h3 className="mt-2 truncate text-base font-semibold text-foreground">
            {job.title}
          </h3>
          <p className="mt-0.5 text-sm font-semibold text-foreground">
            {job.salaryLabel}
          </p>
        </div>
        <JobStatusBadge status={job.status} className="shrink-0" />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="h-3.5 w-3.5" aria-hidden="true" />
          {JOB_CARD_LABELS.applicantsPrefix}
          {job.applicantCount}
          {JOB_CARD_LABELS.applicantsSuffix}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
          {JOB_CARD_LABELS.publishedPrefix}
          {job.publishedDateLabel}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
        {canClose && (
          <button
            type="button"
            onClick={() => setIsDialogOpen(true)}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {JOB_CARD_LABELS.closeLabel}
          </button>
        )}
        <button
          type="button"
          onClick={() => onDuplicate(job.id)}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          {JOB_CARD_LABELS.duplicateLabel}
        </button>
        <Link
          href={`/company/jobs/${job.id}/edit`}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <SquarePen className="h-3.5 w-3.5" aria-hidden="true" />
          {JOB_CARD_LABELS.editLabel}
        </Link>
        <Link
          href={`/company/jobs/${job.id}`}
          className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {JOB_CARD_LABELS.detailLabel}
        </Link>
      </div>

      <DeleteJobDialog
        isOpen={isDialogOpen}
        onCancel={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmClose}
      />
    </div>
  );
}
