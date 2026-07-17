"use client";

import { cn } from "@/lib/utils";
import {
  ADMIN_NOTIFICATION_FILTER_OPTIONS,
  type AdminNotificationFilterOption,
} from "@/constants/admin-notifications";

interface AdminNotificationFiltersProps {
  value: AdminNotificationFilterOption;
  onChange: (value: AdminNotificationFilterOption) => void;
}

export function AdminNotificationFilters({ value, onChange }: AdminNotificationFiltersProps) {
  return (
    <div role="group" aria-label="通知の絞り込み" className="flex flex-wrap gap-2">
      {ADMIN_NOTIFICATION_FILTER_OPTIONS.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex h-8 items-center justify-center rounded-full px-3 text-xs font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
              isActive
                ? "bg-primary text-white"
                : "border border-border bg-surface text-muted-foreground hover:bg-muted",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
