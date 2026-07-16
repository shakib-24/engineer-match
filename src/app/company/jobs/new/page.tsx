import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CreateJobForm } from "@/components/company/CreateJobForm";
import { COMPANY_NAV, USER_MENU } from "@/constants/dashboard";
import { CREATE_JOB_META, JOB_DETAIL_META } from "@/constants/company-jobs";

export const metadata: Metadata = {
  title: "求人・案件を新規作成 | ENGINEER MATCH",
  description: "新しい求人・案件を作成できます。",
};

export default function CompanyNewJobPage() {
  const user = USER_MENU.company;

  return (
    <DashboardShell
      navItems={COMPANY_NAV}
      activeHref="/company/jobs"
      pageTitle="新規掲載"
      userName={user.name}
      userInitials={user.initials}
    >
      <div>
        <Link
          href={JOB_DETAIL_META.backHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {JOB_DETAIL_META.backLabel}
        </Link>
      </div>

      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {CREATE_JOB_META.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {CREATE_JOB_META.description}
        </p>
      </div>

      <CreateJobForm />
    </DashboardShell>
  );
}
