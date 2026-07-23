/**
 * Engineer Profile module content (Japanese).
 * Real Supabase-backed data (see src/lib/engineer/profile.ts,
 * src/lib/engineer/skills.ts, src/lib/engineer/qualifications.ts) against
 * public.users + engineer_profiles + user_skills/skills +
 * user_qualifications/qualifications. Human/Business skill labels remain
 * separate (src/constants/skill-assessment.ts) -- untouched here.
 *
 * Fields with no DB backing in the original UI-only mock (job title,
 * availability status text, birth date, gender, phone, nearest station,
 * GitHub URL, work history, education, multi-project portfolio, languages,
 * and the free-text preferred-conditions fields beyond prefecture/work
 * style/desired rate) have been dropped rather than fabricated.
 */

// ============================================================
// Profile header
// ============================================================

export const PROFILE_HEADER_META = {
  editLabel: "プロフィールを編集",
  editHref: "/engineer/profile/edit",
  previewLabel: "公開プロフィールを確認",
  previewDemoMessage: "この機能はデモ版のため準備中です（公開プレビューは今後実装予定）。",
} as const;

export const VISIBILITY_STATUS_LABEL = {
  public: "公開",
  private: "非公開",
} as const;

// ============================================================
// Profile completion
// ============================================================

export const PROFILE_COMPLETION_META = {
  title: "プロフィール充実度",
  description: "プロフィールを充実させると、企業からのスカウト率が上がります。",
  ctaLabel: "プロフィールを編集",
  ctaHref: "/engineer/profile/edit",
} as const;

// ============================================================
// Basic information
// ============================================================

export const BASIC_INFO_SECTION = {
  title: "基本情報",
} as const;

export const BASIC_INFO_LABELS = {
  bio: "自己紹介",
  bioEmpty: "自己紹介文が未登録です。",
  email: "メールアドレス",
  prefecture: "居住地",
  yearsOfExperience: "経験年数",
  workStyle: "希望の働き方",
  desiredRate: "希望単価（月額）",
  portfolioUrl: "Portfolio URL",
  unset: "未設定",
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

export const TECHNICAL_SKILLS_EMPTY_MESSAGE = "テクニカルスキルが未登録です。";

/**
 * ヒューマンスキル (コミュニケーション能力 / ヒアリング力 / プレゼンテーション力) is
 * real Supabase data (see src/lib/engineer/skill-assessments.ts,
 * public.skill_assessments + skill_assessment_attempts,
 * 030_skill_assessments.sql).
 */
export const HUMAN_SKILL_EDIT_NOTE = {
  description:
    "ヒューマンスキルは診断結果に基づいて表示されます。プロフィール画面から各診断を実施・再診断してください。",
  ctaLabel: "プロフィールで診断する",
  ctaHref: "/engineer/profile",
} as const;

/**
 * ビジネススキル (課題解決力 / 論理的思考力 / タスク管理力 / 主体性 /
 * チームワーク力 / 調整・交渉力) is real Supabase data (see
 * src/lib/engineer/skill-assessments.ts, public.skill_assessments +
 * skill_assessment_attempts, 031_business_skill_assessments.sql).
 */
export const BUSINESS_SKILL_EDIT_NOTE = {
  description:
    "ビジネススキルは診断結果に基づいて表示されます。プロフィール画面から各診断を実施・再診断してください。",
  ctaLabel: "プロフィールで診断する",
  ctaHref: "/engineer/profile",
} as const;

export const TECHNICAL_SKILL_EDITOR_LABELS = {
  skillLabel: "スキル",
  levelLabel: "ITSSレベル",
  addLabel: "テクニカルスキルを追加",
  removeLabel: "このスキルを削除",
  emptyCatalogMessage: "追加可能なスキルがありません。",
  emptyMessage: "テクニカルスキルが未登録です。",
  addError: "スキルの追加に失敗しました。しばらくしてから再度お試しください。",
  updateError: "スキルの更新に失敗しました。しばらくしてから再度お試しください。",
  removeError: "スキルの削除に失敗しました。しばらくしてから再度お試しください。",
} as const;

// ============================================================
// Qualifications
// ============================================================

export const QUALIFICATIONS_SECTION = {
  title: "資格",
} as const;

export const QUALIFICATION_EDITOR_LABELS = {
  qualificationLabel: "資格",
  yearLabel: "取得年",
  yearPlaceholder: "2022",
  addLabel: "資格を追加",
  removeLabel: "この資格を削除",
  emptyCatalogMessage: "追加可能な資格がありません。",
  emptyMessage: "資格情報が未登録です。",
  addError: "資格の追加に失敗しました。しばらくしてから再度お試しください。",
  updateError: "資格の更新に失敗しました。しばらくしてから再度お試しください。",
  removeError: "資格の削除に失敗しました。しばらくしてから再度お試しください。",
  invalidYear: "取得年は1950〜2100の範囲で入力してください。",
} as const;

// ============================================================
// Profile visibility
// ============================================================

export const PROFILE_VISIBILITY_SECTION = {
  title: "公開設定",
  description: "企業からの検索結果およびスカウトの対象として表示されます。",
} as const;

// ============================================================
// Edit form
// ============================================================

export const PROFILE_EDIT_META = {
  pageTitle: "プロフィール編集",
  backLabel: "プロフィールに戻る",
  cancelLabel: "キャンセル",
  cancelHref: "/engineer/profile",
} as const;

export const PROFILE_EDIT_SECTIONS = {
  basicInfo: "基本情報",
  skills: "スキル",
  qualifications: "資格",
  visibility: "公開設定",
} as const;

export const BASIC_INFO_FORM_FIELDS = {
  name: { label: "氏名", placeholder: "山田 太郎" },
  prefecture: { label: "居住地", placeholder: "東京都" },
  yearsOfExperience: { label: "経験年数（年）", placeholder: "6" },
  workStyle: { label: "希望の働き方" },
  desiredRateMin: { label: "希望単価（下限・万円/月）", placeholder: "60" },
  desiredRateMax: { label: "希望単価（上限・万円/月）", placeholder: "90" },
  portfolioUrl: { label: "Portfolio URL", placeholder: "https://example.com" },
  selfPr: { label: "自己紹介" },
} as const;

/** engineer_profiles.work_style, per chk_engineer_profiles_work_style (004_profile_tables.sql). */
export const WORK_STYLE_OPTIONS = [
  { value: "REMOTE", label: "フルリモート" },
  { value: "ONSITE", label: "出社" },
  { value: "HYBRID", label: "一部リモート" },
] as const;

export const VISIBILITY_OPTIONS = [
  { value: true, label: "公開" },
  { value: false, label: "非公開" },
] as const;

export const VISIBILITY_FORM_LABEL = "プロフィールの公開状態";

export const BASIC_INFO_FORM_META = {
  saveLabel: "保存する",
  savingLabel: "保存中…",
  savedMessage: "プロフィールを更新しました。",
  saveFailedMessage: "プロフィールの保存に失敗しました。しばらくしてから再度お試しください。",
  invalidYearsOfExperience: "経験年数は0〜50の範囲で入力してください。",
  invalidRate: "希望単価は1〜999の範囲で入力してください。",
  invalidRateOrder: "希望単価は下限が上限以下になるように入力してください。",
  invalidSelfPr: "自己紹介は2000文字以内で入力してください。",
  nameRequired: "氏名を入力してください。",
} as const;
