import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  Clock,
  Code2,
  Gift,
  ListChecks,
  ShieldCheck,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { JobDetailHeader } from "@/components/jobs/JobDetailHeader";
import { JobInfoCard } from "@/components/jobs/JobInfoCard";
import { CompanyCard } from "@/components/jobs/CompanyCard";
import { ApplyCard } from "@/components/jobs/ApplyCard";
import { SkillBadge } from "@/components/jobs/SkillBadge";
import { ENGINEER_NAV, USER_MENU } from "@/constants/dashboard";
import { JOB_DETAIL_META, JOB_DETAIL_SECTION_LABELS, JOBS } from "@/constants/jobs";

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
    title: job
      ? `${job.title} | ENGINEER MATCH`
      : "求人詳細 | ENGINEER MATCH",
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

      <JobDetailHeader job={job} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
          <JobInfoCard
            title={JOB_DETAIL_SECTION_LABELS.responsibilitiesTitle}
            icon={Briefcase}
          >
            <p className="text-sm leading-relaxed text-muted-foreground">
              {job.description}
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {job.responsibilities.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </JobInfoCard>

          <JobInfoCard
            title={JOB_DETAIL_SECTION_LABELS.requirementsTitle}
            icon={ListChecks}
          >
            <ul className="flex flex-col gap-2">
              {job.requirements.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </JobInfoCard>

          <JobInfoCard title={JOB_DETAIL_SECTION_LABELS.skillsTitle} icon={Code2}>
            <div className="flex flex-col gap-5">
              <div>
                <h4 className="text-sm font-semibold text-foreground">
                  {JOB_DETAIL_SECTION_LABELS.requiredSkillsLabel}
                </h4>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {job.requiredSkills.map((skill) => (
                    <li key={skill}>
                      <SkillBadge label={skill} tone="required" />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">
                  {JOB_DETAIL_SECTION_LABELS.preferredSkillsLabel}
                </h4>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {job.preferredSkills.map((skill) => (
                    <li key={skill}>
                      <SkillBadge label={skill} tone="preferred" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </JobInfoCard>

          <JobInfoCard
            title={JOB_DETAIL_SECTION_LABELS.workConditionsTitle}
            icon={Clock}
          >
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {job.workConditions.map((condition) => (
                <div key={condition.label}>
                  <dt className="text-xs text-muted-foreground">
                    {condition.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">
                    {condition.value}
                  </dd>
                </div>
              ))}
            </dl>
          </JobInfoCard>

          <JobInfoCard title={JOB_DETAIL_SECTION_LABELS.benefitsTitle} icon={Gift}>
            <ul className="flex flex-col gap-2">
              {job.benefits.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </JobInfoCard>

          <JobInfoCard
            title={JOB_DETAIL_SECTION_LABELS.selectionFlowTitle}
            icon={ShieldCheck}
          >
            <ol className="flex flex-col gap-3">
              {job.selectionFlow.map((step, index) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  <span className="text-sm text-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </JobInfoCard>

          <CompanyCard job={job} />
        </div>

        <div className="lg:sticky lg:top-24 lg:col-span-1 lg:self-start">
          <ApplyCard job={job} />
        </div>
      </div>
    </DashboardShell>
  );
}
