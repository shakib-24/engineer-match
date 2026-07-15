/**
 * Login / Registration placeholder content (Japanese).
 * UI only — no backend, no validation logic, no API calls.
 */

export const LOGIN_VISUAL = {
  imageSrc: "/image/ChatGPT Image Jul 13, 2026, 04_44_59 PM office.png",
  imageAlt: "光が差し込むモダンなオフィスの様子",
  title: "スキルで、\n未来をつなぐ。",
  description:
    "エンジニアとIT企業をつなぐ、\n信頼のマッチングプラットフォーム。",
  bullets: ["企業と直接つながる", "スキルで探せる", "安心のサポート"] as const,
} as const;

export const LOGIN_FORM = {
  title: "ログイン",
  description: "アカウントにログインして、続きから始めましょう。",
  email: { label: "メールアドレス", placeholder: "example@company.co.jp" },
  password: { label: "パスワード", placeholder: "••••••••" },
  rememberMe: "ログイン状態を保持する",
  forgotPassword: "パスワードをお忘れですか？",
  submitLabel: "ログイン",
  dividerLabel: "または",
  google: "Googleでログイン",
  github: "GitHubでログイン",
  noAccount: "アカウントをお持ちでない方",
  registerCta: "無料登録",
  registerHref: "/signup",
} as const;

export const REGISTER_VISUAL = {
  imageSrc: "/image/ChatGPT Image Jul 13, 2026, 04_43_45 PM developer .png",
  imageAlt: "デスクでコードと向き合うエンジニアの様子",
  title: "今日から、\n新しいキャリアを。",
  description:
    "無料登録で、あなたに合った\n求人・案件と出会えましょう。",
  bullets: ["企業と直接つながる", "スキルで探せる", "安心のサポート"] as const,
} as const;

export const REGISTER_FORM = {
  title: "アカウント登録",
  description: "まずはアカウント種別をお選びください。",
  accountTypeLabel: "アカウント種別",
  accountTypes: {
    engineer: {
      value: "engineer",
      title: "エンジニアとして登録",
      description: "求人・案件を探す",
    },
    company: {
      value: "company",
      title: "企業として登録",
      description: "求人・案件を掲載する",
    },
  },
  backLabel: "アカウント種別を変更する",
  engineerFields: {
    name: { label: "お名前", placeholder: "山田 太郎" },
    email: { label: "メールアドレス", placeholder: "example@mail.com" },
    password: { label: "パスワード", placeholder: "••••••••" },
    confirmPassword: { label: "パスワード（確認）", placeholder: "••••••••" },
    submitLabel: "エンジニアとして登録",
  },
  companyFields: {
    companyName: { label: "会社名", placeholder: "株式会社サンプル" },
    representative: { label: "代表者", placeholder: "山田 太郎" },
    email: { label: "メールアドレス", placeholder: "example@company.co.jp" },
    password: { label: "パスワード", placeholder: "••••••••" },
    confirmPassword: { label: "パスワード（確認）", placeholder: "••••••••" },
    submitLabel: "企業として登録",
  },
  agreeTermsTermsLabel: "利用規約",
  agreeTermsMiddle: "および",
  agreeTermsPrivacyLabel: "プライバシーポリシー",
  agreeTermsSuffix: "に同意します",
  hasAccount: "すでにアカウントをお持ちの方",
  loginCta: "ログイン",
  loginHref: "/login",
} as const;
