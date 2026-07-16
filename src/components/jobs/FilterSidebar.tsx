"use client";

import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CONTRACT_TYPE_FILTER_OPTIONS,
  DEFAULT_FILTER_STATE,
  EXPERIENCE_FILTER_OPTIONS,
  FILTER_LABELS,
  ITSS_LEVEL_FILTER_OPTIONS,
  LOCATION_FILTER_OPTIONS,
  SALARY_RANGE_CONFIG,
  UPDATED_FILTER_OPTIONS,
  WORK_STYLE_FILTER_OPTIONS,
  type FilterState,
} from "@/constants/jobs";

function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

interface CheckboxGroupProps {
  legend: string;
  idPrefix: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}

function CheckboxGroup({
  legend,
  idPrefix,
  options,
  selected,
  onToggle,
}: CheckboxGroupProps) {
  return (
    <fieldset className="flex flex-col gap-2.5">
      <legend className="text-sm font-semibold text-foreground">{legend}</legend>
      <div className="flex flex-wrap gap-x-4 gap-y-2.5">
        {options.map((option) => {
          const id = `${idPrefix}-${option}`;
          return (
            <label
              key={option}
              htmlFor={id}
              className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
            >
              <Checkbox
                id={id}
                checked={selected.includes(option)}
                onCheckedChange={() => onToggle(option)}
              />
              {option}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

interface ChipGroupProps<T extends string | number | null> {
  legend: string;
  options: readonly { label: string; value: T }[];
  value: T;
  onSelect: (value: T) => void;
}

function ChipGroup<T extends string | number | null>({
  legend,
  options,
  value,
  onSelect,
}: ChipGroupProps<T>) {
  return (
    <fieldset className="flex flex-col gap-2.5">
      <legend className="text-sm font-semibold text-foreground">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <button
              key={option.label}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(option.value)}
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
  );
}

interface FilterFieldsProps {
  filters: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
  idPrefix: string;
}

export function FilterFields({ filters, onChange, idPrefix }: FilterFieldsProps) {
  const experienceOption =
    EXPERIENCE_FILTER_OPTIONS.find(
      (option) => option.years === filters.experienceYears,
    ) ?? EXPERIENCE_FILTER_OPTIONS[0];
  const updatedOption =
    UPDATED_FILTER_OPTIONS.find(
      (option) => option.days === filters.updatedWithinDays,
    ) ?? UPDATED_FILTER_OPTIONS[0];

  return (
    <div className="flex flex-col gap-6">
      <CheckboxGroup
        legend={FILTER_LABELS.contractType}
        idPrefix={`${idPrefix}-contract`}
        options={CONTRACT_TYPE_FILTER_OPTIONS}
        selected={filters.contractTypes}
        onToggle={(value) =>
          onChange({ contractTypes: toggleValue(filters.contractTypes, value) })
        }
      />

      <CheckboxGroup
        legend={FILTER_LABELS.location}
        idPrefix={`${idPrefix}-location`}
        options={LOCATION_FILTER_OPTIONS}
        selected={filters.locations}
        onToggle={(value) =>
          onChange({ locations: toggleValue(filters.locations, value) })
        }
      />

      <CheckboxGroup
        legend={FILTER_LABELS.workStyle}
        idPrefix={`${idPrefix}-work-style`}
        options={WORK_STYLE_FILTER_OPTIONS}
        selected={filters.workStyles}
        onToggle={(value) =>
          onChange({ workStyles: toggleValue(filters.workStyles, value) })
        }
      />

      <fieldset className="flex flex-col gap-2.5">
        <legend className="text-sm font-semibold text-foreground">
          {FILTER_LABELS.itssLevel}
        </legend>
        <div className="flex flex-wrap gap-2">
          {ITSS_LEVEL_FILTER_OPTIONS.map((level) => {
            const isSelected = filters.itssLevels.includes(level);
            return (
              <button
                key={level}
                type="button"
                aria-pressed={isSelected}
                onClick={() =>
                  onChange({ itssLevels: toggleValue(filters.itssLevels, level) })
                }
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none ${
                  isSelected
                    ? "border-primary bg-primary text-white"
                    : "border-border text-foreground hover:bg-muted"
                }`}
              >
                {level}
              </button>
            );
          })}
        </div>
      </fieldset>

      <ChipGroup
        legend={FILTER_LABELS.experience}
        options={EXPERIENCE_FILTER_OPTIONS.map((option) => ({
          label: option.label,
          value: option.years,
        }))}
        value={experienceOption.years}
        onSelect={(years) => onChange({ experienceYears: years })}
      />

      <div className="flex flex-col gap-2.5">
        <span className="text-sm font-semibold text-foreground">
          {FILTER_LABELS.salary}
        </span>
        <p className="text-sm text-muted-foreground">
          {filters.salaryMin}
          {SALARY_RANGE_CONFIG.unit} 〜 {filters.salaryMax}
          {SALARY_RANGE_CONFIG.unit}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <label className="flex min-w-0 flex-1 flex-col gap-1.5 text-xs text-muted-foreground">
            下限
            <input
              type="range"
              min={SALARY_RANGE_CONFIG.min}
              max={SALARY_RANGE_CONFIG.max}
              step={SALARY_RANGE_CONFIG.step}
              value={filters.salaryMin}
              onChange={(event) =>
                onChange({
                  salaryMin: Math.min(Number(event.target.value), filters.salaryMax),
                })
              }
              className="w-full min-w-0 accent-primary"
            />
          </label>
          <label className="flex min-w-0 flex-1 flex-col gap-1.5 text-xs text-muted-foreground">
            上限
            <input
              type="range"
              min={SALARY_RANGE_CONFIG.min}
              max={SALARY_RANGE_CONFIG.max}
              step={SALARY_RANGE_CONFIG.step}
              value={filters.salaryMax}
              onChange={(event) =>
                onChange({
                  salaryMax: Math.max(Number(event.target.value), filters.salaryMin),
                })
              }
              className="w-full min-w-0 accent-primary"
            />
          </label>
        </div>
      </div>

      <ChipGroup
        legend={FILTER_LABELS.updated}
        options={UPDATED_FILTER_OPTIONS.map((option) => ({
          label: option.label,
          value: option.days,
        }))}
        value={updatedOption.days}
        onSelect={(days) => onChange({ updatedWithinDays: days })}
      />

      <button
        type="button"
        onClick={() => onChange(DEFAULT_FILTER_STATE)}
        className="inline-flex h-10 w-fit items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        {FILTER_LABELS.resetLabel}
      </button>
    </div>
  );
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
}

export function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  return (
    <div className="hidden rounded-2xl border border-border bg-surface p-6 shadow-sm lg:block">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-primary" aria-hidden="true" />
        <h3 className="text-base font-semibold text-foreground">
          {FILTER_LABELS.title}
        </h3>
      </div>
      <div className="mt-6">
        <FilterFields filters={filters} onChange={onChange} idPrefix="sidebar" />
      </div>
    </div>
  );
}
