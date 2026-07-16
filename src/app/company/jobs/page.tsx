import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { JobManagementHeader } from "@/components/company/JobManagementHeader";
import { JobList } from "@/components/company/JobList";
import { COMPANY_NAV, USER_MENU } from "@/constants/dashboard";
import { COMPANY_JOBS, JOB_MANAGEMENT_META } from "@/constants/company-jobs";

export const metadata: Metadata = {
  title: "求人・案件管理 | ENGINEER MATCH",
  description: "掲載中の求人・案件を確認・管理できます。",
};

export default function CompanyJobsPage() {
  const user = USER_MENU.company;

  return (
    <DashboardShell
      navItems={COMPANY_NAV}
      activeHref="/company/jobs"
      pageTitle={JOB_MANAGEMENT_META.title}
      userName={user.name}
      userInitials={user.initials}
    >
      <JobManagementHeader />
      <JobList jobs={COMPANY_JOBS} />
    </DashboardShell>
  );
}
