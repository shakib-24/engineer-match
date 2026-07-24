/**
 * Engineer Review / Rating System content (Japanese). Real Supabase-backed
 * (public.engineer_reviews, 050_engineer_reviews.sql). Shared between the
 * Company review-creation UI (Applicant Detail), the Engineer-side reviews
 * section (own profile, reply + global visibility toggle), and the
 * read-only display on Company Engineer Detail / Search.
 */

export const REVIEW_SECTION_LABELS = {
  title: "評価・レビュー",
  description: "企業からの評価とコメントを確認できます。",
} as const;

export const REVIEW_VISIBILITY_LABELS = {
  toggleLabel: "評価をプロフィールに表示する",
  toggleDescription: "オフにすると、すべての評価・平均点・件数が非公開になります。個別の評価だけを非表示にすることはできません。",
  hiddenNotice: "評価は現在非公開です。",
  saveError: "設定の保存に失敗しました。",
} as const;

export const REVIEW_EMPTY_STATE_LABELS = {
  noReviews: "まだ評価はありません。",
} as const;

export const REVIEW_COUNT_SUFFIX = "件の評価";

export const COMPANY_REVIEW_ACTION_LABELS = {
  createButtonLabel: "このエンジニアを評価する",
  editButtonLabel: "編集する",
  ratingLabel: "評価",
  commentLabel: "コメント",
  commentPlaceholder: "エンジニアへの評価コメントを入力してください。",
  submitLabel: "評価を投稿する",
  updateLabel: "評価を更新する",
  cancelLabel: "キャンセル",
  submitting: "送信中…",
  submitSuccess: "評価を投稿しました。",
  updateSuccess: "評価を更新しました。",
  submitError: "評価の投稿に失敗しました。しばらくしてから再度お試しください。",
  validationRatingRequired: "評価（★）を選択してください。",
  validationCommentRequired: "コメントを入力してください。",
} as const;

export const ENGINEER_REPLY_LABELS = {
  companyCommentLabel: "企業コメント",
  replyLabel: "エンジニアからの返信",
  replyPlaceholder: "コメントへの返信を入力してください。",
  replyButtonLabel: "返信する",
  editReplyButtonLabel: "編集する",
  submitLabel: "返信を保存する",
  cancelLabel: "キャンセル",
  submitting: "送信中…",
  submitError: "返信の保存に失敗しました。しばらくしてから再度お試しください。",
  validationRequired: "返信内容を入力してください。",
  noReplyYet: "まだ返信はありません。",
} as const;
