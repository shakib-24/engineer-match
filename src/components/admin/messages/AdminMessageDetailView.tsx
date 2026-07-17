"use client";

import { useState } from "react";
import { History } from "lucide-react";
import { AdminMessageDetailHeader } from "@/components/admin/messages/AdminMessageDetailHeader";
import { AdminMessageTranscriptSection } from "@/components/admin/messages/AdminMessageTranscriptSection";
import { AdminDetailSection } from "@/components/admin/shared/AdminDetailSection";
import { AdminInternalNote, type AdminNoteEntry } from "@/components/admin/shared/AdminInternalNote";
import {
  ADMIN_MESSAGE_DEMO_NOTE,
  ADMIN_MESSAGE_DETAIL_SECTIONS,
  ADMIN_MESSAGE_TOAST_MESSAGES,
  type AdminMessageHandlingStatus,
  type AdminMessageModeration,
  type AdminMessageModerationHistoryEntry,
} from "@/constants/admin-messages";
import type { Conversation } from "@/constants/messages";

interface AdminMessageDetailViewProps {
  conversation: Conversation;
  moderation: AdminMessageModeration;
}

export function AdminMessageDetailView({ conversation, moderation }: AdminMessageDetailViewProps) {
  const [handlingStatus, setHandlingStatus] = useState<AdminMessageHandlingStatus>(
    moderation.handlingStatus,
  );
  const [restricted, setRestricted] = useState(moderation.restricted);
  const [history, setHistory] = useState<AdminMessageModerationHistoryEntry[]>(
    moderation.moderationHistory,
  );
  const [notes, setNotes] = useState<AdminNoteEntry[]>(moderation.internalNotes);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 3000);
  }

  function addHistory(action: string) {
    setHistory((prev) => [
      {
        id: `mh-${prev.length + 1}-${prev.length}`,
        action,
        actor: "佐々木 玲奈（管理者）",
        dateLabel: "たった今",
      },
      ...prev,
    ]);
  }

  function handleMarkNeedsReview() {
    setHandlingStatus("要確認");
    addHistory("要確認にする");
    showToast(ADMIN_MESSAGE_TOAST_MESSAGES.needsReview);
  }

  function handleMarkHandled() {
    setHandlingStatus("対応済み");
    addHistory("対応済みにする");
    showToast(ADMIN_MESSAGE_TOAST_MESSAGES.handled);
  }

  function handleRecordWarning() {
    addHistory("警告を記録");
    showToast(ADMIN_MESSAGE_TOAST_MESSAGES.warningRecorded);
  }

  function handleToggleRestrict() {
    setRestricted((prev) => !prev);
    addHistory(restricted ? "制限を解除" : "会話を制限");
    showToast(
      restricted ? ADMIN_MESSAGE_TOAST_MESSAGES.unrestricted : ADMIN_MESSAGE_TOAST_MESSAGES.restricted,
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
    showToast(ADMIN_MESSAGE_TOAST_MESSAGES.noteAdded);
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminMessageDetailHeader
        conversation={conversation}
        handlingStatus={handlingStatus}
        reportCount={moderation.reportCount}
        restricted={restricted}
        onMarkNeedsReview={handleMarkNeedsReview}
        onMarkHandled={handleMarkHandled}
        onRecordWarning={handleRecordWarning}
        onToggleRestrict={handleToggleRestrict}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <AdminMessageTranscriptSection
            conversation={conversation}
            reportedMessageIds={moderation.reportedMessageIds}
          />
        </div>
        <div className="flex flex-col gap-6">
          <AdminDetailSection title={ADMIN_MESSAGE_DETAIL_SECTIONS.moderationHistory}>
            {history.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {history.map((entry) => (
                  <li key={entry.id} className="flex items-start gap-2 text-xs">
                    <History className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-foreground">
                        {entry.action} ・ {entry.actor}
                      </p>
                      <p className="text-muted-foreground">{entry.dateLabel}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">モデレーション履歴はありません。</p>
            )}
          </AdminDetailSection>

          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-7">
            <AdminInternalNote
              title={ADMIN_MESSAGE_DETAIL_SECTIONS.internalNotes}
              placeholder="内部メモを入力"
              addLabel="メモを追加"
              emptyMessage="内部メモはまだありません。"
              notes={notes}
              onAdd={handleAddNote}
            />
          </div>
          <p className="text-xs text-muted-foreground">{ADMIN_MESSAGE_DEMO_NOTE}</p>
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
