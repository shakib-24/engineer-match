import { TYPING_INDICATOR_LABEL } from "@/constants/messages";

interface TypingIndicatorProps {
  participantName: string;
}

export function TypingIndicator({ participantName }: TypingIndicatorProps) {
  return (
    <div
      className="flex justify-start"
      role="status"
      aria-label={`${participantName}${TYPING_INDICATOR_LABEL}`}
    >
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-border bg-surface px-4 py-3">
        <span
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]"
          aria-hidden="true"
        />
        <span
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]"
          aria-hidden="true"
        />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" aria-hidden="true" />
      </div>
    </div>
  );
}
