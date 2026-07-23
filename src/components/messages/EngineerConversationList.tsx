"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EngineerConversationCard } from "@/components/messages/EngineerConversationCard";
import {
  ENGINEER_CONVERSATION_LIST_META,
  ENGINEER_CONVERSATION_SEARCH_LABELS,
} from "@/constants/engineer-messages";
import type { ConversationListItem } from "@/lib/engineer/chat";

interface EngineerConversationListProps {
  conversations: ConversationListItem[];
  activeId?: string;
}

export function EngineerConversationList({
  conversations,
  activeId,
}: EngineerConversationListProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return conversations;
    return conversations.filter((conversation) =>
      [conversation.companyName, conversation.opportunityTitle, conversation.lastMessageBody ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(trimmed),
    );
  }, [conversations, query]);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="shrink-0 border-b border-border p-4">
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={ENGINEER_CONVERSATION_SEARCH_LABELS.placeholder}
            className="pl-9"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              {ENGINEER_CONVERSATION_LIST_META.noConversationsTitle}
            </p>
            <p className="text-xs text-muted-foreground">
              {ENGINEER_CONVERSATION_LIST_META.noConversationsDescription}
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              {ENGINEER_CONVERSATION_LIST_META.noResultsTitle}
            </p>
            <p className="text-xs text-muted-foreground">
              {ENGINEER_CONVERSATION_LIST_META.noResultsDescription}
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-1">
            {filtered.map((conversation) => (
              <li key={conversation.chatRoomId}>
                <EngineerConversationCard
                  conversation={conversation}
                  isActive={conversation.applicationId === activeId}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
