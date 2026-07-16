"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CONVERSATION_SEARCH_LABELS } from "@/constants/messages";

interface ConversationSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ConversationSearch({ value, onChange }: ConversationSearchProps) {
  return (
    <div className="relative">
      <label htmlFor="conversation-search-input" className="sr-only">
        {CONVERSATION_SEARCH_LABELS.label}
      </label>
      <Search
        className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        id="conversation-search-input"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={CONVERSATION_SEARCH_LABELS.placeholder}
        className="pl-9"
      />
    </div>
  );
}
