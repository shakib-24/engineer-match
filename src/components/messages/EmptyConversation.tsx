import { MessageCircle } from "lucide-react";
import { EMPTY_CONVERSATION_LABELS } from "@/constants/messages";

export function EmptyConversation() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <MessageCircle className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold text-foreground">{EMPTY_CONVERSATION_LABELS.message}</p>
    </div>
  );
}
