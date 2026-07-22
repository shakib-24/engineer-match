/**
 * Engineer Favorite Jobs module content (Japanese).
 * Real Supabase-backed data (see src/lib/engineer/favorites.ts) against
 * public.favorites, hydrated via src/lib/engineer/opportunities.ts.
 *
 * Fields with no DB backing in the original UI-only mock (location, work
 * style filter beyond what opportunity_employment carries, salary-based
 * sort, application-status filter) have been dropped rather than
 * fabricated.
 */

// ============================================================
// Page header
// ============================================================

export const FAVORITES_PAGE = {
  title: "お気に入り求人・案件",
  description: "保存した求人・案件を一覧で確認できます。",
} as const;

// ============================================================
// Favorite job card
// ============================================================

export const FAVORITE_CARD_LABELS = {
  detailButtonLabel: "詳細を見る",
  removeButtonLabel: "お気に入り解除",
  bookmarkedPrefix: "保存日：",
} as const;

// ============================================================
// Remove confirmation dialog
// ============================================================

export const REMOVE_FAVORITE_DIALOG_LABELS = {
  title: "本当にお気に入りから削除しますか？",
  description: "この操作は取り消せません。",
  cancelLabel: "キャンセル",
  confirmLabel: "削除する",
  errorMessage: "お気に入りの削除に失敗しました。しばらくしてから再度お試しください。",
} as const;

export const REMOVE_FAVORITE_TOAST_MESSAGE = "お気に入りから削除しました。";

// ============================================================
// Loading / error states
// ============================================================

export const LOADING_STATE_LABELS = {
  message: "お気に入りを読み込んでいます…",
} as const;

export const ERROR_STATE_LABELS = {
  title: "お気に入りの読み込みに失敗しました。",
  description: "しばらくしてから再度お試しください。",
  retryLabel: "再読み込み",
} as const;

// ============================================================
// Empty states
// ============================================================

export const FAVORITE_EMPTY_STATE_LABELS = {
  title: "お気に入りに登録された求人・案件はありません。",
  description: "気になる求人・案件を見つけて保存してみましょう。",
  ctaLabel: "求人・案件を探す",
  ctaHref: "/engineer/jobs",
} as const;

// ============================================================
// Results count
// ============================================================

export const FAVORITE_RESULTS_META = {
  resultsSuffix: "件のお気に入り求人・案件",
} as const;

export const SIGN_IN_REQUIRED_LABELS = {
  title: "ログインが必要です。",
  description: "お気に入りの確認にはログインが必要です。",
  ctaLabel: "ログイン",
  ctaHref: "/login",
} as const;
