"use client";

import { useId, useState, type FormEvent } from "react";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CONTRACT_TYPE_FILTER_OPTIONS,
  FILTER_PANEL_LABELS,
  ITSS_LEVEL_FILTER_OPTIONS,
  LOCATION_FILTER_OPTIONS,
  SALARY_RANGE_CONFIG,
  SKILL_FILTER_OPTIONS,
} from "@/constants/jobs";

function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

interface CheckboxGroupProps {
  legend: string;
  name: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}

function CheckboxGroup({
  legend,
  name,
  options,
  selected,
  onToggle,
}: CheckboxGroupProps) {
  return (
    <fieldset className="flex flex-col gap-2.5">
      <legend className="text-sm font-semibold text-foreground">{legend}</legend>
      <div className="flex flex-wrap gap-x-5 gap-y-2.5">
        {options.map((option) => {
          const id = `${name}-${option}`;
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

export function SearchFilters() {
  const [contractTypes, setContractTypes] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [itssLevels, setItssLevels] = useState<number[]>([]);
  const [salaryMin, setSalaryMin] = useState<number>(SALARY_RANGE_CONFIG.min);
  const [salaryMax, setSalaryMax] = useState<number>(SALARY_RANGE_CONFIG.max);

  const itssLegendId = useId();

  function handleReset() {
    setContractTypes([]);
    setLocations([]);
    setSkills([]);
    setItssLevels([]);
    setSalaryMin(SALARY_RANGE_CONFIG.min);
    setSalaryMax(SALARY_RANGE_CONFIG.max);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
    >
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-primary" aria-hidden="true" />
        <h3 className="text-base font-semibold text-foreground">
          {FILTER_PANEL_LABELS.title}
        </h3>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <CheckboxGroup
          legend={FILTER_PANEL_LABELS.contractType}
          name="contract-type"
          options={CONTRACT_TYPE_FILTER_OPTIONS}
          selected={contractTypes}
          onToggle={(value) => setContractTypes((prev) => toggleValue(prev, value))}
        />

        <CheckboxGroup
          legend={FILTER_PANEL_LABELS.location}
          name="location"
          options={LOCATION_FILTER_OPTIONS}
          selected={locations}
          onToggle={(value) => setLocations((prev) => toggleValue(prev, value))}
        />

        <CheckboxGroup
          legend={FILTER_PANEL_LABELS.skills}
          name="skill"
          options={SKILL_FILTER_OPTIONS}
          selected={skills}
          onToggle={(value) => setSkills((prev) => toggleValue(prev, value))}
        />

        <fieldset className="flex flex-col gap-2.5">
          <legend id={itssLegendId} className="text-sm font-semibold text-foreground">
            {FILTER_PANEL_LABELS.itssLevel}
          </legend>
          <div
            role="group"
            aria-labelledby={itssLegendId}
            className="flex flex-wrap gap-2"
          >
            {ITSS_LEVEL_FILTER_OPTIONS.map((level) => {
              const isSelected = itssLevels.includes(level);
              return (
                <button
                  key={level}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() =>
                    setItssLevels((prev) => toggleValue(prev, level))
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

        <div className="flex flex-col gap-2.5">
          <span className="text-sm font-semibold text-foreground">
            {FILTER_PANEL_LABELS.salary}
          </span>
          <p className="text-sm text-muted-foreground">
            {salaryMin}
            {SALARY_RANGE_CONFIG.unit} 〜 {salaryMax}
            {SALARY_RANGE_CONFIG.unit}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <label className="flex flex-1 flex-col gap-1.5 text-xs text-muted-foreground">
              下限
              <input
                type="range"
                min={SALARY_RANGE_CONFIG.min}
                max={SALARY_RANGE_CONFIG.max}
                step={SALARY_RANGE_CONFIG.step}
                value={salaryMin}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  setSalaryMin(Math.min(value, salaryMax));
                }}
                className="accent-primary"
              />
            </label>
            <label className="flex flex-1 flex-col gap-1.5 text-xs text-muted-foreground">
              上限
              <input
                type="range"
                min={SALARY_RANGE_CONFIG.min}
                max={SALARY_RANGE_CONFIG.max}
                step={SALARY_RANGE_CONFIG.step}
                value={salaryMax}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  setSalaryMax(Math.max(value, salaryMin));
                }}
                className="accent-primary"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {FILTER_PANEL_LABELS.applyLabel}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          {FILTER_PANEL_LABELS.resetLabel}
        </button>
      </div>
    </form>
  );
}
