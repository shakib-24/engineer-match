/**
 * Admin Messages moderation module placeholder content (Japanese).
 * UI only — no backend, no database.
 *
 * This is NOT the user chat page — it is a moderation / support-monitoring
 * view. It reuses the shared conversation + message mock data from
 * `@/constants/messages` (CONVERSATIONS) and layers admin-only moderation
 * metadata on top, joined by `conversationId` at render time.
 */

import type { AdminNoteEntry } from "@/components/admin/shared/AdminInternalNote";

export const ADMIN_MESSAGES_PAGE = {
  title: "メッセージ管理",
  description: "プラットフォーム全体の会話を確認し、通報対応や安全管理を行えます。",
  moderationNote:
    "管理者によるメッセージ確認は、通報対応や安全管理を目的としたデモ表示です。",
} as const;

// ============================================================
// Enums / types
// ============================================================

export const ADMIN_MESSAGE_HANDLING_STATUSES = ["未対応", "要確認", "対応済み"] as const;
export type AdminMessageHandlingStatus = (typeof ADMIN_MESSAGE_HANDLING_STATUSES)[number];

export const ADMIN_MESSAGE_HANDLING_STATUS_TONE: Record<
  AdminMessageHandlingStatus,
  "negative" | "warning" | "positive"
> = {
  未対応: "negative",
  要確認: "warning",
  対応済み: "positive",
};

export const ADMIN_MESSAGE_REPORT_OPTIONS = ["あり", "なし"] as const;

// ============================================================
// Summary cards
// ============================================================

export const ADMIN_MESSAGE_SUMMARY_LABELS = {
  total: "全会話",
  newToday: "本日の新規",
  unhandledReports: "未対応報告",
  needsReview: "要確認",
  handled: "対応済み",
} as const;

// ============================================================
// Search / filters
// ============================================================

export const ADMIN_MESSAGE_SEARCH_LABELS = {
  label: "会話を検索",
  placeholder: "参加者名・企業名・会話ID・キーワードで検索",
} as const;

export const ADMIN_MESSAGE_FILTER_LABELS = {
  title: "絞り込み条件",
  reportStatus: "報告状態",
  handlingStatus: "対応状態",
  conversationType: "会話種別",
  updatedWithin: "更新日",
  resetLabel: "条件をリセット",
} as const;

export const ADMIN_MESSAGE_DATE_RANGE_OPTIONS = [
  { label: "指定なし", days: null },
  { label: "7日以内", days: 7 },
  { label: "30日以内", days: 30 },
  { label: "90日以内", days: 90 },
] as const;

export interface AdminMessageFilterState {
  reportStatuses: (typeof ADMIN_MESSAGE_REPORT_OPTIONS)[number][];
  handlingStatuses: AdminMessageHandlingStatus[];
  conversationTypes: string[];
  updatedWithinDays: number | null;
}

export const DEFAULT_ADMIN_MESSAGE_FILTER_STATE: AdminMessageFilterState = {
  reportStatuses: [],
  handlingStatuses: [],
  conversationTypes: [],
  updatedWithinDays: null,
};

// ============================================================
// List / actions
// ============================================================

export const ADMIN_MESSAGE_ACTION_LABELS = {
  viewDetails: "詳細を見る",
  markNeedsReview: "要確認にする",
  markHandled: "対応済みにする",
  recordWarning: "警告を記録",
  openAccount: "アカウント詳細を開く",
  restrictConversation: "会話を制限する",
  unrestrictConversation: "制限を解除する",
} as const;

export const ADMIN_MESSAGE_RESULTS_META = {
  resultsSuffix: "件の会話",
} as const;

export const ADMIN_MESSAGE_TOAST_MESSAGES = {
  needsReview: "要確認にしました。",
  handled: "対応済みにしました。",
  warningRecorded: "警告を記録しました。",
  restricted: "会話を制限しました。",
  unrestricted: "会話の制限を解除しました。",
  noteAdded: "内部メモを追加しました。",
} as const;

export const ADMIN_MESSAGE_DEMO_NOTE =
  "※ UIデモのため、実際のモデレーション操作は行われません。";

// ============================================================
// Detail page section labels
// ============================================================

export const ADMIN_MESSAGE_DETAIL_SECTIONS = {
  transcript: "会話履歴",
  participants: "参加者",
  relatedOpportunity: "関連求人・案件",
  moderationHistory: "モデレーション履歴",
  internalNotes: "内部メモ",
} as const;

export const ADMIN_MESSAGE_NOT_FOUND = {
  title: "会話が見つかりませんでした。",
  description: "指定された会話IDは存在しないか、削除された可能性があります。",
  ctaLabel: "メッセージ管理に戻る",
  ctaHref: "/admin/messages",
} as const;

// ============================================================
// Mock data (moderation metadata, joined with CONVERSATIONS by id)
// ============================================================

export interface AdminMessageModerationHistoryEntry {
  id: string;
  action: string;
  actor: string;
  dateLabel: string;
}

export interface AdminMessageModeration {
  conversationId: string;
  reportCount: number;
  handlingStatus: AdminMessageHandlingStatus;
  reportedMessageIds: string[];
  moderationHistory: AdminMessageModerationHistoryEntry[];
  internalNotes: AdminNoteEntry[];
  restricted: boolean;
}

export const ADMIN_MESSAGE_MODERATIONS: AdminMessageModeration[] = [
  { conversationId: "1", reportCount: 0, handlingStatus: "対応済み", reportedMessageIds: [], moderationHistory: [], internalNotes: [], restricted: false },
  { conversationId: "2", reportCount: 0, handlingStatus: "対応済み", reportedMessageIds: [], moderationHistory: [], internalNotes: [], restricted: false },
  {
    conversationId: "3",
    reportCount: 1,
    handlingStatus: "要確認",
    reportedMessageIds: ["3-2"],
    moderationHistory: [
      { id: "mh-1", action: "通報を受理", actor: "システム", dateLabel: "2026年7月16日" },
    ],
    internalNotes: [
      {
        id: "note-1",
        author: "管理者 伊藤",
        body: "求人内容の虚偽記載に関する通報あり。メッセージ内容を確認中。",
        dateLabel: "2026年7月16日",
      },
    ],
    restricted: false,
  },
  { conversationId: "4", reportCount: 0, handlingStatus: "対応済み", reportedMessageIds: [], moderationHistory: [], internalNotes: [], restricted: false },
  {
    conversationId: "5",
    reportCount: 2,
    handlingStatus: "未対応",
    reportedMessageIds: ["5-2", "5-3"],
    moderationHistory: [
      { id: "mh-2", action: "通報を受理", actor: "システム", dateLabel: "2026年7月15日" },
    ],
    internalNotes: [],
    restricted: false,
  },
  { conversationId: "6", reportCount: 0, handlingStatus: "対応済み", reportedMessageIds: [], moderationHistory: [], internalNotes: [], restricted: false },
  { conversationId: "7", reportCount: 0, handlingStatus: "対応済み", reportedMessageIds: [], moderationHistory: [], internalNotes: [], restricted: false },
  { conversationId: "8", reportCount: 0, handlingStatus: "対応済み", reportedMessageIds: [], moderationHistory: [], internalNotes: [], restricted: false },
  {
    conversationId: "9",
    reportCount: 1,
    handlingStatus: "未対応",
    reportedMessageIds: ["9-2"],
    moderationHistory: [
      { id: "mh-3", action: "通報を受理", actor: "システム", dateLabel: "2026年7月15日" },
    ],
    internalNotes: [],
    restricted: false,
  },
  { conversationId: "10", reportCount: 0, handlingStatus: "対応済み", reportedMessageIds: [], moderationHistory: [], internalNotes: [], restricted: false },
  { conversationId: "11", reportCount: 0, handlingStatus: "対応済み", reportedMessageIds: [], moderationHistory: [], internalNotes: [], restricted: false },
  { conversationId: "12", reportCount: 0, handlingStatus: "対応済み", reportedMessageIds: [], moderationHistory: [], internalNotes: [], restricted: false },
  {
    conversationId: "13",
    reportCount: 1,
    handlingStatus: "対応済み",
    reportedMessageIds: ["13-2"],
    moderationHistory: [
      { id: "mh-4", action: "通報を受理", actor: "システム", dateLabel: "2026年7月10日" },
      {
        id: "mh-5",
        action: "警告を記録",
        actor: "管理者 松本",
        dateLabel: "2026年7月11日",
      },
      { id: "mh-6", action: "対応済みにする", actor: "管理者 松本", dateLabel: "2026年7月11日" },
    ],
    internalNotes: [
      {
        id: "note-2",
        author: "管理者 松本",
        body: "不適切な表現があったため、当該ユーザーに警告を記録済み。",
        dateLabel: "2026年7月11日",
      },
    ],
    restricted: false,
  },
  { conversationId: "14", reportCount: 0, handlingStatus: "対応済み", reportedMessageIds: [], moderationHistory: [], internalNotes: [], restricted: false },
  { conversationId: "15", reportCount: 0, handlingStatus: "対応済み", reportedMessageIds: [], moderationHistory: [], internalNotes: [], restricted: false },
];
