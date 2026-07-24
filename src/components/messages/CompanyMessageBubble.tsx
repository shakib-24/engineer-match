import { formatTimeJa } from "@/lib/engineer/format";
import type { CompanyConversationMessage } from "@/lib/company/chat";

interface CompanyMessageBubbleProps {
  message: CompanyConversationMessage;
  isOwnMessage: boolean;
}

export function CompanyMessageBubble({ message, isOwnMessage }: CompanyMessageBubbleProps) {
  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div className="flex max-w-[85%] flex-col gap-1 sm:max-w-[70%]">
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            isOwnMessage
              ? "rounded-tr-sm bg-primary text-white"
              : "rounded-tl-sm border border-border bg-surface text-foreground"
          }`}
        >
          <p className="whitespace-pre-line">{message.body}</p>
        </div>
        <span className={`px-1 text-[11px] text-muted-foreground ${isOwnMessage ? "text-right" : ""}`}>
          {formatTimeJa(message.sentAt)}
        </span>
      </div>
    </div>
  );
}
