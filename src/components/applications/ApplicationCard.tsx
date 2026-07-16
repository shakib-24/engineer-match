"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { ApplicationStatusBadge } from "@/components/applications/ApplicationStatusBadge";
import { WithdrawDialog } from "@/components/applications/WithdrawDialog";
import {
  APPLICATION_LIST_META,
  CONTRACT_TYPE_BADGE_STYLES,
  WITHDRAWABLE_STATUSES,
  type Application,
} from "@/constants/applications";

interface ApplicationCardProps {
  application: Application;
  onWithdraw: (id: string) => void;
}

export function ApplicationCard({ application, onWithdraw }: ApplicationCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const canWithdraw = WITHDRAWABLE_STATUSES.includes(application.status);

  function handleConfirm() {
    onWithdraw(application.id);
    setIsDialogOpen(false);
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary"
            aria-hidden="true"
          >
            {application.companyInitials}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-foreground">
              {application.jobTitle}
            </h3>
            <p className="mt-0.5 truncate text-sm text-muted-foreground">
              {application.company}
            </p>
          </div>
        </div>
        <ApplicationStatusBadge status={application.status} className="shrink-0" />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${CONTRACT_TYPE_BADGE_STYLES[application.contractType]}`}
        >
          {application.contractType}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {application.location}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
        <p className="text-sm font-semibold text-foreground">
          {application.salaryLabel}
        </p>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
          {APPLICATION_LIST_META.appliedPrefix}
          {application.appliedDateLabel}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
        {canWithdraw && (
          <button
            type="button"
            onClick={() => setIsDialogOpen(true)}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {APPLICATION_LIST_META.withdrawButtonLabel}
          </button>
        )}
        <Link
          href={`/engineer/applications/${application.id}`}
          className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {APPLICATION_LIST_META.detailButtonLabel}
        </Link>
      </div>

      <WithdrawDialog
        isOpen={isDialogOpen}
        onCancel={() => setIsDialogOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
