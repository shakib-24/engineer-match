"use client";

import {
  AdminFilterBar,
  AdminFilterChipGroup,
  toggleFilterValue,
} from "@/components/admin/shared/AdminFilterBar";
import { CONVERSATION_STATUSES } from "@/constants/messages";
import {
  ADMIN_MESSAGE_DATE_RANGE_OPTIONS,
  ADMIN_MESSAGE_FILTER_LABELS,
  ADMIN_MESSAGE_HANDLING_STATUSES,
  ADMIN_MESSAGE_REPORT_OPTIONS,
  DEFAULT_ADMIN_MESSAGE_FILTER_STATE,
  type AdminMessageFilterState,
  type AdminMessageHandlingStatus,
} from "@/constants/admin-messages";
import { cn } from "@/lib/utils";

interface AdminMessageFiltersProps {
  filters: AdminMessageFilterState;
  onChange: (patch: Partial<AdminMessageFilterState>) => void;
}

export function AdminMessageFilters({ filters, onChange }: AdminMessageFiltersProps) {
  return (
    <AdminFilterBar
      title={ADMIN_MESSAGE_FILTER_LABELS.title}
      resetLabel={ADMIN_MESSAGE_FILTER_LABELS.resetLabel}
      onReset={() => onChange(DEFAULT_ADMIN_MESSAGE_FILTER_STATE)}
    >
      <AdminFilterChipGroup
        legend={ADMIN_MESSAGE_FILTER_LABELS.reportStatus}
        idPrefix="message-report"
        options={ADMIN_MESSAGE_REPORT_OPTIONS}
        selected={filters.reportStatuses}
        onToggle={(value) =>
          onChange({
            reportStatuses: toggleFilterValue(
              filters.reportStatuses,
              value as (typeof ADMIN_MESSAGE_REPORT_OPTIONS)[number],
            ),
          })
        }
      />
      <AdminFilterChipGroup
        legend={ADMIN_MESSAGE_FILTER_LABELS.handlingStatus}
        idPrefix="message-handling"
        options={ADMIN_MESSAGE_HANDLING_STATUSES}
        selected={filters.handlingStatuses}
        onToggle={(value) =>
          onChange({
            handlingStatuses: toggleFilterValue(
              filters.handlingStatuses,
              value as AdminMessageHandlingStatus,
            ),
          })
        }
      />
      <AdminFilterChipGroup
        legend={ADMIN_MESSAGE_FILTER_LABELS.conversationType}
        idPrefix="message-type"
        options={CONVERSATION_STATUSES}
        selected={filters.conversationTypes}
        onToggle={(value) =>
          onChange({ conversationTypes: toggleFilterValue(filters.conversationTypes, value) })
        }
      />
      <fieldset className="flex flex-col gap-2">
        <legend className="text-xs font-semibold text-muted-foreground">
          {ADMIN_MESSAGE_FILTER_LABELS.updatedWithin}
        </legend>
        <div className="flex flex-wrap gap-2">
          {ADMIN_MESSAGE_DATE_RANGE_OPTIONS.map((option) => {
            const isSelected = option.days === filters.updatedWithinDays;
            return (
              <button
                key={option.label}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onChange({ updatedWithinDays: option.days })}
                className={cn(
                  "inline-flex h-8 items-center justify-center rounded-full border px-3 text-xs font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
                  isSelected
                    ? "border-primary bg-primary text-white"
                    : "border-border text-foreground hover:bg-muted",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>
    </AdminFilterBar>
  );
}
