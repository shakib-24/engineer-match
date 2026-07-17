"use client";

import {
  AdminFilterBar,
  AdminFilterChipGroup,
  toggleFilterValue,
} from "@/components/admin/shared/AdminFilterBar";
import {
  ADMIN_COMPANY_DATE_RANGE_OPTIONS,
  ADMIN_COMPANY_FILTER_LABELS,
  ADMIN_COMPANY_INDUSTRIES,
  ADMIN_COMPANY_REVIEW_STATUSES,
  ADMIN_COMPANY_SIZES,
  ADMIN_COMPANY_USAGE_STATUSES,
  DEFAULT_ADMIN_COMPANY_FILTER_STATE,
  type AdminCompanyFilterState,
  type AdminCompanyReviewStatus,
  type AdminCompanyUsageStatus,
} from "@/constants/admin-companies";
import { cn } from "@/lib/utils";

interface AdminCompanyFiltersProps {
  filters: AdminCompanyFilterState;
  onChange: (patch: Partial<AdminCompanyFilterState>) => void;
}

export function AdminCompanyFilters({ filters, onChange }: AdminCompanyFiltersProps) {
  return (
    <AdminFilterBar
      title={ADMIN_COMPANY_FILTER_LABELS.title}
      resetLabel={ADMIN_COMPANY_FILTER_LABELS.resetLabel}
      onReset={() => onChange(DEFAULT_ADMIN_COMPANY_FILTER_STATE)}
    >
      <AdminFilterChipGroup
        legend={ADMIN_COMPANY_FILTER_LABELS.reviewStatus}
        idPrefix="company-review-status"
        options={ADMIN_COMPANY_REVIEW_STATUSES}
        selected={filters.reviewStatuses}
        onToggle={(value) =>
          onChange({
            reviewStatuses: toggleFilterValue(
              filters.reviewStatuses,
              value as AdminCompanyReviewStatus,
            ),
          })
        }
      />
      <AdminFilterChipGroup
        legend={ADMIN_COMPANY_FILTER_LABELS.usageStatus}
        idPrefix="company-usage-status"
        options={ADMIN_COMPANY_USAGE_STATUSES}
        selected={filters.usageStatuses}
        onToggle={(value) =>
          onChange({
            usageStatuses: toggleFilterValue(filters.usageStatuses, value as AdminCompanyUsageStatus),
          })
        }
      />
      <AdminFilterChipGroup
        legend={ADMIN_COMPANY_FILTER_LABELS.industry}
        idPrefix="company-industry"
        options={ADMIN_COMPANY_INDUSTRIES}
        selected={filters.industries}
        onToggle={(value) => onChange({ industries: toggleFilterValue(filters.industries, value) })}
      />
      <AdminFilterChipGroup
        legend={ADMIN_COMPANY_FILTER_LABELS.companySize}
        idPrefix="company-size"
        options={ADMIN_COMPANY_SIZES}
        selected={filters.companySizes}
        onToggle={(value) => onChange({ companySizes: toggleFilterValue(filters.companySizes, value) })}
      />
      <fieldset className="flex flex-col gap-2">
        <legend className="text-xs font-semibold text-muted-foreground">
          {ADMIN_COMPANY_FILTER_LABELS.registeredWithin}
        </legend>
        <div className="flex flex-wrap gap-2">
          {ADMIN_COMPANY_DATE_RANGE_OPTIONS.map((option) => {
            const isSelected = option.days === filters.registeredWithinDays;
            return (
              <button
                key={option.label}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onChange({ registeredWithinDays: option.days })}
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
