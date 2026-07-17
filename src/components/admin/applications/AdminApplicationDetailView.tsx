"use client";

import { useState } from "react";
import { AdminApplicationDetailHeader } from "@/components/admin/applications/AdminApplicationDetailHeader";
import { AdminApplicationInfoSection } from "@/components/admin/applications/AdminApplicationInfoSection";
import { AdminApplicationTimelineSection } from "@/components/admin/applications/AdminApplicationTimelineSection";
import { AdminApplicationDetailsSection } from "@/components/admin/applications/AdminApplicationDetailsSection";
import { AdminInternalNote, type AdminNoteEntry } from "@/components/admin/shared/AdminInternalNote";
import {
  ADMIN_APPLICATION_DEMO_NOTE,
  ADMIN_APPLICATION_DETAIL_SECTIONS,
  ADMIN_APPLICATION_TOAST_MESSAGES,
  type AdminApplication,
} from "@/constants/admin-applications";

interface AdminApplicationDetailViewProps {
  application: AdminApplication;
}

export function AdminApplicationDetailView({ application }: AdminApplicationDetailViewProps) {
  const [handled, setHandled] = useState(application.handled);
  const [notes, setNotes] = useState<AdminNoteEntry[]>(application.internalNotes);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 3000);
  }

  function handleToggleHandled() {
    setHandled((prev) => !prev);
    showToast(
      handled
        ? ADMIN_APPLICATION_TOAST_MESSAGES.unhandled
        : ADMIN_APPLICATION_TOAST_MESSAGES.handled,
    );
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
    showToast(ADMIN_APPLICATION_TOAST_MESSAGES.noteAdded);
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminApplicationDetailHeader
        application={application}
        handled={handled}
        onToggleHandled={handleToggleHandled}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <AdminApplicationInfoSection application={application} />
          <AdminApplicationTimelineSection application={application} />
          <AdminApplicationDetailsSection application={application} />
        </div>
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-7">
            <AdminInternalNote
              title={ADMIN_APPLICATION_DETAIL_SECTIONS.internalNotes}
              placeholder="運営メモを入力"
              addLabel="メモを追加"
              emptyMessage="運営メモはまだありません。"
              notes={notes}
              onAdd={handleAddNote}
            />
          </div>
          <p className="text-xs text-muted-foreground">{ADMIN_APPLICATION_DEMO_NOTE}</p>
        </div>
      </div>

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
