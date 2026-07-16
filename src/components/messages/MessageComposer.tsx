"use client";

import { useState } from "react";
import { Paperclip, Send, Smile } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { COMPOSER_LABELS } from "@/constants/messages";

interface MessageComposerProps {
  onSend: (content: string) => void;
}

export function MessageComposer({ onSend }: MessageComposerProps) {
  const [value, setValue] = useState("");

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="shrink-0 border-t border-border bg-surface p-4">
      <div className="flex items-end gap-2">
        <button
          type="button"
          aria-label={COMPOSER_LABELS.attachLabel}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <Paperclip className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={COMPOSER_LABELS.emojiLabel}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <Smile className="h-4 w-4" aria-hidden="true" />
        </button>
        <label htmlFor="message-composer-input" className="sr-only">
          {COMPOSER_LABELS.placeholder}
        </label>
        <Textarea
          id="message-composer-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={COMPOSER_LABELS.placeholder}
          rows={1}
          className="max-h-32 min-h-10 flex-1 resize-none py-2.5"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={value.trim() === ""}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">{COMPOSER_LABELS.sendLabel}</span>
        </button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{COMPOSER_LABELS.demoNote}</p>
    </div>
  );
}
