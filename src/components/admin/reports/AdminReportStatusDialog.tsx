"use client";

import { AdminConfirmationDialog } from "@/components/admin/shared/AdminConfirmationDialog";
import { ADMIN_REPORT_ACTION_DIALOG_LABELS as LABELS } from "@/constants/admin-reports";

export type AdminReportDialogMode =
  | "startHandling"
  | "warn"
  | "unpublishContent"
  | "suspendAccount"
  | "dismiss"
  | "resolve"
  | null;

interface AdminReportStatusDialogProps {
  mode: AdminReportDialogMode;
  onCancel: () => void;
  onConfirm: (reason?: string) => void;
}

const DIALOG_CONFIG = {
  startHandling: {
    title: LABELS.startHandlingTitle,
    description: LABELS.startHandlingDescription,
    confirmLabel: LABELS.startHandlingConfirmLabel,
    tone: "primary" as const,
    needsReason: false,
  },
  warn: {
    title: LABELS.warnTitle,
    description: LABELS.warnDescription,
    confirmLabel: LABELS.warnConfirmLabel,
    tone: "danger" as const,
    needsReason: true,
  },
  unpublishContent: {
    title: LABELS.unpublishTitle,
    description: LABELS.unpublishDescription,
    confirmLabel: LABELS.unpublishConfirmLabel,
    tone: "danger" as const,
    needsReason: true,
  },
  suspendAccount: {
    title: LABELS.suspendTitle,
    description: LABELS.suspendDescription,
    confirmLabel: LABELS.suspendConfirmLabel,
    tone: "danger" as const,
    needsReason: true,
  },
  dismiss: {
    title: LABELS.dismissTitle,
    description: LABELS.dismissDescription,
    confirmLabel: LABELS.dismissConfirmLabel,
    tone: "danger" as const,
    needsReason: true,
  },
  resolve: {
    title: LABELS.resolveTitle,
    description: LABELS.resolveDescription,
    confirmLabel: LABELS.resolveConfirmLabel,
    tone: "primary" as const,
    needsReason: true,
  },
};

export function AdminReportStatusDialog({ mode, onCancel, onConfirm }: AdminReportStatusDialogProps) {
  const current = DIALOG_CONFIG[mode ?? "startHandling"];
  return (
    <AdminConfirmationDialog
      isOpen={mode !== null}
      title={current.title}
      description={current.description}
      cancelLabel={LABELS.cancelLabel}
      confirmLabel={current.confirmLabel}
      onCancel={onCancel}
      onConfirm={onConfirm}
      tone={current.tone}
      reasonLabel={current.needsReason ? LABELS.reasonLabel : undefined}
      reasonPlaceholder={current.needsReason ? LABELS.reasonPlaceholder : undefined}
      reasonRequired={current.needsReason}
    />
  );
}
