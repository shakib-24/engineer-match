"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { JobCard } from "@/components/company/JobCard";
import { JobSummaryCards } from "@/components/company/JobSummaryCards";
import {
  CONTRACT_TYPE_OPTIONS,
  DUPLICATE_TOAST_MESSAGE,
  EMPTY_STATE_LABELS,
  FILTERED_EMPTY_STATE_LABELS,
  JOB_FILTER_LABELS,
  JOB_STATUSES,
  SORT_OPTIONS,
  type CompanyJob,
  type ContractType,
  type JobPostingStatus,
  type SortOption,
} from "@/constants/company-jobs";

const SELECT_CLASSNAME =
  "h-11 w-full min-w-0 max-w-full rounded-xl border border-border bg-surface px-3 text-sm text-foreground transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none";

interface JobListProps {
  jobs: CompanyJob[];
}

export function JobList({ jobs: initialJobs }: JobListProps) {
  const [jobs, setJobs] = useState<CompanyJob[]>(initialJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<JobPostingStatus | "all">("all");
  const [contractTypeFilter, setContractTypeFilter] = useState<ContractType | "all">(
    "all",
  );
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 3000);
  }

  function handleDuplicate() {
    showToast(DUPLICATE_TOAST_MESSAGE);
  }

  function handleCloseRecruitment(id: string) {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: "募集終了" } : job)),
    );
    showToast("募集を終了しました。");
  }

  function handleResetFilters() {
    setSearchQuery("");
    setStatusFilter("all");
    setContractTypeFilter("all");
  }

  const hasActiveFilters =
    searchQuery.trim() !== "" || statusFilter !== "all" || contractTypeFilter !== "all";

  const visibleJobs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = jobs.filter((job) => {
      if (query && !job.title.toLowerCase().includes(query)) return false;
      if (statusFilter !== "all" && job.status !== statusFilter) return false;
      if (contractTypeFilter !== "all" && job.contractType !== contractTypeFilter)
        return false;
      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      const diff = a.publishedDateISO.localeCompare(b.publishedDateISO);
      return sortOption === "newest" ? -diff : diff;
    });

    return sorted;
  }, [jobs, searchQuery, statusFilter, contractTypeFilter, sortOption]);

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center shadow-sm">
        <p className="text-sm font-semibold text-foreground">
          {EMPTY_STATE_LABELS.title}
        </p>
        <p className="text-sm text-muted-foreground">
          {EMPTY_STATE_LABELS.description}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <JobSummaryCards jobs={jobs} />

      <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end">
          <div className="min-w-[220px] flex-1">
            <label
              htmlFor="job-search-input"
              className="mb-1.5 block text-xs font-medium text-muted-foreground"
            >
              {JOB_FILTER_LABELS.searchLabel}
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="job-search-input"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={JOB_FILTER_LABELS.searchPlaceholder}
                className="h-11 pl-9"
              />
            </div>
          </div>

          <div className="w-full shrink-0 sm:w-40">
            <label
              htmlFor="job-status-filter"
              className="mb-1.5 block text-xs font-medium text-muted-foreground"
            >
              {JOB_FILTER_LABELS.statusLabel}
            </label>
            <select
              id="job-status-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as JobPostingStatus | "all")
              }
              className={SELECT_CLASSNAME}
            >
              <option value="all">{JOB_FILTER_LABELS.statusAllLabel}</option>
              {JOB_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full shrink-0 sm:w-40">
            <label
              htmlFor="job-contract-filter"
              className="mb-1.5 block text-xs font-medium text-muted-foreground"
            >
              {JOB_FILTER_LABELS.contractTypeLabel}
            </label>
            <select
              id="job-contract-filter"
              value={contractTypeFilter}
              onChange={(event) =>
                setContractTypeFilter(event.target.value as ContractType | "all")
              }
              className={SELECT_CLASSNAME}
            >
              <option value="all">{JOB_FILTER_LABELS.contractTypeAllLabel}</option>
              {CONTRACT_TYPE_OPTIONS.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full shrink-0 sm:w-36">
            <label
              htmlFor="job-sort"
              className="mb-1.5 block text-xs font-medium text-muted-foreground"
            >
              {JOB_FILTER_LABELS.sortLabel}
            </label>
            <select
              id="job-sort"
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value as SortOption)}
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
              onClick={handleResetFilters}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              {JOB_FILTER_LABELS.resetLabel}
            </button>
          )}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {visibleJobs.length}件の求人・案件
      </p>

      {visibleJobs.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center shadow-sm">
          <p className="text-sm font-semibold text-foreground">
            {FILTERED_EMPTY_STATE_LABELS.title}
          </p>
          <p className="text-sm text-muted-foreground">
            {FILTERED_EMPTY_STATE_LABELS.description}
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-2 inline-flex h-10 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {FILTERED_EMPTY_STATE_LABELS.ctaLabel}
          </button>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {visibleJobs.map((job) => (
            <li key={job.id}>
              <JobCard
                job={job}
                onDuplicate={handleDuplicate}
                onCloseRecruitment={handleCloseRecruitment}
              />
            </li>
          ))}
        </ul>
      )}

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 sm:justify-end sm:pr-6"
        >
          <div className="flex items-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-white shadow-lg">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}
