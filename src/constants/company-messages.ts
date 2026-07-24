/**
 * Real Supabase-backed Company chat content (Japanese). See
 * src/lib/company/chat.ts (public.chat_rooms / public.messages,
 * 012_chat.sql, 036_chat_mvp_and_message_notifications.sql).
 *
 * Deliberately separate from src/constants/messages.ts / src/components/messages/*
 * (ConversationList, MessageThread, etc.): those are the older UI-only mock
 * versions, kept as-is. This file mirrors src/constants/engineer-messages.ts
 * for the company's viewer perspective.
 */

export const COMPANY_MESSAGES_PAGE = {
  title: "メッセージ",
  description: "応募者とのやり取りを確認できます。",
} as const;

export const COMPANY_CONVERSATION_SEARCH_LABELS = {
  placeholder: "エンジニア名・求人名で検索",
} as const;

export const COMPANY_CONVERSATION_LIST_META = {
  unreadSuffix: "件の未読",
  noResultsTitle: "会話が見つかりませんでした。",
  noResultsDescription: "検索キーワードを変更してお試しください。",
  noConversationsTitle: "まだ会話はありません。",
  noConversationsDescription: "応募者詳細ページからメッセージを送ると、ここに表示されます。",
} as const;

export const COMPANY_EMPTY_CONVERSATION_LABELS = {
  message: "会話を選択してください。",
} as const;

export const COMPANY_COMPOSER_LABELS = {
  placeholder: "メッセージを入力",
  sendLabel: "送信",
  sendError: "メッセージの送信に失敗しました。しばらくしてから再度お試しください。",
} as const;

export const COMPANY_MESSAGE_HEADER_LABELS = {
  backLabel: "会話一覧に戻る",
} as const;

export const COMPANY_CONVERSATION_NOT_FOUND_LABELS = {
  title: "この会話は表示できません。",
  description: "自社の求人・案件への応募に関する会話のみ表示できます。",
  ctaLabel: "応募者一覧に戻る",
  ctaHref: "/company/applicants",
} as const;

export const COMPANY_MESSAGES_SIGN_IN_REQUIRED_LABELS = {
  title: "ログインが必要です。",
  description: "メッセージの確認にはログインが必要です。",
  ctaLabel: "ログイン",
  ctaHref: "/login",
} as const;
