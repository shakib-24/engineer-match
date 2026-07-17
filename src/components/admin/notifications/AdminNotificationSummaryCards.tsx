import { Bell, CalendarDays, CalendarRange, Inbox } from "lucide-react";
import { AdminSummaryCard } from "@/components/admin/shared/AdminSummaryCard";
import { ADMIN_NOTIFICATION_SUMMARY_LABELS } from "@/constants/admin-notifications";

interface AdminNotificationSummaryCardsProps {
  unreadCount: number;
  todayCount: number;
  thisWeekCount: number;
  allCount: number;
}

export function AdminNotificationSummaryCards({
  unreadCount,
  todayCount,
  thisWeekCount,
  allCount,
}: AdminNotificationSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <AdminSummaryCard
        label={ADMIN_NOTIFICATION_SUMMARY_LABELS.unread}
        value={`${unreadCount}件`}
        icon={Bell}
        tone={unreadCount > 0 ? "warning" : "neutral"}
      />
      <AdminSummaryCard
        label={ADMIN_NOTIFICATION_SUMMARY_LABELS.today}
        value={`${todayCount}件`}
        icon={CalendarDays}
        tone="neutral"
      />
      <AdminSummaryCard
        label={ADMIN_NOTIFICATION_SUMMARY_LABELS.thisWeek}
        value={`${thisWeekCount}件`}
        icon={CalendarRange}
        tone="neutral"
      />
      <AdminSummaryCard
        label={ADMIN_NOTIFICATION_SUMMARY_LABELS.all}
        value={`${allCount}件`}
        icon={Inbox}
        tone="neutral"
      />
    </div>
  );
}
