"use client";

import { useState } from "react";
import { History } from "lucide-react";
import { AdminReportDetailHeader } from "@/components/admin/reports/AdminReportDetailHeader";
import { AdminReportContentSection } from "@/components/admin/reports/AdminReportContentSection";
import {
  AdminReportStatusDialog,
  type AdminReportDialogMode,
} from "@/components/admin/reports/AdminReportStatusDialog";
import { AdminDetailSection } from "@/components/admin/shared/AdminDetailSection";
import { AdminInternalNote, type AdminNoteEntry } from "@/components/admin/shared/AdminInternalNote";
import {
  ADMIN_REPORT_DEMO_NOTE,
  ADMIN_REPORT_DETAIL_SECTIONS,
  ADMIN_REPORT_TOAST_MESSAGES,
  type AdminReport,
  type AdminReportHistoryEntry,
  type AdminReportStatus,
} from "@/constants/admin-reports";

interface AdminReportDetailViewProps {
  report: AdminReport;
}

export function AdminReportDetailView({ report }: AdminReportDetailViewProps) {
  const [status, setStatus] = useState<AdminReportStatus>(report.status);
  const [history, setHistory] = useState<AdminReportHistoryEntry[]>(report.responseHistory);
  const [notes, setNotes] = useState<AdminNoteEntry[]>(report.internalNotes);
  const [dialogMode, setDialogMode] = useState<Exclude<AdminReportDialogMode, null> | null>(null);
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
      dialogMode === "startHandling"
        ? "対応開始"
        : dialogMode === "warn"
          ? "警告"
          : dialogMode === "unpublishContent"
            ? "コンテンツ非公開"
            : dialogMode === "suspendAccount"
              ? "アカウント停止"
              : dialogMode === "dismiss"
                ? "却下"
                : "解決済み";
    setHistory((prev) => [
      {
        id: `rh-${prev.length + 1}-${prev.length}`,
        action: actionLabel,
        actor: "佐々木 玲奈（管理者）",
        reason: reason ?? null,
        dateLabel: "たった今",
      },
      ...prev,
    ]);
    if (dialogMode === "startHandling") setStatus("対応中");
    if (dialogMode === "dismiss") setStatus("却下");
    if (dialogMode === "resolve") setStatus("解決済み");
    if (dialogMode === "warn" || dialogMode === "unpublishContent" || dialogMode === "suspendAccount") {
      setStatus("対応中");
    }

    const toastKey =
      dialogMode === "startHandling"
        ? "startHandling"
        : dialogMode === "warn"
          ? "warn"
          : dialogMode === "unpublishContent"
            ? "unpublish"
            : dialogMode === "suspendAccount"
              ? "suspend"
              : dialogMode === "dismiss"
                ? "dismiss"
                : "resolve";
    showToast(ADMIN_REPORT_TOAST_MESSAGES[toastKey]);
    setDialogMode(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminReportDetailHeader report={report} status={status} onAction={setDialogMode} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <AdminReportContentSection report={report} />
        </div>
        <div className="flex flex-col gap-6">
          <AdminDetailSection title={ADMIN_REPORT_DETAIL_SECTIONS.responseHistory}>
            {history.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {history.map((entry) => (
                  <li key={entry.id} className="flex items-start gap-2 text-xs">
                    <History className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-foreground">
                        {entry.action} ・ {entry.actor}
                      </p>
                      {entry.reason && <p className="text-muted-foreground">理由：{entry.reason}</p>}
                      <p className="text-muted-foreground">{entry.dateLabel}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">対応履歴はありません。</p>
            )}
          </AdminDetailSection>

          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-7">
            <AdminInternalNote
              title={ADMIN_REPORT_DETAIL_SECTIONS.internalNotes}
              placeholder="内部メモを入力"
              addLabel="メモを追加"
              emptyMessage="内部メモはまだありません。"
              notes={notes}
              onAdd={handleAddNote}
            />
          </div>
          <p className="text-xs text-muted-foreground">{ADMIN_REPORT_DEMO_NOTE}</p>
        </div>
      </div>

      <AdminReportStatusDialog
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
