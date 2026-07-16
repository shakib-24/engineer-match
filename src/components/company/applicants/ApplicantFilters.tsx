"use client";

import { RotateCcw } from "lucide-react";
import {
  APPLICANT_STATUSES,
  EXPERIENCE_FILTER_OPTIONS,
  FILTER_LABELS,
  ITSS_LEVEL_OPTIONS,
  LOCATION_OPTIONS,
  SORT_OPTIONS,
  type ApplicantStatus,
  type SortOption,
} from "@/constants/company-applicants";

const SELECT_CLASSNAME =
  "h-11 w-full min-w-0 max-w-full rounded-xl border border-border bg-surface px-3 text-sm text-foreground transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none";

export interface ApplicantFiltersState {
  status: ApplicantStatus | "all";
  appliedJob: string | "all";
  experienceYears: number | null;
  itssLevel: number | "all";
  location: string | "all";
}

interface ApplicantFiltersProps {
  filters: ApplicantFiltersState;
  onChange: (patch: Partial<ApplicantFiltersState>) => void;
  sortOption: SortOption;
  onSortChange: (value: SortOption) => void;
  appliedJobOptions: string[];
  hasActiveFilters: boolean;
  onReset: () => void;
}

export function ApplicantFilters({
  filters,
  onChange,
  sortOption,
  onSortChange,
  appliedJobOptions,
  hasActiveFilters,
  onReset,
}: ApplicantFiltersProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end">
        <div className="w-full shrink-0 sm:w-40">
          <label
            htmlFor="applicant-status-filter"
            className="mb-1.5 block text-xs font-medium text-muted-foreground"
          >
            {FILTER_LABELS.statusLabel}
          </label>
          <select
            id="applicant-status-filter"
            value={filters.status}
            onChange={(event) =>
              onChange({ status: event.target.value as ApplicantStatus | "all" })
            }
            className={SELECT_CLASSNAME}
          >
            <option value="all">{FILTER_LABELS.statusAllLabel}</option>
            {APPLICANT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full shrink-0 sm:w-56">
          <label
            htmlFor="applicant-job-filter"
            className="mb-1.5 block text-xs font-medium text-muted-foreground"
          >
            {FILTER_LABELS.appliedJobLabel}
          </label>
          <select
            id="applicant-job-filter"
            value={filters.appliedJob}
            onChange={(event) => onChange({ appliedJob: event.target.value })}
            className={SELECT_CLASSNAME}
          >
            <option value="all">{FILTER_LABELS.appliedJobAllLabel}</option>
            {appliedJobOptions.map((job) => (
              <option key={job} value={job}>
                {job}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full shrink-0 sm:w-36">
          <label
            htmlFor="applicant-experience-filter"
            className="mb-1.5 block text-xs font-medium text-muted-foreground"
          >
            {FILTER_LABELS.experienceLabel}
          </label>
          <select
            id="applicant-experience-filter"
            value={filters.experienceYears ?? ""}
            onChange={(event) =>
              onChange({
                experienceYears: event.target.value === "" ? null : Number(event.target.value),
              })
            }
            className={SELECT_CLASSNAME}
          >
            {EXPERIENCE_FILTER_OPTIONS.map((option) => (
              <option key={option.label} value={option.years ?? ""}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full shrink-0 sm:w-32">
          <label
            htmlFor="applicant-itss-filter"
            className="mb-1.5 block text-xs font-medium text-muted-foreground"
          >
            {FILTER_LABELS.itssLabel}
          </label>
          <select
            id="applicant-itss-filter"
            value={filters.itssLevel}
            onChange={(event) =>
              onChange({
                itssLevel:
                  event.target.value === "all" ? "all" : Number(event.target.value),
              })
            }
            className={SELECT_CLASSNAME}
          >
            <option value="all">{FILTER_LABELS.itssAllLabel}</option>
            {ITSS_LEVEL_OPTIONS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full shrink-0 sm:w-36">
          <label
            htmlFor="applicant-location-filter"
            className="mb-1.5 block text-xs font-medium text-muted-foreground"
          >
            {FILTER_LABELS.locationLabel}
          </label>
          <select
            id="applicant-location-filter"
            value={filters.location}
            onChange={(event) => onChange({ location: event.target.value })}
            className={SELECT_CLASSNAME}
          >
            <option value="all">{FILTER_LABELS.locationAllLabel}</option>
            {LOCATION_OPTIONS.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full shrink-0 sm:w-36">
          <label
            htmlFor="applicant-sort"
            className="mb-1.5 block text-xs font-medium text-muted-foreground"
          >
            {FILTER_LABELS.sortLabel}
          </label>
          <select
            id="applicant-sort"
            value={sortOption}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
            className={SELECT_CLASSNAME}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {FILTER_LABELS.resetLabel}
          </button>
        )}
      </div>
    </div>
  );
}
