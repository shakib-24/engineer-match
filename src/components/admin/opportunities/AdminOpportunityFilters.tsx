"use client";

import {
  AdminFilterBar,
  AdminFilterChipGroup,
  toggleFilterValue,
} from "@/components/admin/shared/AdminFilterBar";
import { CONTRACT_TYPE_FILTER_OPTIONS } from "@/constants/jobs";
import {
  ADMIN_OPPORTUNITY_DATE_RANGE_OPTIONS,
  ADMIN_OPPORTUNITY_FILTER_LABELS,
  ADMIN_OPPORTUNITY_PUBLICATION_STATUSES,
  ADMIN_OPPORTUNITY_RECRUITMENT_STATUSES,
  ADMIN_OPPORTUNITY_SERVICE_CATEGORIES,
  ADMIN_OPPORTUNITY_WORK_STYLES,
  DEFAULT_ADMIN_OPPORTUNITY_FILTER_STATE,
  type AdminOpportunityFilterState,
  type AdminOpportunityPublicationStatus,
  type AdminOpportunityRecruitmentStatus,
  type AdminOpportunityServiceCategory,
} from "@/constants/admin-opportunities";
import { cn } from "@/lib/utils";

interface AdminOpportunityFiltersProps {
  filters: AdminOpportunityFilterState;
  onChange: (patch: Partial<AdminOpportunityFilterState>) => void;
}

export function AdminOpportunityFilters({ filters, onChange }: AdminOpportunityFiltersProps) {
  return (
    <AdminFilterBar
      title={ADMIN_OPPORTUNITY_FILTER_LABELS.title}
      resetLabel={ADMIN_OPPORTUNITY_FILTER_LABELS.resetLabel}
      onReset={() => onChange(DEFAULT_ADMIN_OPPORTUNITY_FILTER_STATE)}
    >
      <AdminFilterChipGroup
        legend={ADMIN_OPPORTUNITY_FILTER_LABELS.serviceCategory}
        idPrefix="opp-category"
        options={ADMIN_OPPORTUNITY_SERVICE_CATEGORIES}
        selected={filters.serviceCategories}
        onToggle={(value) =>
          onChange({
            serviceCategories: toggleFilterValue(
              filters.serviceCategories,
              value as AdminOpportunityServiceCategory,
            ),
          })
        }
      />
      <AdminFilterChipGroup
        legend={ADMIN_OPPORTUNITY_FILTER_LABELS.contractType}
        idPrefix="opp-contract"
        options={CONTRACT_TYPE_FILTER_OPTIONS}
        selected={filters.contractTypes}
        onToggle={(value) =>
          onChange({ contractTypes: toggleFilterValue(filters.contractTypes, value) })
        }
      />
      <AdminFilterChipGroup
        legend={ADMIN_OPPORTUNITY_FILTER_LABELS.publicationStatus}
        idPrefix="opp-publication"
        options={ADMIN_OPPORTUNITY_PUBLICATION_STATUSES}
        selected={filters.publicationStatuses}
        onToggle={(value) =>
          onChange({
            publicationStatuses: toggleFilterValue(
              filters.publicationStatuses,
              value as AdminOpportunityPublicationStatus,
            ),
          })
        }
      />
      <AdminFilterChipGroup
        legend={ADMIN_OPPORTUNITY_FILTER_LABELS.recruitmentStatus}
        idPrefix="opp-recruitment"
        options={ADMIN_OPPORTUNITY_RECRUITMENT_STATUSES}
        selected={filters.recruitmentStatuses}
        onToggle={(value) =>
          onChange({
            recruitmentStatuses: toggleFilterValue(
              filters.recruitmentStatuses,
              value as AdminOpportunityRecruitmentStatus,
            ),
          })
        }
      />
      <AdminFilterChipGroup
        legend={ADMIN_OPPORTUNITY_FILTER_LABELS.workStyle}
        idPrefix="opp-work-style"
        options={ADMIN_OPPORTUNITY_WORK_STYLES}
        selected={filters.workStyles}
        onToggle={(value) => onChange({ workStyles: toggleFilterValue(filters.workStyles, value) })}
      />
      <fieldset className="flex flex-col gap-2">
        <legend className="text-xs font-semibold text-muted-foreground">
          {ADMIN_OPPORTUNITY_FILTER_LABELS.postedWithin}
        </legend>
        <div className="flex flex-wrap gap-2">
          {ADMIN_OPPORTUNITY_DATE_RANGE_OPTIONS.map((option) => {
            const isSelected = option.days === filters.postedWithinDays;
            return (
              <button
                key={option.label}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onChange({ postedWithinDays: option.days })}
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
