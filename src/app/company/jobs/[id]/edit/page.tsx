import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { EditJobForm } from "@/components/company/EditJobForm";
import { COMPANY_NAV, USER_MENU } from "@/constants/dashboard";
import { COMPANY_JOBS, EDIT_JOB_META } from "@/constants/company-jobs";

interface CompanyEditJobPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return COMPANY_JOBS.map((job) => ({ id: job.id }));
}

export async function generateMetadata({
  params,
}: CompanyEditJobPageProps): Promise<Metadata> {
  const { id } = await params;
  const job = COMPANY_JOBS.find((item) => item.id === id);

  return {
    title: job ? `${job.title}を編集 | ENGINEER MATCH` : "求人を編集 | ENGINEER MATCH",
  };
}

export default async function CompanyEditJobPage({ params }: CompanyEditJobPageProps) {
  const { id } = await params;
  const job = COMPANY_JOBS.find((item) => item.id === id);

  if (!job) {
    notFound();
  }

  const user = USER_MENU.company;

  return (
    <DashboardShell
      navItems={COMPANY_NAV}
      activeHref="/company/jobs"
      pageTitle="求人を編集"
      userName={user.name}
      userInitials={user.initials}
    >
      <div>
        <Link
          href={`/company/jobs/${job.id}`}
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

      <EditJobForm job={job} />
    </DashboardShell>
  );
}
