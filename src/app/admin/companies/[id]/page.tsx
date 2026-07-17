import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";
import { AdminCompanyDetailView } from "@/components/admin/companies/AdminCompanyDetailView";
import { ADMIN_NAV, ADMIN_USER } from "@/constants/admin";
import { ADMIN_COMPANIES, ADMIN_COMPANY_NOT_FOUND } from "@/constants/admin-companies";

interface AdminCompanyDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return ADMIN_COMPANIES.map((company) => ({ id: company.id }));
}

export async function generateMetadata({
  params,
}: AdminCompanyDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const company = ADMIN_COMPANIES.find((item) => item.id === id);
  return {
    title: company
      ? `${company.name} | 企業管理 | ENGINEER MATCH`
      : `企業管理 | ENGINEER MATCH`,
  };
}

export default async function AdminCompanyDetailPage({
  params,
}: AdminCompanyDetailPageProps) {
  const { id } = await params;
  const company = ADMIN_COMPANIES.find((item) => item.id === id);

  return (
    <AdminShell
      navItems={ADMIN_NAV}
      activeHref="/admin/companies"
      pageTitle={company ? company.name : ADMIN_COMPANY_NOT_FOUND.title}
      userName={ADMIN_USER.name}
      userInitials={ADMIN_USER.initials}
    >
      {company ? (
        <AdminCompanyDetailView company={company} />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <AdminEmptyState
            title={ADMIN_COMPANY_NOT_FOUND.title}
            description={ADMIN_COMPANY_NOT_FOUND.description}
          />
          <Link
            href={ADMIN_COMPANY_NOT_FOUND.ctaHref}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {ADMIN_COMPANY_NOT_FOUND.ctaLabel}
          </Link>
        </div>
      )}
    </AdminShell>
  );
}
