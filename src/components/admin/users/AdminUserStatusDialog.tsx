"use client";

import { AdminConfirmationDialog } from "@/components/admin/shared/AdminConfirmationDialog";
import { ADMIN_USER_STATUS_DIALOG_LABELS } from "@/constants/admin-users";

interface AdminUserStatusDialogProps {
  mode: "suspend" | "reinstate" | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export function AdminUserStatusDialog({
  mode,
  onCancel,
  onConfirm,
}: AdminUserStatusDialogProps) {
  const isSuspend = mode === "suspend";
  return (
    <AdminConfirmationDialog
      isOpen={mode !== null}
      title={
        isSuspend
          ? ADMIN_USER_STATUS_DIALOG_LABELS.suspendTitle
          : ADMIN_USER_STATUS_DIALOG_LABELS.reinstateTitle
      }
      description={
        isSuspend
          ? ADMIN_USER_STATUS_DIALOG_LABELS.suspendDescription
          : ADMIN_USER_STATUS_DIALOG_LABELS.reinstateDescription
      }
      cancelLabel={ADMIN_USER_STATUS_DIALOG_LABELS.cancelLabel}
      confirmLabel={
        isSuspend
          ? ADMIN_USER_STATUS_DIALOG_LABELS.suspendConfirmLabel
          : ADMIN_USER_STATUS_DIALOG_LABELS.reinstateConfirmLabel
      }
      onCancel={onCancel}
      onConfirm={onConfirm}
      tone={isSuspend ? "danger" : "primary"}
    />
  );
}
