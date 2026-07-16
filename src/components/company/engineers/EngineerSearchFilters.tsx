"use client";

import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AVAILABILITY_OPTIONS,
  CATEGORY_OPTIONS,
  CONTRACT_TYPE_OPTIONS,
  EXPERIENCE_BUCKET_OPTIONS,
  FILTER_LABELS,
  ITSS_LEVEL_OPTIONS,
  LANGUAGE_OPTIONS,
  LOCATION_OPTIONS,
  SKILL_OPTIONS,
  WORK_STYLE_OPTIONS,
  type ExperienceBucket,
} from "@/constants/company-engineers";

function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export interface EngineerFilterState {
  contractTypes: string[];
  locations: string[];
  workStyles: string[];
  categories: string[];
  skills: string[];
  itssLevels: number[];
  experienceBucket: ExperienceBucket;
  availability: string[];
  languages: string[];
}

export const DEFAULT_ENGINEER_FILTER_STATE: EngineerFilterState = {
  contractTypes: [],
  locations: [],
  workStyles: [],
  categories: [],
  skills: [],
  itssLevels: [],
  experienceBucket: null,
  availability: [],
  languages: [],
};

interface CheckboxGroupProps {
  legend: string;
  idPrefix: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}

function CheckboxGroup({ legend, idPrefix, options, selected, onToggle }: CheckboxGroupProps) {
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

interface EngineerFilterFieldsProps {
  filters: EngineerFilterState;
  onChange: (patch: Partial<EngineerFilterState>) => void;
  idPrefix: string;
}

export function EngineerFilterFields({ filters, onChange, idPrefix }: EngineerFilterFieldsProps) {
  return (
    <div className="flex flex-col gap-6">
      <CheckboxGroup
        legend={FILTER_LABELS.contractTypes}
        idPrefix={`${idPrefix}-contract`}
        options={CONTRACT_TYPE_OPTIONS}
        selected={filters.contractTypes}
        onToggle={(value) => onChange({ contractTypes: toggleValue(filters.contractTypes, value) })}
      />

      <CheckboxGroup
        legend={FILTER_LABELS.locations}
        idPrefix={`${idPrefix}-location`}
        options={LOCATION_OPTIONS}
        selected={filters.locations}
        onToggle={(value) => onChange({ locations: toggleValue(filters.locations, value) })}
      />

      <CheckboxGroup
        legend={FILTER_LABELS.workStyles}
        idPrefix={`${idPrefix}-work-style`}
        options={WORK_STYLE_OPTIONS}
        selected={filters.workStyles}
        onToggle={(value) => onChange({ workStyles: toggleValue(filters.workStyles, value) })}
      />

      <CheckboxGroup
        legend={FILTER_LABELS.categories}
        idPrefix={`${idPrefix}-category`}
        options={CATEGORY_OPTIONS}
        selected={filters.categories}
        onToggle={(value) => onChange({ categories: toggleValue(filters.categories, value) })}
      />

      <CheckboxGroup
        legend={FILTER_LABELS.skills}
        idPrefix={`${idPrefix}-skill`}
        options={SKILL_OPTIONS}
        selected={filters.skills}
        onToggle={(value) => onChange({ skills: toggleValue(filters.skills, value) })}
      />

      <fieldset className="flex flex-col gap-2.5">
        <legend className="text-sm font-semibold text-foreground">
          {FILTER_LABELS.itssLevels}
        </legend>
        <div className="flex flex-wrap gap-2">
          {ITSS_LEVEL_OPTIONS.map((level) => {
            const isSelected = filters.itssLevels.includes(level);
            return (
              <button
                key={level}
                type="button"
                aria-pressed={isSelected}
                aria-label={`${FILTER_LABELS.itssLevels} ${level}`}
                onClick={() => onChange({ itssLevels: toggleValue(filters.itssLevels, level) })}
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

      <fieldset className="flex flex-col gap-2.5">
        <legend className="text-sm font-semibold text-foreground">
          {FILTER_LABELS.experience}
        </legend>
        <div className="flex flex-wrap gap-2">
          {EXPERIENCE_BUCKET_OPTIONS.map((option) => {
            const isSelected = option.value === filters.experienceBucket;
            return (
              <button
                key={option.label}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onChange({ experienceBucket: option.value })}
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

      <CheckboxGroup
        legend={FILTER_LABELS.availability}
        idPrefix={`${idPrefix}-availability`}
        options={AVAILABILITY_OPTIONS}
        selected={filters.availability}
        onToggle={(value) => onChange({ availability: toggleValue(filters.availability, value) })}
      />

      <CheckboxGroup
        legend={FILTER_LABELS.languages}
        idPrefix={`${idPrefix}-language`}
        options={LANGUAGE_OPTIONS}
        selected={filters.languages}
        onToggle={(value) => onChange({ languages: toggleValue(filters.languages, value) })}
      />

      <button
        type="button"
        onClick={() => onChange(DEFAULT_ENGINEER_FILTER_STATE)}
        className="inline-flex h-10 w-fit items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        {FILTER_LABELS.resetLabel}
      </button>
    </div>
  );
}

interface EngineerSearchFiltersProps {
  filters: EngineerFilterState;
  onChange: (patch: Partial<EngineerFilterState>) => void;
}

export function EngineerSearchFilters({ filters, onChange }: EngineerSearchFiltersProps) {
  return (
    <div className="hidden rounded-2xl border border-border bg-surface p-6 shadow-sm lg:block">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-primary" aria-hidden="true" />
        <h3 className="text-base font-semibold text-foreground">{FILTER_LABELS.title}</h3>
      </div>
      <div className="mt-6 max-h-[calc(100vh-14rem)] overflow-y-auto pr-1">
        <EngineerFilterFields filters={filters} onChange={onChange} idPrefix="sidebar" />
      </div>
    </div>
  );
}
