import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";
import { AdminApplicationDetailView } from "@/components/admin/applications/AdminApplicationDetailView";
import { ADMIN_NAV, ADMIN_USER } from "@/constants/admin";
import {
  ADMIN_APPLICATIONS,
  ADMIN_APPLICATION_NOT_FOUND,
} from "@/constants/admin-applications";

interface AdminApplicationDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return ADMIN_APPLICATIONS.map((app) => ({ id: app.id }));
}

export async function generateMetadata({
  params,
}: AdminApplicationDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const application = ADMIN_APPLICATIONS.find((item) => item.id === id);
  return {
    title: application
      ? `${application.applicantName} | 応募管理 | ENGINEER MATCH`
      : `応募管理 | ENGINEER MATCH`,
  };
}

export default async function AdminApplicationDetailPage({
  params,
}: AdminApplicationDetailPageProps) {
  const { id } = await params;
  const application = ADMIN_APPLICATIONS.find((item) => item.id === id);

  return (
    <AdminShell
      navItems={ADMIN_NAV}
      activeHref="/admin/applications"
      pageTitle={application ? application.applicantName : ADMIN_APPLICATION_NOT_FOUND.title}
      userName={ADMIN_USER.name}
      userInitials={ADMIN_USER.initials}
    >
      {application ? (
        <AdminApplicationDetailView application={application} />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <AdminEmptyState
            title={ADMIN_APPLICATION_NOT_FOUND.title}
            description={ADMIN_APPLICATION_NOT_FOUND.description}
          />
          <Link
            href={ADMIN_APPLICATION_NOT_FOUND.ctaHref}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {ADMIN_APPLICATION_NOT_FOUND.ctaLabel}
          </Link>
        </div>
      )}
    </AdminShell>
  );
}
