/**
 * Engineer Job Search Module placeholder content (Japanese).
 * UI only — no backend, no real data, no authentication.
 */

import type { EmploymentConditions } from "@/constants/employment";

// ============================================================
// Search header
// ============================================================

export const SEARCH_HEADER = {
  title: "求人・案件検索",
  description: "あなたに合った求人・案件を検索できます。",
  searchPlaceholder: "職種・会社名・スキルで検索",
  searchButtonLabel: "検索",
  searchLabel: "求人・案件を検索",
} as const;

// ============================================================
// Filter options
// ============================================================

export const FILTER_LABELS = {
  title: "絞り込み条件",
  contractType: "契約形態",
  location: "勤務地",
  workStyle: "勤務形態",
  itssLevel: "ITSSレベル",
  experience: "経験年数",
  salary: "給与・単価",
  updated: "更新日",
  resetLabel: "条件をリセット",
} as const;

export const CONTRACT_TYPE_FILTER_OPTIONS = ["就職", "案件", "時間清算"] as const;

export const LOCATION_FILTER_OPTIONS = [
  "東京都",
  "神奈川県",
  "大阪府",
  "愛知県",
  "福岡県",
] as const;

export const WORK_STYLE_FILTER_OPTIONS = [
  "フルリモート",
  "一部リモート",
  "出社",
] as const;

export const ITSS_LEVEL_FILTER_OPTIONS = [1, 2, 3, 4, 5, 6, 7] as const;

export const EXPERIENCE_FILTER_OPTIONS = [
  { label: "指定なし", years: null },
  { label: "1年以上", years: 1 },
  { label: "3年以上", years: 3 },
  { label: "5年以上", years: 5 },
] as const;

export const UPDATED_FILTER_OPTIONS = [
  { label: "指定なし", days: null },
  { label: "3日以内", days: 3 },
  { label: "1週間以内", days: 7 },
  { label: "1ヶ月以内", days: 30 },
] as const;

export const SALARY_RANGE_CONFIG = {
  min: 300,
  max: 1600,
  step: 50,
  unit: "万円",
} as const;

export interface FilterState {
  contractTypes: string[];
  locations: string[];
  workStyles: string[];
  itssLevels: number[];
  experienceYears: number | null;
  salaryMin: number;
  salaryMax: number;
  updatedWithinDays: number | null;
}

export const DEFAULT_FILTER_STATE: FilterState = {
  contractTypes: [],
  locations: [],
  workStyles: [],
  itssLevels: [],
  experienceYears: null,
  salaryMin: SALARY_RANGE_CONFIG.min,
  salaryMax: SALARY_RANGE_CONFIG.max,
  updatedWithinDays: null,
};

// ============================================================
// Badge style maps (shared across job cards / detail / apply sidebar)
// ============================================================

export const CONTRACT_TYPE_BADGE_STYLES: Record<string, string> = {
  就職: "bg-blue-50 text-blue-700",
  案件: "bg-indigo-50 text-primary",
  時間清算: "bg-amber-50 text-amber-700",
};

export const STATUS_BADGE_STYLES: Record<string, string> = {
  募集中: "bg-green-50 text-green-700",
  締切間近: "bg-red-50 text-red-700",
};

export const WORK_STYLE_BADGE_STYLES: Record<string, string> = {
  フルリモート: "bg-teal-50 text-teal-700",
  一部リモート: "bg-cyan-50 text-cyan-700",
  出社: "bg-muted text-muted-foreground",
};

// ============================================================
// Job list / job card
// ============================================================

export const JOB_LIST_META = {
  resultsSuffix: "件の求人・案件が見つかりました",
  bookmarkLabel: "お気に入りに追加",
  bookmarkedLabel: "お気に入り済み",
  detailButtonLabel: "詳細を見る",
  postedPrefix: "掲載日：",
  itssRecommendationLabel: "推奨ITSSレベル",
} as const;

export const EMPTY_STATE_LABELS = {
  title: "条件に一致する求人・案件が見つかりませんでした。",
  description: "検索キーワードや絞り込み条件を変更してお試しください。",
  resetLabel: "条件をリセット",
} as const;

export const PAGINATION_LABELS = {
  previousLabel: "前へ",
  nextLabel: "次へ",
  pageLabelPrefix: "ページ",
} as const;

export const FILTER_DRAWER_LABELS = {
  openLabel: "絞り込み",
  title: "絞り込み条件",
  closeLabel: "閉じる",
  applyLabel: "この条件で絞り込む",
} as const;

export const ACTIVE_FILTERS_LABELS = {
  clearAllLabel: "すべてクリア",
  removeLabelPrefix: "フィルターを削除：",
} as const;

// ============================================================
// Sidebar
// ============================================================

export const JOB_SIDEBAR_LABELS = {
  recommendedSkillsTitle: "おすすめスキル",
  recommendedSkillsDescription:
    "これらのスキルを登録すると、マッチする求人・案件が増えます。",
  savedJobsTitle: "保存した求人・案件",
  savedJobsEmptyMessage: "保存した求人・案件はまだありません。",
} as const;

export const RECOMMENDED_SKILLS = [
  "Next.js",
  "Kubernetes",
  "GraphQL",
  "Terraform",
  "Go",
] as const;

export const DEFAULT_BOOKMARKED_JOB_IDS = ["3", "9"] as const;

// ============================================================
// Job detail — section labels
// ============================================================

export const JOB_DETAIL_META = {
  backLabel: "求人一覧に戻る",
  backHref: "/engineer/jobs",
} as const;

export const JOB_DETAIL_SECTION_LABELS = {
  responsibilitiesTitle: "仕事内容",
  requirementsTitle: "応募条件",
  requiredSkillsTitle: "必須スキル",
  preferredSkillsTitle: "歓迎スキル",
  workConditionsTitle: "勤務条件",
  benefitsTitle: "福利厚生",
  selectionFlowTitle: "選考フロー",
  companyInfoTitle: "企業情報",
} as const;

export const COMPANY_INFO_LABELS = {
  businessLabel: "事業内容",
  employeesLabel: "従業員数",
  websiteLabel: "コーポレートサイト",
} as const;

export const APPLY_SIDEBAR_LABELS = {
  applyLabel: "応募する",
  favoriteLabel: "お気に入り",
  favoritedLabel: "お気に入り済み",
  shareLabel: "シェア",
  sharedLabel: "リンクをコピーしました",
  updatedLabel: "更新日",
  demoNote: "※ 現在はUIデモのため、応募は実際には送信されません。",
  appliedMessage: "応募を受け付けました。（デモ表示のため実際には送信されていません）",
} as const;

// ============================================================
// Jobs (15 mock listings)
// ============================================================

export interface WorkCondition {
  label: string;
  value: string;
}

export interface CompanyInfo {
  description: string;
  business: string;
  employees: string;
  website: string;
}

export interface Job {
  id: string;
  title: string;
  category: string;
  company: string;
  companyInitials: string;
  contractType: (typeof CONTRACT_TYPE_FILTER_OPTIONS)[number];
  location: string;
  workStyle: (typeof WORK_STYLE_FILTER_OPTIONS)[number];
  status: "募集中" | "締切間近";
  salaryLabel: string;
  salaryMinManYen: number;
  salaryMaxManYen: number;
  skills: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  itssLevel: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  experienceYearsMin: number;
  postedLabel: string;
  updatedLabel: string;
  updatedDaysAgo: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  workConditions: WorkCondition[];
  benefits: string[];
  selectionFlow: string[];
  companyInfo: CompanyInfo;
  /** Only present when contractType is "就職" — labor condition disclosure items. */
  employmentConditions?: EmploymentConditions;
}

export const JOBS: Job[] = [
  {
    id: "1",
    title: "フロントエンドエンジニア（React / TypeScript）",
    category: "フロントエンド",
    company: "合同会社クラウドフォース",
    companyInitials: "ク",
    contractType: "案件",
    location: "東京都",
    workStyle: "フルリモート",
    status: "募集中",
    salaryLabel: "月額 60万円〜90万円",
    salaryMinManYen: 720,
    salaryMaxManYen: 1080,
    skills: ["React", "TypeScript", "Next.js"],
    requiredSkills: ["React", "TypeScript", "Next.js", "HTML/CSS"],
    preferredSkills: ["GraphQL", "Storybook", "Figma"],
    itssLevel: 3,
    experienceYearsMin: 2,
    postedLabel: "3日前",
    updatedLabel: "2026年7月13日",
    updatedDaysAgo: 3,
    description:
      "大手小売企業向けECサイトのフロントエンド刷新プロジェクトです。React / TypeScriptを用いたコンポーネント設計から、表示速度改善までを幅広く担当していただきます。",
    responsibilities: [
      "Next.jsによるECサイトのフロントエンド設計・実装",
      "デザインシステムに基づいたUIコンポーネントの構築",
      "表示速度・Core Web Vitalsの改善",
      "バックエンドエンジニアとのAPI連携仕様の調整",
    ],
    requirements: [
      "React / TypeScriptでの実務経験2年以上",
      "モダンフロントエンド開発（Next.jsなど）の経験",
      "チームでの開発経験",
    ],
    workConditions: [
      { label: "勤務地", value: "フルリモート（月1回の任意出社あり）" },
      { label: "就業時間", value: "10:00〜19:00（フレックス制）" },
      { label: "契約期間", value: "3ヶ月更新（長期想定）" },
      { label: "精算幅", value: "140h〜180h" },
    ],
    benefits: [
      "リモート環境手当",
      "書籍購入補助",
      "PC・ディスプレイ貸与",
      "副業相談可",
    ],
    selectionFlow: ["書類選考", "スキルシート面談", "最終面談", "契約締結"],
    companyInfo: {
      description:
        "受託開発とプロダクト開発の両輪で事業を展開するITベンチャー。フルリモート体制でエンジニアが働きやすい環境づくりに力を入れています。",
      business: "Webシステム受託開発／自社SaaS開発",
      employees: "45名",
      website: "https://cloudforce.example.com",
    },
  },
  {
    id: "2",
    title: "フロントエンドエンジニア（Vue.js / Nuxt3）",
    category: "フロントエンド",
    company: "株式会社ウェブブリッジ",
    companyInitials: "ウ",
    contractType: "就職",
    location: "東京都",
    workStyle: "一部リモート",
    status: "募集中",
    salaryLabel: "年収 480万円〜700万円",
    salaryMinManYen: 480,
    salaryMaxManYen: 700,
    skills: ["Vue.js", "Nuxt3", "TypeScript"],
    requiredSkills: ["Vue.js", "Nuxt3", "TypeScript"],
    preferredSkills: ["Nuxt Content", "Tailwind CSS", "Jest"],
    itssLevel: 3,
    experienceYearsMin: 2,
    postedLabel: "1週間前",
    updatedLabel: "2026年7月9日",
    updatedDaysAgo: 7,
    description:
      "自社予約管理SaaSのフロントエンド開発を担当するポジションです。Vue3 / Nuxt3への移行プロジェクトを中心に、機能開発から設計改善まで携われます。",
    responsibilities: [
      "予約管理SaaSの新機能開発",
      "Vue2からVue3 / Nuxt3への移行対応",
      "フロントエンド設計のリードおよびレビュー",
    ],
    requirements: [
      "Vue.jsでの実務経験2年以上",
      "SPA開発の経験",
      "チームでのコードレビュー経験",
    ],
    workConditions: [
      { label: "勤務地", value: "東京都港区（週2出社）" },
      { label: "就業時間", value: "9:30〜18:30" },
      { label: "休日休暇", value: "完全週休2日制（土日祝）・年間休日125日" },
      { label: "雇用形態", value: "正社員" },
    ],
    benefits: ["社会保険完備", "住宅手当", "健康診断", "資格取得支援制度"],
    selectionFlow: [
      "書類選考",
      "一次面接（オンライン）",
      "二次面接（技術面接）",
      "最終面接",
      "内定",
    ],
    companyInfo: {
      description:
        "店舗向け予約管理SaaSを展開する成長企業。プロダクト志向のエンジニア組織で、裁量を持って開発に取り組めます。",
      business: "SaaSプロダクト開発・運営",
      employees: "120名",
      website: "https://webbridge.example.com",
    },
    employmentConditions: {
      dutiesScopeOfChange: "会社の定める業務全般（システム開発関連業務）",
      employmentType: "正社員",
      contractPeriodType: "期間の定めなし",
      contractPeriod: "",
      probationPeriod: "あり（入社日から3ヶ月間）",
      renewal: {
        hasRenewal: "",
        renewalCriteria: "",
        hasRenewalLimit: "",
        renewalLimitCount: "",
        totalContractPeriodLimit: "",
      },
      workplace: "東京都港区（本社オフィス）",
      workplaceScopeOfChange: "会社の定める事業所（転居を伴う転勤なし）",
      startTime: "09:30",
      endTime: "18:30",
      breakTime: "60分",
      scheduledWorkingHours: "1日8時間・週40時間",
      hasOvertime: "あり",
      hasFixedOvertimePay: "なし",
      fixedOvertimePay: { hours: "", amount: "", excessPayNote: "" },
      holidays: "完全週休2日制（土日祝）",
      vacations: "年次有給休暇、夏季休暇、年末年始休暇、慶弔休暇",
      annualHolidaysCount: "125日",
      baseSalary: "月額270,000円〜390,000円",
      wageType: "月給",
      wageCalculationMethod: "所定労働時間分の月額固定給として計算し、時間外労働分は別途割増賃金を加算",
      wagePaymentMethod: "本人名義の銀行口座へ振込",
      wageClosingDate: "毎月末日",
      wagePaymentDate: "翌月25日",
      allowances: "住宅手当、通勤手当（全額支給）",
      salaryIncrease: "年1回（4月）",
      bonus: "年2回（6月・12月）",
      resignationProcedure: "自己都合退職の場合は30日前までに書面で届け出ること",
      dismissalGrounds: "就業規則に定める解雇事由に該当し、やむを得ない場合に行う",
      retirementAllowance: "勤続3年以上の者に退職金規程に基づき支給",
      temporaryWages: "該当なし",
      employeeBurden: "該当なし",
      safetyAndHealth: "年1回の定期健康診断を実施",
      vocationalTraining: "入社時研修、OJTによる技術研修を実施",
      disasterCompensation: "労働者災害補償保険法に基づく法定補償による",
      commendationAndSanctions: "就業規則に定める表彰・懲戒制度による",
      leaveOfAbsence: "私傷病休職制度あり（勤続年数に応じて最長6ヶ月）",
    },
  },
  {
    id: "3",
    title: "バックエンドエンジニア（Java / Spring Boot）",
    category: "バックエンド",
    company: "株式会社テックイノベーション",
    companyInitials: "テ",
    contractType: "就職",
    location: "東京都",
    workStyle: "出社",
    status: "募集中",
    salaryLabel: "年収 500万円〜800万円",
    salaryMinManYen: 500,
    salaryMaxManYen: 800,
    skills: ["Java", "Spring Boot", "AWS"],
    requiredSkills: ["Java", "Spring Boot", "PostgreSQL"],
    preferredSkills: ["AWS", "Docker", "Kubernetes"],
    itssLevel: 4,
    experienceYearsMin: 3,
    postedLabel: "2日前",
    updatedLabel: "2026年7月14日",
    updatedDaysAgo: 2,
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
    selectionFlow: [
      "書類選考",
      "一次面接（現場エンジニア）",
      "二次面接（技術面接）",
      "最終面接（役員）",
      "内定",
    ],
    companyInfo: {
      description:
        "自社SaaSプロダクトを複数展開するテックカンパニー。技術選定の自由度が高く、エンジニア主導でプロダクトを成長させる文化があります。",
      business: "業務効率化SaaSの開発・提供",
      employees: "230名",
      website: "https://tech-innovation.example.com",
    },
    employmentConditions: {
      dutiesScopeOfChange: "会社の定める業務全般（システム開発関連業務）",
      employmentType: "正社員",
      contractPeriodType: "期間の定めなし",
      contractPeriod: "",
      probationPeriod: "あり（入社日から3ヶ月間）",
      renewal: {
        hasRenewal: "",
        renewalCriteria: "",
        hasRenewalLimit: "",
        renewalLimitCount: "",
        totalContractPeriodLimit: "",
      },
      workplace: "東京都渋谷区（本社オフィス）",
      workplaceScopeOfChange: "会社の定める事業所（転居を伴う転勤なし）",
      startTime: "09:00",
      endTime: "18:00",
      breakTime: "60分",
      scheduledWorkingHours: "1日8時間・週40時間（フレックスタイム制、コアタイム11:00〜15:00）",
      hasOvertime: "あり",
      hasFixedOvertimePay: "あり",
      fixedOvertimePay: {
        hours: "月30時間分",
        amount: "50,000円",
        excessPayNote: "月30時間を超える時間外労働分は別途割増賃金を支給",
      },
      holidays: "完全週休2日制（土日祝）",
      vacations: "年次有給休暇、夏季休暇、年末年始休暇、慶弔休暇",
      annualHolidaysCount: "125日",
      baseSalary: "月額300,000円〜450,000円",
      wageType: "月給",
      wageCalculationMethod: "所定労働時間分の月額固定給として計算し、時間外労働分は別途割増賃金を加算",
      wagePaymentMethod: "本人名義の銀行口座へ振込",
      wageClosingDate: "毎月末日",
      wagePaymentDate: "翌月25日",
      allowances: "通勤手当（上限月30,000円）、住宅手当、家族手当",
      salaryIncrease: "年1回（4月）",
      bonus: "年2回（6月・12月）",
      resignationProcedure: "自己都合退職の場合は30日前までに書面で届け出ること",
      dismissalGrounds: "就業規則に定める解雇事由に該当し、やむを得ない場合に行う",
      retirementAllowance: "勤続3年以上の者に退職金規程に基づき支給",
      temporaryWages: "該当なし",
      employeeBurden: "該当なし",
      safetyAndHealth: "年1回の定期健康診断を実施",
      vocationalTraining: "入社時研修、OJTによる技術研修を実施",
      disasterCompensation: "労働者災害補償保険法に基づく法定補償による",
      commendationAndSanctions: "就業規則に定める表彰・懲戒制度による",
      leaveOfAbsence: "私傷病休職制度あり（勤続年数に応じて最長6ヶ月）",
    },
  },
  {
    id: "4",
    title: "バックエンドエンジニア（Go）",
    category: "バックエンド",
    company: "株式会社ゼロトラスト",
    companyInitials: "ゼ",
    contractType: "案件",
    location: "東京都",
    workStyle: "フルリモート",
    status: "募集中",
    salaryLabel: "月額 70万円〜100万円",
    salaryMinManYen: 840,
    salaryMaxManYen: 1200,
    skills: ["Go", "Docker", "PostgreSQL"],
    requiredSkills: ["Go", "PostgreSQL", "Docker"],
    preferredSkills: ["Kubernetes", "gRPC", "AWS"],
    itssLevel: 4,
    experienceYearsMin: 2,
    postedLabel: "5日前",
    updatedLabel: "2026年7月11日",
    updatedDaysAgo: 5,
    description:
      "認証基盤SaaSのバックエンドAPI開発を担当いただきます。Goによる高パフォーマンスなマイクロサービスの設計・実装経験を活かせるポジションです。",
    responsibilities: [
      "Goによる認証APIの設計・実装",
      "パフォーマンスチューニングおよび負荷対策",
      "CI/CDパイプラインの改善",
    ],
    requirements: [
      "Goでの実務経験2年以上",
      "RESTful API設計の経験",
      "コンテナ環境での開発経験",
    ],
    workConditions: [
      { label: "勤務地", value: "フルリモート" },
      { label: "就業時間", value: "裁量労働（コアタイムなし）" },
      { label: "契約期間", value: "1ヶ月更新（長期想定）" },
      { label: "精算幅", value: "150h〜200h" },
    ],
    benefits: ["リモート環境手当", "副業相談可", "PC貸与"],
    selectionFlow: ["書類選考", "技術面談", "最終面談", "契約締結"],
    companyInfo: {
      description:
        "認証・セキュリティ領域に特化したSaaSを開発するスタートアップ。少人数精鋭で高い技術力を持つメンバーが揃っています。",
      business: "認証・セキュリティSaaSの開発",
      employees: "28名",
      website: "https://zerotrust.example.com",
    },
  },
  {
    id: "5",
    title: "フルスタックエンジニア（Next.js / Node.js）",
    category: "フルスタック",
    company: "株式会社アナリティクスラボ",
    companyInitials: "ア",
    contractType: "案件",
    location: "東京都",
    workStyle: "フルリモート",
    status: "募集中",
    salaryLabel: "月額 65万円〜95万円",
    salaryMinManYen: 780,
    salaryMaxManYen: 1140,
    skills: ["Next.js", "Node.js", "TypeScript"],
    requiredSkills: ["Next.js", "Node.js", "TypeScript", "PostgreSQL"],
    preferredSkills: ["GraphQL", "AWS", "Docker"],
    itssLevel: 3,
    experienceYearsMin: 2,
    postedLabel: "4日前",
    updatedLabel: "2026年7月12日",
    updatedDaysAgo: 4,
    description:
      "データ分析ダッシュボードSaaSの開発チームにジョインし、フロントエンドからAPI開発まで一貫して担当していただきます。",
    responsibilities: [
      "Next.jsによるダッシュボードUIの開発",
      "Node.js（Express）によるAPI開発",
      "データベース設計およびクエリ最適化",
    ],
    requirements: [
      "フルスタックでの開発経験2年以上",
      "TypeScriptでの開発経験",
      "SQLを用いたデータ設計経験",
    ],
    workConditions: [
      { label: "勤務地", value: "フルリモート（月1回オフサイトあり）" },
      { label: "就業時間", value: "10:00〜19:00" },
      { label: "契約期間", value: "3ヶ月更新（長期想定）" },
      { label: "精算幅", value: "140h〜180h" },
    ],
    benefits: ["リモート環境手当", "書籍購入補助", "副業相談可"],
    selectionFlow: ["書類選考", "スキルシート面談", "最終面談", "契約締結"],
    companyInfo: {
      description:
        "BtoB向けデータ分析ダッシュボードを提供するスタートアップ。データドリブンな意思決定を支援するプロダクトを開発しています。",
      business: "データ分析SaaSの開発・提供",
      employees: "60名",
      website: "https://analytics-lab.example.com",
    },
  },
  {
    id: "6",
    title: "フルスタックエンジニア（TypeScript / AWS）",
    category: "フルスタック",
    company: "株式会社デジタルブリッジ",
    companyInitials: "デ",
    contractType: "時間清算",
    location: "東京都",
    workStyle: "一部リモート",
    status: "締切間近",
    salaryLabel: "時間単価 4,500円〜6,000円",
    salaryMinManYen: 864,
    salaryMaxManYen: 1152,
    skills: ["TypeScript", "React", "AWS"],
    requiredSkills: ["TypeScript", "React", "AWS", "Node.js"],
    preferredSkills: ["Terraform", "GraphQL"],
    itssLevel: 3,
    experienceYearsMin: 3,
    postedLabel: "1週間前",
    updatedLabel: "2026年7月8日",
    updatedDaysAgo: 8,
    description:
      "受託開発案件にて、フロントエンドからバックエンド・インフラまで一貫して対応いただけるエンジニアを募集しています。",
    responsibilities: [
      "クライアントワークにおける要件定義支援",
      "React / Node.jsによるアプリケーション開発",
      "AWS環境の構築・運用",
    ],
    requirements: [
      "フルスタックでの開発経験3年以上",
      "AWSを用いたインフラ構築経験",
      "クライアントとの折衝経験",
    ],
    workConditions: [
      { label: "勤務地", value: "東京都・一部リモート可（週1出社）" },
      { label: "就業時間", value: "9:00〜18:00" },
      { label: "契約期間", value: "精算契約（月次）" },
      { label: "精算幅", value: "140h〜180h（超過分は別途精算）" },
    ],
    benefits: ["交通費支給", "PC貸与", "各種研修参加可"],
    selectionFlow: ["書類選考", "面談", "契約締結"],
    companyInfo: {
      description:
        "Webシステムの受託開発を中心に、フロントエンドからインフラまで幅広く手がける開発会社。",
      business: "Webシステム受託開発",
      employees: "85名",
      website: "https://digital-bridge.example.com",
    },
  },
  {
    id: "7",
    title: "クラウドエンジニア（AWS）",
    category: "クラウド",
    company: "株式会社インフラネクスト",
    companyInitials: "イ",
    contractType: "就職",
    location: "東京都",
    workStyle: "出社",
    status: "募集中",
    salaryLabel: "年収 550万円〜850万円",
    salaryMinManYen: 550,
    salaryMaxManYen: 850,
    skills: ["AWS", "Docker", "Terraform"],
    requiredSkills: ["AWS", "Docker", "Linux"],
    preferredSkills: ["Terraform", "Kubernetes", "Python"],
    itssLevel: 4,
    experienceYearsMin: 3,
    postedLabel: "6日前",
    updatedLabel: "2026年7月10日",
    updatedDaysAgo: 6,
    description:
      "自社サービスのクラウドインフラ設計・構築・運用を担当するポジションです。AWSを中心としたインフラのモダナイズを推進していただきます。",
    responsibilities: [
      "AWS環境のアーキテクチャ設計・構築",
      "IaCによるインフラのコード化推進",
      "モニタリング・アラート体制の整備",
      "コスト最適化の推進",
    ],
    requirements: [
      "AWSでのインフラ構築経験3年以上",
      "コンテナ技術（Docker）の実務経験",
      "Linuxサーバーの運用経験",
    ],
    workConditions: [
      { label: "勤務地", value: "東京都新宿区（フレックス出社）" },
      { label: "就業時間", value: "フレックスタイム制" },
      { label: "休日休暇", value: "完全週休2日制（土日祝）" },
      { label: "雇用形態", value: "正社員" },
    ],
    benefits: [
      "社会保険完備",
      "資格取得支援制度（AWS認定資格の受験料補助）",
      "各種手当",
    ],
    selectionFlow: [
      "書類選考",
      "一次面接",
      "二次面接（技術面接）",
      "最終面接",
      "内定",
    ],
    companyInfo: {
      description:
        "クラウドインフラの構築・運用支援を強みとする企業。自社サービスに加えて大手企業のクラウド移行支援も手がけています。",
      business: "クラウドインフラ構築・運用支援",
      employees: "150名",
      website: "https://infra-next.example.com",
    },
    employmentConditions: {
      dutiesScopeOfChange: "会社の定める業務全般（クラウドインフラ関連業務）",
      employmentType: "正社員",
      contractPeriodType: "期間の定めなし",
      contractPeriod: "",
      probationPeriod: "あり（入社日から3ヶ月間）",
      renewal: {
        hasRenewal: "",
        renewalCriteria: "",
        hasRenewalLimit: "",
        renewalLimitCount: "",
        totalContractPeriodLimit: "",
      },
      workplace: "東京都新宿区（本社オフィス）",
      workplaceScopeOfChange: "会社の定める事業所（転居を伴う転勤なし）",
      startTime: "09:00",
      endTime: "18:00",
      breakTime: "60分",
      scheduledWorkingHours: "1日8時間・週40時間（フレックスタイム制）",
      hasOvertime: "あり",
      hasFixedOvertimePay: "あり",
      fixedOvertimePay: {
        hours: "月20時間分",
        amount: "40,000円",
        excessPayNote: "月20時間を超える時間外労働分は別途割増賃金を支給",
      },
      holidays: "完全週休2日制（土日祝）",
      vacations: "年次有給休暇、夏季休暇、年末年始休暇、慶弔休暇",
      annualHolidaysCount: "124日",
      baseSalary: "月額320,000円〜460,000円",
      wageType: "月給",
      wageCalculationMethod: "所定労働時間分の月額固定給として計算し、時間外労働分は別途割増賃金を加算",
      wagePaymentMethod: "本人名義の銀行口座へ振込",
      wageClosingDate: "毎月20日",
      wagePaymentDate: "翌月10日",
      allowances: "通勤手当（全額支給）、資格手当",
      salaryIncrease: "年1回（4月）",
      bonus: "年2回（6月・12月）",
      resignationProcedure: "自己都合退職の場合は30日前までに書面で届け出ること",
      dismissalGrounds: "就業規則に定める解雇事由に該当し、やむを得ない場合に行う",
      retirementAllowance: "勤続3年以上の者に退職金規程に基づき支給",
      temporaryWages: "該当なし",
      employeeBurden: "該当なし",
      safetyAndHealth: "年1回の定期健康診断を実施",
      vocationalTraining: "入社時研修、AWS認定資格取得支援制度あり",
      disasterCompensation: "労働者災害補償保険法に基づく法定補償による",
      commendationAndSanctions: "就業規則に定める表彰・懲戒制度による",
      leaveOfAbsence: "私傷病休職制度あり（勤続年数に応じて最長6ヶ月）",
    },
  },
  {
    id: "8",
    title: "クラウドエンジニア（GCP / Terraform）",
    category: "クラウド",
    company: "株式会社スケールワークス",
    companyInitials: "ス",
    contractType: "案件",
    location: "東京都",
    workStyle: "フルリモート",
    status: "募集中",
    salaryLabel: "月額 75万円〜105万円",
    salaryMinManYen: 900,
    salaryMaxManYen: 1260,
    skills: ["GCP", "Terraform", "Kubernetes"],
    requiredSkills: ["GCP", "Terraform", "Kubernetes"],
    preferredSkills: ["AWS", "Python", "Datadog"],
    itssLevel: 5,
    experienceYearsMin: 3,
    postedLabel: "3日前",
    updatedLabel: "2026年7月13日",
    updatedDaysAgo: 3,
    description:
      "GCP上で稼働するマイクロサービス基盤の設計・構築を担当していただきます。Terraformを用いたIaC推進の中心メンバーとして活躍いただけるポジションです。",
    responsibilities: [
      "GCP環境のアーキテクチャ設計",
      "Terraformによるインフラのコード化",
      "Kubernetesクラスタの構築・運用",
      "SREとしての信頼性向上施策の推進",
    ],
    requirements: [
      "GCPまたは主要クラウドでのインフラ構築経験3年以上",
      "Terraformを用いたIaC実務経験",
      "Kubernetes運用経験",
    ],
    workConditions: [
      { label: "勤務地", value: "フルリモート" },
      { label: "就業時間", value: "裁量労働" },
      { label: "契約期間", value: "3ヶ月更新（長期想定）" },
      { label: "精算幅", value: "140h〜180h" },
    ],
    benefits: ["リモート環境手当", "書籍購入補助", "カンファレンス参加支援"],
    selectionFlow: ["書類選考", "技術面談", "最終面談", "契約締結"],
    companyInfo: {
      description:
        "急成長するSaaS企業向けにインフラの内製化・スケール支援を行うテックカンパニー。",
      business: "クラウドインフラ構築支援・SREコンサルティング",
      employees: "40名",
      website: "https://scaleworks.example.com",
    },
  },
  {
    id: "9",
    title: "AIエンジニア（Python / 機械学習）",
    category: "AI",
    company: "株式会社データフォレスト",
    companyInitials: "デ",
    contractType: "就職",
    location: "東京都",
    workStyle: "一部リモート",
    status: "募集中",
    salaryLabel: "年収 600万円〜900万円",
    salaryMinManYen: 600,
    salaryMaxManYen: 900,
    skills: ["Python", "機械学習", "AWS"],
    requiredSkills: ["Python", "機械学習", "SQL"],
    preferredSkills: ["AWS", "Docker", "MLOps"],
    itssLevel: 5,
    experienceYearsMin: 2,
    postedLabel: "2日前",
    updatedLabel: "2026年7月14日",
    updatedDaysAgo: 2,
    description:
      "需要予測モデルの開発・改善を担当するAIエンジニアを募集しています。データ収集からモデルの本番運用まで一気通貫で携われるポジションです。",
    responsibilities: [
      "機械学習モデルの設計・開発・評価",
      "特徴量エンジニアリングとデータパイプライン構築",
      "モデルの本番環境への実装・運用",
      "分析結果のビジネス部門への共有",
    ],
    requirements: [
      "Pythonを用いた機械学習モデル開発経験2年以上",
      "統計・機械学習の基礎知識",
      "SQLによるデータ抽出・加工経験",
    ],
    workConditions: [
      { label: "勤務地", value: "東京都千代田区（週2リモート可）" },
      { label: "就業時間", value: "フレックスタイム制" },
      { label: "休日休暇", value: "完全週休2日制（土日祝）" },
      { label: "雇用形態", value: "正社員" },
    ],
    benefits: [
      "社会保険完備",
      "研究開発予算あり",
      "学会参加支援",
      "書籍購入補助",
    ],
    selectionFlow: [
      "書類選考",
      "一次面接（技術面接）",
      "二次面接（データサイエンティスト面接）",
      "最終面接",
      "内定",
    ],
    companyInfo: {
      description:
        "小売・物流業界向けにデータ分析・機械学習ソリューションを提供する企業。実データを用いた高度な分析基盤を保有しています。",
      business: "データ分析・機械学習ソリューションの提供",
      employees: "95名",
      website: "https://data-forest.example.com",
    },
    employmentConditions: {
      dutiesScopeOfChange: "会社の定める業務全般（データ分析・機械学習関連業務）",
      employmentType: "正社員",
      contractPeriodType: "期間の定めなし",
      contractPeriod: "",
      probationPeriod: "あり（入社日から6ヶ月間）",
      renewal: {
        hasRenewal: "",
        renewalCriteria: "",
        hasRenewalLimit: "",
        renewalLimitCount: "",
        totalContractPeriodLimit: "",
      },
      workplace: "東京都千代田区（本社オフィス）",
      workplaceScopeOfChange: "会社の定める事業所（転居を伴う転勤なし）",
      startTime: "10:00",
      endTime: "19:00",
      breakTime: "60分",
      scheduledWorkingHours: "1日8時間・週40時間（フレックスタイム制）",
      hasOvertime: "あり",
      hasFixedOvertimePay: "なし",
      fixedOvertimePay: { hours: "", amount: "", excessPayNote: "" },
      holidays: "完全週休2日制（土日祝）",
      vacations: "年次有給休暇、夏季休暇、年末年始休暇、慶弔休暇",
      annualHolidaysCount: "123日",
      baseSalary: "月額350,000円〜500,000円",
      wageType: "月給",
      wageCalculationMethod: "所定労働時間分の月額固定給として計算し、時間外労働分は別途割増賃金を加算",
      wagePaymentMethod: "本人名義の銀行口座へ振込",
      wageClosingDate: "毎月15日",
      wagePaymentDate: "当月28日",
      allowances: "通勤手当（全額支給）、研究開発手当",
      salaryIncrease: "年1回（7月）",
      bonus: "業績に応じて年1回〜2回",
      resignationProcedure: "自己都合退職の場合は30日前までに書面で届け出ること",
      dismissalGrounds: "就業規則に定める解雇事由に該当し、やむを得ない場合に行う",
      retirementAllowance: "該当なし",
      temporaryWages: "該当なし",
      employeeBurden: "該当なし",
      safetyAndHealth: "年1回の定期健康診断を実施",
      vocationalTraining: "入社時研修、学会・研修参加支援制度あり",
      disasterCompensation: "労働者災害補償保険法に基づく法定補償による",
      commendationAndSanctions: "就業規則に定める表彰・懲戒制度による",
      leaveOfAbsence: "私傷病休職制度あり（勤続年数に応じて最長6ヶ月）",
    },
  },
  {
    id: "10",
    title: "AIエンジニア（LLM／生成AI）",
    category: "AI",
    company: "株式会社ニューラルゲート",
    companyInitials: "ニ",
    contractType: "案件",
    location: "東京都",
    workStyle: "フルリモート",
    status: "募集中",
    salaryLabel: "月額 90万円〜130万円",
    salaryMinManYen: 1080,
    salaryMaxManYen: 1560,
    skills: ["Python", "LLM", "AWS"],
    requiredSkills: ["Python", "LLM", "RAG"],
    preferredSkills: ["LangChain", "AWS", "Docker"],
    itssLevel: 5,
    experienceYearsMin: 3,
    postedLabel: "1日前",
    updatedLabel: "2026年7月15日",
    updatedDaysAgo: 1,
    description:
      "生成AIを活用した社内向けナレッジ検索サービスの開発を担当していただきます。RAG構成の設計・実装経験を活かせるポジションです。",
    responsibilities: [
      "LLMを活用したRAGシステムの設計・実装",
      "プロンプト設計・評価基盤の構築",
      "ベクトルデータベースの選定・運用",
      "API化および既存システムとの連携",
    ],
    requirements: [
      "Pythonでの開発経験3年以上",
      "LLM／生成AIを用いた開発経験",
      "クラウド環境でのAPI開発経験",
    ],
    workConditions: [
      { label: "勤務地", value: "フルリモート" },
      { label: "就業時間", value: "裁量労働" },
      { label: "契約期間", value: "3ヶ月更新（長期想定）" },
      { label: "精算幅", value: "140h〜180h" },
    ],
    benefits: ["リモート環境手当", "最新GPU環境の提供", "書籍購入補助"],
    selectionFlow: ["書類選考", "技術面談", "最終面談", "契約締結"],
    companyInfo: {
      description:
        "生成AI領域に特化したプロダクト開発を行うスタートアップ。大手企業向けに生成AI活用支援も展開しています。",
      business: "生成AIプロダクトの開発・導入支援",
      employees: "22名",
      website: "https://neural-gate.example.com",
    },
  },
  {
    id: "11",
    title: "DevOpsエンジニア（Kubernetes / CI/CD）",
    category: "DevOps",
    company: "株式会社パイプラインワークス",
    companyInitials: "パ",
    contractType: "案件",
    location: "神奈川県",
    workStyle: "フルリモート",
    status: "募集中",
    salaryLabel: "月額 70万円〜100万円",
    salaryMinManYen: 840,
    salaryMaxManYen: 1200,
    skills: ["Kubernetes", "Docker", "AWS"],
    requiredSkills: ["Kubernetes", "Docker", "CI/CD"],
    preferredSkills: ["AWS", "Terraform", "Datadog"],
    itssLevel: 4,
    experienceYearsMin: 2,
    postedLabel: "5日前",
    updatedLabel: "2026年7月11日",
    updatedDaysAgo: 5,
    description:
      "複数プロダクトを横断するプラットフォームチームにて、CI/CDパイプラインの整備とKubernetes基盤の運用改善を担当していただきます。",
    responsibilities: [
      "CI/CDパイプラインの設計・改善",
      "Kubernetesクラスタの運用・監視体制の整備",
      "開発者向け基盤ツールの整備",
    ],
    requirements: [
      "Kubernetes運用経験2年以上",
      "CI/CDツール（GitHub Actionsなど）の構築経験",
      "コンテナ技術全般の知識",
    ],
    workConditions: [
      { label: "勤務地", value: "神奈川県横浜市・リモート可（月2出社）" },
      { label: "就業時間", value: "裁量労働" },
      { label: "契約期間", value: "3ヶ月更新（長期想定）" },
      { label: "精算幅", value: "140h〜180h" },
    ],
    benefits: ["リモート環境手当", "書籍購入補助", "カンファレンス参加支援"],
    selectionFlow: ["書類選考", "技術面談", "最終面談", "契約締結"],
    companyInfo: {
      description:
        "複数の自社プロダクトを支えるプラットフォームエンジニアリングに強みを持つ企業。開発生産性向上を専門に扱うチームがあります。",
      business: "プラットフォームエンジニアリング・DevOps支援",
      employees: "70名",
      website: "https://pipeline-works.example.com",
    },
  },
  {
    id: "12",
    title: "PM／プロジェクトマネージャー（システム開発）",
    category: "PM",
    company: "株式会社ブリッジソリューションズ",
    companyInitials: "ブ",
    contractType: "就職",
    location: "大阪府",
    workStyle: "一部リモート",
    status: "募集中",
    salaryLabel: "年収 650万円〜950万円",
    salaryMinManYen: 650,
    salaryMaxManYen: 950,
    skills: ["プロジェクトマネジメント", "AWS", "Java"],
    requiredSkills: ["プロジェクトマネジメント", "要件定義"],
    preferredSkills: ["AWS", "Java", "アジャイル開発"],
    itssLevel: 5,
    experienceYearsMin: 3,
    postedLabel: "1週間前",
    updatedLabel: "2026年7月9日",
    updatedDaysAgo: 7,
    description:
      "官公庁・大手企業向けシステム開発プロジェクトのPMを募集しています。要件定義から本番リリースまでのプロジェクト全体を統括していただきます。",
    responsibilities: [
      "システム開発プロジェクトの計画・進行管理",
      "顧客・関係部署との折衝、要件調整",
      "開発チームのマネジメントおよび品質管理",
      "予算・スケジュール管理",
    ],
    requirements: [
      "システム開発プロジェクトのPM経験3年以上",
      "要件定義・顧客折衝の経験",
      "チームマネジメント経験",
    ],
    workConditions: [
      { label: "勤務地", value: "大阪府大阪市（一部リモート可）" },
      { label: "就業時間", value: "9:00〜18:00" },
      { label: "休日休暇", value: "完全週休2日制（土日祝）・年間休日120日" },
      { label: "雇用形態", value: "正社員" },
    ],
    benefits: [
      "社会保険完備",
      "各種手当（住宅・役職）",
      "資格取得支援制度",
      "退職金制度",
    ],
    selectionFlow: ["書類選考", "一次面接", "二次面接（役員面接）", "内定"],
    companyInfo: {
      description:
        "官公庁・大手企業向けのシステム開発を中心に手がけるSIer。安定した経営基盤のもと、大規模プロジェクトに携われます。",
      business: "システムインテグレーション（官公庁・大手企業向け）",
      employees: "310名",
      website: "https://bridge-solutions.example.com",
    },
    employmentConditions: {
      dutiesScopeOfChange: "会社の定める業務全般（プロジェクトマネジメント関連業務）",
      employmentType: "正社員",
      contractPeriodType: "期間の定めなし",
      contractPeriod: "",
      probationPeriod: "あり（入社日から3ヶ月間）",
      renewal: {
        hasRenewal: "",
        renewalCriteria: "",
        hasRenewalLimit: "",
        renewalLimitCount: "",
        totalContractPeriodLimit: "",
      },
      workplace: "大阪府大阪市（大阪支社）",
      workplaceScopeOfChange: "会社の定める事業所（大阪府内に限る）",
      startTime: "09:00",
      endTime: "18:00",
      breakTime: "60分",
      scheduledWorkingHours: "1日8時間・週40時間",
      hasOvertime: "あり",
      hasFixedOvertimePay: "あり",
      fixedOvertimePay: {
        hours: "月40時間分",
        amount: "80,000円",
        excessPayNote: "月40時間を超える時間外労働分は別途割増賃金を支給",
      },
      holidays: "完全週休2日制（土日祝）",
      vacations: "年次有給休暇、夏季休暇、年末年始休暇、慶弔休暇",
      annualHolidaysCount: "120日",
      baseSalary: "月額420,000円〜580,000円",
      wageType: "月給",
      wageCalculationMethod: "所定労働時間分の月額固定給として計算し、時間外労働分は別途割増賃金を加算",
      wagePaymentMethod: "本人名義の銀行口座へ振込",
      wageClosingDate: "毎月末日",
      wagePaymentDate: "翌月25日",
      allowances: "通勤手当（全額支給）、住宅手当、役職手当",
      salaryIncrease: "年1回（4月）",
      bonus: "年2回（6月・12月）",
      resignationProcedure: "自己都合退職の場合は30日前までに書面で届け出ること",
      dismissalGrounds: "就業規則に定める解雇事由に該当し、やむを得ない場合に行う",
      retirementAllowance: "勤続3年以上の者に退職金規程に基づき支給",
      temporaryWages: "該当なし",
      employeeBurden: "該当なし",
      safetyAndHealth: "年1回の定期健康診断を実施",
      vocationalTraining: "入社時研修、PMP資格取得支援制度あり",
      disasterCompensation: "労働者災害補償保険法に基づく法定補償による",
      commendationAndSanctions: "就業規則に定める表彰・懲戒制度による",
      leaveOfAbsence: "私傷病休職制度あり（勤続年数に応じて最長6ヶ月）",
    },
  },
  {
    id: "13",
    title: "QAエンジニア（自動化テスト）",
    category: "QA",
    company: "株式会社クオリティファースト",
    companyInitials: "ク",
    contractType: "就職",
    location: "東京都",
    workStyle: "一部リモート",
    status: "募集中",
    salaryLabel: "年収 480万円〜680万円",
    salaryMinManYen: 480,
    salaryMaxManYen: 680,
    skills: ["Selenium", "Python", "JSTQB"],
    requiredSkills: ["テスト設計", "Selenium", "JSTQB Foundation Level"],
    preferredSkills: ["Python", "CI/CD", "APIテスト"],
    itssLevel: 3,
    experienceYearsMin: 2,
    postedLabel: "2日前",
    updatedLabel: "2026年7月14日",
    updatedDaysAgo: 2,
    description:
      "自社SaaSプロダクトのQAエンジニアとして、テスト計画の立案から自動テストの構築・運用までを担当していただきます。",
    responsibilities: [
      "テスト計画・テストケースの設計",
      "Seleniumを用いたE2Eテストの自動化",
      "リリース前の品質保証プロセスの運用",
      "開発チームとの品質改善に向けた連携",
    ],
    requirements: [
      "ソフトウェアテスト業務の実務経験2年以上",
      "テスト自動化ツールの利用経験",
      "JSTQB Foundation Level相当の知識",
    ],
    workConditions: [
      { label: "勤務地", value: "東京都品川区（週3リモート可）" },
      { label: "就業時間", value: "9:30〜18:30" },
      { label: "休日休暇", value: "完全週休2日制（土日祝）" },
      { label: "雇用形態", value: "正社員" },
    ],
    benefits: ["社会保険完備", "資格取得支援制度", "書籍購入補助"],
    selectionFlow: [
      "書類選考",
      "一次面接",
      "技術課題（テスト設計）",
      "最終面接",
      "内定",
    ],
    companyInfo: {
      description:
        "SaaSプロダクトの品質保証に特化したチームを持つ企業。自動化によるQAプロセスの効率化を推進しています。",
      business: "品質保証・テスト自動化支援",
      employees: "55名",
      website: "https://quality-first.example.com",
    },
    employmentConditions: {
      dutiesScopeOfChange: "会社の定める業務全般（品質保証関連業務）",
      employmentType: "正社員",
      contractPeriodType: "期間の定めなし",
      contractPeriod: "",
      probationPeriod: "あり（入社日から3ヶ月間）",
      renewal: {
        hasRenewal: "",
        renewalCriteria: "",
        hasRenewalLimit: "",
        renewalLimitCount: "",
        totalContractPeriodLimit: "",
      },
      workplace: "東京都品川区（本社オフィス）",
      workplaceScopeOfChange: "会社の定める事業所（転居を伴う転勤なし）",
      startTime: "09:30",
      endTime: "18:30",
      breakTime: "60分",
      scheduledWorkingHours: "1日8時間・週40時間",
      hasOvertime: "あり",
      hasFixedOvertimePay: "なし",
      fixedOvertimePay: { hours: "", amount: "", excessPayNote: "" },
      holidays: "完全週休2日制（土日祝）",
      vacations: "年次有給休暇、夏季休暇、年末年始休暇、慶弔休暇",
      annualHolidaysCount: "120日",
      baseSalary: "月額280,000円〜380,000円",
      wageType: "月給",
      wageCalculationMethod: "所定労働時間分の月額固定給として計算し、時間外労働分は別途割増賃金を加算",
      wagePaymentMethod: "本人名義の銀行口座へ振込",
      wageClosingDate: "毎月末日",
      wagePaymentDate: "翌月25日",
      allowances: "通勤手当（上限月20,000円）",
      salaryIncrease: "年1回（4月）",
      bonus: "年2回（6月・12月）",
      resignationProcedure: "自己都合退職の場合は30日前までに書面で届け出ること",
      dismissalGrounds: "就業規則に定める解雇事由に該当し、やむを得ない場合に行う",
      retirementAllowance: "勤続3年以上の者に退職金規程に基づき支給",
      temporaryWages: "該当なし",
      employeeBurden: "該当なし",
      safetyAndHealth: "年1回の定期健康診断を実施",
      vocationalTraining: "入社時研修、資格取得支援制度あり",
      disasterCompensation: "労働者災害補償保険法に基づく法定補償による",
      commendationAndSanctions: "就業規則に定める表彰・懲戒制度による",
      leaveOfAbsence: "私傷病休職制度あり（勤続年数に応じて最長6ヶ月）",
    },
  },
  {
    id: "14",
    title: "セキュリティエンジニア（SOC / 脆弱性診断）",
    category: "セキュリティ",
    company: "株式会社シールドテック",
    companyInitials: "シ",
    contractType: "案件",
    location: "東京都",
    workStyle: "フルリモート",
    status: "募集中",
    salaryLabel: "月額 80万円〜110万円",
    salaryMinManYen: 960,
    salaryMaxManYen: 1320,
    skills: ["脆弱性診断", "SIEM", "Python"],
    requiredSkills: ["脆弱性診断", "ネットワークセキュリティ", "インシデント対応"],
    preferredSkills: ["SIEM運用", "Python", "CISSP"],
    itssLevel: 5,
    experienceYearsMin: 3,
    postedLabel: "1日前",
    updatedLabel: "2026年7月15日",
    updatedDaysAgo: 1,
    description:
      "自社および顧客システムのセキュリティ診断・監視を担当するセキュリティエンジニアを募集しています。",
    responsibilities: [
      "Webアプリケーション・インフラの脆弱性診断",
      "SOCにおけるログ監視・インシデント対応",
      "セキュリティポリシーの策定・改善",
      "社内向けセキュリティ教育の実施",
    ],
    requirements: [
      "セキュリティエンジニアとしての実務経験3年以上",
      "脆弱性診断ツールの使用経験",
      "インシデント対応の経験",
    ],
    workConditions: [
      { label: "勤務地", value: "フルリモート" },
      { label: "就業時間", value: "裁量労働" },
      { label: "契約期間", value: "3ヶ月更新（長期想定）" },
      { label: "精算幅", value: "140h〜180h" },
    ],
    benefits: ["リモート環境手当", "資格取得支援（CISSP等）", "書籍購入補助"],
    selectionFlow: ["書類選考", "技術面談", "最終面談", "契約締結"],
    companyInfo: {
      description:
        "官公庁・金融機関向けにセキュリティ診断・監視サービスを提供する専門企業。",
      business: "セキュリティ診断・SOC運用サービス",
      employees: "65名",
      website: "https://shieldtech.example.com",
    },
  },
  {
    id: "15",
    title: "フルスタックエンジニア（Ruby on Rails）",
    category: "フルスタック",
    company: "株式会社グロースパートナーズ",
    companyInitials: "グ",
    contractType: "就職",
    location: "愛知県",
    workStyle: "一部リモート",
    status: "募集中",
    salaryLabel: "年収 500万円〜750万円",
    salaryMinManYen: 500,
    salaryMaxManYen: 750,
    skills: ["Ruby on Rails", "PostgreSQL", "AWS"],
    requiredSkills: ["Ruby on Rails", "PostgreSQL"],
    preferredSkills: ["AWS", "Docker", "React"],
    itssLevel: 3,
    experienceYearsMin: 2,
    postedLabel: "6日前",
    updatedLabel: "2026年7月10日",
    updatedDaysAgo: 6,
    description:
      "地域産業向け業務システムを開発する自社プロダクトチームにて、Ruby on Railsを用いたWebアプリケーション開発を担当していただきます。",
    responsibilities: [
      "Ruby on Railsによる業務システムの機能開発",
      "データベース設計・パフォーマンスチューニング",
      "要件定義から運用まで一貫した開発への参加",
    ],
    requirements: [
      "Ruby on Railsでの実務経験2年以上",
      "RDBMSを用いた設計経験",
      "チームでの開発経験",
    ],
    workConditions: [
      { label: "勤務地", value: "愛知県名古屋市（週2リモート可）" },
      { label: "就業時間", value: "9:00〜18:00" },
      { label: "休日休暇", value: "完全週休2日制（土日祝）・年間休日123日" },
      { label: "雇用形態", value: "正社員" },
    ],
    benefits: ["社会保険完備", "住宅手当", "健康診断", "資格取得支援制度"],
    selectionFlow: [
      "書類選考",
      "一次面接",
      "二次面接（技術面接）",
      "最終面接",
      "内定",
    ],
    companyInfo: {
      description:
        "地域の中小企業向け業務システムを開発する地元密着型のIT企業。安定した顧客基盤のもと、着実に成長しています。",
      business: "業務システムの受託・自社開発",
      employees: "78名",
      website: "https://growth-partners.example.com",
    },
    employmentConditions: {
      dutiesScopeOfChange: "会社の定める業務全般（システム開発関連業務）",
      employmentType: "正社員",
      contractPeriodType: "期間の定めなし",
      contractPeriod: "",
      probationPeriod: "あり（入社日から3ヶ月間）",
      renewal: {
        hasRenewal: "",
        renewalCriteria: "",
        hasRenewalLimit: "",
        renewalLimitCount: "",
        totalContractPeriodLimit: "",
      },
      workplace: "愛知県名古屋市（本社オフィス）",
      workplaceScopeOfChange: "会社の定める事業所（転居を伴う転勤なし）",
      startTime: "09:00",
      endTime: "18:00",
      breakTime: "60分",
      scheduledWorkingHours: "1日8時間・週40時間",
      hasOvertime: "あり",
      hasFixedOvertimePay: "なし",
      fixedOvertimePay: { hours: "", amount: "", excessPayNote: "" },
      holidays: "完全週休2日制（土日祝）",
      vacations: "年次有給休暇、夏季休暇、年末年始休暇、慶弔休暇",
      annualHolidaysCount: "123日",
      baseSalary: "月額290,000円〜400,000円",
      wageType: "月給",
      wageCalculationMethod: "所定労働時間分の月額固定給として計算し、時間外労働分は別途割増賃金を加算",
      wagePaymentMethod: "本人名義の銀行口座へ振込",
      wageClosingDate: "毎月末日",
      wagePaymentDate: "翌月25日",
      allowances: "住宅手当、通勤手当（全額支給）",
      salaryIncrease: "年1回（4月）",
      bonus: "年2回（6月・12月）",
      resignationProcedure: "自己都合退職の場合は30日前までに書面で届け出ること",
      dismissalGrounds: "就業規則に定める解雇事由に該当し、やむを得ない場合に行う",
      retirementAllowance: "勤続3年以上の者に退職金規程に基づき支給",
      temporaryWages: "該当なし",
      employeeBurden: "該当なし",
      safetyAndHealth: "年1回の定期健康診断を実施",
      vocationalTraining: "入社時研修、OJTによる技術研修を実施",
      disasterCompensation: "労働者災害補償保険法に基づく法定補償による",
      commendationAndSanctions: "就業規則に定める表彰・懲戒制度による",
      leaveOfAbsence: "私傷病休職制度あり（勤続年数に応じて最長6ヶ月）",
    },
  },
];
