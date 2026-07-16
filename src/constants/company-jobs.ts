/**
 * Company job management module placeholder content (Japanese).
 * UI only — no backend, no real data, no authentication.
 */

// ============================================================
// Shared vocabulary
// ============================================================

export const CONTRACT_TYPE_OPTIONS = ["就職", "案件", "時間清算"] as const;
export type ContractType = (typeof CONTRACT_TYPE_OPTIONS)[number];

export const CONTRACT_TYPE_BADGE_STYLES: Record<ContractType, string> = {
  就職: "bg-blue-50 text-blue-700",
  案件: "bg-indigo-50 text-primary",
  時間清算: "bg-amber-50 text-amber-700",
};

export const WORK_STYLE_OPTIONS = ["フルリモート", "一部リモート", "出社"] as const;
export type WorkStyle = (typeof WORK_STYLE_OPTIONS)[number];

export const LOCATION_OPTIONS = [
  "東京都",
  "神奈川県",
  "大阪府",
  "愛知県",
  "福岡県",
] as const;

export const ITSS_LEVEL_OPTIONS = [1, 2, 3, 4, 5, 6, 7] as const;

export const JOB_STATUSES = ["募集中", "下書き", "募集終了"] as const;
export type JobPostingStatus = (typeof JOB_STATUSES)[number];

export const JOB_STATUS_BADGE_STYLES: Record<JobPostingStatus, string> = {
  募集中: "bg-green-50 text-green-700",
  下書き: "bg-amber-50 text-amber-700",
  募集終了: "bg-gray-100 text-gray-600",
};

// ============================================================
// Job management — page / list meta
// ============================================================

export const JOB_MANAGEMENT_META = {
  title: "求人・案件管理",
  description: "掲載中の求人・案件を確認・管理できます。",
  createLabel: "新規掲載",
  createHref: "/company/jobs/new",
} as const;

export const JOB_SUMMARY_CARD_META = [
  { key: "active", label: "募集中", icon: "briefcase", statuses: ["募集中"] as JobPostingStatus[] },
  { key: "closed", label: "公開終了", icon: "archive", statuses: ["募集終了"] as JobPostingStatus[] },
  { key: "draft", label: "下書き", icon: "filePenLine", statuses: ["下書き"] as JobPostingStatus[] },
] as const;

export const APPLICANTS_SUMMARY_CARD = {
  key: "applicants",
  label: "応募数",
  icon: "users",
} as const;

export const JOB_FILTER_LABELS = {
  searchLabel: "求人を検索",
  searchPlaceholder: "求人タイトルで検索",
  statusLabel: "ステータス",
  statusAllLabel: "すべてのステータス",
  contractTypeLabel: "契約形態",
  contractTypeAllLabel: "すべての契約形態",
  sortLabel: "並び替え",
  resetLabel: "条件をリセット",
} as const;

export const SORT_OPTIONS = [
  { value: "newest", label: "新しい順" },
  { value: "oldest", label: "古い順" },
] as const;
export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

export const JOB_CARD_LABELS = {
  detailLabel: "詳細",
  editLabel: "編集",
  duplicateLabel: "複製",
  closeLabel: "募集終了",
  applicantsPrefix: "応募者：",
  applicantsSuffix: "名",
  publishedPrefix: "掲載日：",
} as const;

export const EMPTY_STATE_LABELS = {
  title: "掲載中の求人・案件はありません。",
  description: "新しい求人・案件を作成して、エンジニアからの応募を募集しましょう。",
  ctaLabel: "新規掲載",
} as const;

export const FILTERED_EMPTY_STATE_LABELS = {
  title: "条件に一致する求人・案件が見つかりませんでした。",
  description: "検索キーワードや絞り込み条件を変更してお試しください。",
  ctaLabel: "条件をリセット",
} as const;

export const DUPLICATE_TOAST_MESSAGE =
  "求人を複製しました。（デモ表示のため実際には複製されません）";

export const CLOSE_RECRUITMENT_DIALOG_LABELS = {
  title: "本当にこの求人の募集を終了しますか？",
  description:
    "募集を終了すると、この求人は新規応募を受け付けなくなります。この操作はデモ表示のため実際には保存されません。",
  cancelLabel: "キャンセル",
  confirmLabel: "募集を終了する",
  toastMessage: "募集を終了しました。",
} as const;

// ============================================================
// Job detail
// ============================================================

export const JOB_DETAIL_META = {
  backLabel: "求人一覧に戻る",
  backHref: "/company/jobs",
  jobInfoTitle: "求人情報",
  applicantsSummaryTitle: "応募者サマリー",
  statisticsTitle: "統計情報",
  recentApplicationsTitle: "最近の応募",
  editLabel: "編集",
  closeLabel: "募集終了",
} as const;

export const JOB_DETAIL_SECTION_LABELS = {
  responsibilitiesTitle: "仕事内容",
  requirementsTitle: "応募条件",
  requiredSkillsTitle: "必須スキル",
  preferredSkillsTitle: "歓迎スキル",
  workConditionsTitle: "勤務条件",
  benefitsTitle: "福利厚生",
} as const;

export const APPLICANT_STATUS_BADGE_STYLES: Record<string, string> = {
  応募済み: "bg-blue-50 text-blue-700",
  書類選考中: "bg-indigo-50 text-indigo-700",
  面接予定: "bg-amber-50 text-amber-700",
  最終面接: "bg-orange-50 text-orange-700",
  内定: "bg-green-50 text-green-700",
  不採用: "bg-red-50 text-red-700",
};

// ============================================================
// Create / edit job form
// ============================================================

export const FORM_SECTION_LABELS = {
  basicInfo: "基本情報",
  jobDescription: "仕事内容",
  requiredSkills: "必須スキル",
  preferredSkills: "歓迎スキル",
  workConditions: "勤務条件",
  salary: "給与",
  benefits: "福利厚生",
  publishSettings: "公開設定",
} as const;

export const FORM_BUTTON_LABELS = {
  save: "保存",
  saveDraft: "下書き保存",
  preview: "プレビュー",
  cancel: "キャンセル",
} as const;

export const BASIC_INFO_FIELDS = {
  title: { label: "求人タイトル", placeholder: "例：フロントエンドエンジニア（React / TypeScript）" },
  category: { label: "職種", placeholder: "例：フロントエンド" },
  contractType: { label: "契約形態" },
  location: { label: "勤務地" },
  workStyle: { label: "勤務形態" },
  itssLevel: { label: "推奨ITSSレベル" },
  experienceYearsMin: { label: "必要経験年数（年以上）" },
} as const;

export const JOB_DESCRIPTION_FIELDS = {
  description: { label: "仕事内容の概要", placeholder: "業務内容の概要を入力してください" },
  responsibilities: {
    label: "業務内容（1行に1つ）",
    placeholder: "例：Next.jsによるフロントエンド設計・実装",
  },
  requirements: {
    label: "応募条件（1行に1つ）",
    placeholder: "例：React / TypeScriptでの実務経験2年以上",
  },
} as const;

export const SKILLS_FIELDS = {
  requiredSkills: {
    label: "必須スキル（1行に1つ）",
    placeholder: "例：React",
  },
  preferredSkills: {
    label: "歓迎スキル（1行に1つ）",
    placeholder: "例：GraphQL",
  },
} as const;

export const WORK_CONDITIONS_FIELDS = {
  legend: "勤務条件（項目名と内容）",
  labelPlaceholder: "例：就業時間",
  valuePlaceholder: "例：10:00〜19:00（フレックス制）",
  addLabel: "勤務条件を追加",
  removeLabel: "勤務条件を削除",
} as const;

export const SALARY_FIELDS = {
  salaryLabel: { label: "給与・単価の表示テキスト", placeholder: "例：月額 60万円〜90万円" },
  salaryMin: { label: "下限（万円）" },
  salaryMax: { label: "上限（万円）" },
} as const;

export const BENEFITS_FIELDS = {
  benefits: { label: "福利厚生（1行に1つ）", placeholder: "例：リモート環境手当" },
} as const;

export const PUBLISH_SETTINGS_FIELDS = {
  status: { label: "公開ステータス" },
  isPublic: { label: "求人一覧に公開する" },
} as const;

export const CREATE_JOB_META = {
  title: "求人・案件を新規作成",
  description: "求人・案件の詳細情報を入力してください。",
  demoNote: "※ 現在はUIデモのため、保存内容は実際には登録されません。",
  saveSuccessMessage: "求人を保存しました。（デモ表示のため実際には保存されません）",
  draftSuccessMessage: "下書きとして保存しました。（デモ表示のため実際には保存されません）",
  cancelHref: "/company/jobs",
} as const;

export const EDIT_JOB_META = {
  title: "求人・案件を編集",
  description: "求人・案件の詳細情報を編集できます。",
  demoNote: "※ 現在はUIデモのため、保存内容は実際には更新されません。",
  saveSuccessMessage: "変更を保存しました。（デモ表示のため実際には保存されません）",
  draftSuccessMessage: "下書きとして保存しました。（デモ表示のため実際には保存されません）",
  cancelHref: "/company/jobs",
} as const;

export const PREVIEW_PANEL_LABELS = {
  title: "プレビュー",
  description: "求職者に表示される内容のイメージです。",
  closeLabel: "閉じる",
} as const;

// ============================================================
// Jobs (12 mock listings)
// ============================================================

export interface WorkCondition {
  label: string;
  value: string;
}

export interface CompanyJobStatistics {
  views: number;
  applications: number;
  documentScreening: number;
  interviews: number;
  offers: number;
}

export interface RecentApplicant {
  name: string;
  appliedDateLabel: string;
  status: string;
}

export interface CompanyJob {
  id: string;
  title: string;
  category: string;
  contractType: ContractType;
  location: string;
  workStyle: WorkStyle;
  itssLevel: (typeof ITSS_LEVEL_OPTIONS)[number];
  experienceYearsMin: number;
  salaryLabel: string;
  salaryMinManYen: number;
  salaryMaxManYen: number;
  status: JobPostingStatus;
  isPublic: boolean;
  applicantCount: number;
  publishedDateLabel: string;
  publishedDateISO: string;
  updatedDateLabel: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  workConditions: WorkCondition[];
  benefits: string[];
  statistics: CompanyJobStatistics;
  recentApplicants: RecentApplicant[];
}

export const COMPANY_JOBS: CompanyJob[] = [
  {
    id: "1",
    title: "バックエンドエンジニア（Java / Spring Boot）",
    category: "バックエンド",
    contractType: "就職",
    location: "東京都",
    workStyle: "出社",
    itssLevel: 4,
    experienceYearsMin: 3,
    salaryLabel: "年収 500万円〜800万円",
    salaryMinManYen: 500,
    salaryMaxManYen: 800,
    status: "募集中",
    isPublic: true,
    applicantCount: 9,
    publishedDateLabel: "2026年7月10日",
    publishedDateISO: "2026-07-10",
    updatedDateLabel: "2026年7月14日",
    description:
      "自社SaaSプロダクトのバックエンド開発をリードするポジションです。マイクロサービス基盤の設計・実装を通じて、プロダクトのスケールを支えていただきます。",
    responsibilities: [
      "Spring Bootによるマイクロサービスの設計・開発",
      "AWS上でのインフラ構成・運用改善",
      "APIの設計およびパフォーマンスチューニング",
      "若手エンジニアのメンタリング",
    ],
    requirements: [
      "Javaでの実務経験3年以上",
      "Spring Bootを用いたWebアプリケーション開発経験",
      "RDBMSの設計・運用経験",
    ],
    requiredSkills: ["Java", "Spring Boot", "PostgreSQL"],
    preferredSkills: ["AWS", "Docker", "Kubernetes"],
    workConditions: [
      { label: "勤務地", value: "東京都渋谷区（フレックス出社）" },
      { label: "就業時間", value: "フレックスタイム制（コアタイム11:00〜15:00）" },
      { label: "休日休暇", value: "完全週休2日制（土日祝）・年間休日125日" },
      { label: "雇用形態", value: "正社員" },
    ],
    benefits: [
      "社会保険完備",
      "各種手当（住宅・通勤・家族）",
      "書籍購入補助",
      "社内勉強会・カンファレンス参加支援",
    ],
    statistics: { views: 842, applications: 9, documentScreening: 4, interviews: 3, offers: 1 },
    recentApplicants: [
      { name: "佐藤 健太", appliedDateLabel: "2026年7月12日", status: "書類選考中" },
      { name: "田中 美咲", appliedDateLabel: "2026年7月11日", status: "面接予定" },
      { name: "鈴木 大輔", appliedDateLabel: "2026年7月9日", status: "書類選考中" },
    ],
  },
  {
    id: "2",
    title: "フロントエンドエンジニア（React / TypeScript）",
    category: "フロントエンド",
    contractType: "案件",
    location: "東京都",
    workStyle: "フルリモート",
    itssLevel: 3,
    experienceYearsMin: 2,
    salaryLabel: "月額 60万円〜90万円",
    salaryMinManYen: 720,
    salaryMaxManYen: 1080,
    status: "募集中",
    isPublic: true,
    applicantCount: 6,
    publishedDateLabel: "2026年7月8日",
    publishedDateISO: "2026-07-08",
    updatedDateLabel: "2026年7月13日",
    description:
      "自社SaaSプロダクト「TechFlow」のフロントエンド刷新プロジェクトです。React / TypeScriptを用いたコンポーネント設計から、表示速度改善までを幅広く担当していただきます。",
    responsibilities: [
      "Next.jsによるプロダクトのフロントエンド設計・実装",
      "デザインシステムに基づいたUIコンポーネントの構築",
      "表示速度・Core Web Vitalsの改善",
    ],
    requirements: [
      "React / TypeScriptでの実務経験2年以上",
      "モダンフロントエンド開発（Next.jsなど）の経験",
    ],
    requiredSkills: ["React", "TypeScript", "Next.js"],
    preferredSkills: ["GraphQL", "Storybook", "Figma"],
    workConditions: [
      { label: "勤務地", value: "フルリモート（月1回の任意出社あり）" },
      { label: "就業時間", value: "10:00〜19:00（フレックス制）" },
      { label: "契約期間", value: "3ヶ月更新（長期想定）" },
      { label: "精算幅", value: "140h〜180h" },
    ],
    benefits: ["リモート環境手当", "書籍購入補助", "PC・ディスプレイ貸与", "副業相談可"],
    statistics: { views: 615, applications: 6, documentScreening: 2, interviews: 2, offers: 0 },
    recentApplicants: [
      { name: "山本 陽子", appliedDateLabel: "2026年7月13日", status: "応募済み" },
      { name: "小林 翔", appliedDateLabel: "2026年7月10日", status: "書類選考中" },
    ],
  },
  {
    id: "3",
    title: "インフラエンジニア（AWS / Kubernetes）",
    category: "クラウド",
    contractType: "時間清算",
    location: "東京都",
    workStyle: "一部リモート",
    itssLevel: 4,
    experienceYearsMin: 3,
    salaryLabel: "時間単価 4,800円〜6,200円",
    salaryMinManYen: 921,
    salaryMaxManYen: 1190,
    status: "募集中",
    isPublic: true,
    applicantCount: 4,
    publishedDateLabel: "2026年7月5日",
    publishedDateISO: "2026-07-05",
    updatedDateLabel: "2026年7月11日",
    description:
      "自社サービスのクラウドインフラ設計・構築・運用を担当するポジションです。AWSを中心としたインフラのモダナイズを推進していただきます。",
    responsibilities: [
      "AWS環境のアーキテクチャ設計・構築",
      "Kubernetesクラスタの運用・監視体制の整備",
      "コスト最適化の推進",
    ],
    requirements: ["AWSでのインフラ構築経験3年以上", "Kubernetes運用経験"],
    requiredSkills: ["AWS", "Kubernetes", "Docker"],
    preferredSkills: ["Terraform", "Datadog", "Python"],
    workConditions: [
      { label: "勤務地", value: "東京都渋谷区（週2リモート可）" },
      { label: "就業時間", value: "9:30〜18:30" },
      { label: "契約期間", value: "精算契約（月次）" },
      { label: "精算幅", value: "140h〜180h（超過分は別途精算）" },
    ],
    benefits: ["交通費支給", "PC貸与", "各種研修参加可"],
    statistics: { views: 498, applications: 4, documentScreening: 1, interviews: 1, offers: 0 },
    recentApplicants: [
      { name: "中村 洋介", appliedDateLabel: "2026年7月9日", status: "書類選考中" },
    ],
  },
  {
    id: "4",
    title: "AIエンジニア（Python / 機械学習）",
    category: "AI",
    contractType: "就職",
    location: "東京都",
    workStyle: "一部リモート",
    itssLevel: 5,
    experienceYearsMin: 2,
    salaryLabel: "年収 600万円〜900万円",
    salaryMinManYen: 600,
    salaryMaxManYen: 900,
    status: "募集中",
    isPublic: true,
    applicantCount: 11,
    publishedDateLabel: "2026年6月20日",
    publishedDateISO: "2026-06-20",
    updatedDateLabel: "2026年7月14日",
    description:
      "需要予測モデルの開発・改善を担当するAIエンジニアを募集しています。データ収集からモデルの本番運用まで一気通貫で携われるポジションです。",
    responsibilities: [
      "機械学習モデルの設計・開発・評価",
      "特徴量エンジニアリングとデータパイプライン構築",
      "モデルの本番環境への実装・運用",
    ],
    requirements: [
      "Pythonを用いた機械学習モデル開発経験2年以上",
      "統計・機械学習の基礎知識",
    ],
    requiredSkills: ["Python", "機械学習", "SQL"],
    preferredSkills: ["AWS", "Docker", "MLOps"],
    workConditions: [
      { label: "勤務地", value: "東京都千代田区（週2リモート可）" },
      { label: "就業時間", value: "フレックスタイム制" },
      { label: "休日休暇", value: "完全週休2日制（土日祝）" },
      { label: "雇用形態", value: "正社員" },
    ],
    benefits: ["社会保険完備", "研究開発予算あり", "学会参加支援", "書籍購入補助"],
    statistics: { views: 1204, applications: 11, documentScreening: 5, interviews: 4, offers: 2 },
    recentApplicants: [
      { name: "高橋 真央", appliedDateLabel: "2026年7月14日", status: "面接予定" },
      { name: "伊藤 蓮", appliedDateLabel: "2026年7月12日", status: "最終面接" },
      { name: "渡辺 さくら", appliedDateLabel: "2026年7月8日", status: "内定" },
    ],
  },
  {
    id: "5",
    title: "QAエンジニア（自動化テスト）",
    category: "QA",
    contractType: "就職",
    location: "東京都",
    workStyle: "一部リモート",
    itssLevel: 3,
    experienceYearsMin: 2,
    salaryLabel: "年収 480万円〜680万円",
    salaryMinManYen: 480,
    salaryMaxManYen: 680,
    status: "募集中",
    isPublic: true,
    applicantCount: 3,
    publishedDateLabel: "2026年7月1日",
    publishedDateISO: "2026-07-01",
    updatedDateLabel: "2026年7月6日",
    description:
      "自社SaaSプロダクトのQAエンジニアとして、テスト計画の立案から自動テストの構築・運用までを担当していただきます。",
    responsibilities: [
      "テスト計画・テストケースの設計",
      "Seleniumを用いたE2Eテストの自動化",
      "リリース前の品質保証プロセスの運用",
    ],
    requirements: ["ソフトウェアテスト業務の実務経験2年以上", "テスト自動化ツールの利用経験"],
    requiredSkills: ["テスト設計", "Selenium"],
    preferredSkills: ["Python", "CI/CD", "APIテスト"],
    workConditions: [
      { label: "勤務地", value: "東京都品川区（週3リモート可）" },
      { label: "就業時間", value: "9:30〜18:30" },
      { label: "休日休暇", value: "完全週休2日制（土日祝）" },
      { label: "雇用形態", value: "正社員" },
    ],
    benefits: ["社会保険完備", "資格取得支援制度", "書籍購入補助"],
    statistics: { views: 301, applications: 3, documentScreening: 2, interviews: 0, offers: 0 },
    recentApplicants: [
      { name: "松本 直樹", appliedDateLabel: "2026年7月4日", status: "書類選考中" },
    ],
  },
  {
    id: "6",
    title: "セキュリティエンジニア（SOC運用）",
    category: "セキュリティ",
    contractType: "案件",
    location: "東京都",
    workStyle: "フルリモート",
    itssLevel: 5,
    experienceYearsMin: 3,
    salaryLabel: "月額 80万円〜110万円",
    salaryMinManYen: 960,
    salaryMaxManYen: 1320,
    status: "募集中",
    isPublic: true,
    applicantCount: 2,
    publishedDateLabel: "2026年6月28日",
    publishedDateISO: "2026-06-28",
    updatedDateLabel: "2026年7月3日",
    description:
      "自社および顧客システムのセキュリティ診断・監視を担当するセキュリティエンジニアを募集しています。",
    responsibilities: ["Webアプリケーション・インフラの脆弱性診断", "SOCにおけるログ監視・インシデント対応"],
    requirements: ["セキュリティエンジニアとしての実務経験3年以上"],
    requiredSkills: ["脆弱性診断", "ネットワークセキュリティ"],
    preferredSkills: ["SIEM運用", "Python", "CISSP"],
    workConditions: [
      { label: "勤務地", value: "フルリモート" },
      { label: "就業時間", value: "裁量労働" },
      { label: "契約期間", value: "3ヶ月更新（長期想定）" },
      { label: "精算幅", value: "140h〜180h" },
    ],
    benefits: ["リモート環境手当", "資格取得支援（CISSP等）", "書籍購入補助"],
    statistics: { views: 276, applications: 2, documentScreening: 1, interviews: 0, offers: 0 },
    recentApplicants: [
      { name: "木村 拓真", appliedDateLabel: "2026年7月2日", status: "書類選考中" },
    ],
  },
  {
    id: "7",
    title: "フルスタックエンジニア（Next.js / Node.js）",
    category: "フルスタック",
    contractType: "案件",
    location: "東京都",
    workStyle: "フルリモート",
    itssLevel: 3,
    experienceYearsMin: 2,
    salaryLabel: "月額 65万円〜95万円",
    salaryMinManYen: 780,
    salaryMaxManYen: 1140,
    status: "下書き",
    isPublic: false,
    applicantCount: 0,
    publishedDateLabel: "未掲載",
    publishedDateISO: "2026-07-15",
    updatedDateLabel: "2026年7月15日",
    description:
      "データ分析ダッシュボードSaaSの開発チームにジョインし、フロントエンドからAPI開発まで一貫して担当していただきます。",
    responsibilities: ["Next.jsによるダッシュボードUIの開発", "Node.js（Express）によるAPI開発"],
    requirements: ["フルスタックでの開発経験2年以上"],
    requiredSkills: ["Next.js", "Node.js", "TypeScript"],
    preferredSkills: ["GraphQL", "AWS", "Docker"],
    workConditions: [
      { label: "勤務地", value: "フルリモート（月1回オフサイトあり）" },
      { label: "就業時間", value: "10:00〜19:00" },
      { label: "契約期間", value: "3ヶ月更新（長期想定）" },
      { label: "精算幅", value: "140h〜180h" },
    ],
    benefits: ["リモート環境手当", "書籍購入補助", "副業相談可"],
    statistics: { views: 0, applications: 0, documentScreening: 0, interviews: 0, offers: 0 },
    recentApplicants: [],
  },
  {
    id: "8",
    title: "PM／プロジェクトマネージャー（システム開発）",
    category: "PM",
    contractType: "就職",
    location: "大阪府",
    workStyle: "一部リモート",
    itssLevel: 5,
    experienceYearsMin: 3,
    salaryLabel: "年収 650万円〜950万円",
    salaryMinManYen: 650,
    salaryMaxManYen: 950,
    status: "下書き",
    isPublic: false,
    applicantCount: 0,
    publishedDateLabel: "未掲載",
    publishedDateISO: "2026-07-14",
    updatedDateLabel: "2026年7月14日",
    description:
      "大阪拠点の新規開発プロジェクトのPMを募集しています。要件定義から本番リリースまでのプロジェクト全体を統括していただきます。",
    responsibilities: ["システム開発プロジェクトの計画・進行管理", "顧客・関係部署との折衝、要件調整"],
    requirements: ["システム開発プロジェクトのPM経験3年以上"],
    requiredSkills: ["プロジェクトマネジメント", "要件定義"],
    preferredSkills: ["AWS", "Java", "アジャイル開発"],
    workConditions: [
      { label: "勤務地", value: "大阪府大阪市（一部リモート可）" },
      { label: "就業時間", value: "9:00〜18:00" },
      { label: "休日休暇", value: "完全週休2日制（土日祝）・年間休日120日" },
      { label: "雇用形態", value: "正社員" },
    ],
    benefits: ["社会保険完備", "各種手当（住宅・役職）", "資格取得支援制度"],
    statistics: { views: 0, applications: 0, documentScreening: 0, interviews: 0, offers: 0 },
    recentApplicants: [],
  },
  {
    id: "9",
    title: "モバイルエンジニア（Flutter）",
    category: "モバイル",
    contractType: "案件",
    location: "東京都",
    workStyle: "フルリモート",
    itssLevel: 3,
    experienceYearsMin: 2,
    salaryLabel: "月額 68万円〜95万円",
    salaryMinManYen: 816,
    salaryMaxManYen: 1140,
    status: "募集終了",
    isPublic: false,
    applicantCount: 14,
    publishedDateLabel: "2026年5月10日",
    publishedDateISO: "2026-05-10",
    updatedDateLabel: "2026年6月20日",
    description:
      "自社モバイルアプリの新規機能開発を担当していただくポジションです。募集は終了しましたが、採用実績のある求人です。",
    responsibilities: ["Flutterによるモバイルアプリの機能開発", "既存アプリのパフォーマンス改善"],
    requirements: ["Flutterでの実務経験2年以上"],
    requiredSkills: ["Flutter", "Dart"],
    preferredSkills: ["Firebase", "CI/CD"],
    workConditions: [
      { label: "勤務地", value: "フルリモート" },
      { label: "就業時間", value: "裁量労働" },
      { label: "契約期間", value: "3ヶ月更新（長期想定）" },
      { label: "精算幅", value: "140h〜180h" },
    ],
    benefits: ["リモート環境手当", "書籍購入補助"],
    statistics: { views: 1890, applications: 14, documentScreening: 0, interviews: 0, offers: 1 },
    recentApplicants: [
      { name: "岡田 龍之介", appliedDateLabel: "2026年6月15日", status: "内定" },
    ],
  },
  {
    id: "10",
    title: "バックエンドエンジニア（Go）",
    category: "バックエンド",
    contractType: "案件",
    location: "東京都",
    workStyle: "フルリモート",
    itssLevel: 4,
    experienceYearsMin: 2,
    salaryLabel: "月額 70万円〜100万円",
    salaryMinManYen: 840,
    salaryMaxManYen: 1200,
    status: "募集終了",
    isPublic: false,
    applicantCount: 8,
    publishedDateLabel: "2026年4月15日",
    publishedDateISO: "2026-04-15",
    updatedDateLabel: "2026年5月30日",
    description:
      "認証基盤の刷新プロジェクトにて、Goによる高パフォーマンスなマイクロサービスの設計・実装を担当いただきました。募集は終了しています。",
    responsibilities: ["Goによる認証APIの設計・実装", "パフォーマンスチューニングおよび負荷対策"],
    requirements: ["Goでの実務経験2年以上"],
    requiredSkills: ["Go", "PostgreSQL", "Docker"],
    preferredSkills: ["Kubernetes", "gRPC", "AWS"],
    workConditions: [
      { label: "勤務地", value: "フルリモート" },
      { label: "就業時間", value: "裁量労働（コアタイムなし）" },
      { label: "契約期間", value: "1ヶ月更新（長期想定）" },
      { label: "精算幅", value: "150h〜200h" },
    ],
    benefits: ["リモート環境手当", "副業相談可", "PC貸与"],
    statistics: { views: 1102, applications: 8, documentScreening: 0, interviews: 0, offers: 1 },
    recentApplicants: [
      { name: "橋本 直人", appliedDateLabel: "2026年5月20日", status: "内定" },
    ],
  },
  {
    id: "11",
    title: "データエンジニア（Python / GCP）",
    category: "データ",
    contractType: "案件",
    location: "東京都",
    workStyle: "フルリモート",
    itssLevel: 4,
    experienceYearsMin: 2,
    salaryLabel: "月額 70万円〜100万円",
    salaryMinManYen: 840,
    salaryMaxManYen: 1200,
    status: "募集中",
    isPublic: true,
    applicantCount: 5,
    publishedDateLabel: "2026年7月3日",
    publishedDateISO: "2026-07-03",
    updatedDateLabel: "2026年7月12日",
    description:
      "データ分析基盤の構築・運用を担当するデータエンジニアを募集しています。BigQueryを中心としたデータパイプラインの設計に携われます。",
    responsibilities: ["GCP上でのデータパイプライン構築", "BigQueryを用いた分析基盤の設計"],
    requirements: ["Pythonでのデータ処理実務経験2年以上"],
    requiredSkills: ["Python", "GCP", "PostgreSQL"],
    preferredSkills: ["BigQuery", "Airflow", "dbt"],
    workConditions: [
      { label: "勤務地", value: "フルリモート" },
      { label: "就業時間", value: "裁量労働" },
      { label: "契約期間", value: "3ヶ月更新（長期想定）" },
      { label: "精算幅", value: "140h〜180h" },
    ],
    benefits: ["リモート環境手当", "書籍購入補助", "カンファレンス参加支援"],
    statistics: { views: 520, applications: 5, documentScreening: 3, interviews: 1, offers: 0 },
    recentApplicants: [
      { name: "石井 悠斗", appliedDateLabel: "2026年7月11日", status: "書類選考中" },
      { name: "青木 美月", appliedDateLabel: "2026年7月7日", status: "面接予定" },
    ],
  },
  {
    id: "12",
    title: "DevOpsエンジニア（Kubernetes / CI/CD）",
    category: "DevOps",
    contractType: "案件",
    location: "神奈川県",
    workStyle: "フルリモート",
    itssLevel: 4,
    experienceYearsMin: 2,
    salaryLabel: "月額 70万円〜100万円",
    salaryMinManYen: 840,
    salaryMaxManYen: 1200,
    status: "募集中",
    isPublic: true,
    applicantCount: 7,
    publishedDateLabel: "2026年6月25日",
    publishedDateISO: "2026-06-25",
    updatedDateLabel: "2026年7月8日",
    description:
      "複数プロダクトを横断するプラットフォームチームにて、CI/CDパイプラインの整備とKubernetes基盤の運用改善を担当していただきます。",
    responsibilities: ["CI/CDパイプラインの設計・改善", "Kubernetesクラスタの運用・監視体制の整備"],
    requirements: ["Kubernetes運用経験2年以上"],
    requiredSkills: ["Kubernetes", "Docker", "CI/CD"],
    preferredSkills: ["AWS", "Terraform", "Datadog"],
    workConditions: [
      { label: "勤務地", value: "神奈川県横浜市・リモート可（月2出社）" },
      { label: "就業時間", value: "裁量労働" },
      { label: "契約期間", value: "3ヶ月更新（長期想定）" },
      { label: "精算幅", value: "140h〜180h" },
    ],
    benefits: ["リモート環境手当", "書籍購入補助", "カンファレンス参加支援"],
    statistics: { views: 640, applications: 7, documentScreening: 3, interviews: 2, offers: 0 },
    recentApplicants: [
      { name: "藤田 健", appliedDateLabel: "2026年7月8日", status: "面接予定" },
      { name: "西村 彩", appliedDateLabel: "2026年7月2日", status: "書類選考中" },
    ],
  },
];
