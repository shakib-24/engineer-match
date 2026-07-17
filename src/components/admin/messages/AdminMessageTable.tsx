import Link from "next/link";
import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import {
  ADMIN_MESSAGE_ACTION_LABELS,
  ADMIN_MESSAGE_HANDLING_STATUS_TONE,
  type AdminMessageModeration,
} from "@/constants/admin-messages";
import type { Conversation } from "@/constants/messages";

export interface AdminMessageRow {
  moderation: AdminMessageModeration;
  conversation: Conversation;
}

const TABLE_COLUMNS = ["参加者", "関連求人・案件", "最新メッセージ", "最終更新", "報告件数", "対応状態", "操作"];

interface AdminMessageTableProps {
  rows: AdminMessageRow[];
}

export function AdminMessageTable({ rows }: AdminMessageTableProps) {
  return (
    <AdminDataTable columns={TABLE_COLUMNS} caption={TABLE_COLUMNS.join("、")}>
      {rows.map(({ moderation, conversation }) => (
        <tr key={moderation.conversationId} className="align-top">
          <td className="px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {conversation.participantName}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {conversation.participantCompany}
              </p>
            </div>
          </td>
          <td className="px-4 py-3 text-sm whitespace-nowrap text-muted-foreground">
            {conversation.jobTitle}
          </td>
          <td className="px-4 py-3">
            <span className="line-clamp-2 max-w-xs text-sm text-foreground">
              {conversation.lastMessage}
            </span>
          </td>
          <td className="px-4 py-3 text-sm whitespace-nowrap text-muted-foreground">
            {conversation.lastUpdatedLabel}
          </td>
          <td className="px-4 py-3 text-sm whitespace-nowrap text-foreground">
            {moderation.reportCount}件
          </td>
          <td className="px-4 py-3">
            <AdminStatusBadge
              label={moderation.handlingStatus}
              tone={ADMIN_MESSAGE_HANDLING_STATUS_TONE[moderation.handlingStatus]}
            />
          </td>
          <td className="px-4 py-3">
            <Link
              href={`/admin/messages/${moderation.conversationId}`}
              className="rounded text-xs font-semibold text-primary hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {ADMIN_MESSAGE_ACTION_LABELS.viewDetails}
            </Link>
          </td>
        </tr>
      ))}
    </AdminDataTable>
  );
}
