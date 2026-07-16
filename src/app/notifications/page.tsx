import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { NotificationList } from "@/components/notifications/NotificationList";
import { ENGINEER_NAV, USER_MENU } from "@/constants/dashboard";
import { NOTIFICATIONS, NOTIFICATIONS_PAGE } from "@/constants/notifications";

export const metadata: Metadata = {
  title: `${NOTIFICATIONS_PAGE.title} | ENGINEER MATCH`,
};

export default function NotificationsPage() {
  const user = USER_MENU.engineer;

  return (
    <DashboardShell
      navItems={ENGINEER_NAV}
      activeHref="/notifications"
      pageTitle={NOTIFICATIONS_PAGE.title}
      userName={user.name}
      userInitials={user.initials}
    >
      <p className="text-sm text-muted-foreground">{NOTIFICATIONS_PAGE.description}</p>
      <NotificationList initialNotifications={NOTIFICATIONS} />
    </DashboardShell>
  );
}
