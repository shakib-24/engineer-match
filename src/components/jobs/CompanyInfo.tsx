import { Building2 } from "lucide-react";
import { COMPANY_INFO_LABELS, JOB_DETAIL_SECTION_LABELS } from "@/constants/jobs";
import type { CompanyProfile } from "@/lib/company/profile";

interface CompanyInfoProps {
  company: CompanyProfile;
}

export function CompanyInfo({ company }: CompanyInfoProps) {
  const companyInitial = company.company_name.slice(0, 1);

  const allRows: { label: string; value: string | null }[] = [
    { label: COMPANY_INFO_LABELS.businessLabel, value: company.business_description },
    { label: COMPANY_INFO_LABELS.industryLabel, value: company.industry },
    { label: COMPANY_INFO_LABELS.employeesLabel, value: company.company_size },
    { label: COMPANY_INFO_LABELS.prefectureLabel, value: company.prefecture },
    {
      label: COMPANY_INFO_LABELS.establishedYearLabel,
      value: company.established_year ? `${company.established_year}年` : null,
    },
  ];
  const rows = allRows.filter(
    (row): row is { label: string; value: string } => Boolean(row.value),
  );

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-base font-bold text-primary"
          aria-hidden="true"
        >
          {companyInitial}
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">
            {JOB_DETAIL_SECTION_LABELS.companyInfoTitle}
          </h3>
          <p className="text-sm text-muted-foreground">{company.company_name}</p>
        </div>
      </div>

      {rows.length > 0 && (
        <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {rows.map((row) => (
            <div key={row.label}>
              <dt className="text-xs text-muted-foreground">{row.label}</dt>
              <dd className="mt-1 text-sm font-medium text-foreground">{row.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {company.website_url && (
        <div className="mt-5 min-w-0">
          <dt className="text-xs text-muted-foreground">{COMPANY_INFO_LABELS.websiteLabel}</dt>
          <dd className="mt-1 truncate text-sm font-medium">
            <a
              href={company.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary underline underline-offset-2 transition-colors duration-200 hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <Building2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{company.website_url}</span>
            </a>
          </dd>
        </div>
      )}
    </section>
  );
}
