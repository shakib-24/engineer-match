import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { NotificationList } from "@/components/notifications/NotificationList";
import { COMPANY_NAV, USER_MENU } from "@/constants/dashboard";
import { COMPANY_NOTIFICATIONS, NOTIFICATIONS_PAGE } from "@/constants/notifications";

export const metadata: Metadata = {
  title: `${NOTIFICATIONS_PAGE.title} | ENGINEER MATCH`,
};

export default function CompanyNotificationsPage() {
  const user = USER_MENU.company;

  return (
    <DashboardShell
      navItems={COMPANY_NAV}
      activeHref="/company/notifications"
      pageTitle={NOTIFICATIONS_PAGE.title}
      userName={user.name}
      userInitials={user.initials}
    >
      <p className="text-sm text-muted-foreground">{NOTIFICATIONS_PAGE.description}</p>
      <NotificationList initialNotifications={COMPANY_NOTIFICATIONS} />
    </DashboardShell>
  );
}
