"use client";

import { AdminConfirmationDialog } from "@/components/admin/shared/AdminConfirmationDialog";
import { ADMIN_COMPANY_ACTION_DIALOG_LABELS as LABELS } from "@/constants/admin-companies";

export type AdminCompanyDialogMode =
  | "approve"
  | "return"
  | "reject"
  | "suspend"
  | "reinstate"
  | null;

interface AdminCompanyStatusDialogProps {
  mode: AdminCompanyDialogMode;
  onCancel: () => void;
  onConfirm: (reason?: string) => void;
}

const DIALOG_CONFIG = {
  approve: {
    title: LABELS.approveTitle,
    description: LABELS.approveDescription,
    confirmLabel: LABELS.approveConfirmLabel,
    tone: "primary" as const,
    needsReason: false,
  },
  return: {
    title: LABELS.returnTitle,
    description: LABELS.returnDescription,
    confirmLabel: LABELS.returnConfirmLabel,
    tone: "danger" as const,
    needsReason: true,
  },
  reject: {
    title: LABELS.rejectTitle,
    description: LABELS.rejectDescription,
    confirmLabel: LABELS.rejectConfirmLabel,
    tone: "danger" as const,
    needsReason: true,
  },
  suspend: {
    title: LABELS.suspendTitle,
    description: LABELS.suspendDescription,
    confirmLabel: LABELS.suspendConfirmLabel,
    tone: "danger" as const,
    needsReason: true,
  },
  reinstate: {
    title: LABELS.reinstateTitle,
    description: LABELS.reinstateDescription,
    confirmLabel: LABELS.reinstateConfirmLabel,
    tone: "primary" as const,
    needsReason: false,
  },
};

export function AdminCompanyStatusDialog({
  mode,
  onCancel,
  onConfirm,
}: AdminCompanyStatusDialogProps) {
  const current = DIALOG_CONFIG[mode ?? "approve"];
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
