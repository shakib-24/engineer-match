/**
 * Real Supabase-backed Engineer chat content (Japanese). See
 * src/lib/engineer/chat.ts (public.chat_rooms / public.messages,
 * 012_chat.sql, 036_chat_mvp_and_message_notifications.sql).
 *
 * Deliberately separate from src/constants/messages.ts / src/components/messages/*:
 * those are still shared with the (out-of-scope this phase) Company messages
 * mock page (src/app/company/messages/**), so they are left untouched rather
 * than being converted in a way that would break Company's still-mock UI.
 *
 * Dropped vs. the old mock: conversation "status" (スカウト/面接調整中/etc, no
 * such column), message "kind" (system/interview/scout, no such column),
 * attachments (no attachment schema), typing indicator and canned auto-replies
 * (both fake). Only plain text messages with a real sender/timestamp exist.
 */

export const ENGINEER_MESSAGES_PAGE = {
  title: "メッセージ",
  description: "応募先の企業とのやり取りを確認できます。",
} as const;

export const ENGINEER_CONVERSATION_SEARCH_LABELS = {
  placeholder: "会社名・求人名で検索",
} as const;

export const ENGINEER_CONVERSATION_LIST_META = {
  unreadSuffix: "件の未読",
  noResultsTitle: "会話が見つかりませんでした。",
  noResultsDescription: "検索キーワードを変更してお試しください。",
  noConversationsTitle: "まだ会話はありません。",
  noConversationsDescription: "応募詳細ページから企業にメッセージを送ると、ここに表示されます。",
} as const;

export const ENGINEER_EMPTY_CONVERSATION_LABELS = {
  message: "会話を選択してください。",
} as const;

export const ENGINEER_COMPOSER_LABELS = {
  placeholder: "メッセージを入力",
  sendLabel: "送信",
  sendError: "メッセージの送信に失敗しました。しばらくしてから再度お試しください。",
} as const;

export const ENGINEER_MESSAGE_HEADER_LABELS = {
  backLabel: "会話一覧に戻る",
} as const;

export const ENGINEER_CONVERSATION_NOT_FOUND_LABELS = {
  title: "この会話は表示できません。",
  description: "自分の応募に関する会話のみ表示できます。",
  ctaLabel: "応募一覧に戻る",
  ctaHref: "/engineer/applications",
} as const;

export const ENGINEER_MESSAGES_SIGN_IN_REQUIRED_LABELS = {
  title: "ログインが必要です。",
  description: "メッセージの確認にはログインが必要です。",
  ctaLabel: "ログイン",
  ctaHref: "/login",
} as const;
