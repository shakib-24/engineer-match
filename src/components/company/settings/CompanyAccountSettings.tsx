import Link from "next/link";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { COMPANY_ACCOUNT_SETTINGS } from "@/constants/company-settings";

interface CompanyAccountSettingsProps {
  companyName: string | null;
  contactPerson: string | null;
  email: string;
}

export function CompanyAccountSettings({
  companyName,
  contactPerson,
  email,
}: CompanyAccountSettingsProps) {
  return (
    <SectionCard
      title={COMPANY_ACCOUNT_SETTINGS.title}
      description={COMPANY_ACCOUNT_SETTINGS.description}
    >
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <dt className="text-xs text-muted-foreground">{COMPANY_ACCOUNT_SETTINGS.companyNameLabel}</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {companyName || COMPANY_ACCOUNT_SETTINGS.unset}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">{COMPANY_ACCOUNT_SETTINGS.contactPersonLabel}</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {contactPerson || COMPANY_ACCOUNT_SETTINGS.unset}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">{COMPANY_ACCOUNT_SETTINGS.emailLabel}</dt>
          <dd className="mt-1 truncate text-sm font-medium text-foreground">{email}</dd>
        </div>
      </dl>

      <p className="mt-5 text-xs text-muted-foreground">{COMPANY_ACCOUNT_SETTINGS.editHint}</p>
      <Link
        href={COMPANY_ACCOUNT_SETTINGS.editLinkHref}
        className="mt-2 inline-flex h-9 w-fit items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {COMPANY_ACCOUNT_SETTINGS.editLinkLabel}
      </Link>
    </SectionCard>
  );
}
