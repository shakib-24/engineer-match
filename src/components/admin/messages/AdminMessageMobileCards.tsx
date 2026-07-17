import Link from "next/link";
import { AdminMobileCardList } from "@/components/admin/shared/AdminMobileCardList";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import {
  ADMIN_MESSAGE_ACTION_LABELS,
  ADMIN_MESSAGE_HANDLING_STATUS_TONE,
} from "@/constants/admin-messages";
import type { AdminMessageRow } from "@/components/admin/messages/AdminMessageTable";

interface AdminMessageMobileCardsProps {
  rows: AdminMessageRow[];
}

export function AdminMessageMobileCards({ rows }: AdminMessageMobileCardsProps) {
  return (
    <AdminMobileCardList>
      {rows.map(({ moderation, conversation }) => (
        <div
          key={moderation.conversationId}
          className="rounded-2xl border border-border bg-surface p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {conversation.participantName}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {conversation.participantCompany}
              </p>
            </div>
            <AdminStatusBadge
              label={moderation.handlingStatus}
              tone={ADMIN_MESSAGE_HANDLING_STATUS_TONE[moderation.handlingStatus]}
            />
          </div>

          <p className="mt-3 line-clamp-2 text-xs text-muted-foreground">
            {conversation.lastMessage}
          </p>

          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>{conversation.lastUpdatedLabel}</span>
            <span>報告 {moderation.reportCount}件</span>
          </div>

          <div className="mt-4 border-t border-border pt-3">
            <Link
              href={`/admin/messages/${moderation.conversationId}`}
              className="rounded text-xs font-semibold text-primary hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {ADMIN_MESSAGE_ACTION_LABELS.viewDetails}
            </Link>
          </div>
        </div>
      ))}
    </AdminMobileCardList>
  );
}
