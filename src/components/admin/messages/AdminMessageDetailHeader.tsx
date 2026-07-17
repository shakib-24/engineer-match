import { MessagesSquare } from "lucide-react";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import {
  ADMIN_MESSAGE_ACTION_LABELS,
  ADMIN_MESSAGE_HANDLING_STATUS_TONE,
  type AdminMessageHandlingStatus,
} from "@/constants/admin-messages";
import type { Conversation } from "@/constants/messages";

interface AdminMessageDetailHeaderProps {
  conversation: Conversation;
  handlingStatus: AdminMessageHandlingStatus;
  reportCount: number;
  restricted: boolean;
  onMarkNeedsReview: () => void;
  onMarkHandled: () => void;
  onRecordWarning: () => void;
  onToggleRestrict: () => void;
}

export function AdminMessageDetailHeader({
  conversation,
  handlingStatus,
  reportCount,
  restricted,
  onMarkNeedsReview,
  onMarkHandled,
  onRecordWarning,
  onToggleRestrict,
}: AdminMessageDetailHeaderProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10"
            aria-hidden="true"
          >
            <MessagesSquare className="h-6 w-6 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-foreground">{conversation.participantName}</h2>
              <AdminStatusBadge label={handlingStatus} tone={ADMIN_MESSAGE_HANDLING_STATUS_TONE[handlingStatus]} />
              {restricted && <AdminStatusBadge label="制限中" tone="negative" />}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{conversation.participantCompany}</p>
            <p className="text-sm text-muted-foreground">報告件数：{reportCount}件</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onMarkNeedsReview}
            className="inline-flex h-9 items-center justify-center rounded-xl border border-amber-300 bg-white px-4 text-sm font-semibold text-amber-600 transition-colors duration-200 hover:bg-amber-50 focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {ADMIN_MESSAGE_ACTION_LABELS.markNeedsReview}
          </button>
          <button
            type="button"
            onClick={onMarkHandled}
            className="inline-flex h-9 items-center justify-center rounded-xl border border-emerald-300 bg-white px-4 text-sm font-semibold text-emerald-600 transition-colors duration-200 hover:bg-emerald-50 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {ADMIN_MESSAGE_ACTION_LABELS.markHandled}
          </button>
          <button
            type="button"
            onClick={onRecordWarning}
            className="inline-flex h-9 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {ADMIN_MESSAGE_ACTION_LABELS.recordWarning}
          </button>
          <button
            type="button"
            onClick={onToggleRestrict}
            className="inline-flex h-9 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {restricted
              ? ADMIN_MESSAGE_ACTION_LABELS.unrestrictConversation
              : ADMIN_MESSAGE_ACTION_LABELS.restrictConversation}
          </button>
        </div>
      </div>
    </div>
  );
}
