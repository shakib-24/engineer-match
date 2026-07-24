import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { JobManagementHeader } from "@/components/company/JobManagementHeader";
import { JobList } from "@/components/company/JobList";
import { COMPANY_NAV } from "@/constants/dashboard";
import { JOB_MANAGEMENT_META } from "@/constants/company-jobs";
import { createClient } from "@/lib/supabase/server";
import { listCompanyOpportunities } from "@/lib/company/jobs";
import { getCompanyHeaderIdentity } from "@/lib/company/profile";

export const metadata: Metadata = {
  title: "求人・案件管理 | ENGINEER MATCH",
  description: "掲載中の求人・案件を確認・管理できます。",
};

export default async function CompanyJobsPage() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();
  const [jobs, identity] = await Promise.all([
    authUser ? listCompanyOpportunities(supabase, authUser.id) : Promise.resolve([]),
    getCompanyHeaderIdentity(supabase, authUser),
  ]);

  return (
    <DashboardShell
      navItems={COMPANY_NAV}
      activeHref="/company/jobs"
      pageTitle={JOB_MANAGEMENT_META.title}
      userName={identity.name}
      userInitials={identity.initials}
      userEmail={identity.email}
    >
      <JobManagementHeader />
      <JobList jobs={jobs} />
    </DashboardShell>
  );
}
