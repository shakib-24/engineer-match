/**
 * Company engineer search & scout module placeholder content (Japanese).
 * UI only — no backend, no real data, no authentication.
 */

// ============================================================
// Page meta
// ============================================================

export const ENGINEERS_PAGE = {
  title: "エンジニア検索",
  description: "スキル・経験・希望条件から、\n自社に合うエンジニアを検索できます。",
} as const;

// ============================================================
// Filter vocabulary
// ============================================================

export const CONTRACT_TYPE_OPTIONS = ["就職", "案件", "時間清算"] as const;
export type ContractType = (typeof CONTRACT_TYPE_OPTIONS)[number];

export const LOCATION_OPTIONS = [
  "東京都",
  "神奈川県",
  "大阪府",
  "愛知県",
  "福岡県",
  "その他",
] as const;

export const WORK_STYLE_OPTIONS = ["フルリモート", "一部リモート", "出社"] as const;

export const CATEGORY_OPTIONS = [
  "フロントエンド",
  "バックエンド",
  "フルスタック",
  "インフラ",
  "クラウド",
  "AI・データ",
  "PM",
  "QA",
  "セキュリティ",
] as const;
export type EngineerCategory = (typeof CATEGORY_OPTIONS)[number];

export const SKILL_OPTIONS = [
  "React",
  "TypeScript",
  "Next.js",
  "Java",
  "Spring Boot",
  "Python",
  "AWS",
  "Docker",
  "Kubernetes",
  "PostgreSQL",
] as const;

export const ITSS_LEVEL_OPTIONS = [1, 2, 3, 4, 5, 6, 7] as const;

export const EXPERIENCE_BUCKET_OPTIONS = [
  { label: "指定なし", value: null },
  { label: "1年未満", value: "under1" },
  { label: "1〜3年", value: "1to3" },
  { label: "3〜5年", value: "3to5" },
  { label: "5〜10年", value: "5to10" },
  { label: "10年以上", value: "over10" },
] as const;
export type ExperienceBucket = (typeof EXPERIENCE_BUCKET_OPTIONS)[number]["value"];

export const AVAILABILITY_OPTIONS = [
  "今すぐ可能",
  "1か月以内",
  "相談可能",
  "稼働中",
] as const;

export const AVAILABILITY_BADGE_STYLES: Record<string, string> = {
  今すぐ可能: "bg-green-50 text-green-700",
  "1か月以内": "bg-blue-50 text-blue-700",
  相談可能: "bg-amber-50 text-amber-700",
  稼働中: "bg-gray-100 text-gray-600",
};

export const LANGUAGE_OPTIONS = [
  "日本語",
  "英語",
  "中国語",
  "韓国語",
  "ベンガル語",
  "その他",
] as const;

export const LANGUAGE_LEVEL_OPTIONS = [
  "ネイティブ",
  "ビジネスレベル",
  "日常会話レベル",
  "基礎レベル",
] as const;

// ============================================================
// Sort
// ============================================================

export const SORT_OPTIONS = [
  { value: "recommended", label: "おすすめ順" },
  { value: "lastActive", label: "最終ログインが新しい順" },
  { value: "experience", label: "経験年数が多い順" },
  { value: "itss", label: "ITSSレベルが高い順" },
  { value: "registered", label: "登録日が新しい順" },
] as const;
export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

// ============================================================
// Search / filter labels
// ============================================================

export const SEARCH_LABELS = {
  label: "エンジニアを検索",
  placeholder: "氏名・職種・スキルで検索",
} as const;

export const FILTER_LABELS = {
  title: "絞り込み条件",
  contractTypes: "契約形態",
  locations: "勤務地",
  workStyles: "勤務形態",
  categories: "職種",
  skills: "スキル",
  itssLevels: "ITSSレベル",
  experience: "経験年数",
  availability: "稼働状況",
  languages: "言語",
  resetLabel: "条件をリセット",
  openLabel: "絞り込み",
  closeLabel: "閉じる",
  applyLabel: "この条件で絞り込む",
} as const;

export const ACTIVE_FILTERS_LABELS = {
  clearAllLabel: "すべてクリア",
  removeLabelPrefix: "フィルターを削除：",
  itssPrefix: "ITSSレベル",
} as const;

export const RESULTS_META = {
  resultsSuffix: "名のエンジニアが見つかりました",
} as const;

export const EMPTY_STATE_LABELS = {
  title: "条件に一致するエンジニアが見つかりませんでした。",
  description: "検索キーワードや絞り込み条件を変更してお試しください。",
  resetLabel: "条件をリセット",
} as const;

export const SIDEBAR_LABELS = {
  favoritesTitle: "お気に入りエンジニア",
  favoritesEmptyMessage: "お気に入りに登録したエンジニアはまだいません。",
  recentSearchesTitle: "最近の検索条件",
  recentSearchesEmptyMessage: "検索履歴はまだありません。",
} as const;

export const RECENT_SEARCHES = [
  "React エンジニア 東京都",
  "AWS インフラ 案件",
  "ITSSレベル5以上 フルリモート",
] as const;

// ============================================================
// Pagination
// ============================================================

export const PAGINATION_LABELS = {
  previousLabel: "前へ",
  nextLabel: "次へ",
  pageLabelPrefix: "ページ",
} as const;

// ============================================================
// Engineer card
// ============================================================

export const ENGINEER_CARD_LABELS = {
  detailLabel: "詳細を見る",
  scoutLabel: "スカウトを送る",
  scoutedLabel: "スカウト送信済み",
  favoriteLabel: "お気に入りに追加",
  favoritedLabel: "お気に入り済み",
  experienceSuffix: "年",
  lastActivePrefix: "最終ログイン：",
  profileCompletionLabel: "プロフィール充実度",
  itssLabel: "ITSS",
} as const;

// ============================================================
// Engineer detail — section labels
// ============================================================

export const ENGINEER_DETAIL_META = {
  backLabel: "エンジニア検索に戻る",
  backHref: "/company/engineers",
  overviewTitle: "プロフィール概要",
  skillsTitle: "スキル",
  experienceTitle: "職務経歴",
  educationTitle: "学歴",
  certificationsTitle: "資格",
  portfolioTitle: "ポートフォリオ・実績",
  languagesTitle: "言語",
  preferredConditionsTitle: "希望条件",
  updatedPrefix: "プロフィール更新日：",
} as const;

export const OVERVIEW_LABELS = {
  introductionTitle: "自己紹介",
  desiredRole: "希望職種",
  desiredContract: "希望契約形態",
  desiredWorkStyle: "希望勤務形態",
  expectedAnnualSalary: "希望年収",
  expectedMonthlyRate: "希望月額単価",
  expectedHourlyRate: "希望時間単価",
  availableFrom: "稼働開始可能日",
} as const;

export const SKILLS_SECTION_LABELS = {
  technicalTitle: "技術スキル",
  humanTitle: "ヒューマンスキル",
  businessTitle: "ビジネススキル",
} as const;

export const PREFERRED_CONDITIONS_LABELS = {
  contractTypes: "希望契約形態",
  locations: "希望勤務地",
  workStyles: "希望勤務形態",
  availability: "稼働状況",
  desiredAnnualIncome: "希望年収",
  desiredMonthlyRate: "希望月額単価",
  desiredHourlyRate: "希望時間単価",
  availableFrom: "稼働開始可能日",
} as const;

export const SIDEBAR_ACTIONS_LABELS = {
  favoriteLabel: "お気に入り",
  favoritedLabel: "お気に入り済み",
  scoutLabel: "スカウトを送る",
  scoutedLabel: "スカウト送信済み",
  messageLabel: "メッセージを送る",
  messageDemoNote: "※ 現在はUIデモのため、メッセージ機能は準備中です。",
} as const;

// ============================================================
// Scout dialog
// ============================================================

export const SCOUT_DIALOG_LABELS = {
  title: "スカウトを送信しますか？",
  description: "対象求人・案件とメッセージを入力してください。",
  jobLabel: "対象求人・案件",
  jobPlaceholder: "求人・案件を選択してください",
  subjectLabel: "スカウト件名",
  subjectPlaceholder: "例：貴殿のご経験を活かせるポジションのご案内",
  messageLabel: "メッセージ",
  messagePlaceholder: "スカウトメッセージを入力してください",
  interviewLabel: "面談希望",
  notesLabel: "備考（任意）",
  notesPlaceholder: "選考担当者向けのメモがあれば入力してください",
  cancelLabel: "キャンセル",
  confirmLabel: "スカウトを送信",
  alreadyScoutedMessage: "この応募者には既にスカウトを送信済みです。",
  toastTitle: "スカウトを送信しました。",
  toastNote: "※ UIデモのため、実際には送信されていません。",
  demoNote: "※ 現在はUIデモのため、実際には送信されません。",
} as const;

export const INTERVIEW_PREFERENCE_OPTIONS = [
  "オンライン面談を希望",
  "対面面談を希望",
  "どちらでも可",
  "まずはカジュアル面談から",
] as const;

// ============================================================
// Engineers (20 mock profiles)
// ============================================================

export interface EngineerTechnicalSkill {
  name: string;
  itssLevel: number;
  experienceYears: number;
}

export interface EngineerRatedSkill {
  name: string;
  rating: number;
}

export interface EngineerCertification {
  name: string;
  issuer: string;
  acquiredDate: string;
}

export interface EngineerPortfolioItem {
  title: string;
  role: string;
  description: string;
  skills: string[];
  url: string;
  period: string;
}

export interface EngineerExperienceItem {
  company: string;
  position: string;
  period: string;
  employmentType: string;
  summary: string;
  technologies: string[];
}

export interface EngineerLanguage {
  name: string;
  level: string;
}

export interface EngineerEducation {
  school: string;
  department: string;
  period: string;
}

export interface Engineer {
  id: string;
  name: string;
  avatarInitials: string;
  title: string;
  category: EngineerCategory;
  location: string;
  experienceYears: number;
  availability: string;
  preferredContractTypes: ContractType[];
  preferredWorkStyles: string[];
  preferredLocations: string[];
  expectedAnnualSalary: string;
  expectedMonthlyRate: string;
  expectedHourlyRate: string;
  availableFrom: string;
  technicalSkills: EngineerTechnicalSkill[];
  humanSkills: EngineerRatedSkill[];
  businessSkills: EngineerRatedSkill[];
  certifications: EngineerCertification[];
  workHistory: EngineerExperienceItem[];
  portfolio: EngineerPortfolioItem[];
  languages: EngineerLanguage[];
  education: EngineerEducation[];
  selfIntroduction: string;
  lastActiveDateLabel: string;
  lastActiveDateISO: string;
  registeredDateLabel: string;
  registeredDateISO: string;
  profileCompletion: number;
  isFavorited: boolean;
  isScouted: boolean;
}

export const ENGINEERS: Engineer[] = [
  {
    id: "1",
    name: "山田 太郎",
    avatarInitials: "山",
    title: "フロントエンドエンジニア（React / TypeScript）",
    category: "フロントエンド",
    location: "東京都",
    experienceYears: 5,
    availability: "今すぐ可能",
    preferredContractTypes: ["案件", "就職"],
    preferredWorkStyles: ["フルリモート", "一部リモート"],
    preferredLocations: ["東京都", "神奈川県"],
    expectedAnnualSalary: "600万円〜800万円",
    expectedMonthlyRate: "70万円〜90万円",
    expectedHourlyRate: "4,500円〜5,500円",
    availableFrom: "即日",
    technicalSkills: [
      { name: "React", itssLevel: 4, experienceYears: 5 },
      { name: "TypeScript", itssLevel: 4, experienceYears: 4 },
      { name: "Next.js", itssLevel: 3, experienceYears: 3 },
    ],
    humanSkills: [
      { name: "チームワーク", rating: 4 },
      { name: "課題解決力", rating: 4 },
    ],
    businessSkills: [{ name: "要件定義", rating: 3 }],
    certifications: [
      { name: "AWS認定デベロッパー", issuer: "Amazon Web Services", acquiredDate: "2023年4月" },
    ],
    workHistory: [
      {
        company: "合同会社クラウドフォース",
        position: "フロントエンドエンジニア",
        period: "2021年4月〜現在",
        employmentType: "正社員",
        summary: "ECサイトのフロントエンド刷新プロジェクトをリード。",
        technologies: ["React", "TypeScript", "Next.js"],
      },
    ],
    portfolio: [
      {
        title: "ECサイトリニューアル",
        role: "フロントエンドリード",
        description: "Next.jsで大規模ECサイトを刷新し、表示速度を40%改善。",
        skills: ["React", "Next.js"],
        url: "https://example.com/portfolio/ec-renewal",
        period: "2023年〜2024年",
      },
    ],
    languages: [
      { name: "日本語", level: "ネイティブ" },
      { name: "英語", level: "日常会話レベル" },
    ],
    education: [{ school: "東京工業大学", department: "情報工学科", period: "2014年4月〜2018年3月" }],
    selfIntroduction:
      "フロントエンド開発を中心に5年間従事しています。パフォーマンス改善とデザインシステム構築が得意です。チームでの技術選定にも積極的に関わってきました。",
    lastActiveDateLabel: "2026年7月15日",
    lastActiveDateISO: "2026-07-15",
    registeredDateLabel: "2025年3月1日",
    registeredDateISO: "2025-03-01",
    profileCompletion: 92,
    isFavorited: false,
    isScouted: false,
  },
  {
    id: "2",
    name: "田村 美咲",
    avatarInitials: "田",
    title: "フロントエンドエンジニア（Vue.js）",
    category: "フロントエンド",
    location: "大阪府",
    experienceYears: 3,
    availability: "1か月以内",
    preferredContractTypes: ["就職"],
    preferredWorkStyles: ["一部リモート", "出社"],
    preferredLocations: ["大阪府"],
    expectedAnnualSalary: "480万円〜620万円",
    expectedMonthlyRate: "—",
    expectedHourlyRate: "—",
    availableFrom: "2026年9月1日",
    technicalSkills: [
      { name: "Vue.js", itssLevel: 3, experienceYears: 3 },
      { name: "TypeScript", itssLevel: 3, experienceYears: 2 },
    ],
    humanSkills: [{ name: "コミュニケーション", rating: 5 }],
    businessSkills: [],
    certifications: [],
    workHistory: [
      {
        company: "株式会社ウェブブリッジ",
        position: "フロントエンドエンジニア",
        period: "2022年4月〜現在",
        employmentType: "正社員",
        summary: "予約管理SaaSのフロントエンド開発を担当。",
        technologies: ["Vue.js", "TypeScript"],
      },
    ],
    portfolio: [],
    languages: [{ name: "日本語", level: "ネイティブ" }],
    education: [{ school: "大阪市立大学", department: "商学部", period: "2018年4月〜2022年3月" }],
    selfIntroduction:
      "Vue.jsを用いたSPA開発を中心に経験を積んできました。ユーザー目線でのUI改善提案が得意です。",
    lastActiveDateLabel: "2026年7月10日",
    lastActiveDateISO: "2026-07-10",
    registeredDateLabel: "2025年6月10日",
    registeredDateISO: "2025-06-10",
    profileCompletion: 75,
    isFavorited: false,
    isScouted: false,
  },
  {
    id: "3",
    name: "鈴木 一郎",
    avatarInitials: "鈴",
    title: "バックエンドエンジニア（Java / Spring Boot）",
    category: "バックエンド",
    location: "東京都",
    experienceYears: 8,
    availability: "相談可能",
    preferredContractTypes: ["就職", "案件"],
    preferredWorkStyles: ["出社", "一部リモート"],
    preferredLocations: ["東京都"],
    expectedAnnualSalary: "750万円〜950万円",
    expectedMonthlyRate: "85万円〜100万円",
    expectedHourlyRate: "—",
    availableFrom: "相談",
    technicalSkills: [
      { name: "Java", itssLevel: 5, experienceYears: 8 },
      { name: "Spring Boot", itssLevel: 5, experienceYears: 6 },
      { name: "PostgreSQL", itssLevel: 4, experienceYears: 6 },
    ],
    humanSkills: [{ name: "リーダーシップ", rating: 4 }],
    businessSkills: [{ name: "要件定義", rating: 4 }],
    certifications: [{ name: "Java Gold SE 11", issuer: "Oracle", acquiredDate: "2021年3月" }],
    workHistory: [
      {
        company: "株式会社ネクストシステムズ",
        position: "シニアバックエンドエンジニア",
        period: "2018年4月〜現在",
        employmentType: "正社員",
        summary: "自社SaaSのマイクロサービス移行を主導。チーム5名を統括。",
        technologies: ["Java", "Spring Boot", "PostgreSQL"],
      },
    ],
    portfolio: [
      {
        title: "決済基盤リプレイス",
        role: "テックリード",
        description: "レガシー決済システムをマイクロサービス化。",
        skills: ["Java", "Spring Boot"],
        url: "https://example.com/portfolio/payment",
        period: "2022年〜2024年",
      },
    ],
    languages: [{ name: "日本語", level: "ネイティブ" }],
    education: [{ school: "早稲田大学", department: "基幹理工学部", period: "2010年4月〜2014年3月" }],
    selfIntroduction:
      "Javaによるバックエンド開発を8年間経験。マイクロサービス設計とチームマネジメントの両方に強みがあります。",
    lastActiveDateLabel: "2026年7月14日",
    lastActiveDateISO: "2026-07-14",
    registeredDateLabel: "2024年11月20日",
    registeredDateISO: "2024-11-20",
    profileCompletion: 98,
    isFavorited: false,
    isScouted: false,
  },
  {
    id: "4",
    name: "小川 直樹",
    avatarInitials: "小",
    title: "バックエンドエンジニア（Python / Django）",
    category: "バックエンド",
    location: "福岡県",
    experienceYears: 4,
    availability: "今すぐ可能",
    preferredContractTypes: ["案件"],
    preferredWorkStyles: ["フルリモート"],
    preferredLocations: ["福岡県", "その他"],
    expectedAnnualSalary: "—",
    expectedMonthlyRate: "65万円〜85万円",
    expectedHourlyRate: "4,000円〜5,000円",
    availableFrom: "即日",
    technicalSkills: [
      { name: "Python", itssLevel: 4, experienceYears: 4 },
      { name: "PostgreSQL", itssLevel: 3, experienceYears: 3 },
    ],
    humanSkills: [{ name: "自走力", rating: 4 }],
    businessSkills: [],
    certifications: [],
    workHistory: [
      {
        company: "株式会社データポート",
        position: "バックエンドエンジニア",
        period: "2022年4月〜現在",
        employmentType: "業務委託",
        summary: "Djangoによる社内管理システムのAPI開発。",
        technologies: ["Python", "Django", "PostgreSQL"],
      },
    ],
    portfolio: [],
    languages: [{ name: "日本語", level: "ネイティブ" }],
    education: [{ school: "九州大学", department: "システム情報科学府", period: "2016年4月〜2018年3月" }],
    selfIntroduction:
      "フルリモートでのバックエンド開発を得意としています。福岡在住ですが全国のプロジェクトに参画してきました。",
    lastActiveDateLabel: "2026年7月16日",
    lastActiveDateISO: "2026-07-16",
    registeredDateLabel: "2025年1月15日",
    registeredDateISO: "2025-01-15",
    profileCompletion: 80,
    isFavorited: false,
    isScouted: false,
  },
  {
    id: "5",
    name: "橋本 直人",
    avatarInitials: "橋",
    title: "バックエンドエンジニア（Go）",
    category: "バックエンド",
    location: "東京都",
    experienceYears: 5,
    availability: "1か月以内",
    preferredContractTypes: ["案件", "時間清算"],
    preferredWorkStyles: ["フルリモート"],
    preferredLocations: ["東京都"],
    expectedAnnualSalary: "—",
    expectedMonthlyRate: "75万円〜95万円",
    expectedHourlyRate: "4,800円〜5,800円",
    availableFrom: "2026年8月15日",
    technicalSkills: [
      { name: "Java", itssLevel: 3, experienceYears: 2 },
      { name: "Docker", itssLevel: 4, experienceYears: 4 },
      { name: "PostgreSQL", itssLevel: 4, experienceYears: 5 },
    ],
    humanSkills: [],
    businessSkills: [],
    certifications: [],
    workHistory: [
      {
        company: "株式会社ゼロトラスト",
        position: "バックエンドエンジニア",
        period: "2019年4月〜現在",
        employmentType: "正社員",
        summary: "認証基盤SaaSのAPI開発。Go言語での開発経験が豊富。",
        technologies: ["Docker", "PostgreSQL"],
      },
    ],
    portfolio: [],
    languages: [{ name: "日本語", level: "ネイティブ" }],
    education: [{ school: "北海道大学", department: "工学部", period: "2015年4月〜2019年3月" }],
    selfIntroduction: "高パフォーマンスなAPI開発を得意とし、認証基盤の構築実績があります。",
    lastActiveDateLabel: "2026年7月8日",
    lastActiveDateISO: "2026-07-08",
    registeredDateLabel: "2025年5月2日",
    registeredDateISO: "2025-05-02",
    profileCompletion: 68,
    isFavorited: false,
    isScouted: false,
  },
  {
    id: "6",
    name: "伊藤 大輝",
    avatarInitials: "伊",
    title: "フルスタックエンジニア（Next.js / Node.js）",
    category: "フルスタック",
    location: "東京都",
    experienceYears: 3,
    availability: "今すぐ可能",
    preferredContractTypes: ["案件", "就職"],
    preferredWorkStyles: ["フルリモート", "一部リモート"],
    preferredLocations: ["東京都", "神奈川県"],
    expectedAnnualSalary: "580万円〜700万円",
    expectedMonthlyRate: "65万円〜85万円",
    expectedHourlyRate: "—",
    availableFrom: "即日",
    technicalSkills: [
      { name: "Next.js", itssLevel: 3, experienceYears: 3 },
      { name: "TypeScript", itssLevel: 3, experienceYears: 3 },
      { name: "PostgreSQL", itssLevel: 3, experienceYears: 2 },
    ],
    humanSkills: [{ name: "スピード感", rating: 4 }],
    businessSkills: [],
    certifications: [],
    workHistory: [
      {
        company: "株式会社スタートアップベース",
        position: "フルスタックエンジニア",
        period: "2021年4月〜現在",
        employmentType: "正社員",
        summary: "0→1のプロダクト開発を複数経験。",
        technologies: ["Next.js", "Node.js"],
      },
    ],
    portfolio: [
      {
        title: "個人ブログ基盤",
        role: "個人開発",
        description: "Next.jsとMicroCMSで構築した高速なブログ基盤。",
        skills: ["Next.js", "TypeScript"],
        url: "https://example.com/portfolio/blog",
        period: "2023年",
      },
    ],
    languages: [{ name: "日本語", level: "ネイティブ" }, { name: "英語", level: "基礎レベル" }],
    education: [{ school: "法政大学", department: "経営学部", period: "2017年4月〜2021年3月" }],
    selfIntroduction: "スタートアップでフロント・バックエンド双方を経験。スピード重視の開発が得意です。",
    lastActiveDateLabel: "2026年7月16日",
    lastActiveDateISO: "2026-07-16",
    registeredDateLabel: "2025年7月1日",
    registeredDateISO: "2025-07-01",
    profileCompletion: 85,
    isFavorited: false,
    isScouted: false,
  },
  {
    id: "7",
    name: "西田 遥",
    avatarInitials: "西",
    title: "フルスタックエンジニア（Ruby on Rails）",
    category: "フルスタック",
    location: "愛知県",
    experienceYears: 6,
    availability: "相談可能",
    preferredContractTypes: ["就職"],
    preferredWorkStyles: ["一部リモート", "出社"],
    preferredLocations: ["愛知県"],
    expectedAnnualSalary: "620万円〜780万円",
    expectedMonthlyRate: "—",
    expectedHourlyRate: "—",
    availableFrom: "相談",
    technicalSkills: [
      { name: "PostgreSQL", itssLevel: 4, experienceYears: 5 },
      { name: "Docker", itssLevel: 3, experienceYears: 3 },
    ],
    humanSkills: [{ name: "マネジメント", rating: 4 }],
    businessSkills: [{ name: "要件定義", rating: 3 }],
    certifications: [],
    workHistory: [
      {
        company: "株式会社グロースパートナーズ",
        position: "フルスタックエンジニア",
        period: "2019年4月〜現在",
        employmentType: "正社員",
        summary: "地域産業向け業務システムの開発をリード。",
        technologies: ["Ruby on Rails", "PostgreSQL"],
      },
    ],
    portfolio: [],
    languages: [{ name: "日本語", level: "ネイティブ" }],
    education: [{ school: "名古屋大学", department: "情報学部", period: "2015年4月〜2019年3月" }],
    selfIntroduction: "地域密着型の業務システム開発に6年間従事。要件定義から運用まで一貫して対応できます。",
    lastActiveDateLabel: "2026年7月5日",
    lastActiveDateISO: "2026-07-05",
    registeredDateLabel: "2024年9月18日",
    registeredDateISO: "2024-09-18",
    profileCompletion: 71,
    isFavorited: false,
    isScouted: false,
  },
  {
    id: "8",
    name: "中村 洋介",
    avatarInitials: "中",
    title: "インフラエンジニア（AWS / Terraform）",
    category: "インフラ",
    location: "東京都",
    experienceYears: 7,
    availability: "今すぐ可能",
    preferredContractTypes: ["案件", "時間清算"],
    preferredWorkStyles: ["一部リモート", "出社"],
    preferredLocations: ["東京都"],
    expectedAnnualSalary: "—",
    expectedMonthlyRate: "90万円〜110万円",
    expectedHourlyRate: "5,500円〜6,500円",
    availableFrom: "即日",
    technicalSkills: [
      { name: "AWS", itssLevel: 5, experienceYears: 7 },
      { name: "Docker", itssLevel: 4, experienceYears: 5 },
      { name: "Kubernetes", itssLevel: 4, experienceYears: 4 },
    ],
    humanSkills: [{ name: "課題解決力", rating: 5 }],
    businessSkills: [],
    certifications: [
      { name: "AWS認定ソリューションアーキテクト プロフェッショナル", issuer: "Amazon Web Services", acquiredDate: "2023年1月" },
      { name: "CKA", issuer: "CNCF", acquiredDate: "2022年11月" },
    ],
    workHistory: [
      {
        company: "株式会社クラウドオペレーションズ",
        position: "SRE",
        period: "2017年4月〜現在",
        employmentType: "正社員",
        summary: "大規模ECサイトのインフラ運用・信頼性向上施策を推進。",
        technologies: ["AWS", "Kubernetes"],
      },
    ],
    portfolio: [
      {
        title: "マルチリージョン基盤構築",
        role: "インフラリード",
        description: "災害対策目的のマルチリージョン構成をTerraformで実装。",
        skills: ["AWS", "Docker"],
        url: "https://example.com/portfolio/multi-region",
        period: "2023年〜2024年",
      },
    ],
    languages: [{ name: "日本語", level: "ネイティブ" }, { name: "英語", level: "ビジネスレベル" }],
    education: [{ school: "筑波大学", department: "情報学群", period: "2013年4月〜2017年3月" }],
    selfIntroduction: "AWS環境の設計・構築を7年間担当。大規模トラフィックを支えるインフラ設計が専門です。",
    lastActiveDateLabel: "2026年7月16日",
    lastActiveDateISO: "2026-07-16",
    registeredDateLabel: "2024年6月3日",
    registeredDateISO: "2024-06-03",
    profileCompletion: 95,
    isFavorited: false,
    isScouted: false,
  },
  {
    id: "9",
    name: "藤田 健",
    avatarInitials: "藤",
    title: "DevOpsエンジニア（Kubernetes / CI-CD）",
    category: "インフラ",
    location: "神奈川県",
    experienceYears: 3,
    availability: "1か月以内",
    preferredContractTypes: ["案件"],
    preferredWorkStyles: ["フルリモート"],
    preferredLocations: ["神奈川県", "東京都"],
    expectedAnnualSalary: "—",
    expectedMonthlyRate: "70万円〜90万円",
    expectedHourlyRate: "—",
    availableFrom: "2026年8月20日",
    technicalSkills: [
      { name: "Kubernetes", itssLevel: 4, experienceYears: 3 },
      { name: "Docker", itssLevel: 4, experienceYears: 3 },
    ],
    humanSkills: [],
    businessSkills: [],
    certifications: [{ name: "CKA", issuer: "CNCF", acquiredDate: "2023年3月" }],
    workHistory: [
      {
        company: "株式会社パイプラインワークス",
        position: "DevOpsエンジニア",
        period: "2021年4月〜現在",
        employmentType: "正社員",
        summary: "CI/CDパイプラインの整備とKubernetes基盤の運用を担当。",
        technologies: ["Kubernetes", "Docker"],
      },
    ],
    portfolio: [],
    languages: [{ name: "日本語", level: "ネイティブ" }],
    education: [{ school: "神奈川工科大学", department: "情報工学科", period: "2017年4月〜2021年3月" }],
    selfIntroduction: "CI/CDパイプラインの設計・運用に強みを持ち、開発生産性向上を専門にしています。",
    lastActiveDateLabel: "2026年7月9日",
    lastActiveDateISO: "2026-07-09",
    registeredDateLabel: "2025年2月8日",
    registeredDateISO: "2025-02-08",
    profileCompletion: 64,
    isFavorited: false,
    isScouted: false,
  },
  {
    id: "10",
    name: "岡本 真央",
    avatarInitials: "岡",
    title: "クラウドエンジニア（GCP）",
    category: "クラウド",
    location: "東京都",
    experienceYears: 4,
    availability: "今すぐ可能",
    preferredContractTypes: ["案件", "就職"],
    preferredWorkStyles: ["フルリモート", "一部リモート"],
    preferredLocations: ["東京都"],
    expectedAnnualSalary: "620万円〜750万円",
    expectedMonthlyRate: "75万円〜95万円",
    expectedHourlyRate: "—",
    availableFrom: "即日",
    technicalSkills: [
      { name: "AWS", itssLevel: 3, experienceYears: 2 },
      { name: "Docker", itssLevel: 3, experienceYears: 3 },
      { name: "Kubernetes", itssLevel: 3, experienceYears: 2 },
    ],
    humanSkills: [{ name: "学習意欲", rating: 5 }],
    businessSkills: [],
    certifications: [
      { name: "Google Cloud Professional Cloud Architect", issuer: "Google", acquiredDate: "2023年7月" },
    ],
    workHistory: [
      {
        company: "株式会社スケールワークス",
        position: "クラウドエンジニア",
        period: "2022年4月〜現在",
        employmentType: "正社員",
        summary: "GCP上のマイクロサービス基盤の設計・構築を担当。",
        technologies: ["Kubernetes", "Docker"],
      },
    ],
    portfolio: [],
    languages: [{ name: "日本語", level: "ネイティブ" }],
    education: [{ school: "同志社大学", department: "理工学部", period: "2018年4月〜2022年3月" }],
    selfIntroduction: "GCPを中心としたクラウドインフラの設計・構築が専門です。IaC推進の中心メンバーとして活動してきました。",
    lastActiveDateLabel: "2026年7月13日",
    lastActiveDateISO: "2026-07-13",
    registeredDateLabel: "2025年4月22日",
    registeredDateISO: "2025-04-22",
    profileCompletion: 78,
    isFavorited: false,
    isScouted: false,
  },
  {
    id: "11",
    name: "松井 花子",
    avatarInitials: "松",
    title: "クラウドエンジニア（Azure）",
    category: "クラウド",
    location: "大阪府",
    experienceYears: 6,
    availability: "相談可能",
    preferredContractTypes: ["就職", "案件"],
    preferredWorkStyles: ["一部リモート"],
    preferredLocations: ["大阪府", "その他"],
    expectedAnnualSalary: "680万円〜820万円",
    expectedMonthlyRate: "—",
    expectedHourlyRate: "—",
    availableFrom: "相談",
    technicalSkills: [
      { name: "AWS", itssLevel: 4, experienceYears: 3 },
      { name: "Docker", itssLevel: 3, experienceYears: 4 },
    ],
    humanSkills: [{ name: "顧客折衝力", rating: 4 }],
    businessSkills: [{ name: "提案力", rating: 4 }],
    certifications: [{ name: "Microsoft Certified: Azure Solutions Architect Expert", issuer: "Microsoft", acquiredDate: "2022年9月" }],
    workHistory: [
      {
        company: "株式会社インフラネクスト",
        position: "クラウドエンジニア",
        period: "2018年4月〜現在",
        employmentType: "正社員",
        summary: "大手企業向けAzure移行支援プロジェクトを複数リード。",
        technologies: ["Docker"],
      },
    ],
    portfolio: [],
    languages: [{ name: "日本語", level: "ネイティブ" }, { name: "英語", level: "ビジネスレベル" }],
    education: [{ school: "神戸大学", department: "工学部", period: "2014年4月〜2018年3月" }],
    selfIntroduction: "Azure移行支援プロジェクトを中心に、大手企業のクラウド化を数多く支援してきました。",
    lastActiveDateLabel: "2026年6月28日",
    lastActiveDateISO: "2026-06-28",
    registeredDateLabel: "2024年8月14日",
    registeredDateISO: "2024-08-14",
    profileCompletion: 88,
    isFavorited: false,
    isScouted: false,
  },
  {
    id: "12",
    name: "高橋 真央",
    avatarInitials: "高",
    title: "AIエンジニア（Python / 機械学習）",
    category: "AI・データ",
    location: "東京都",
    experienceYears: 5,
    availability: "1か月以内",
    preferredContractTypes: ["案件", "就職"],
    preferredWorkStyles: ["フルリモート", "一部リモート"],
    preferredLocations: ["東京都"],
    expectedAnnualSalary: "700万円〜900万円",
    expectedMonthlyRate: "95万円〜120万円",
    expectedHourlyRate: "—",
    availableFrom: "2026年8月10日",
    technicalSkills: [
      { name: "Python", itssLevel: 5, experienceYears: 5 },
      { name: "PostgreSQL", itssLevel: 3, experienceYears: 3 },
      { name: "AWS", itssLevel: 3, experienceYears: 3 },
    ],
    humanSkills: [{ name: "論理的思考力", rating: 5 }],
    businessSkills: [{ name: "データ分析提案", rating: 4 }],
    certifications: [{ name: "統計検定準1級", issuer: "日本統計学会", acquiredDate: "2021年6月" }],
    workHistory: [
      {
        company: "株式会社データインサイト",
        position: "MLエンジニア",
        period: "2019年4月〜現在",
        employmentType: "正社員",
        summary: "需要予測・異常検知モデルの開発と本番運用を担当。",
        technologies: ["Python", "AWS"],
      },
    ],
    portfolio: [
      {
        title: "需要予測モデル基盤",
        role: "MLエンジニア",
        description: "小売業向け需要予測モデルを開発し、在庫廃棄率を18%削減。",
        skills: ["Python", "AWS"],
        url: "https://example.com/portfolio/demand-forecast",
        period: "2022年〜2024年",
      },
    ],
    languages: [{ name: "日本語", level: "ネイティブ" }, { name: "英語", level: "ビジネスレベル" }],
    education: [{ school: "東京大学大学院", department: "情報理工学系研究科", period: "2017年4月〜2019年3月" }],
    selfIntroduction: "機械学習モデルの開発から本番運用までを一気通貫で担当。需要予測領域の実績が豊富です。",
    lastActiveDateLabel: "2026年7月14日",
    lastActiveDateISO: "2026-07-14",
    registeredDateLabel: "2025年3月30日",
    registeredDateISO: "2025-03-30",
    profileCompletion: 90,
    isFavorited: false,
    isScouted: false,
  },
  {
    id: "13",
    name: "伊藤 蓮",
    avatarInitials: "伊",
    title: "AIエンジニア（LLM／生成AI）",
    category: "AI・データ",
    location: "東京都",
    experienceYears: 4,
    availability: "今すぐ可能",
    preferredContractTypes: ["案件"],
    preferredWorkStyles: ["フルリモート"],
    preferredLocations: ["東京都", "その他"],
    expectedAnnualSalary: "—",
    expectedMonthlyRate: "100万円〜130万円",
    expectedHourlyRate: "—",
    availableFrom: "即日",
    technicalSkills: [
      { name: "Python", itssLevel: 5, experienceYears: 4 },
      { name: "Docker", itssLevel: 3, experienceYears: 3 },
    ],
    humanSkills: [{ name: "探究心", rating: 5 }],
    businessSkills: [],
    certifications: [],
    workHistory: [
      {
        company: "株式会社ニューラルゲート",
        position: "AIエンジニア",
        period: "2020年4月〜現在",
        employmentType: "正社員",
        summary: "生成AIプロダクトの開発・運用を担当。",
        technologies: ["Python", "Docker"],
      },
    ],
    portfolio: [
      {
        title: "社内ナレッジ検索AI",
        role: "AIエンジニア",
        description: "RAG構成による社内ドキュメント検索AIを構築し、検索時間を80%短縮。",
        skills: ["Python"],
        url: "https://example.com/portfolio/rag-search",
        period: "2023年〜2024年",
      },
    ],
    languages: [{ name: "日本語", level: "ネイティブ" }],
    education: [{ school: "京都大学", department: "工学部情報学科", period: "2016年4月〜2020年3月" }],
    selfIntroduction: "自然言語処理を専門とし、生成AIを活用したプロダクト開発の経験があります。",
    lastActiveDateLabel: "2026年7月16日",
    lastActiveDateISO: "2026-07-16",
    registeredDateLabel: "2025年6月25日",
    registeredDateISO: "2025-06-25",
    profileCompletion: 82,
    isFavorited: false,
    isScouted: false,
  },
  {
    id: "14",
    name: "石井 悠斗",
    avatarInitials: "石",
    title: "データエンジニア（Python / GCP）",
    category: "AI・データ",
    location: "東京都",
    experienceYears: 3,
    availability: "1か月以内",
    preferredContractTypes: ["案件", "就職"],
    preferredWorkStyles: ["フルリモート"],
    preferredLocations: ["東京都"],
    expectedAnnualSalary: "580万円〜700万円",
    expectedMonthlyRate: "70万円〜90万円",
    expectedHourlyRate: "—",
    availableFrom: "2026年8月5日",
    technicalSkills: [
      { name: "Python", itssLevel: 4, experienceYears: 3 },
      { name: "PostgreSQL", itssLevel: 3, experienceYears: 3 },
    ],
    humanSkills: [],
    businessSkills: [],
    certifications: [],
    workHistory: [
      {
        company: "株式会社データポート",
        position: "データエンジニア",
        period: "2020年4月〜現在",
        employmentType: "正社員",
        summary: "データ分析基盤の設計・構築・運用を担当。",
        technologies: ["Python"],
      },
    ],
    portfolio: [
      {
        title: "全社データ分析基盤",
        role: "データエンジニア",
        description: "BigQueryとAirflowを用いた全社データ分析基盤を構築。",
        skills: ["Python"],
        url: "https://example.com/portfolio/data-platform",
        period: "2022年〜2024年",
      },
    ],
    languages: [{ name: "日本語", level: "ネイティブ" }],
    education: [{ school: "九州大学", department: "システム情報科学府", period: "2018年4月〜2020年3月" }],
    selfIntroduction: "GCPを中心としたデータパイプライン構築が専門。分析基盤の内製化を複数社で推進してきました。",
    lastActiveDateLabel: "2026年7月11日",
    lastActiveDateISO: "2026-07-11",
    registeredDateLabel: "2025年5月19日",
    registeredDateISO: "2025-05-19",
    profileCompletion: 73,
    isFavorited: false,
    isScouted: false,
  },
  {
    id: "15",
    name: "斎藤 蒼",
    avatarInitials: "斎",
    title: "PM／プロジェクトマネージャー",
    category: "PM",
    location: "大阪府",
    experienceYears: 5,
    availability: "相談可能",
    preferredContractTypes: ["就職"],
    preferredWorkStyles: ["一部リモート", "出社"],
    preferredLocations: ["大阪府"],
    expectedAnnualSalary: "700万円〜880万円",
    expectedMonthlyRate: "—",
    expectedHourlyRate: "—",
    availableFrom: "相談",
    technicalSkills: [{ name: "PostgreSQL", itssLevel: 2, experienceYears: 2 }],
    humanSkills: [{ name: "リーダーシップ", rating: 5 }],
    businessSkills: [
      { name: "プロジェクトマネジメント", rating: 5 },
      { name: "要件定義", rating: 4 },
    ],
    certifications: [{ name: "PMP", issuer: "PMI", acquiredDate: "2023年2月" }],
    workHistory: [
      {
        company: "株式会社ブリッジソリューションズ",
        position: "プロジェクトマネージャー",
        period: "2020年4月〜現在",
        employmentType: "正社員",
        summary: "官公庁向けシステム開発プロジェクトのPMを担当。",
        technologies: [],
      },
    ],
    portfolio: [],
    languages: [{ name: "日本語", level: "ネイティブ" }],
    education: [{ school: "関西大学", department: "総合情報学部", period: "2016年4月〜2020年3月" }],
    selfIntroduction: "SIerでのPM経験5年。大規模プロジェクトの進行管理を得意としています。",
    lastActiveDateLabel: "2026年7月2日",
    lastActiveDateISO: "2026-07-02",
    registeredDateLabel: "2024年10月11日",
    registeredDateISO: "2024-10-11",
    profileCompletion: 77,
    isFavorited: false,
    isScouted: false,
  },
  {
    id: "16",
    name: "村田 麻衣",
    avatarInitials: "村",
    title: "プロダクトマネージャー",
    category: "PM",
    location: "東京都",
    experienceYears: 6,
    availability: "1か月以内",
    preferredContractTypes: ["就職", "案件"],
    preferredWorkStyles: ["フルリモート", "一部リモート"],
    preferredLocations: ["東京都"],
    expectedAnnualSalary: "750万円〜950万円",
    expectedMonthlyRate: "90万円〜110万円",
    expectedHourlyRate: "—",
    availableFrom: "2026年9月1日",
    technicalSkills: [{ name: "PostgreSQL", itssLevel: 2, experienceYears: 2 }],
    humanSkills: [{ name: "巻き込み力", rating: 5 }],
    businessSkills: [
      { name: "プロダクト戦略", rating: 5 },
      { name: "データ分析提案", rating: 4 },
    ],
    certifications: [],
    workHistory: [
      {
        company: "株式会社アナリティクスラボ",
        position: "プロダクトマネージャー",
        period: "2019年4月〜現在",
        employmentType: "正社員",
        summary: "データ分析SaaSのプロダクト戦略・ロードマップ策定を担当。",
        technologies: [],
      },
    ],
    portfolio: [],
    languages: [{ name: "日本語", level: "ネイティブ" }, { name: "英語", level: "ビジネスレベル" }],
    education: [{ school: "慶應義塾大学", department: "経済学部", period: "2015年4月〜2019年3月" }],
    selfIntroduction: "SaaSプロダクトのグロースを担当。データドリブンな意思決定でプロダクト成長を牽引してきました。",
    lastActiveDateLabel: "2026年7月12日",
    lastActiveDateISO: "2026-07-12",
    registeredDateLabel: "2025年2月27日",
    registeredDateISO: "2025-02-27",
    profileCompletion: 84,
    isFavorited: false,
    isScouted: false,
  },
  {
    id: "17",
    name: "松本 直樹",
    avatarInitials: "松",
    title: "QAエンジニア（自動化テスト）",
    category: "QA",
    location: "東京都",
    experienceYears: 3,
    availability: "今すぐ可能",
    preferredContractTypes: ["就職"],
    preferredWorkStyles: ["一部リモート"],
    preferredLocations: ["東京都"],
    expectedAnnualSalary: "480万円〜600万円",
    expectedMonthlyRate: "—",
    expectedHourlyRate: "—",
    availableFrom: "即日",
    technicalSkills: [{ name: "Python", itssLevel: 3, experienceYears: 2 }],
    humanSkills: [{ name: "注意力", rating: 5 }],
    businessSkills: [],
    certifications: [{ name: "JSTQB Foundation Level", issuer: "JSTQB", acquiredDate: "2022年9月" }],
    workHistory: [
      {
        company: "株式会社クオリティファースト",
        position: "QAエンジニア",
        period: "2022年4月〜現在",
        employmentType: "正社員",
        summary: "E2Eテストの自動化とリリース前品質保証プロセスの運用を担当。",
        technologies: ["Python"],
      },
    ],
    portfolio: [],
    languages: [{ name: "日本語", level: "ネイティブ" }],
    education: [{ school: "明治大学", department: "理工学部", period: "2018年4月〜2022年3月" }],
    selfIntroduction: "自動化テストの構築・運用に強みを持つQAエンジニア。品質保証プロセスの改善が得意です。",
    lastActiveDateLabel: "2026年7月6日",
    lastActiveDateISO: "2026-07-06",
    registeredDateLabel: "2025年4月4日",
    registeredDateISO: "2025-04-04",
    profileCompletion: 66,
    isFavorited: false,
    isScouted: false,
  },
  {
    id: "18",
    name: "林 恵美",
    avatarInitials: "林",
    title: "QAエンジニア（手動テスト）",
    category: "QA",
    location: "愛知県",
    experienceYears: 2,
    availability: "1か月以内",
    preferredContractTypes: ["就職"],
    preferredWorkStyles: ["出社", "一部リモート"],
    preferredLocations: ["愛知県"],
    expectedAnnualSalary: "420万円〜520万円",
    expectedMonthlyRate: "—",
    expectedHourlyRate: "—",
    availableFrom: "2026年9月15日",
    technicalSkills: [{ name: "PostgreSQL", itssLevel: 1, experienceYears: 1 }],
    humanSkills: [{ name: "丁寧さ", rating: 4 }],
    businessSkills: [],
    certifications: [],
    workHistory: [
      {
        company: "株式会社テストソリューションズ",
        position: "QAエンジニア",
        period: "2023年4月〜現在",
        employmentType: "正社員",
        summary: "手動テストを中心にリリース前の品質保証業務を担当。",
        technologies: [],
      },
    ],
    portfolio: [],
    languages: [{ name: "日本語", level: "ネイティブ" }],
    education: [{ school: "名古屋市立大学", department: "総合生命理学部", period: "2019年4月〜2023年3月" }],
    selfIntroduction: "手動テストの経験を積みながら、自動化スキルの習得にも取り組んでいます。",
    lastActiveDateLabel: "2026年6月30日",
    lastActiveDateISO: "2026-06-30",
    registeredDateLabel: "2025年7月8日",
    registeredDateISO: "2025-07-08",
    profileCompletion: 55,
    isFavorited: false,
    isScouted: false,
  },
  {
    id: "19",
    name: "木村 拓真",
    avatarInitials: "木",
    title: "セキュリティエンジニア（SOC運用）",
    category: "セキュリティ",
    location: "東京都",
    experienceYears: 4,
    availability: "相談可能",
    preferredContractTypes: ["案件", "就職"],
    preferredWorkStyles: ["フルリモート", "一部リモート"],
    preferredLocations: ["東京都"],
    expectedAnnualSalary: "650万円〜800万円",
    expectedMonthlyRate: "80万円〜100万円",
    expectedHourlyRate: "—",
    availableFrom: "相談",
    technicalSkills: [{ name: "AWS", itssLevel: 3, experienceYears: 2 }],
    humanSkills: [{ name: "冷静な判断力", rating: 5 }],
    businessSkills: [],
    certifications: [{ name: "情報処理安全確保支援士", issuer: "IPA", acquiredDate: "2021年10月" }],
    workHistory: [
      {
        company: "株式会社セーフガード",
        position: "セキュリティエンジニア",
        period: "2020年4月〜現在",
        employmentType: "正社員",
        summary: "Webアプリケーションの脆弱性診断とSOC運用を担当。",
        technologies: ["AWS"],
      },
    ],
    portfolio: [],
    languages: [{ name: "日本語", level: "ネイティブ" }],
    education: [{ school: "電気通信大学", department: "情報理工学域", period: "2016年4月〜2020年3月" }],
    selfIntroduction: "脆弱性診断とSOC運用の実務経験があり、インシデント対応にも精通しています。",
    lastActiveDateLabel: "2026年7月3日",
    lastActiveDateISO: "2026-07-03",
    registeredDateLabel: "2024年12月5日",
    registeredDateISO: "2024-12-05",
    profileCompletion: 80,
    isFavorited: false,
    isScouted: false,
  },
  {
    id: "20",
    name: "青木 美月",
    avatarInitials: "青",
    title: "セキュリティエンジニア（脆弱性診断）",
    category: "セキュリティ",
    location: "神奈川県",
    experienceYears: 2,
    availability: "今すぐ可能",
    preferredContractTypes: ["案件"],
    preferredWorkStyles: ["フルリモート"],
    preferredLocations: ["神奈川県", "東京都"],
    expectedAnnualSalary: "—",
    expectedMonthlyRate: "55万円〜70万円",
    expectedHourlyRate: "3,500円〜4,200円",
    availableFrom: "即日",
    technicalSkills: [{ name: "PostgreSQL", itssLevel: 2, experienceYears: 1 }],
    humanSkills: [],
    businessSkills: [],
    certifications: [],
    workHistory: [
      {
        company: "株式会社インサイトフィールド",
        position: "セキュリティアナリスト",
        period: "2023年4月〜現在",
        employmentType: "正社員",
        summary: "分析基盤のdbtモデリングとセキュリティ診断補助を担当。",
        technologies: [],
      },
    ],
    portfolio: [],
    languages: [{ name: "日本語", level: "ネイティブ" }, { name: "中国語", level: "日常会話レベル" }],
    education: [{ school: "横浜国立大学", department: "理工学部", period: "2019年4月〜2023年3月" }],
    selfIntroduction: "脆弱性診断の実務経験を積み始めた段階です。学習意欲が高く、キャッチアップの速さが強みです。",
    lastActiveDateLabel: "2026年7月15日",
    lastActiveDateISO: "2026-07-15",
    registeredDateLabel: "2025年6月2日",
    registeredDateISO: "2025-06-02",
    profileCompletion: 58,
    isFavorited: false,
    isScouted: false,
  },
];

// ============================================================
// Scout job options
// ============================================================
// This engineer-search/scout module is still fully placeholder/demo (per
// this file's header) — unrelated to the real Company Job Posting CRUD in
// src/lib/company/jobs.ts. Previously derived from the company-jobs.ts mock
// array, which no longer exists now that job postings are real Supabase
// data; kept as a small static list so this demo page keeps working
// unchanged, rather than pulling in real postings (out of scope here).

export const SCOUT_JOB_OPTIONS: { id: string; title: string }[] = [
  { id: "scout-job-1", title: "バックエンドエンジニア（Java / Spring Boot）" },
  { id: "scout-job-2", title: "フロントエンドエンジニア（React / TypeScript）" },
  { id: "scout-job-3", title: "インフラエンジニア（AWS / Kubernetes）" },
];
