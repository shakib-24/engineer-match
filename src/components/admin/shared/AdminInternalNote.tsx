"use client";

import { useState, type FormEvent } from "react";
import { StickyNote } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export interface AdminNoteEntry {
  id: string;
  author: string;
  body: string;
  dateLabel: string;
}

interface AdminInternalNoteProps {
  title: string;
  placeholder: string;
  addLabel: string;
  emptyMessage: string;
  notes: AdminNoteEntry[];
  onAdd: (body: string) => void;
}

export function AdminInternalNote({
  title,
  placeholder,
  addLabel,
  emptyMessage,
  notes,
  onAdd,
}: AdminInternalNoteProps) {
  const [draft, setDraft] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setDraft("");
  }

  return (
    <div>
      <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
        <StickyNote className="h-4 w-4 text-primary" aria-hidden="true" />
        {title}
      </h2>

      {notes.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-3">
          {notes.map((note) => (
            <li key={note.id} className="rounded-xl bg-muted px-4 py-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold text-foreground">{note.author}</p>
                <span className="text-xs text-muted-foreground">{note.dateLabel}</span>
              </div>
              <p className="mt-1 text-sm text-foreground">{note.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">{emptyMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
        <label htmlFor="internal-note-input" className="sr-only">
          {placeholder}
        </label>
        <Textarea
          id="internal-note-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={placeholder}
          rows={2}
        />
        <button
          type="submit"
          className="inline-flex h-9 w-fit items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {addLabel}
        </button>
      </form>
    </div>
  );
}
