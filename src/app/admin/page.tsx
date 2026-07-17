import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPendingApprovals } from "@/components/admin/AdminPendingApprovals";
import { AdminQuickActions } from "@/components/admin/AdminQuickActions";
import { AdminRecentActivity } from "@/components/admin/AdminRecentActivity";
import { AdminSummaryCards } from "@/components/admin/AdminSummaryCards";
import { AdminSystemStatus } from "@/components/admin/AdminSystemStatus";
import { ADMIN_DASHBOARD_PAGE, ADMIN_NAV, ADMIN_USER } from "@/constants/admin";

export const metadata: Metadata = {
  title: `${ADMIN_DASHBOARD_PAGE.title} | ENGINEER MATCH`,
  description: ADMIN_DASHBOARD_PAGE.description,
};

export default function AdminDashboardPage() {
  return (
    <AdminShell
      navItems={ADMIN_NAV}
      activeHref="/admin"
      pageTitle={ADMIN_DASHBOARD_PAGE.title}
      userName={ADMIN_USER.name}
      userInitials={ADMIN_USER.initials}
    >
      <p className="text-sm text-muted-foreground">
        {ADMIN_DASHBOARD_PAGE.description}
      </p>

      <AdminSummaryCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <AdminPendingApprovals />
          <AdminRecentActivity />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-4">
          <AdminQuickActions />
          <AdminSystemStatus />
        </div>
      </div>
    </AdminShell>
  );
}
