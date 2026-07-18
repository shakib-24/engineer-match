import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { JobDetailHero } from "@/components/jobs/JobDetailHero";
import { JobDescription } from "@/components/jobs/JobDescription";
import { RequiredSkills } from "@/components/jobs/RequiredSkills";
import { PreferredSkills } from "@/components/jobs/PreferredSkills";
import { WorkingConditions } from "@/components/jobs/WorkingConditions";
import { EmploymentConditionsSummary } from "@/components/jobs/EmploymentConditionsSummary";
import { Benefits } from "@/components/jobs/Benefits";
import { SelectionFlow } from "@/components/jobs/SelectionFlow";
import { CompanyInfo } from "@/components/jobs/CompanyInfo";
import { ApplySidebar } from "@/components/jobs/ApplySidebar";
import { ENGINEER_NAV, USER_MENU } from "@/constants/dashboard";
import { JOB_DETAIL_META, JOBS } from "@/constants/jobs";

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return JOBS.map((job) => ({ id: job.id }));
}

export async function generateMetadata({
  params,
}: JobDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const job = JOBS.find((item) => item.id === id);

  return {
    title: job ? `${job.title} | ENGINEER MATCH` : "求人詳細 | ENGINEER MATCH",
  };
}

export default async function EngineerJobDetailPage({
  params,
}: JobDetailPageProps) {
  const { id } = await params;
  const job = JOBS.find((item) => item.id === id);

  if (!job) {
    notFound();
  }

  const user = USER_MENU.engineer;

  return (
    <DashboardShell
      navItems={ENGINEER_NAV}
      activeHref="/engineer/jobs"
      pageTitle="求人詳細"
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

      <JobDetailHero job={job} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
          <JobDescription job={job} />
          <RequiredSkills skills={job.requiredSkills} />
          <PreferredSkills skills={job.preferredSkills} />
          <WorkingConditions conditions={job.workConditions} />
          {job.contractType === "就職" && job.employmentConditions && (
            <EmploymentConditionsSummary conditions={job.employmentConditions} />
          )}
          <Benefits benefits={job.benefits} />
          <SelectionFlow steps={job.selectionFlow} />
          <CompanyInfo job={job} />
        </div>

        <div className="lg:sticky lg:top-24 lg:col-span-1 lg:self-start">
          <ApplySidebar job={job} />
        </div>
      </div>
    </DashboardShell>
  );
}
