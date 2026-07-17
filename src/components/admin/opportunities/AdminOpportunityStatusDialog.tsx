"use client";

import { AdminConfirmationDialog } from "@/components/admin/shared/AdminConfirmationDialog";
import { ADMIN_OPPORTUNITY_ACTION_DIALOG_LABELS as LABELS } from "@/constants/admin-opportunities";

export type AdminOpportunityDialogMode =
  | "publish"
  | "unpublish"
  | "suspend"
  | "requestEdit"
  | "delete"
  | null;

interface AdminOpportunityStatusDialogProps {
  mode: AdminOpportunityDialogMode;
  onCancel: () => void;
  onConfirm: (reason?: string) => void;
}

const DIALOG_CONFIG = {
  publish: {
    title: LABELS.publishTitle,
    description: LABELS.publishDescription,
    confirmLabel: LABELS.publishConfirmLabel,
    tone: "primary" as const,
    needsReason: false,
  },
  unpublish: {
    title: LABELS.unpublishTitle,
    description: LABELS.unpublishDescription,
    confirmLabel: LABELS.unpublishConfirmLabel,
    tone: "danger" as const,
    needsReason: false,
  },
  suspend: {
    title: LABELS.suspendTitle,
    description: LABELS.suspendDescription,
    confirmLabel: LABELS.suspendConfirmLabel,
    tone: "danger" as const,
    needsReason: true,
  },
  requestEdit: {
    title: LABELS.requestEditTitle,
    description: LABELS.requestEditDescription,
    confirmLabel: LABELS.requestEditConfirmLabel,
    tone: "primary" as const,
    needsReason: true,
  },
  delete: {
    title: LABELS.deleteTitle,
    description: LABELS.deleteDescription,
    confirmLabel: LABELS.deleteConfirmLabel,
    tone: "danger" as const,
    needsReason: true,
  },
};

export function AdminOpportunityStatusDialog({
  mode,
  onCancel,
  onConfirm,
}: AdminOpportunityStatusDialogProps) {
  const current = DIALOG_CONFIG[mode ?? "publish"];
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
