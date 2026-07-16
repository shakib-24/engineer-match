"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SEARCH_LABELS } from "@/constants/company-applicants";

interface ApplicantSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function ApplicantSearchBar({ value, onChange }: ApplicantSearchBarProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
      <label
        htmlFor="applicant-search-input"
        className="mb-1.5 block text-xs font-medium text-muted-foreground"
      >
        {SEARCH_LABELS.label}
      </label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          id="applicant-search-input"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={SEARCH_LABELS.placeholder}
          className="h-11 pl-9"
        />
      </div>
    </div>
  );
}
