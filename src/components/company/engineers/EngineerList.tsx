"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EngineerSearchHeader } from "@/components/company/engineers/EngineerSearchHeader";
import { EngineerActiveFilters } from "@/components/company/engineers/EngineerActiveFilters";
import {
  EngineerSearchFilters,
  DEFAULT_ENGINEER_FILTER_STATE,
  type EngineerFilterState,
} from "@/components/company/engineers/EngineerSearchFilters";
import { EngineerFilterDrawer } from "@/components/company/engineers/EngineerFilterDrawer";
import { EngineerCard } from "@/components/company/engineers/EngineerCard";
import { EngineerEmptyState } from "@/components/company/engineers/EngineerEmptyState";
import {
  FILTER_LABELS,
  RECENT_SEARCHES,
  RESULTS_META,
  SCOUT_DIALOG_LABELS,
  SEARCH_LABELS,
  SIDEBAR_LABELS,
  SORT_OPTIONS,
  type Engineer,
  type SortOption,
} from "@/constants/company-engineers";

const SELECT_CLASSNAME =
  "h-11 w-full min-w-0 max-w-full rounded-xl border border-border bg-surface px-3 text-sm text-foreground transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none";

const EXPERIENCE_BUCKET_RANGES: Record<string, [number, number]> = {
  under1: [0, 1],
  "1to3": [1, 3],
  "3to5": [3, 5],
  "5to10": [5, 10],
  over10: [10, Infinity],
};

function matchesExperienceBucket(years: number, bucket: string | null): boolean {
  if (bucket === null) return true;
  const range = EXPERIENCE_BUCKET_RANGES[bucket];
  if (!range) return true;
  return years >= range[0] && years < range[1];
}

function getMaxItssLevel(engineer: Engineer): number {
  return Math.max(...engineer.technicalSkills.map((skill) => skill.itssLevel), 1);
}

interface EngineerListProps {
  engineers: Engineer[];
}

export function EngineerList({ engineers }: EngineerListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<EngineerFilterState>(DEFAULT_ENGINEER_FILTER_STATE);
  const [sortOption, setSortOption] = useState<SortOption>("recommended");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [favoritedIds, setFavoritedIds] = useState<Set<string>>(
    () => new Set(engineers.filter((engineer) => engineer.isFavorited).map((engineer) => engineer.id)),
  );
  const [scoutedIds, setScoutedIds] = useState<Set<string>>(
    () => new Set(engineers.filter((engineer) => engineer.isScouted).map((engineer) => engineer.id)),
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function updateFilters(patch: Partial<EngineerFilterState>) {
    setFilters((prev) => ({ ...prev, ...patch }));
  }

  function handleClearAll() {
    setSearchQuery("");
    setFilters(DEFAULT_ENGINEER_FILTER_STATE);
  }

  function handleToggleFavorite(id: string) {
    setFavoritedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleScout(id: string) {
    setScoutedIds((prev) => new Set(prev).add(id));
    setToastMessage(`${SCOUT_DIALOG_LABELS.toastTitle} ${SCOUT_DIALOG_LABELS.toastNote}`);
    window.setTimeout(() => setToastMessage(null), 3500);
  }

  const activeFilterCount =
    filters.contractTypes.length +
    filters.locations.length +
    filters.workStyles.length +
    filters.categories.length +
    filters.skills.length +
    filters.itssLevels.length +
    (filters.experienceBucket !== null ? 1 : 0) +
    filters.availability.length +
    filters.languages.length;

  const filteredEngineers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = engineers.filter((engineer) => {
      if (query) {
        const haystack = [
          engineer.name,
          engineer.title,
          ...engineer.technicalSkills.map((skill) => skill.name),
          ...engineer.certifications.map((cert) => cert.name),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      if (
        filters.contractTypes.length > 0 &&
        !engineer.preferredContractTypes.some((type) => filters.contractTypes.includes(type))
      )
        return false;
      if (filters.locations.length > 0 && !filters.locations.includes(engineer.location))
        return false;
      if (
        filters.workStyles.length > 0 &&
        !engineer.preferredWorkStyles.some((style) => filters.workStyles.includes(style))
      )
        return false;
      if (filters.categories.length > 0 && !filters.categories.includes(engineer.category))
        return false;
      if (
        filters.skills.length > 0 &&
        !engineer.technicalSkills.some((skill) => filters.skills.includes(skill.name))
      )
        return false;
      if (
        filters.itssLevels.length > 0 &&
        !engineer.technicalSkills.some((skill) => filters.itssLevels.includes(skill.itssLevel))
      )
        return false;
      if (!matchesExperienceBucket(engineer.experienceYears, filters.experienceBucket))
        return false;
      if (filters.availability.length > 0 && !filters.availability.includes(engineer.availability))
        return false;
      if (
        filters.languages.length > 0 &&
        !engineer.languages.some((lang) => filters.languages.includes(lang.name))
      )
        return false;
      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "lastActive":
          return b.lastActiveDateISO.localeCompare(a.lastActiveDateISO);
        case "experience":
          return b.experienceYears - a.experienceYears;
        case "itss":
          return getMaxItssLevel(b) - getMaxItssLevel(a);
        case "registered":
          return b.registeredDateISO.localeCompare(a.registeredDateISO);
        case "recommended":
        default:
          return 0;
      }
    });

    return sorted;
  }, [engineers, searchQuery, filters, sortOption]);

  const favoritedEngineers = engineers.filter((engineer) => favoritedIds.has(engineer.id));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      <div className="flex min-w-0 flex-col gap-6 lg:col-span-3">
        <EngineerSearchHeader />

        <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <label htmlFor="engineer-search-input" className="sr-only">
                {SEARCH_LABELS.label}
              </label>
              <Input
                id="engineer-search-input"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={SEARCH_LABELS.placeholder}
                className="h-11 pl-9"
              />
            </div>
            <button
              type="button"
              onClick={() => setIsFilterDrawerOpen(true)}
              aria-label={FILTER_LABELS.openLabel}
              className="relative inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{FILTER_LABELS.openLabel}</span>
              {activeFilterCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-white"
                  aria-hidden="true"
                >
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <EngineerActiveFilters
          searchQuery={searchQuery}
          filters={filters}
          onSearchChange={setSearchQuery}
          onFilterChange={updateFilters}
          onClearAll={handleClearAll}
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {filteredEngineers.length}
            {RESULTS_META.resultsSuffix}
          </p>
          <div className="w-full sm:w-56">
            <label htmlFor="engineer-sort" className="sr-only">
              並び替え
            </label>
            <select
              id="engineer-sort"
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
        </div>

        {filteredEngineers.length === 0 ? (
          <EngineerEmptyState onReset={handleClearAll} />
        ) : (
          <ul className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {filteredEngineers.map((engineer) => (
              <li key={engineer.id}>
                <EngineerCard
                  engineer={engineer}
                  isFavorited={favoritedIds.has(engineer.id)}
                  isScouted={scoutedIds.has(engineer.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onScout={handleScout}
                />
              </li>
            ))}
          </ul>
        )}

        {filteredEngineers.length > 0 && (
          <nav aria-label="ページネーション" className="flex items-center justify-center gap-1.5">
            <button
              type="button"
              aria-disabled="true"
              className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-3 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              前へ
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                type="button"
                aria-disabled={page !== 1 ? "true" : undefined}
                aria-current={page === 1 ? "page" : undefined}
                aria-label={`ページ ${page}`}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none ${
                  page === 1
                    ? "bg-primary text-white"
                    : "border border-border text-foreground hover:bg-muted"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              aria-disabled="true"
              className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              次へ
            </button>
          </nav>
        )}
      </div>

      <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:col-span-1 lg:self-start">
        <EngineerSearchFilters filters={filters} onChange={updateFilters} />

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">
            {SIDEBAR_LABELS.favoritesTitle}
          </h2>
          {favoritedEngineers.length > 0 ? (
            <ul className="mt-4 flex flex-col divide-y divide-border">
              {favoritedEngineers.map((engineer) => (
                <li key={engineer.id} className="py-3 first:pt-0 last:pb-0">
                  <Link
                    href={`/company/engineers/${engineer.id}`}
                    className="block min-w-0 rounded-lg transition-colors duration-200 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <p className="truncate text-sm font-semibold text-foreground">
                      {engineer.name}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {engineer.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              {SIDEBAR_LABELS.favoritesEmptyMessage}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">
            {SIDEBAR_LABELS.recentSearchesTitle}
          </h2>
          <ul className="mt-4 flex flex-col gap-2">
            {RECENT_SEARCHES.map((entry) => (
              <li key={entry}>
                <button
                  type="button"
                  onClick={() => setSearchQuery(entry)}
                  className="w-full truncate rounded-lg border border-border px-3 py-2 text-left text-xs text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  {entry}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <EngineerFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onChange={updateFilters}
        resultCount={filteredEngineers.length}
      />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 sm:justify-end sm:pr-6"
        >
          <div className="max-w-sm rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-white shadow-lg">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}
