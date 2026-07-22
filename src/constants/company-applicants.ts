/**
 * Company applicant management module placeholder content (Japanese).
 * UI only — no backend, no real data, no authentication.
 */

// ============================================================
// Page meta
// ============================================================

export const APPLICANTS_PAGE = {
  title: "応募者管理",
  description: "求人・案件への応募者を確認・管理できます。",
} as const;

// ============================================================
// Status
// ============================================================

export const APPLICANT_STATUSES = [
  "応募受付",
  "書類選考中",
  "一次面接",
  "最終面接",
  "内定",
  "採用",
  "不採用",
  "辞退",
] as const;

export type ApplicantStatus = (typeof APPLICANT_STATUSES)[number];

export const APPLICANT_STATUS_BADGE_STYLES: Record<ApplicantStatus, string> = {
  応募受付: "bg-blue-50 text-blue-700",
  書類選考中: "bg-indigo-50 text-indigo-700",
  一次面接: "bg-amber-50 text-amber-700",
  最終面接: "bg-orange-50 text-orange-700",
  内定: "bg-green-50 text-green-700",
  採用: "bg-emerald-50 text-emerald-700",
  不採用: "bg-red-50 text-red-700",
  辞退: "bg-gray-100 text-gray-600",
};

/** Next status in the standard pipeline; null when terminal (no further forward step). */
export const STATUS_NEXT_STEP: Record<ApplicantStatus, ApplicantStatus | null> = {
  応募受付: "書類選考中",
  書類選考中: "一次面接",
  一次面接: "最終面接",
  最終面接: "内定",
  内定: "採用",
  採用: null,
  不採用: null,
  辞退: null,
};

/** Statuses from which the applicant can still be moved forward or rejected. */
export const ACTIVE_STATUSES: readonly ApplicantStatus[] = [
  "応募受付",
  "書類選考中",
  "一次面接",
  "最終面接",
  "内定",
];

export const TIMELINE_STEPS = [
  "応募",
  "書類選考",
  "一次面接",
  "最終面接",
  "内定",
  "採用",
] as const;

// ============================================================
// Filter vocabulary
// ============================================================

export const ITSS_LEVEL_OPTIONS = [1, 2, 3, 4, 5, 6, 7] as const;

export const LOCATION_OPTIONS = [
  "東京都",
  "神奈川県",
  "大阪府",
  "愛知県",
  "福岡県",
] as const;

export const EXPERIENCE_FILTER_OPTIONS = [
  { label: "指定なし", years: null },
  { label: "1年以上", years: 1 },
  { label: "3年以上", years: 3 },
  { label: "5年以上", years: 5 },
] as const;

export const SORT_OPTIONS = [
  { value: "newest", label: "新しい順" },
  { value: "oldest", label: "古い順" },
  { value: "experience", label: "経験年数順" },
  { value: "itss", label: "ITSSレベル順" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

// ============================================================
// Summary cards
// ============================================================

export const SUMMARY_CARDS = [
  {
    key: "total",
    label: "応募総数",
    icon: "users",
    statuses: null as readonly ApplicantStatus[] | null,
  },
  {
    key: "screening",
    label: "書類選考",
    icon: "fileText",
    statuses: ["書類選考中"] as readonly ApplicantStatus[],
  },
  {
    key: "interviewing",
    label: "面接中",
    icon: "messagesSquare",
    statuses: ["一次面接", "最終面接"] as readonly ApplicantStatus[],
  },
  {
    key: "hired",
    label: "採用",
    icon: "userCheck",
    statuses: ["採用"] as readonly ApplicantStatus[],
  },
] as const;

// ============================================================
// Search / filters
// ============================================================

export const SEARCH_LABELS = {
  label: "応募者を検索",
  placeholder: "応募者を検索",
} as const;

export const FILTER_LABELS = {
  title: "絞り込み条件",
  statusLabel: "ステータス",
  statusAllLabel: "すべてのステータス",
  appliedJobLabel: "応募求人",
  appliedJobAllLabel: "すべての求人",
  experienceLabel: "経験年数",
  itssLabel: "ITSSレベル",
  itssAllLabel: "すべてのレベル",
  locationLabel: "勤務地",
  locationAllLabel: "すべての勤務地",
  sortLabel: "並び替え",
  resetLabel: "条件をリセット",
} as const;

export const APPLICANT_LIST_META = {
  resultsSuffix: "名の応募者が見つかりました",
  detailButtonLabel: "詳細を見る",
  appliedPrefix: "応募日：",
} as const;

export const EMPTY_STATE_LABELS = {
  title: "応募者はまだいません。",
  description: "求人・案件を公開すると、ここに応募者が表示されます。",
} as const;

export const FILTERED_EMPTY_STATE_LABELS = {
  title: "条件に一致する応募者が見つかりませんでした。",
  description: "検索キーワードや絞り込み条件を変更してお試しください。",
  ctaLabel: "条件をリセット",
} as const;

// ============================================================
// Applicant detail — section labels
// ============================================================

export const APPLICANT_DETAIL_META = {
  backLabel: "応募者一覧に戻る",
  backHref: "/company/applicants",
  profileSummaryTitle: "プロフィール概要",
  skillsTitle: "スキル",
  experienceTitle: "職務経歴",
  educationTitle: "学歴",
  certificationsTitle: "資格",
  portfolioTitle: "ポートフォリオ",
  documentsTitle: "提出書類",
  evaluationTitle: "選考評価",
  timelineTitle: "選考タイムライン",
  notesTitle: "採用担当メモ",
  changeStatusLabel: "ステータスを変更",
  rejectLabel: "不採用にする",
} as const;

export const DOCUMENT_LABELS = {
  resume: "履歴書",
  workHistory: "職務経歴書",
  portfolio: "ポートフォリオ",
  coverLetter: "カバーレター",
  viewLabel: "閲覧",
  downloadLabel: "ダウンロード",
  notSubmittedLabel: "未提出",
  demoNote: "※ 現在はUIデモのため、実際のファイルは保存されていません。",
} as const;

export const EVALUATION_LABELS = {
  overall: "総合評価",
  technical: "技術力",
  communication: "コミュニケーション",
  business: "ビジネススキル",
  comment: "コメント",
  notEvaluatedMessage: "まだ評価が登録されていません。",
  readOnlyNote: "※ 選考担当者による評価です（読み取り専用のモックデータ）。",
} as const;

// ============================================================
// Status change dialog
// ============================================================

export const STATUS_CHANGE_DIALOG_LABELS = {
  title: "選考ステータスを変更しますか？",
  descriptionPrefix: "ステータスを次の段階に進めます：",
  cancelLabel: "キャンセル",
  confirmLabel: "変更する",
  toastMessage: "ステータスを変更しました。",
} as const;

// ============================================================
// Reject dialog
// ============================================================

export const REJECT_REASON_OPTIONS = [
  "スキル・経験のミスマッチ",
  "経験年数が不足している",
  "カルチャーフィットの懸念",
  "他候補者を優先",
  "希望条件の不一致（給与・勤務地等）",
  "選考辞退（企業都合）",
  "その他",
] as const;

export const REJECT_DIALOG_LABELS = {
  title: "この応募者を不採用にしますか？",
  description: "この操作はデモ表示のため実際には保存されません。",
  reasonLabel: "不採用理由",
  reasonPlaceholder: "理由を選択してください",
  commentLabel: "コメント（任意）",
  commentPlaceholder: "選考メモとして残したいコメントがあれば入力してください",
  cancelLabel: "キャンセル",
  confirmLabel: "不採用にする",
  toastMessage: "不採用にしました。",
} as const;

// ============================================================
// Applicants (20 mock records)
// ============================================================

export interface ApplicantEducation {
  school: string;
  department: string;
  period: string;
}

export interface ApplicantCertification {
  name: string;
  issuer: string;
  acquiredDate: string;
}

export interface ApplicantPortfolioItem {
  title: string;
  role: string;
  description: string;
  skills: string[];
  url: string;
  period: string;
}

export interface ApplicantExperienceItem {
  company: string;
  position: string;
  period: string;
  employmentType: string;
  summary: string;
  technologies: string[];
}

export interface ApplicantDocuments {
  resume: boolean;
  workHistory: boolean;
  portfolio: boolean;
  coverLetter: boolean;
}

export interface ApplicantEvaluationData {
  overall: number;
  technical: number;
  communication: number;
  business: number;
  comment: string;
}

export interface ApplicantTimelineEntry {
  date: string;
  status: ApplicantStatus;
  note?: string;
}

export interface Applicant {
  id: string;
  name: string;
  photoInitials: string;
  currentTitle: string;
  bio: string;
  email: string;
  phone: string;
  appliedJobId: string;
  appliedJobTitle: string;
  company: string;
  experienceYears: number;
  location: string;
  itssLevel: (typeof ITSS_LEVEL_OPTIONS)[number];
  skills: string[];
  education: ApplicantEducation[];
  certifications: ApplicantCertification[];
  portfolio: ApplicantPortfolioItem[];
  experience: ApplicantExperienceItem[];
  documents: ApplicantDocuments;
  appliedDateLabel: string;
  appliedDateISO: string;
  status: ApplicantStatus;
  timelineStepIndex: number;
  timeline: ApplicantTimelineEntry[];
  evaluation: ApplicantEvaluationData | null;
  notes: string;
}

// This applicant-management module is still fully placeholder/demo (per
// this file's header) — unrelated to the real Company Job Posting CRUD in
// src/lib/company/jobs.ts. Previously looked up titles from the
// company-jobs.ts mock array, which no longer exists now that job postings
// are real Supabase data; the same demo id->title pairs are kept here
// directly so this demo page's displayed content is unchanged.
const DEMO_JOB_TITLES: Record<string, string> = {
  "1": "バックエンドエンジニア（Java / Spring Boot）",
  "2": "フロントエンドエンジニア（React / TypeScript）",
  "3": "インフラエンジニア（AWS / Kubernetes）",
  "4": "AIエンジニア（Python / 機械学習）",
  "5": "QAエンジニア（自動化テスト）",
  "6": "セキュリティエンジニア（SOC運用）",
  "8": "PM／プロジェクトマネージャー（システム開発）",
  "11": "データエンジニア（Python / GCP）",
  "12": "DevOpsエンジニア（Kubernetes / CI/CD）",
};

function jobTitleOf(id: string): string {
  return DEMO_JOB_TITLES[id] ?? "";
}

const COMPANY_NAME = "株式会社テックイノベーション";

export const APPLICANTS: Applicant[] = [
  {
    id: "1",
    name: "佐藤 健太",
    photoInitials: "佐",
    currentTitle: "フロントエンドエンジニア",
    bio: "EC・SaaSプロダクトのフロントエンド開発を中心に4年間従事。パフォーマンス改善とデザインシステム構築が得意です。",
    email: "kenta.sato@example.com",
    phone: "090-1111-2222",
    appliedJobId: "1",
    appliedJobTitle: jobTitleOf("1"),
    company: COMPANY_NAME,
    experienceYears: 4,
    location: "東京都",
    itssLevel: 3,
    skills: ["Java", "Spring Boot", "PostgreSQL", "AWS", "Docker"],
    education: [
      { school: "東京工業大学", department: "情報工学科", period: "2016年4月〜2020年3月" },
    ],
    certifications: [
      { name: "AWS認定ソリューションアーキテクト", issuer: "Amazon Web Services", acquiredDate: "2023年5月" },
    ],
    portfolio: [
      {
        title: "社内業務効率化ツール",
        role: "バックエンド開発リード",
        description: "Spring Bootで社内申請ワークフローを刷新し、処理時間を60%短縮しました。",
        skills: ["Java", "Spring Boot", "PostgreSQL"],
        url: "https://github.com/example/workflow-tool",
        period: "2023年〜2024年",
      },
    ],
    experience: [
      {
        company: "株式会社ネクストシステムズ",
        position: "バックエンドエンジニア",
        period: "2020年4月〜現在",
        employmentType: "正社員",
        summary: "自社SaaSのAPI開発・DB設計を担当。マイクロサービス移行プロジェクトを主導。",
        technologies: ["Java", "Spring Boot", "PostgreSQL", "AWS"],
      },
    ],
    documents: { resume: true, workHistory: true, portfolio: true, coverLetter: true },
    appliedDateLabel: "2026年7月12日",
    appliedDateISO: "2026-07-12",
    status: "書類選考中",
    timelineStepIndex: 1,
    timeline: [
      { date: "2026年7月12日", status: "応募受付" },
      { date: "2026年7月13日", status: "書類選考中" },
    ],
    evaluation: null,
    notes: "スキルシート記載の実績が具体的で好印象。面接で技術的な深掘りをしたい。",
  },
  {
    id: "2",
    name: "田中 美咲",
    photoInitials: "田",
    currentTitle: "バックエンドエンジニア",
    bio: "金融系・SaaS系のバックエンド開発経験があり、大規模データ処理基盤の構築が得意です。",
    email: "misaki.tanaka@example.com",
    phone: "090-2222-3333",
    appliedJobId: "1",
    appliedJobTitle: jobTitleOf("1"),
    company: COMPANY_NAME,
    experienceYears: 6,
    location: "東京都",
    itssLevel: 4,
    skills: ["Java", "Spring Boot", "PostgreSQL", "Kubernetes", "Kafka"],
    education: [
      { school: "早稲田大学", department: "基幹理工学部", period: "2014年4月〜2018年3月" },
    ],
    certifications: [
      { name: "Java Gold SE 11", issuer: "Oracle", acquiredDate: "2021年3月" },
      { name: "AWS認定デベロッパー", issuer: "Amazon Web Services", acquiredDate: "2022年8月" },
    ],
    portfolio: [
      {
        title: "決済基盤リプレイス",
        role: "テックリード",
        description: "レガシー決済システムをマイクロサービス化し、可用性を99.99%まで改善。",
        skills: ["Java", "Kubernetes", "Kafka"],
        url: "https://example.com/portfolio/payment-platform",
        period: "2022年〜2024年",
      },
    ],
    experience: [
      {
        company: "株式会社フィンテックラボ",
        position: "シニアバックエンドエンジニア",
        period: "2018年4月〜現在",
        employmentType: "正社員",
        summary: "決済プラットフォームの設計・開発をリード。チーム5名のマネジメントも兼務。",
        technologies: ["Java", "Spring Boot", "Kubernetes", "Kafka"],
      },
    ],
    documents: { resume: true, workHistory: true, portfolio: true, coverLetter: false },
    appliedDateLabel: "2026年7月11日",
    appliedDateISO: "2026-07-11",
    status: "一次面接",
    timelineStepIndex: 2,
    timeline: [
      { date: "2026年7月11日", status: "応募受付" },
      { date: "2026年7月13日", status: "書類選考中" },
      { date: "2026年7月16日", status: "一次面接", note: "一次面接：7月22日 15:00〜" },
    ],
    evaluation: null,
    notes: "マネジメント経験もあり、将来的なリード候補として期待。",
  },
  {
    id: "3",
    name: "鈴木 大輔",
    photoInitials: "鈴",
    currentTitle: "バックエンドエンジニア",
    bio: "受託開発でのJava実務経験3年。RDBMS設計とAPI開発を中心に担当してきました。",
    email: "daisuke.suzuki@example.com",
    phone: "090-3333-4444",
    appliedJobId: "1",
    appliedJobTitle: jobTitleOf("1"),
    company: COMPANY_NAME,
    experienceYears: 3,
    location: "神奈川県",
    itssLevel: 3,
    skills: ["Java", "Spring Boot", "MySQL", "Docker"],
    education: [
      { school: "神奈川大学", department: "理学部情報科学科", period: "2017年4月〜2021年3月" },
    ],
    certifications: [],
    portfolio: [],
    experience: [
      {
        company: "株式会社システムクリエイト",
        position: "バックエンドエンジニア",
        period: "2021年4月〜現在",
        employmentType: "正社員",
        summary: "受託案件にてJavaによるWebアプリケーション開発を担当。",
        technologies: ["Java", "Spring Boot", "MySQL"],
      },
    ],
    documents: { resume: true, workHistory: true, portfolio: false, coverLetter: false },
    appliedDateLabel: "2026年7月9日",
    appliedDateISO: "2026-07-09",
    status: "書類選考中",
    timelineStepIndex: 1,
    timeline: [
      { date: "2026年7月9日", status: "応募受付" },
      { date: "2026年7月10日", status: "書類選考中" },
    ],
    evaluation: null,
    notes: "",
  },
  {
    id: "4",
    name: "山本 陽子",
    photoInitials: "山",
    currentTitle: "フロントエンドエンジニア",
    bio: "React / TypeScriptを用いたSPA開発が得意。UI/UXにも強いこだわりを持っています。",
    email: "yoko.yamamoto@example.com",
    phone: "090-4444-5555",
    appliedJobId: "2",
    appliedJobTitle: jobTitleOf("2"),
    company: COMPANY_NAME,
    experienceYears: 2,
    location: "東京都",
    itssLevel: 3,
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    education: [
      { school: "多摩美術大学", department: "情報デザイン学科", period: "2018年4月〜2022年3月" },
    ],
    certifications: [],
    portfolio: [
      {
        title: "個人ブログ基盤",
        role: "個人開発",
        description: "Next.jsとMicroCMSで構築した高速なブログ基盤。Lighthouseスコア100を達成。",
        skills: ["Next.js", "TypeScript"],
        url: "https://github.com/example/blog-platform",
        period: "2023年",
      },
    ],
    experience: [
      {
        company: "株式会社クリエイティブワークス",
        position: "フロントエンドエンジニア",
        period: "2022年4月〜現在",
        employmentType: "正社員",
        summary: "自社メディアサイトのフロントエンド開発・UI改善を担当。",
        technologies: ["React", "TypeScript", "Next.js"],
      },
    ],
    documents: { resume: true, workHistory: true, portfolio: true, coverLetter: true },
    appliedDateLabel: "2026年7月13日",
    appliedDateISO: "2026-07-13",
    status: "応募受付",
    timelineStepIndex: 0,
    timeline: [{ date: "2026年7月13日", status: "応募受付" }],
    evaluation: null,
    notes: "",
  },
  {
    id: "5",
    name: "小林 翔",
    photoInitials: "小",
    currentTitle: "フルスタックエンジニア",
    bio: "スタートアップでフロントエンド・バックエンド双方の開発を経験。スピード重視の開発が得意です。",
    email: "sho.kobayashi@example.com",
    phone: "090-5555-6666",
    appliedJobId: "2",
    appliedJobTitle: jobTitleOf("2"),
    company: COMPANY_NAME,
    experienceYears: 3,
    location: "東京都",
    itssLevel: 3,
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    education: [
      { school: "法政大学", department: "経営学部", period: "2016年4月〜2020年3月" },
    ],
    certifications: [],
    portfolio: [],
    experience: [
      {
        company: "株式会社スタートアップベース",
        position: "フルスタックエンジニア",
        period: "2020年4月〜現在",
        employmentType: "正社員",
        summary: "0→1のプロダクト開発を複数経験。React / Node.jsでの開発が中心。",
        technologies: ["React", "Node.js", "GraphQL"],
      },
    ],
    documents: { resume: true, workHistory: true, portfolio: false, coverLetter: false },
    appliedDateLabel: "2026年7月10日",
    appliedDateISO: "2026-07-10",
    status: "書類選考中",
    timelineStepIndex: 1,
    timeline: [
      { date: "2026年7月10日", status: "応募受付" },
      { date: "2026年7月12日", status: "書類選考中" },
    ],
    evaluation: null,
    notes: "",
  },
  {
    id: "6",
    name: "中村 洋介",
    photoInitials: "中",
    currentTitle: "インフラエンジニア",
    bio: "AWS環境の設計・構築を7年間担当。大規模トラフィックを支えるインフラ設計が専門です。",
    email: "yosuke.nakamura@example.com",
    phone: "090-6666-7777",
    appliedJobId: "3",
    appliedJobTitle: jobTitleOf("3"),
    company: COMPANY_NAME,
    experienceYears: 7,
    location: "東京都",
    itssLevel: 5,
    skills: ["AWS", "Kubernetes", "Terraform", "Docker", "Python"],
    education: [
      { school: "筑波大学", department: "情報学群", period: "2013年4月〜2017年3月" },
    ],
    certifications: [
      { name: "AWS認定ソリューションアーキテクト プロフェッショナル", issuer: "Amazon Web Services", acquiredDate: "2023年1月" },
      { name: "CKA（Certified Kubernetes Administrator）", issuer: "CNCF", acquiredDate: "2022年11月" },
    ],
    portfolio: [
      {
        title: "マルチリージョン基盤構築",
        role: "インフラリード",
        description: "災害対策を目的としたマルチリージョン構成をTerraformで実装。",
        skills: ["AWS", "Terraform", "Kubernetes"],
        url: "https://example.com/portfolio/multi-region",
        period: "2023年〜2024年",
      },
    ],
    experience: [
      {
        company: "株式会社クラウドオペレーションズ",
        position: "SRE",
        period: "2017年4月〜現在",
        employmentType: "正社員",
        summary: "大規模ECサイトのインフラ運用・信頼性向上施策を推進。",
        technologies: ["AWS", "Kubernetes", "Terraform"],
      },
    ],
    documents: { resume: true, workHistory: true, portfolio: true, coverLetter: true },
    appliedDateLabel: "2026年7月9日",
    appliedDateISO: "2026-07-09",
    status: "書類選考中",
    timelineStepIndex: 1,
    timeline: [
      { date: "2026年7月9日", status: "応募受付" },
      { date: "2026年7月11日", status: "書類選考中" },
    ],
    evaluation: null,
    notes: "即戦力候補。優先度高めで選考を進めたい。",
  },
  {
    id: "7",
    name: "高橋 真央",
    photoInitials: "高",
    currentTitle: "AIエンジニア",
    bio: "機械学習モデルの開発から本番運用までを一気通貫で担当。需要予測領域の実績が豊富です。",
    email: "mao.takahashi@example.com",
    phone: "090-7777-8888",
    appliedJobId: "4",
    appliedJobTitle: jobTitleOf("4"),
    company: COMPANY_NAME,
    experienceYears: 5,
    location: "東京都",
    itssLevel: 5,
    skills: ["Python", "機械学習", "SQL", "AWS", "MLOps"],
    education: [
      { school: "東京大学大学院", department: "情報理工学系研究科", period: "2017年4月〜2019年3月" },
    ],
    certifications: [
      { name: "統計検定準1級", issuer: "日本統計学会", acquiredDate: "2021年6月" },
    ],
    portfolio: [
      {
        title: "需要予測モデル基盤",
        role: "MLエンジニア",
        description: "小売業向け需要予測モデルを開発し、在庫廃棄率を18%削減。",
        skills: ["Python", "機械学習", "AWS"],
        url: "https://example.com/portfolio/demand-forecast",
        period: "2022年〜2024年",
      },
    ],
    experience: [
      {
        company: "株式会社データインサイト",
        position: "MLエンジニア",
        period: "2019年4月〜現在",
        employmentType: "正社員",
        summary: "需要予測・異常検知モデルの開発と本番運用を担当。",
        technologies: ["Python", "機械学習", "AWS"],
      },
    ],
    documents: { resume: true, workHistory: true, portfolio: true, coverLetter: true },
    appliedDateLabel: "2026年7月14日",
    appliedDateISO: "2026-07-14",
    status: "一次面接",
    timelineStepIndex: 2,
    timeline: [
      { date: "2026年7月14日", status: "応募受付" },
      { date: "2026年7月15日", status: "書類選考中" },
      { date: "2026年7月16日", status: "一次面接", note: "一次面接：7月23日 10:00〜" },
    ],
    evaluation: {
      overall: 4,
      technical: 5,
      communication: 4,
      business: 3,
      comment: "技術力は非常に高い。ビジネス側との連携経験を一次面接で確認したい。",
    },
    notes: "書類選考時点で高評価。優先候補。",
  },
  {
    id: "8",
    name: "伊藤 蓮",
    photoInitials: "伊",
    currentTitle: "AIエンジニア",
    bio: "自然言語処理を専門とし、生成AIを活用したプロダクト開発の経験があります。",
    email: "ren.ito@example.com",
    phone: "090-8888-9999",
    appliedJobId: "4",
    appliedJobTitle: jobTitleOf("4"),
    company: COMPANY_NAME,
    experienceYears: 4,
    location: "東京都",
    itssLevel: 5,
    skills: ["Python", "機械学習", "LLM", "Docker"],
    education: [
      { school: "京都大学", department: "工学部情報学科", period: "2016年4月〜2020年3月" },
    ],
    certifications: [],
    portfolio: [
      {
        title: "社内ナレッジ検索AI",
        role: "AIエンジニア",
        description: "RAG構成による社内ドキュメント検索AIを構築し、検索時間を80%短縮。",
        skills: ["Python", "LLM"],
        url: "https://example.com/portfolio/rag-search",
        period: "2023年〜2024年",
      },
    ],
    experience: [
      {
        company: "株式会社ニューラルゲート",
        position: "AIエンジニア",
        period: "2020年4月〜現在",
        employmentType: "正社員",
        summary: "生成AIプロダクトの開発・運用を担当。",
        technologies: ["Python", "LLM", "Docker"],
      },
    ],
    documents: { resume: true, workHistory: true, portfolio: true, coverLetter: false },
    appliedDateLabel: "2026年7月12日",
    appliedDateISO: "2026-07-12",
    status: "最終面接",
    timelineStepIndex: 3,
    timeline: [
      { date: "2026年7月12日", status: "応募受付" },
      { date: "2026年7月13日", status: "書類選考中" },
      { date: "2026年7月14日", status: "一次面接" },
      { date: "2026年7月16日", status: "最終面接", note: "最終面接：7月24日 14:00〜" },
    ],
    evaluation: {
      overall: 4,
      technical: 4,
      communication: 4,
      business: 4,
      comment: "一次面接での受け答えが的確。チームフィットも良好と判断。",
    },
    notes: "最終面接では事業理解度を重点的に確認予定。",
  },
  {
    id: "9",
    name: "渡辺 さくら",
    photoInitials: "渡",
    currentTitle: "データサイエンティスト",
    bio: "データ分析基盤の構築と機械学習モデルの実装を担当。ビジネス提案力にも定評があります。",
    email: "sakura.watanabe@example.com",
    phone: "090-9999-0000",
    appliedJobId: "4",
    appliedJobTitle: jobTitleOf("4"),
    company: COMPANY_NAME,
    experienceYears: 6,
    location: "東京都",
    itssLevel: 5,
    skills: ["Python", "機械学習", "SQL", "GCP"],
    education: [
      { school: "大阪大学大学院", department: "基礎工学研究科", period: "2015年4月〜2017年3月" },
    ],
    certifications: [
      { name: "Google Cloud Professional Data Engineer", issuer: "Google", acquiredDate: "2022年4月" },
    ],
    portfolio: [],
    experience: [
      {
        company: "株式会社アナリティクスラボ",
        position: "データサイエンティスト",
        period: "2017年4月〜現在",
        employmentType: "正社員",
        summary: "データ分析基盤の設計と機械学習モデルの実装・提案を担当。",
        technologies: ["Python", "機械学習", "GCP"],
      },
    ],
    documents: { resume: true, workHistory: true, portfolio: false, coverLetter: true },
    appliedDateLabel: "2026年7月8日",
    appliedDateISO: "2026-07-08",
    status: "内定",
    timelineStepIndex: 4,
    timeline: [
      { date: "2026年7月8日", status: "応募受付" },
      { date: "2026年7月9日", status: "書類選考中" },
      { date: "2026年7月11日", status: "一次面接" },
      { date: "2026年7月14日", status: "最終面接" },
      { date: "2026年7月16日", status: "内定", note: "内定通知を送付済み" },
    ],
    evaluation: {
      overall: 5,
      technical: 5,
      communication: 5,
      business: 4,
      comment: "全選考プロセスを通じて高い評価。即戦力として期待できる。",
    },
    notes: "内定承諾の返答待ち。条件面のフォローを継続。",
  },
  {
    id: "10",
    name: "松本 直樹",
    photoInitials: "松",
    currentTitle: "QAエンジニア",
    bio: "自動化テストの構築・運用に強みを持つQAエンジニア。品質保証プロセスの改善が得意です。",
    email: "naoki.matsumoto@example.com",
    phone: "090-1010-2020",
    appliedJobId: "5",
    appliedJobTitle: jobTitleOf("5"),
    company: COMPANY_NAME,
    experienceYears: 3,
    location: "東京都",
    itssLevel: 3,
    skills: ["テスト設計", "Selenium", "Python"],
    education: [
      { school: "明治大学", department: "理工学部", period: "2018年4月〜2022年3月" },
    ],
    certifications: [
      { name: "JSTQB Foundation Level", issuer: "JSTQB", acquiredDate: "2022年9月" },
    ],
    portfolio: [],
    experience: [
      {
        company: "株式会社クオリティファースト",
        position: "QAエンジニア",
        period: "2022年4月〜現在",
        employmentType: "正社員",
        summary: "E2Eテストの自動化とリリース前品質保証プロセスの運用を担当。",
        technologies: ["Selenium", "Python"],
      },
    ],
    documents: { resume: true, workHistory: true, portfolio: false, coverLetter: false },
    appliedDateLabel: "2026年7月4日",
    appliedDateISO: "2026-07-04",
    status: "書類選考中",
    timelineStepIndex: 1,
    timeline: [
      { date: "2026年7月4日", status: "応募受付" },
      { date: "2026年7月6日", status: "書類選考中" },
    ],
    evaluation: null,
    notes: "",
  },
  {
    id: "11",
    name: "木村 拓真",
    photoInitials: "木",
    currentTitle: "セキュリティエンジニア",
    bio: "脆弱性診断とSOC運用の実務経験があり、インシデント対応にも精通しています。",
    email: "takuma.kimura@example.com",
    phone: "090-1111-3333",
    appliedJobId: "6",
    appliedJobTitle: jobTitleOf("6"),
    company: COMPANY_NAME,
    experienceYears: 4,
    location: "東京都",
    itssLevel: 4,
    skills: ["脆弱性診断", "ネットワークセキュリティ", "SIEM運用"],
    education: [
      { school: "電気通信大学", department: "情報理工学域", period: "2016年4月〜2020年3月" },
    ],
    certifications: [
      { name: "情報処理安全確保支援士", issuer: "IPA", acquiredDate: "2021年10月" },
    ],
    portfolio: [],
    experience: [
      {
        company: "株式会社セーフガード",
        position: "セキュリティエンジニア",
        period: "2020年4月〜現在",
        employmentType: "正社員",
        summary: "Webアプリケーションの脆弱性診断とSOC運用を担当。",
        technologies: ["脆弱性診断", "SIEM"],
      },
    ],
    documents: { resume: true, workHistory: true, portfolio: false, coverLetter: true },
    appliedDateLabel: "2026年7月2日",
    appliedDateISO: "2026-07-02",
    status: "書類選考中",
    timelineStepIndex: 1,
    timeline: [
      { date: "2026年7月2日", status: "応募受付" },
      { date: "2026年7月4日", status: "書類選考中" },
    ],
    evaluation: null,
    notes: "",
  },
  {
    id: "12",
    name: "石井 悠斗",
    photoInitials: "石",
    currentTitle: "データエンジニア",
    bio: "GCPを中心としたデータパイプライン構築が専門。分析基盤の内製化を複数社で推進してきました。",
    email: "yuto.ishii@example.com",
    phone: "090-1212-3434",
    appliedJobId: "11",
    appliedJobTitle: jobTitleOf("11"),
    company: COMPANY_NAME,
    experienceYears: 3,
    location: "東京都",
    itssLevel: 4,
    skills: ["Python", "GCP", "BigQuery", "Airflow"],
    education: [
      { school: "九州大学", department: "システム情報科学府", period: "2018年4月〜2020年3月" },
    ],
    certifications: [],
    portfolio: [
      {
        title: "全社データ分析基盤",
        role: "データエンジニア",
        description: "BigQueryとAirflowを用いた全社データ分析基盤を構築。",
        skills: ["GCP", "BigQuery", "Airflow"],
        url: "https://example.com/portfolio/data-platform",
        period: "2022年〜2024年",
      },
    ],
    experience: [
      {
        company: "株式会社データポート",
        position: "データエンジニア",
        period: "2020年4月〜現在",
        employmentType: "正社員",
        summary: "データ分析基盤の設計・構築・運用を担当。",
        technologies: ["Python", "GCP", "BigQuery"],
      },
    ],
    documents: { resume: true, workHistory: true, portfolio: true, coverLetter: false },
    appliedDateLabel: "2026年7月11日",
    appliedDateISO: "2026-07-11",
    status: "書類選考中",
    timelineStepIndex: 1,
    timeline: [
      { date: "2026年7月11日", status: "応募受付" },
      { date: "2026年7月13日", status: "書類選考中" },
    ],
    evaluation: null,
    notes: "",
  },
  {
    id: "13",
    name: "青木 美月",
    photoInitials: "青",
    currentTitle: "データエンジニア",
    bio: "分析基盤のリプレイス経験があり、dbtを用いたモデリング設計が得意です。",
    email: "mizuki.aoki@example.com",
    phone: "090-1313-3535",
    appliedJobId: "11",
    appliedJobTitle: jobTitleOf("11"),
    company: COMPANY_NAME,
    experienceYears: 2,
    location: "神奈川県",
    itssLevel: 3,
    skills: ["Python", "GCP", "dbt", "SQL"],
    education: [
      { school: "横浜国立大学", department: "理工学部", period: "2019年4月〜2023年3月" },
    ],
    certifications: [],
    portfolio: [],
    experience: [
      {
        company: "株式会社インサイトフィールド",
        position: "データアナリスト",
        period: "2023年4月〜現在",
        employmentType: "正社員",
        summary: "分析基盤のdbtモデリングとダッシュボード開発を担当。",
        technologies: ["dbt", "SQL", "GCP"],
      },
    ],
    documents: { resume: true, workHistory: true, portfolio: false, coverLetter: false },
    appliedDateLabel: "2026年7月7日",
    appliedDateISO: "2026-07-07",
    status: "一次面接",
    timelineStepIndex: 2,
    timeline: [
      { date: "2026年7月7日", status: "応募受付" },
      { date: "2026年7月9日", status: "書類選考中" },
      { date: "2026年7月12日", status: "一次面接", note: "一次面接：7月21日 11:00〜" },
    ],
    evaluation: null,
    notes: "",
  },
  {
    id: "14",
    name: "藤田 健",
    photoInitials: "藤",
    currentTitle: "DevOpsエンジニア",
    bio: "CI/CDパイプラインの設計・運用に強みを持ち、開発生産性向上を専門にしています。",
    email: "ken.fujita@example.com",
    phone: "090-1414-3636",
    appliedJobId: "12",
    appliedJobTitle: jobTitleOf("12"),
    company: COMPANY_NAME,
    experienceYears: 3,
    location: "神奈川県",
    itssLevel: 4,
    skills: ["Kubernetes", "Docker", "CI/CD", "Terraform"],
    education: [
      { school: "神奈川工科大学", department: "情報工学科", period: "2017年4月〜2021年3月" },
    ],
    certifications: [
      { name: "CKA（Certified Kubernetes Administrator）", issuer: "CNCF", acquiredDate: "2023年3月" },
    ],
    portfolio: [],
    experience: [
      {
        company: "株式会社パイプラインワークス",
        position: "DevOpsエンジニア",
        period: "2021年4月〜現在",
        employmentType: "正社員",
        summary: "CI/CDパイプラインの整備とKubernetes基盤の運用を担当。",
        technologies: ["Kubernetes", "CI/CD", "Terraform"],
      },
    ],
    documents: { resume: true, workHistory: true, portfolio: false, coverLetter: true },
    appliedDateLabel: "2026年7月8日",
    appliedDateISO: "2026-07-08",
    status: "一次面接",
    timelineStepIndex: 2,
    timeline: [
      { date: "2026年7月8日", status: "応募受付" },
      { date: "2026年7月10日", status: "書類選考中" },
      { date: "2026年7月13日", status: "一次面接", note: "一次面接：7月20日 13:00〜" },
    ],
    evaluation: null,
    notes: "",
  },
  {
    id: "15",
    name: "西村 彩",
    photoInitials: "西",
    currentTitle: "DevOpsエンジニア",
    bio: "監視基盤の構築とインシデント対応の効率化を得意とするDevOpsエンジニアです。",
    email: "aya.nishimura@example.com",
    phone: "090-1515-3737",
    appliedJobId: "12",
    appliedJobTitle: jobTitleOf("12"),
    company: COMPANY_NAME,
    experienceYears: 2,
    location: "東京都",
    itssLevel: 3,
    skills: ["Kubernetes", "Datadog", "AWS"],
    education: [
      { school: "上智大学", department: "理工学部", period: "2019年4月〜2023年3月" },
    ],
    certifications: [],
    portfolio: [],
    experience: [
      {
        company: "株式会社スケールゲート",
        position: "SRE",
        period: "2023年4月〜現在",
        employmentType: "正社員",
        summary: "監視基盤の構築とアラート対応フローの整備を担当。",
        technologies: ["Kubernetes", "Datadog", "AWS"],
      },
    ],
    documents: { resume: true, workHistory: true, portfolio: false, coverLetter: false },
    appliedDateLabel: "2026年7月2日",
    appliedDateISO: "2026-07-02",
    status: "書類選考中",
    timelineStepIndex: 1,
    timeline: [
      { date: "2026年7月2日", status: "応募受付" },
      { date: "2026年7月4日", status: "書類選考中" },
    ],
    evaluation: null,
    notes: "",
  },
  {
    id: "16",
    name: "岡田 龍之介",
    photoInitials: "岡",
    currentTitle: "バックエンドエンジニア",
    bio: "Go言語による高パフォーマンスなAPI開発を得意とし、認証基盤の構築実績があります。",
    email: "ryunosuke.okada@example.com",
    phone: "090-1616-3838",
    appliedJobId: "1",
    appliedJobTitle: jobTitleOf("1"),
    company: COMPANY_NAME,
    experienceYears: 5,
    location: "東京都",
    itssLevel: 4,
    skills: ["Go", "PostgreSQL", "Docker", "gRPC"],
    education: [
      { school: "北海道大学", department: "工学部", period: "2015年4月〜2019年3月" },
    ],
    certifications: [],
    portfolio: [],
    experience: [
      {
        company: "株式会社ゼロトラスト",
        position: "バックエンドエンジニア",
        period: "2019年4月〜2026年6月",
        employmentType: "正社員",
        summary: "認証基盤SaaSのAPI開発を担当。Go言語での開発経験が豊富。",
        technologies: ["Go", "PostgreSQL", "gRPC"],
      },
    ],
    documents: { resume: true, workHistory: true, portfolio: false, coverLetter: true },
    appliedDateLabel: "2026年6月20日",
    appliedDateISO: "2026-06-20",
    status: "採用",
    timelineStepIndex: 5,
    timeline: [
      { date: "2026年6月20日", status: "応募受付" },
      { date: "2026年6月22日", status: "書類選考中" },
      { date: "2026年6月25日", status: "一次面接" },
      { date: "2026年6月30日", status: "最終面接" },
      { date: "2026年7月3日", status: "内定" },
      { date: "2026年7月10日", status: "採用", note: "入社日：2026年8月1日" },
    ],
    evaluation: {
      overall: 5,
      technical: 5,
      communication: 4,
      business: 4,
      comment: "技術力・実績ともに申し分なし。即戦力として高く評価。",
    },
    notes: "入社手続き中。8月1日入社予定。",
  },
  {
    id: "17",
    name: "橋本 直人",
    photoInitials: "橋",
    currentTitle: "クラウドエンジニア",
    bio: "GCP / AWSの両方に精通し、マルチクラウド環境の設計・運用実績があります。",
    email: "naoto.hashimoto@example.com",
    phone: "090-1717-3939",
    appliedJobId: "3",
    appliedJobTitle: jobTitleOf("3"),
    company: COMPANY_NAME,
    experienceYears: 6,
    location: "東京都",
    itssLevel: 5,
    skills: ["AWS", "GCP", "Terraform", "Kubernetes"],
    education: [
      { school: "同志社大学", department: "理工学部", period: "2013年4月〜2017年3月" },
    ],
    certifications: [
      { name: "AWS認定ソリューションアーキテクト プロフェッショナル", issuer: "Amazon Web Services", acquiredDate: "2021年5月" },
    ],
    portfolio: [],
    experience: [
      {
        company: "株式会社スケールワークス",
        position: "クラウドエンジニア",
        period: "2017年4月〜2026年5月",
        employmentType: "正社員",
        summary: "マルチクラウド環境の設計・構築支援を担当。",
        technologies: ["AWS", "GCP", "Terraform"],
      },
    ],
    documents: { resume: true, workHistory: true, portfolio: true, coverLetter: true },
    appliedDateLabel: "2026年5月20日",
    appliedDateISO: "2026-05-20",
    status: "採用",
    timelineStepIndex: 5,
    timeline: [
      { date: "2026年5月20日", status: "応募受付" },
      { date: "2026年5月23日", status: "書類選考中" },
      { date: "2026年5月28日", status: "一次面接" },
      { date: "2026年6月3日", status: "最終面接" },
      { date: "2026年6月8日", status: "内定" },
      { date: "2026年6月15日", status: "採用", note: "入社日：2026年7月1日" },
    ],
    evaluation: {
      overall: 5,
      technical: 5,
      communication: 5,
      business: 4,
      comment: "マルチクラウドの知見が深く、即戦力。コミュニケーション能力も高い。",
    },
    notes: "既に入社済み。オンボーディング完了。",
  },
  {
    id: "18",
    name: "村上 拓海",
    photoInitials: "村",
    currentTitle: "フロントエンドエンジニア",
    bio: "React経験1年未満。ポートフォリオはあるが実務経験が浅い。",
    email: "takumi.murakami@example.com",
    phone: "090-1818-4040",
    appliedJobId: "2",
    appliedJobTitle: jobTitleOf("2"),
    company: COMPANY_NAME,
    experienceYears: 1,
    location: "大阪府",
    itssLevel: 1,
    skills: ["React", "JavaScript", "HTML/CSS"],
    education: [
      { school: "大阪工業大学", department: "情報科学部", period: "2020年4月〜2024年3月" },
    ],
    certifications: [],
    portfolio: [
      {
        title: "個人ポートフォリオサイト",
        role: "個人開発",
        description: "Reactで作成した自己紹介サイト。",
        skills: ["React", "JavaScript"],
        url: "https://example.com/portfolio/personal-site",
        period: "2024年",
      },
    ],
    experience: [
      {
        company: "株式会社ウェブスターター",
        position: "ジュニアフロントエンドエンジニア",
        period: "2024年4月〜現在",
        employmentType: "正社員",
        summary: "コーポレートサイトの制作・保守を担当。",
        technologies: ["React", "JavaScript"],
      },
    ],
    documents: { resume: true, workHistory: true, portfolio: true, coverLetter: false },
    appliedDateLabel: "2026年6月25日",
    appliedDateISO: "2026-06-25",
    status: "不採用",
    timelineStepIndex: 1,
    timeline: [
      { date: "2026年6月25日", status: "応募受付" },
      { date: "2026年6月27日", status: "書類選考中" },
      { date: "2026年7月1日", status: "不採用", note: "経験年数が募集要件に届かず" },
    ],
    evaluation: {
      overall: 2,
      technical: 2,
      communication: 3,
      business: 2,
      comment: "ポテンシャルは感じるが、現時点では募集要件の経験年数に届かない。",
    },
    notes: "半年後に再応募を歓迎する旨を伝えたい。",
  },
  {
    id: "19",
    name: "林 恵美",
    photoInitials: "林",
    currentTitle: "QAエンジニア",
    bio: "手動テストの経験はあるが、自動化ツールの実務経験は限定的。",
    email: "emi.hayashi@example.com",
    phone: "090-1919-4141",
    appliedJobId: "5",
    appliedJobTitle: jobTitleOf("5"),
    company: COMPANY_NAME,
    experienceYears: 2,
    location: "愛知県",
    itssLevel: 2,
    skills: ["テスト設計", "手動テスト"],
    education: [
      { school: "名古屋市立大学", department: "総合生命理学部", period: "2019年4月〜2023年3月" },
    ],
    certifications: [],
    portfolio: [],
    experience: [
      {
        company: "株式会社テストソリューションズ",
        position: "QAエンジニア",
        period: "2023年4月〜現在",
        employmentType: "正社員",
        summary: "手動テストを中心にリリース前の品質保証業務を担当。",
        technologies: ["手動テスト"],
      },
    ],
    documents: { resume: true, workHistory: true, portfolio: false, coverLetter: false },
    appliedDateLabel: "2026年6月28日",
    appliedDateISO: "2026-06-28",
    status: "不採用",
    timelineStepIndex: 2,
    timeline: [
      { date: "2026年6月28日", status: "応募受付" },
      { date: "2026年6月30日", status: "書類選考中" },
      { date: "2026年7月3日", status: "一次面接" },
      { date: "2026年7月6日", status: "不採用", note: "自動化スキルの不足により見送り" },
    ],
    evaluation: {
      overall: 2,
      technical: 2,
      communication: 4,
      business: 3,
      comment: "人物面は良好だが、募集要件である自動化テストの実務経験が不足。",
    },
    notes: "",
  },
  {
    id: "20",
    name: "斎藤 蒼",
    photoInitials: "斎",
    currentTitle: "PM／プロジェクトマネージャー",
    bio: "SIerでのPM経験3年。大規模プロジェクトの進行管理を得意としています。",
    email: "sou.saito@example.com",
    phone: "090-2020-4242",
    appliedJobId: "8",
    appliedJobTitle: jobTitleOf("8"),
    company: COMPANY_NAME,
    experienceYears: 5,
    location: "大阪府",
    itssLevel: 4,
    skills: ["プロジェクトマネジメント", "要件定義", "アジャイル開発"],
    education: [
      { school: "関西大学", department: "総合情報学部", period: "2016年4月〜2020年3月" },
    ],
    certifications: [
      { name: "PMP", issuer: "PMI", acquiredDate: "2023年2月" },
    ],
    portfolio: [],
    experience: [
      {
        company: "株式会社ブリッジソリューションズ",
        position: "プロジェクトマネージャー",
        period: "2020年4月〜現在",
        employmentType: "正社員",
        summary: "官公庁向けシステム開発プロジェクトのPMを担当。",
        technologies: ["プロジェクトマネジメント", "要件定義"],
      },
    ],
    documents: { resume: true, workHistory: true, portfolio: false, coverLetter: true },
    appliedDateLabel: "2026年7月1日",
    appliedDateISO: "2026-07-01",
    status: "辞退",
    timelineStepIndex: 1,
    timeline: [
      { date: "2026年7月1日", status: "応募受付" },
      { date: "2026年7月3日", status: "書類選考中" },
      { date: "2026年7月8日", status: "辞退", note: "他社内定を承諾したため辞退" },
    ],
    evaluation: null,
    notes: "書類選考中に本人都合で辞退。次回機会があれば再アプローチ。",
  },
];
