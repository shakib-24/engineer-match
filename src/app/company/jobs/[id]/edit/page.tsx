import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { EditJobForm } from "@/components/company/EditJobForm";
import { COMPANY_NAV } from "@/constants/dashboard";
import { EDIT_JOB_META } from "@/constants/company-jobs";
import { createClient } from "@/lib/supabase/server";
import { getCompanyOpportunity, listSkills } from "@/lib/company/jobs";
import { getCompanyHeaderIdentity } from "@/lib/company/profile";

interface CompanyEditJobPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CompanyEditJobPageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const detail = user ? await getCompanyOpportunity(supabase, user.id, id) : null;

  return {
    title: detail
      ? `${detail.opportunity.title}を編集 | ENGINEER MATCH`
      : "求人を編集 | ENGINEER MATCH",
  };
}

export default async function CompanyEditJobPage({ params }: CompanyEditJobPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  const detail = authUser ? await getCompanyOpportunity(supabase, authUser.id, id) : null;

  if (!detail) {
    notFound();
  }

  const [skills, identity] = await Promise.all([
    listSkills(supabase),
    getCompanyHeaderIdentity(supabase, authUser),
  ]);

  return (
    <DashboardShell
      navItems={COMPANY_NAV}
      activeHref="/company/jobs"
      pageTitle="求人を編集"
      userName={identity.name}
      userInitials={identity.initials}
      userEmail={identity.email}
    >
      <div>
        <Link
          href={`/company/jobs/${detail.opportunity.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          求人詳細に戻る
        </Link>
      </div>

      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {EDIT_JOB_META.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{EDIT_JOB_META.description}</p>
      </div>

      <EditJobForm detail={detail} skills={skills} />
    </DashboardShell>
  );
}
