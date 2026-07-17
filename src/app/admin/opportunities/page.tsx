import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminOpportunityList } from "@/components/admin/opportunities/AdminOpportunityList";
import { ADMIN_NAV, ADMIN_USER } from "@/constants/admin";
import { ADMIN_OPPORTUNITIES, ADMIN_OPPORTUNITIES_PAGE } from "@/constants/admin-opportunities";

export const metadata: Metadata = {
  title: `${ADMIN_OPPORTUNITIES_PAGE.title} | ENGINEER MATCH`,
  description: ADMIN_OPPORTUNITIES_PAGE.description,
};

export default function AdminOpportunitiesPage() {
  return (
    <AdminShell
      navItems={ADMIN_NAV}
      activeHref="/admin/opportunities"
      pageTitle={ADMIN_OPPORTUNITIES_PAGE.title}
      userName={ADMIN_USER.name}
      userInitials={ADMIN_USER.initials}
    >
      <AdminPageHeader
        title={ADMIN_OPPORTUNITIES_PAGE.title}
        description={ADMIN_OPPORTUNITIES_PAGE.description}
      />
      <div className="mt-6">
        <AdminOpportunityList initialOpportunities={ADMIN_OPPORTUNITIES} />
      </div>
    </AdminShell>
  );
}
