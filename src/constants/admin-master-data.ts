/**
 * Admin Master Data management module placeholder content (Japanese).
 * UI only — no backend, no database, no real CSV import/export processing.
 */

export const ADMIN_MASTER_DATA_PAGE = {
  title: "マスタ管理",
  description: "スキル・資格・業種などプラットフォーム共通のマスタデータを管理できます。",
} as const;

// ============================================================
// Categories (tabs)
// ============================================================

export const MASTER_DATA_CATEGORIES = [
  "スキル",
  "スキルカテゴリ",
  "資格",
  "業種",
  "職種",
  "勤務地",
  "契約形態",
  "求人・案件カテゴリ",
  "ITSSレベル",
  "通報カテゴリ",
] as const;
export type MasterDataCategoryKey = (typeof MASTER_DATA_CATEGORIES)[number];

// ============================================================
// Labels
// ============================================================

export const MASTER_DATA_LABELS = {
  searchLabel: "マスタデータを検索",
  searchPlaceholder: "表示名・内部コードで検索",
  activeOnlyLabel: "有効のみ表示",
  addLabel: "追加",
  editLabel: "編集",
  deleteLabel: "削除",
  enableLabel: "有効化",
  disableLabel: "無効化",
  moveUpLabel: "上に移動",
  moveDownLabel: "下に移動",
  resultsSuffix: "件",
  demoNote: "※ UIデモのため、実際のマスタデータは変更されません。",
} as const;

export const MASTER_DATA_TABLE_COLUMNS = [
  "表示順",
  "表示名",
  "内部コード",
  "カテゴリ",
  "説明",
  "利用件数",
  "状態",
  "操作",
] as const;

export const MASTER_DATA_FORM_LABELS = {
  addTitle: "マスタデータを追加",
  editTitle: "マスタデータを編集",
  displayNameLabel: "表示名",
  internalCodeLabel: "内部コード",
  categoryLabel: "カテゴリ",
  descriptionLabel: "説明",
  activeLabel: "有効状態",
  cancelLabel: "キャンセル",
  saveLabel: "保存する",
} as const;

export const MASTER_DATA_DELETE_DIALOG_LABELS = {
  title: "このマスタデータを削除しますか？",
  description: "この操作は取り消せません。",
  blockedTitle: "このマスタデータは削除できません",
  blockedDescription: "利用中のレコードが存在するため削除できません。先に無効化することをご検討ください。",
  cancelLabel: "キャンセル",
  confirmLabel: "削除する",
  closeLabel: "閉じる",
} as const;

export const MASTER_DATA_TOAST_MESSAGES = {
  added: "マスタデータを追加しました。",
  updated: "マスタデータを更新しました。",
  deleted: "マスタデータを削除しました。",
  enabled: "有効化しました。",
  disabled: "無効化しました。",
  reordered: "表示順を変更しました。",
} as const;

export const MASTER_DATA_IMPORT_LABELS = {
  title: "CSVインポート・エクスポート",
  description: "マスタデータのCSVインポート・エクスポートを行えます。（UIデモのため実際のファイル処理は行われません）",
  importLabel: "CSVインポート",
  exportLabel: "CSVエクスポート",
  demoNote: "※ UIデモのため、実際のファイル処理は行われません。",
} as const;

// ============================================================
// Mock data
// ============================================================

export interface MasterDataItem {
  id: string;
  displayName: string;
  internalCode: string;
  category: string;
  description: string;
  sortOrder: number;
  active: boolean;
  usageCount: number;
}

export const MASTER_DATA_ITEMS: Record<MasterDataCategoryKey, MasterDataItem[]> = {
  スキル: [
    { id: "skill-1", displayName: "React", internalCode: "SKL_REACT", category: "フロントエンド", description: "UIライブラリ", sortOrder: 1, active: true, usageCount: 128 },
    { id: "skill-2", displayName: "TypeScript", internalCode: "SKL_TS", category: "フロントエンド", description: "型付きJavaScript", sortOrder: 2, active: true, usageCount: 142 },
    { id: "skill-3", displayName: "Java", internalCode: "SKL_JAVA", category: "バックエンド", description: "オブジェクト指向言語", sortOrder: 3, active: true, usageCount: 96 },
    { id: "skill-4", displayName: "Kubernetes", internalCode: "SKL_K8S", category: "インフラ", description: "コンテナオーケストレーション", sortOrder: 4, active: true, usageCount: 54 },
    { id: "skill-5", displayName: "COBOL", internalCode: "SKL_COBOL", category: "バックエンド", description: "レガシー言語", sortOrder: 5, active: false, usageCount: 0 },
  ],
  スキルカテゴリ: [
    { id: "skillcat-1", displayName: "フロントエンド", internalCode: "CAT_FE", category: "", description: "フロントエンド関連スキル", sortOrder: 1, active: true, usageCount: 45 },
    { id: "skillcat-2", displayName: "バックエンド", internalCode: "CAT_BE", category: "", description: "バックエンド関連スキル", sortOrder: 2, active: true, usageCount: 38 },
    { id: "skillcat-3", displayName: "インフラ", internalCode: "CAT_INFRA", category: "", description: "インフラ・クラウド関連スキル", sortOrder: 3, active: true, usageCount: 22 },
    { id: "skillcat-4", displayName: "AI・データ", internalCode: "CAT_AI", category: "", description: "AI・データ分析関連スキル", sortOrder: 4, active: true, usageCount: 15 },
  ],
  資格: [
    { id: "cert-1", displayName: "基本情報技術者", internalCode: "CERT_FE", category: "IT", description: "IPA国家資格", sortOrder: 1, active: true, usageCount: 61 },
    { id: "cert-2", displayName: "AWS認定ソリューションアーキテクト", internalCode: "CERT_AWS_SAA", category: "IT", description: "AWS認定資格", sortOrder: 2, active: true, usageCount: 34 },
    { id: "cert-3", displayName: "TOEIC", internalCode: "CERT_TOEIC", category: "語学", description: "英語能力試験", sortOrder: 3, active: true, usageCount: 27 },
    { id: "cert-4", displayName: "PMP", internalCode: "CERT_PMP", category: "プロジェクトマネジメント", description: "国際資格", sortOrder: 4, active: true, usageCount: 8 },
    { id: "cert-5", displayName: "旧情報処理技術者（廃止区分）", internalCode: "CERT_OLD", category: "IT", description: "廃止済み区分", sortOrder: 5, active: false, usageCount: 0 },
  ],
  業種: [
    { id: "industry-1", displayName: "IT・ソフトウェア", internalCode: "IND_IT", category: "", description: "", sortOrder: 1, active: true, usageCount: 312 },
    { id: "industry-2", displayName: "SaaS", internalCode: "IND_SAAS", category: "", description: "", sortOrder: 2, active: true, usageCount: 88 },
    { id: "industry-3", displayName: "受託開発", internalCode: "IND_SIER", category: "", description: "", sortOrder: 3, active: true, usageCount: 65 },
    { id: "industry-4", displayName: "セキュリティ", internalCode: "IND_SEC", category: "", description: "", sortOrder: 4, active: true, usageCount: 19 },
    { id: "industry-5", displayName: "コンサルティング", internalCode: "IND_CONSUL", category: "", description: "", sortOrder: 5, active: true, usageCount: 12 },
  ],
  職種: [
    { id: "role-1", displayName: "フロントエンドエンジニア", internalCode: "ROLE_FE", category: "", description: "", sortOrder: 1, active: true, usageCount: 210 },
    { id: "role-2", displayName: "バックエンドエンジニア", internalCode: "ROLE_BE", category: "", description: "", sortOrder: 2, active: true, usageCount: 198 },
    { id: "role-3", displayName: "インフラエンジニア", internalCode: "ROLE_INFRA", category: "", description: "", sortOrder: 3, active: true, usageCount: 76 },
    { id: "role-4", displayName: "AIエンジニア", internalCode: "ROLE_AI", category: "", description: "", sortOrder: 4, active: true, usageCount: 41 },
    { id: "role-5", displayName: "QAエンジニア", internalCode: "ROLE_QA", category: "", description: "", sortOrder: 5, active: true, usageCount: 18 },
  ],
  勤務地: [
    { id: "loc-1", displayName: "東京都", internalCode: "LOC_TOKYO", category: "", description: "", sortOrder: 1, active: true, usageCount: 420 },
    { id: "loc-2", displayName: "神奈川県", internalCode: "LOC_KANAGAWA", category: "", description: "", sortOrder: 2, active: true, usageCount: 58 },
    { id: "loc-3", displayName: "大阪府", internalCode: "LOC_OSAKA", category: "", description: "", sortOrder: 3, active: true, usageCount: 47 },
    { id: "loc-4", displayName: "愛知県", internalCode: "LOC_AICHI", category: "", description: "", sortOrder: 4, active: true, usageCount: 21 },
    { id: "loc-5", displayName: "福岡県", internalCode: "LOC_FUKUOKA", category: "", description: "", sortOrder: 5, active: true, usageCount: 14 },
  ],
  契約形態: [
    { id: "contract-1", displayName: "就職", internalCode: "CT_PERM", category: "", description: "正社員雇用", sortOrder: 1, active: true, usageCount: 512 },
    { id: "contract-2", displayName: "案件", internalCode: "CT_PROJECT", category: "", description: "業務委託・案件契約", sortOrder: 2, active: true, usageCount: 388 },
    { id: "contract-3", displayName: "時間清算", internalCode: "CT_HOURLY", category: "", description: "時間単価精算契約", sortOrder: 3, active: true, usageCount: 96 },
    { id: "contract-4", displayName: "研修", internalCode: "CT_TRAINING", category: "", description: "研修プログラム", sortOrder: 4, active: true, usageCount: 5 },
  ],
  "求人・案件カテゴリ": [
    { id: "jobcat-1", displayName: "フロントエンド", internalCode: "JC_FE", category: "", description: "", sortOrder: 1, active: true, usageCount: 88 },
    { id: "jobcat-2", displayName: "バックエンド", internalCode: "JC_BE", category: "", description: "", sortOrder: 2, active: true, usageCount: 95 },
    { id: "jobcat-3", displayName: "クラウド", internalCode: "JC_CLOUD", category: "", description: "", sortOrder: 3, active: true, usageCount: 42 },
    { id: "jobcat-4", displayName: "AI", internalCode: "JC_AI", category: "", description: "", sortOrder: 4, active: true, usageCount: 27 },
    { id: "jobcat-5", displayName: "PM", internalCode: "JC_PM", category: "", description: "", sortOrder: 5, active: true, usageCount: 9 },
  ],
  ITSSレベル: [
    { id: "itss-1", displayName: "レベル1（見習い）", internalCode: "ITSS_1", category: "", description: "", sortOrder: 1, active: true, usageCount: 31 },
    { id: "itss-2", displayName: "レベル2（一人前）", internalCode: "ITSS_2", category: "", description: "", sortOrder: 2, active: true, usageCount: 84 },
    { id: "itss-3", displayName: "レベル3（独り立ち）", internalCode: "ITSS_3", category: "", description: "", sortOrder: 3, active: true, usageCount: 156 },
    { id: "itss-4", displayName: "レベル4（棟梁）", internalCode: "ITSS_4", category: "", description: "", sortOrder: 4, active: true, usageCount: 89 },
    { id: "itss-5", displayName: "レベル5（実務決裁者）", internalCode: "ITSS_5", category: "", description: "", sortOrder: 5, active: true, usageCount: 24 },
  ],
  通報カテゴリ: [
    { id: "reportcat-1", displayName: "不適切な求人・案件", internalCode: "RPT_JOB", category: "", description: "", sortOrder: 1, active: true, usageCount: 3 },
    { id: "reportcat-2", displayName: "スパム", internalCode: "RPT_SPAM", category: "", description: "", sortOrder: 2, active: true, usageCount: 2 },
    { id: "reportcat-3", displayName: "虚偽情報", internalCode: "RPT_FALSE", category: "", description: "", sortOrder: 3, active: true, usageCount: 1 },
    { id: "reportcat-4", displayName: "ハラスメント", internalCode: "RPT_HARASS", category: "", description: "", sortOrder: 4, active: true, usageCount: 1 },
    { id: "reportcat-5", displayName: "不適切なメッセージ", internalCode: "RPT_MSG", category: "", description: "", sortOrder: 5, active: true, usageCount: 1 },
    { id: "reportcat-6", displayName: "なりすまし", internalCode: "RPT_IMPERSONATE", category: "", description: "", sortOrder: 6, active: true, usageCount: 1 },
    { id: "reportcat-7", displayName: "その他", internalCode: "RPT_OTHER", category: "", description: "", sortOrder: 7, active: true, usageCount: 1 },
  ],
};
