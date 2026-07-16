import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CompanyProfileHeader } from "@/components/company/CompanyProfileHeader";
import { CompanyOverviewCard } from "@/components/company/CompanyOverviewCard";
import { CompanyStatistics } from "@/components/company/CompanyStatistics";
import { COMPANY_NAV, USER_MENU } from "@/constants/dashboard";
import { COMPANY_PROFILE_PAGE, COMPANY_PROFILE_STATISTICS } from "@/constants/company";

export const metadata: Metadata = {
  title: "企業プロフィール | ENGINEER MATCH",
  description: "企業プロフィールを確認・管理できます。",
};

export default function CompanyProfilePage() {
  const user = USER_MENU.company;

  return (
    <DashboardShell
      navItems={COMPANY_NAV}
      activeHref="/company/profile"
      pageTitle={COMPANY_PROFILE_PAGE.title}
      userName={user.name}
      userInitials={user.initials}
    >
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {COMPANY_PROFILE_PAGE.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {COMPANY_PROFILE_PAGE.description}
        </p>
      </div>

      <CompanyProfileHeader />

      <CompanyStatistics items={COMPANY_PROFILE_STATISTICS} />

      <CompanyOverviewCard />
    </DashboardShell>
  );
}
