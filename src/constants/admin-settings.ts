/**
 * Admin Settings module placeholder content (Japanese).
 * UI only — no backend, no real account changes, no real data reset.
 */

export const ADMIN_SETTINGS_PAGE = {
  title: "システム設定",
  description: "管理者アカウント・通知・セキュリティ・プラットフォーム設定を管理できます。",
} as const;

export const ADMIN_SETTINGS_DEMO_NOTE =
  "※ UIデモのため、実際のシステム設定やアカウントには影響しません。";

// ============================================================
// 1. 管理者アカウント
// ============================================================

export const ADMIN_ACCOUNT_SETTINGS = {
  title: "管理者アカウント",
  description: "管理者としての基本情報を管理します。",
  timezoneLabel: "タイムゾーン",
  languageLabel: "表示言語",
  savedMessage: "保存しました。",
  saveLabel: "保存する",
} as const;

export interface AdminAccountTextField {
  id: string;
  label: string;
  type: "text" | "email" | "tel";
  autoComplete?: string;
  defaultValue: string;
}

export const ADMIN_ACCOUNT_TEXT_FIELDS: AdminAccountTextField[] = [
  { id: "name", label: "氏名", type: "text", autoComplete: "name", defaultValue: "佐々木 玲奈" },
  { id: "email", label: "メールアドレス", type: "email", autoComplete: "email", defaultValue: "admin@example.com" },
  { id: "role", label: "役割", type: "text", defaultValue: "システム管理者" },
  { id: "phone", label: "電話番号", type: "tel", autoComplete: "tel", defaultValue: "03-1234-5678" },
];

export const ADMIN_TIMEZONE_OPTIONS = ["Asia/Tokyo (UTC+9)", "UTC", "America/Los_Angeles (UTC-8)"] as const;
export const ADMIN_LANGUAGE_OPTIONS = ["日本語", "English"] as const;

// ============================================================
// 2. 通知設定
// ============================================================

export const ADMIN_NOTIFICATION_SETTINGS_SECTION = {
  title: "通知設定",
  description: "管理者宛の通知の受信設定を管理します。",
  savedMessage: "設定を保存しました。",
} as const;

export interface AdminSettingsToggle {
  id: string;
  label: string;
  description: string;
  defaultChecked: boolean;
}

export const ADMIN_NOTIFICATION_TOGGLES: AdminSettingsToggle[] = [
  { id: "company-review", label: "企業審査の通知", description: "新規企業の審査依頼を受信します。", defaultChecked: true },
  { id: "job-review", label: "求人・案件審査の通知", description: "新規求人・案件の審査依頼を受信します。", defaultChecked: true },
  { id: "report", label: "通報の通知", description: "新しい通報を受信した際に通知します。", defaultChecked: true },
  { id: "system-alert", label: "システム警告の通知", description: "システムの異常やエラーを通知します。", defaultChecked: true },
  { id: "security-alert", label: "セキュリティアラートの通知", description: "不審なログインなどのセキュリティ関連通知です。", defaultChecked: true },
  { id: "weekly-report", label: "週次レポート", description: "週次の利用状況レポートをメールで受け取ります。", defaultChecked: false },
];

// ============================================================
// 3. セキュリティ
// ============================================================

export const ADMIN_SECURITY_SETTINGS_SECTION = {
  title: "セキュリティ",
  description: "管理者アカウントのセキュリティを管理します。",
  passwordChange: {
    label: "パスワードの変更",
    description: "定期的なパスワードの変更を推奨します。",
    buttonLabel: "変更する",
  },
  twoFactor: {
    label: "二段階認証",
    description: "ログイン時に追加の認証コードを要求します。",
    defaultChecked: true,
  },
  loginHistory: {
    label: "ログイン履歴",
    description: "直近のログイン履歴です。",
    currentLabel: "現在のセッション",
  },
  sessionManagement: {
    label: "セッション管理",
    description: "他のデバイスでログインしているセッションを終了します。",
    revokeAllLabel: "全セッションを終了",
  },
} as const;

export interface AdminLoginHistoryItem {
  id: string;
  device: string;
  location: string;
  dateLabel: string;
  isCurrent: boolean;
}

export const ADMIN_LOGIN_HISTORY: AdminLoginHistoryItem[] = [
  { id: "login-1", device: "Chrome / Windows", location: "東京都・日本", dateLabel: "2026年7月17日 9:00", isCurrent: true },
  { id: "login-2", device: "Safari / macOS", location: "東京都・日本", dateLabel: "2026年7月15日 18:20", isCurrent: false },
  { id: "login-3", device: "Chrome / Android", location: "大阪府・日本", dateLabel: "2026年7月10日 8:45", isCurrent: false },
];

// ============================================================
// 4. プラットフォーム設定
// ============================================================

export const ADMIN_PLATFORM_SETTINGS_SECTION = {
  title: "プラットフォーム設定",
  description: "プラットフォーム全体の動作に関わる設定です。",
  savedMessage: "設定を保存しました。",
} as const;

export const ADMIN_PLATFORM_TOGGLES: AdminSettingsToggle[] = [
  { id: "allow-engineer-signup", label: "エンジニアの新規登録を許可", description: "エンジニアが新規にアカウントを作成できるようにします。", defaultChecked: true },
  { id: "allow-company-signup", label: "企業の新規登録を許可", description: "企業が新規にアカウントを作成できるようにします。", defaultChecked: true },
  { id: "require-company-review", label: "企業アカウントの審査を必須にする", description: "企業アカウントの利用開始前に管理者審査を必須にします。", defaultChecked: true },
  { id: "auto-publish-jobs", label: "求人・案件の自動公開", description: "審査なしで求人・案件を自動的に公開します。", defaultChecked: false },
];

// ============================================================
// 5. メンテナンス設定
// ============================================================

export const ADMIN_MAINTENANCE_SETTINGS_SECTION = {
  title: "メンテナンス設定",
  description: "メンテナンスモードとメンテナンス告知を管理します。",
  maintenanceModeLabel: "メンテナンスモード",
  maintenanceModeDescription: "有効にすると、一般ユーザーはメンテナンス画面が表示されます。",
  messageLabel: "メンテナンス告知メッセージ",
  messagePlaceholder: "例：2026年7月20日 2:00〜4:00にメンテナンスを実施いたします。",
  scheduledStartLabel: "開始予定日時",
  scheduledEndLabel: "終了予定日時",
  saveLabel: "保存する",
  savedMessage: "メンテナンス設定を保存しました。",
} as const;

// ============================================================
// 6. Danger Zone
// ============================================================

export const ADMIN_DANGER_ZONE_SECTION = {
  title: "Danger Zone",
  description: "これらの操作は取り消すことができません。慎重に実行してください。",
  cancelLabel: "キャンセル",
  disableAccount: {
    label: "管理者アカウントを無効化",
    description: "このアカウントでの管理者ログインができなくなります。",
    buttonLabel: "無効化する",
    dialogTitle: "管理者アカウントを無効化しますか？",
    dialogDescription: "この操作は取り消せません。ログイン後に別の管理者アカウントでのみ再度有効化できます。",
    confirmLabel: "無効化する",
  },
  resetDemoData: {
    label: "デモデータをリセット",
    description: "すべてのモックデータを初期状態に戻します。",
    buttonLabel: "リセットする",
    dialogTitle: "デモデータをリセットしますか？",
    dialogDescription: "ユーザー・企業・求人・応募などのモックデータがすべて初期状態に戻ります。",
    confirmLabel: "リセットする",
  },
  resetPlatformSettings: {
    label: "プラットフォーム設定を初期化",
    description: "プラットフォーム設定・メンテナンス設定を初期値に戻します。",
    buttonLabel: "初期化する",
    dialogTitle: "プラットフォーム設定を初期化しますか？",
    dialogDescription: "通知設定・プラットフォーム設定・メンテナンス設定がすべて初期値に戻ります。",
    confirmLabel: "初期化する",
  },
} as const;
