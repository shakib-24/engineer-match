/**
 * Engineer Job Search Module placeholder content (Japanese).
 * UI only — no backend, no real data, no authentication.
 */

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
// Filter panel
// ============================================================

export const FILTER_PANEL_LABELS = {
  title: "絞り込み条件",
  contractType: "契約形態",
  location: "勤務地",
  skills: "スキル",
  itssLevel: "ITSSレベル",
  salary: "給与・単価",
  resetLabel: "条件をリセット",
  applyLabel: "検索する",
} as const;

export const CONTRACT_TYPE_FILTER_OPTIONS = ["就職", "案件", "時間清算"] as const;

export const LOCATION_FILTER_OPTIONS = [
  "東京都",
  "神奈川県",
  "大阪府",
  "愛知県",
  "リモート",
] as const;

export const SKILL_FILTER_OPTIONS = [
  "React",
  "TypeScript",
  "Java",
  "Spring Boot",
  "Python",
  "AWS",
  "Docker",
  "PostgreSQL",
] as const;

export const ITSS_LEVEL_FILTER_OPTIONS = [1, 2, 3, 4, 5, 6, 7] as const;

export const SALARY_RANGE_CONFIG = {
  min: 300,
  max: 1200,
  step: 50,
  unit: "万円",
} as const;

// ============================================================
// Badge style maps (shared across job cards / detail / apply card)
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

// ============================================================
// Job list
// ============================================================

export const JOB_LIST_META = {
  resultsSuffix: "件の求人・案件が見つかりました",
  bookmarkLabel: "お気に入りに追加",
  bookmarkedLabel: "お気に入り済み",
  detailButtonLabel: "詳細を見る",
  postedPrefix: "掲載日：",
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

export const SAVED_JOBS_MOCK = [
  { id: "3", title: "バックエンドエンジニア（Java / Spring Boot）", company: "株式会社テックイノベーション" },
  { id: "9", title: "AIエンジニア（Python / 機械学習）", company: "株式会社データフォレスト" },
] as const;

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
  skillsTitle: "スキル",
  requiredSkillsLabel: "必須スキル",
  preferredSkillsLabel: "歓迎スキル",
  workConditionsTitle: "勤務条件",
  benefitsTitle: "福利厚生",
  selectionFlowTitle: "選考フロー",
  companyInfoTitle: "企業情報",
} as const;

export const COMPANY_CARD_LABELS = {
  businessLabel: "事業内容",
  employeesLabel: "従業員数",
  websiteLabel: "コーポレートサイト",
} as const;

export const APPLY_CARD_LABELS = {
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
// Jobs (12 mock listings)
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
  remote: boolean;
  status: "募集中" | "締切間近";
  salaryLabel: string;
  skills: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  itssLevel: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  postedLabel: string;
  updatedLabel: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  workConditions: WorkCondition[];
  benefits: string[];
  selectionFlow: string[];
  companyInfo: CompanyInfo;
}

export const JOBS: Job[] = [
  {
    id: "1",
    title: "フロントエンドエンジニア（React / TypeScript）",
    category: "フロントエンド",
    company: "合同会社クラウドフォース",
    companyInitials: "ク",
    contractType: "案件",
    location: "フルリモート",
    remote: true,
    status: "募集中",
    salaryLabel: "月額 60万円〜90万円",
    skills: ["React", "TypeScript", "Next.js"],
    requiredSkills: ["React", "TypeScript", "Next.js", "HTML/CSS"],
    preferredSkills: ["GraphQL", "Storybook", "Figma"],
    itssLevel: 3,
    postedLabel: "3日前",
    updatedLabel: "2026年7月13日",
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
    remote: false,
    status: "募集中",
    salaryLabel: "年収 480万円〜700万円",
    skills: ["Vue.js", "Nuxt3", "TypeScript"],
    requiredSkills: ["Vue.js", "Nuxt3", "TypeScript"],
    preferredSkills: ["Nuxt Content", "Tailwind CSS", "Jest"],
    itssLevel: 3,
    postedLabel: "1週間前",
    updatedLabel: "2026年7月9日",
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
    benefits: [
      "社会保険完備",
      "住宅手当",
      "健康診断",
      "資格取得支援制度",
    ],
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
  },
  {
    id: "3",
    title: "バックエンドエンジニア（Java / Spring Boot）",
    category: "バックエンド",
    company: "株式会社テックイノベーション",
    companyInitials: "テ",
    contractType: "就職",
    location: "東京都",
    remote: false,
    status: "募集中",
    salaryLabel: "年収 500万円〜800万円",
    skills: ["Java", "Spring Boot", "AWS"],
    requiredSkills: ["Java", "Spring Boot", "PostgreSQL"],
    preferredSkills: ["AWS", "Docker", "Kubernetes"],
    itssLevel: 4,
    postedLabel: "2日前",
    updatedLabel: "2026年7月14日",
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
  },
  {
    id: "4",
    title: "バックエンドエンジニア（Go）",
    category: "バックエンド",
    company: "株式会社ゼロトラスト",
    companyInitials: "ゼ",
    contractType: "案件",
    location: "フルリモート",
    remote: true,
    status: "募集中",
    salaryLabel: "月額 70万円〜100万円",
    skills: ["Go", "Docker", "PostgreSQL"],
    requiredSkills: ["Go", "PostgreSQL", "Docker"],
    preferredSkills: ["Kubernetes", "gRPC", "AWS"],
    itssLevel: 4,
    postedLabel: "5日前",
    updatedLabel: "2026年7月11日",
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
    location: "フルリモート",
    remote: true,
    status: "募集中",
    salaryLabel: "月額 65万円〜95万円",
    skills: ["Next.js", "Node.js", "TypeScript"],
    requiredSkills: ["Next.js", "Node.js", "TypeScript", "PostgreSQL"],
    preferredSkills: ["GraphQL", "AWS", "Docker"],
    itssLevel: 3,
    postedLabel: "4日前",
    updatedLabel: "2026年7月12日",
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
    remote: true,
    status: "締切間近",
    salaryLabel: "時間単価 4,500円〜6,000円",
    skills: ["TypeScript", "React", "AWS"],
    requiredSkills: ["TypeScript", "React", "AWS", "Node.js"],
    preferredSkills: ["Terraform", "GraphQL"],
    itssLevel: 3,
    postedLabel: "1週間前",
    updatedLabel: "2026年7月8日",
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
    remote: false,
    status: "募集中",
    salaryLabel: "年収 550万円〜850万円",
    skills: ["AWS", "Docker", "Terraform"],
    requiredSkills: ["AWS", "Docker", "Linux"],
    preferredSkills: ["Terraform", "Kubernetes", "Python"],
    itssLevel: 4,
    postedLabel: "6日前",
    updatedLabel: "2026年7月10日",
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
  },
  {
    id: "8",
    title: "クラウドエンジニア（GCP / Terraform）",
    category: "クラウド",
    company: "株式会社スケールワークス",
    companyInitials: "ス",
    contractType: "案件",
    location: "フルリモート",
    remote: true,
    status: "募集中",
    salaryLabel: "月額 75万円〜105万円",
    skills: ["GCP", "Terraform", "Kubernetes"],
    requiredSkills: ["GCP", "Terraform", "Kubernetes"],
    preferredSkills: ["AWS", "Python", "Datadog"],
    itssLevel: 5,
    postedLabel: "3日前",
    updatedLabel: "2026年7月13日",
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
    remote: true,
    status: "募集中",
    salaryLabel: "年収 600万円〜900万円",
    skills: ["Python", "機械学習", "AWS"],
    requiredSkills: ["Python", "機械学習", "SQL"],
    preferredSkills: ["AWS", "Docker", "MLOps"],
    itssLevel: 5,
    postedLabel: "2日前",
    updatedLabel: "2026年7月14日",
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
  },
  {
    id: "10",
    title: "AIエンジニア（LLM／生成AI）",
    category: "AI",
    company: "株式会社ニューラルゲート",
    companyInitials: "ニ",
    contractType: "案件",
    location: "フルリモート",
    remote: true,
    status: "募集中",
    salaryLabel: "月額 90万円〜130万円",
    skills: ["Python", "LLM", "AWS"],
    requiredSkills: ["Python", "LLM", "RAG"],
    preferredSkills: ["LangChain", "AWS", "Docker"],
    itssLevel: 5,
    postedLabel: "1日前",
    updatedLabel: "2026年7月15日",
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
    remote: true,
    status: "募集中",
    salaryLabel: "月額 70万円〜100万円",
    skills: ["Kubernetes", "Docker", "AWS"],
    requiredSkills: ["Kubernetes", "Docker", "CI/CD"],
    preferredSkills: ["AWS", "Terraform", "Datadog"],
    itssLevel: 4,
    postedLabel: "5日前",
    updatedLabel: "2026年7月11日",
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
    remote: false,
    status: "募集中",
    salaryLabel: "年収 650万円〜950万円",
    skills: ["プロジェクトマネジメント", "AWS", "Java"],
    requiredSkills: ["プロジェクトマネジメント", "要件定義"],
    preferredSkills: ["AWS", "Java", "アジャイル開発"],
    itssLevel: 5,
    postedLabel: "1週間前",
    updatedLabel: "2026年7月9日",
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
    selectionFlow: [
      "書類選考",
      "一次面接",
      "二次面接（役員面接）",
      "内定",
    ],
    companyInfo: {
      description:
        "官公庁・大手企業向けのシステム開発を中心に手がけるSIer。安定した経営基盤のもと、大規模プロジェクトに携われます。",
      business: "システムインテグレーション（官公庁・大手企業向け）",
      employees: "310名",
      website: "https://bridge-solutions.example.com",
    },
  },
];
