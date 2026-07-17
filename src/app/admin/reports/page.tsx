import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminReportList } from "@/components/admin/reports/AdminReportList";
import { ADMIN_NAV, ADMIN_USER } from "@/constants/admin";
import { ADMIN_REPORTS, ADMIN_REPORTS_PAGE } from "@/constants/admin-reports";

export const metadata: Metadata = {
  title: `${ADMIN_REPORTS_PAGE.title} | ENGINEER MATCH`,
  description: ADMIN_REPORTS_PAGE.description,
};

export default function AdminReportsPage() {
  return (
    <AdminShell
      navItems={ADMIN_NAV}
      activeHref="/admin/reports"
      pageTitle={ADMIN_REPORTS_PAGE.title}
      userName={ADMIN_USER.name}
      userInitials={ADMIN_USER.initials}
    >
      <AdminPageHeader
        title={ADMIN_REPORTS_PAGE.title}
        description={ADMIN_REPORTS_PAGE.description}
      />
      <div className="mt-6">
        <AdminReportList initialReports={ADMIN_REPORTS} />
      </div>
    </AdminShell>
  );
}
