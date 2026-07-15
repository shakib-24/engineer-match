import { Building2 } from "lucide-react";
import {
  COMPANY_CARD_LABELS,
  JOB_DETAIL_SECTION_LABELS,
  type Job,
} from "@/constants/jobs";

interface CompanyCardProps {
  job: Job;
}

export function CompanyCard({ job }: CompanyCardProps) {
  const { companyInfo } = job;

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-base font-bold text-primary"
          aria-hidden="true"
        >
          {job.companyInitials}
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">
            {JOB_DETAIL_SECTION_LABELS.companyInfoTitle}
          </h3>
          <p className="text-sm text-muted-foreground">{job.company}</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {companyInfo.description}
      </p>

      <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs text-muted-foreground">
            {COMPANY_CARD_LABELS.businessLabel}
          </dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {companyInfo.business}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">
            {COMPANY_CARD_LABELS.employeesLabel}
          </dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {companyInfo.employees}
          </dd>
        </div>
        <div className="min-w-0 sm:col-span-2">
          <dt className="text-xs text-muted-foreground">
            {COMPANY_CARD_LABELS.websiteLabel}
          </dt>
          <dd className="mt-1 truncate text-sm font-medium">
            <a
              href={companyInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary underline underline-offset-2 transition-colors duration-200 hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <Building2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{companyInfo.website}</span>
            </a>
          </dd>
        </div>
      </dl>
    </section>
  );
}
