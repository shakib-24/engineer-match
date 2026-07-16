/**
 * Engineer Application Module placeholder content (Japanese).
 * UI only — no backend, no real data, no authentication.
 */

// ============================================================
// Page header
// ============================================================

export const APPLICATIONS_PAGE = {
  title: "応募管理",
  description: "応募した求人・案件を確認できます。",
} as const;

// ============================================================
// Status
// ============================================================

export const APPLICATION_STATUSES = [
  "応募済み",
  "書類選考中",
  "面接予定",
  "最終面接",
  "内定",
  "契約中",
  "不採用",
  "辞退",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const APPLICATION_STATUS_BADGE_STYLES: Record<ApplicationStatus, string> = {
  応募済み: "bg-blue-50 text-blue-700",
  書類選考中: "bg-indigo-50 text-indigo-700",
  面接予定: "bg-amber-50 text-amber-700",
  最終面接: "bg-orange-50 text-orange-700",
  内定: "bg-green-50 text-green-700",
  契約中: "bg-emerald-50 text-emerald-700",
  不採用: "bg-red-50 text-red-700",
  辞退: "bg-gray-100 text-gray-600",
};

export const WITHDRAWABLE_STATUSES: readonly ApplicationStatus[] = [
  "応募済み",
  "書類選考中",
];

// ============================================================
// Contract type (shared badge vocabulary with Job Search)
// ============================================================

export const CONTRACT_TYPE_OPTIONS = ["就職", "案件", "時間清算"] as const;
export type ContractType = (typeof CONTRACT_TYPE_OPTIONS)[number];

export const CONTRACT_TYPE_BADGE_STYLES: Record<ContractType, string> = {
  就職: "bg-blue-50 text-blue-700",
  案件: "bg-indigo-50 text-primary",
  時間清算: "bg-amber-50 text-amber-700",
};

// ============================================================
// Summary cards
// ============================================================

export const SUMMARY_CARDS = [
  {
    key: "applying",
    label: "応募中",
    icon: "send",
    helper: "書類選考の結果待ちです",
    statuses: ["応募済み", "書類選考中"] as ApplicationStatus[],
  },
  {
    key: "interviewing",
    label: "面接中",
    icon: "messagesSquare",
    helper: "面接の日程調整・実施中です",
    statuses: ["面接予定", "最終面接"] as ApplicationStatus[],
  },
  {
    key: "offered",
    label: "内定",
    icon: "award",
    helper: "内定をいただいています",
    statuses: ["内定"] as ApplicationStatus[],
  },
  {
    key: "closed",
    label: "完了",
    icon: "checkCircle2",
    helper: "契約・不採用・辞退の件数です",
    statuses: ["契約中", "不採用", "辞退"] as ApplicationStatus[],
  },
] as const;

// ============================================================
// Filters / sort
// ============================================================

export const SORT_OPTIONS = [
  { value: "newest", label: "新しい順" },
  { value: "oldest", label: "古い順" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

export const FILTER_LABELS = {
  searchLabel: "応募を検索",
  searchPlaceholder: "求人タイトルで検索",
  statusLabel: "ステータス",
  statusAllLabel: "すべてのステータス",
  companyLabel: "会社名",
  companyAllLabel: "すべての会社",
  contractTypeLabel: "契約形態",
  contractTypeAllLabel: "すべての契約形態",
  sortLabel: "並び替え",
  resetLabel: "条件をリセット",
} as const;

// ============================================================
// Application list / card
// ============================================================

export const APPLICATION_LIST_META = {
  resultsSuffix: "件の応募が見つかりました",
  detailButtonLabel: "詳細を見る",
  withdrawButtonLabel: "取り消す",
  appliedPrefix: "応募日：",
  withdrawnBadgeNote: "この応募は取り消し済みです",
} as const;

// ============================================================
// Empty states
// ============================================================

export const EMPTY_STATE_LABELS = {
  title: "応募した求人・案件はありません。",
  description: "気になる求人・案件を見つけて応募してみましょう。",
  ctaLabel: "求人・案件を探す",
  ctaHref: "/engineer/jobs",
} as const;

export const FILTERED_EMPTY_STATE_LABELS = {
  title: "条件に一致する応募が見つかりませんでした。",
  description: "検索キーワードや絞り込み条件を変更してお試しください。",
  ctaLabel: "条件をリセット",
} as const;

// ============================================================
// Withdraw dialog
// ============================================================

export const WITHDRAW_DIALOG_LABELS = {
  triggerLabel: "取り消す",
  title: "本当に応募を取り消しますか？",
  description: "この操作は取り消せません。応募を取り消すと、選考が終了します。",
  cancelLabel: "キャンセル",
  confirmLabel: "応募を取り消す",
  toastMessage: "応募を取り消しました。",
} as const;

// ============================================================
// Application detail — section labels
// ============================================================

export const TIMELINE_STEPS = ["応募", "書類選考", "一次面接", "最終面接", "内定"] as const;

export const DETAIL_META = {
  backLabel: "応募一覧に戻る",
  backHref: "/engineer/applications",
  timelineTitle: "選考ステータス",
  historyTitle: "応募履歴",
  companyInfoTitle: "企業情報",
  summaryTitle: "応募内容",
  documentsTitle: "提出書類",
} as const;

export const COMPANY_INFO_LABELS = {
  industryLabel: "業種",
  employeesLabel: "従業員数",
  locationLabel: "所在地",
  websiteLabel: "コーポレートサイト",
} as const;

export const APPLICATION_SUMMARY_LABELS = {
  positionLabel: "応募職種",
  contractLabel: "契約形態",
  salaryLabel: "給与・単価",
  workingStyleLabel: "勤務形態",
} as const;

export const DOCUMENT_LABELS = {
  resume: "履歴書",
  portfolio: "ポートフォリオ",
  coverLetter: "職務経歴書",
  submittedLabel: "提出済み",
  notSubmittedLabel: "未提出",
  demoNote: "※ 現在はUIデモのため、実際のファイルは保存されていません。",
} as const;

// ============================================================
// Applications (14 mock records)
// ============================================================

export interface ApplicationTimelineEntry {
  date: string;
  status: ApplicationStatus;
  note?: string;
}

export interface ApplicationCompanyInfo {
  industry: string;
  employees: string;
  location: string;
  website: string;
}

export interface ApplicationDocuments {
  resume: boolean;
  portfolio: boolean;
  coverLetter: boolean;
}

export interface Application {
  id: string;
  jobTitle: string;
  company: string;
  companyInitials: string;
  contractType: ContractType;
  salaryLabel: string;
  location: string;
  workingStyle: string;
  appliedDateLabel: string;
  appliedDateISO: string;
  status: ApplicationStatus;
  /** How many of the 5 fixed TIMELINE_STEPS have been reached (0-4). */
  timelineStepIndex: number;
  timeline: ApplicationTimelineEntry[];
  companyInfo: ApplicationCompanyInfo;
  documents: ApplicationDocuments;
}

export const APPLICATIONS: Application[] = [
  {
    id: "1",
    jobTitle: "フロントエンドエンジニア（React / TypeScript）",
    company: "合同会社クラウドネスト",
    companyInitials: "ク",
    contractType: "案件",
    salaryLabel: "月額 65万円〜90万円",
    location: "東京都",
    workingStyle: "フルリモート",
    appliedDateLabel: "2026年7月14日",
    appliedDateISO: "2026-07-14",
    status: "応募済み",
    timelineStepIndex: 0,
    timeline: [{ date: "2026年7月14日", status: "応募済み" }],
    companyInfo: {
      industry: "Webシステム受託開発",
      employees: "38名",
      location: "東京都渋谷区",
      website: "https://cloudnest.example.com",
    },
    documents: { resume: true, portfolio: true, coverLetter: false },
  },
  {
    id: "2",
    jobTitle: "バックエンドエンジニア（Python / Django）",
    company: "株式会社データポート",
    companyInitials: "デ",
    contractType: "就職",
    salaryLabel: "年収 520万円〜750万円",
    location: "東京都",
    workingStyle: "一部リモート",
    appliedDateLabel: "2026年7月12日",
    appliedDateISO: "2026-07-12",
    status: "応募済み",
    timelineStepIndex: 0,
    timeline: [{ date: "2026年7月12日", status: "応募済み" }],
    companyInfo: {
      industry: "データ基盤SaaSの開発・提供",
      employees: "72名",
      location: "東京都港区",
      website: "https://dataport.example.com",
    },
    documents: { resume: true, portfolio: false, coverLetter: true },
  },
  {
    id: "3",
    jobTitle: "フルスタックエンジニア（Next.js / Node.js）",
    company: "合同会社ブリッジワークス",
    companyInitials: "ブ",
    contractType: "案件",
    salaryLabel: "月額 70万円〜100万円",
    location: "東京都",
    workingStyle: "フルリモート",
    appliedDateLabel: "2026年7月5日",
    appliedDateISO: "2026-07-05",
    status: "書類選考中",
    timelineStepIndex: 1,
    timeline: [
      { date: "2026年7月5日", status: "応募済み" },
      { date: "2026年7月8日", status: "書類選考中" },
    ],
    companyInfo: {
      industry: "業務システムの受託開発",
      employees: "56名",
      location: "東京都新宿区",
      website: "https://bridgeworks.example.com",
    },
    documents: { resume: true, portfolio: true, coverLetter: true },
  },
  {
    id: "4",
    jobTitle: "インフラエンジニア（AWS / Terraform）",
    company: "株式会社クラウドステージ",
    companyInitials: "ク",
    contractType: "就職",
    salaryLabel: "年収 580万円〜850万円",
    location: "神奈川県",
    workingStyle: "一部リモート",
    appliedDateLabel: "2026年7月2日",
    appliedDateISO: "2026-07-02",
    status: "書類選考中",
    timelineStepIndex: 1,
    timeline: [
      { date: "2026年7月2日", status: "応募済み" },
      { date: "2026年7月6日", status: "書類選考中" },
    ],
    companyInfo: {
      industry: "クラウドインフラ構築・運用支援",
      employees: "110名",
      location: "神奈川県横浜市",
      website: "https://cloudstage.example.com",
    },
    documents: { resume: true, portfolio: false, coverLetter: false },
  },
  {
    id: "5",
    jobTitle: "フロントエンドエンジニア（Vue.js / Nuxt3）",
    company: "株式会社ウェブフォワード",
    companyInitials: "ウ",
    contractType: "就職",
    salaryLabel: "年収 500万円〜700万円",
    location: "東京都",
    workingStyle: "一部リモート",
    appliedDateLabel: "2026年6月28日",
    appliedDateISO: "2026-06-28",
    status: "面接予定",
    timelineStepIndex: 2,
    timeline: [
      { date: "2026年6月28日", status: "応募済み" },
      { date: "2026年7月1日", status: "書類選考中" },
      { date: "2026年7月9日", status: "面接予定", note: "一次面接：7月18日 14:00〜" },
    ],
    companyInfo: {
      industry: "予約管理SaaSの開発・運営",
      employees: "130名",
      location: "東京都港区",
      website: "https://webforward.example.com",
    },
    documents: { resume: true, portfolio: true, coverLetter: true },
  },
  {
    id: "6",
    jobTitle: "モバイルエンジニア（Flutter）",
    company: "株式会社アップリンク",
    companyInitials: "ア",
    contractType: "案件",
    salaryLabel: "月額 68万円〜95万円",
    location: "東京都",
    workingStyle: "フルリモート",
    appliedDateLabel: "2026年6月25日",
    appliedDateISO: "2026-06-25",
    status: "面接予定",
    timelineStepIndex: 2,
    timeline: [
      { date: "2026年6月25日", status: "応募済み" },
      { date: "2026年6月29日", status: "書類選考中" },
      { date: "2026年7月7日", status: "面接予定", note: "一次面接：7月20日 10:30〜" },
    ],
    companyInfo: {
      industry: "モバイルアプリの受託・自社開発",
      employees: "44名",
      location: "東京都渋谷区",
      website: "https://uplink.example.com",
    },
    documents: { resume: true, portfolio: true, coverLetter: false },
  },
  {
    id: "7",
    jobTitle: "SREエンジニア（Kubernetes / Datadog）",
    company: "株式会社リライアビリティ",
    companyInitials: "リ",
    contractType: "案件",
    salaryLabel: "月額 85万円〜115万円",
    location: "東京都",
    workingStyle: "フルリモート",
    appliedDateLabel: "2026年6月18日",
    appliedDateISO: "2026-06-18",
    status: "最終面接",
    timelineStepIndex: 3,
    timeline: [
      { date: "2026年6月18日", status: "応募済み" },
      { date: "2026年6月21日", status: "書類選考中" },
      { date: "2026年6月27日", status: "面接予定", note: "一次面接：6月27日 実施済み" },
      { date: "2026年7月10日", status: "最終面接", note: "最終面接：7月22日 16:00〜" },
    ],
    companyInfo: {
      industry: "SRE・信頼性向上コンサルティング",
      employees: "60名",
      location: "東京都千代田区",
      website: "https://reliability.example.com",
    },
    documents: { resume: true, portfolio: true, coverLetter: true },
  },
  {
    id: "8",
    jobTitle: "AIエンジニア（LLM／RAG）",
    company: "株式会社ニューラルワークス",
    companyInitials: "ニ",
    contractType: "案件",
    salaryLabel: "月額 95万円〜135万円",
    location: "東京都",
    workingStyle: "フルリモート",
    appliedDateLabel: "2026年6月10日",
    appliedDateISO: "2026-06-10",
    status: "内定",
    timelineStepIndex: 4,
    timeline: [
      { date: "2026年6月10日", status: "応募済み" },
      { date: "2026年6月13日", status: "書類選考中" },
      { date: "2026年6月19日", status: "面接予定" },
      { date: "2026年6月27日", status: "最終面接" },
      { date: "2026年7月4日", status: "内定", note: "内定通知を受領しました" },
    ],
    companyInfo: {
      industry: "生成AIプロダクトの開発・導入支援",
      employees: "25名",
      location: "東京都中央区",
      website: "https://neuralworks.example.com",
    },
    documents: { resume: true, portfolio: true, coverLetter: true },
  },
  {
    id: "9",
    jobTitle: "AIエンジニア（機械学習／MLOps）",
    company: "株式会社インサイトフィールド",
    companyInitials: "イ",
    contractType: "就職",
    salaryLabel: "年収 650万円〜920万円",
    location: "東京都",
    workingStyle: "一部リモート",
    appliedDateLabel: "2026年6月8日",
    appliedDateISO: "2026-06-08",
    status: "内定",
    timelineStepIndex: 4,
    timeline: [
      { date: "2026年6月8日", status: "応募済み" },
      { date: "2026年6月12日", status: "書類選考中" },
      { date: "2026年6月20日", status: "面接予定" },
      { date: "2026年6月30日", status: "最終面接" },
      { date: "2026年7月3日", status: "内定", note: "内定通知を受領しました" },
    ],
    companyInfo: {
      industry: "データ分析・機械学習ソリューションの提供",
      employees: "98名",
      location: "東京都千代田区",
      website: "https://insightfield.example.com",
    },
    documents: { resume: true, portfolio: true, coverLetter: false },
  },
  {
    id: "10",
    jobTitle: "バックエンドエンジニア（Java / Spring Boot）",
    company: "株式会社エンタープライズソリューションズ",
    companyInitials: "エ",
    contractType: "就職",
    salaryLabel: "年収 600万円〜880万円",
    location: "大阪府",
    workingStyle: "出社",
    appliedDateLabel: "2026年5月20日",
    appliedDateISO: "2026-05-20",
    status: "契約中",
    timelineStepIndex: 4,
    timeline: [
      { date: "2026年5月20日", status: "応募済み" },
      { date: "2026年5月24日", status: "書類選考中" },
      { date: "2026年6月2日", status: "面接予定" },
      { date: "2026年6月12日", status: "最終面接" },
      { date: "2026年6月18日", status: "内定" },
      { date: "2026年6月25日", status: "契約中", note: "雇用契約を締結しました" },
    ],
    companyInfo: {
      industry: "官公庁・大手企業向けシステム開発",
      employees: "340名",
      location: "大阪府大阪市",
      website: "https://enterprise-solutions.example.com",
    },
    documents: { resume: true, portfolio: false, coverLetter: true },
  },
  {
    id: "11",
    jobTitle: "クラウドエンジニア（GCP / Terraform）",
    company: "株式会社スケールゲート",
    companyInitials: "ス",
    contractType: "案件",
    salaryLabel: "月額 78万円〜108万円",
    location: "東京都",
    workingStyle: "フルリモート",
    appliedDateLabel: "2026年5月12日",
    appliedDateISO: "2026-05-12",
    status: "契約中",
    timelineStepIndex: 4,
    timeline: [
      { date: "2026年5月12日", status: "応募済み" },
      { date: "2026年5月16日", status: "書類選考中" },
      { date: "2026年5月23日", status: "面接予定" },
      { date: "2026年5月30日", status: "最終面接" },
      { date: "2026年6月4日", status: "内定" },
      { date: "2026年6月10日", status: "契約中", note: "業務委託契約を締結しました" },
    ],
    companyInfo: {
      industry: "クラウドインフラ構築支援・SREコンサルティング",
      employees: "41名",
      location: "東京都渋谷区",
      website: "https://scalegate.example.com",
    },
    documents: { resume: true, portfolio: true, coverLetter: true },
  },
  {
    id: "12",
    jobTitle: "QAエンジニア（自動化テスト）",
    company: "株式会社クオリティゲート",
    companyInitials: "ク",
    contractType: "就職",
    salaryLabel: "年収 460万円〜650万円",
    location: "東京都",
    workingStyle: "一部リモート",
    appliedDateLabel: "2026年6月30日",
    appliedDateISO: "2026-06-30",
    status: "不採用",
    timelineStepIndex: 1,
    timeline: [
      { date: "2026年6月30日", status: "応募済み" },
      { date: "2026年7月3日", status: "書類選考中" },
      { date: "2026年7月9日", status: "不採用", note: "今回はご縁がありませんでした" },
    ],
    companyInfo: {
      industry: "品質保証・テスト自動化支援",
      employees: "50名",
      location: "東京都品川区",
      website: "https://qualitygate.example.com",
    },
    documents: { resume: true, portfolio: false, coverLetter: false },
  },
  {
    id: "13",
    jobTitle: "セキュリティエンジニア（SOC運用）",
    company: "株式会社セーフガード",
    companyInitials: "セ",
    contractType: "案件",
    salaryLabel: "月額 82万円〜112万円",
    location: "東京都",
    workingStyle: "フルリモート",
    appliedDateLabel: "2026年6月5日",
    appliedDateISO: "2026-06-05",
    status: "不採用",
    timelineStepIndex: 2,
    timeline: [
      { date: "2026年6月5日", status: "応募済み" },
      { date: "2026年6月9日", status: "書類選考中" },
      { date: "2026年6月16日", status: "面接予定" },
      { date: "2026年6月24日", status: "不採用", note: "今回はご縁がありませんでした" },
    ],
    companyInfo: {
      industry: "セキュリティ診断・SOC運用サービス",
      employees: "63名",
      location: "東京都新宿区",
      website: "https://safeguard.example.com",
    },
    documents: { resume: true, portfolio: false, coverLetter: true },
  },
  {
    id: "14",
    jobTitle: "PM／プロジェクトマネージャー（システム開発）",
    company: "株式会社プロジェクトハブ",
    companyInitials: "プ",
    contractType: "就職",
    salaryLabel: "年収 680万円〜980万円",
    location: "愛知県",
    workingStyle: "一部リモート",
    appliedDateLabel: "2026年6月22日",
    appliedDateISO: "2026-06-22",
    status: "辞退",
    timelineStepIndex: 0,
    timeline: [
      { date: "2026年6月22日", status: "応募済み" },
      { date: "2026年6月26日", status: "辞退", note: "他社の選考を優先するため辞退しました" },
    ],
    companyInfo: {
      industry: "システムインテグレーション",
      employees: "215名",
      location: "愛知県名古屋市",
      website: "https://projecthub.example.com",
    },
    documents: { resume: true, portfolio: false, coverLetter: false },
  },
];
