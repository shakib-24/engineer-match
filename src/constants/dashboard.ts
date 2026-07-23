/**
 * Dashboard placeholder content (Japanese).
 * UI only — no backend, no real data, no authentication.
 */

// ---- Navigation ----

export const ENGINEER_NAV = [
  { href: "/engineer/dashboard", label: "ダッシュボード", icon: "layoutDashboard" },
  { href: "/engineer/profile", label: "プロフィール", icon: "userRound" },
  { href: "/engineer/jobs", label: "求人・案件を探す", icon: "search" },
  { href: "/engineer/applications", label: "応募管理", icon: "clipboardList" },
  { href: "/messages", label: "メッセージ", icon: "messageSquare" },
  { href: "/notifications", label: "通知", icon: "bell" },
  { href: "/engineer/favorites", label: "お気に入り", icon: "heart" },
  { href: "/engineer/settings", label: "設定", icon: "settings" },
] as const;

export const COMPANY_NAV = [
  { href: "/company/dashboard", label: "ダッシュボード", icon: "layoutDashboard" },
  { href: "/company/profile", label: "企業プロフィール", icon: "building2" },
  { href: "/company/jobs", label: "求人・案件管理", icon: "briefcase" },
  { href: "/company/jobs/new", label: "新規掲載", icon: "filePlus2" },
  { href: "/company/applicants", label: "応募者管理", icon: "users" },
  { href: "/company/engineers", label: "エンジニア検索", icon: "search" },
  { href: "/company/messages", label: "メッセージ", icon: "messageSquare" },
  { href: "/company/notifications", label: "通知", icon: "bell" },
  { href: "/company/settings", label: "設定", icon: "settings" },
] as const;

export const USER_MENU = {
  engineer: { name: "山田 太郎", role: "エンジニア", initials: "山田" },
  company: { name: "株式会社テックイノベーション", role: "採用担当", initials: "採用" },
} as const;

export const DASHBOARD_LOGOUT = {
  label: "ログアウト",
  loadingLabel: "ログアウト中…",
  errorMessage:
    "ログアウトに失敗しました。しばらくしてから再度お試しください。",
} as const;

// ============================================================
// Engineer overview
// ============================================================

export const ENGINEER_WELCOME = {
  subtitle: "本日も新しいチャンスをチェックしましょう。",
} as const;

export const ENGINEER_PROFILE_COMPLETION = {
  title: "プロフィール充実度",
  description:
    "プロフィールを充実させると、企業からのスカウト率が上がります。",
  ctaLabel: "プロフィールを編集",
  ctaHref: "/engineer/profile",
} as const;

export const ENGINEER_STATS_LABELS = {
  applications: { label: "応募数", icon: "send", helper: "累計" },
  screening: { label: "選考中", icon: "clock", helper: "対応待ち" },
  favorites: { label: "お気に入り", icon: "heart", helper: "保存済み" },
} as const;

export const ENGINEER_RECOMMENDED_OPPORTUNITIES = {
  title: "新着求人・案件",
  description: "まだ応募していない、新しく公開された求人・案件です。",
  viewAllLabel: "すべて見る",
  viewAllHref: "/engineer/jobs",
  emptyMessage: "現在ご紹介できる求人・案件がありません。",
} as const;

export const ENGINEER_RECENT_APPLICATIONS = {
  title: "最近の応募状況",
  description: "応募した求人・案件の選考状況です。",
  viewAllLabel: "応募一覧を見る",
  viewAllHref: "/engineer/applications",
  emptyMessage: "まだ応募した求人・案件がありません。",
} as const;

export const ENGINEER_RECENT_MESSAGES = {
  title: "最近のメッセージ",
  viewAllLabel: "メッセージ一覧を見る",
  viewAllHref: "/messages",
  emptyMessage: "メッセージはまだありません。",
} as const;

export const ENGINEER_SKILL_SUMMARY = {
  title: "スキル・ITSSサマリー",
  description: "登録済みのスキルとITSSレベルです。",
  ctaLabel: "スキルを編集",
  ctaHref: "/engineer/profile",
  emptyMessage: "テクニカルスキルが未登録です。",
} as const;

// ============================================================
// Company overview
// ============================================================

export const COMPANY_WELCOME = {
  greeting: "おかえりなさい、株式会社テックイノベーション様",
  subtitle: "採用活動の状況を確認しましょう。",
} as const;

export const COMPANY_STATS = [
  { label: "掲載中の求人・案件", value: "8", icon: "briefcase", helper: "公開中" },
  { label: "応募者数", value: "24", icon: "users", helper: "今月" },
  { label: "選考中", value: "11", icon: "clock", helper: "対応待ち" },
  { label: "新規応募", value: "5", icon: "userPlus", helper: "過去7日間" },
] as const;

export const COMPANY_ACTIVE_OPPORTUNITIES = {
  title: "掲載中の求人・案件",
  description: "現在募集中の求人・案件と応募状況です。",
  viewAllLabel: "求人・案件管理へ",
  viewAllHref: "/company/jobs",
  items: [
    {
      title: "バックエンドエンジニア（Java / Spring Boot）",
      contractType: "就職",
      applicantCount: 9,
      status: "公開中",
      postedAt: "2026年7月10日",
    },
    {
      title: "フロントエンドエンジニア（React / TypeScript）",
      contractType: "案件",
      applicantCount: 6,
      status: "公開中",
      postedAt: "2026年7月8日",
    },
    {
      title: "インフラエンジニア（AWS / Kubernetes）",
      contractType: "時間清算",
      applicantCount: 4,
      status: "公開中",
      postedAt: "2026年7月5日",
    },
  ],
} as const;

export const COMPANY_RECENT_APPLICANTS = {
  title: "最近の応募者",
  description: "直近で応募のあったエンジニアです。",
  viewAllLabel: "応募者管理へ",
  viewAllHref: "/company/applicants",
  items: [
    {
      name: "佐藤 健太",
      title: "バックエンドエンジニア（Java / Spring Boot）",
      status: "書類選考中",
      appliedAt: "2026年7月12日",
    },
    {
      name: "鈴木 美咲",
      title: "フロントエンドエンジニア（React / TypeScript）",
      status: "面接調整中",
      appliedAt: "2026年7月11日",
    },
    {
      name: "高橋 大輔",
      title: "インフラエンジニア（AWS / Kubernetes）",
      status: "書類選考中",
      appliedAt: "2026年7月9日",
    },
  ],
} as const;

export const COMPANY_CANDIDATE_RECOMMENDATIONS = {
  title: "おすすめのエンジニア",
  description: "募集条件に合った候補者をご紹介します。",
  viewAllLabel: "エンジニアを検索",
  viewAllHref: "/company/engineers",
  items: [
    { name: "田中 慎一", itssLevel: 4, skills: ["Java", "Spring Boot", "AWS"], location: "東京都" },
    { name: "伊藤 まどか", itssLevel: 3, skills: ["React", "TypeScript", "Next.js"], location: "フルリモート" },
    { name: "渡辺 隆", itssLevel: 5, skills: ["AWS", "Docker", "Kubernetes"], location: "大阪府" },
  ],
} as const;

export const COMPANY_RECENT_MESSAGES = {
  title: "最近のメッセージ",
  viewAllLabel: "メッセージ一覧を見る",
  viewAllHref: "/company/messages",
  items: [
    {
      sender: "佐藤 健太",
      preview: "面接の日程調整について、ご連絡ありがとうございます。",
      time: "1時間前",
      unread: true,
    },
    {
      sender: "鈴木 美咲",
      preview: "選考状況について確認させていただけますでしょうか。",
      time: "5時間前",
      unread: true,
    },
    {
      sender: "高橋 大輔",
      preview: "ご対応いただきありがとうございました。",
      time: "2日前",
      unread: false,
    },
  ],
} as const;

export const COMPANY_QUICK_ACTIONS = {
  title: "クイックアクション",
  items: [
    { label: "新規求人・案件を掲載", href: "/company/jobs/new", icon: "filePlus2" },
    { label: "応募者を確認する", href: "/company/applicants", icon: "users" },
    { label: "エンジニアを検索する", href: "/company/engineers", icon: "search" },
  ],
} as const;
