/**
 * Engineer Settings module placeholder content (Japanese).
 * UI only — no backend, no database, no real security logic.
 */

export const ENGINEER_SETTINGS_PAGE = {
  title: "設定",
  description: "アカウント・通知・プライバシーなどの設定を管理できます。",
} as const;

export const ENGINEER_SETTINGS_DEMO_NOTE =
  "※ UIデモのため、実際の設定変更・削除は行われません。";

// ============================================================
// 1. アカウント設定
// ============================================================

export interface EngineerAccountTextField {
  id: string;
  label: string;
  type: "text" | "email" | "tel";
  autoComplete: string;
  defaultValue: string;
}

export const ENGINEER_ACCOUNT_SETTINGS = {
  title: "アカウント設定",
  description: "プロフィールとアカウントの基本設定です。",
  saveLabel: "変更を保存",
  savedMessage: "変更を保存しました。",
  timezoneLabel: "タイムゾーン",
  languageLabel: "表示言語",
} as const;

export const ENGINEER_ACCOUNT_TEXT_FIELDS: EngineerAccountTextField[] = [
  {
    id: "fullName",
    label: "氏名",
    type: "text",
    autoComplete: "name",
    defaultValue: "山田 太郎",
  },
  {
    id: "displayName",
    label: "表示名",
    type: "text",
    autoComplete: "nickname",
    defaultValue: "たろう@エンジニア",
  },
  {
    id: "email",
    label: "メールアドレス",
    type: "email",
    autoComplete: "email",
    defaultValue: "yamada.taro@example.com",
  },
  {
    id: "phone",
    label: "電話番号",
    type: "tel",
    autoComplete: "tel",
    defaultValue: "090-1234-5678",
  },
  {
    id: "location",
    label: "居住地",
    type: "text",
    autoComplete: "address-level1",
    defaultValue: "東京都",
  },
];

export const ENGINEER_TIMEZONE_OPTIONS = [
  "Asia/Tokyo（日本標準時）",
  "UTC（協定世界時）",
  "America/Los_Angeles（太平洋標準時）",
] as const;

export const ENGINEER_LANGUAGE_OPTIONS = ["日本語", "English"] as const;

// ============================================================
// 2. 通知設定 / 3. 公開・プライバシー設定（共通トグル型）
// ============================================================

export interface EngineerToggleItem {
  id: string;
  label: string;
  description: string;
  defaultChecked: boolean;
}

export const ENGINEER_NOTIFICATION_SETTINGS = {
  title: "通知設定",
  description: "受け取る通知の種類を選択できます。",
  savedMessage: "通知設定を保存しました。",
} as const;

export const ENGINEER_NOTIFICATION_TOGGLES: EngineerToggleItem[] = [
  {
    id: "newJobs",
    label: "新着求人・案件通知",
    description: "希望条件に合った新しい求人・案件が公開された際に通知します。",
    defaultChecked: true,
  },
  {
    id: "applicationUpdates",
    label: "応募状況更新通知",
    description: "応募した求人・案件の選考状況が更新された際に通知します。",
    defaultChecked: true,
  },
  {
    id: "messages",
    label: "メッセージ通知",
    description: "新しいメッセージを受信した際に通知します。",
    defaultChecked: true,
  },
  {
    id: "scouts",
    label: "スカウト通知",
    description: "企業からスカウトが届いた際に通知します。",
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
// 3. 公開・プライバシー設定
// ============================================================

export const ENGINEER_PRIVACY_SETTINGS = {
  title: "公開・プライバシー設定",
  description: "プロフィールの公開範囲を設定できます。",
  savedMessage: "公開・プライバシー設定を保存しました。",
} as const;

export const ENGINEER_PRIVACY_TOGGLES: EngineerToggleItem[] = [
  {
    id: "profilePublic",
    label: "プロフィールを企業に公開",
    description: "企業があなたのプロフィールを閲覧できるようにします。",
    defaultChecked: true,
  },
  {
    id: "careerPublic",
    label: "職務経歴を公開",
    description: "企業に対して職務経歴の詳細を表示します。",
    defaultChecked: true,
  },
  {
    id: "preferencesPublic",
    label: "希望条件を公開",
    description: "希望する勤務条件・年収などを企業に表示します。",
    defaultChecked: true,
  },
  {
    id: "lastLoginVisible",
    label: "最終ログイン日時を表示",
    description: "企業に対して最終ログイン日時を表示します。",
    defaultChecked: false,
  },
  {
    id: "acceptScouts",
    label: "企業からのスカウトを受け取る",
    description: "条件に合った企業からのスカウトを受け取ります。",
    defaultChecked: true,
  },
  {
    id: "searchListed",
    label: "検索結果にプロフィールを表示",
    description: "企業のエンジニア検索結果にプロフィールを表示します。",
    defaultChecked: true,
  },
];

// ============================================================
// 4. セキュリティ設定
// ============================================================

export const ENGINEER_SECURITY_SETTINGS = {
  title: "セキュリティ設定",
  description: "アカウントのセキュリティに関する設定です。",
  passwordChange: {
    label: "パスワード変更",
    description: "最終更新日：2026年4月3日",
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

export interface EngineerLoginHistoryItem {
  id: string;
  device: string;
  location: string;
  dateLabel: string;
  isCurrent: boolean;
}

export const ENGINEER_LOGIN_HISTORY: EngineerLoginHistoryItem[] = [
  {
    id: "session-1",
    device: "Chrome / Windows",
    location: "東京都",
    dateLabel: "2026年7月17日 8:45",
    isCurrent: true,
  },
  {
    id: "session-2",
    device: "Safari / iPhone",
    location: "東京都",
    dateLabel: "2026年7月15日 21:10",
    isCurrent: false,
  },
  {
    id: "session-3",
    device: "Chrome / Android",
    location: "神奈川県",
    dateLabel: "2026年7月12日 19:30",
    isCurrent: false,
  },
];

// ============================================================
// 5. Danger Zone
// ============================================================

export const ENGINEER_DANGER_ZONE = {
  title: "Danger Zone",
  description: "これらの操作は取り消せません。慎重に行ってください。",
  cancelLabel: "キャンセル",
  suspend: {
    label: "アカウントを一時停止",
    description: "アカウントを一時的に停止します。プロフィールは非公開になります。",
    buttonLabel: "一時停止する",
    dialogTitle: "本当にアカウントを一時停止しますか？",
    dialogDescription:
      "一時停止すると、プロフィールが非公開になり、ログインできなくなります。",
    confirmLabel: "一時停止する",
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
