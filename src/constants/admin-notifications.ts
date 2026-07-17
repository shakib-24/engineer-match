/**
 * Admin operational notifications placeholder content (Japanese).
 * This is the admin's own operational notification center — distinct from the
 * engineer/company `/notifications` pages and from the `/admin/messages` moderation page.
 * UI only — no backend, no real push notifications.
 */

export const ADMIN_NOTIFICATIONS_PAGE = {
  title: "通知",
  description: "企業審査・求人審査・通報など、対応が必要な運営通知を確認できます。",
} as const;

// ============================================================
// Category
// ============================================================

export const ADMIN_NOTIFICATION_CATEGORIES = [
  "企業審査",
  "求人・案件審査",
  "ユーザー通報",
  "システム警告",
  "セキュリティ",
  "運営連絡",
] as const;
export type AdminNotificationCategory = (typeof ADMIN_NOTIFICATION_CATEGORIES)[number];

export const ADMIN_NOTIFICATION_CATEGORY_STYLES: Record<AdminNotificationCategory, string> = {
  企業審査: "bg-indigo-50 text-indigo-700",
  "求人・案件審査": "bg-blue-50 text-blue-700",
  ユーザー通報: "bg-red-50 text-red-700",
  システム警告: "bg-amber-50 text-amber-700",
  セキュリティ: "bg-rose-50 text-rose-700",
  運営連絡: "bg-gray-100 text-gray-600",
};

export const ADMIN_NOTIFICATION_CATEGORY_ICONS: Record<AdminNotificationCategory, string> = {
  企業審査: "building2",
  "求人・案件審査": "briefcase",
  ユーザー通報: "flag",
  システム警告: "alertTriangle",
  セキュリティ: "shieldAlert",
  運営連絡: "megaphone",
};

// ============================================================
// Summary cards
// ============================================================

export const ADMIN_NOTIFICATION_SUMMARY_LABELS = {
  unread: "未読",
  today: "今日",
  thisWeek: "今週",
  all: "すべて",
} as const;

// ============================================================
// Filters
// ============================================================

export const ADMIN_NOTIFICATION_FILTER_OPTIONS = [
  { value: "all", label: "すべて" },
  { value: "unread", label: "未読のみ" },
  { value: "企業審査", label: "企業審査" },
  { value: "求人・案件審査", label: "求人・案件審査" },
  { value: "ユーザー通報", label: "ユーザー通報" },
  { value: "システム警告", label: "システム警告" },
  { value: "セキュリティ", label: "セキュリティ" },
  { value: "運営連絡", label: "運営連絡" },
] as const;
export type AdminNotificationFilterOption = (typeof ADMIN_NOTIFICATION_FILTER_OPTIONS)[number]["value"];

export const ADMIN_NOTIFICATION_ACTION_LABELS = {
  markReadLabel: "既読にする",
  markAllReadLabel: "すべて既読にする",
  unreadLabel: "未読",
} as const;

export const ADMIN_NOTIFICATION_EMPTY_STATE = {
  title: "通知はありません。",
  description: "条件に一致する通知が見つかりませんでした。",
} as const;

// ============================================================
// Mock data
// ============================================================

export interface AdminNotification {
  id: string;
  category: AdminNotificationCategory;
  title: string;
  description: string;
  dateLabel: string;
  dateISO: string;
  isRead: boolean;
  link: string;
}

export const ADMIN_NOTIFICATIONS: AdminNotification[] = [
  {
    id: "an-01",
    category: "企業審査",
    title: "株式会社ネクストヴィジョンの審査依頼",
    description: "新規企業アカウントの審査が申請されています。",
    dateLabel: "2026年7月16日 10:05",
    dateISO: "2026-07-16T10:05:00",
    isRead: false,
    link: "/admin/companies/c-101",
  },
  {
    id: "an-02",
    category: "企業審査",
    title: "合同会社ブルースパークの審査依頼",
    description: "新規企業アカウントの審査が申請されています。",
    dateLabel: "2026年7月15日 16:40",
    dateISO: "2026-07-15T16:40:00",
    isRead: false,
    link: "/admin/companies/c-102",
  },
  {
    id: "an-03",
    category: "企業審査",
    title: "株式会社フォレストテックの書類確認が必要です",
    description: "提出書類の内容確認が完了していません。",
    dateLabel: "2026年7月14日 11:20",
    dateISO: "2026-07-14T11:20:00",
    isRead: true,
    link: "/admin/companies/c-103",
  },
  {
    id: "an-04",
    category: "求人・案件審査",
    title: "バックエンドエンジニア（Java / Spring Boot）の審査依頼",
    description: "株式会社テックイノベーションより新規求人が申請されています。",
    dateLabel: "2026年7月16日 9:30",
    dateISO: "2026-07-16T09:30:00",
    isRead: false,
    link: "/admin/opportunities/j-201",
  },
  {
    id: "an-05",
    category: "求人・案件審査",
    title: "AIエンジニア（Python / 機械学習）の審査依頼",
    description: "株式会社ニューラルゲートより新規求人が申請されています。",
    dateLabel: "2026年7月15日 13:10",
    dateISO: "2026-07-15T13:10:00",
    isRead: false,
    link: "/admin/opportunities/j-202",
  },
  {
    id: "an-06",
    category: "求人・案件審査",
    title: "セキュリティエンジニア（SOC運用）の内容確認が必要です",
    description: "掲載内容に確認が必要な箇所があります。",
    dateLabel: "2026年7月13日 15:50",
    dateISO: "2026-07-13T15:50:00",
    isRead: true,
    link: "/admin/opportunities/j-203",
  },
  {
    id: "an-07",
    category: "ユーザー通報",
    title: "不適切なプロフィール内容の通報を受け付けました",
    description: "エンジニア 佐藤 健太様のプロフィールに関する通報です。",
    dateLabel: "2026年7月16日 8:15",
    dateISO: "2026-07-16T08:15:00",
    isRead: false,
    link: "/admin/reports/r-301",
  },
  {
    id: "an-08",
    category: "ユーザー通報",
    title: "スパムメッセージの通報を受け付けました",
    description: "株式会社デジタルブリッジに関する通報です。",
    dateLabel: "2026年7月15日 12:45",
    dateISO: "2026-07-15T12:45:00",
    isRead: false,
    link: "/admin/reports/r-302",
  },
  {
    id: "an-09",
    category: "ユーザー通報",
    title: "求人内容の虚偽記載に関する通報を受け付けました",
    description: "掲載内容と実態の相違についての通報です。",
    dateLabel: "2026年7月14日 17:05",
    dateISO: "2026-07-14T17:05:00",
    isRead: true,
    link: "/admin/reports/r-303",
  },
  {
    id: "an-10",
    category: "システム警告",
    title: "Realtime Messagingが一時停止しています",
    description: "メンテナンスのためリアルタイム配信機能が停止中です。",
    dateLabel: "2026年7月16日 22:00",
    dateISO: "2026-07-16T22:00:00",
    isRead: false,
    link: "/admin",
  },
  {
    id: "an-11",
    category: "システム警告",
    title: "Authenticationのレイテンシが増加しています",
    description: "認証基盤の応答時間がやや増加傾向にあります。",
    dateLabel: "2026年7月16日 20:30",
    dateISO: "2026-07-16T20:30:00",
    isRead: true,
    link: "/admin",
  },
  {
    id: "an-12",
    category: "セキュリティ",
    title: "管理者アカウントへの複数回ログイン失敗を検知しました",
    description: "同一IPアドレスから短時間で複数回のログイン失敗がありました。",
    dateLabel: "2026年7月16日 19:10",
    dateISO: "2026-07-16T19:10:00",
    isRead: false,
    link: "/admin/settings",
  },
  {
    id: "an-13",
    category: "セキュリティ",
    title: "株式会社デジタルブリッジのアカウントを利用停止しました",
    description: "スパム通報への対応としてアカウントを停止しました。",
    dateLabel: "2026年7月15日 18:00",
    dateISO: "2026-07-15T18:00:00",
    isRead: true,
    link: "/admin/companies/c-004",
  },
  {
    id: "an-14",
    category: "運営連絡",
    title: "スキルマスタが更新されました",
    description: "「Rust」をスキル一覧に追加しました。",
    dateLabel: "2026年7月16日 18:20",
    dateISO: "2026-07-16T18:20:00",
    isRead: true,
    link: "/admin/master-data",
  },
  {
    id: "an-15",
    category: "運営連絡",
    title: "資格マスタが更新されました",
    description: "「AWS認定ソリューションアーキテクト」を資格一覧に追加しました。",
    dateLabel: "2026年7月15日 19:15",
    dateISO: "2026-07-15T19:15:00",
    isRead: true,
    link: "/admin/master-data",
  },
  {
    id: "an-16",
    category: "運営連絡",
    title: "本日の新規登録が26人を超えました",
    description: "エンジニア・企業の新規登録が好調に推移しています。",
    dateLabel: "2026年7月17日 9:00",
    dateISO: "2026-07-17T09:00:00",
    isRead: false,
    link: "/admin",
  },
  {
    id: "an-17",
    category: "ユーザー通報",
    title: "ハラスメントに関する通報を受け付けました",
    description: "メッセージでのハラスメント行為に関する通報です。",
    dateLabel: "2026年7月12日 10:40",
    dateISO: "2026-07-12T10:40:00",
    isRead: true,
    link: "/admin/reports",
  },
  {
    id: "an-18",
    category: "企業審査",
    title: "株式会社スケールワークスの掲載内容を差し戻しました",
    description: "企業プロフィールの修正を依頼しました。",
    dateLabel: "2026年7月11日 14:25",
    dateISO: "2026-07-11T14:25:00",
    isRead: true,
    link: "/admin/companies/c-006",
  },
];
