/**
 * Company Settings module placeholder content (Japanese).
 * UI only — no backend, no database, no real security logic.
 */

export const COMPANY_SETTINGS_PAGE = {
  title: "設定",
  description: "アカウント・通知・セキュリティなどの設定を管理できます。",
} as const;

export const COMPANY_SETTINGS_DEMO_NOTE =
  "※ UIデモのため、実際の設定変更・削除は行われません。";

// ============================================================
// 1. アカウント設定
// ============================================================

export interface CompanyAccountTextField {
  id: string;
  label: string;
  type: "text" | "email" | "tel";
  autoComplete: string;
  defaultValue: string;
}

export const COMPANY_ACCOUNT_SETTINGS = {
  title: "アカウント設定",
  description: "企業情報とアカウントの基本設定です。",
  saveLabel: "変更を保存",
  savedMessage: "変更を保存しました。",
  timezoneLabel: "タイムゾーン",
  languageLabel: "言語",
} as const;

export const COMPANY_ACCOUNT_TEXT_FIELDS: CompanyAccountTextField[] = [
  {
    id: "companyName",
    label: "企業名",
    type: "text",
    autoComplete: "organization",
    defaultValue: "株式会社テックイノベーション",
  },
  {
    id: "contactName",
    label: "担当者名",
    type: "text",
    autoComplete: "name",
    defaultValue: "採用担当 佐藤",
  },
  {
    id: "email",
    label: "メールアドレス",
    type: "email",
    autoComplete: "email",
    defaultValue: "recruit@tech-innovation.example.com",
  },
  {
    id: "phone",
    label: "電話番号",
    type: "tel",
    autoComplete: "tel",
    defaultValue: "03-1234-5678",
  },
];

export const COMPANY_TIMEZONE_OPTIONS = [
  "Asia/Tokyo（日本標準時）",
  "UTC（協定世界時）",
  "America/Los_Angeles（太平洋標準時）",
] as const;

export const COMPANY_LANGUAGE_OPTIONS = ["日本語", "English"] as const;

// ============================================================
// 2. 通知設定 / 4. 公開設定（共通トグル型）
// ============================================================

export interface CompanyToggleItem {
  id: string;
  label: string;
  description: string;
  defaultChecked: boolean;
}

export const COMPANY_NOTIFICATION_SETTINGS = {
  title: "通知設定",
  description: "受け取る通知の種類を選択できます。",
  savedMessage: "通知設定を保存しました。",
} as const;

export const COMPANY_NOTIFICATION_TOGGLES: CompanyToggleItem[] = [
  {
    id: "applications",
    label: "応募通知",
    description: "新しい応募があった際に通知します。",
    defaultChecked: true,
  },
  {
    id: "messages",
    label: "メッセージ通知",
    description: "新しいメッセージを受信した際に通知します。",
    defaultChecked: true,
  },
  {
    id: "scoutReplies",
    label: "スカウト返信通知",
    description: "送信したスカウトへの返信があった際に通知します。",
    defaultChecked: true,
  },
  {
    id: "interviews",
    label: "面接予定通知",
    description: "面接の予定が確定・変更された際に通知します。",
    defaultChecked: true,
  },
  {
    id: "system",
    label: "システム通知",
    description: "メンテナンスや重要なお知らせを通知します。",
    defaultChecked: true,
  },
  {
    id: "email",
    label: "メール通知",
    description: "上記の通知をメールでも受け取ります。",
    defaultChecked: false,
  },
];

// ============================================================
// 3. セキュリティ設定
// ============================================================

export const COMPANY_SECURITY_SETTINGS = {
  title: "セキュリティ設定",
  description: "アカウントのセキュリティに関する設定です。",
  passwordChange: {
    label: "パスワード変更",
    description: "最終更新日：2026年5月12日",
    buttonLabel: "パスワードを変更",
  },
  twoFactor: {
    label: "2段階認証",
    description: "ログイン時に確認コードを要求し、セキュリティを強化します。",
    defaultChecked: false,
  },
  loginHistory: {
    label: "ログイン履歴",
    description: "直近のログイン状況を確認できます。",
    currentLabel: "現在のセッション",
  },
  sessionManagement: {
    label: "セッション管理",
    description: "現在ログイン中の他のセッションを管理できます。",
    revokeAllLabel: "他のセッションをすべてログアウト",
  },
} as const;

export interface CompanyLoginHistoryItem {
  id: string;
  device: string;
  location: string;
  dateLabel: string;
  isCurrent: boolean;
}

export const COMPANY_LOGIN_HISTORY: CompanyLoginHistoryItem[] = [
  {
    id: "session-1",
    device: "Chrome / Windows",
    location: "東京都",
    dateLabel: "2026年7月17日 9:12",
    isCurrent: true,
  },
  {
    id: "session-2",
    device: "Safari / iPhone",
    location: "東京都",
    dateLabel: "2026年7月14日 18:40",
    isCurrent: false,
  },
  {
    id: "session-3",
    device: "Chrome / macOS",
    location: "大阪府",
    dateLabel: "2026年7月10日 11:05",
    isCurrent: false,
  },
];

// ============================================================
// 4. 公開設定
// ============================================================

export const COMPANY_VISIBILITY_SETTINGS = {
  title: "公開設定",
  description: "企業情報の公開範囲を設定できます。",
  savedMessage: "公開設定を保存しました。",
} as const;

export const COMPANY_VISIBILITY_TOGGLES: CompanyToggleItem[] = [
  {
    id: "profilePublic",
    label: "企業プロフィール公開",
    description: "エンジニアがあなたの企業プロフィールを閲覧できるようにします。",
    defaultChecked: true,
  },
  {
    id: "jobsPublic",
    label: "求人・案件公開",
    description: "公開中の求人・案件を検索結果に表示します。",
    defaultChecked: true,
  },
  {
    id: "contactVisible",
    label: "連絡先表示",
    description: "応募者に対して担当者の連絡先を表示します。",
    defaultChecked: false,
  },
  {
    id: "searchListed",
    label: "検索結果への表示",
    description: "エンジニア検索の結果に企業名を表示します。",
    defaultChecked: true,
  },
];

// ============================================================
// 5. Danger Zone
// ============================================================

export const COMPANY_DANGER_ZONE = {
  title: "Danger Zone",
  description: "これらの操作は取り消せません。慎重に行ってください。",
  cancelLabel: "キャンセル",
  deactivate: {
    label: "アカウントを無効化",
    description: "アカウントを一時的に無効化します。求人・案件は非公開になります。",
    buttonLabel: "無効化する",
    dialogTitle: "本当にアカウントを無効化しますか？",
    dialogDescription:
      "無効化すると、求人・案件が非公開になり、ログインできなくなります。",
    confirmLabel: "無効化する",
  },
  delete: {
    label: "アカウント削除",
    description: "アカウントとすべてのデータを完全に削除します。",
    buttonLabel: "削除する",
    dialogTitle: "本当にアカウントを削除しますか？",
    dialogDescription: "この操作は取り消せません。すべてのデータが完全に削除されます。",
    confirmLabel: "完全に削除する",
  },
} as const;
