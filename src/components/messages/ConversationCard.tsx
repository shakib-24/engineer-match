import Link from "next/link";
import {
  CONVERSATION_LIST_META,
  CONVERSATION_STATUS_BADGE_STYLES,
  type Conversation,
} from "@/constants/messages";

interface ConversationCardProps {
  conversation: Conversation;
  isActive: boolean;
}

export function ConversationCard({ conversation, isActive }: ConversationCardProps) {
  const hasUnread = conversation.unreadCount > 0;

  return (
    <Link
      href={`/messages/${conversation.id}`}
      aria-current={isActive ? "page" : undefined}
      className={`flex items-start gap-3 rounded-xl border px-3 py-3 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none ${
        isActive
          ? "border-primary/30 bg-primary/5"
          : "border-transparent hover:bg-muted"
      }`}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary"
        aria-hidden="true"
      >
        {conversation.avatarInitials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <p className="min-w-0 truncate text-sm font-semibold text-foreground">
            {conversation.participantName}
          </p>
          <span className="shrink-0 whitespace-nowrap text-[11px] text-muted-foreground">
            {conversation.lastUpdatedLabel}
          </span>
        </div>
        <p className="truncate text-xs text-muted-foreground">
          {conversation.participantCompany}
          {conversation.jobTitle !== "—" && ` ・ ${conversation.jobTitle}`}
        </p>
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <p
            className={`min-w-0 truncate text-xs ${hasUnread ? "font-semibold text-foreground" : "text-muted-foreground"}`}
          >
            {conversation.lastMessage}
          </p>
          {hasUnread && (
            <span
              className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-white"
              aria-label={`${conversation.unreadCount}${CONVERSATION_LIST_META.unreadSuffix}`}
            >
              {conversation.unreadCount}
            </span>
          )}
        </div>
        <span
          className={`mt-1.5 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${CONVERSATION_STATUS_BADGE_STYLES[conversation.status]}`}
        >
          {conversation.status}
        </span>
      </div>
    </Link>
  );
}
