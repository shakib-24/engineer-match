import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, MapPin } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CompanyStatistics } from "@/components/company/CompanyStatistics";
import { JobDetailActions } from "@/components/company/JobStatusBadge";
import { COMPANY_NAV, USER_MENU } from "@/constants/dashboard";
import {
  APPLICANT_STATUS_BADGE_STYLES,
  COMPANY_JOBS,
  CONTRACT_TYPE_BADGE_STYLES,
  JOB_DETAIL_META,
  JOB_DETAIL_SECTION_LABELS,
} from "@/constants/company-jobs";

interface CompanyJobDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return COMPANY_JOBS.map((job) => ({ id: job.id }));
}

export async function generateMetadata({
  params,
}: CompanyJobDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const job = COMPANY_JOBS.find((item) => item.id === id);

  return {
    title: job ? `${job.title} | ENGINEER MATCH` : "求人詳細 | ENGINEER MATCH",
  };
}

export default async function CompanyJobDetailPage({
  params,
}: CompanyJobDetailPageProps) {
  const { id } = await params;
  const job = COMPANY_JOBS.find((item) => item.id === id);

  if (!job) {
    notFound();
  }

  const user = USER_MENU.company;

  const applicantsSummaryItems = [
    { label: "書類選考中", value: String(job.statistics.documentScreening), icon: "clock" },
    { label: "面接中", value: String(job.statistics.interviews), icon: "messagesSquare" },
    { label: "内定", value: String(job.statistics.offers), icon: "award" },
    { label: "応募総数", value: String(job.statistics.applications), icon: "users" },
  ];

  const statisticsItems = [
    { label: "求人閲覧数", value: String(job.statistics.views), icon: "eye" },
    { label: "応募数", value: String(job.statistics.applications), icon: "users" },
    { label: "書類選考通過率", value: job.statistics.applications > 0
      ? `${Math.round((job.statistics.interviews / job.statistics.applications) * 100)}%`
      : "—", icon: "calendarCheck" },
    { label: "内定数", value: String(job.statistics.offers), icon: "award" },
  ];

  return (
    <DashboardShell
      navItems={COMPANY_NAV}
      activeHref="/company/jobs"
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

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <JobDetailActions jobId={job.id} initialStatus={job.status} />

        <h2 className="mt-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {job.title}
        </h2>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${CONTRACT_TYPE_BADGE_STYLES[job.contractType]}`}
          >
            {job.contractType}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
            {job.category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {job.location}
          </span>
        </div>

        <p className="mt-4 text-lg font-semibold text-primary">{job.salaryLabel}</p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold text-foreground">
          {JOB_DETAIL_META.applicantsSummaryTitle}
        </h3>
        <CompanyStatistics items={applicantsSummaryItems} />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold text-foreground">
          {JOB_DETAIL_META.statisticsTitle}
        </h3>
        <CompanyStatistics items={statisticsItems} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
          <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <h3 className="text-base font-semibold text-foreground">
              {JOB_DETAIL_META.jobInfoTitle}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {job.description}
            </p>

            <div className="mt-6 border-t border-border pt-6">
              <h4 className="text-sm font-semibold text-foreground">
                {JOB_DETAIL_SECTION_LABELS.responsibilitiesTitle}
              </h4>
              <ul className="mt-3 flex flex-col gap-2">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <h4 className="text-sm font-semibold text-foreground">
                {JOB_DETAIL_SECTION_LABELS.requirementsTitle}
              </h4>
              <ul className="mt-3 flex flex-col gap-2">
                {job.requirements.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <h4 className="text-sm font-semibold text-foreground">
                {JOB_DETAIL_SECTION_LABELS.requiredSkillsTitle}
              </h4>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {job.requiredSkills.map((skill) => (
                  <li key={skill}>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <h4 className="text-sm font-semibold text-foreground">
                {JOB_DETAIL_SECTION_LABELS.preferredSkillsTitle}
              </h4>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {job.preferredSkills.map((skill) => (
                  <li key={skill}>
                    <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <h4 className="text-sm font-semibold text-foreground">
                {JOB_DETAIL_SECTION_LABELS.workConditionsTitle}
              </h4>
              <dl className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {job.workConditions.map((condition) => (
                  <div key={condition.label}>
                    <dt className="text-xs text-muted-foreground">{condition.label}</dt>
                    <dd className="mt-1 text-sm font-medium text-foreground">
                      {condition.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <h4 className="text-sm font-semibold text-foreground">
                {JOB_DETAIL_SECTION_LABELS.benefitsTitle}
              </h4>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {job.benefits.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <h3 className="text-base font-semibold text-foreground">
              {JOB_DETAIL_META.recentApplicationsTitle}
            </h3>
            {job.recentApplicants.length > 0 ? (
              <ul className="mt-4 flex flex-col divide-y divide-border">
                {job.recentApplicants.map((applicant) => (
                  <li
                    key={`${applicant.name}-${applicant.appliedDateLabel}`}
                    className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {applicant.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {applicant.appliedDateLabel}
                      </p>
                    </div>
                    <span
                      className={`w-fit shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        APPLICANT_STATUS_BADGE_STYLES[applicant.status] ??
                        "bg-muted text-muted-foreground"
                      }`}
                    >
                      {applicant.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                まだ応募はありません。
              </p>
            )}
          </section>
        </div>
      </div>
    </DashboardShell>
  );
}
