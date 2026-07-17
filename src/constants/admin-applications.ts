/**
 * Admin Applications management module placeholder content (Japanese).
 * UI only — no backend, no database. Admin can view/annotate application
 * records but must never impersonate the company or applicant.
 */

import type { AdminNoteEntry } from "@/components/admin/shared/AdminInternalNote";

export const ADMIN_APPLICATIONS_PAGE = {
  title: "応募管理",
  description: "プラットフォーム全体の応募状況を確認できます。",
} as const;

// ============================================================
// Enums / types
// ============================================================

export const ADMIN_APPLICATION_STATUSES = [
  "選考中",
  "面接予定",
  "内定",
  "不採用",
  "辞退",
] as const;
export type AdminApplicationStatus = (typeof ADMIN_APPLICATION_STATUSES)[number];

export const ADMIN_APPLICATION_STATUS_TONE: Record<
  AdminApplicationStatus,
  "positive" | "negative" | "warning" | "neutral" | "info"
> = {
  選考中: "info",
  面接予定: "warning",
  内定: "positive",
  不採用: "negative",
  辞退: "neutral",
};

// ============================================================
// Summary cards
// ============================================================

export const ADMIN_APPLICATION_SUMMARY_LABELS = {
  total: "全応募",
  underReview: "選考中",
  interview: "面接予定",
  offer: "内定",
  rejected: "不採用",
  withdrawn: "辞退",
} as const;

// ============================================================
// Search / filters
// ============================================================

export const ADMIN_APPLICATION_SEARCH_LABELS = {
  label: "応募を検索",
  placeholder: "応募者名・企業名・求人・案件名・応募IDで検索",
} as const;

export const ADMIN_APPLICATION_FILTER_LABELS = {
  title: "絞り込み条件",
  status: "応募状態",
  serviceCategory: "サービス区分",
  appliedWithin: "応募日",
  company: "企業",
  problemReported: "問題報告の有無",
  resetLabel: "条件をリセット",
} as const;

export const ADMIN_APPLICATION_PROBLEM_OPTIONS = ["あり", "なし"] as const;

export const ADMIN_APPLICATION_DATE_RANGE_OPTIONS = [
  { label: "指定なし", days: null },
  { label: "7日以内", days: 7 },
  { label: "30日以内", days: 30 },
  { label: "90日以内", days: 90 },
] as const;

export interface AdminApplicationFilterState {
  statuses: AdminApplicationStatus[];
  serviceCategories: string[];
  companies: string[];
  problemReported: (typeof ADMIN_APPLICATION_PROBLEM_OPTIONS)[number][];
  appliedWithinDays: number | null;
}

export const DEFAULT_ADMIN_APPLICATION_FILTER_STATE: AdminApplicationFilterState = {
  statuses: [],
  serviceCategories: [],
  companies: [],
  problemReported: [],
  appliedWithinDays: null,
};

// ============================================================
// Table / actions
// ============================================================

export const ADMIN_APPLICATION_TABLE_COLUMNS = [
  "応募者",
  "求人・案件",
  "企業",
  "応募日",
  "現在の状態",
  "最終更新",
  "操作",
] as const;

export const ADMIN_APPLICATION_ACTION_LABELS = {
  viewDetails: "詳細を見る",
  markHandled: "対応済みにする",
  markUnhandled: "未対応に戻す",
} as const;

export const ADMIN_APPLICATION_RESULTS_META = {
  resultsSuffix: "件の応募",
} as const;

export const ADMIN_APPLICATION_TOAST_MESSAGES = {
  handled: "対応済みにしました。",
  unhandled: "未対応に戻しました。",
  noteAdded: "運営メモを追加しました。",
} as const;

export const ADMIN_APPLICATION_DEMO_NOTE =
  "※ UIデモのため、実際のステータス変更や通知は行われません。管理者は企業・応募者になりすまして操作することはできません。";

// ============================================================
// Detail page section labels
// ============================================================

export const ADMIN_APPLICATION_DETAIL_SECTIONS = {
  applicantInfo: "応募者情報",
  opportunityInfo: "求人・案件情報",
  timeline: "選考タイムライン",
  messages: "メッセージ概要",
  interview: "面接情報",
  evaluation: "評価",
  attachments: "添付書類",
  problemReport: "問題報告",
  internalNotes: "管理メモ",
} as const;

export const ADMIN_APPLICATION_NOT_FOUND = {
  title: "応募情報が見つかりませんでした。",
  description: "指定された応募IDは存在しないか、削除された可能性があります。",
  ctaLabel: "応募一覧に戻る",
  ctaHref: "/admin/applications",
} as const;

// ============================================================
// Mock data
// ============================================================

export interface AdminApplicationTimelineEntry {
  label: string;
  dateLabel: string;
  completed: boolean;
}

export interface AdminApplication {
  id: string;
  applicantName: string;
  applicantId: string | null;
  jobTitle: string;
  opportunityId: string | null;
  company: string;
  companyId: string | null;
  serviceCategory: string;
  appliedDateLabel: string;
  appliedDateISO: string;
  status: AdminApplicationStatus;
  lastUpdatedLabel: string;
  timeline: AdminApplicationTimelineEntry[];
  messageSummary: string;
  interviewInfo: string | null;
  evaluationSummary: string | null;
  attachments: string[];
  hasProblemReport: boolean;
  problemReportSummary: string | null;
  internalNotes: AdminNoteEntry[];
  handled: boolean;
}

const TIMELINE_STEPS = ["応募", "書類選考", "一次面接", "最終面接", "内定"] as const;

function buildTimeline(completedSteps: number): AdminApplicationTimelineEntry[] {
  return TIMELINE_STEPS.map((label, index) => ({
    label,
    dateLabel: index < completedSteps ? "完了" : "未対応",
    completed: index < completedSteps,
  }));
}

export const ADMIN_APPLICATIONS: AdminApplication[] = [
  {
    id: "app-001",
    applicantName: "山田 太郎",
    applicantId: "u-001",
    jobTitle: "バックエンドエンジニア（Java / Spring Boot）",
    opportunityId: "3",
    company: "株式会社テックイノベーション",
    companyId: "c-001",
    serviceCategory: "就職",
    appliedDateLabel: "2026年7月10日",
    appliedDateISO: "2026-07-10",
    status: "選考中",
    lastUpdatedLabel: "2026年7月14日",
    timeline: buildTimeline(2),
    messageSummary: "面接の日程についてご案内します。",
    interviewInfo: null,
    evaluationSummary: null,
    attachments: ["職務経歴書.pdf", "ポートフォリオURL"],
    hasProblemReport: false,
    problemReportSummary: null,
    internalNotes: [],
    handled: false,
  },
  {
    id: "app-002",
    applicantName: "佐藤 健太",
    applicantId: "u-002",
    jobTitle: "AIエンジニア（Python / 機械学習）",
    opportunityId: "9",
    company: "株式会社データフォレスト",
    companyId: "c-005",
    serviceCategory: "就職",
    appliedDateLabel: "2026年7月14日",
    appliedDateISO: "2026-07-14",
    status: "選考中",
    lastUpdatedLabel: "2026年7月14日",
    timeline: buildTimeline(1),
    messageSummary: "応募を受け付けました。",
    interviewInfo: null,
    evaluationSummary: null,
    attachments: ["職務経歴書.pdf"],
    hasProblemReport: false,
    problemReportSummary: null,
    internalNotes: [],
    handled: false,
  },
  {
    id: "app-003",
    applicantName: "高橋 大輔",
    applicantId: "u-004",
    jobTitle: "インフラエンジニア（AWS / Kubernetes）",
    opportunityId: null,
    company: "株式会社ネクストシステムズ",
    companyId: null,
    serviceCategory: "就職",
    appliedDateLabel: "2026年6月28日",
    appliedDateISO: "2026-06-28",
    status: "内定",
    lastUpdatedLabel: "2026年7月15日",
    timeline: buildTimeline(5),
    messageSummary: "内定通知書を送付いたしました。ご確認ください。",
    interviewInfo: "2026年7月8日 最終面接実施済み",
    evaluationSummary: "技術力・コミュニケーションともに高評価。即戦力として期待。",
    attachments: ["職務経歴書.pdf", "内定通知書.pdf"],
    hasProblemReport: false,
    problemReportSummary: null,
    internalNotes: [],
    handled: true,
  },
  {
    id: "app-004",
    applicantName: "鈴木 美咲",
    applicantId: "u-003",
    jobTitle: "フロントエンドエンジニア（React / TypeScript）",
    opportunityId: "1",
    company: "合同会社クラウドフォース",
    companyId: "c-002",
    serviceCategory: "案件",
    appliedDateLabel: "2026年6月15日",
    appliedDateISO: "2026-06-15",
    status: "不採用",
    lastUpdatedLabel: "2026年6月25日",
    timeline: buildTimeline(2),
    messageSummary: "選考結果についてご連絡します。",
    interviewInfo: "2026年6月20日 一次面接実施済み",
    evaluationSummary: "スキルセットが求める要件と一部合致せず。",
    attachments: ["職務経歴書.pdf"],
    hasProblemReport: true,
    problemReportSummary: "選考結果通知が遅延しているとの問い合わせあり。",
    internalNotes: [
      {
        id: "note-1",
        author: "管理者 伊藤",
        body: "企業への選考結果通知が遅れていたため、企業担当者にリマインドを送付済み。",
        dateLabel: "2026年6月24日",
      },
    ],
    handled: false,
  },
  {
    id: "app-005",
    applicantName: "渡辺 隆",
    applicantId: "u-006",
    jobTitle: "DevOpsエンジニア（Kubernetes / CI-CD）",
    opportunityId: "11",
    company: "株式会社パイプラインワークス",
    companyId: null,
    serviceCategory: "案件",
    appliedDateLabel: "2026年7月15日",
    appliedDateISO: "2026-07-15",
    status: "面接予定",
    lastUpdatedLabel: "2026年7月16日",
    timeline: buildTimeline(2),
    messageSummary: "一次面接の日程についてご案内します。",
    interviewInfo: "2026年7月22日 15:00〜 一次面接（オンライン）予定",
    evaluationSummary: null,
    attachments: ["職務経歴書.pdf"],
    hasProblemReport: false,
    problemReportSummary: null,
    internalNotes: [],
    handled: false,
  },
  {
    id: "app-006",
    applicantName: "田中 慎一",
    applicantId: "u-007",
    jobTitle: "セキュリティエンジニア（SOC運用）",
    opportunityId: "j-203",
    company: "株式会社ゼロトラスト",
    companyId: "c-003",
    serviceCategory: "案件",
    appliedDateLabel: "2026年7月16日",
    appliedDateISO: "2026-07-16",
    status: "選考中",
    lastUpdatedLabel: "2026年7月16日",
    timeline: buildTimeline(1),
    messageSummary: "貴殿の経験がまさに弊社の求める人物像です。",
    interviewInfo: null,
    evaluationSummary: null,
    attachments: ["職務経歴書.pdf"],
    hasProblemReport: false,
    problemReportSummary: null,
    internalNotes: [],
    handled: false,
  },
  {
    id: "app-007",
    applicantName: "小林 直樹",
    applicantId: "u-008",
    jobTitle: "フルスタックエンジニア（Ruby on Rails）",
    opportunityId: "15",
    company: "株式会社グロースパートナーズ",
    companyId: null,
    serviceCategory: "就職",
    appliedDateLabel: "2026年7月11日",
    appliedDateISO: "2026-07-11",
    status: "辞退",
    lastUpdatedLabel: "2026年7月13日",
    timeline: buildTimeline(1),
    messageSummary: "この度は一身上の都合により、選考を辞退させていただきます。",
    interviewInfo: null,
    evaluationSummary: null,
    attachments: [],
    hasProblemReport: false,
    problemReportSummary: null,
    internalNotes: [],
    handled: true,
  },
  {
    id: "app-008",
    applicantName: "中村 拓也",
    applicantId: "u-005",
    jobTitle: "クラウドインフラ入門研修（AWS基礎）",
    opportunityId: "tr-002",
    company: "株式会社インフラネクスト",
    companyId: null,
    serviceCategory: "研修",
    appliedDateLabel: "2026年7月17日",
    appliedDateISO: "2026-07-17",
    status: "選考中",
    lastUpdatedLabel: "2026年7月17日",
    timeline: buildTimeline(1),
    messageSummary: "研修プログラムへのお申し込みありがとうございます。",
    interviewInfo: null,
    evaluationSummary: null,
    attachments: [],
    hasProblemReport: false,
    problemReportSummary: null,
    internalNotes: [],
    handled: false,
  },
];
