import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminCompanyList } from "@/components/admin/companies/AdminCompanyList";
import { ADMIN_NAV, ADMIN_USER } from "@/constants/admin";
import { ADMIN_COMPANIES, ADMIN_COMPANIES_PAGE } from "@/constants/admin-companies";

export const metadata: Metadata = {
  title: `${ADMIN_COMPANIES_PAGE.title} | ENGINEER MATCH`,
  description: ADMIN_COMPANIES_PAGE.description,
};

export default function AdminCompaniesPage() {
  return (
    <AdminShell
      navItems={ADMIN_NAV}
      activeHref="/admin/companies"
      pageTitle={ADMIN_COMPANIES_PAGE.title}
      userName={ADMIN_USER.name}
      userInitials={ADMIN_USER.initials}
    >
      <AdminPageHeader
        title={ADMIN_COMPANIES_PAGE.title}
        description={ADMIN_COMPANIES_PAGE.description}
      />
      <div className="mt-6">
        <AdminCompanyList initialCompanies={ADMIN_COMPANIES} />
      </div>
    </AdminShell>
  );
}
