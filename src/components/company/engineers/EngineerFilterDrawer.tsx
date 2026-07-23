"use client";

import { X } from "lucide-react";
import {
  EngineerFilterFields,
  type EngineerFilterState,
} from "@/components/company/engineers/EngineerSearchFilters";
import { FILTER_LABELS } from "@/constants/company-engineers";
import { cn } from "@/lib/utils";

interface EngineerFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: EngineerFilterState;
  onChange: (patch: Partial<EngineerFilterState>) => void;
  resultCount: number;
  prefectureOptions: string[];
  skillOptions: string[];
}

export function EngineerFilterDrawer({
  isOpen,
  onClose,
  filters,
  onChange,
  resultCount,
  prefectureOptions,
  skillOptions,
}: EngineerFilterDrawerProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-40 lg:hidden",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <button
        type="button"
        aria-label={FILTER_LABELS.closeLabel}
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        aria-label={FILTER_LABELS.title}
        className={cn(
          "absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-2xl bg-surface shadow-xl transition-transform duration-200",
          isOpen ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
          <h3 className="text-base font-semibold text-foreground">{FILTER_LABELS.title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={FILTER_LABELS.closeLabel}
            className="inline-flex items-center justify-center rounded-xl p-2 text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <EngineerFilterFields
            filters={filters}
            onChange={onChange}
            idPrefix="drawer"
            prefectureOptions={prefectureOptions}
            skillOptions={skillOptions}
          />
        </div>

        <div className="shrink-0 border-t border-border p-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {FILTER_LABELS.applyLabel}（{resultCount}）
          </button>
        </div>
      </div>
    </div>
  );
}
