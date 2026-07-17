import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminNotificationList } from "@/components/admin/notifications/AdminNotificationList";
import { ADMIN_NAV, ADMIN_USER } from "@/constants/admin";
import { ADMIN_NOTIFICATIONS, ADMIN_NOTIFICATIONS_PAGE } from "@/constants/admin-notifications";

export const metadata: Metadata = {
  title: `${ADMIN_NOTIFICATIONS_PAGE.title} | ENGINEER MATCH`,
  description: ADMIN_NOTIFICATIONS_PAGE.description,
};

export default function AdminNotificationsPage() {
  return (
    <AdminShell
      navItems={ADMIN_NAV}
      activeHref="/admin/notifications"
      pageTitle={ADMIN_NOTIFICATIONS_PAGE.title}
      userName={ADMIN_USER.name}
      userInitials={ADMIN_USER.initials}
    >
      <AdminPageHeader
        title={ADMIN_NOTIFICATIONS_PAGE.title}
        description={ADMIN_NOTIFICATIONS_PAGE.description}
      />
      <div className="mt-6">
        <AdminNotificationList initialNotifications={ADMIN_NOTIFICATIONS} />
      </div>
    </AdminShell>
  );
}
