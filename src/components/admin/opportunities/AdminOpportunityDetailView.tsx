"use client";

import { useState } from "react";
import { AdminOpportunityDetailHeader } from "@/components/admin/opportunities/AdminOpportunityDetailHeader";
import { AdminOpportunityOverview } from "@/components/admin/opportunities/AdminOpportunityOverview";
import { AdminOpportunityHistorySection } from "@/components/admin/opportunities/AdminOpportunityHistorySection";
import {
  AdminOpportunityStatusDialog,
  type AdminOpportunityDialogMode,
} from "@/components/admin/opportunities/AdminOpportunityStatusDialog";
import { AdminInternalNote, type AdminNoteEntry } from "@/components/admin/shared/AdminInternalNote";
import {
  ADMIN_OPPORTUNITY_DEMO_NOTE,
  ADMIN_OPPORTUNITY_DETAIL_SECTIONS,
  ADMIN_OPPORTUNITY_TOAST_MESSAGES,
  type AdminOpportunity,
  type AdminOpportunityHistoryEntry,
  type AdminOpportunityPublicationStatus,
} from "@/constants/admin-opportunities";

interface AdminOpportunityDetailViewProps {
  opportunity: AdminOpportunity;
}

export function AdminOpportunityDetailView({ opportunity }: AdminOpportunityDetailViewProps) {
  const [publicationStatus, setPublicationStatus] = useState<AdminOpportunityPublicationStatus>(
    opportunity.publicationStatus,
  );
  const [publicationHistory, setPublicationHistory] = useState<AdminOpportunityHistoryEntry[]>(
    opportunity.publicationHistory,
  );
  const [notes, setNotes] = useState<AdminNoteEntry[]>(opportunity.internalNotes);
  const [dialogMode, setDialogMode] = useState<
    Exclude<AdminOpportunityDialogMode, null> | null
  >(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  function handleConfirmDialog(reason?: string) {
    if (!dialogMode) return;
    const actionLabel =
      dialogMode === "publish"
        ? "公開承認"
        : dialogMode === "unpublish"
          ? "非公開化"
          : dialogMode === "suspend"
            ? "掲載停止"
            : "編集依頼";
    setPublicationHistory((prev) => [
      {
        id: `ph-${prev.length + 1}-${prev.length}`,
        action: actionLabel,
        actor: "佐々木 玲奈（管理者）",
        reason: reason ?? null,
        dateLabel: "たった今",
      },
      ...prev,
    ]);
    if (dialogMode === "publish") setPublicationStatus("公開中");
    if (dialogMode === "unpublish" || dialogMode === "suspend") setPublicationStatus("非公開");

    const toastKey =
      dialogMode === "publish"
        ? "published"
        : dialogMode === "unpublish"
          ? "unpublished"
          : dialogMode === "suspend"
            ? "suspended"
            : "editRequested";
    showToast(ADMIN_OPPORTUNITY_TOAST_MESSAGES[toastKey]);
    setDialogMode(null);
  }

  const opportunityWithLiveHistory = { ...opportunity, publicationHistory };

  return (
    <div className="flex flex-col gap-6">
      <AdminOpportunityDetailHeader
        opportunity={opportunity}
        publicationStatus={publicationStatus}
        onAction={setDialogMode}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <AdminOpportunityOverview opportunity={opportunity} />
          <AdminOpportunityHistorySection opportunity={opportunityWithLiveHistory} />
        </div>
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-7">
            <AdminInternalNote
              title={ADMIN_OPPORTUNITY_DETAIL_SECTIONS.internalNotes}
              placeholder="メモを入力"
              addLabel="メモを追加"
              emptyMessage="管理メモはまだありません。"
              notes={notes}
              onAdd={handleAddNote}
            />
          </div>
          <p className="text-xs text-muted-foreground">{ADMIN_OPPORTUNITY_DEMO_NOTE}</p>
        </div>
      </div>

      <AdminOpportunityStatusDialog
        mode={dialogMode}
        onCancel={() => setDialogMode(null)}
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
