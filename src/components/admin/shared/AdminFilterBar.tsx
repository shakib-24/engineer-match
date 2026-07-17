"use client";

import type { ReactNode } from "react";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminFilterBarProps {
  title: string;
  resetLabel: string;
  onReset: () => void;
  children: ReactNode;
}

export function AdminFilterBar({
  title,
  resetLabel,
  onReset,
  children,
}: AdminFilterBarProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-primary" aria-hidden="true" />
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-xs font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          {resetLabel}
        </button>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {children}
      </div>
    </div>
  );
}

export function toggleFilterValue<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

interface AdminFilterChipGroupProps {
  legend: string;
  idPrefix: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}

export function AdminFilterChipGroup({
  legend,
  idPrefix,
  options,
  selected,
  onToggle,
}: AdminFilterChipGroupProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-xs font-semibold text-muted-foreground">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={`${idPrefix}-${option}`}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onToggle(option)}
              className={cn(
                "inline-flex h-8 items-center justify-center rounded-full border px-3 text-xs font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
                isSelected
                  ? "border-primary bg-primary text-white"
                  : "border-border text-foreground hover:bg-muted",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
