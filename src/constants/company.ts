/**
 * Company (employer) module placeholder content (Japanese).
 * UI only — no backend, no real data, no authentication.
 */

// ============================================================
// Company profile
// ============================================================

export const COMPANY_PROFILE_PAGE = {
  title: "企業プロフィール",
  description: "求職者に表示される企業情報を管理できます。",
  editLabel: "編集",
  previewLabel: "会社ページを確認",
} as const;

export interface CompanyContact {
  department: string;
  email: string;
  phone: string;
}

export const COMPANY_PROFILE = {
  name: "株式会社テックイノベーション",
  logoInitials: "テ",
  industry: "業務効率化SaaSの開発・提供",
  employees: "230名",
  headquarters: "東京都渋谷区渋谷2-1-1 テックタワー15F",
  website: "https://tech-innovation.example.com",
  founded: "2014年4月",
  introduction:
    "自社SaaSプロダクトを複数展開するテックカンパニーです。技術選定の自由度が高く、エンジニア主導でプロダクトを成長させる文化があります。「テクノロジーで働き方をアップデートする」をミッションに、業務効率化SaaSを中心としたプロダクト群を通じて、国内3,000社以上の企業のDXを支援しています。",
  businessAreas: [
    "業務効率化SaaS「TechFlow」の開発・運営",
    "大手企業向けDXコンサルティング",
    "クラウドインフラ移行支援",
    "自社プロダクトのAPI／プラットフォーム提供",
  ],
  recruitmentPolicy:
    "技術力だけでなく、チームで課題を解決する姿勢を重視しています。裁量を持って設計・実装に取り組みたい方、プロダクトの成長を技術で支えたい方を歓迎します。選考では実務に即したスキルシート面談を中心に、カジュアルに技術的な会話をさせていただきます。",
  benefits: [
    "社会保険完備",
    "各種手当（住宅・通勤・家族）",
    "書籍購入補助（月1万円まで）",
    "社内勉強会・カンファレンス参加支援",
    "リモートワーク制度（週2日まで）",
    "フレックスタイム制度",
    "資格取得支援制度",
    "社員持株会",
  ],
  contact: {
    department: "採用担当",
    email: "recruit@tech-innovation.example.com",
    phone: "03-1234-5678",
  } satisfies CompanyContact,
} as const;

export interface CompanyStatItem {
  label: string;
  value: string;
  icon: string;
  helper?: string;
}

export const COMPANY_PROFILE_STATISTICS: CompanyStatItem[] = [
  { label: "掲載中の求人・案件", value: "6", icon: "briefcase", helper: "公開中" },
  { label: "累計応募者数", value: "184", icon: "users", helper: "全期間" },
  { label: "選考中の応募者", value: "23", icon: "clock", helper: "対応待ち" },
  { label: "採用決定数", value: "17", icon: "userCheck", helper: "過去12ヶ月" },
];
