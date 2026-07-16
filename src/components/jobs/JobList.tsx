"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ProfileCompletion } from "@/components/engineer/profile/ProfileCompletion";
import { SearchBar } from "@/components/jobs/SearchBar";
import { ActiveFilters } from "@/components/jobs/ActiveFilters";
import { FilterSidebar } from "@/components/jobs/FilterSidebar";
import { FilterDrawer } from "@/components/jobs/FilterDrawer";
import { JobCard } from "@/components/jobs/JobCard";
import { EmptyState } from "@/components/jobs/EmptyState";
import { Pagination } from "@/components/jobs/Pagination";
import {
  DEFAULT_BOOKMARKED_JOB_IDS,
  DEFAULT_FILTER_STATE,
  JOB_LIST_META,
  JOB_SIDEBAR_LABELS,
  RECOMMENDED_SKILLS,
  SALARY_RANGE_CONFIG,
  type FilterState,
  type Job,
} from "@/constants/jobs";

interface JobListProps {
  jobs: Job[];
}

export function JobList({ jobs }: JobListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER_STATE);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(
    () => new Set(DEFAULT_BOOKMARKED_JOB_IDS),
  );

  function handleFilterChange(patch: Partial<FilterState>) {
    setFilters((prev) => ({ ...prev, ...patch }));
  }

  function handleClearAll() {
    setSearchQuery("");
    setFilters(DEFAULT_FILTER_STATE);
  }

  function handleToggleBookmark(id: string) {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const filteredJobs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return jobs.filter((job) => {
      if (query) {
        const haystack = `${job.title} ${job.company} ${job.skills.join(" ")}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      if (
        filters.contractTypes.length > 0 &&
        !filters.contractTypes.includes(job.contractType)
      ) {
        return false;
      }
      if (filters.locations.length > 0 && !filters.locations.includes(job.location)) {
        return false;
      }
      if (
        filters.workStyles.length > 0 &&
        !filters.workStyles.includes(job.workStyle)
      ) {
        return false;
      }
      if (
        filters.itssLevels.length > 0 &&
        !filters.itssLevels.includes(job.itssLevel)
      ) {
        return false;
      }
      if (
        filters.experienceYears !== null &&
        job.experienceYearsMin > filters.experienceYears
      ) {
        return false;
      }
      if (
        job.salaryMaxManYen < filters.salaryMin ||
        job.salaryMinManYen > filters.salaryMax
      ) {
        return false;
      }
      if (
        filters.updatedWithinDays !== null &&
        job.updatedDaysAgo > filters.updatedWithinDays
      ) {
        return false;
      }
      return true;
    });
  }, [jobs, searchQuery, filters]);

  const activeFilterCount =
    filters.contractTypes.length +
    filters.locations.length +
    filters.workStyles.length +
    filters.itssLevels.length +
    (filters.experienceYears !== null ? 1 : 0) +
    (filters.updatedWithinDays !== null ? 1 : 0) +
    (filters.salaryMin !== SALARY_RANGE_CONFIG.min ||
    filters.salaryMax !== SALARY_RANGE_CONFIG.max
      ? 1
      : 0);

  const savedJobs = jobs.filter((job) => bookmarkedIds.has(job.id));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      <div className="flex min-w-0 flex-col gap-6 lg:col-span-3">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onOpenFilters={() => setIsFilterDrawerOpen(true)}
          activeFilterCount={activeFilterCount}
        />

        <ActiveFilters
          searchQuery={searchQuery}
          filters={filters}
          onSearchChange={setSearchQuery}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
        />

        <p className="text-sm text-muted-foreground">
          {filteredJobs.length}
          {JOB_LIST_META.resultsSuffix}
        </p>

        {filteredJobs.length === 0 ? (
          <EmptyState onReset={handleClearAll} />
        ) : (
          <ul className="flex flex-col gap-4">
            {filteredJobs.map((job) => (
              <li key={job.id}>
                <JobCard
                  job={job}
                  isBookmarked={bookmarkedIds.has(job.id)}
                  onToggleBookmark={handleToggleBookmark}
                />
              </li>
            ))}
          </ul>
        )}

        {filteredJobs.length > 0 && <Pagination />}
      </div>

      <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:col-span-1 lg:self-start">
        <FilterSidebar filters={filters} onChange={handleFilterChange} />

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">
            {JOB_SIDEBAR_LABELS.recommendedSkillsTitle}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {JOB_SIDEBAR_LABELS.recommendedSkillsDescription}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {RECOMMENDED_SKILLS.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">
            {JOB_SIDEBAR_LABELS.savedJobsTitle}
          </h2>
          {savedJobs.length > 0 ? (
            <ul className="mt-4 flex flex-col divide-y divide-border">
              {savedJobs.map((job) => (
                <li key={job.id} className="py-3 first:pt-0 last:pb-0">
                  <Link
                    href={`/engineer/jobs/${job.id}`}
                    className="block min-w-0 rounded-lg transition-colors duration-200 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <p className="truncate text-sm font-semibold text-foreground">
                      {job.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {job.company}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              {JOB_SIDEBAR_LABELS.savedJobsEmptyMessage}
            </p>
          )}
        </div>

        <ProfileCompletion />
      </div>

      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onChange={handleFilterChange}
        resultCount={filteredJobs.length}
      />
    </div>
  );
}
