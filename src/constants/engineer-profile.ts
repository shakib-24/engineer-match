/**
 * Engineer Profile Module placeholder content (Japanese).
 * UI only — no backend, no real data, no authentication.
 */

// ============================================================
// Profile header
// ============================================================

export const PROFILE_HEADER = {
  name: "山田 太郎",
  role: "フルスタックエンジニア",
  location: "東京都",
  experienceYears: "6年",
  availability: "案件相談可能",
  avatarInitials: "山田",
  editLabel: "プロフィールを編集",
  editHref: "/engineer/profile/edit",
  previewLabel: "公開プロフィールを確認",
} as const;

// ============================================================
// Profile completion
// ============================================================

export const PROFILE_COMPLETION = {
  title: "プロフィール充実度",
  percentage: 82,
  description: "プロフィールを充実させると、企業からのスカウト率が上がります。",
  missingItems: ["ポートフォリオの追加登録", "資格情報の更新"],
  ctaLabel: "プロフィールを編集",
  ctaHref: "/engineer/profile/edit",
} as const;

// ============================================================
// Basic information
// ============================================================

export const BASIC_INFO = {
  title: "基本情報",
  bio: "フルスタックエンジニアとして6年の実務経験があります。Webアプリケーションの設計から開発、インフラ構築まで一貫して対応可能です。前職では新規事業のシステム基盤構築をリードし、要件定義から本番運用まで携わりました。チームでの開発はもちろん、フリーランスとしての案件参画にも柔軟に対応いたします。",
  birthDate: "1994年5月12日",
  gender: "男性",
  phone: "090-1234-5678",
  email: "yamada.taro@example.com",
  location: "東京都",
  nearestStation: "渋谷駅",
  github: "https://github.com/yamada-taro",
  portfolioUrl: "https://yamada-taro.dev",
} as const;

export const BASIC_INFO_LABELS = {
  bio: "自己紹介",
  birthDate: "生年月日",
  gender: "性別",
  phone: "電話番号",
  email: "メールアドレス",
  location: "居住地",
  nearestStation: "最寄り駅",
  github: "GitHub",
  portfolioUrl: "Portfolio URL",
} as const;

// ============================================================
// Skills
// ============================================================

export const SKILLS_SECTION = {
  title: "スキル",
  technicalTitle: "テクニカルスキル",
  humanTitle: "ヒューマンスキル",
  businessTitle: "ビジネススキル",
} as const;

export const TECHNICAL_SKILLS = [
  { name: "React", itssLevel: 5, experienceYears: 4 },
  { name: "TypeScript", itssLevel: 5, experienceYears: 4 },
  { name: "Next.js", itssLevel: 4, experienceYears: 3 },
  { name: "Java", itssLevel: 4, experienceYears: 5 },
  { name: "Spring Boot", itssLevel: 4, experienceYears: 4 },
  { name: "Python", itssLevel: 3, experienceYears: 2 },
  { name: "AWS", itssLevel: 3, experienceYears: 3 },
  { name: "Docker", itssLevel: 3, experienceYears: 3 },
  { name: "PostgreSQL", itssLevel: 3, experienceYears: 4 },
] as const;

/**
 * ヒューマンスキル (コミュニケーション能力 / ヒアリング力 / プレゼンテーション力) no
 * longer has a mock rating array here -- it's real Supabase data now (see
 * src/lib/engineer/skill-assessments.ts, public.skill_assessments +
 * skill_assessment_attempts, 030_skill_assessments.sql).
 */
export const HUMAN_SKILL_EDIT_NOTE = {
  description:
    "ヒューマンスキルは診断結果に基づいて表示されます。プロフィール画面から各診断を実施・再診断してください。",
  ctaLabel: "プロフィールで診断する",
  ctaHref: "/engineer/profile",
} as const;

/**
 * ビジネススキル (課題解決力 / 論理的思考力 / タスク管理力 / 主体性 /
 * チームワーク力 / 調整・交渉力) is also real Supabase data now (see
 * src/lib/engineer/skill-assessments.ts, public.skill_assessments +
 * skill_assessment_attempts, 031_business_skill_assessments.sql) -- no mock
 * rating array here.
 */
export const BUSINESS_SKILL_EDIT_NOTE = {
  description:
    "ビジネススキルは診断結果に基づいて表示されます。プロフィール画面から各診断を実施・再診断してください。",
  ctaLabel: "プロフィールで診断する",
  ctaHref: "/engineer/profile",
} as const;

// ============================================================
// Work experience
// ============================================================

export const WORK_EXPERIENCE_SECTION = {
  title: "職務経歴",
} as const;

export const WORK_EXPERIENCE = [
  {
    company: "株式会社テックイノベーション",
    position: "バックエンドエンジニア",
    period: "2022年4月 - 現在",
    employmentType: "正社員",
    summary:
      "自社SaaSプロダクトのバックエンド開発をリード。Spring BootとAWSを用いたマイクロサービス基盤の設計・実装を担当し、月間アクティブユーザー数を2倍に押し上げる基盤改善を実現。",
    technologies: ["Java", "Spring Boot", "AWS", "PostgreSQL", "Docker"],
  },
  {
    company: "株式会社デジタルブリッジ",
    position: "フルスタックエンジニア",
    period: "2019年4月 - 2022年3月",
    employmentType: "正社員",
    summary:
      "受託開発案件にてフロントエンドからバックエンドまで幅広く担当。React / TypeScriptによるSPA開発と、Node.jsによるAPI設計・実装を経験。",
    technologies: ["React", "TypeScript", "Node.js", "MySQL"],
  },
  {
    company: "合同会社クラウドフォース",
    position: "ジュニアエンジニア（インターン）",
    period: "2018年4月 - 2019年3月",
    employmentType: "契約社員",
    summary:
      "Webアプリケーションの保守・運用業務に従事。バグ修正や機能改善のタスクを通じて開発の基礎を習得。",
    technologies: ["JavaScript", "PHP", "MySQL"],
  },
] as const;

// ============================================================
// Education
// ============================================================

export const EDUCATION_SECTION = {
  title: "学歴",
} as const;

export const EDUCATION = [
  {
    school: "東京工業大学",
    department: "情報工学部 情報工学科",
    period: "2014年4月 - 2018年3月",
    description:
      "ソフトウェア工学とアルゴリズムを専攻。卒業研究では分散システムにおけるデータ整合性について研究。",
  },
] as const;

// ============================================================
// Certifications
// ============================================================

export const CERTIFICATIONS_SECTION = {
  title: "資格",
} as const;

export const CERTIFICATIONS = [
  {
    name: "基本情報技術者試験",
    issuer: "情報処理推進機構（IPA）",
    acquiredDate: "2019年10月",
    expirationDate: null,
  },
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    acquiredDate: "2022年6月",
    expirationDate: "2025年6月",
  },
  {
    name: "JLPT N2",
    issuer: "日本語能力試験",
    acquiredDate: "2016年12月",
    expirationDate: null,
  },
] as const;

// ============================================================
// Portfolio / Projects
// ============================================================

export const PORTFOLIO_SECTION = {
  title: "ポートフォリオ",
} as const;

export const PORTFOLIO_PROJECTS = [
  {
    title: "社内タスク管理SaaS",
    role: "リードエンジニア",
    description:
      "中小企業向けのタスク管理SaaSを個人開発。認証基盤からリアルタイム通知機能まで一貫して設計・実装。",
    skills: ["Next.js", "TypeScript", "PostgreSQL", "AWS"],
    url: "https://project-taskflow.example.com",
    period: "2024年1月 - 2024年6月",
  },
  {
    title: "ECサイトリニューアルプロジェクト",
    role: "フロントエンドエンジニア",
    description:
      "大手小売企業のECサイトをReactでリニューアル。表示速度を40%改善し、コンバージョン率向上に貢献。",
    skills: ["React", "TypeScript", "Next.js"],
    url: "https://ec-renewal.example.com",
    period: "2023年3月 - 2023年9月",
  },
  {
    title: "IoTデータ可視化ダッシュボード",
    role: "バックエンドエンジニア",
    description:
      "工場のセンサーデータをリアルタイムに収集・可視化するダッシュボードを構築。Pythonでデータ処理パイプラインを設計。",
    skills: ["Python", "AWS", "Docker"],
    url: "https://iot-dashboard.example.com",
    period: "2022年9月 - 2023年2月",
  },
] as const;

// ============================================================
// Languages
// ============================================================

export const LANGUAGES_SECTION = {
  title: "言語",
} as const;

export const LANGUAGES = [
  { name: "日本語", level: "ネイティブ" },
  { name: "英語", level: "ビジネスレベル" },
  { name: "ベンガル語", level: "日常会話レベル" },
] as const;

export const LANGUAGE_LEVEL_OPTIONS = [
  "ネイティブ",
  "ビジネスレベル",
  "日常会話レベル",
  "基礎レベル",
  "学習中",
] as const;

export const LANGUAGE_OPTIONS = [
  "日本語",
  "英語",
  "中国語（簡体）",
  "中国語（繁体）",
  "韓国語",
  "ベンガル語",
  "ヒンディー語",
  "ベトナム語",
  "タイ語",
  "インドネシア語",
  "スペイン語",
  "フランス語",
  "ドイツ語",
  "イタリア語",
  "ポルトガル語",
  "ロシア語",
  "アラビア語",
  "その他",
] as const;

// ============================================================
// Preferred work conditions
// ============================================================

export const PREFERRED_CONDITIONS_SECTION = {
  title: "希望条件",
} as const;

export const CONTRACT_TYPE_OPTIONS = ["就職", "案件", "時間清算"] as const;

export const PREFERRED_CONDITIONS = {
  contractTypes: ["案件", "時間清算"],
  locations: ["東京都", "フルリモート"],
  remotePreference: "フルリモート希望",
  desiredAnnualIncome: "700万円〜900万円",
  desiredMonthlyRate: "75万円〜95万円",
  desiredHourlyRate: "4,500円〜6,000円",
  availableFrom: "即日 〜 1ヶ月以内",
} as const;

export const PREFERRED_CONDITIONS_LABELS = {
  contractTypes: "希望契約形態",
  locations: "希望勤務地",
  remotePreference: "リモート希望",
  desiredAnnualIncome: "希望年収",
  desiredMonthlyRate: "希望月額単価",
  desiredHourlyRate: "希望時間単価",
  availableFrom: "稼働開始可能日",
} as const;

// ============================================================
// Profile visibility
// ============================================================

export const VISIBILITY_OPTIONS = ["公開", "非公開"] as const;

export const PROFILE_VISIBILITY = {
  title: "公開設定",
  status: "公開" as (typeof VISIBILITY_OPTIONS)[number],
  description: "企業からの検索結果およびスカウトの対象として表示されます。",
} as const;

// ============================================================
// Edit form — shared meta / options
// ============================================================

export const PROFILE_EDIT_META = {
  pageTitle: "プロフィール編集",
  backLabel: "プロフィールに戻る",
  demoNote: "※ 現在はUIデモのため、入力内容は保存されません。",
  saveLabel: "保存する",
  cancelLabel: "キャンセル",
  previewLabel: "プレビュー",
  saveSuccessMessage:
    "プロフィールを更新しました。（デモ表示のため実際には保存されていません）",
  cancelHref: "/engineer/profile",
} as const;

export const PROFILE_EDIT_SECTIONS = {
  basicInfo: "基本情報",
  bio: "自己紹介",
  skills: "スキル",
  experience: "職務経歴",
  education: "学歴",
  certifications: "資格",
  portfolio: "ポートフォリオ",
  languages: "言語",
  preferredConditions: "希望条件",
  visibility: "公開設定",
} as const;

export const BASIC_INFO_FORM_FIELDS = {
  name: { label: "氏名", placeholder: "山田 太郎" },
  role: { label: "職種", placeholder: "フルスタックエンジニア" },
  location: { label: "居住地", placeholder: "東京都" },
  experienceYears: { label: "経験年数（年）", placeholder: "6" },
  availability: { label: "稼働状況" },
  birthDate: { label: "生年月日" },
  gender: { label: "性別" },
  phone: { label: "電話番号", placeholder: "090-1234-5678" },
  email: { label: "メールアドレス", placeholder: "example@mail.com" },
  nearestStation: { label: "最寄り駅", placeholder: "渋谷駅" },
  github: { label: "GitHub", placeholder: "https://github.com/username" },
  portfolioUrl: { label: "Portfolio URL", placeholder: "https://example.com" },
} as const;

export const GENDER_OPTIONS = ["男性", "女性", "回答しない"] as const;

export const AVAILABILITY_OPTIONS = [
  "即日対応可能",
  "案件相談可能",
  "現職継続中（応相談）",
  "休職中",
] as const;

export const EMPLOYMENT_TYPE_OPTIONS = [
  "正社員",
  "契約社員",
  "業務委託",
  "派遣社員",
  "アルバイト・パート",
] as const;

export const SKILL_OPTIONS = [
  "React",
  "TypeScript",
  "Next.js",
  "Java",
  "Spring Boot",
  "Python",
  "AWS",
  "Docker",
  "PostgreSQL",
  "Node.js",
  "Go",
  "Kubernetes",
  "MySQL",
  "GraphQL",
] as const;

export const ITSS_LEVEL_OPTIONS = [1, 2, 3, 4, 5, 6, 7] as const;

export const SKILL_ROW_LABELS = {
  skillLabel: "スキル",
  itssLevelLabel: "ITSSレベル",
  experienceYearsLabel: "経験年数（年）",
  addTechnicalLabel: "テクニカルスキルを追加",
  removeLabel: "このスキルを削除",
} as const;

export const PREVIEW_PANEL_LABELS = {
  title: "プレビュー（デモ）",
  description: "現在の入力内容をもとにした簡易プレビューです。",
  closeLabel: "プレビューを閉じる",
} as const;

export const WORK_EXPERIENCE_FORM_FIELDS = {
  company: "会社名",
  position: "役職・ポジション",
  period: "期間",
  employmentType: "雇用形態",
  summary: "業務内容",
  technologies: "使用技術（カンマ区切り）",
} as const;

export const EDUCATION_FORM_FIELDS = {
  school: "学校名",
  department: "学部・学科",
  period: "期間",
  description: "概要",
} as const;

export const CERTIFICATION_FORM_FIELDS = {
  name: "資格名",
  issuer: "発行機関",
  acquiredDate: "取得日",
  expirationDate: "有効期限",
  noExpiration: "有効期限なし",
} as const;

export const PORTFOLIO_FORM_FIELDS = {
  title: "プロジェクト名",
  role: "役割",
  description: "概要",
  skills: "使用スキル（カンマ区切り）",
  url: "URL",
  period: "期間",
} as const;

export const LANGUAGE_ROW_LABELS = {
  languageLabel: "言語",
  levelLabel: "レベル",
  addLabel: "＋ 言語を追加",
  removeLabel: "この言語を削除",
} as const;

export const REMOTE_PREFERENCE_OPTIONS = [
  "フルリモート希望",
  "一部リモート希望",
  "出社希望",
] as const;

export const PREFERRED_CONDITIONS_FORM_FIELDS = {
  contractTypes: "希望契約形態",
  locations: "希望勤務地（カンマ区切り）",
  remotePreference: "リモート希望",
  desiredAnnualIncome: "希望年収",
  desiredMonthlyRate: "希望月額単価",
  desiredHourlyRate: "希望時間単価",
  availableFrom: "稼働開始可能日",
} as const;

export const VISIBILITY_FORM_LABEL = "プロフィールの公開状態";
