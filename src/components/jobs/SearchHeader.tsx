"use client";

import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SEARCH_HEADER } from "@/constants/jobs";

export function SearchHeader() {
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {SEARCH_HEADER.title}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {SEARCH_HEADER.description}
      </p>

      <form
        role="search"
        aria-label={SEARCH_HEADER.searchLabel}
        onSubmit={handleSubmit}
        className="mt-5 flex flex-col gap-3 sm:flex-row"
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
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={SEARCH_HEADER.searchPlaceholder}
            className="h-11 pl-9"
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {SEARCH_HEADER.searchButtonLabel}
        </button>
      </form>
    </div>
  );
}
