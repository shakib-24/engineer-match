import { Briefcase, Mail } from "lucide-react";
import type { CompanyProfile } from "@/lib/company/profile";
import { COMPANY_PROFILE_FORM } from "@/constants/company";

function SectionHeading({
  icon: Icon,
  title,
}: {
  icon: typeof Briefcase;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
    </div>
  );
}

interface CompanyOverviewCardProps {
  profile: CompanyProfile | null;
  accountEmail: string | null;
}

export function CompanyOverviewCard({ profile, accountEmail }: CompanyOverviewCardProps) {
  const hasContactPerson = Boolean(profile?.contact_person);
  const hasEmail = Boolean(accountEmail);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <SectionHeading icon={Briefcase} title="企業紹介" />
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {profile?.business_description || COMPANY_PROFILE_FORM.emptyDescriptionMessage}
      </p>

      {(hasContactPerson || hasEmail) && (
        <div className="mt-8 border-t border-border pt-6">
          <SectionHeading icon={Mail} title="お問い合わせ先" />
          <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {hasContactPerson && (
              <div>
                <dt className="text-xs text-muted-foreground">ご担当者</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">
                  {profile?.contact_person}
                </dd>
              </div>
            )}
            {hasEmail && (
              <div>
                <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  メールアドレス
                </dt>
                <dd className="mt-1 text-sm font-medium text-foreground">
                  <a
                    href={`mailto:${accountEmail}`}
                    className="text-primary underline underline-offset-2 transition-colors duration-200 hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    {accountEmail}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </div>
  );
}
