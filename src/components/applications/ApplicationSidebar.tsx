"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { CalendarDays } from "lucide-react";
import { ApplicationStatusBadge } from "@/components/applications/ApplicationStatusBadge";
import { ApplicationTimeline } from "@/components/applications/ApplicationTimeline";
import { WithdrawDialog } from "@/components/applications/WithdrawDialog";
import {
  APPLICATION_LIST_META,
  WITHDRAWABLE_STATUSES,
  WITHDRAW_DIALOG_LABELS,
  type Application,
  type ApplicationStatus,
} from "@/constants/applications";

/**
 * Shares the (locally mutable, unpersisted) application status between the
 * Hero badge / Timeline in the main column and the Sidebar's withdraw
 * action, so a withdrawal is reflected consistently across the page.
 */
const ApplicationStatusContext = createContext<{
  status: ApplicationStatus;
  setStatus: (status: ApplicationStatus) => void;
} | null>(null);

function useApplicationStatusContext() {
  const context = useContext(ApplicationStatusContext);
  if (!context) {
    throw new Error(
      "This component must be rendered within ApplicationStatusProvider.",
    );
  }
  return context;
}

interface ApplicationStatusProviderProps {
  initialStatus: ApplicationStatus;
  children: ReactNode;
}

export function ApplicationStatusProvider({
  initialStatus,
  children,
}: ApplicationStatusProviderProps) {
  const [status, setStatus] = useState<ApplicationStatus>(initialStatus);

  return (
    <ApplicationStatusContext.Provider value={{ status, setStatus }}>
      {children}
    </ApplicationStatusContext.Provider>
  );
}

export function HeroStatusBadge() {
  const { status } = useApplicationStatusContext();
  return <ApplicationStatusBadge status={status} />;
}

interface HeroTimelineProps {
  currentStepIndex: number;
}

export function HeroTimeline({ currentStepIndex }: HeroTimelineProps) {
  const { status } = useApplicationStatusContext();
  return <ApplicationTimeline status={status} currentStepIndex={currentStepIndex} />;
}

interface ApplicationSidebarProps {
  application: Application;
}

export function ApplicationSidebar({ application }: ApplicationSidebarProps) {
  const { status, setStatus } = useApplicationStatusContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const canWithdraw = WITHDRAWABLE_STATUSES.includes(status);

  function handleConfirmWithdraw() {
    setStatus("辞退");
    setIsDialogOpen(false);
    setToastMessage(WITHDRAW_DIALOG_LABELS.toastMessage);
    window.setTimeout(() => setToastMessage(null), 3000);
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <p className="text-xs text-muted-foreground">現在のステータス</p>
      <div className="mt-2">
        <ApplicationStatusBadge status={status} />
      </div>

      <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        <CalendarDays className="h-4 w-4 shrink-0" aria-hidden="true" />
        {APPLICATION_LIST_META.appliedPrefix}
        {application.appliedDateLabel}
      </p>

      {canWithdraw && (
        <button
          type="button"
          onClick={() => setIsDialogOpen(true)}
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl border border-red-200 bg-red-50 text-sm font-semibold text-red-700 transition-colors duration-200 hover:bg-red-100 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {WITHDRAW_DIALOG_LABELS.triggerLabel}
        </button>
      )}

      <p className="mt-4 border-t border-border pt-4 text-xs text-muted-foreground">
        ※ 現在はUIデモのため、取り消し内容は保存されません。
      </p>

      <WithdrawDialog
        isOpen={isDialogOpen}
        onCancel={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmWithdraw}
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
