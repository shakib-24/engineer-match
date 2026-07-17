"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FAVORITE_SEARCH_LABELS } from "@/constants/favorites";

interface FavoriteSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function FavoriteSearch({ value, onChange }: FavoriteSearchProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
      <form
        role="search"
        aria-label={FAVORITE_SEARCH_LABELS.label}
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <label htmlFor="favorite-search-input" className="sr-only">
            {FAVORITE_SEARCH_LABELS.placeholder}
          </label>
          <Input
            id="favorite-search-input"
            type="search"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={FAVORITE_SEARCH_LABELS.placeholder}
            className="h-11 pl-9"
          />
        </div>
      </form>
    </div>
  );
}
