import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AssessmentRunner } from "@/components/engineer/profile/AssessmentRunner";
import { ENGINEER_NAV, USER_MENU } from "@/constants/dashboard";
import { ASSESSMENT_ERROR_LABELS, ASSESSMENT_PAGE_META } from "@/constants/skill-assessment";
import { createClient } from "@/lib/supabase/server";
import { getAssessmentByCode } from "@/lib/engineer/skill-assessments";

interface AssessmentPageProps {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: AssessmentPageProps): Promise<Metadata> {
  const { code } = await params;
  const supabase = await createClient();
  const result = await getAssessmentByCode(supabase, code);

  return {
    title: result ? `${result.assessment.name}診断 | ENGINEER MATCH` : "スキル診断 | ENGINEER MATCH",
  };
}

function InfoState({
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center shadow-sm">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
      <Link
        href={ctaHref}
        className="mt-2 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}

export default async function EngineerSkillAssessmentPage({ params }: AssessmentPageProps) {
  const { code } = await params;
  const user = USER_MENU.engineer;
  const supabase = await createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  const result = authUser ? await getAssessmentByCode(supabase, code) : null;

  return (
    <DashboardShell
      navItems={ENGINEER_NAV}
      activeHref="/engineer/profile"
      pageTitle="スキル診断"
      userName={user.name}
      userInitials={user.initials}
    >
      <div>
        <Link
          href={ASSESSMENT_PAGE_META.backHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {ASSESSMENT_PAGE_META.backLabel}
        </Link>
      </div>

      {!authUser ? (
        <InfoState
          title={ASSESSMENT_ERROR_LABELS.signInRequiredTitle}
          description={ASSESSMENT_ERROR_LABELS.signInRequiredDescription}
          ctaLabel={ASSESSMENT_ERROR_LABELS.signInCtaLabel}
          ctaHref={ASSESSMENT_ERROR_LABELS.signInCtaHref}
        />
      ) : !result ? (
        <InfoState
          title={ASSESSMENT_ERROR_LABELS.notFoundTitle}
          description={ASSESSMENT_ERROR_LABELS.notFoundDescription}
          ctaLabel={ASSESSMENT_PAGE_META.backLabel}
          ctaHref={ASSESSMENT_PAGE_META.backHref}
        />
      ) : (
        <AssessmentRunner
          assessment={result.assessment}
          questions={result.questions}
          userId={authUser.id}
        />
      )}
    </DashboardShell>
  );
}
