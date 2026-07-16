"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FILTER_DRAWER_LABELS, SEARCH_HEADER } from "@/constants/jobs";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onOpenFilters: () => void;
  activeFilterCount: number;
}

export function SearchBar({
  value,
  onChange,
  onOpenFilters,
  activeFilterCount,
}: SearchBarProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
      <form
        role="search"
        aria-label={SEARCH_HEADER.searchLabel}
        onSubmit={(event) => event.preventDefault()}
        className="flex items-center gap-3"
      >
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <label htmlFor="job-search-input" className="sr-only">
            {SEARCH_HEADER.searchPlaceholder}
          </label>
          <Input
            id="job-search-input"
            type="search"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={SEARCH_HEADER.searchPlaceholder}
            className="h-11 pl-9"
          />
        </div>
        <button
          type="button"
          onClick={onOpenFilters}
          aria-label={FILTER_DRAWER_LABELS.openLabel}
          className="relative inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">{FILTER_DRAWER_LABELS.openLabel}</span>
          {activeFilterCount > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-white"
              aria-hidden="true"
            >
              {activeFilterCount}
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
