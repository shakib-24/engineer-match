"use client";

import {
  AdminFilterBar,
  AdminFilterChipGroup,
  toggleFilterValue,
} from "@/components/admin/shared/AdminFilterBar";
import {
  ADMIN_USER_ACCOUNT_STATUSES,
  ADMIN_USER_DATE_RANGE_OPTIONS,
  ADMIN_USER_FILTER_LABELS,
  ADMIN_USER_ROLES,
  ADMIN_USER_VERIFICATION_STATUSES,
  DEFAULT_ADMIN_USER_FILTER_STATE,
  type AdminUserAccountStatus,
  type AdminUserFilterState,
  type AdminUserRole,
  type AdminUserVerificationStatus,
} from "@/constants/admin-users";
import { cn } from "@/lib/utils";

interface AdminUserFiltersProps {
  filters: AdminUserFilterState;
  onChange: (patch: Partial<AdminUserFilterState>) => void;
}

function DateRangeGroup({
  legend,
  selected,
  onSelect,
}: {
  legend: string;
  selected: number | null;
  onSelect: (days: number | null) => void;
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-xs font-semibold text-muted-foreground">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {ADMIN_USER_DATE_RANGE_OPTIONS.map((option) => {
          const isSelected = option.days === selected;
          return (
            <button
              key={option.label}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(option.days)}
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
  );
}

export function AdminUserFilters({ filters, onChange }: AdminUserFiltersProps) {
  return (
    <AdminFilterBar
      title={ADMIN_USER_FILTER_LABELS.title}
      resetLabel={ADMIN_USER_FILTER_LABELS.resetLabel}
      onReset={() => onChange(DEFAULT_ADMIN_USER_FILTER_STATE)}
    >
      <AdminFilterChipGroup
        legend={ADMIN_USER_FILTER_LABELS.role}
        idPrefix="user-role"
        options={ADMIN_USER_ROLES}
        selected={filters.roles}
        onToggle={(value) =>
          onChange({ roles: toggleFilterValue(filters.roles, value as AdminUserRole) })
        }
      />
      <AdminFilterChipGroup
        legend={ADMIN_USER_FILTER_LABELS.accountStatus}
        idPrefix="user-account-status"
        options={ADMIN_USER_ACCOUNT_STATUSES}
        selected={filters.accountStatuses}
        onToggle={(value) =>
          onChange({
            accountStatuses: toggleFilterValue(
              filters.accountStatuses,
              value as AdminUserAccountStatus,
            ),
          })
        }
      />
      <AdminFilterChipGroup
        legend={ADMIN_USER_FILTER_LABELS.verificationStatus}
        idPrefix="user-verification"
        options={ADMIN_USER_VERIFICATION_STATUSES}
        selected={filters.verificationStatuses}
        onToggle={(value) =>
          onChange({
            verificationStatuses: toggleFilterValue(
              filters.verificationStatuses,
              value as AdminUserVerificationStatus,
            ),
          })
        }
      />
      <div className="flex flex-col gap-5">
        <DateRangeGroup
          legend={ADMIN_USER_FILTER_LABELS.registeredWithin}
          selected={filters.registeredWithinDays}
          onSelect={(days) => onChange({ registeredWithinDays: days })}
        />
        <DateRangeGroup
          legend={ADMIN_USER_FILTER_LABELS.lastLoginWithin}
          selected={filters.lastLoginWithinDays}
          onSelect={(days) => onChange({ lastLoginWithinDays: days })}
        />
      </div>
    </AdminFilterBar>
  );
}
