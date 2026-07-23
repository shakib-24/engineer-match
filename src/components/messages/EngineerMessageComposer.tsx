"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ENGINEER_COMPOSER_LABELS } from "@/constants/engineer-messages";

interface EngineerMessageComposerProps {
  onSend: (content: string) => Promise<boolean>;
}

export function EngineerMessageComposer({ onSend }: EngineerMessageComposerProps) {
  const [value, setValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(false);

  async function handleSend() {
    const trimmed = value.trim();
    if (!trimmed || isSending) return;
    setIsSending(true);
    setError(false);
    const ok = await onSend(trimmed);
    setIsSending(false);
    if (ok) {
      setValue("");
    } else {
      setError(true);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSend();
    }
  }

  return (
    <div className="shrink-0 border-t border-border bg-surface p-4">
      <div className="flex items-end gap-2">
        <label htmlFor="engineer-message-composer-input" className="sr-only">
          {ENGINEER_COMPOSER_LABELS.placeholder}
        </label>
        <Textarea
          id="engineer-message-composer-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={ENGINEER_COMPOSER_LABELS.placeholder}
          rows={1}
          className="max-h-32 min-h-10 flex-1 resize-none py-2.5"
          disabled={isSending}
        />
        <button
          type="button"
          onClick={() => void handleSend()}
          disabled={value.trim() === "" || isSending}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">{ENGINEER_COMPOSER_LABELS.sendLabel}</span>
        </button>
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-600" role="alert">
          {ENGINEER_COMPOSER_LABELS.sendError}
        </p>
      )}
    </div>
  );
}
