/**
 * Chat / messaging module placeholder content (Japanese).
 * UI only — no backend, no real data, no realtime, no authentication.
 *
 * Viewer perspective: the logged-in engineer (USER_MENU.engineer). Each
 * conversation's "participant" is the company-side recruiter/contact.
 */

// ============================================================
// Page meta
// ============================================================

export const MESSAGES_PAGE = {
  title: "メッセージ",
  description: "企業とのやり取りを確認できます。",
} as const;

/** Company-side viewer perspective (same shared conversation data). */
export const MESSAGES_PAGE_COMPANY = {
  title: "メッセージ",
  description: "エンジニアとのやり取りを確認できます。",
} as const;

export const CONVERSATION_SEARCH_LABELS = {
  label: "会話を検索",
  placeholder: "会話を検索",
} as const;

export const CONVERSATION_LIST_META = {
  unreadSuffix: "件の未読",
  noResultsTitle: "会話が見つかりませんでした。",
  noResultsDescription: "検索キーワードを変更してお試しください。",
} as const;

export const EMPTY_CONVERSATION_LABELS = {
  message: "会話を選択してください。",
} as const;

export const COMPOSER_LABELS = {
  placeholder: "メッセージを入力",
  sendLabel: "送信",
  attachLabel: "添付",
  emojiLabel: "絵文字",
  demoNote: "※ 現在はUIデモのため、送信内容は保存されません。",
} as const;

export const TYPING_INDICATOR_LABEL = "入力中" as const;

export const MESSAGE_HEADER_LABELS = {
  backLabel: "会話一覧に戻る",
} as const;

// ============================================================
// Conversation status
// ============================================================

export const CONVERSATION_STATUSES = [
  "スカウト",
  "面接調整中",
  "内定",
  "不採用",
  "一般",
] as const;
export type ConversationStatus = (typeof CONVERSATION_STATUSES)[number];

export const CONVERSATION_STATUS_BADGE_STYLES: Record<ConversationStatus, string> = {
  スカウト: "bg-indigo-50 text-indigo-700",
  面接調整中: "bg-amber-50 text-amber-700",
  内定: "bg-green-50 text-green-700",
  不採用: "bg-red-50 text-red-700",
  一般: "bg-gray-100 text-gray-600",
};

// ============================================================
// Messages
// ============================================================

export type MessageSenderRole = "engineer" | "company" | "system";
export type MessageKind = "text" | "system" | "interview" | "scout";

export interface MessageAttachment {
  name: string;
  fileType: string;
  size: string;
}

export interface Message {
  id: string;
  senderRole: MessageSenderRole;
  senderName: string;
  content: string;
  timeLabel: string;
  dateLabel: string;
  dateISO: string;
  kind: MessageKind;
  attachment?: MessageAttachment;
}

export interface Conversation {
  id: string;
  participantName: string;
  participantRole: string;
  participantCompany: string;
  avatarInitials: string;
  jobTitle: string;
  status: ConversationStatus;
  lastMessage: string;
  lastUpdatedLabel: string;
  lastUpdatedISO: string;
  unreadCount: number;
  messages: Message[];
}

/** Canned reply lines used by the composer's mock typing-indicator demo. */
export const MOCK_AUTO_REPLIES = [
  "ご連絡ありがとうございます。担当者に確認の上、改めてご連絡いたします。",
  "承知いたしました。ご返信ありがとうございます。",
  "確認いたしました。追ってご連絡差し上げます。",
] as const;

export const CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    participantName: "佐藤 洋子",
    participantRole: "採用担当",
    participantCompany: "株式会社テックイノベーション",
    avatarInitials: "テ",
    jobTitle: "バックエンドエンジニア（Java / Spring Boot）",
    status: "スカウト",
    lastMessage: "ぜひ一度カジュアルにお話しさせていただけますと幸いです。",
    lastUpdatedLabel: "14:32",
    lastUpdatedISO: "2026-07-16T14:32:00",
    unreadCount: 2,
    messages: [
      {
        id: "1-1",
        senderRole: "system",
        senderName: "システム",
        content: "株式会社テックイノベーションからスカウトが届きました。",
        timeLabel: "10:00",
        dateLabel: "2026年7月14日",
        dateISO: "2026-07-14",
        kind: "system",
      },
      {
        id: "1-2",
        senderRole: "company",
        senderName: "佐藤 洋子",
        content:
          "はじめまして。株式会社テックイノベーション採用担当の佐藤と申します。貴殿のご経験を拝見し、バックエンドエンジニアのポジションにぴったりだと感じ、ご連絡差し上げました。",
        timeLabel: "10:02",
        dateLabel: "2026年7月14日",
        dateISO: "2026-07-14",
        kind: "scout",
      },
      {
        id: "1-3",
        senderRole: "engineer",
        senderName: "山田 太郎",
        content: "ご連絡ありがとうございます。詳細を伺えますでしょうか。",
        timeLabel: "18:20",
        dateLabel: "2026年7月14日",
        dateISO: "2026-07-14",
        kind: "text",
      },
      {
        id: "1-4",
        senderRole: "company",
        senderName: "佐藤 洋子",
        content: "ぜひ一度カジュアルにお話しさせていただけますと幸いです。",
        timeLabel: "14:32",
        dateLabel: "2026年7月16日",
        dateISO: "2026-07-16",
        kind: "text",
      },
    ],
  },
  {
    id: "2",
    participantName: "中島 健",
    participantRole: "エンジニアリングマネージャー",
    participantCompany: "合同会社クラウドフォース",
    avatarInitials: "ク",
    jobTitle: "フロントエンドエンジニア（React / TypeScript）",
    status: "面接調整中",
    lastMessage: "一次面接の日程についてご案内します。",
    lastUpdatedLabel: "11:15",
    lastUpdatedISO: "2026-07-16T11:15:00",
    unreadCount: 1,
    messages: [
      {
        id: "2-1",
        senderRole: "system",
        senderName: "システム",
        content: "書類選考を通過しました。",
        timeLabel: "9:00",
        dateLabel: "2026年7月10日",
        dateISO: "2026-07-10",
        kind: "system",
      },
      {
        id: "2-2",
        senderRole: "company",
        senderName: "中島 健",
        content: "書類選考を通過されましたので、一次面接の日程を調整させてください。",
        timeLabel: "9:05",
        dateLabel: "2026年7月10日",
        dateISO: "2026-07-10",
        kind: "text",
      },
      {
        id: "2-3",
        senderRole: "engineer",
        senderName: "山田 太郎",
        content: "承知いたしました。来週であれば火曜・木曜の午後が空いております。",
        timeLabel: "20:10",
        dateLabel: "2026年7月10日",
        dateISO: "2026-07-10",
        kind: "text",
      },
      {
        id: "2-4",
        senderRole: "company",
        senderName: "中島 健",
        content: "一次面接の日程についてご案内します。",
        timeLabel: "11:00",
        dateLabel: "2026年7月16日",
        dateISO: "2026-07-16",
        kind: "text",
      },
      {
        id: "2-5",
        senderRole: "company",
        senderName: "中島 健",
        content: "7月22日（水）15:00〜16:00 オンライン面談（Google Meet）",
        timeLabel: "11:15",
        dateLabel: "2026年7月16日",
        dateISO: "2026-07-16",
        kind: "interview",
      },
    ],
  },
  {
    id: "3",
    participantName: "渡辺 亮",
    participantRole: "人事部長",
    participantCompany: "株式会社ネクストシステムズ",
    avatarInitials: "ネ",
    jobTitle: "インフラエンジニア（AWS / Kubernetes）",
    status: "内定",
    lastMessage: "内定通知書を送付いたしました。ご確認ください。",
    lastUpdatedLabel: "16:45",
    lastUpdatedISO: "2026-07-15T16:45:00",
    unreadCount: 3,
    messages: [
      {
        id: "3-1",
        senderRole: "company",
        senderName: "渡辺 亮",
        content: "最終面接お疲れ様でした。良い結果をお伝えできると思います。",
        timeLabel: "17:00",
        dateLabel: "2026年7月12日",
        dateISO: "2026-07-12",
        kind: "text",
      },
      {
        id: "3-2",
        senderRole: "system",
        senderName: "システム",
        content: "内定通知が届きました。",
        timeLabel: "16:40",
        dateLabel: "2026年7月15日",
        dateISO: "2026-07-15",
        kind: "system",
      },
      {
        id: "3-3",
        senderRole: "company",
        senderName: "渡辺 亮",
        content:
          "この度は選考にご参加いただき誠にありがとうございました。厳正なる選考の結果、内定とさせていただきたくご連絡いたしました。",
        timeLabel: "16:42",
        dateLabel: "2026年7月15日",
        dateISO: "2026-07-15",
        kind: "text",
      },
      {
        id: "3-4",
        senderRole: "company",
        senderName: "渡辺 亮",
        content: "内定通知書を送付いたしました。ご確認ください。",
        timeLabel: "16:45",
        dateLabel: "2026年7月15日",
        dateISO: "2026-07-15",
        kind: "text",
        attachment: { name: "内定通知書.pdf", fileType: "pdf", size: "312KB" },
      },
    ],
  },
  {
    id: "4",
    participantName: "小林 沙耶",
    participantRole: "採用担当",
    participantCompany: "株式会社クオリティファースト",
    avatarInitials: "ク",
    jobTitle: "QAエンジニア（自動化テスト）",
    status: "不採用",
    lastMessage: "今回はご期待に沿えない結果となりました。",
    lastUpdatedLabel: "13:20",
    lastUpdatedISO: "2026-07-09T13:20:00",
    unreadCount: 0,
    messages: [
      {
        id: "4-1",
        senderRole: "engineer",
        senderName: "山田 太郎",
        content: "ご選考の結果はいかがでしょうか。",
        timeLabel: "9:30",
        dateLabel: "2026年7月9日",
        dateISO: "2026-07-09",
        kind: "text",
      },
      {
        id: "4-2",
        senderRole: "system",
        senderName: "システム",
        content: "選考結果：不採用",
        timeLabel: "13:15",
        dateLabel: "2026年7月9日",
        dateISO: "2026-07-09",
        kind: "system",
      },
      {
        id: "4-3",
        senderRole: "company",
        senderName: "小林 沙耶",
        content:
          "この度はご応募いただき誠にありがとうございました。慎重に選考させていただきましたが、今回はご期待に沿えない結果となりました。",
        timeLabel: "13:20",
        dateLabel: "2026年7月9日",
        dateISO: "2026-07-09",
        kind: "text",
      },
    ],
  },
  {
    id: "5",
    participantName: "森田 亜由美",
    participantRole: "サポート担当",
    participantCompany: "ENGINEER MATCH 事務局",
    avatarInitials: "事",
    jobTitle: "—",
    status: "一般",
    lastMessage: "ご不明点がございましたらお気軽にお問い合わせください。",
    lastUpdatedLabel: "2026年7月8日",
    lastUpdatedISO: "2026-07-08T10:00:00",
    unreadCount: 1,
    messages: [
      {
        id: "5-1",
        senderRole: "engineer",
        senderName: "山田 太郎",
        content: "プロフィールの編集方法について教えてください。",
        timeLabel: "9:50",
        dateLabel: "2026年7月8日",
        dateISO: "2026-07-08",
        kind: "text",
      },
      {
        id: "5-2",
        senderRole: "company",
        senderName: "森田 亜由美",
        content:
          "お問い合わせありがとうございます。プロフィール編集は「プロフィール」ページ右上の編集ボタンから行えます。",
        timeLabel: "10:00",
        dateLabel: "2026年7月8日",
        dateISO: "2026-07-08",
        kind: "text",
      },
      {
        id: "5-3",
        senderRole: "company",
        senderName: "森田 亜由美",
        content: "ご不明点がございましたらお気軽にお問い合わせください。",
        timeLabel: "10:00",
        dateLabel: "2026年7月8日",
        dateISO: "2026-07-08",
        kind: "text",
      },
    ],
  },
  {
    id: "6",
    participantName: "橋本 大地",
    participantRole: "採用担当",
    participantCompany: "株式会社データポート",
    avatarInitials: "デ",
    jobTitle: "バックエンドエンジニア（Python / Django）",
    status: "スカウト",
    lastMessage: "貴殿の経験がまさに弊社の求める人物像です。",
    lastUpdatedLabel: "2026年7月15日",
    lastUpdatedISO: "2026-07-15T09:30:00",
    unreadCount: 0,
    messages: [
      {
        id: "6-1",
        senderRole: "system",
        senderName: "システム",
        content: "株式会社データポートからスカウトが届きました。",
        timeLabel: "9:00",
        dateLabel: "2026年7月15日",
        dateISO: "2026-07-15",
        kind: "system",
      },
      {
        id: "6-2",
        senderRole: "company",
        senderName: "橋本 大地",
        content: "貴殿の経験がまさに弊社の求める人物像です。ぜひ一度お話しできればと思います。",
        timeLabel: "9:30",
        dateLabel: "2026年7月15日",
        dateISO: "2026-07-15",
        kind: "scout",
      },
    ],
  },
  {
    id: "7",
    participantName: "石田 直樹",
    participantRole: "エンジニアリングマネージャー",
    participantCompany: "株式会社スケールワークス",
    avatarInitials: "ス",
    jobTitle: "クラウドエンジニア（GCP / Terraform）",
    status: "面接調整中",
    lastMessage: "最終面接の日程が確定しましたのでご連絡します。",
    lastUpdatedLabel: "2026年7月14日",
    lastUpdatedISO: "2026-07-14T17:00:00",
    unreadCount: 0,
    messages: [
      {
        id: "7-1",
        senderRole: "company",
        senderName: "石田 直樹",
        content: "一次面接お疲れ様でした。次のステップに進んでいただければと思います。",
        timeLabel: "10:00",
        dateLabel: "2026年7月13日",
        dateISO: "2026-07-13",
        kind: "text",
      },
      {
        id: "7-2",
        senderRole: "engineer",
        senderName: "山田 太郎",
        content: "ありがとうございます。よろしくお願いいたします。",
        timeLabel: "10:30",
        dateLabel: "2026年7月13日",
        dateISO: "2026-07-13",
        kind: "text",
      },
      {
        id: "7-3",
        senderRole: "company",
        senderName: "石田 直樹",
        content: "最終面接の日程が確定しましたのでご連絡します。",
        timeLabel: "16:50",
        dateLabel: "2026年7月14日",
        dateISO: "2026-07-14",
        kind: "text",
      },
      {
        id: "7-4",
        senderRole: "company",
        senderName: "石田 直樹",
        content: "7月25日（土）10:00〜11:00 弊社オフィス（東京都渋谷区）",
        timeLabel: "17:00",
        dateLabel: "2026年7月14日",
        dateISO: "2026-07-14",
        kind: "interview",
      },
    ],
  },
  {
    id: "8",
    participantName: "岡田 恵",
    participantRole: "採用担当",
    participantCompany: "株式会社アナリティクスラボ",
    avatarInitials: "ア",
    jobTitle: "フルスタックエンジニア（Next.js / Node.js）",
    status: "一般",
    lastMessage: "リモート勤務の頻度について教えていただけますか。",
    lastUpdatedLabel: "2026年7月11日",
    lastUpdatedISO: "2026-07-11T15:00:00",
    unreadCount: 0,
    messages: [
      {
        id: "8-1",
        senderRole: "engineer",
        senderName: "山田 太郎",
        content: "リモート勤務の頻度について教えていただけますか。",
        timeLabel: "15:00",
        dateLabel: "2026年7月11日",
        dateISO: "2026-07-11",
        kind: "text",
      },
    ],
  },
  {
    id: "9",
    participantName: "藤井 智也",
    participantRole: "採用担当",
    participantCompany: "株式会社ゼロトラスト",
    avatarInitials: "ゼ",
    jobTitle: "バックエンドエンジニア（Go）",
    status: "スカウト",
    lastMessage: "Go言語でのご経験を拝見し、ぜひご紹介したい案件がございます。",
    lastUpdatedLabel: "2026年7月16日",
    lastUpdatedISO: "2026-07-16T08:45:00",
    unreadCount: 1,
    messages: [
      {
        id: "9-1",
        senderRole: "system",
        senderName: "システム",
        content: "株式会社ゼロトラストからスカウトが届きました。",
        timeLabel: "8:40",
        dateLabel: "2026年7月16日",
        dateISO: "2026-07-16",
        kind: "system",
      },
      {
        id: "9-2",
        senderRole: "company",
        senderName: "藤井 智也",
        content: "Go言語でのご経験を拝見し、ぜひご紹介したい案件がございます。",
        timeLabel: "8:45",
        dateLabel: "2026年7月16日",
        dateISO: "2026-07-16",
        kind: "scout",
      },
    ],
  },
  {
    id: "10",
    participantName: "西村 智子",
    participantRole: "人事",
    participantCompany: "株式会社インフラネクスト",
    avatarInitials: "イ",
    jobTitle: "クラウドエンジニア（AWS）",
    status: "不採用",
    lastMessage: "またの機会がございましたらぜひご検討ください。",
    lastUpdatedLabel: "2026年7月6日",
    lastUpdatedISO: "2026-07-06T14:00:00",
    unreadCount: 1,
    messages: [
      {
        id: "10-1",
        senderRole: "system",
        senderName: "システム",
        content: "選考結果：不採用",
        timeLabel: "13:55",
        dateLabel: "2026年7月6日",
        dateISO: "2026-07-06",
        kind: "system",
      },
      {
        id: "10-2",
        senderRole: "company",
        senderName: "西村 智子",
        content:
          "この度は選考にご参加いただきありがとうございました。今回は他候補者を優先させていただく判断となりました。",
        timeLabel: "13:58",
        dateLabel: "2026年7月6日",
        dateISO: "2026-07-06",
        kind: "text",
      },
      {
        id: "10-3",
        senderRole: "company",
        senderName: "西村 智子",
        content: "またの機会がございましたらぜひご検討ください。",
        timeLabel: "14:00",
        dateLabel: "2026年7月6日",
        dateISO: "2026-07-06",
        kind: "text",
      },
    ],
  },
  {
    id: "11",
    participantName: "加藤 遼",
    participantRole: "採用担当",
    participantCompany: "株式会社パイプラインワークス",
    avatarInitials: "パ",
    jobTitle: "DevOpsエンジニア（Kubernetes / CI-CD）",
    status: "面接調整中",
    lastMessage: "一次面接のご都合はいかがでしょうか。",
    lastUpdatedLabel: "2026年7月13日",
    lastUpdatedISO: "2026-07-13T11:30:00",
    unreadCount: 2,
    messages: [
      {
        id: "11-1",
        senderRole: "system",
        senderName: "システム",
        content: "書類選考を通過しました。",
        timeLabel: "11:00",
        dateLabel: "2026年7月13日",
        dateISO: "2026-07-13",
        kind: "system",
      },
      {
        id: "11-2",
        senderRole: "company",
        senderName: "加藤 遼",
        content: "書類選考を通過されました。おめでとうございます。",
        timeLabel: "11:15",
        dateLabel: "2026年7月13日",
        dateISO: "2026-07-13",
        kind: "text",
      },
      {
        id: "11-3",
        senderRole: "company",
        senderName: "加藤 遼",
        content: "一次面接のご都合はいかがでしょうか。",
        timeLabel: "11:30",
        dateLabel: "2026年7月13日",
        dateISO: "2026-07-13",
        kind: "text",
      },
    ],
  },
  {
    id: "12",
    participantName: "山口 智美",
    participantRole: "採用担当",
    participantCompany: "株式会社ブリッジソリューションズ",
    avatarInitials: "ブ",
    jobTitle: "PM／プロジェクトマネージャー（システム開発）",
    status: "一般",
    lastMessage: "資料を送付いたしましたのでご確認ください。",
    lastUpdatedLabel: "2026年7月5日",
    lastUpdatedISO: "2026-07-05T16:20:00",
    unreadCount: 0,
    messages: [
      {
        id: "12-1",
        senderRole: "engineer",
        senderName: "山田 太郎",
        content: "案件の詳細資料はございますか。",
        timeLabel: "16:00",
        dateLabel: "2026年7月5日",
        dateISO: "2026-07-05",
        kind: "text",
      },
      {
        id: "12-2",
        senderRole: "company",
        senderName: "山口 智美",
        content: "資料を送付いたしましたのでご確認ください。",
        timeLabel: "16:20",
        dateLabel: "2026年7月5日",
        dateISO: "2026-07-05",
        kind: "text",
        attachment: { name: "案件概要資料.pdf", fileType: "pdf", size: "1.1MB" },
      },
    ],
  },
  {
    id: "13",
    participantName: "村上 健二",
    participantRole: "採用担当",
    participantCompany: "株式会社ニューラルゲート",
    avatarInitials: "ニ",
    jobTitle: "AIエンジニア（LLM／生成AI）",
    status: "内定",
    lastMessage: "入社日について改めてご相談させてください。",
    lastUpdatedLabel: "2026年7月10日",
    lastUpdatedISO: "2026-07-10T10:15:00",
    unreadCount: 0,
    messages: [
      {
        id: "13-1",
        senderRole: "system",
        senderName: "システム",
        content: "内定通知が届きました。",
        timeLabel: "10:00",
        dateLabel: "2026年7月10日",
        dateISO: "2026-07-10",
        kind: "system",
      },
      {
        id: "13-2",
        senderRole: "company",
        senderName: "村上 健二",
        content: "内定おめでとうございます。ぜひ一緒に働けることを楽しみにしております。",
        timeLabel: "10:05",
        dateLabel: "2026年7月10日",
        dateISO: "2026-07-10",
        kind: "text",
      },
      {
        id: "13-3",
        senderRole: "company",
        senderName: "村上 健二",
        content: "入社日について改めてご相談させてください。",
        timeLabel: "10:15",
        dateLabel: "2026年7月10日",
        dateISO: "2026-07-10",
        kind: "text",
      },
    ],
  },
  {
    id: "14",
    participantName: "清水 玲奈",
    participantRole: "採用担当",
    participantCompany: "株式会社セーフガード",
    avatarInitials: "セ",
    jobTitle: "セキュリティエンジニア（SOC運用）",
    status: "不採用",
    lastMessage: "書類選考の結果、今回は見送りとさせていただきます。",
    lastUpdatedLabel: "2026年7月12日",
    lastUpdatedISO: "2026-07-12T09:40:00",
    unreadCount: 1,
    messages: [
      {
        id: "14-1",
        senderRole: "system",
        senderName: "システム",
        content: "選考結果：不採用",
        timeLabel: "9:35",
        dateLabel: "2026年7月12日",
        dateISO: "2026-07-12",
        kind: "system",
      },
      {
        id: "14-2",
        senderRole: "company",
        senderName: "清水 玲奈",
        content: "書類選考の結果、今回は見送りとさせていただきます。誠にありがとうございました。",
        timeLabel: "9:40",
        dateLabel: "2026年7月12日",
        dateISO: "2026-07-12",
        kind: "text",
      },
    ],
  },
  {
    id: "15",
    participantName: "遠藤 圭吾",
    participantRole: "採用担当",
    participantCompany: "株式会社グロースパートナーズ",
    avatarInitials: "グ",
    jobTitle: "フルスタックエンジニア（Ruby on Rails）",
    status: "スカウト",
    lastMessage: "地域密着型のプロダクト開発にご興味はございませんか。",
    lastUpdatedLabel: "2026年7月7日",
    lastUpdatedISO: "2026-07-07T13:10:00",
    unreadCount: 0,
    messages: [
      {
        id: "15-1",
        senderRole: "system",
        senderName: "システム",
        content: "株式会社グロースパートナーズからスカウトが届きました。",
        timeLabel: "13:00",
        dateLabel: "2026年7月7日",
        dateISO: "2026-07-07",
        kind: "system",
      },
      {
        id: "15-2",
        senderRole: "company",
        senderName: "遠藤 圭吾",
        content: "地域密着型のプロダクト開発にご興味はございませんか。",
        timeLabel: "13:10",
        dateLabel: "2026年7月7日",
        dateISO: "2026-07-07",
        kind: "scout",
      },
    ],
  },
];
