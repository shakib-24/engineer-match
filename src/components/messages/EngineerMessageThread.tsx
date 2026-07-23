"use client";

import { useEffect, useRef, useState } from "react";
import { EngineerMessageHeader } from "@/components/messages/EngineerMessageHeader";
import { EngineerMessageBubble } from "@/components/messages/EngineerMessageBubble";
import { EngineerMessageComposer } from "@/components/messages/EngineerMessageComposer";
import { formatDateJa } from "@/lib/engineer/format";
import {
  markConversationRead,
  sendMessage,
  type ConversationDetail,
  type ConversationMessage,
} from "@/lib/engineer/chat";
import { createClient } from "@/lib/supabase/client";

interface EngineerMessageThreadProps {
  conversation: ConversationDetail;
  currentUserId: string;
}

function groupByDate(messages: ConversationMessage[]): { dateLabel: string; items: ConversationMessage[] }[] {
  const groups: { dateLabel: string; items: ConversationMessage[] }[] = [];
  for (const message of messages) {
    const dateLabel = formatDateJa(message.sentAt);
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.dateLabel === dateLabel) {
      lastGroup.items.push(message);
    } else {
      groups.push({ dateLabel, items: [message] });
    }
  }
  return groups;
}

export function EngineerMessageThread({
  conversation,
  currentUserId,
}: EngineerMessageThreadProps) {
  const [messages, setMessages] = useState(conversation.messages);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  useEffect(() => {
    const supabase = createClient();
    void markConversationRead(supabase, conversation.chatRoomId, currentUserId);
  }, [conversation.chatRoomId, currentUserId]);

  async function handleSend(content: string): Promise<boolean> {
    const supabase = createClient();
    const { data, error } = await sendMessage(
      supabase,
      conversation.chatRoomId,
      currentUserId,
      content,
    );
    if (error || !data) {
      console.error("[engineer-chat] failed to send message:", error);
      return false;
    }
    setMessages((prev) => [
      ...prev,
      {
        id: data.id as string,
        senderId: data.sender_id as string,
        body: data.body as string,
        sentAt: data.sent_at as string,
        readAt: data.read_at as string | null,
      },
    ]);
    return true;
  }

  const groups = groupByDate(messages);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <EngineerMessageHeader
        companyName={conversation.companyName}
        opportunityTitle={conversation.opportunityTitle}
      />

      <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4">
          {groups.map((group) => (
            <div key={group.dateLabel} className="flex flex-col gap-3">
              <div className="flex justify-center">
                <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                  {group.dateLabel}
                </span>
              </div>
              {group.items.map((message) => (
                <EngineerMessageBubble
                  key={message.id}
                  message={message}
                  isOwnMessage={message.senderId === currentUserId}
                />
              ))}
            </div>
          ))}
          <div ref={scrollAnchorRef} />
        </div>
      </div>

      <EngineerMessageComposer onSend={handleSend} />
    </div>
  );
}
