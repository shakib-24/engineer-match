import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { SearchHeader } from "@/components/jobs/SearchHeader";
import { SearchFilters } from "@/components/jobs/SearchFilters";
import { JobList } from "@/components/jobs/JobList";
import { JobSidebar } from "@/components/jobs/JobSidebar";
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-3">
          <SearchHeader />
          <SearchFilters />
          <JobList jobs={JOBS} />
        </div>

        <div className="lg:sticky lg:top-24 lg:col-span-1 lg:self-start">
          <JobSidebar />
        </div>
      </div>
    </DashboardShell>
  );
}
