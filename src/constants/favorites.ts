/**
 * Engineer Favorite Jobs module placeholder content (Japanese).
 * UI only — no backend, no database, no API.
 *
 * Job mock data is intentionally NOT duplicated here — this module reuses
 * `JOBS` and the shared filter vocabulary (contract type / location / work
 * style / badge styles) from `@/constants/jobs`.
 */

// ============================================================
// Page header
// ============================================================

export const FAVORITES_PAGE = {
  title: "お気に入り求人・案件",
  description: "保存した求人・案件を一覧で確認できます。",
} as const;

// ============================================================
// Summary cards
// ============================================================

export const FAVORITE_SUMMARY_LABELS = {
  saved: { label: "保存済み", helper: "現在お気に入りに登録中" },
  applied: { label: "応募済み", helper: "すでに応募した求人・案件" },
  notApplied: { label: "未応募", helper: "まだ応募していない求人・案件" },
  recentlyAdded: { label: "最近追加", helper: "過去7日間" },
} as const;

// ============================================================
// Search
// ============================================================

export const FAVORITE_SEARCH_LABELS = {
  label: "求人・案件を検索",
  placeholder: "求人・案件を検索",
} as const;

// ============================================================
// Filters / Sort
// ============================================================

export const FAVORITE_FILTER_LABELS = {
  title: "絞り込み条件",
  contractType: "契約形態",
  location: "勤務地",
  workStyle: "勤務形態",
  applicationStatus: "応募状況",
  sortLabel: "並び替え",
  resetLabel: "条件をリセット",
} as const;

export const FAVORITE_APPLICATION_STATUS_OPTIONS = ["応募済み", "未応募"] as const;
export type FavoriteApplicationStatusFilter =
  (typeof FAVORITE_APPLICATION_STATUS_OPTIONS)[number];

export const FAVORITE_SORT_OPTIONS = [
  { value: "newest", label: "最新順" },
  { value: "oldest", label: "古い順" },
  { value: "salary", label: "給与順" },
] as const;
export type FavoriteSortOption = (typeof FAVORITE_SORT_OPTIONS)[number]["value"];

export interface FavoriteFilterState {
  contractTypes: string[];
  locations: string[];
  workStyles: string[];
  applicationStatuses: FavoriteApplicationStatusFilter[];
}

export const DEFAULT_FAVORITE_FILTER_STATE: FavoriteFilterState = {
  contractTypes: [],
  locations: [],
  workStyles: [],
  applicationStatuses: [],
};

// ============================================================
// Favorite job card
// ============================================================

export const FAVORITE_CARD_LABELS = {
  detailButtonLabel: "詳細を見る",
  applyButtonLabel: "応募する",
  appliedButtonLabel: "応募済み",
  removeButtonLabel: "お気に入り解除",
  appliedBadgeLabel: "応募済み",
  bookmarkedPrefix: "保存日：",
  itssRecommendationLabel: "推奨ITSSレベル",
} as const;

// ============================================================
// Remove confirmation dialog
// ============================================================

export const REMOVE_FAVORITE_DIALOG_LABELS = {
  title: "本当にお気に入りから削除しますか？",
  description: "この操作は取り消せません。",
  cancelLabel: "キャンセル",
  confirmLabel: "削除する",
} as const;

export const REMOVE_FAVORITE_TOAST_MESSAGE = "お気に入りから削除しました。";

// ============================================================
// Empty states
// ============================================================

export const FAVORITE_EMPTY_STATE_LABELS = {
  title: "お気に入りに登録された求人・案件はありません。",
  description: "気になる求人・案件を見つけて保存してみましょう。",
  ctaLabel: "求人・案件を探す",
  ctaHref: "/engineer/jobs",
} as const;

export const FAVORITE_FILTERED_EMPTY_STATE_LABELS = {
  title: "条件に一致するお気に入りが見つかりませんでした。",
  description: "検索キーワードや絞り込み条件を変更してお試しください。",
  resetLabel: "条件をリセット",
} as const;

// ============================================================
// Results count
// ============================================================

export const FAVORITE_RESULTS_META = {
  resultsSuffix: "件のお気に入り求人・案件",
} as const;
