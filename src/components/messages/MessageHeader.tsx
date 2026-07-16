import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  CONVERSATION_STATUS_BADGE_STYLES,
  MESSAGE_HEADER_LABELS,
  type Conversation,
} from "@/constants/messages";

interface MessageHeaderProps {
  conversation: Conversation;
}

export function MessageHeader({ conversation }: MessageHeaderProps) {
  return (
    <div className="flex shrink-0 items-center gap-3 border-b border-border bg-surface px-4 py-3 sm:px-6">
      <Link
        href="/messages"
        aria-label={MESSAGE_HEADER_LABELS.backLabel}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none lg:hidden"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      </Link>
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary"
        aria-hidden="true"
      >
        {conversation.avatarInitials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="truncate text-sm font-semibold text-foreground">
            {conversation.participantName}
          </h2>
          <span
            className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${CONVERSATION_STATUS_BADGE_STYLES[conversation.status]}`}
          >
            {conversation.status}
          </span>
        </div>
        <p className="truncate text-xs text-muted-foreground">
          {conversation.participantCompany}
          {conversation.jobTitle !== "—" && ` ・ ${conversation.jobTitle}`}
        </p>
      </div>
    </div>
  );
}
