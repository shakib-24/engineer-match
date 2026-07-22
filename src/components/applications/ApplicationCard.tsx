"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { ApplicationStatusBadge } from "@/components/applications/ApplicationStatusBadge";
import { WithdrawDialog } from "@/components/applications/WithdrawDialog";
import {
  APPLICATION_LIST_META,
  CONTRACT_TYPE_BADGE_STYLES,
  CONTRACT_TYPE_LABEL,
  WITHDRAWABLE_STATUSES,
} from "@/constants/applications";
import { formatDateJa } from "@/lib/engineer/format";
import type { ApplicationListItem } from "@/lib/engineer/applications";

interface ApplicationCardProps {
  application: ApplicationListItem;
  onWithdraw: (id: string) => void;
}

export function ApplicationCard({ application, onWithdraw }: ApplicationCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const canWithdraw = (WITHDRAWABLE_STATUSES as readonly string[]).includes(application.status);
  const companyInitial = application.companyName.slice(0, 1);

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
            {companyInitial}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-foreground">
              {application.opportunityTitle}
            </h3>
            <p className="mt-0.5 truncate text-sm text-muted-foreground">
              {application.companyName}
            </p>
          </div>
        </div>
        <ApplicationStatusBadge status={application.status} className="shrink-0" />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${CONTRACT_TYPE_BADGE_STYLES[application.opportunityContractType]}`}
        >
          {CONTRACT_TYPE_LABEL[application.opportunityContractType]}
        </span>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
          {APPLICATION_LIST_META.appliedPrefix}
          {formatDateJa(application.applied_at)}
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
