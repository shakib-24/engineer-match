"use client";

import { AdminConfirmationDialog } from "@/components/admin/shared/AdminConfirmationDialog";
import { ADMIN_USER_DELETE_DIALOG_LABELS } from "@/constants/admin-users";

interface AdminUserDeleteDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function AdminUserDeleteDialog({
  isOpen,
  onCancel,
  onConfirm,
}: AdminUserDeleteDialogProps) {
  return (
    <AdminConfirmationDialog
      isOpen={isOpen}
      title={ADMIN_USER_DELETE_DIALOG_LABELS.title}
      description={ADMIN_USER_DELETE_DIALOG_LABELS.description}
      cancelLabel={ADMIN_USER_DELETE_DIALOG_LABELS.cancelLabel}
      confirmLabel={ADMIN_USER_DELETE_DIALOG_LABELS.confirmLabel}
      onCancel={onCancel}
      onConfirm={onConfirm}
      tone="danger"
    />
  );
}
