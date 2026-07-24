/**
 * Notifications module placeholder content (Japanese).
 * UI only — no backend, no real data, no push notifications.
 */

// ============================================================
// Page meta
// ============================================================

export const NOTIFICATIONS_PAGE = {
  title: "通知",
  description: "応募・スカウト・メッセージなどの通知を確認できます。",
} as const;

// ============================================================
// Notification type
// ============================================================

export const NOTIFICATION_TYPES = [
  "応募",
  "スカウト",
  "メッセージ",
  "面接",
  "内定",
  "システム",
] as const;
export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

export const NOTIFICATION_TYPE_STYLES: Record<NotificationType, string> = {
  応募: "bg-blue-50 text-blue-700",
  スカウト: "bg-indigo-50 text-indigo-700",
  メッセージ: "bg-emerald-50 text-emerald-700",
  面接: "bg-amber-50 text-amber-700",
  内定: "bg-green-50 text-green-700",
  システム: "bg-gray-100 text-gray-600",
};

export const NOTIFICATION_TYPE_ICONS: Record<NotificationType, string> = {
  応募: "fileText",
  スカウト: "send",
  メッセージ: "messageSquare",
  面接: "calendarClock",
  内定: "award",
  システム: "info",
};

// ============================================================
// Summary cards
// ============================================================

export const SUMMARY_CARD_LABELS = {
  unread: "未読",
  today: "今日",
  thisWeek: "今週",
  all: "すべて",
} as const;

// ============================================================
// Filters
// ============================================================

export const FILTER_OPTIONS = [
  { value: "all", label: "すべて" },
  { value: "unread", label: "未読のみ" },
  { value: "today", label: "今日" },
  { value: "thisWeek", label: "今週" },
  { value: "応募", label: "応募" },
  { value: "スカウト", label: "スカウト" },
  { value: "メッセージ", label: "メッセージ" },
  { value: "システム", label: "システム" },
] as const;
export type FilterOption = (typeof FILTER_OPTIONS)[number]["value"];

export const NOTIFICATION_ACTIONS_LABELS = {
  markReadLabel: "既読にする",
  markAllReadLabel: "すべて既読にする",
  unreadLabel: "未読",
} as const;

export const EMPTY_STATE_LABELS = {
  title: "通知はありません。",
  description: "条件に一致する通知が見つかりませんでした。",
} as const;

// ============================================================
// Notifications (mock data)
// ============================================================

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  dateLabel: string;
  dateISO: string;
  isRead: boolean;
  link: string;
}

// Company notifications now come from public.notifications (real Supabase
// data) via src/lib/engineer/notifications.ts + src/constants/company-notifications.ts
// -- see /company/notifications. The mock array formerly here (COMPANY_NOTIFICATIONS)
// has been removed; NotificationList/NotificationCard below are now unused by
// any route (kept as-is, not deleted, since they render nothing incorrect --
// simply orphaned).
