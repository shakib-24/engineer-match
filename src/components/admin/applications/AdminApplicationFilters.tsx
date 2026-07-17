"use client";

import {
  AdminFilterBar,
  AdminFilterChipGroup,
  toggleFilterValue,
} from "@/components/admin/shared/AdminFilterBar";
import { ADMIN_OPPORTUNITY_SERVICE_CATEGORIES } from "@/constants/admin-opportunities";
import {
  ADMIN_APPLICATION_DATE_RANGE_OPTIONS,
  ADMIN_APPLICATION_FILTER_LABELS,
  ADMIN_APPLICATION_PROBLEM_OPTIONS,
  ADMIN_APPLICATION_STATUSES,
  DEFAULT_ADMIN_APPLICATION_FILTER_STATE,
  type AdminApplicationFilterState,
  type AdminApplicationStatus,
} from "@/constants/admin-applications";
import { cn } from "@/lib/utils";

interface AdminApplicationFiltersProps {
  filters: AdminApplicationFilterState;
  onChange: (patch: Partial<AdminApplicationFilterState>) => void;
  companyOptions: string[];
}

export function AdminApplicationFilters({
  filters,
  onChange,
  companyOptions,
}: AdminApplicationFiltersProps) {
  return (
    <AdminFilterBar
      title={ADMIN_APPLICATION_FILTER_LABELS.title}
      resetLabel={ADMIN_APPLICATION_FILTER_LABELS.resetLabel}
      onReset={() => onChange(DEFAULT_ADMIN_APPLICATION_FILTER_STATE)}
    >
      <AdminFilterChipGroup
        legend={ADMIN_APPLICATION_FILTER_LABELS.status}
        idPrefix="application-status"
        options={ADMIN_APPLICATION_STATUSES}
        selected={filters.statuses}
        onToggle={(value) =>
          onChange({
            statuses: toggleFilterValue(filters.statuses, value as AdminApplicationStatus),
          })
        }
      />
      <AdminFilterChipGroup
        legend={ADMIN_APPLICATION_FILTER_LABELS.serviceCategory}
        idPrefix="application-category"
        options={ADMIN_OPPORTUNITY_SERVICE_CATEGORIES}
        selected={filters.serviceCategories}
        onToggle={(value) =>
          onChange({ serviceCategories: toggleFilterValue(filters.serviceCategories, value) })
        }
      />
      <AdminFilterChipGroup
        legend={ADMIN_APPLICATION_FILTER_LABELS.company}
        idPrefix="application-company"
        options={companyOptions}
        selected={filters.companies}
        onToggle={(value) => onChange({ companies: toggleFilterValue(filters.companies, value) })}
      />
      <AdminFilterChipGroup
        legend={ADMIN_APPLICATION_FILTER_LABELS.problemReported}
        idPrefix="application-problem"
        options={ADMIN_APPLICATION_PROBLEM_OPTIONS}
        selected={filters.problemReported}
        onToggle={(value) =>
          onChange({
            problemReported: toggleFilterValue(
              filters.problemReported,
              value as (typeof ADMIN_APPLICATION_PROBLEM_OPTIONS)[number],
            ),
          })
        }
      />
      <fieldset className="flex flex-col gap-2">
        <legend className="text-xs font-semibold text-muted-foreground">
          {ADMIN_APPLICATION_FILTER_LABELS.appliedWithin}
        </legend>
        <div className="flex flex-wrap gap-2">
          {ADMIN_APPLICATION_DATE_RANGE_OPTIONS.map((option) => {
            const isSelected = option.days === filters.appliedWithinDays;
            return (
              <button
                key={option.label}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onChange({ appliedWithinDays: option.days })}
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
