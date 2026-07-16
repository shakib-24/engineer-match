"use client";

import { X } from "lucide-react";
import type { EngineerFilterState } from "@/components/company/engineers/EngineerSearchFilters";
import {
  ACTIVE_FILTERS_LABELS,
  EXPERIENCE_BUCKET_OPTIONS,
} from "@/constants/company-engineers";

interface Chip {
  key: string;
  label: string;
  onRemove: () => void;
}

interface EngineerActiveFiltersProps {
  searchQuery: string;
  filters: EngineerFilterState;
  onSearchChange: (value: string) => void;
  onFilterChange: (patch: Partial<EngineerFilterState>) => void;
  onClearAll: () => void;
}

export function EngineerActiveFilters({
  searchQuery,
  filters,
  onSearchChange,
  onFilterChange,
  onClearAll,
}: EngineerActiveFiltersProps) {
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
        onFilterChange({ contractTypes: filters.contractTypes.filter((item) => item !== value) }),
    });
  }
  for (const value of filters.locations) {
    chips.push({
      key: `location-${value}`,
      label: value,
      onRemove: () =>
        onFilterChange({ locations: filters.locations.filter((item) => item !== value) }),
    });
  }
  for (const value of filters.workStyles) {
    chips.push({
      key: `work-style-${value}`,
      label: value,
      onRemove: () =>
        onFilterChange({ workStyles: filters.workStyles.filter((item) => item !== value) }),
    });
  }
  for (const value of filters.categories) {
    chips.push({
      key: `category-${value}`,
      label: value,
      onRemove: () =>
        onFilterChange({ categories: filters.categories.filter((item) => item !== value) }),
    });
  }
  for (const value of filters.skills) {
    chips.push({
      key: `skill-${value}`,
      label: value,
      onRemove: () => onFilterChange({ skills: filters.skills.filter((item) => item !== value) }),
    });
  }
  for (const value of filters.itssLevels) {
    chips.push({
      key: `itss-${value}`,
      label: `${ACTIVE_FILTERS_LABELS.itssPrefix}${value}`,
      onRemove: () =>
        onFilterChange({ itssLevels: filters.itssLevels.filter((item) => item !== value) }),
    });
  }
  if (filters.experienceBucket !== null) {
    const option = EXPERIENCE_BUCKET_OPTIONS.find((item) => item.value === filters.experienceBucket);
    if (option) {
      chips.push({
        key: "experience",
        label: option.label,
        onRemove: () => onFilterChange({ experienceBucket: null }),
      });
    }
  }
  for (const value of filters.availability) {
    chips.push({
      key: `availability-${value}`,
      label: value,
      onRemove: () =>
        onFilterChange({ availability: filters.availability.filter((item) => item !== value) }),
    });
  }
  for (const value of filters.languages) {
    chips.push({
      key: `language-${value}`,
      label: value,
      onRemove: () =>
        onFilterChange({ languages: filters.languages.filter((item) => item !== value) }),
    });
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
