import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { SearchHeader } from "@/components/jobs/SearchHeader";
import { JobList } from "@/components/jobs/JobList";
import { ENGINEER_NAV, USER_MENU } from "@/constants/dashboard";
import { JOBS, SEARCH_HEADER } from "@/constants/jobs";

export const metadata: Metadata = {
  title: "求人・案件検索 | ENGINEER MATCH",
  description: "エンジニア向けの求人・案件を検索できます。",
};

export default function EngineerJobsPage() {
  const user = USER_MENU.engineer;

  return (
    <DashboardShell
      navItems={ENGINEER_NAV}
      activeHref="/engineer/jobs"
      pageTitle={SEARCH_HEADER.title}
      userName={user.name}
      userInitials={user.initials}
    >
      <SearchHeader />
      <JobList jobs={JOBS} />
    </DashboardShell>
  );
}
