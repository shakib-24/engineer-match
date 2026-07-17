/**
 * Admin Companies management module placeholder content (Japanese).
 * UI only — no backend, no database, no real account actions.
 */

import type { AdminNoteEntry } from "@/components/admin/shared/AdminInternalNote";

// ============================================================
// Page meta
// ============================================================

export const ADMIN_COMPANIES_PAGE = {
  title: "企業管理",
  description: "登録企業の審査状況と利用状況を管理できます。",
} as const;

// ============================================================
// Enums / types
// ============================================================

export const ADMIN_COMPANY_REVIEW_STATUSES = ["審査中", "承認済み", "差し戻し", "却下"] as const;
export type AdminCompanyReviewStatus = (typeof ADMIN_COMPANY_REVIEW_STATUSES)[number];

export const ADMIN_COMPANY_USAGE_STATUSES = ["有効", "利用停止中"] as const;
export type AdminCompanyUsageStatus = (typeof ADMIN_COMPANY_USAGE_STATUSES)[number];

export const ADMIN_COMPANY_INDUSTRIES = [
  "IT・ソフトウェア",
  "SaaS",
  "受託開発",
  "セキュリティ",
  "コンサルティング",
] as const;

export const ADMIN_COMPANY_SIZES = [
  "〜50名",
  "51〜100名",
  "101〜300名",
  "301名以上",
] as const;

export const ADMIN_COMPANY_REVIEW_STATUS_TONE: Record<
  AdminCompanyReviewStatus,
  "positive" | "warning" | "negative" | "neutral"
> = {
  審査中: "warning",
  承認済み: "positive",
  差し戻し: "negative",
  却下: "neutral",
};

export const ADMIN_COMPANY_USAGE_STATUS_TONE: Record<
  AdminCompanyUsageStatus,
  "positive" | "negative"
> = {
  有効: "positive",
  利用停止中: "negative",
};

// ============================================================
// Summary cards
// ============================================================

export const ADMIN_COMPANY_SUMMARY_LABELS = {
  total: "登録企業",
  approved: "承認済み",
  underReview: "審査中",
  returned: "差し戻し",
  suspended: "利用停止中",
  newThisMonth: "今月の新規企業",
} as const;

// ============================================================
// Search / filters
// ============================================================

export const ADMIN_COMPANY_SEARCH_LABELS = {
  label: "企業を検索",
  placeholder: "企業名・担当者名・企業IDで検索",
} as const;

export const ADMIN_COMPANY_FILTER_LABELS = {
  title: "絞り込み条件",
  reviewStatus: "審査状態",
  usageStatus: "利用状態",
  industry: "業種",
  companySize: "企業規模",
  registeredWithin: "登録日",
  resetLabel: "条件をリセット",
} as const;

export const ADMIN_COMPANY_DATE_RANGE_OPTIONS = [
  { label: "指定なし", days: null },
  { label: "7日以内", days: 7 },
  { label: "30日以内", days: 30 },
  { label: "90日以内", days: 90 },
] as const;

export interface AdminCompanyFilterState {
  reviewStatuses: AdminCompanyReviewStatus[];
  usageStatuses: AdminCompanyUsageStatus[];
  industries: string[];
  companySizes: string[];
  registeredWithinDays: number | null;
}

export const DEFAULT_ADMIN_COMPANY_FILTER_STATE: AdminCompanyFilterState = {
  reviewStatuses: [],
  usageStatuses: [],
  industries: [],
  companySizes: [],
  registeredWithinDays: null,
};

// ============================================================
// Table / actions
// ============================================================

export const ADMIN_COMPANY_TABLE_COLUMNS = [
  "企業名",
  "業種",
  "担当者",
  "求人数",
  "登録日",
  "審査状態",
  "利用状態",
  "操作",
] as const;

export const ADMIN_COMPANY_ACTION_LABELS = {
  viewDetails: "詳細を見る",
  approve: "承認",
  return: "差し戻し",
  reject: "却下",
  suspend: "利用停止",
  reinstate: "利用再開",
} as const;

export const ADMIN_COMPANY_RESULTS_META = {
  resultsSuffix: "件の企業",
} as const;

// ============================================================
// Action dialogs
// ============================================================

export const ADMIN_COMPANY_ACTION_DIALOG_LABELS = {
  approveTitle: "この企業を承認しますか？",
  approveDescription: "承認すると、企業は求人・案件の掲載を開始できます。",
  approveConfirmLabel: "承認する",
  returnTitle: "この企業を差し戻しますか？",
  returnDescription: "差し戻しの理由を入力してください。企業に通知されます。",
  returnConfirmLabel: "差し戻す",
  rejectTitle: "この企業を却下しますか？",
  rejectDescription: "却下の理由を入力してください。この操作は取り消せません。",
  rejectConfirmLabel: "却下する",
  suspendTitle: "この企業を利用停止にしますか？",
  suspendDescription: "利用停止の理由を入力してください。企業は求人・案件を公開できなくなります。",
  suspendConfirmLabel: "利用停止にする",
  reinstateTitle: "この企業の利用を再開しますか？",
  reinstateDescription: "利用を再開すると、企業は再び求人・案件を公開できるようになります。",
  reinstateConfirmLabel: "利用再開する",
  reasonLabel: "理由",
  reasonPlaceholder: "対応理由を入力してください",
  cancelLabel: "キャンセル",
} as const;

export const ADMIN_COMPANY_TOAST_MESSAGES = {
  approved: "企業を承認しました。",
  returned: "企業を差し戻しました。",
  rejected: "企業を却下しました。",
  suspended: "企業を利用停止にしました。",
  reinstated: "企業の利用を再開しました。",
} as const;

export const ADMIN_COMPANY_DEMO_NOTE = "※ UIデモのため、実際のアカウント操作は行われません。";

// ============================================================
// Detail page section labels
// ============================================================

export const ADMIN_COMPANY_DETAIL_SECTIONS = {
  basicInfo: "企業基本情報",
  contactInfo: "担当者情報",
  profile: "企業プロフィール",
  documents: "提出書類",
  reviewHistory: "審査履歴",
  jobs: "公開求人・案件",
  members: "所属メンバー",
  internalNotes: "管理メモ",
  activity: "アクティビティ",
} as const;

export const ADMIN_COMPANY_NOT_FOUND = {
  title: "企業が見つかりませんでした。",
  description: "指定された企業IDは存在しないか、削除された可能性があります。",
  ctaLabel: "企業一覧に戻る",
  ctaHref: "/admin/companies",
} as const;

// ============================================================
// Mock data
// ============================================================

export interface AdminCompanyDocument {
  id: string;
  name: string;
  submitted: boolean;
}

export interface AdminCompanyReviewHistoryEntry {
  id: string;
  action: string;
  actor: string;
  reason: string | null;
  dateLabel: string;
}

export interface AdminCompanyJobSummary {
  id: string;
  title: string;
  status: string;
  applicantCount: number;
}

export interface AdminCompanyMember {
  id: string;
  name: string;
  role: string;
  email: string;
}

export interface AdminCompany {
  id: string;
  name: string;
  industry: string;
  companySize: string;
  representativeName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  address: string;
  description: string;
  jobCount: number;
  registeredDateLabel: string;
  registeredDateISO: string;
  reviewStatus: AdminCompanyReviewStatus;
  usageStatus: AdminCompanyUsageStatus;
  documents: AdminCompanyDocument[];
  reviewHistory: AdminCompanyReviewHistoryEntry[];
  jobs: AdminCompanyJobSummary[];
  members: AdminCompanyMember[];
  internalNotes: AdminNoteEntry[];
}

export const ADMIN_COMPANIES: AdminCompany[] = [
  {
    id: "c-101",
    name: "株式会社ネクストヴィジョン",
    industry: "IT・ソフトウェア",
    companySize: "51〜100名",
    representativeName: "代表取締役 前田 剛",
    contactName: "採用担当 中村",
    contactEmail: "recruit@nextvision.example.com",
    contactPhone: "03-2345-6789",
    website: "https://nextvision.example.com",
    address: "東京都港区",
    description: "業務システムの受託開発を中心とするITベンチャー。",
    jobCount: 0,
    registeredDateLabel: "2026年7月16日",
    registeredDateISO: "2026-07-16",
    reviewStatus: "審査中",
    usageStatus: "有効",
    documents: [
      { id: "doc-1", name: "登記簿謄本", submitted: true },
      { id: "doc-2", name: "会社概要資料", submitted: true },
      { id: "doc-3", name: "反社会的勢力排除に関する誓約書", submitted: false },
    ],
    reviewHistory: [
      { id: "rh-1", action: "登録申請", actor: "採用担当 中村", reason: null, dateLabel: "2026年7月16日 14:32" },
    ],
    jobs: [],
    members: [{ id: "mem-1", name: "中村 淳", role: "採用担当", email: "recruit@nextvision.example.com" }],
    internalNotes: [],
  },
  {
    id: "c-102",
    name: "合同会社ブルースパーク",
    industry: "受託開発",
    companySize: "〜50名",
    representativeName: "代表社員 小川 恵",
    contactName: "採用担当 小林",
    contactEmail: "recruit@bluespark.example.com",
    contactPhone: "03-3456-7890",
    website: "https://bluespark.example.com",
    address: "東京都新宿区",
    description: "スタートアップ向け受託開発を手がける合同会社。",
    jobCount: 0,
    registeredDateLabel: "2026年7月15日",
    registeredDateISO: "2026-07-15",
    reviewStatus: "審査中",
    usageStatus: "有効",
    documents: [
      { id: "doc-4", name: "登記簿謄本", submitted: true },
      { id: "doc-5", name: "会社概要資料", submitted: false },
    ],
    reviewHistory: [
      { id: "rh-2", action: "登録申請", actor: "採用担当 小林", reason: null, dateLabel: "2026年7月15日 13:20" },
    ],
    jobs: [],
    members: [{ id: "mem-2", name: "小林 由紀", role: "採用担当", email: "recruit@bluespark.example.com" }],
    internalNotes: [],
  },
  {
    id: "c-103",
    name: "株式会社フォレストテック",
    industry: "IT・ソフトウェア",
    companySize: "51〜100名",
    representativeName: "代表取締役 森田 洋",
    contactName: "採用担当 松本",
    contactEmail: "recruit@foresttech.example.com",
    contactPhone: "03-5678-9012",
    website: "https://foresttech.example.com",
    address: "東京都品川区",
    description: "自社サービスと受託開発の両輪で事業を展開するテック企業。",
    jobCount: 0,
    registeredDateLabel: "2026年7月14日",
    registeredDateISO: "2026-07-14",
    reviewStatus: "審査中",
    usageStatus: "有効",
    documents: [
      { id: "doc-6", name: "登記簿謄本", submitted: true },
      { id: "doc-7", name: "会社概要資料", submitted: true },
      { id: "doc-8", name: "反社会的勢力排除に関する誓約書", submitted: true },
    ],
    reviewHistory: [
      { id: "rh-3", action: "登録申請", actor: "採用担当 松本", reason: null, dateLabel: "2026年7月14日 19:05" },
      { id: "rh-4", action: "書類確認中", actor: "管理者 松本", reason: null, dateLabel: "2026年7月15日 10:00" },
    ],
    jobs: [],
    members: [{ id: "mem-3", name: "松本 圭吾", role: "採用担当", email: "recruit@foresttech.example.com" }],
    internalNotes: [
      { id: "note-1", author: "管理者 松本", body: "書類は揃っているため、最終確認のうえ承認予定。", dateLabel: "2026年7月15日" },
    ],
  },
  {
    id: "c-001",
    name: "株式会社テックイノベーション",
    industry: "SaaS",
    companySize: "101〜300名",
    representativeName: "代表取締役 木村 誠",
    contactName: "採用担当 佐藤",
    contactEmail: "recruit@tech-innovation.example.com",
    contactPhone: "03-1234-5678",
    website: "https://tech-innovation.example.com",
    address: "東京都渋谷区",
    description: "自社SaaSプロダクトを複数展開するテックカンパニー。",
    jobCount: 3,
    registeredDateLabel: "2024年10月2日",
    registeredDateISO: "2024-10-02",
    reviewStatus: "承認済み",
    usageStatus: "有効",
    documents: [
      { id: "doc-9", name: "登記簿謄本", submitted: true },
      { id: "doc-10", name: "会社概要資料", submitted: true },
      { id: "doc-11", name: "反社会的勢力排除に関する誓約書", submitted: true },
    ],
    reviewHistory: [
      { id: "rh-5", action: "登録申請", actor: "採用担当 佐藤", reason: null, dateLabel: "2024年10月2日" },
      { id: "rh-6", action: "承認", actor: "管理者 伊藤", reason: null, dateLabel: "2024年10月4日" },
    ],
    jobs: [
      { id: "3", title: "バックエンドエンジニア（Java / Spring Boot）", status: "公開中", applicantCount: 9 },
      { id: "10", title: "AIエンジニア（LLM／生成AI）", status: "公開中", applicantCount: 4 },
    ],
    members: [
      { id: "mem-4", name: "佐藤 一郎", role: "採用担当", email: "recruit@tech-innovation.example.com" },
      { id: "mem-5", name: "木村 誠", role: "代表取締役", email: "kimura@tech-innovation.example.com" },
    ],
    internalNotes: [],
  },
  {
    id: "c-002",
    name: "合同会社クラウドフォース",
    industry: "受託開発",
    companySize: "〜50名",
    representativeName: "代表社員 岡本 亮",
    contactName: "採用担当 岡本",
    contactEmail: "recruit@cloudforce.example.com",
    contactPhone: "03-6789-0123",
    website: "https://cloudforce.example.com",
    address: "東京都",
    description: "受託開発とプロダクト開発の両輪で事業を展開するITベンチャー。",
    jobCount: 1,
    registeredDateLabel: "2025年2月14日",
    registeredDateISO: "2025-02-14",
    reviewStatus: "承認済み",
    usageStatus: "有効",
    documents: [
      { id: "doc-12", name: "登記簿謄本", submitted: true },
      { id: "doc-13", name: "会社概要資料", submitted: true },
    ],
    reviewHistory: [
      { id: "rh-7", action: "登録申請", actor: "採用担当 岡本", reason: null, dateLabel: "2025年2月14日" },
      { id: "rh-8", action: "承認", actor: "管理者 伊藤", reason: null, dateLabel: "2026年7月16日 17:45" },
    ],
    jobs: [{ id: "1", title: "フロントエンドエンジニア（React / TypeScript）", status: "公開中", applicantCount: 6 }],
    members: [{ id: "mem-6", name: "岡本 亮", role: "採用担当", email: "recruit@cloudforce.example.com" }],
    internalNotes: [],
  },
  {
    id: "c-003",
    name: "株式会社ゼロトラスト",
    industry: "セキュリティ",
    companySize: "〜50名",
    representativeName: "代表取締役 石井 淳",
    contactName: "採用担当 石井",
    contactEmail: "recruit@zerotrust.example.com",
    contactPhone: "03-7890-1234",
    website: "https://zerotrust.example.com",
    address: "東京都",
    description: "認証・セキュリティ領域に特化したSaaSを開発するスタートアップ。",
    jobCount: 2,
    registeredDateLabel: "2025年5月20日",
    registeredDateISO: "2025-05-20",
    reviewStatus: "承認済み",
    usageStatus: "有効",
    documents: [
      { id: "doc-14", name: "登記簿謄本", submitted: true },
      { id: "doc-15", name: "会社概要資料", submitted: true },
      { id: "doc-16", name: "反社会的勢力排除に関する誓約書", submitted: true },
    ],
    reviewHistory: [
      { id: "rh-9", action: "登録申請", actor: "採用担当 石井", reason: null, dateLabel: "2025年5月20日" },
      { id: "rh-10", action: "承認", actor: "管理者 松本", reason: null, dateLabel: "2025年5月22日" },
    ],
    jobs: [{ id: "4", title: "バックエンドエンジニア（Go）", status: "公開中", applicantCount: 3 }],
    members: [{ id: "mem-7", name: "石井 淳", role: "採用担当", email: "recruit@zerotrust.example.com" }],
    internalNotes: [],
  },
  {
    id: "c-004",
    name: "株式会社デジタルブリッジ",
    industry: "受託開発",
    companySize: "51〜100名",
    representativeName: "代表取締役 長谷川 誠",
    contactName: "採用担当 伊藤",
    contactEmail: "recruit@digitalbridge.example.com",
    contactPhone: "03-4567-8901",
    website: "https://digital-bridge.example.com",
    address: "東京都千代田区",
    description: "Webシステムの受託開発を中心に、フロントエンドからインフラまで幅広く手がける開発会社。",
    jobCount: 1,
    registeredDateLabel: "2025年4月8日",
    registeredDateISO: "2025-04-08",
    reviewStatus: "承認済み",
    usageStatus: "利用停止中",
    documents: [
      { id: "doc-17", name: "登記簿謄本", submitted: true },
      { id: "doc-18", name: "会社概要資料", submitted: true },
    ],
    reviewHistory: [
      { id: "rh-11", action: "登録申請", actor: "採用担当 伊藤", reason: null, dateLabel: "2025年4月8日" },
      { id: "rh-12", action: "承認", actor: "管理者 佐々木", reason: null, dateLabel: "2025年4月10日" },
      {
        id: "rh-13",
        action: "利用停止",
        actor: "管理者 松本",
        reason: "スパムメッセージ送信の通報が複数件確認されたため。",
        dateLabel: "2026年7月15日 15:00",
      },
    ],
    jobs: [{ id: "6", title: "フルスタックエンジニア（TypeScript / AWS）", status: "非公開", applicantCount: 2 }],
    members: [{ id: "mem-8", name: "伊藤 沙耶", role: "採用担当", email: "recruit@digitalbridge.example.com" }],
    internalNotes: [
      {
        id: "note-2",
        author: "管理者 松本",
        body: "スパムメッセージの通報を受け、調査完了まで一時停止としています。",
        dateLabel: "2026年7月15日",
      },
    ],
  },
  {
    id: "c-005",
    name: "株式会社データフォレスト",
    industry: "SaaS",
    companySize: "51〜100名",
    representativeName: "代表取締役 山口 忍",
    contactName: "採用担当 山口",
    contactEmail: "recruit@data-forest.example.com",
    contactPhone: "03-8901-2345",
    website: "https://data-forest.example.com",
    address: "東京都千代田区",
    description: "小売・物流業界向けにデータ分析・機械学習ソリューションを提供する企業。",
    jobCount: 1,
    registeredDateLabel: "2025年9月3日",
    registeredDateISO: "2025-09-03",
    reviewStatus: "承認済み",
    usageStatus: "有効",
    documents: [
      { id: "doc-19", name: "登記簿謄本", submitted: true },
      { id: "doc-20", name: "会社概要資料", submitted: true },
    ],
    reviewHistory: [
      { id: "rh-14", action: "登録申請", actor: "採用担当 山口", reason: null, dateLabel: "2025年9月3日" },
      { id: "rh-15", action: "承認", actor: "管理者 伊藤", reason: null, dateLabel: "2025年9月5日" },
    ],
    jobs: [{ id: "9", title: "AIエンジニア（Python / 機械学習）", status: "公開中", applicantCount: 5 }],
    members: [{ id: "mem-9", name: "山口 忍", role: "採用担当", email: "recruit@data-forest.example.com" }],
    internalNotes: [],
  },
  {
    id: "c-006",
    name: "株式会社スケールワークス",
    industry: "コンサルティング",
    companySize: "〜50名",
    representativeName: "代表取締役 川口 学",
    contactName: "採用担当 川口",
    contactEmail: "recruit@scaleworks.example.com",
    contactPhone: "03-9012-3456",
    website: "https://scaleworks.example.com",
    address: "東京都",
    description: "急成長するSaaS企業向けにインフラの内製化・スケール支援を行うテックカンパニー。",
    jobCount: 1,
    registeredDateLabel: "2025年11月28日",
    registeredDateISO: "2025-11-28",
    reviewStatus: "差し戻し",
    usageStatus: "有効",
    documents: [
      { id: "doc-21", name: "登記簿謄本", submitted: true },
      { id: "doc-22", name: "会社概要資料", submitted: false },
    ],
    reviewHistory: [
      { id: "rh-16", action: "登録申請", actor: "採用担当 川口", reason: null, dateLabel: "2025年11月28日" },
      {
        id: "rh-17",
        action: "差し戻し",
        actor: "管理者 佐々木",
        reason: "会社概要資料が未提出のため、再提出をお願いします。",
        dateLabel: "2025年11月30日",
      },
    ],
    jobs: [{ id: "8", title: "クラウドエンジニア（GCP / Terraform）", status: "下書き", applicantCount: 0 }],
    members: [{ id: "mem-10", name: "川口 学", role: "採用担当", email: "recruit@scaleworks.example.com" }],
    internalNotes: [
      { id: "note-3", author: "管理者 佐々木", body: "会社概要資料の再提出待ち。1週間対応なければ再度連絡。", dateLabel: "2025年11月30日" },
    ],
  },
];
