"use client";

import {
  AdminFilterBar,
  AdminFilterChipGroup,
  toggleFilterValue,
} from "@/components/admin/shared/AdminFilterBar";
import {
  ADMIN_REPORT_CATEGORIES,
  ADMIN_REPORT_DATE_RANGE_OPTIONS,
  ADMIN_REPORT_FILTER_LABELS,
  ADMIN_REPORT_PRIORITIES,
  ADMIN_REPORT_STATUSES,
  ADMIN_REPORT_TARGET_TYPES,
  DEFAULT_ADMIN_REPORT_FILTER_STATE,
  type AdminReportCategory,
  type AdminReportFilterState,
  type AdminReportPriority,
  type AdminReportStatus,
  type AdminReportTargetType,
} from "@/constants/admin-reports";
import { cn } from "@/lib/utils";

interface AdminReportFiltersProps {
  filters: AdminReportFilterState;
  onChange: (patch: Partial<AdminReportFilterState>) => void;
}

export function AdminReportFilters({ filters, onChange }: AdminReportFiltersProps) {
  return (
    <AdminFilterBar
      title={ADMIN_REPORT_FILTER_LABELS.title}
      resetLabel={ADMIN_REPORT_FILTER_LABELS.resetLabel}
      onReset={() => onChange(DEFAULT_ADMIN_REPORT_FILTER_STATE)}
    >
      <AdminFilterChipGroup
        legend={ADMIN_REPORT_FILTER_LABELS.category}
        idPrefix="report-category"
        options={ADMIN_REPORT_CATEGORIES}
        selected={filters.categories}
        onToggle={(value) =>
          onChange({ categories: toggleFilterValue(filters.categories, value as AdminReportCategory) })
        }
      />
      <AdminFilterChipGroup
        legend={ADMIN_REPORT_FILTER_LABELS.priority}
        idPrefix="report-priority"
        options={ADMIN_REPORT_PRIORITIES}
        selected={filters.priorities}
        onToggle={(value) =>
          onChange({ priorities: toggleFilterValue(filters.priorities, value as AdminReportPriority) })
        }
      />
      <AdminFilterChipGroup
        legend={ADMIN_REPORT_FILTER_LABELS.status}
        idPrefix="report-status"
        options={ADMIN_REPORT_STATUSES}
        selected={filters.statuses}
        onToggle={(value) =>
          onChange({ statuses: toggleFilterValue(filters.statuses, value as AdminReportStatus) })
        }
      />
      <AdminFilterChipGroup
        legend={ADMIN_REPORT_FILTER_LABELS.targetType}
        idPrefix="report-target"
        options={ADMIN_REPORT_TARGET_TYPES}
        selected={filters.targetTypes}
        onToggle={(value) =>
          onChange({
            targetTypes: toggleFilterValue(filters.targetTypes, value as AdminReportTargetType),
          })
        }
      />
      <fieldset className="flex flex-col gap-2">
        <legend className="text-xs font-semibold text-muted-foreground">
          {ADMIN_REPORT_FILTER_LABELS.reportedWithin}
        </legend>
        <div className="flex flex-wrap gap-2">
          {ADMIN_REPORT_DATE_RANGE_OPTIONS.map((option) => {
            const isSelected = option.days === filters.reportedWithinDays;
            return (
              <button
                key={option.label}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onChange({ reportedWithinDays: option.days })}
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
