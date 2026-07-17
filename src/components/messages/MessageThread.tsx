"use client";

import { useEffect, useRef, useState } from "react";
import { MessageHeader } from "@/components/messages/MessageHeader";
import { MessageBubble } from "@/components/messages/MessageBubble";
import { MessageComposer } from "@/components/messages/MessageComposer";
import { TypingIndicator } from "@/components/messages/TypingIndicator";
import { MOCK_AUTO_REPLIES, type Conversation, type Message } from "@/constants/messages";

interface MessageThreadProps {
  conversation: Conversation;
  basePath?: string;
}

function groupByDate(messages: Message[]): { dateLabel: string; items: Message[] }[] {
  const groups: { dateLabel: string; items: Message[] }[] = [];
  for (const message of messages) {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.dateLabel === message.dateLabel) {
      lastGroup.items.push(message);
    } else {
      groups.push({ dateLabel: message.dateLabel, items: [message] });
    }
  }
  return groups;
}

function nowTimeLabel(): string {
  const now = new Date();
  return `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
}

export function MessageThread({ conversation, basePath }: MessageThreadProps) {
  const [messages, setMessages] = useState<Message[]>(conversation.messages);
  const [isTyping, setIsTyping] = useState(false);
  const [loadedConversationId, setLoadedConversationId] = useState(conversation.id);
  const counterRef = useRef(0);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  if (conversation.id !== loadedConversationId) {
    setLoadedConversationId(conversation.id);
    setMessages(conversation.messages);
    setIsTyping(false);
  }

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ block: "end" });
  }, [messages, isTyping]);

  function handleSend(content: string) {
    counterRef.current += 1;
    const newMessage: Message = {
      id: `${conversation.id}-local-${counterRef.current}`,
      senderRole: "engineer",
      senderName: "山田 太郎",
      content,
      timeLabel: nowTimeLabel(),
      dateLabel: "今日",
      dateISO: new Date().toISOString().slice(0, 10),
      kind: "text",
    };
    setMessages((prev) => [...prev, newMessage]);

    window.setTimeout(() => setIsTyping(true), 900);
    window.setTimeout(() => {
      counterRef.current += 1;
      const reply: Message = {
        id: `${conversation.id}-local-${counterRef.current}`,
        senderRole: "company",
        senderName: conversation.participantName,
        content: MOCK_AUTO_REPLIES[counterRef.current % MOCK_AUTO_REPLIES.length],
        timeLabel: nowTimeLabel(),
        dateLabel: "今日",
        dateISO: new Date().toISOString().slice(0, 10),
        kind: "text",
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, reply]);
    }, 2600);
  }

  const groups = groupByDate(messages);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <MessageHeader conversation={conversation} basePath={basePath} />

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
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwnMessage={message.senderRole === "engineer"}
                />
              ))}
            </div>
          ))}
          {isTyping && <TypingIndicator participantName={conversation.participantName} />}
          <div ref={scrollAnchorRef} />
        </div>
      </div>

      <MessageComposer onSend={handleSend} />
    </div>
  );
}
