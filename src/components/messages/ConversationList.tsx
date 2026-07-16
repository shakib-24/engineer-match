"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ConversationCard } from "@/components/messages/ConversationCard";
import { ConversationSearch } from "@/components/messages/ConversationSearch";
import { CONVERSATION_LIST_META, type Conversation } from "@/constants/messages";

interface ConversationListProps {
  conversations: Conversation[];
  activeId?: string;
}

export function ConversationList({ conversations, activeId }: ConversationListProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return conversations;
    return conversations.filter((conversation) =>
      [
        conversation.participantName,
        conversation.participantCompany,
        conversation.jobTitle,
        conversation.lastMessage,
      ]
        .join(" ")
        .toLowerCase()
        .includes(trimmed),
    );
  }, [conversations, query]);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="shrink-0 border-b border-border p-4">
        <ConversationSearch value={query} onChange={setQuery} />
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              {CONVERSATION_LIST_META.noResultsTitle}
            </p>
            <p className="text-xs text-muted-foreground">
              {CONVERSATION_LIST_META.noResultsDescription}
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-1">
            {filtered.map((conversation) => (
              <li key={conversation.id}>
                <ConversationCard
                  conversation={conversation}
                  isActive={conversation.id === activeId}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
