import Link from "next/link";
import { COMPANY_CONVERSATION_LIST_META } from "@/constants/company-messages";
import { formatRelativeDaysJa } from "@/lib/engineer/format";
import type { CompanyConversationListItem } from "@/lib/company/chat";

interface CompanyConversationCardProps {
  conversation: CompanyConversationListItem;
  isActive: boolean;
}

function initialsFor(name: string): string {
  return name.trim().slice(0, 2) || "?";
}

export function CompanyConversationCard({
  conversation,
  isActive,
}: CompanyConversationCardProps) {
  const hasUnread = conversation.unreadCount > 0;

  return (
    <Link
      href={`/company/messages/${conversation.applicationId}`}
      aria-current={isActive ? "page" : undefined}
      className={`flex items-start gap-3 rounded-xl border px-3 py-3 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none ${
        isActive ? "border-primary/30 bg-primary/5" : "border-transparent hover:bg-muted"
      }`}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary"
        aria-hidden="true"
      >
        {initialsFor(conversation.engineerName)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <p className="min-w-0 truncate text-sm font-semibold text-foreground">
            {conversation.engineerName}
          </p>
          {conversation.lastMessageAt && (
            <span className="shrink-0 whitespace-nowrap text-[11px] text-muted-foreground">
              {formatRelativeDaysJa(conversation.lastMessageAt)}
            </span>
          )}
        </div>
        <p className="truncate text-xs text-muted-foreground">{conversation.opportunityTitle}</p>
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <p
            className={`min-w-0 truncate text-xs ${hasUnread ? "font-semibold text-foreground" : "text-muted-foreground"}`}
          >
            {conversation.lastMessageBody ?? ""}
          </p>
          {hasUnread && (
            <span
              className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-white"
              aria-label={`${conversation.unreadCount}${COMPANY_CONVERSATION_LIST_META.unreadSuffix}`}
            >
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
