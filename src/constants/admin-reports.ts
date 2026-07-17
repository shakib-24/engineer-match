/**
 * Admin Reports (通報管理) module placeholder content (Japanese).
 * UI only — no backend, no database, no real enforcement actions.
 */

import type { AdminNoteEntry } from "@/components/admin/shared/AdminInternalNote";

export const ADMIN_REPORTS_PAGE = {
  title: "通報管理",
  description: "ユーザーからの通報とプラットフォーム違反を管理できます。",
} as const;

// ============================================================
// Enums / types
// ============================================================

export const ADMIN_REPORT_CATEGORIES = [
  "不適切な求人・案件",
  "スパム",
  "虚偽情報",
  "ハラスメント",
  "不適切なメッセージ",
  "なりすまし",
  "その他",
] as const;
export type AdminReportCategory = (typeof ADMIN_REPORT_CATEGORIES)[number];

export const ADMIN_REPORT_PRIORITIES = ["緊急", "高", "中", "低"] as const;
export type AdminReportPriority = (typeof ADMIN_REPORT_PRIORITIES)[number];

export const ADMIN_REPORT_STATUSES = ["未対応", "対応中", "解決済み", "却下"] as const;
export type AdminReportStatus = (typeof ADMIN_REPORT_STATUSES)[number];

export const ADMIN_REPORT_TARGET_TYPES = ["ユーザー", "企業", "求人・案件", "メッセージ"] as const;
export type AdminReportTargetType = (typeof ADMIN_REPORT_TARGET_TYPES)[number];

export const ADMIN_REPORT_PRIORITY_TONE: Record<
  AdminReportPriority,
  "negative" | "warning" | "info" | "neutral"
> = {
  緊急: "negative",
  高: "warning",
  中: "info",
  低: "neutral",
};

export const ADMIN_REPORT_STATUS_TONE: Record<
  AdminReportStatus,
  "negative" | "warning" | "positive" | "neutral"
> = {
  未対応: "negative",
  対応中: "warning",
  解決済み: "positive",
  却下: "neutral",
};

// ============================================================
// Summary cards
// ============================================================

export const ADMIN_REPORT_SUMMARY_LABELS = {
  total: "全通報",
  unhandled: "未対応",
  inProgress: "対応中",
  resolved: "解決済み",
  urgent: "緊急",
  thisMonth: "今月の通報",
} as const;

// ============================================================
// Search / filters
// ============================================================

export const ADMIN_REPORT_SEARCH_LABELS = {
  label: "通報を検索",
  placeholder: "通報者・対象・通報IDで検索",
} as const;

export const ADMIN_REPORT_FILTER_LABELS = {
  title: "絞り込み条件",
  category: "通報カテゴリ",
  priority: "優先度",
  status: "対応状態",
  targetType: "対象種別",
  reportedWithin: "通報日",
  resetLabel: "条件をリセット",
} as const;

export const ADMIN_REPORT_DATE_RANGE_OPTIONS = [
  { label: "指定なし", days: null },
  { label: "7日以内", days: 7 },
  { label: "30日以内", days: 30 },
  { label: "90日以内", days: 90 },
] as const;

export interface AdminReportFilterState {
  categories: AdminReportCategory[];
  priorities: AdminReportPriority[];
  statuses: AdminReportStatus[];
  targetTypes: AdminReportTargetType[];
  reportedWithinDays: number | null;
}

export const DEFAULT_ADMIN_REPORT_FILTER_STATE: AdminReportFilterState = {
  categories: [],
  priorities: [],
  statuses: [],
  targetTypes: [],
  reportedWithinDays: null,
};

// ============================================================
// Table / actions
// ============================================================

export const ADMIN_REPORT_TABLE_COLUMNS = [
  "通報ID",
  "通報者",
  "対象",
  "カテゴリ",
  "優先度",
  "状態",
  "通報日",
  "担当者",
] as const;

export const ADMIN_REPORT_ACTION_LABELS = {
  viewDetails: "詳細を見る",
  startHandling: "対応開始",
  warn: "警告",
  unpublishContent: "コンテンツ非公開",
  suspendAccount: "アカウント停止",
  dismiss: "却下",
  resolve: "解決済み",
} as const;

export const ADMIN_REPORT_RESULTS_META = {
  resultsSuffix: "件の通報",
} as const;

// ============================================================
// Action dialogs
// ============================================================

export const ADMIN_REPORT_ACTION_DIALOG_LABELS = {
  startHandlingTitle: "この通報の対応を開始しますか？",
  startHandlingDescription: "対応中ステータスに変更し、担当者として自分を割り当てます。",
  startHandlingConfirmLabel: "対応を開始する",
  warnTitle: "対象に警告を記録しますか？",
  warnDescription: "警告理由を入力してください。対象ユーザー・企業の記録に残ります。",
  warnConfirmLabel: "警告を記録する",
  unpublishTitle: "対象コンテンツを非公開にしますか？",
  unpublishDescription: "非公開理由を入力してください。",
  unpublishConfirmLabel: "非公開にする",
  suspendTitle: "対象アカウントを停止しますか？",
  suspendDescription: "停止理由を入力してください。この操作は重大な措置です。",
  suspendConfirmLabel: "アカウントを停止する",
  dismissTitle: "この通報を却下しますか？",
  dismissDescription: "却下理由を入力してください。",
  dismissConfirmLabel: "却下する",
  resolveTitle: "この通報を解決済みにしますか？",
  resolveDescription: "対応内容の要約を入力してください。",
  resolveConfirmLabel: "解決済みにする",
  reasonLabel: "理由",
  reasonPlaceholder: "対応理由を入力してください",
  cancelLabel: "キャンセル",
} as const;

export const ADMIN_REPORT_TOAST_MESSAGES = {
  startHandling: "対応を開始しました。",
  warn: "警告を記録しました。",
  unpublish: "コンテンツを非公開にしました。",
  suspend: "アカウントを停止しました。",
  dismiss: "通報を却下しました。",
  resolve: "通報を解決済みにしました。",
} as const;

export const ADMIN_REPORT_DEMO_NOTE = "※ UIデモのため、実際の措置・通知は行われません。";

// ============================================================
// Detail page section labels
// ============================================================

export const ADMIN_REPORT_DETAIL_SECTIONS = {
  content: "通報内容",
  reporter: "通報者",
  target: "対象ユーザーまたは企業",
  relatedOpportunity: "関連求人・案件",
  relatedMessage: "関連メッセージ",
  evidence: "証拠・添付",
  responseHistory: "対応履歴",
  internalNotes: "内部メモ",
} as const;

export const ADMIN_REPORT_NOT_FOUND = {
  title: "通報が見つかりませんでした。",
  description: "指定された通報IDは存在しないか、削除された可能性があります。",
  ctaLabel: "通報一覧に戻る",
  ctaHref: "/admin/reports",
} as const;

// ============================================================
// Mock data
// ============================================================

export interface AdminReportHistoryEntry {
  id: string;
  action: string;
  actor: string;
  reason: string | null;
  dateLabel: string;
}

export interface AdminReport {
  id: string;
  category: AdminReportCategory;
  priority: AdminReportPriority;
  status: AdminReportStatus;
  targetType: AdminReportTargetType;
  targetLabel: string;
  targetHref: string | null;
  reporterName: string;
  reporterId: string | null;
  assignee: string | null;
  reportedDateLabel: string;
  reportedDateISO: string;
  description: string;
  relatedOpportunityTitle: string | null;
  relatedOpportunityHref: string | null;
  relatedMessageHref: string | null;
  evidence: string[];
  responseHistory: AdminReportHistoryEntry[];
  internalNotes: AdminNoteEntry[];
}

export const ADMIN_REPORTS: AdminReport[] = [
  {
    id: "r-301",
    category: "その他",
    priority: "中",
    status: "未対応",
    targetType: "ユーザー",
    targetLabel: "田中 慎一",
    targetHref: "/admin/users/u-007",
    reporterName: "佐藤 健太",
    reporterId: "u-002",
    assignee: null,
    reportedDateLabel: "2026年7月16日",
    reportedDateISO: "2026-07-16",
    description: "プロフィールの自己紹介文に不適切な表現が含まれているとの通報。",
    relatedOpportunityTitle: null,
    relatedOpportunityHref: null,
    relatedMessageHref: null,
    evidence: ["プロフィールスクリーンショット.png"],
    responseHistory: [
      { id: "rh-1", action: "通報を受理", actor: "システム", reason: null, dateLabel: "2026年7月16日 8:30" },
    ],
    internalNotes: [
      {
        id: "note-1",
        author: "管理者 佐々木",
        body: "プロフィール内容について通報あり。内容確認中。",
        dateLabel: "2026年7月17日",
      },
    ],
  },
  {
    id: "r-302",
    category: "スパム",
    priority: "高",
    status: "未対応",
    targetType: "企業",
    targetLabel: "株式会社デジタルブリッジ",
    targetHref: "/admin/companies/c-004",
    reporterName: "高橋 大輔",
    reporterId: "u-004",
    assignee: null,
    reportedDateLabel: "2026年7月15日",
    reportedDateISO: "2026-07-15",
    description: "同一企業から大量の営業目的メッセージを繰り返し受信しているとの通報。",
    relatedOpportunityTitle: null,
    relatedOpportunityHref: null,
    relatedMessageHref: null,
    evidence: ["メッセージ履歴スクリーンショット.png"],
    responseHistory: [
      { id: "rh-2", action: "通報を受理", actor: "システム", reason: null, dateLabel: "2026年7月15日 14:50" },
    ],
    internalNotes: [],
  },
  {
    id: "r-303",
    category: "虚偽情報",
    priority: "高",
    status: "対応中",
    targetType: "求人・案件",
    targetLabel: "バックエンドエンジニア（Java / Spring Boot）",
    targetHref: "/admin/opportunities/3",
    reporterName: "鈴木 美咲",
    reporterId: "u-003",
    assignee: "管理者 佐々木",
    reportedDateLabel: "2026年7月14日",
    reportedDateISO: "2026-07-14",
    description: "掲載されている勤務条件が実際の面談内容と大きく異なっているとの通報。",
    relatedOpportunityTitle: "バックエンドエンジニア（Java / Spring Boot）",
    relatedOpportunityHref: "/admin/opportunities/3",
    relatedMessageHref: null,
    evidence: ["面談メモ.pdf"],
    responseHistory: [
      { id: "rh-3", action: "通報を受理", actor: "システム", reason: null, dateLabel: "2026年7月14日 9:00" },
      {
        id: "rh-4",
        action: "対応開始",
        actor: "管理者 佐々木",
        reason: null,
        dateLabel: "2026年7月16日 10:00",
      },
    ],
    internalNotes: [
      {
        id: "note-2",
        author: "管理者 佐々木",
        body: "企業側に掲載内容の見直しを依頼済み。回答待ち。",
        dateLabel: "2026年7月16日",
      },
    ],
  },
  {
    id: "r-304",
    category: "ハラスメント",
    priority: "緊急",
    status: "対応中",
    targetType: "メッセージ",
    targetLabel: "森田 亜由美とのメッセージ",
    targetHref: "/admin/messages/5",
    reporterName: "エンジニア利用者",
    reporterId: null,
    assignee: "管理者 伊藤",
    reportedDateLabel: "2026年7月15日",
    reportedDateISO: "2026-07-15",
    description: "メッセージ内で威圧的・不適切な発言を複数回受けたとの通報。",
    relatedOpportunityTitle: null,
    relatedOpportunityHref: null,
    relatedMessageHref: "/admin/messages/5",
    evidence: ["該当メッセージのスクリーンショット.png"],
    responseHistory: [
      { id: "rh-5", action: "通報を受理", actor: "システム", reason: null, dateLabel: "2026年7月15日 20:00" },
      {
        id: "rh-6",
        action: "対応開始",
        actor: "管理者 伊藤",
        reason: null,
        dateLabel: "2026年7月16日 9:00",
      },
    ],
    internalNotes: [],
  },
  {
    id: "r-305",
    category: "不適切なメッセージ",
    priority: "中",
    status: "解決済み",
    targetType: "メッセージ",
    targetLabel: "村上 健二とのメッセージ",
    targetHref: "/admin/messages/13",
    reporterName: "エンジニア利用者",
    reporterId: null,
    assignee: "管理者 松本",
    reportedDateLabel: "2026年7月10日",
    reportedDateISO: "2026-07-10",
    description: "不適切な表現を含むメッセージが送信されたとの通報。",
    relatedOpportunityTitle: null,
    relatedOpportunityHref: null,
    relatedMessageHref: "/admin/messages/13",
    evidence: [],
    responseHistory: [
      { id: "rh-7", action: "通報を受理", actor: "システム", reason: null, dateLabel: "2026年7月10日 12:00" },
      {
        id: "rh-8",
        action: "警告",
        actor: "管理者 松本",
        reason: "不適切な表現の使用について警告。",
        dateLabel: "2026年7月11日",
      },
      {
        id: "rh-9",
        action: "解決済み",
        actor: "管理者 松本",
        reason: "当該ユーザーへ警告済み。再発防止を確認。",
        dateLabel: "2026年7月11日",
      },
    ],
    internalNotes: [],
  },
  {
    id: "r-306",
    category: "なりすまし",
    priority: "高",
    status: "未対応",
    targetType: "ユーザー",
    targetLabel: "不明ユーザー（未登録）",
    targetHref: null,
    reporterName: "株式会社テックイノベーション",
    reporterId: null,
    assignee: null,
    reportedDateLabel: "2026年7月17日",
    reportedDateISO: "2026-07-17",
    description: "自社の採用担当者を名乗る不審なアカウントからスカウトが送信されているとの通報。",
    relatedOpportunityTitle: null,
    relatedOpportunityHref: null,
    relatedMessageHref: null,
    evidence: ["スカウトメッセージのスクリーンショット.png"],
    responseHistory: [
      { id: "rh-10", action: "通報を受理", actor: "システム", reason: null, dateLabel: "2026年7月17日 8:00" },
    ],
    internalNotes: [],
  },
  {
    id: "r-307",
    category: "不適切な求人・案件",
    priority: "低",
    status: "却下",
    targetType: "求人・案件",
    targetLabel: "クラウドエンジニア（AWS）",
    targetHref: "/admin/opportunities/7",
    reporterName: "匿名ユーザー",
    reporterId: null,
    assignee: "管理者 伊藤",
    reportedDateLabel: "2026年7月8日",
    reportedDateISO: "2026-07-08",
    description: "求人内容が不適切であるとの通報。",
    relatedOpportunityTitle: "クラウドエンジニア（AWS）",
    relatedOpportunityHref: "/admin/opportunities/7",
    relatedMessageHref: null,
    evidence: [],
    responseHistory: [
      { id: "rh-11", action: "通報を受理", actor: "システム", reason: null, dateLabel: "2026年7月8日 10:00" },
      {
        id: "rh-12",
        action: "却下",
        actor: "管理者 伊藤",
        reason: "掲載内容に規約違反は確認されなかったため。",
        dateLabel: "2026年7月9日",
      },
    ],
    internalNotes: [],
  },
  {
    id: "r-308",
    category: "スパム",
    priority: "中",
    status: "解決済み",
    targetType: "ユーザー",
    targetLabel: "退会済みユーザー",
    targetHref: null,
    reporterName: "株式会社ゼロトラスト",
    reporterId: null,
    assignee: "管理者 松本",
    reportedDateLabel: "2026年6月20日",
    reportedDateISO: "2026-06-20",
    description: "求人検索結果に無関係な営業メッセージを大量送信されたとの通報。",
    relatedOpportunityTitle: null,
    relatedOpportunityHref: null,
    relatedMessageHref: null,
    evidence: [],
    responseHistory: [
      { id: "rh-13", action: "通報を受理", actor: "システム", reason: null, dateLabel: "2026年6月20日" },
      {
        id: "rh-14",
        action: "アカウント停止",
        actor: "管理者 松本",
        reason: "スパム行為の常習性を確認したため。",
        dateLabel: "2026年6月21日",
      },
      { id: "rh-15", action: "解決済み", actor: "管理者 松本", reason: null, dateLabel: "2026年6月21日" },
    ],
    internalNotes: [],
  },
];
