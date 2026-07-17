import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminApplicationList } from "@/components/admin/applications/AdminApplicationList";
import { ADMIN_NAV, ADMIN_USER } from "@/constants/admin";
import { ADMIN_APPLICATIONS, ADMIN_APPLICATIONS_PAGE } from "@/constants/admin-applications";

export const metadata: Metadata = {
  title: `${ADMIN_APPLICATIONS_PAGE.title} | ENGINEER MATCH`,
  description: ADMIN_APPLICATIONS_PAGE.description,
};

export default function AdminApplicationsPage() {
  return (
    <AdminShell
      navItems={ADMIN_NAV}
      activeHref="/admin/applications"
      pageTitle={ADMIN_APPLICATIONS_PAGE.title}
      userName={ADMIN_USER.name}
      userInitials={ADMIN_USER.initials}
    >
      <AdminPageHeader
        title={ADMIN_APPLICATIONS_PAGE.title}
        description={ADMIN_APPLICATIONS_PAGE.description}
      />
      <div className="mt-6">
        <AdminApplicationList initialApplications={ADMIN_APPLICATIONS} />
      </div>
    </AdminShell>
  );
}
