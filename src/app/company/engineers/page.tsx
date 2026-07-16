import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { EngineerList } from "@/components/company/engineers/EngineerList";
import { COMPANY_NAV, USER_MENU } from "@/constants/dashboard";
import { ENGINEERS, ENGINEERS_PAGE } from "@/constants/company-engineers";

export const metadata: Metadata = {
  title: "エンジニア検索 | ENGINEER MATCH",
  description: "スキル・経験・希望条件から、自社に合うエンジニアを検索できます。",
};

export default function CompanyEngineersPage() {
  const user = USER_MENU.company;

  return (
    <DashboardShell
      navItems={COMPANY_NAV}
      activeHref="/company/engineers"
      pageTitle={ENGINEERS_PAGE.title}
      userName={user.name}
      userInitials={user.initials}
    >
      <EngineerList engineers={ENGINEERS} />
    </DashboardShell>
  );
}
