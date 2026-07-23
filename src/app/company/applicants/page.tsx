import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ApplicantList } from "@/components/company/applicants/ApplicantList";
import { COMPANY_NAV, USER_MENU } from "@/constants/dashboard";
import { APPLICANTS_PAGE } from "@/constants/company-applicants";
import { createClient } from "@/lib/supabase/server";
import { listCompanyApplicants } from "@/lib/company/applicants";

export const metadata: Metadata = {
  title: "応募者管理 | ENGINEER MATCH",
  description: "求人・案件への応募者を確認・管理できます。",
};

export default async function CompanyApplicantsPage() {
  const user = USER_MENU.company;
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  const applicants = authUser ? await listCompanyApplicants(supabase, authUser.id) : [];

  return (
    <DashboardShell
      navItems={COMPANY_NAV}
      activeHref="/company/applicants"
      pageTitle={APPLICANTS_PAGE.title}
      userName={user.name}
      userInitials={user.initials}
    >
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {APPLICANTS_PAGE.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {APPLICANTS_PAGE.description}
        </p>
      </div>

      <ApplicantList applicants={applicants} />
    </DashboardShell>
  );
}
