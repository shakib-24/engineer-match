"use client";

import { useState } from "react";
import { AdminCompanyDetailHeader } from "@/components/admin/companies/AdminCompanyDetailHeader";
import { AdminCompanyOverview } from "@/components/admin/companies/AdminCompanyOverview";
import { AdminCompanyVerification } from "@/components/admin/companies/AdminCompanyVerification";
import { AdminCompanyJobsSection } from "@/components/admin/companies/AdminCompanyJobsSection";
import { AdminCompanyMembersSection } from "@/components/admin/companies/AdminCompanyMembersSection";
import {
  AdminCompanyStatusDialog,
  type AdminCompanyDialogMode,
} from "@/components/admin/companies/AdminCompanyStatusDialog";
import { AdminInternalNote, type AdminNoteEntry } from "@/components/admin/shared/AdminInternalNote";
import { History } from "lucide-react";
import { AdminDetailSection } from "@/components/admin/shared/AdminDetailSection";
import {
  ADMIN_COMPANY_DEMO_NOTE,
  ADMIN_COMPANY_DETAIL_SECTIONS,
  ADMIN_COMPANY_TOAST_MESSAGES,
  type AdminCompany,
  type AdminCompanyReviewHistoryEntry,
  type AdminCompanyReviewStatus,
  type AdminCompanyUsageStatus,
} from "@/constants/admin-companies";

interface AdminCompanyDetailViewProps {
  company: AdminCompany;
}

export function AdminCompanyDetailView({ company }: AdminCompanyDetailViewProps) {
  const [reviewStatus, setReviewStatus] = useState<AdminCompanyReviewStatus>(company.reviewStatus);
  const [usageStatus, setUsageStatus] = useState<AdminCompanyUsageStatus>(company.usageStatus);
  const [reviewHistory, setReviewHistory] = useState<AdminCompanyReviewHistoryEntry[]>(
    company.reviewHistory,
  );
  const [notes, setNotes] = useState<AdminNoteEntry[]>(company.internalNotes);
  const [dialogMode, setDialogMode] = useState<Exclude<AdminCompanyDialogMode, null> | null>(null);
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
      dialogMode === "approve"
        ? "承認"
        : dialogMode === "return"
          ? "差し戻し"
          : dialogMode === "reject"
            ? "却下"
            : dialogMode === "suspend"
              ? "利用停止"
              : "利用再開";
    setReviewHistory((prev) => [
      {
        id: `rh-${prev.length + 1}-${prev.length}`,
        action: actionLabel,
        actor: "佐々木 玲奈（管理者）",
        reason: reason ?? null,
        dateLabel: "たった今",
      },
      ...prev,
    ]);
    if (dialogMode === "approve") setReviewStatus("承認済み");
    if (dialogMode === "return") setReviewStatus("差し戻し");
    if (dialogMode === "reject") setReviewStatus("却下");
    if (dialogMode === "suspend") setUsageStatus("利用停止中");
    if (dialogMode === "reinstate") setUsageStatus("有効");

    const toastKey =
      dialogMode === "approve"
        ? "approved"
        : dialogMode === "return"
          ? "returned"
          : dialogMode === "reject"
            ? "rejected"
            : dialogMode === "suspend"
              ? "suspended"
              : "reinstated";
    showToast(ADMIN_COMPANY_TOAST_MESSAGES[toastKey]);
    setDialogMode(null);
  }

  const companyWithLiveHistory = { ...company, reviewHistory };

  return (
    <div className="flex flex-col gap-6">
      <AdminCompanyDetailHeader
        company={company}
        reviewStatus={reviewStatus}
        usageStatus={usageStatus}
        onAction={setDialogMode}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <AdminCompanyOverview company={company} />
          <AdminCompanyVerification company={companyWithLiveHistory} />
          <AdminCompanyJobsSection company={company} />
          <AdminCompanyMembersSection company={company} />
        </div>
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-7">
            <AdminInternalNote
              title={ADMIN_COMPANY_DETAIL_SECTIONS.internalNotes}
              placeholder="メモを入力"
              addLabel="メモを追加"
              emptyMessage="管理メモはまだありません。"
              notes={notes}
              onAdd={handleAddNote}
            />
          </div>
          <AdminDetailSection title={ADMIN_COMPANY_DETAIL_SECTIONS.activity}>
            <ul className="flex flex-col gap-3">
              {reviewHistory.slice(0, 5).map((entry) => (
                <li key={entry.id} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <History className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>
                    {entry.action} ・ {entry.dateLabel}
                  </span>
                </li>
              ))}
            </ul>
          </AdminDetailSection>
          <p className="text-xs text-muted-foreground">{ADMIN_COMPANY_DEMO_NOTE}</p>
        </div>
      </div>

      <AdminCompanyStatusDialog
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
