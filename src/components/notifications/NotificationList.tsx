"use client";

import { useMemo, useState } from "react";
import { NotificationCard } from "@/components/notifications/NotificationCard";
import { NotificationEmptyState } from "@/components/notifications/NotificationEmptyState";
import { NotificationFilters } from "@/components/notifications/NotificationFilters";
import { NotificationSummaryCards } from "@/components/notifications/NotificationSummaryCards";
import {
  NOTIFICATION_ACTIONS_LABELS,
  type FilterOption,
  type Notification,
} from "@/constants/notifications";

interface NotificationListProps {
  initialNotifications: Notification[];
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isWithinPastWeek(date: Date, now: Date): boolean {
  const diffMs = now.getTime() - date.getTime();
  const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
  return diffMs >= 0 && diffMs <= oneWeekMs;
}

export function NotificationList({ initialNotifications }: NotificationListProps) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<FilterOption>("all");

  const now = useMemo(() => new Date(), []);

  const counts = useMemo(() => {
    const unread = notifications.filter((n) => !n.isRead).length;
    const today = notifications.filter((n) => isSameDay(new Date(n.dateISO), now)).length;
    const thisWeek = notifications.filter((n) => isWithinPastWeek(new Date(n.dateISO), now)).length;
    return { unread, today, thisWeek, all: notifications.length };
  }, [notifications, now]);

  const filtered = useMemo(() => {
    switch (filter) {
      case "all":
        return notifications;
      case "unread":
        return notifications.filter((n) => !n.isRead);
      case "today":
        return notifications.filter((n) => isSameDay(new Date(n.dateISO), now));
      case "thisWeek":
        return notifications.filter((n) => isWithinPastWeek(new Date(n.dateISO), now));
      default:
        return notifications.filter((n) => n.type === filter);
    }
  }, [notifications, filter, now]);

  function handleMarkRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  }

  function handleMarkAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }

  return (
    <div className="flex flex-col gap-6">
      <NotificationSummaryCards
        unreadCount={counts.unread}
        todayCount={counts.today}
        thisWeekCount={counts.thisWeek}
        allCount={counts.all}
      />

      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <NotificationFilters value={filter} onChange={setFilter} />
          <button
            type="button"
            onClick={handleMarkAllRead}
            disabled={counts.unread === 0}
            className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold text-primary transition-colors duration-200 hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"
          >
            {NOTIFICATION_ACTIONS_LABELS.markAllReadLabel}
          </button>
        </div>

        {filtered.length === 0 ? (
          <NotificationEmptyState />
        ) : (
          <ul className="flex flex-col gap-2">
            {filtered.map((notification) => (
              <li key={notification.id}>
                <NotificationCard notification={notification} onMarkRead={handleMarkRead} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
