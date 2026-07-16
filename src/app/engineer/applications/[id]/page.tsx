import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, CalendarDays } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ApplicationHistoryTable } from "@/components/applications/ApplicationHistoryTable";
import { ApplicationSummary } from "@/components/applications/ApplicationSummary";
import {
  ApplicationSidebar,
  ApplicationStatusProvider,
  HeroStatusBadge,
  HeroTimeline,
} from "@/components/applications/ApplicationSidebar";
import { ENGINEER_NAV, USER_MENU } from "@/constants/dashboard";
import {
  APPLICATIONS,
  APPLICATION_LIST_META,
  COMPANY_INFO_LABELS,
  DETAIL_META,
} from "@/constants/applications";

interface ApplicationDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return APPLICATIONS.map((application) => ({ id: application.id }));
}

export async function generateMetadata({
  params,
}: ApplicationDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const application = APPLICATIONS.find((item) => item.id === id);

  return {
    title: application
      ? `${application.jobTitle} | ENGINEER MATCH`
      : "応募詳細 | ENGINEER MATCH",
  };
}

export default async function EngineerApplicationDetailPage({
  params,
}: ApplicationDetailPageProps) {
  const { id } = await params;
  const application = APPLICATIONS.find((item) => item.id === id);

  if (!application) {
    notFound();
  }

  const user = USER_MENU.engineer;

  return (
    <DashboardShell
      navItems={ENGINEER_NAV}
      activeHref="/engineer/applications"
      pageTitle="応募詳細"
      userName={user.name}
      userInitials={user.initials}
    >
      <div>
        <Link
          href={DETAIL_META.backHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {DETAIL_META.backLabel}
        </Link>
      </div>

      <ApplicationStatusProvider initialStatus={application.status}>
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
          <HeroStatusBadge />

          <h2 className="mt-3 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {application.jobTitle}
          </h2>

          <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4" aria-hidden="true" />
              <dt className="sr-only">会社名</dt>
              <dd>{application.company}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              <dt className="sr-only">{APPLICATION_LIST_META.appliedPrefix}</dt>
              <dd>
                {APPLICATION_LIST_META.appliedPrefix}
                {application.appliedDateLabel}
              </dd>
            </div>
          </dl>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
            <HeroTimeline currentStepIndex={application.timelineStepIndex} />
            <ApplicationHistoryTable entries={application.timeline} />
            <ApplicationSummary application={application} />

            <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-base font-bold text-primary"
                  aria-hidden="true"
                >
                  {application.companyInitials}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {DETAIL_META.companyInfoTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground">{application.company}</p>
                </div>
              </div>

              <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-muted-foreground">
                    {COMPANY_INFO_LABELS.industryLabel}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">
                    {application.companyInfo.industry}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">
                    {COMPANY_INFO_LABELS.employeesLabel}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">
                    {application.companyInfo.employees}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">
                    {COMPANY_INFO_LABELS.locationLabel}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">
                    {application.companyInfo.location}
                  </dd>
                </div>
                <div className="min-w-0">
                  <dt className="text-xs text-muted-foreground">
                    {COMPANY_INFO_LABELS.websiteLabel}
                  </dt>
                  <dd className="mt-1 truncate text-sm font-medium">
                    <a
                      href={application.companyInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-primary underline underline-offset-2 transition-colors duration-200 hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      <Building2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span className="truncate">{application.companyInfo.website}</span>
                    </a>
                  </dd>
                </div>
              </dl>
            </section>
          </div>

          <div className="lg:sticky lg:top-24 lg:col-span-1 lg:self-start">
            <ApplicationSidebar application={application} />
          </div>
        </div>
      </ApplicationStatusProvider>
    </DashboardShell>
  );
}
