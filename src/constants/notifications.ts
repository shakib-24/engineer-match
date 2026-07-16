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

export const NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "スカウト",
    title: "株式会社テックイノベーションからスカウトが届きました",
    description: "バックエンドエンジニア（Java / Spring Boot）のポジションについてご案内です。",
    dateLabel: "2026年7月16日 14:32",
    dateISO: "2026-07-16T14:32:00",
    isRead: false,
    link: "/messages/1",
  },
  {
    id: "2",
    type: "メッセージ",
    title: "合同会社クラウドフォースから新着メッセージ",
    description: "一次面接の日程についてご案内します。",
    dateLabel: "2026年7月16日 11:15",
    dateISO: "2026-07-16T11:15:00",
    isRead: false,
    link: "/messages/2",
  },
  {
    id: "3",
    type: "スカウト",
    title: "株式会社ゼロトラストからスカウトが届きました",
    description: "Go言語でのご経験を拝見し、ぜひご紹介したい案件がございます。",
    dateLabel: "2026年7月16日 8:45",
    dateISO: "2026-07-16T08:45:00",
    isRead: false,
    link: "/messages/9",
  },
  {
    id: "4",
    type: "内定",
    title: "株式会社ネクストシステムズより内定通知",
    description: "インフラエンジニア（AWS / Kubernetes）ポジションの内定通知書が届いています。",
    dateLabel: "2026年7月15日 16:45",
    dateISO: "2026-07-15T16:45:00",
    isRead: false,
    link: "/messages/3",
  },
  {
    id: "5",
    type: "スカウト",
    title: "株式会社データポートからスカウトが届きました",
    description: "貴殿の経験がまさに弊社の求める人物像です。",
    dateLabel: "2026年7月15日 9:30",
    dateISO: "2026-07-15T09:30:00",
    isRead: true,
    link: "/messages/6",
  },
  {
    id: "6",
    type: "応募",
    title: "応募が受理されました",
    description: "「AIエンジニア（Python / 機械学習）」への応募が正常に送信されました。",
    dateLabel: "2026年7月14日 18:00",
    dateISO: "2026-07-14T18:00:00",
    isRead: true,
    link: "/engineer/applications",
  },
  {
    id: "7",
    type: "面接",
    title: "株式会社スケールワークスとの最終面接日程確定",
    description: "7月25日（土）10:00〜11:00 弊社オフィスにて実施予定です。",
    dateLabel: "2026年7月14日 17:00",
    dateISO: "2026-07-14T17:00:00",
    isRead: true,
    link: "/messages/7",
  },
  {
    id: "8",
    type: "システム",
    title: "プロフィール充実度が80%を超えました",
    description: "引き続き職務経歴やポートフォリオの追加をおすすめします。",
    dateLabel: "2026年7月13日 9:00",
    dateISO: "2026-07-13T09:00:00",
    isRead: true,
    link: "/engineer/profile",
  },
  {
    id: "9",
    type: "メッセージ",
    title: "株式会社パイプラインワークスから新着メッセージ",
    description: "一次面接のご都合はいかがでしょうか。",
    dateLabel: "2026年7月13日 11:30",
    dateISO: "2026-07-13T11:30:00",
    isRead: false,
    link: "/messages/11",
  },
  {
    id: "10",
    type: "システム",
    title: "選考結果：不採用",
    description: "「セキュリティエンジニア（SOC運用）」の選考結果が届いています。",
    dateLabel: "2026年7月12日 9:40",
    dateISO: "2026-07-12T09:40:00",
    isRead: false,
    link: "/messages/14",
  },
  {
    id: "11",
    type: "応募",
    title: "書類選考を通過しました",
    description: "「DevOpsエンジニア（Kubernetes / CI-CD）」の書類選考を通過しました。",
    dateLabel: "2026年7月13日 11:00",
    dateISO: "2026-07-13T11:00:00",
    isRead: true,
    link: "/messages/11",
  },
  {
    id: "12",
    type: "内定",
    title: "株式会社ニューラルゲートより内定通知",
    description: "AIエンジニア（LLM／生成AI）ポジションの内定をいただきました。",
    dateLabel: "2026年7月10日 10:00",
    dateISO: "2026-07-10T10:00:00",
    isRead: true,
    link: "/messages/13",
  },
  {
    id: "13",
    type: "システム",
    title: "選考結果：不採用",
    description: "「クラウドエンジニア（AWS）」の選考結果が届いています。",
    dateLabel: "2026年7月6日 14:00",
    dateISO: "2026-07-06T14:00:00",
    isRead: false,
    link: "/messages/10",
  },
  {
    id: "14",
    type: "メッセージ",
    title: "株式会社グロースパートナーズからスカウトが届きました",
    description: "地域密着型のプロダクト開発にご興味はございませんか。",
    dateLabel: "2026年7月7日 13:10",
    dateISO: "2026-07-07T13:10:00",
    isRead: true,
    link: "/messages/15",
  },
  {
    id: "15",
    type: "システム",
    title: "ITSSレベル診断が更新されました",
    description: "最新のスキル情報をもとにITSSレベルが再計算されました。",
    dateLabel: "2026年7月4日 12:00",
    dateISO: "2026-07-04T12:00:00",
    isRead: true,
    link: "/engineer/profile",
  },
  {
    id: "16",
    type: "応募",
    title: "書類選考を通過しました",
    description: "「フロントエンドエンジニア（React / TypeScript）」の書類選考を通過しました。",
    dateLabel: "2026年7月10日 9:00",
    dateISO: "2026-07-10T09:00:00",
    isRead: true,
    link: "/messages/2",
  },
  {
    id: "17",
    type: "面接",
    title: "合同会社クラウドフォースとの一次面接日程確定",
    description: "7月22日（水）15:00〜16:00 オンライン面談（Google Meet）",
    dateLabel: "2026年7月16日 11:15",
    dateISO: "2026-07-16T11:15:00",
    isRead: false,
    link: "/messages/2",
  },
  {
    id: "18",
    type: "システム",
    title: "ご利用ありがとうございます",
    description: "ENGINEER MATCHへのご登録ありがとうございます。プロフィールを充実させましょう。",
    dateLabel: "2026年6月28日 10:00",
    dateISO: "2026-06-28T10:00:00",
    isRead: true,
    link: "/engineer/profile",
  },
];
