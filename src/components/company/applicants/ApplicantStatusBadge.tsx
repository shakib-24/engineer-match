"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { ShieldX, Workflow } from "lucide-react";
import { StatusChangeDialog } from "@/components/company/applicants/StatusChangeDialog";
import { RejectDialog } from "@/components/company/applicants/RejectDialog";
import {
  ACTIVE_STATUSES,
  APPLICANT_DETAIL_META,
  APPLICANT_STATUS_BADGE_STYLES,
  REJECT_DIALOG_LABELS,
  STATUS_CHANGE_DIALOG_LABELS,
  STATUS_NEXT_STEP,
  type ApplicantStatus,
} from "@/constants/company-applicants";
import { cn } from "@/lib/utils";

interface ApplicantStatusBadgeProps {
  status: ApplicantStatus;
  className?: string;
}

export function ApplicantStatusBadge({ status, className }: ApplicantStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        APPLICANT_STATUS_BADGE_STYLES[status],
        className,
      )}
    >
      {status}
    </span>
  );
}

/**
 * Shares the (locally mutable, unpersisted) applicant status between the
 * Hero badge / Timeline in the main column and the status-change / reject
 * actions, so a change is reflected consistently across the detail page.
 */
const ApplicantStatusContext = createContext<{
  status: ApplicantStatus;
  setStatus: (status: ApplicantStatus) => void;
} | null>(null);

export function useApplicantStatusContext() {
  const context = useContext(ApplicantStatusContext);
  if (!context) {
    throw new Error(
      "This component must be rendered within ApplicantStatusProvider.",
    );
  }
  return context;
}

interface ApplicantStatusProviderProps {
  initialStatus: ApplicantStatus;
  children: ReactNode;
}

export function ApplicantStatusProvider({
  initialStatus,
  children,
}: ApplicantStatusProviderProps) {
  const [status, setStatus] = useState<ApplicantStatus>(initialStatus);

  return (
    <ApplicantStatusContext.Provider value={{ status, setStatus }}>
      {children}
    </ApplicantStatusContext.Provider>
  );
}

export function LiveApplicantStatusBadge() {
  const { status } = useApplicantStatusContext();
  return <ApplicantStatusBadge status={status} />;
}

export function ApplicantStatusActions() {
  const { status, setStatus } = useApplicantStatusContext();
  const [isChangeDialogOpen, setIsChangeDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const nextStatus = STATUS_NEXT_STEP[status];
  const canReject = ACTIVE_STATUSES.includes(status);

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 3000);
  }

  function handleConfirmChange() {
    if (!nextStatus) return;
    setStatus(nextStatus);
    setIsChangeDialogOpen(false);
    showToast(STATUS_CHANGE_DIALOG_LABELS.toastMessage);
  }

  function handleConfirmReject() {
    setStatus("不採用");
    setIsRejectDialogOpen(false);
    showToast(REJECT_DIALOG_LABELS.toastMessage);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {nextStatus && (
        <button
          type="button"
          onClick={() => setIsChangeDialogOpen(true)}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <Workflow className="h-4 w-4" aria-hidden="true" />
          {APPLICANT_DETAIL_META.changeStatusLabel}
        </button>
      )}
      {canReject && (
        <button
          type="button"
          onClick={() => setIsRejectDialogOpen(true)}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-700 transition-colors duration-200 hover:bg-red-100 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <ShieldX className="h-4 w-4" aria-hidden="true" />
          {APPLICANT_DETAIL_META.rejectLabel}
        </button>
      )}

      {nextStatus && (
        <StatusChangeDialog
          isOpen={isChangeDialogOpen}
          currentStatus={status}
          nextStatus={nextStatus}
          onCancel={() => setIsChangeDialogOpen(false)}
          onConfirm={handleConfirmChange}
        />
      )}

      <RejectDialog
        isOpen={isRejectDialogOpen}
        onCancel={() => setIsRejectDialogOpen(false)}
        onConfirm={handleConfirmReject}
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
