"use client";

import { FILTER_OPTIONS, type FilterOption } from "@/constants/notifications";

interface NotificationFiltersProps {
  value: FilterOption;
  onChange: (value: FilterOption) => void;
}

export function NotificationFilters({ value, onChange }: NotificationFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="通知の絞り込み">
      {FILTER_OPTIONS.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none ${
              isActive
                ? "border-primary bg-primary text-white"
                : "border-border bg-surface text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
