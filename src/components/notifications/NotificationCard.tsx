"use client";

import Link from "next/link";
import {
  Award,
  CalendarClock,
  FileText,
  Info,
  MessageSquare,
  Send,
  type LucideIcon,
} from "lucide-react";
import {
  NOTIFICATION_ACTIONS_LABELS,
  NOTIFICATION_TYPE_ICONS,
  NOTIFICATION_TYPE_STYLES,
  type Notification,
} from "@/constants/notifications";

const ICON_MAP: Record<string, LucideIcon> = {
  fileText: FileText,
  send: Send,
  messageSquare: MessageSquare,
  calendarClock: CalendarClock,
  award: Award,
  info: Info,
};

interface NotificationCardProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
}

export function NotificationCard({ notification, onMarkRead }: NotificationCardProps) {
  const Icon = ICON_MAP[NOTIFICATION_TYPE_ICONS[notification.type]];

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 transition-colors duration-200 ${
        notification.isRead ? "border-border bg-surface" : "border-primary/20 bg-primary/5"
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${NOTIFICATION_TYPE_STYLES[notification.type]}`}
        aria-hidden="true"
      >
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
          <Link
            href={notification.link}
            className="min-w-0 flex-1 rounded-sm text-sm font-semibold text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            {notification.title}
          </Link>
          {!notification.isRead && (
            <span
              className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary"
              aria-label={NOTIFICATION_ACTIONS_LABELS.unreadLabel}
            />
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{notification.description}</p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${NOTIFICATION_TYPE_STYLES[notification.type]}`}
          >
            {notification.type}
          </span>
          <div className="flex items-center gap-3">
            <time className="text-[11px] whitespace-nowrap text-muted-foreground">
              {notification.dateLabel}
            </time>
            {!notification.isRead && (
              <button
                type="button"
                onClick={() => onMarkRead(notification.id)}
                className="rounded-sm text-xs font-semibold text-primary hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                {NOTIFICATION_ACTIONS_LABELS.markReadLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
