"use client";

import { RotateCcw, SlidersHorizontal } from "lucide-react";
import {
  CONTRACT_TYPE_FILTER_OPTIONS,
  LOCATION_FILTER_OPTIONS,
  WORK_STYLE_FILTER_OPTIONS,
} from "@/constants/jobs";
import {
  DEFAULT_FAVORITE_FILTER_STATE,
  FAVORITE_APPLICATION_STATUS_OPTIONS,
  FAVORITE_FILTER_LABELS,
  FAVORITE_SORT_OPTIONS,
  type FavoriteFilterState,
  type FavoriteSortOption,
} from "@/constants/favorites";

function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

interface ChipToggleGroupProps {
  legend: string;
  idPrefix: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}

function ChipToggleGroup({
  legend,
  idPrefix,
  options,
  selected,
  onToggle,
}: ChipToggleGroupProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-xs font-semibold text-muted-foreground">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={`${idPrefix}-${option}`}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onToggle(option)}
              className={`inline-flex h-8 items-center justify-center rounded-full border px-3 text-xs font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none ${
                isSelected
                  ? "border-primary bg-primary text-white"
                  : "border-border text-foreground hover:bg-muted"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

interface FavoriteFiltersProps {
  filters: FavoriteFilterState;
  onChange: (patch: Partial<FavoriteFilterState>) => void;
  sortOption: FavoriteSortOption;
  onSortChange: (value: FavoriteSortOption) => void;
}

export function FavoriteFilters({
  filters,
  onChange,
  sortOption,
  onSortChange,
}: FavoriteFiltersProps) {
  function handleReset() {
    onChange(DEFAULT_FAVORITE_FILTER_STATE);
    onSortChange("newest");
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-primary" aria-hidden="true" />
        <h3 className="text-base font-semibold text-foreground">
          {FAVORITE_FILTER_LABELS.title}
        </h3>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <ChipToggleGroup
          legend={FAVORITE_FILTER_LABELS.contractType}
          idPrefix="favorite-contract"
          options={CONTRACT_TYPE_FILTER_OPTIONS}
          selected={filters.contractTypes}
          onToggle={(value) =>
            onChange({ contractTypes: toggleValue(filters.contractTypes, value) })
          }
        />

        <ChipToggleGroup
          legend={FAVORITE_FILTER_LABELS.location}
          idPrefix="favorite-location"
          options={LOCATION_FILTER_OPTIONS}
          selected={filters.locations}
          onToggle={(value) =>
            onChange({ locations: toggleValue(filters.locations, value) })
          }
        />

        <ChipToggleGroup
          legend={FAVORITE_FILTER_LABELS.workStyle}
          idPrefix="favorite-work-style"
          options={WORK_STYLE_FILTER_OPTIONS}
          selected={filters.workStyles}
          onToggle={(value) =>
            onChange({ workStyles: toggleValue(filters.workStyles, value) })
          }
        />

        <ChipToggleGroup
          legend={FAVORITE_FILTER_LABELS.applicationStatus}
          idPrefix="favorite-application-status"
          options={FAVORITE_APPLICATION_STATUS_OPTIONS}
          selected={filters.applicationStatuses}
          onToggle={(value) =>
            onChange({
              applicationStatuses: toggleValue(
                filters.applicationStatuses,
                value as FavoriteFilterState["applicationStatuses"][number],
              ),
            })
          }
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
        <fieldset className="flex flex-col gap-2">
          <legend className="text-xs font-semibold text-muted-foreground">
            {FAVORITE_FILTER_LABELS.sortLabel}
          </legend>
          <div className="flex flex-wrap gap-2">
            {FAVORITE_SORT_OPTIONS.map((option) => {
              const isSelected = option.value === sortOption;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onSortChange(option.value)}
                  className={`inline-flex h-8 items-center justify-center rounded-full border px-3 text-xs font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none ${
                    isSelected
                      ? "border-primary bg-primary text-white"
                      : "border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex h-9 w-fit items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          {FAVORITE_FILTER_LABELS.resetLabel}
        </button>
      </div>
    </div>
  );
}
