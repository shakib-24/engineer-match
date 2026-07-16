import { Bell, CalendarClock, CalendarDays, Layers } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { SUMMARY_CARD_LABELS } from "@/constants/notifications";

interface NotificationSummaryCardsProps {
  unreadCount: number;
  todayCount: number;
  thisWeekCount: number;
  allCount: number;
}

export function NotificationSummaryCards({
  unreadCount,
  todayCount,
  thisWeekCount,
  allCount,
}: NotificationSummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard label={SUMMARY_CARD_LABELS.unread} value={String(unreadCount)} icon={Bell} />
      <StatCard label={SUMMARY_CARD_LABELS.today} value={String(todayCount)} icon={CalendarClock} />
      <StatCard label={SUMMARY_CARD_LABELS.thisWeek} value={String(thisWeekCount)} icon={CalendarDays} />
      <StatCard label={SUMMARY_CARD_LABELS.all} value={String(allCount)} icon={Layers} />
    </div>
  );
}
