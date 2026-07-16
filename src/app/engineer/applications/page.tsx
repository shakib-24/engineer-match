import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ApplicationList } from "@/components/applications/ApplicationList";
import { ENGINEER_NAV, USER_MENU } from "@/constants/dashboard";
import { APPLICATIONS, APPLICATIONS_PAGE } from "@/constants/applications";

export const metadata: Metadata = {
  title: "応募管理 | ENGINEER MATCH",
  description: "応募した求人・案件を確認できます。",
};

export default function EngineerApplicationsPage() {
  const user = USER_MENU.engineer;

  return (
    <DashboardShell
      navItems={ENGINEER_NAV}
      activeHref="/engineer/applications"
      pageTitle={APPLICATIONS_PAGE.title}
      userName={user.name}
      userInitials={user.initials}
    >
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {APPLICATIONS_PAGE.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {APPLICATIONS_PAGE.description}
        </p>
      </div>

      <ApplicationList applications={APPLICATIONS} />
    </DashboardShell>
  );
}
