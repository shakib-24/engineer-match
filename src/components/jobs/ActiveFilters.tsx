"use client";

import { X } from "lucide-react";
import {
  ACTIVE_FILTERS_LABELS,
  EXPERIENCE_FILTER_OPTIONS,
  SALARY_RANGE_CONFIG,
  UPDATED_FILTER_OPTIONS,
  type FilterState,
} from "@/constants/jobs";

interface ActiveFiltersProps {
  searchQuery: string;
  filters: FilterState;
  onSearchChange: (value: string) => void;
  onFilterChange: (patch: Partial<FilterState>) => void;
  onClearAll: () => void;
}

interface Chip {
  key: string;
  label: string;
  onRemove: () => void;
}

export function ActiveFilters({
  searchQuery,
  filters,
  onSearchChange,
  onFilterChange,
  onClearAll,
}: ActiveFiltersProps) {
  const chips: Chip[] = [];

  if (searchQuery.trim() !== "") {
    chips.push({
      key: "search",
      label: `キーワード：${searchQuery}`,
      onRemove: () => onSearchChange(""),
    });
  }

  for (const value of filters.contractTypes) {
    chips.push({
      key: `contract-${value}`,
      label: value,
      onRemove: () =>
        onFilterChange({
          contractTypes: filters.contractTypes.filter((item) => item !== value),
        }),
    });
  }

  for (const value of filters.locations) {
    chips.push({
      key: `location-${value}`,
      label: value,
      onRemove: () =>
        onFilterChange({
          locations: filters.locations.filter((item) => item !== value),
        }),
    });
  }

  for (const value of filters.workStyles) {
    chips.push({
      key: `work-style-${value}`,
      label: value,
      onRemove: () =>
        onFilterChange({
          workStyles: filters.workStyles.filter((item) => item !== value),
        }),
    });
  }

  for (const value of filters.itssLevels) {
    chips.push({
      key: `itss-${value}`,
      label: `ITSSレベル${value}`,
      onRemove: () =>
        onFilterChange({
          itssLevels: filters.itssLevels.filter((item) => item !== value),
        }),
    });
  }

  if (filters.experienceYears !== null) {
    const option = EXPERIENCE_FILTER_OPTIONS.find(
      (item) => item.years === filters.experienceYears,
    );
    if (option) {
      chips.push({
        key: "experience",
        label: option.label,
        onRemove: () => onFilterChange({ experienceYears: null }),
      });
    }
  }

  if (
    filters.salaryMin !== SALARY_RANGE_CONFIG.min ||
    filters.salaryMax !== SALARY_RANGE_CONFIG.max
  ) {
    chips.push({
      key: "salary",
      label: `${filters.salaryMin}〜${filters.salaryMax}${SALARY_RANGE_CONFIG.unit}`,
      onRemove: () =>
        onFilterChange({
          salaryMin: SALARY_RANGE_CONFIG.min,
          salaryMax: SALARY_RANGE_CONFIG.max,
        }),
    });
  }

  if (filters.updatedWithinDays !== null) {
    const option = UPDATED_FILTER_OPTIONS.find(
      (item) => item.days === filters.updatedWithinDays,
    );
    if (option) {
      chips.push({
        key: "updated",
        label: option.label,
        onRemove: () => onFilterChange({ updatedWithinDays: null }),
      });
    }
  }

  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="適用中の絞り込み条件">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          aria-label={`${ACTIVE_FILTERS_LABELS.removeLabelPrefix}${chip.label}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 py-1.5 pr-2 pl-3 text-xs font-medium text-primary transition-colors duration-200 hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {chip.label}
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="rounded text-xs font-semibold text-muted-foreground underline underline-offset-2 transition-colors duration-200 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {ACTIVE_FILTERS_LABELS.clearAllLabel}
      </button>
    </div>
  );
}
