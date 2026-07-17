"use client";

import { useState } from "react";
import { AdminUserDetailHeader } from "@/components/admin/users/AdminUserDetailHeader";
import { AdminUserProfileSection } from "@/components/admin/users/AdminUserProfileSection";
import { AdminUserActivitySection } from "@/components/admin/users/AdminUserActivitySection";
import { AdminUserStatusDialog } from "@/components/admin/users/AdminUserStatusDialog";
import { AdminUserDeleteDialog } from "@/components/admin/users/AdminUserDeleteDialog";
import { AdminInternalNote, type AdminNoteEntry } from "@/components/admin/shared/AdminInternalNote";
import {
  ADMIN_USER_DEMO_NOTE,
  ADMIN_USER_DETAIL_SECTIONS,
  ADMIN_USER_TOAST_MESSAGES,
  type AdminUser,
  type AdminUserAccountStatus,
} from "@/constants/admin-users";

interface AdminUserDetailViewProps {
  user: AdminUser;
}

type DialogState = "suspend" | "reinstate" | "delete" | null;

export function AdminUserDetailView({ user }: AdminUserDetailViewProps) {
  const [accountStatus, setAccountStatus] = useState<AdminUserAccountStatus>(user.accountStatus);
  const [notes, setNotes] = useState<AdminNoteEntry[]>(user.internalNotes);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 3000);
  }

  function handleAddNote(body: string) {
    setNotes((prev) => [
      {
        id: `note-${prev.length + 1}-${prev.length}`,
        author: "佐々木 玲奈（管理者）",
        body,
        dateLabel: "たった今",
      },
      ...prev,
    ]);
  }

  function handleConfirmDialog() {
    if (dialog === "suspend") {
      setAccountStatus("利用停止中");
      showToast(ADMIN_USER_TOAST_MESSAGES.suspended);
    } else if (dialog === "reinstate") {
      setAccountStatus("有効");
      showToast(ADMIN_USER_TOAST_MESSAGES.reinstated);
    } else if (dialog === "delete") {
      setIsDeleted(true);
      showToast(ADMIN_USER_TOAST_MESSAGES.deleted);
    }
    setDialog(null);
  }

  return (
    <div className="flex flex-col gap-6">
      {isDeleted && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          このユーザーは削除済みとしてマークされました。（{ADMIN_USER_DEMO_NOTE}）
        </div>
      )}

      <AdminUserDetailHeader
        user={user}
        accountStatus={accountStatus}
        onEdit={() => showToast(ADMIN_USER_DEMO_NOTE)}
        onSuspend={() => setDialog("suspend")}
        onReinstate={() => setDialog("reinstate")}
        onDelete={() => setDialog("delete")}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <AdminUserProfileSection user={user} />
          <AdminUserActivitySection user={user} />
        </div>
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-7">
            <AdminInternalNote
              title={ADMIN_USER_DETAIL_SECTIONS.internalNotes}
              placeholder="メモを入力"
              addLabel="メモを追加"
              emptyMessage="管理メモはまだありません。"
              notes={notes}
              onAdd={handleAddNote}
            />
          </div>
          <p className="text-xs text-muted-foreground">{ADMIN_USER_DEMO_NOTE}</p>
        </div>
      </div>

      <AdminUserStatusDialog
        mode={dialog === "suspend" ? "suspend" : dialog === "reinstate" ? "reinstate" : null}
        onCancel={() => setDialog(null)}
        onConfirm={handleConfirmDialog}
      />
      <AdminUserDeleteDialog
        isOpen={dialog === "delete"}
        onCancel={() => setDialog(null)}
        onConfirm={handleConfirmDialog}
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
