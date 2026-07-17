/**
 * Admin module placeholder content (Japanese).
 * UI only — no backend, no database, no real authentication.
 */

// ============================================================
// Page meta
// ============================================================

export const ADMIN_DASHBOARD_PAGE = {
  title: "管理者ダッシュボード",
  description: "プラットフォーム全体の利用状況と運営状況を確認できます。",
} as const;

// ============================================================
// Brand / chrome labels
// ============================================================

export const ADMIN_BRAND = {
  name: "ENGINEER MATCH",
  subtitle: "管理者コンソール",
} as const;

export const ADMIN_LABELS = {
  openMenu: "メニューを開く",
  closeMenu: "メニューを閉じる",
  navigationMenu: "ナビゲーションメニュー",
  detailsButton: "詳細を確認",
  demoNote: "現在はUIデモのため、データはすべてモック表示です。",
} as const;

// ============================================================
// Navigation
// ============================================================

export const ADMIN_NAV = [
  { href: "/admin", label: "ダッシュボード", icon: "layoutDashboard" },
  { href: "/admin/users", label: "ユーザー管理", icon: "users" },
  { href: "/admin/companies", label: "企業管理", icon: "building2" },
  { href: "/admin/opportunities", label: "求人・案件管理", icon: "briefcase" },
  { href: "/admin/applications", label: "応募管理", icon: "clipboardList" },
  { href: "/admin/messages", label: "メッセージ管理", icon: "messageSquare" },
  { href: "/admin/reports", label: "通報管理", icon: "shieldAlert" },
  { href: "/admin/master-data", label: "マスタ管理", icon: "listChecks" },
  { href: "/admin/notifications", label: "通知", icon: "bell" },
  { href: "/admin/settings", label: "システム設定", icon: "settings" },
] as const;

export const ADMIN_USER = {
  name: "佐々木 玲奈",
  role: "システム管理者",
  initials: "管理",
} as const;

// ============================================================
// Summary cards (KPIs)
// ============================================================

export const ADMIN_TREND_DIRECTIONS = ["up", "down", "flat"] as const;
export type AdminTrendDirection = (typeof ADMIN_TREND_DIRECTIONS)[number];

export const ADMIN_TREND_TONES = ["positive", "negative", "neutral"] as const;
export type AdminTrendTone = (typeof ADMIN_TREND_TONES)[number];

export interface AdminSummaryCard {
  id: string;
  label: string;
  value: string;
  comparisonLabel: string;
  trend: AdminTrendDirection;
  tone: AdminTrendTone;
  icon: string;
}

export const ADMIN_SUMMARY_CARDS: AdminSummaryCard[] = [
  {
    id: "engineers",
    label: "登録エンジニア数",
    value: "3,482人",
    comparisonLabel: "先月比 +156人",
    trend: "up",
    tone: "positive",
    icon: "userRound",
  },
  {
    id: "companies",
    label: "登録企業数",
    value: "612社",
    comparisonLabel: "先月比 +18社",
    trend: "up",
    tone: "positive",
    icon: "building2",
  },
  {
    id: "openJobs",
    label: "公開中求人・案件数",
    value: "248件",
    comparisonLabel: "先月比 +12件",
    trend: "up",
    tone: "positive",
    icon: "briefcase",
  },
  {
    id: "applications",
    label: "応募総数",
    value: "9,764件",
    comparisonLabel: "先月比 +342件",
    trend: "up",
    tone: "positive",
    icon: "send",
  },
  {
    id: "openReports",
    label: "未対応通報数",
    value: "7件",
    comparisonLabel: "先週比 +3件",
    trend: "up",
    tone: "negative",
    icon: "shieldAlert",
  },
  {
    id: "newToday",
    label: "本日の新規登録数",
    value: "26人",
    comparisonLabel: "前日比 +4人",
    trend: "up",
    tone: "positive",
    icon: "userPlus",
  },
];

// ============================================================
// Pending approvals
// ============================================================

export const ADMIN_APPROVAL_TYPES = [
  "企業審査待ち",
  "求人審査待ち",
  "通報対応待ち",
] as const;
export type AdminApprovalType = (typeof ADMIN_APPROVAL_TYPES)[number];

export const ADMIN_APPROVAL_TYPE_STYLES: Record<AdminApprovalType, string> = {
  企業審査待ち: "bg-indigo-50 text-indigo-700",
  求人審査待ち: "bg-blue-50 text-blue-700",
  通報対応待ち: "bg-red-50 text-red-700",
};

export const ADMIN_APPROVAL_TYPE_ICONS: Record<AdminApprovalType, string> = {
  企業審査待ち: "building2",
  求人審査待ち: "briefcase",
  通報対応待ち: "shieldAlert",
};

export const ADMIN_PENDING_APPROVALS_SECTION = {
  title: "対応待ちの審査・通報",
  description: "企業審査・求人審査・通報対応の未処理件数です。",
} as const;

export interface AdminApprovalItem {
  id: string;
  type: AdminApprovalType;
  title: string;
  submittedBy: string;
  dateLabel: string;
  status: string;
  detailsHref: string;
}

export const ADMIN_PENDING_APPROVALS: AdminApprovalItem[] = [
  {
    id: "c-101",
    type: "企業審査待ち",
    title: "株式会社ネクストヴィジョン",
    submittedBy: "採用担当 中村",
    dateLabel: "2026年7月16日",
    status: "審査待ち",
    detailsHref: "/admin/companies/c-101",
  },
  {
    id: "c-102",
    type: "企業審査待ち",
    title: "合同会社ブルースパーク",
    submittedBy: "採用担当 小林",
    dateLabel: "2026年7月15日",
    status: "審査待ち",
    detailsHref: "/admin/companies/c-102",
  },
  {
    id: "c-103",
    type: "企業審査待ち",
    title: "株式会社フォレストテック",
    submittedBy: "採用担当 松本",
    dateLabel: "2026年7月14日",
    status: "書類確認中",
    detailsHref: "/admin/companies/c-103",
  },
  {
    id: "j-201",
    type: "求人審査待ち",
    title: "バックエンドエンジニア（Java / Spring Boot）",
    submittedBy: "株式会社テックイノベーション",
    dateLabel: "2026年7月16日",
    status: "審査待ち",
    detailsHref: "/admin/opportunities/j-201",
  },
  {
    id: "j-202",
    type: "求人審査待ち",
    title: "AIエンジニア（Python / 機械学習）",
    submittedBy: "株式会社ニューラルゲート",
    dateLabel: "2026年7月15日",
    status: "審査待ち",
    detailsHref: "/admin/opportunities/j-202",
  },
  {
    id: "j-203",
    type: "求人審査待ち",
    title: "セキュリティエンジニア（SOC運用）",
    submittedBy: "株式会社ゼロトラスト",
    dateLabel: "2026年7月13日",
    status: "内容確認中",
    detailsHref: "/admin/opportunities/j-203",
  },
  {
    id: "r-301",
    type: "通報対応待ち",
    title: "不適切なプロフィール内容の通報",
    submittedBy: "エンジニア 佐藤 健太",
    dateLabel: "2026年7月16日",
    status: "未対応",
    detailsHref: "/admin/reports/r-301",
  },
  {
    id: "r-302",
    type: "通報対応待ち",
    title: "スパムメッセージの通報",
    submittedBy: "株式会社デジタルブリッジ",
    dateLabel: "2026年7月15日",
    status: "未対応",
    detailsHref: "/admin/reports/r-302",
  },
  {
    id: "r-303",
    type: "通報対応待ち",
    title: "求人内容の虚偽記載に関する通報",
    submittedBy: "エンジニア 鈴木 美咲",
    dateLabel: "2026年7月14日",
    status: "調査中",
    detailsHref: "/admin/reports/r-303",
  },
];

// ============================================================
// Recent activity
// ============================================================

export const ADMIN_ACTIVITY_TYPES = [
  "エンジニア登録",
  "企業登録",
  "求人公開",
  "応募",
  "スカウト",
  "通報",
  "管理者更新",
  "マスタ変更",
] as const;
export type AdminActivityType = (typeof ADMIN_ACTIVITY_TYPES)[number];

export const ADMIN_ACTIVITY_TYPE_ICONS: Record<AdminActivityType, string> = {
  エンジニア登録: "userRound",
  企業登録: "building2",
  求人公開: "briefcase",
  応募: "send",
  スカウト: "megaphone",
  通報: "flag",
  管理者更新: "userCog",
  マスタ変更: "slidersHorizontal",
};

export const ADMIN_ACTIVITY_TYPE_STYLES: Record<AdminActivityType, string> = {
  エンジニア登録: "bg-indigo-50 text-indigo-700",
  企業登録: "bg-blue-50 text-blue-700",
  求人公開: "bg-emerald-50 text-emerald-700",
  応募: "bg-sky-50 text-sky-700",
  スカウト: "bg-violet-50 text-violet-700",
  通報: "bg-red-50 text-red-700",
  管理者更新: "bg-amber-50 text-amber-700",
  マスタ変更: "bg-gray-100 text-gray-600",
};

export const ADMIN_RECENT_ACTIVITY_SECTION = {
  title: "最近のアクティビティ",
  description: "プラットフォーム全体の直近の活動履歴です。",
} as const;

export interface AdminActivityItem {
  id: string;
  type: AdminActivityType;
  title: string;
  description: string;
  actor: string;
  dateLabel: string;
  dateISO: string;
  relatedHref?: string;
}

export const ADMIN_RECENT_ACTIVITY: AdminActivityItem[] = [
  {
    id: "act-01",
    type: "エンジニア登録",
    title: "新規エンジニアが登録しました",
    description: "プロフィール登録が完了しました。",
    actor: "中村 拓也",
    dateLabel: "2026年7月17日 9:12",
    dateISO: "2026-07-17T09:12:00",
    relatedHref: "/admin/users/u-005",
  },
  {
    id: "act-02",
    type: "求人公開",
    title: "新しい求人・案件が公開されました",
    description: "バックエンドエンジニア（Go / gRPC）",
    actor: "株式会社クラウドネイティブ",
    dateLabel: "2026年7月17日 8:50",
    dateISO: "2026-07-17T08:50:00",
  },
  {
    id: "act-03",
    type: "通報",
    title: "プロフィール内容の通報を受け付けました",
    description: "不適切な自己紹介文に関する通報です。",
    actor: "エンジニア 田中 慎一",
    dateLabel: "2026年7月17日 8:30",
    dateISO: "2026-07-17T08:30:00",
    relatedHref: "/admin/reports/r-301",
  },
  {
    id: "act-04",
    type: "スカウト",
    title: "スカウトが送信されました",
    description: "フロントエンドエンジニア（Vue.js）で伊藤 まどか様へ送信。",
    actor: "株式会社デジタルブリッジ",
    dateLabel: "2026年7月16日 22:15",
    dateISO: "2026-07-16T22:15:00",
  },
  {
    id: "act-05",
    type: "応募",
    title: "新しい応募がありました",
    description: "インフラエンジニア（AWS / Kubernetes）に高橋 大輔様が応募。",
    actor: "株式会社ネクストシステムズ",
    dateLabel: "2026年7月16日 21:40",
    dateISO: "2026-07-16T21:40:00",
    relatedHref: "/admin/applications/app-003",
  },
  {
    id: "act-06",
    type: "企業登録",
    title: "新規企業が登録しました",
    description: "企業アカウントの登録が完了しました。",
    actor: "株式会社フォレストテック",
    dateLabel: "2026年7月16日 19:05",
    dateISO: "2026-07-16T19:05:00",
    relatedHref: "/admin/companies/c-103",
  },
  {
    id: "act-07",
    type: "マスタ変更",
    title: "スキルマスタが更新されました",
    description: "「Rust」をスキル一覧に追加しました。",
    actor: "管理者 佐々木",
    dateLabel: "2026年7月16日 18:20",
    dateISO: "2026-07-16T18:20:00",
    relatedHref: "/admin/master-data",
  },
  {
    id: "act-08",
    type: "管理者更新",
    title: "企業審査を承認しました",
    description: "合同会社クラウドフォースの企業審査を承認しました。",
    actor: "管理者 伊藤",
    dateLabel: "2026年7月16日 17:45",
    dateISO: "2026-07-16T17:45:00",
    relatedHref: "/admin/companies/c-002",
  },
  {
    id: "act-09",
    type: "エンジニア登録",
    title: "新規エンジニアが登録しました",
    description: "プロフィール登録が完了しました。",
    actor: "渡辺 隆",
    dateLabel: "2026年7月16日 16:30",
    dateISO: "2026-07-16T16:30:00",
    relatedHref: "/admin/users/u-006",
  },
  {
    id: "act-10",
    type: "求人公開",
    title: "新しい求人・案件が公開されました",
    description: "データエンジニア（Python / GCP）",
    actor: "株式会社アナリティクスラボ",
    dateLabel: "2026年7月16日 15:10",
    dateISO: "2026-07-16T15:10:00",
  },
  {
    id: "act-11",
    type: "応募",
    title: "新しい応募がありました",
    description: "AIエンジニア（機械学習）に佐藤 健太様が応募。",
    actor: "株式会社ニューラルゲート",
    dateLabel: "2026年7月16日 14:00",
    dateISO: "2026-07-16T14:00:00",
  },
  {
    id: "act-12",
    type: "通報",
    title: "求人内容の虚偽記載に関する通報を受け付けました",
    description: "掲載内容と実態の相違についての通報です。",
    actor: "エンジニア 鈴木 美咲",
    dateLabel: "2026年7月16日 12:15",
    dateISO: "2026-07-16T12:15:00",
    relatedHref: "/admin/reports/r-303",
  },
  {
    id: "act-13",
    type: "スカウト",
    title: "スカウトが送信されました",
    description: "セキュリティエンジニア（SOC運用）で田中 慎一様へ送信。",
    actor: "株式会社ゼロトラスト",
    dateLabel: "2026年7月16日 11:00",
    dateISO: "2026-07-16T11:00:00",
    relatedHref: "/admin/opportunities/j-203",
  },
  {
    id: "act-14",
    type: "管理者更新",
    title: "求人・案件の掲載を差し戻しました",
    description: "社内SE（PostgreSQL / Linux）の掲載内容に修正を依頼しました。",
    actor: "管理者 中村",
    dateLabel: "2026年7月16日 10:20",
    dateISO: "2026-07-16T10:20:00",
  },
  {
    id: "act-15",
    type: "企業登録",
    title: "新規企業が登録しました",
    description: "企業アカウントの登録が完了しました。",
    actor: "株式会社ゼロトラスト",
    dateLabel: "2026年7月15日 20:40",
    dateISO: "2026-07-15T20:40:00",
    relatedHref: "/admin/companies/c-003",
  },
  {
    id: "act-16",
    type: "マスタ変更",
    title: "資格マスタが更新されました",
    description: "「AWS認定ソリューションアーキテクト」を資格一覧に追加しました。",
    actor: "管理者 松本",
    dateLabel: "2026年7月15日 19:15",
    dateISO: "2026-07-15T19:15:00",
    relatedHref: "/admin/master-data",
  },
  {
    id: "act-17",
    type: "応募",
    title: "新しい応募がありました",
    description: "DevOpsエンジニア（Kubernetes / CI-CD）に渡辺 隆様が応募。",
    actor: "株式会社スケールワークス",
    dateLabel: "2026年7月15日 17:30",
    dateISO: "2026-07-15T17:30:00",
    relatedHref: "/admin/opportunities/11",
  },
  {
    id: "act-18",
    type: "エンジニア登録",
    title: "新規エンジニアが登録しました",
    description: "プロフィール登録が完了しました。",
    actor: "小林 直樹",
    dateLabel: "2026年7月15日 16:05",
    dateISO: "2026-07-15T16:05:00",
    relatedHref: "/admin/users/u-008",
  },
  {
    id: "act-19",
    type: "通報",
    title: "スパムメッセージの通報を受け付けました",
    description: "大量の営業メッセージ送信についての通報です。",
    actor: "株式会社パイプラインワークス",
    dateLabel: "2026年7月15日 14:50",
    dateISO: "2026-07-15T14:50:00",
  },
  {
    id: "act-20",
    type: "求人公開",
    title: "新しい求人・案件が公開されました",
    description: "クラウドエンジニア（AWS）",
    actor: "株式会社データポート",
    dateLabel: "2026年7月15日 13:20",
    dateISO: "2026-07-15T13:20:00",
    relatedHref: "/admin/opportunities/7",
  },
  {
    id: "act-21",
    type: "管理者更新",
    title: "通報対応を完了しました",
    description: "不適切なメッセージ内容の通報対応を完了しました。",
    actor: "管理者 伊藤",
    dateLabel: "2026年7月15日 11:40",
    dateISO: "2026-07-15T11:40:00",
    relatedHref: "/admin/reports/r-305",
  },
  {
    id: "act-22",
    type: "スカウト",
    title: "スカウトが送信されました",
    description: "バックエンドエンジニア（Java / Spring Boot）で高橋 大輔様へ送信。",
    actor: "株式会社テックイノベーション",
    dateLabel: "2026年7月15日 10:05",
    dateISO: "2026-07-15T10:05:00",
    relatedHref: "/admin/opportunities/j-201",
  },
];

// ============================================================
// Quick actions
// ============================================================

export const ADMIN_QUICK_ACTIONS = {
  title: "クイックアクション",
  items: [
    { label: "ユーザーを確認", href: "/admin/users", icon: "users" },
    { label: "企業審査を確認", href: "/admin/companies", icon: "building2" },
    { label: "求人・案件を確認", href: "/admin/opportunities", icon: "briefcase" },
    { label: "通報を確認", href: "/admin/reports", icon: "shieldAlert" },
    { label: "マスタ管理", href: "/admin/master-data", icon: "listChecks" },
  ],
} as const;

// ============================================================
// System status
// ============================================================

export const ADMIN_SYSTEM_STATUSES = ["正常", "注意", "停止"] as const;
export type AdminSystemStatus = (typeof ADMIN_SYSTEM_STATUSES)[number];

export const ADMIN_SYSTEM_STATUS_STYLES: Record<AdminSystemStatus, string> = {
  正常: "bg-emerald-50 text-emerald-700",
  注意: "bg-amber-50 text-amber-700",
  停止: "bg-red-50 text-red-700",
};

export const ADMIN_SYSTEM_STATUS_ICONS: Record<AdminSystemStatus, string> = {
  正常: "checkCircle2",
  注意: "alertTriangle",
  停止: "xCircle",
};

export const ADMIN_SYSTEM_STATUS_SECTION = {
  title: "システムステータス",
  description: "主要コンポーネントの稼働状況です。",
} as const;

export interface AdminSystemStatusItem {
  id: string;
  name: string;
  detail: string;
  status: AdminSystemStatus;
  icon: string;
}

export const ADMIN_SYSTEM_STATUS_ITEMS: AdminSystemStatusItem[] = [
  {
    id: "web",
    name: "Web Application",
    detail: "応答時間 120ms",
    status: "正常",
    icon: "server",
  },
  {
    id: "database",
    name: "Database",
    detail: "接続数 42 / 100",
    status: "正常",
    icon: "database",
  },
  {
    id: "auth",
    name: "Authentication",
    detail: "レイテンシがやや増加しています",
    status: "注意",
    icon: "lock",
  },
  {
    id: "storage",
    name: "File Storage",
    detail: "使用率 38%",
    status: "正常",
    icon: "hardDrive",
  },
  {
    id: "realtime",
    name: "Realtime Messaging",
    detail: "メンテナンス中のため一時停止しています",
    status: "停止",
    icon: "radio",
  },
];

export const ADMIN_SYSTEM_STATUS_NOTE =
  "※ 現在はUIデモのため、システム状態はモック表示です。";
