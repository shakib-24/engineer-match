import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  EngineerActionProvider,
  EngineerProfileHero,
  EngineerStickyActions,
} from "@/components/company/engineers/EngineerProfileHero";
import { EngineerProfileOverview } from "@/components/company/engineers/EngineerProfileOverview";
import { EngineerProfileSkills } from "@/components/company/engineers/EngineerProfileSkills";
import { EngineerProfileExperience } from "@/components/company/engineers/EngineerProfileExperience";
import { EngineerProfileCertifications } from "@/components/company/engineers/EngineerProfileCertifications";
import { EngineerProfilePortfolio } from "@/components/company/engineers/EngineerProfilePortfolio";
import { EngineerLanguageSkills } from "@/components/company/engineers/EngineerLanguageSkills";
import { EngineerPreferredConditions } from "@/components/company/engineers/EngineerPreferredConditions";
import { COMPANY_NAV, USER_MENU } from "@/constants/dashboard";
import { ENGINEER_DETAIL_META, ENGINEERS } from "@/constants/company-engineers";

interface EngineerDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return ENGINEERS.map((engineer) => ({ id: engineer.id }));
}

export async function generateMetadata({
  params,
}: EngineerDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const engineer = ENGINEERS.find((item) => item.id === id);

  return {
    title: engineer ? `${engineer.name} | ENGINEER MATCH` : "エンジニア詳細 | ENGINEER MATCH",
  };
}

export default async function CompanyEngineerDetailPage({
  params,
}: EngineerDetailPageProps) {
  const { id } = await params;
  const engineer = ENGINEERS.find((item) => item.id === id);

  if (!engineer) {
    notFound();
  }

  const user = USER_MENU.company;

  return (
    <DashboardShell
      navItems={COMPANY_NAV}
      activeHref="/company/engineers"
      pageTitle="エンジニア詳細"
      userName={user.name}
      userInitials={user.initials}
    >
      <div>
        <Link
          href={ENGINEER_DETAIL_META.backHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {ENGINEER_DETAIL_META.backLabel}
        </Link>
      </div>

      <EngineerActionProvider
        initialFavorited={engineer.isFavorited}
        initialScouted={engineer.isScouted}
      >
        <EngineerProfileHero engineer={engineer} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
            <EngineerProfileOverview engineer={engineer} />
            <EngineerProfileSkills
              technicalSkills={engineer.technicalSkills}
              humanSkills={engineer.humanSkills}
              businessSkills={engineer.businessSkills}
            />
            <EngineerProfileExperience workHistory={engineer.workHistory} />
            <EngineerProfileCertifications certifications={engineer.certifications} />
            <EngineerProfilePortfolio portfolio={engineer.portfolio} />
            <EngineerLanguageSkills languages={engineer.languages} />

            <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {ENGINEER_DETAIL_META.educationTitle}
                </h3>
              </div>
              <dl className="mt-5 flex flex-col gap-4">
                {engineer.education.map((item) => (
                  <div key={item.school}>
                    <dt className="text-sm font-semibold text-foreground">{item.school}</dt>
                    <dd className="mt-0.5 text-xs text-muted-foreground">
                      {item.department} ・ {item.period}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <EngineerPreferredConditions engineer={engineer} />
          </div>

          <div className="lg:sticky lg:top-24 lg:col-span-1 lg:self-start">
            <EngineerStickyActions engineer={engineer} />
          </div>
        </div>
      </EngineerActionProvider>
    </DashboardShell>
  );
}
