/**
 * Admin Opportunities (求人・案件) management module placeholder content (Japanese).
 * UI only — no backend, no database, no real publication actions.
 *
 * Manages all four service categories (就職 / 案件 / 時間清算 / 研修) in one
 * system — reuses titles/companies/skills from `@/constants/jobs` (JOBS)
 * for the already-published entries and adds admin-only review/publication
 * metadata on top, rather than duplicating a second job-management system.
 */

import type { AdminNoteEntry } from "@/components/admin/shared/AdminInternalNote";

// ============================================================
// Page meta
// ============================================================

export const ADMIN_OPPORTUNITIES_PAGE = {
  title: "求人・案件管理",
  description: "就職・案件・時間清算・研修の求人・案件を一括で管理できます。",
} as const;

// ============================================================
// Enums / types
// ============================================================

export const ADMIN_OPPORTUNITY_SERVICE_CATEGORIES = ["就職", "案件", "時間清算", "研修"] as const;
export type AdminOpportunityServiceCategory =
  (typeof ADMIN_OPPORTUNITY_SERVICE_CATEGORIES)[number];

export const ADMIN_OPPORTUNITY_PUBLICATION_STATUSES = [
  "公開中",
  "下書き",
  "審査中",
  "非公開",
] as const;
export type AdminOpportunityPublicationStatus =
  (typeof ADMIN_OPPORTUNITY_PUBLICATION_STATUSES)[number];

export const ADMIN_OPPORTUNITY_RECRUITMENT_STATUSES = ["募集中", "募集終了"] as const;
export type AdminOpportunityRecruitmentStatus =
  (typeof ADMIN_OPPORTUNITY_RECRUITMENT_STATUSES)[number];

export const ADMIN_OPPORTUNITY_WORK_STYLES = ["フルリモート", "一部リモート", "出社"] as const;

export const ADMIN_OPPORTUNITY_PUBLICATION_STATUS_TONE: Record<
  AdminOpportunityPublicationStatus,
  "positive" | "neutral" | "warning" | "negative"
> = {
  公開中: "positive",
  下書き: "neutral",
  審査中: "warning",
  非公開: "negative",
};

export const ADMIN_OPPORTUNITY_RECRUITMENT_STATUS_TONE: Record<
  AdminOpportunityRecruitmentStatus,
  "positive" | "neutral"
> = {
  募集中: "positive",
  募集終了: "neutral",
};

// ============================================================
// Summary cards
// ============================================================

export const ADMIN_OPPORTUNITY_SUMMARY_LABELS = {
  total: "全求人・案件",
  published: "公開中",
  draft: "下書き",
  underReview: "審査中",
  closed: "募集終了",
  unpublished: "非公開",
} as const;

// ============================================================
// Search / filters
// ============================================================

export const ADMIN_OPPORTUNITY_SEARCH_LABELS = {
  label: "求人・案件を検索",
  placeholder: "タイトル・企業名・スキル・求人IDで検索",
} as const;

export const ADMIN_OPPORTUNITY_FILTER_LABELS = {
  title: "絞り込み条件",
  serviceCategory: "サービス区分",
  contractType: "契約形態",
  publicationStatus: "公開状態",
  recruitmentStatus: "募集状態",
  workStyle: "勤務形態",
  postedWithin: "投稿日",
  resetLabel: "条件をリセット",
} as const;

export const ADMIN_OPPORTUNITY_DATE_RANGE_OPTIONS = [
  { label: "指定なし", days: null },
  { label: "7日以内", days: 7 },
  { label: "30日以内", days: 30 },
  { label: "90日以内", days: 90 },
] as const;

export interface AdminOpportunityFilterState {
  serviceCategories: AdminOpportunityServiceCategory[];
  contractTypes: string[];
  publicationStatuses: AdminOpportunityPublicationStatus[];
  recruitmentStatuses: AdminOpportunityRecruitmentStatus[];
  workStyles: string[];
  postedWithinDays: number | null;
}

export const DEFAULT_ADMIN_OPPORTUNITY_FILTER_STATE: AdminOpportunityFilterState = {
  serviceCategories: [],
  contractTypes: [],
  publicationStatuses: [],
  recruitmentStatuses: [],
  workStyles: [],
  postedWithinDays: null,
};

// ============================================================
// Table / actions
// ============================================================

export const ADMIN_OPPORTUNITY_TABLE_COLUMNS = [
  "タイトル",
  "企業",
  "区分",
  "契約形態",
  "応募数",
  "公開状態",
  "募集状態",
  "投稿日",
  "操作",
] as const;

export const ADMIN_OPPORTUNITY_ACTION_LABELS = {
  viewDetails: "詳細を見る",
  publish: "公開承認",
  unpublish: "非公開化",
  suspend: "掲載停止",
  requestEdit: "編集依頼",
  delete: "削除",
} as const;

export const ADMIN_OPPORTUNITY_RESULTS_META = {
  resultsSuffix: "件の求人・案件",
} as const;

// ============================================================
// Action dialogs
// ============================================================

export const ADMIN_OPPORTUNITY_ACTION_DIALOG_LABELS = {
  publishTitle: "この求人・案件を公開承認しますか？",
  publishDescription: "承認すると、求人・案件が検索結果に公開されます。",
  publishConfirmLabel: "公開承認する",
  unpublishTitle: "この求人・案件を非公開にしますか？",
  unpublishDescription: "非公開にすると、検索結果に表示されなくなります。",
  unpublishConfirmLabel: "非公開にする",
  suspendTitle: "この求人・案件の掲載を停止しますか？",
  suspendDescription: "掲載停止の理由を入力してください。企業に通知されます。",
  suspendConfirmLabel: "掲載停止する",
  requestEditTitle: "編集を依頼しますか？",
  requestEditDescription: "修正が必要な内容を入力してください。企業に通知されます。",
  requestEditConfirmLabel: "編集を依頼する",
  deleteTitle: "この求人・案件を削除しますか？",
  deleteDescription: "この操作は取り消せません。削除理由を入力してください。",
  deleteConfirmLabel: "削除する",
  reasonLabel: "理由",
  reasonPlaceholder: "対応理由を入力してください",
  cancelLabel: "キャンセル",
} as const;

export const ADMIN_OPPORTUNITY_TOAST_MESSAGES = {
  published: "求人・案件を公開承認しました。",
  unpublished: "求人・案件を非公開にしました。",
  suspended: "求人・案件の掲載を停止しました。",
  editRequested: "編集依頼を送信しました。",
  deleted: "求人・案件を削除しました。",
} as const;

export const ADMIN_OPPORTUNITY_DEMO_NOTE =
  "※ UIデモのため、実際の掲載操作は行われません。";

// ============================================================
// Detail page section labels
// ============================================================

export const ADMIN_OPPORTUNITY_DETAIL_SECTIONS = {
  basicInfo: "基本情報",
  recruitmentContent: "募集内容",
  contractConditions: "契約条件",
  requiredSkills: "必要スキル",
  applications: "応募状況",
  company: "掲載企業",
  publicationHistory: "公開履歴",
  reportHistory: "通報履歴",
  internalNotes: "管理メモ",
} as const;

export const ADMIN_OPPORTUNITY_NOT_FOUND = {
  title: "求人・案件が見つかりませんでした。",
  description: "指定された求人・案件IDは存在しないか、削除された可能性があります。",
  ctaLabel: "求人・案件一覧に戻る",
  ctaHref: "/admin/opportunities",
} as const;

// ============================================================
// Mock data
// ============================================================

export interface AdminOpportunityHistoryEntry {
  id: string;
  action: string;
  actor: string;
  reason: string | null;
  dateLabel: string;
}

export interface AdminOpportunityReportEntry {
  id: string;
  category: string;
  reporter: string;
  dateLabel: string;
}

export interface AdminOpportunity {
  id: string;
  title: string;
  company: string;
  companyId: string | null;
  serviceCategory: AdminOpportunityServiceCategory;
  contractType: string;
  location: string;
  workStyle: string;
  salaryLabel: string;
  requiredSkills: string[];
  description: string;
  applicantCount: number;
  publicationStatus: AdminOpportunityPublicationStatus;
  recruitmentStatus: AdminOpportunityRecruitmentStatus;
  postedDateLabel: string;
  postedDateISO: string;
  publicationHistory: AdminOpportunityHistoryEntry[];
  reportHistory: AdminOpportunityReportEntry[];
  internalNotes: AdminNoteEntry[];
}

export const ADMIN_OPPORTUNITIES: AdminOpportunity[] = [
  {
    id: "j-201",
    title: "バックエンドエンジニア（Java / Spring Boot）",
    company: "株式会社テックイノベーション",
    companyId: "c-001",
    serviceCategory: "就職",
    contractType: "就職",
    location: "東京都",
    workStyle: "出社",
    salaryLabel: "年収 500万円〜800万円",
    requiredSkills: ["Java", "Spring Boot", "PostgreSQL"],
    description: "自社SaaSプロダクトのバックエンド開発をリードするポジションです。",
    applicantCount: 0,
    publicationStatus: "審査中",
    recruitmentStatus: "募集中",
    postedDateLabel: "2026年7月16日",
    postedDateISO: "2026-07-16",
    publicationHistory: [
      { id: "ph-1", action: "掲載申請", actor: "採用担当 佐藤", reason: null, dateLabel: "2026年7月16日" },
    ],
    reportHistory: [],
    internalNotes: [],
  },
  {
    id: "j-202",
    title: "AIエンジニア（Python / 機械学習）",
    company: "株式会社ニューラルゲート",
    companyId: null,
    serviceCategory: "案件",
    contractType: "案件",
    location: "東京都",
    workStyle: "フルリモート",
    salaryLabel: "月額 90万円〜130万円",
    requiredSkills: ["Python", "LLM", "RAG"],
    description: "生成AIを活用した社内向けナレッジ検索サービスの開発。",
    applicantCount: 0,
    publicationStatus: "審査中",
    recruitmentStatus: "募集中",
    postedDateLabel: "2026年7月15日",
    postedDateISO: "2026-07-15",
    publicationHistory: [
      { id: "ph-2", action: "掲載申請", actor: "採用担当", reason: null, dateLabel: "2026年7月15日" },
    ],
    reportHistory: [],
    internalNotes: [],
  },
  {
    id: "j-203",
    title: "セキュリティエンジニア（SOC運用）",
    company: "株式会社ゼロトラスト",
    companyId: "c-003",
    serviceCategory: "案件",
    contractType: "案件",
    location: "東京都",
    workStyle: "フルリモート",
    salaryLabel: "月額 80万円〜110万円",
    requiredSkills: ["脆弱性診断", "ネットワークセキュリティ", "インシデント対応"],
    description: "自社および顧客システムのセキュリティ診断・監視を担当。",
    applicantCount: 0,
    publicationStatus: "審査中",
    recruitmentStatus: "募集中",
    postedDateLabel: "2026年7月13日",
    postedDateISO: "2026-07-13",
    publicationHistory: [
      { id: "ph-3", action: "掲載申請", actor: "採用担当 石井", reason: null, dateLabel: "2026年7月13日" },
      { id: "ph-4", action: "内容確認中", actor: "管理者 佐々木", reason: null, dateLabel: "2026年7月14日" },
    ],
    reportHistory: [],
    internalNotes: [],
  },
  {
    id: "1",
    title: "フロントエンドエンジニア（React / TypeScript）",
    company: "合同会社クラウドフォース",
    companyId: "c-002",
    serviceCategory: "案件",
    contractType: "案件",
    location: "東京都",
    workStyle: "フルリモート",
    salaryLabel: "月額 60万円〜90万円",
    requiredSkills: ["React", "TypeScript", "Next.js", "HTML/CSS"],
    description: "大手小売企業向けECサイトのフロントエンド刷新プロジェクト。",
    applicantCount: 6,
    publicationStatus: "公開中",
    recruitmentStatus: "募集中",
    postedDateLabel: "2026年7月14日",
    postedDateISO: "2026-07-14",
    publicationHistory: [
      { id: "ph-5", action: "公開承認", actor: "管理者 伊藤", reason: null, dateLabel: "2026年7月14日" },
    ],
    reportHistory: [],
    internalNotes: [],
  },
  {
    id: "2",
    title: "フロントエンドエンジニア（Vue.js / Nuxt3）",
    company: "株式会社ウェブブリッジ",
    companyId: null,
    serviceCategory: "就職",
    contractType: "就職",
    location: "東京都",
    workStyle: "一部リモート",
    salaryLabel: "年収 480万円〜700万円",
    requiredSkills: ["Vue.js", "Nuxt3", "TypeScript"],
    description: "自社予約管理SaaSのフロントエンド開発。",
    applicantCount: 3,
    publicationStatus: "公開中",
    recruitmentStatus: "募集中",
    postedDateLabel: "2026年7月9日",
    postedDateISO: "2026-07-09",
    publicationHistory: [
      { id: "ph-6", action: "公開承認", actor: "管理者 松本", reason: null, dateLabel: "2026年7月9日" },
    ],
    reportHistory: [],
    internalNotes: [],
  },
  {
    id: "3",
    title: "バックエンドエンジニア（Java / Spring Boot）",
    company: "株式会社テックイノベーション",
    companyId: "c-001",
    serviceCategory: "就職",
    contractType: "就職",
    location: "東京都",
    workStyle: "出社",
    salaryLabel: "年収 500万円〜800万円",
    requiredSkills: ["Java", "Spring Boot", "PostgreSQL"],
    description: "自社SaaSプロダクトのバックエンド開発をリードするポジション。",
    applicantCount: 9,
    publicationStatus: "公開中",
    recruitmentStatus: "募集中",
    postedDateLabel: "2026年7月14日",
    postedDateISO: "2026-07-14",
    publicationHistory: [
      { id: "ph-7", action: "公開承認", actor: "管理者 伊藤", reason: null, dateLabel: "2026年7月14日" },
    ],
    reportHistory: [
      { id: "rep-1", category: "虚偽情報", reporter: "エンジニア 鈴木 美咲", dateLabel: "2026年7月16日" },
    ],
    internalNotes: [
      { id: "note-1", author: "管理者 佐々木", body: "掲載内容と実態の相違について通報あり。企業に確認中。", dateLabel: "2026年7月16日" },
    ],
  },
  {
    id: "4",
    title: "バックエンドエンジニア（Go）",
    company: "株式会社ゼロトラスト",
    companyId: "c-003",
    serviceCategory: "案件",
    contractType: "案件",
    location: "東京都",
    workStyle: "フルリモート",
    salaryLabel: "月額 70万円〜100万円",
    requiredSkills: ["Go", "PostgreSQL", "Docker"],
    description: "認証基盤SaaSのバックエンドAPI開発。",
    applicantCount: 2,
    publicationStatus: "公開中",
    recruitmentStatus: "募集中",
    postedDateLabel: "2026年7月11日",
    postedDateISO: "2026-07-11",
    publicationHistory: [
      { id: "ph-8", action: "公開承認", actor: "管理者 松本", reason: null, dateLabel: "2026年7月11日" },
    ],
    reportHistory: [],
    internalNotes: [],
  },
  {
    id: "5",
    title: "フルスタックエンジニア（Next.js / Node.js）",
    company: "株式会社アナリティクスラボ",
    companyId: null,
    serviceCategory: "案件",
    contractType: "案件",
    location: "東京都",
    workStyle: "フルリモート",
    salaryLabel: "月額 65万円〜95万円",
    requiredSkills: ["Next.js", "Node.js", "TypeScript", "PostgreSQL"],
    description: "データ分析ダッシュボードSaaSの開発チーム。",
    applicantCount: 4,
    publicationStatus: "公開中",
    recruitmentStatus: "募集中",
    postedDateLabel: "2026年7月12日",
    postedDateISO: "2026-07-12",
    publicationHistory: [
      { id: "ph-9", action: "公開承認", actor: "管理者 伊藤", reason: null, dateLabel: "2026年7月12日" },
    ],
    reportHistory: [],
    internalNotes: [],
  },
  {
    id: "6",
    title: "フルスタックエンジニア（TypeScript / AWS）",
    company: "株式会社デジタルブリッジ",
    companyId: "c-004",
    serviceCategory: "時間清算",
    contractType: "時間清算",
    location: "東京都",
    workStyle: "一部リモート",
    salaryLabel: "時間単価 4,500円〜6,000円",
    requiredSkills: ["TypeScript", "React", "AWS", "Node.js"],
    description: "受託開発案件のフルスタックエンジニア募集。",
    applicantCount: 2,
    publicationStatus: "非公開",
    recruitmentStatus: "募集終了",
    postedDateLabel: "2026年7月8日",
    postedDateISO: "2026-07-08",
    publicationHistory: [
      { id: "ph-10", action: "公開承認", actor: "管理者 佐々木", reason: null, dateLabel: "2026年7月8日" },
      {
        id: "ph-11",
        action: "非公開化",
        actor: "管理者 松本",
        reason: "企業アカウントの利用停止に伴い非公開化。",
        dateLabel: "2026年7月15日",
      },
    ],
    reportHistory: [],
    internalNotes: [],
  },
  {
    id: "7",
    title: "クラウドエンジニア（AWS）",
    company: "株式会社インフラネクスト",
    companyId: null,
    serviceCategory: "就職",
    contractType: "就職",
    location: "東京都",
    workStyle: "出社",
    salaryLabel: "年収 550万円〜850万円",
    requiredSkills: ["AWS", "Docker", "Linux"],
    description: "自社サービスのクラウドインフラ設計・構築・運用。",
    applicantCount: 5,
    publicationStatus: "公開中",
    recruitmentStatus: "募集中",
    postedDateLabel: "2026年7月10日",
    postedDateISO: "2026-07-10",
    publicationHistory: [
      { id: "ph-12", action: "公開承認", actor: "管理者 伊藤", reason: null, dateLabel: "2026年7月10日" },
    ],
    reportHistory: [],
    internalNotes: [],
  },
  {
    id: "8",
    title: "クラウドエンジニア（GCP / Terraform）",
    company: "株式会社スケールワークス",
    companyId: "c-006",
    serviceCategory: "案件",
    contractType: "案件",
    location: "東京都",
    workStyle: "フルリモート",
    salaryLabel: "月額 75万円〜105万円",
    requiredSkills: ["GCP", "Terraform", "Kubernetes"],
    description: "GCP上で稼働するマイクロサービス基盤の設計・構築。",
    applicantCount: 0,
    publicationStatus: "下書き",
    recruitmentStatus: "募集中",
    postedDateLabel: "2026年7月13日",
    postedDateISO: "2026-07-13",
    publicationHistory: [
      { id: "ph-13", action: "下書き保存", actor: "採用担当 川口", reason: null, dateLabel: "2026年7月13日" },
    ],
    reportHistory: [],
    internalNotes: [],
  },
  {
    id: "9",
    title: "AIエンジニア（Python / 機械学習）",
    company: "株式会社データフォレスト",
    companyId: "c-005",
    serviceCategory: "就職",
    contractType: "就職",
    location: "東京都",
    workStyle: "一部リモート",
    salaryLabel: "年収 600万円〜900万円",
    requiredSkills: ["Python", "機械学習", "SQL"],
    description: "需要予測モデルの開発・改善を担当するAIエンジニア。",
    applicantCount: 5,
    publicationStatus: "公開中",
    recruitmentStatus: "募集中",
    postedDateLabel: "2026年7月14日",
    postedDateISO: "2026-07-14",
    publicationHistory: [
      { id: "ph-14", action: "公開承認", actor: "管理者 伊藤", reason: null, dateLabel: "2026年7月14日" },
    ],
    reportHistory: [],
    internalNotes: [],
  },
  {
    id: "10",
    title: "AIエンジニア（LLM／生成AI）",
    company: "株式会社ニューラルゲート",
    companyId: null,
    serviceCategory: "案件",
    contractType: "案件",
    location: "東京都",
    workStyle: "フルリモート",
    salaryLabel: "月額 90万円〜130万円",
    requiredSkills: ["Python", "LLM", "RAG"],
    description: "生成AIを活用した社内向けナレッジ検索サービスの開発。",
    applicantCount: 4,
    publicationStatus: "公開中",
    recruitmentStatus: "募集中",
    postedDateLabel: "2026年7月15日",
    postedDateISO: "2026-07-15",
    publicationHistory: [
      { id: "ph-15", action: "公開承認", actor: "管理者 松本", reason: null, dateLabel: "2026年7月15日" },
    ],
    reportHistory: [],
    internalNotes: [],
  },
  {
    id: "11",
    title: "DevOpsエンジニア（Kubernetes / CI/CD）",
    company: "株式会社パイプラインワークス",
    companyId: null,
    serviceCategory: "案件",
    contractType: "案件",
    location: "神奈川県",
    workStyle: "フルリモート",
    salaryLabel: "月額 70万円〜100万円",
    requiredSkills: ["Kubernetes", "Docker", "CI/CD"],
    description: "CI/CDパイプラインの整備とKubernetes基盤の運用改善。",
    applicantCount: 1,
    publicationStatus: "公開中",
    recruitmentStatus: "募集終了",
    postedDateLabel: "2026年7月11日",
    postedDateISO: "2026-07-11",
    publicationHistory: [
      { id: "ph-16", action: "公開承認", actor: "管理者 伊藤", reason: null, dateLabel: "2026年7月11日" },
      { id: "ph-17", action: "募集終了", actor: "採用担当", reason: null, dateLabel: "2026年7月17日" },
    ],
    reportHistory: [],
    internalNotes: [],
  },
  {
    id: "12",
    title: "PM／プロジェクトマネージャー（システム開発）",
    company: "株式会社ブリッジソリューションズ",
    companyId: null,
    serviceCategory: "就職",
    contractType: "就職",
    location: "大阪府",
    workStyle: "一部リモート",
    salaryLabel: "年収 650万円〜950万円",
    requiredSkills: ["プロジェクトマネジメント", "要件定義"],
    description: "官公庁・大手企業向けシステム開発プロジェクトのPM。",
    applicantCount: 0,
    publicationStatus: "公開中",
    recruitmentStatus: "募集中",
    postedDateLabel: "2026年7月9日",
    postedDateISO: "2026-07-09",
    publicationHistory: [
      { id: "ph-18", action: "公開承認", actor: "管理者 松本", reason: null, dateLabel: "2026年7月9日" },
    ],
    reportHistory: [],
    internalNotes: [],
  },
  {
    id: "13",
    title: "QAエンジニア（自動化テスト）",
    company: "株式会社クオリティファースト",
    companyId: null,
    serviceCategory: "就職",
    contractType: "就職",
    location: "東京都",
    workStyle: "一部リモート",
    salaryLabel: "年収 480万円〜680万円",
    requiredSkills: ["テスト設計", "Selenium", "JSTQB Foundation Level"],
    description: "自社SaaSプロダクトのQAエンジニア。",
    applicantCount: 2,
    publicationStatus: "公開中",
    recruitmentStatus: "募集中",
    postedDateLabel: "2026年7月14日",
    postedDateISO: "2026-07-14",
    publicationHistory: [
      { id: "ph-19", action: "公開承認", actor: "管理者 伊藤", reason: null, dateLabel: "2026年7月14日" },
    ],
    reportHistory: [],
    internalNotes: [],
  },
  {
    id: "15",
    title: "フルスタックエンジニア（Ruby on Rails）",
    company: "株式会社グロースパートナーズ",
    companyId: null,
    serviceCategory: "就職",
    contractType: "就職",
    location: "愛知県",
    workStyle: "一部リモート",
    salaryLabel: "年収 500万円〜750万円",
    requiredSkills: ["Ruby on Rails", "PostgreSQL"],
    description: "地域産業向け業務システムを開発する自社プロダクトチーム。",
    applicantCount: 0,
    publicationStatus: "下書き",
    recruitmentStatus: "募集中",
    postedDateLabel: "2026年7月10日",
    postedDateISO: "2026-07-10",
    publicationHistory: [
      { id: "ph-20", action: "下書き保存", actor: "採用担当", reason: null, dateLabel: "2026年7月10日" },
    ],
    reportHistory: [],
    internalNotes: [],
  },
  {
    id: "tr-001",
    title: "新人エンジニア向け実践研修（React / TypeScript基礎）",
    company: "株式会社テックイノベーション",
    companyId: "c-001",
    serviceCategory: "研修",
    contractType: "研修",
    location: "東京都",
    workStyle: "一部リモート",
    salaryLabel: "受講料 無料（企業提供研修）",
    requiredSkills: ["React", "TypeScript", "HTML/CSS"],
    description: "未経験・第二新卒エンジニア向けの実践型フロントエンド研修プログラム。",
    applicantCount: 3,
    publicationStatus: "公開中",
    recruitmentStatus: "募集中",
    postedDateLabel: "2026年7月5日",
    postedDateISO: "2026-07-05",
    publicationHistory: [
      { id: "ph-21", action: "公開承認", actor: "管理者 佐々木", reason: null, dateLabel: "2026年7月5日" },
    ],
    reportHistory: [],
    internalNotes: [],
  },
  {
    id: "tr-002",
    title: "クラウドインフラ入門研修（AWS基礎）",
    company: "株式会社インフラネクスト",
    companyId: null,
    serviceCategory: "研修",
    contractType: "研修",
    location: "東京都",
    workStyle: "フルリモート",
    salaryLabel: "受講料 無料（企業提供研修）",
    requiredSkills: ["AWS", "Linux"],
    description: "インフラエンジニアを目指す方向けのAWS基礎研修プログラム。",
    applicantCount: 0,
    publicationStatus: "審査中",
    recruitmentStatus: "募集中",
    postedDateLabel: "2026年7月17日",
    postedDateISO: "2026-07-17",
    publicationHistory: [
      { id: "ph-22", action: "掲載申請", actor: "採用担当", reason: null, dateLabel: "2026年7月17日" },
    ],
    reportHistory: [],
    internalNotes: [],
  },
];
