/**
 * Shared client-side favorite-jobs store.
 *
 * UI-only demo state — no backend, no database, no persistence beyond the
 * current browser session. Implemented as a plain module-level store (no
 * new dependencies) so favorite state survives client-side navigation
 * between Job Search, Job Detail, and the Favorites page.
 */

import { useSyncExternalStore } from "react";
import { DEFAULT_BOOKMARKED_JOB_IDS } from "@/constants/jobs";

export interface FavoriteJobEntry {
  addedAtISO: string;
  hasApplied: boolean;
}

type FavoriteJobMap = Readonly<Record<string, FavoriteJobEntry>>;

const SEED_ENTRIES: Record<string, FavoriteJobEntry> = {
  "3": { addedAtISO: "2026-07-10T09:00:00", hasApplied: true },
  "9": { addedAtISO: "2026-07-14T18:20:00", hasApplied: false },
};

let state: FavoriteJobMap = Object.fromEntries(
  DEFAULT_BOOKMARKED_JOB_IDS.map((id) => [
    id,
    SEED_ENTRIES[id] ?? { addedAtISO: new Date().toISOString(), hasApplied: false },
  ]),
);

const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): FavoriteJobMap {
  return state;
}

export function addFavoriteJob(jobId: string) {
  if (state[jobId]) return;
  state = { ...state, [jobId]: { addedAtISO: new Date().toISOString(), hasApplied: false } };
  emitChange();
}

export function removeFavoriteJob(jobId: string) {
  if (!state[jobId]) return;
  const next = { ...state };
  delete next[jobId];
  state = next;
  emitChange();
}

export function toggleFavoriteJob(jobId: string) {
  if (state[jobId]) {
    removeFavoriteJob(jobId);
  } else {
    addFavoriteJob(jobId);
  }
}

export function markFavoriteJobApplied(jobId: string) {
  const entry = state[jobId];
  if (!entry || entry.hasApplied) return;
  state = { ...state, [jobId]: { ...entry, hasApplied: true } };
  emitChange();
}

export function useFavoriteJobs(): FavoriteJobMap {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function useIsFavoriteJob(jobId: string): boolean {
  const favorites = useFavoriteJobs();
  return Boolean(favorites[jobId]);
}

const bookmarkedDateFormatter = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatBookmarkedDate(iso: string): string {
  return bookmarkedDateFormatter.format(new Date(iso));
}
