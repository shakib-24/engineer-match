import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Award, GraduationCap, StickyNote } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  ApplicantStatusActions,
  ApplicantStatusProvider,
  LiveApplicantStatusBadge,
} from "@/components/company/applicants/ApplicantStatusBadge";
import { LiveApplicantTimeline } from "@/components/company/applicants/ApplicantTimeline";
import { ApplicantProfileCard } from "@/components/company/applicants/ApplicantProfileCard";
import { ApplicantSkills } from "@/components/company/applicants/ApplicantSkills";
import { ApplicantExperience } from "@/components/company/applicants/ApplicantExperience";
import { ApplicantPortfolio } from "@/components/company/applicants/ApplicantPortfolio";
import { ApplicantDocuments } from "@/components/company/applicants/ApplicantDocuments";
import { ApplicantEvaluation } from "@/components/company/applicants/ApplicantEvaluation";
import { COMPANY_NAV, USER_MENU } from "@/constants/dashboard";
import { APPLICANT_DETAIL_META, APPLICANTS } from "@/constants/company-applicants";

interface ApplicantDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return APPLICANTS.map((applicant) => ({ id: applicant.id }));
}

export async function generateMetadata({
  params,
}: ApplicantDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const applicant = APPLICANTS.find((item) => item.id === id);

  return {
    title: applicant ? `${applicant.name} | ENGINEER MATCH` : "応募者詳細 | ENGINEER MATCH",
  };
}

export default async function CompanyApplicantDetailPage({
  params,
}: ApplicantDetailPageProps) {
  const { id } = await params;
  const applicant = APPLICANTS.find((item) => item.id === id);

  if (!applicant) {
    notFound();
  }

  const user = USER_MENU.company;

  return (
    <DashboardShell
      navItems={COMPANY_NAV}
      activeHref="/company/applicants"
      pageTitle="応募者詳細"
      userName={user.name}
      userInitials={user.initials}
    >
      <div>
        <Link
          href={APPLICANT_DETAIL_META.backHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {APPLICANT_DETAIL_META.backLabel}
        </Link>
      </div>

      <ApplicantStatusProvider initialStatus={applicant.status}>
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex min-w-0 items-start gap-4">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary"
                aria-hidden="true"
              >
                {applicant.photoInitials}
              </div>
              <div className="min-w-0">
                <div className="mb-1.5">
                  <LiveApplicantStatusBadge />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {applicant.name}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {applicant.appliedJobTitle} ・ {applicant.company}
                </p>
              </div>
            </div>

            <ApplicantStatusActions />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
            <ApplicantSkills skills={applicant.skills} />
            <ApplicantExperience experience={applicant.experience} />

            <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {APPLICANT_DETAIL_META.educationTitle}
                </h3>
              </div>
              <dl className="mt-5 flex flex-col gap-4">
                {applicant.education.map((item) => (
                  <div key={item.school}>
                    <dt className="text-sm font-semibold text-foreground">
                      {item.school}
                    </dt>
                    <dd className="mt-0.5 text-xs text-muted-foreground">
                      {item.department} ・ {item.period}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {applicant.certifications.length > 0 && (
              <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Award className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">
                    {APPLICANT_DETAIL_META.certificationsTitle}
                  </h3>
                </div>
                <ul className="mt-5 flex flex-col gap-3">
                  {applicant.certifications.map((cert) => (
                    <li key={cert.name} className="rounded-xl border border-border p-4">
                      <p className="text-sm font-semibold text-foreground">{cert.name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {cert.issuer} ・ 取得日：{cert.acquiredDate}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <ApplicantPortfolio portfolio={applicant.portfolio} />
            <ApplicantDocuments documents={applicant.documents} />

            <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <StickyNote className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {APPLICANT_DETAIL_META.notesTitle}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {applicant.notes || "メモはまだありません。"}
              </p>
            </section>
          </div>

          <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:col-span-1 lg:self-start">
            <ApplicantProfileCard applicant={applicant} />
            <LiveApplicantTimeline currentStepIndex={applicant.timelineStepIndex} />
            <ApplicantEvaluation evaluation={applicant.evaluation} />
          </div>
        </div>
      </ApplicantStatusProvider>
    </DashboardShell>
  );
}
