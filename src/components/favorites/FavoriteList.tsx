"use client";

import { useMemo, useState } from "react";
import { FavoriteSearch } from "@/components/favorites/FavoriteSearch";
import { FavoriteFilters } from "@/components/favorites/FavoriteFilters";
import { FavoriteJobCard } from "@/components/favorites/FavoriteJobCard";
import { FavoriteSummaryCards } from "@/components/favorites/FavoriteSummaryCards";
import { FavoriteEmptyState } from "@/components/favorites/FavoriteEmptyState";
import { RemoveFavoriteDialog } from "@/components/favorites/RemoveFavoriteDialog";
import {
  DEFAULT_FAVORITE_FILTER_STATE,
  FAVORITE_RESULTS_META,
  REMOVE_FAVORITE_TOAST_MESSAGE,
  type FavoriteFilterState,
  type FavoriteSortOption,
} from "@/constants/favorites";
import type { Job } from "@/constants/jobs";
import {
  markFavoriteJobApplied,
  removeFavoriteJob,
  useFavoriteJobs,
} from "@/lib/favorite-jobs-store";

interface FavoriteListProps {
  jobs: Job[];
}

const RECENTLY_ADDED_WINDOW_DAYS = 7;

function isWithinRecentWindow(iso: string): boolean {
  const addedAt = new Date(iso).getTime();
  const now = Date.now();
  const windowMs = RECENTLY_ADDED_WINDOW_DAYS * 24 * 60 * 60 * 1000;
  return now - addedAt <= windowMs;
}

export function FavoriteList({ jobs }: FavoriteListProps) {
  const favorites = useFavoriteJobs();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FavoriteFilterState>(
    DEFAULT_FAVORITE_FILTER_STATE,
  );
  const [sortOption, setSortOption] = useState<FavoriteSortOption>("newest");
  const [removeTargetId, setRemoveTargetId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function handleFilterChange(patch: Partial<FavoriteFilterState>) {
    setFilters((prev) => ({ ...prev, ...patch }));
  }

  function handleResetAll() {
    setSearchQuery("");
    setFilters(DEFAULT_FAVORITE_FILTER_STATE);
    setSortOption("newest");
  }

  function handleApply(jobId: string) {
    markFavoriteJobApplied(jobId);
  }

  function handleRequestRemove(jobId: string) {
    setRemoveTargetId(jobId);
  }

  function handleCancelRemove() {
    setRemoveTargetId(null);
  }

  function handleConfirmRemove() {
    if (removeTargetId) {
      removeFavoriteJob(removeTargetId);
    }
    setRemoveTargetId(null);
    setToastMessage(REMOVE_FAVORITE_TOAST_MESSAGE);
    window.setTimeout(() => setToastMessage(null), 3000);
  }

  const favoriteEntries = useMemo(() => {
    return jobs
      .filter((job) => Boolean(favorites[job.id]))
      .map((job) => ({
        job,
        addedAtISO: favorites[job.id].addedAtISO,
        hasApplied: favorites[job.id].hasApplied,
      }));
  }, [jobs, favorites]);

  const savedCount = favoriteEntries.length;
  const appliedCount = favoriteEntries.filter((entry) => entry.hasApplied).length;
  const notAppliedCount = savedCount - appliedCount;
  const recentlyAddedCount = favoriteEntries.filter((entry) =>
    isWithinRecentWindow(entry.addedAtISO),
  ).length;

  const filteredEntries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return favoriteEntries.filter(({ job, hasApplied }) => {
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
      if (filters.applicationStatuses.length > 0) {
        const statusLabel = hasApplied ? "応募済み" : "未応募";
        if (!filters.applicationStatuses.includes(statusLabel)) return false;
      }
      return true;
    });
  }, [favoriteEntries, searchQuery, filters]);

  const sortedEntries = useMemo(() => {
    const list = [...filteredEntries];
    switch (sortOption) {
      case "oldest":
        list.sort((a, b) => a.addedAtISO.localeCompare(b.addedAtISO));
        break;
      case "salary":
        list.sort((a, b) => b.job.salaryMaxManYen - a.job.salaryMaxManYen);
        break;
      case "newest":
      default:
        list.sort((a, b) => b.addedAtISO.localeCompare(a.addedAtISO));
        break;
    }
    return list;
  }, [filteredEntries, sortOption]);

  return (
    <div className="flex flex-col gap-6">
      <FavoriteSummaryCards
        savedCount={savedCount}
        appliedCount={appliedCount}
        notAppliedCount={notAppliedCount}
        recentlyAddedCount={recentlyAddedCount}
      />

      {savedCount === 0 ? (
        <FavoriteEmptyState variant="no-favorites" />
      ) : (
        <>
          <FavoriteSearch value={searchQuery} onChange={setSearchQuery} />

          <FavoriteFilters
            filters={filters}
            onChange={handleFilterChange}
            sortOption={sortOption}
            onSortChange={setSortOption}
          />

          <p className="text-sm text-muted-foreground">
            {sortedEntries.length}
            {FAVORITE_RESULTS_META.resultsSuffix}
          </p>

          {sortedEntries.length === 0 ? (
            <FavoriteEmptyState variant="no-results" onReset={handleResetAll} />
          ) : (
            <ul className="flex flex-col gap-4">
              {sortedEntries.map(({ job, addedAtISO, hasApplied }) => (
                <li key={job.id}>
                  <FavoriteJobCard
                    job={job}
                    addedAtISO={addedAtISO}
                    hasApplied={hasApplied}
                    onApply={handleApply}
                    onRequestRemove={handleRequestRemove}
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <RemoveFavoriteDialog
        isOpen={removeTargetId !== null}
        onCancel={handleCancelRemove}
        onConfirm={handleConfirmRemove}
      />

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
