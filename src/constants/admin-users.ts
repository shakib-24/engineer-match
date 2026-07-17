/**
 * Admin Users management module placeholder content (Japanese).
 * UI only — no backend, no database, no real account actions.
 */

// ============================================================
// Page meta
// ============================================================

export const ADMIN_USERS_PAGE = {
  title: "ユーザー管理",
  description: "エンジニア・企業担当者・管理者のアカウントを管理できます。",
} as const;

// ============================================================
// Enums / types
// ============================================================

export const ADMIN_USER_ROLES = ["エンジニア", "企業担当者", "管理者"] as const;
export type AdminUserRole = (typeof ADMIN_USER_ROLES)[number];

export const ADMIN_USER_ACCOUNT_STATUSES = ["有効", "利用停止中", "審査待ち"] as const;
export type AdminUserAccountStatus = (typeof ADMIN_USER_ACCOUNT_STATUSES)[number];

export const ADMIN_USER_VERIFICATION_STATUSES = [
  "本人確認済み",
  "未確認",
  "確認中",
] as const;
export type AdminUserVerificationStatus =
  (typeof ADMIN_USER_VERIFICATION_STATUSES)[number];

export const ADMIN_USER_ROLE_STYLES: Record<AdminUserRole, string> = {
  エンジニア: "bg-indigo-50 text-indigo-700",
  企業担当者: "bg-blue-50 text-blue-700",
  管理者: "bg-violet-50 text-violet-700",
};

export const ADMIN_USER_ACCOUNT_STATUS_TONE: Record<
  AdminUserAccountStatus,
  "positive" | "negative" | "warning"
> = {
  有効: "positive",
  利用停止中: "negative",
  審査待ち: "warning",
};

export const ADMIN_USER_VERIFICATION_STATUS_TONE: Record<
  AdminUserVerificationStatus,
  "positive" | "neutral" | "warning"
> = {
  本人確認済み: "positive",
  未確認: "neutral",
  確認中: "warning",
};

// ============================================================
// Summary cards
// ============================================================

export const ADMIN_USER_SUMMARY_LABELS = {
  total: "全ユーザー",
  engineers: "エンジニア",
  companyStaff: "企業担当者",
  admins: "管理者",
  suspended: "利用停止中",
  newThisMonth: "今月の新規登録",
} as const;

// ============================================================
// Search / filters
// ============================================================

export const ADMIN_USER_SEARCH_LABELS = {
  label: "ユーザーを検索",
  placeholder: "氏名・メールアドレス・ユーザーID・企業名で検索",
} as const;

export const ADMIN_USER_FILTER_LABELS = {
  title: "絞り込み条件",
  role: "ロール",
  accountStatus: "アカウント状態",
  registeredWithin: "登録日",
  lastLoginWithin: "最終ログイン",
  verificationStatus: "本人確認状態",
  resetLabel: "条件をリセット",
} as const;

export const ADMIN_USER_DATE_RANGE_OPTIONS = [
  { label: "指定なし", days: null },
  { label: "7日以内", days: 7 },
  { label: "30日以内", days: 30 },
  { label: "90日以内", days: 90 },
] as const;

export interface AdminUserFilterState {
  roles: AdminUserRole[];
  accountStatuses: AdminUserAccountStatus[];
  verificationStatuses: AdminUserVerificationStatus[];
  registeredWithinDays: number | null;
  lastLoginWithinDays: number | null;
}

export const DEFAULT_ADMIN_USER_FILTER_STATE: AdminUserFilterState = {
  roles: [],
  accountStatuses: [],
  verificationStatuses: [],
  registeredWithinDays: null,
  lastLoginWithinDays: null,
};

// ============================================================
// Table / actions
// ============================================================

export const ADMIN_USER_TABLE_COLUMNS = [
  "ユーザー",
  "ロール",
  "所属企業",
  "登録日",
  "最終ログイン",
  "状態",
  "操作",
] as const;

export const ADMIN_USER_ACTION_LABELS = {
  viewDetails: "詳細を見る",
  edit: "編集",
  suspend: "利用停止",
  reinstate: "利用再開",
  delete: "削除",
} as const;

export const ADMIN_USER_RESULTS_META = {
  resultsSuffix: "件のユーザー",
} as const;

// ============================================================
// Status change / delete dialogs
// ============================================================

export const ADMIN_USER_STATUS_DIALOG_LABELS = {
  suspendTitle: "本当にこのユーザーを利用停止にしますか？",
  suspendDescription: "利用停止にすると、ユーザーはログインできなくなります。",
  suspendConfirmLabel: "利用停止にする",
  reinstateTitle: "このユーザーの利用を再開しますか？",
  reinstateDescription: "利用を再開すると、ユーザーは再びログインできるようになります。",
  reinstateConfirmLabel: "利用再開する",
  cancelLabel: "キャンセル",
} as const;

export const ADMIN_USER_DELETE_DIALOG_LABELS = {
  title: "本当にこのユーザーを削除しますか？",
  description: "この操作は取り消せません。ユーザーの登録情報がすべて削除されます。",
  cancelLabel: "キャンセル",
  confirmLabel: "削除する",
} as const;

export const ADMIN_USER_TOAST_MESSAGES = {
  suspended: "ユーザーを利用停止にしました。",
  reinstated: "ユーザーの利用を再開しました。",
  deleted: "ユーザーを削除しました。",
} as const;

export const ADMIN_USER_DEMO_NOTE =
  "※ UIデモのため、実際のアカウント操作は行われません。";

// ============================================================
// Detail page section labels
// ============================================================

export const ADMIN_USER_DETAIL_SECTIONS = {
  basicInfo: "基本情報",
  profileInfo: "プロフィール情報",
  registrationStatus: "登録状況",
  activityHistory: "応募・スカウト履歴",
  messageHistory: "メッセージ履歴",
  internalNotes: "管理メモ",
  activityLog: "アクティビティログ",
} as const;

export const ADMIN_USER_NOT_FOUND = {
  title: "ユーザーが見つかりませんでした。",
  description: "指定されたユーザーIDは存在しないか、削除された可能性があります。",
  ctaLabel: "ユーザー一覧に戻る",
  ctaHref: "/admin/users",
} as const;

// ============================================================
// Mock data
// ============================================================

export interface AdminUserActivityEntry {
  id: string;
  type: "応募" | "スカウト" | "面接" | "内定";
  title: string;
  counterpart: string;
  status: string;
  dateLabel: string;
}

export interface AdminUserMessageSummary {
  id: string;
  participant: string;
  preview: string;
  dateLabel: string;
  unread: boolean;
}

export interface AdminUserActivityLogEntry {
  id: string;
  action: string;
  detail: string;
  dateLabel: string;
}

export interface AdminNoteEntryData {
  id: string;
  author: string;
  body: string;
  dateLabel: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminUserRole;
  companyName: string | null;
  jobTitle: string | null;
  accountStatus: AdminUserAccountStatus;
  verificationStatus: AdminUserVerificationStatus;
  registeredDateLabel: string;
  registeredDateISO: string;
  lastLoginLabel: string;
  lastLoginISO: string;
  avatarInitials: string;
  phone: string;
  location: string;
  bio: string;
  registrationSource: string;
  profileCompletionPercent: number;
  activityHistory: AdminUserActivityEntry[];
  messageSummary: AdminUserMessageSummary[];
  activityLog: AdminUserActivityLogEntry[];
  internalNotes: AdminNoteEntryData[];
}

export const ADMIN_USERS: AdminUser[] = [
  {
    id: "u-001",
    name: "山田 太郎",
    email: "yamada.taro@example.com",
    role: "エンジニア",
    companyName: null,
    jobTitle: "フルスタックエンジニア",
    accountStatus: "有効",
    verificationStatus: "本人確認済み",
    registeredDateLabel: "2025年11月2日",
    registeredDateISO: "2025-11-02",
    lastLoginLabel: "2026年7月17日 8:20",
    lastLoginISO: "2026-07-17T08:20:00",
    avatarInitials: "山田",
    phone: "090-1234-5678",
    location: "東京都",
    bio: "React / TypeScript を中心にフルスタック開発を行うエンジニア。",
    registrationSource: "自己登録",
    profileCompletionPercent: 82,
    activityHistory: [
      {
        id: "act-1",
        type: "応募",
        title: "バックエンドエンジニア（Java / Spring Boot）",
        counterpart: "株式会社テックイノベーション",
        status: "書類選考中",
        dateLabel: "2026年7月10日",
      },
      {
        id: "act-2",
        type: "スカウト",
        title: "フロントエンドエンジニア（React / TypeScript）",
        counterpart: "合同会社クラウドフォース",
        status: "返信待ち",
        dateLabel: "2026年7月8日",
      },
    ],
    messageSummary: [
      {
        id: "m-1",
        participant: "株式会社テックイノベーション",
        preview: "面接の日程についてご案内します。",
        dateLabel: "2026年7月16日",
        unread: true,
      },
    ],
    activityLog: [
      { id: "log-1", action: "ログイン", detail: "Chrome / Windows", dateLabel: "2026年7月17日 8:20" },
      { id: "log-2", action: "プロフィール更新", detail: "スキル情報を更新", dateLabel: "2026年7月14日 19:40" },
    ],
    internalNotes: [],
  },
  {
    id: "u-002",
    name: "佐藤 健太",
    email: "sato.kenta@example.com",
    role: "エンジニア",
    companyName: null,
    jobTitle: "バックエンドエンジニア",
    accountStatus: "有効",
    verificationStatus: "本人確認済み",
    registeredDateLabel: "2026年3月18日",
    registeredDateISO: "2026-03-18",
    lastLoginLabel: "2026年7月16日 21:05",
    lastLoginISO: "2026-07-16T21:05:00",
    avatarInitials: "佐藤",
    phone: "090-2345-6789",
    location: "東京都",
    bio: "Java / Spring Boot を用いたバックエンド開発を得意とする。",
    registrationSource: "自己登録",
    profileCompletionPercent: 91,
    activityHistory: [
      {
        id: "act-3",
        type: "応募",
        title: "AIエンジニア（Python / 機械学習）",
        counterpart: "株式会社データフォレスト",
        status: "応募済み",
        dateLabel: "2026年7月14日",
      },
    ],
    messageSummary: [],
    activityLog: [
      { id: "log-3", action: "ログイン", detail: "Safari / iPhone", dateLabel: "2026年7月16日 21:05" },
    ],
    internalNotes: [],
  },
  {
    id: "u-003",
    name: "鈴木 美咲",
    email: "suzuki.misaki@example.com",
    role: "エンジニア",
    companyName: null,
    jobTitle: "フロントエンドエンジニア",
    accountStatus: "利用停止中",
    verificationStatus: "確認中",
    registeredDateLabel: "2025年8月4日",
    registeredDateISO: "2025-08-04",
    lastLoginLabel: "2026年6月2日 10:15",
    lastLoginISO: "2026-06-02T10:15:00",
    avatarInitials: "鈴木",
    phone: "090-3456-7890",
    location: "大阪府",
    bio: "React / Vue.js を用いたフロントエンド開発の経験あり。",
    registrationSource: "自己登録",
    profileCompletionPercent: 65,
    activityHistory: [],
    messageSummary: [],
    activityLog: [
      { id: "log-4", action: "利用停止", detail: "通報対応のため管理者が停止", dateLabel: "2026年6月3日 9:00" },
    ],
    internalNotes: [
      {
        id: "note-1",
        author: "管理者 伊藤",
        body: "不適切なメッセージ送信の通報を受け、調査完了まで一時停止としています。",
        dateLabel: "2026年6月3日",
      },
    ],
  },
  {
    id: "u-004",
    name: "高橋 大輔",
    email: "takahashi.daisuke@example.com",
    role: "エンジニア",
    companyName: null,
    jobTitle: "インフラエンジニア",
    accountStatus: "有効",
    verificationStatus: "未確認",
    registeredDateLabel: "2026年6月30日",
    registeredDateISO: "2026-06-30",
    lastLoginLabel: "2026年7月15日 14:50",
    lastLoginISO: "2026-07-15T14:50:00",
    avatarInitials: "高橋",
    phone: "090-4567-8901",
    location: "神奈川県",
    bio: "AWS / Kubernetes を用いたインフラ構築・運用が専門。",
    registrationSource: "自己登録",
    profileCompletionPercent: 58,
    activityHistory: [
      {
        id: "act-4",
        type: "内定",
        title: "インフラエンジニア（AWS / Kubernetes）",
        counterpart: "株式会社ネクストシステムズ",
        status: "内定",
        dateLabel: "2026年7月15日",
      },
    ],
    messageSummary: [
      {
        id: "m-2",
        participant: "株式会社ネクストシステムズ",
        preview: "内定通知書を送付いたしました。ご確認ください。",
        dateLabel: "2026年7月15日",
        unread: true,
      },
    ],
    activityLog: [
      { id: "log-5", action: "ログイン", detail: "Chrome / Android", dateLabel: "2026年7月15日 14:50" },
    ],
    internalNotes: [],
  },
  {
    id: "u-005",
    name: "中村 拓也",
    email: "nakamura.takuya@example.com",
    role: "エンジニア",
    companyName: null,
    jobTitle: "未設定",
    accountStatus: "審査待ち",
    verificationStatus: "未確認",
    registeredDateLabel: "2026年7月17日",
    registeredDateISO: "2026-07-17",
    lastLoginLabel: "2026年7月17日 9:12",
    lastLoginISO: "2026-07-17T09:12:00",
    avatarInitials: "中村",
    phone: "090-5678-9012",
    location: "東京都",
    bio: "登録直後のためプロフィールは未入力です。",
    registrationSource: "自己登録",
    profileCompletionPercent: 12,
    activityHistory: [],
    messageSummary: [],
    activityLog: [
      { id: "log-6", action: "新規登録", detail: "エンジニアとして登録", dateLabel: "2026年7月17日 9:12" },
    ],
    internalNotes: [],
  },
  {
    id: "u-006",
    name: "渡辺 隆",
    email: "watanabe.takashi@example.com",
    role: "エンジニア",
    companyName: null,
    jobTitle: "DevOpsエンジニア",
    accountStatus: "有効",
    verificationStatus: "本人確認済み",
    registeredDateLabel: "2026年1月20日",
    registeredDateISO: "2026-01-20",
    lastLoginLabel: "2026年7月15日 17:30",
    lastLoginISO: "2026-07-15T17:30:00",
    avatarInitials: "渡辺",
    phone: "090-6789-0123",
    location: "大阪府",
    bio: "CI/CDパイプラインの構築・改善を専門とする。",
    registrationSource: "自己登録",
    profileCompletionPercent: 88,
    activityHistory: [
      {
        id: "act-5",
        type: "応募",
        title: "DevOpsエンジニア（Kubernetes / CI-CD）",
        counterpart: "株式会社スケールワークス",
        status: "応募済み",
        dateLabel: "2026年7月15日",
      },
    ],
    messageSummary: [],
    activityLog: [
      { id: "log-7", action: "ログイン", detail: "Chrome / Windows", dateLabel: "2026年7月15日 17:30" },
    ],
    internalNotes: [],
  },
  {
    id: "u-007",
    name: "田中 慎一",
    email: "tanaka.shinichi@example.com",
    role: "エンジニア",
    companyName: null,
    jobTitle: "セキュリティエンジニア",
    accountStatus: "有効",
    verificationStatus: "本人確認済み",
    registeredDateLabel: "2025年6月11日",
    registeredDateISO: "2025-06-11",
    lastLoginLabel: "2026年7月17日 8:30",
    lastLoginISO: "2026-07-17T08:30:00",
    avatarInitials: "田中",
    phone: "090-7890-1234",
    location: "東京都",
    bio: "脆弱性診断・SOC運用の経験を持つセキュリティエンジニア。",
    registrationSource: "自己登録",
    profileCompletionPercent: 95,
    activityHistory: [
      {
        id: "act-6",
        type: "スカウト",
        title: "セキュリティエンジニア（SOC運用）",
        counterpart: "株式会社ゼロトラスト",
        status: "返信待ち",
        dateLabel: "2026年7月16日",
      },
    ],
    messageSummary: [],
    activityLog: [
      { id: "log-8", action: "通報対象として記録", detail: "プロフィール内容の通報を受け付け", dateLabel: "2026年7月17日 8:30" },
    ],
    internalNotes: [
      {
        id: "note-2",
        author: "管理者 佐々木",
        body: "プロフィール内容について通報あり。内容確認中。",
        dateLabel: "2026年7月17日",
      },
    ],
  },
  {
    id: "u-008",
    name: "小林 直樹",
    email: "kobayashi.naoki@example.com",
    role: "エンジニア",
    companyName: null,
    jobTitle: "未設定",
    accountStatus: "有効",
    verificationStatus: "未確認",
    registeredDateLabel: "2026年7月15日",
    registeredDateISO: "2026-07-15",
    lastLoginLabel: "2026年7月15日 16:05",
    lastLoginISO: "2026-07-15T16:05:00",
    avatarInitials: "小林",
    phone: "090-8901-2345",
    location: "愛知県",
    bio: "登録して間もないため、プロフィール入力中です。",
    registrationSource: "自己登録",
    profileCompletionPercent: 24,
    activityHistory: [],
    messageSummary: [],
    activityLog: [
      { id: "log-9", action: "新規登録", detail: "エンジニアとして登録", dateLabel: "2026年7月15日 16:05" },
    ],
    internalNotes: [],
  },
  {
    id: "u-101",
    name: "採用担当 佐藤",
    email: "recruit@tech-innovation.example.com",
    role: "企業担当者",
    companyName: "株式会社テックイノベーション",
    jobTitle: "採用担当",
    accountStatus: "有効",
    verificationStatus: "本人確認済み",
    registeredDateLabel: "2024年10月2日",
    registeredDateISO: "2024-10-02",
    lastLoginLabel: "2026年7月17日 9:00",
    lastLoginISO: "2026-07-17T09:00:00",
    avatarInitials: "採用",
    phone: "03-1234-5678",
    location: "東京都渋谷区",
    bio: "自社SaaSプロダクトの採用を担当。",
    registrationSource: "自己登録",
    profileCompletionPercent: 100,
    activityHistory: [
      {
        id: "act-7",
        type: "スカウト",
        title: "バックエンドエンジニア（Java / Spring Boot）",
        counterpart: "高橋 大輔",
        status: "送信済み",
        dateLabel: "2026年7月15日",
      },
    ],
    messageSummary: [
      {
        id: "m-3",
        participant: "山田 太郎",
        preview: "ぜひ一度カジュアルにお話しさせていただけますと幸いです。",
        dateLabel: "2026年7月16日",
        unread: false,
      },
    ],
    activityLog: [
      { id: "log-10", action: "ログイン", detail: "Chrome / Windows", dateLabel: "2026年7月17日 9:00" },
    ],
    internalNotes: [],
  },
  {
    id: "u-102",
    name: "採用担当 中村",
    email: "recruit@nextvision.example.com",
    role: "企業担当者",
    companyName: "株式会社ネクストヴィジョン",
    jobTitle: "採用担当",
    accountStatus: "審査待ち",
    verificationStatus: "確認中",
    registeredDateLabel: "2026年7月16日",
    registeredDateISO: "2026-07-16",
    lastLoginLabel: "2026年7月16日 14:32",
    lastLoginISO: "2026-07-16T14:32:00",
    avatarInitials: "中村",
    phone: "03-2345-6789",
    location: "東京都港区",
    bio: "新規登録企業の採用担当者。",
    registrationSource: "自己登録",
    profileCompletionPercent: 70,
    activityHistory: [],
    messageSummary: [],
    activityLog: [
      { id: "log-11", action: "企業登録申請", detail: "企業審査待ちで登録", dateLabel: "2026年7月16日 14:32" },
    ],
    internalNotes: [],
  },
  {
    id: "u-103",
    name: "採用担当 小林",
    email: "recruit@bluespark.example.com",
    role: "企業担当者",
    companyName: "合同会社ブルースパーク",
    jobTitle: "採用担当",
    accountStatus: "審査待ち",
    verificationStatus: "未確認",
    registeredDateLabel: "2026年7月15日",
    registeredDateISO: "2026-07-15",
    lastLoginLabel: "2026年7月15日 13:20",
    lastLoginISO: "2026-07-15T13:20:00",
    avatarInitials: "小林",
    phone: "03-3456-7890",
    location: "東京都新宿区",
    bio: "新規登録企業の採用担当者。",
    registrationSource: "自己登録",
    profileCompletionPercent: 55,
    activityHistory: [],
    messageSummary: [],
    activityLog: [
      { id: "log-12", action: "企業登録申請", detail: "企業審査待ちで登録", dateLabel: "2026年7月15日 13:20" },
    ],
    internalNotes: [],
  },
  {
    id: "u-104",
    name: "採用担当 伊藤",
    email: "recruit@digitalbridge.example.com",
    role: "企業担当者",
    companyName: "株式会社デジタルブリッジ",
    jobTitle: "採用担当",
    accountStatus: "利用停止中",
    verificationStatus: "本人確認済み",
    registeredDateLabel: "2025年4月8日",
    registeredDateISO: "2025-04-08",
    lastLoginLabel: "2026年7月10日 11:00",
    lastLoginISO: "2026-07-10T11:00:00",
    avatarInitials: "伊藤",
    phone: "03-4567-8901",
    location: "東京都千代田区",
    bio: "受託開発中心の企業の採用担当者。",
    registrationSource: "自己登録",
    profileCompletionPercent: 92,
    activityHistory: [],
    messageSummary: [],
    activityLog: [
      { id: "log-13", action: "利用停止", detail: "スパムメッセージの通報により停止", dateLabel: "2026年7月15日 15:00" },
    ],
    internalNotes: [
      {
        id: "note-3",
        author: "管理者 松本",
        body: "スパムメッセージの通報を受け、調査完了まで一時停止としています。",
        dateLabel: "2026年7月15日",
      },
    ],
  },
  {
    id: "u-105",
    name: "採用担当 松本",
    email: "recruit@foresttech.example.com",
    role: "企業担当者",
    companyName: "株式会社フォレストテック",
    jobTitle: "採用担当",
    accountStatus: "有効",
    verificationStatus: "確認中",
    registeredDateLabel: "2026年7月14日",
    registeredDateISO: "2026-07-14",
    lastLoginLabel: "2026年7月16日 19:05",
    lastLoginISO: "2026-07-16T19:05:00",
    avatarInitials: "松本",
    phone: "03-5678-9012",
    location: "東京都品川区",
    bio: "新規登録企業の採用担当者。",
    registrationSource: "自己登録",
    profileCompletionPercent: 78,
    activityHistory: [],
    messageSummary: [],
    activityLog: [
      { id: "log-14", action: "書類提出", detail: "登記簿謄本を提出", dateLabel: "2026年7月14日 19:05" },
    ],
    internalNotes: [],
  },
  {
    id: "a-001",
    name: "佐々木 玲奈",
    email: "admin@example.com",
    role: "管理者",
    companyName: null,
    jobTitle: "システム管理者",
    accountStatus: "有効",
    verificationStatus: "本人確認済み",
    registeredDateLabel: "2024年1月10日",
    registeredDateISO: "2024-01-10",
    lastLoginLabel: "2026年7月17日 8:00",
    lastLoginISO: "2026-07-17T08:00:00",
    avatarInitials: "管理",
    phone: "03-0000-0001",
    location: "東京都",
    bio: "プラットフォーム全体の運営を担当する管理者。",
    registrationSource: "招待",
    profileCompletionPercent: 100,
    activityHistory: [],
    messageSummary: [],
    activityLog: [
      { id: "log-15", action: "ログイン", detail: "Chrome / Windows", dateLabel: "2026年7月17日 8:00" },
    ],
    internalNotes: [],
  },
  {
    id: "a-002",
    name: "管理者 伊藤",
    email: "ito.admin@example.com",
    role: "管理者",
    companyName: null,
    jobTitle: "運営担当",
    accountStatus: "有効",
    verificationStatus: "本人確認済み",
    registeredDateLabel: "2024年4月1日",
    registeredDateISO: "2024-04-01",
    lastLoginLabel: "2026年7月16日 17:45",
    lastLoginISO: "2026-07-16T17:45:00",
    avatarInitials: "伊藤",
    phone: "03-0000-0002",
    location: "東京都",
    bio: "企業審査・通報対応を担当する管理者。",
    registrationSource: "招待",
    profileCompletionPercent: 100,
    activityHistory: [],
    messageSummary: [],
    activityLog: [
      { id: "log-16", action: "企業審査を承認", detail: "合同会社クラウドフォースを承認", dateLabel: "2026年7月16日 17:45" },
    ],
    internalNotes: [],
  },
];
