import { CalendarClock, Send } from "lucide-react";
import { AttachmentPreview } from "@/components/messages/AttachmentPreview";
import type { Message } from "@/constants/messages";

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

export function MessageBubble({ message, isOwnMessage }: MessageBubbleProps) {
  if (message.kind === "system") {
    return (
      <div className="flex justify-center py-1" role="status">
        <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
          {message.content}
        </span>
      </div>
    );
  }

  if (message.kind === "interview" || message.kind === "scout") {
    const Icon = message.kind === "interview" ? CalendarClock : Send;
    return (
      <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
        <div className="flex max-w-[85%] flex-col gap-1 sm:max-w-[70%]">
          {!isOwnMessage && (
            <span className="px-1 text-xs text-muted-foreground">{message.senderName}</span>
          )}
          <div className="flex items-start gap-2.5 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-foreground">{message.content}</p>
          </div>
          <span className={`px-1 text-[11px] text-muted-foreground ${isOwnMessage ? "text-right" : ""}`}>
            {message.timeLabel}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div className="flex max-w-[85%] flex-col gap-1 sm:max-w-[70%]">
        {!isOwnMessage && (
          <span className="px-1 text-xs text-muted-foreground">{message.senderName}</span>
        )}
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            isOwnMessage
              ? "rounded-tr-sm bg-primary text-white"
              : "rounded-tl-sm border border-border bg-surface text-foreground"
          }`}
        >
          <p className="whitespace-pre-line">{message.content}</p>
          {message.attachment && <AttachmentPreview attachment={message.attachment} />}
        </div>
        <span className={`px-1 text-[11px] text-muted-foreground ${isOwnMessage ? "text-right" : ""}`}>
          {message.timeLabel}
        </span>
      </div>
    </div>
  );
}
