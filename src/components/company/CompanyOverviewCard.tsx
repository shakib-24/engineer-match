import { Briefcase, Gift, Mail, Phone, ShieldCheck, Target } from "lucide-react";
import { COMPANY_PROFILE } from "@/constants/company";

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

export function CompanyOverviewCard() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <SectionHeading icon={Briefcase} title="企業紹介" />
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {COMPANY_PROFILE.introduction}
      </p>

      <div className="mt-8 border-t border-border pt-6">
        <SectionHeading icon={Target} title="事業内容" />
        <ul className="mt-4 flex flex-col gap-2">
          {COMPANY_PROFILE.businessAreas.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <SectionHeading icon={ShieldCheck} title="採用方針" />
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {COMPANY_PROFILE.recruitmentPolicy}
        </p>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <SectionHeading icon={Gift} title="福利厚生" />
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {COMPANY_PROFILE.benefits.map((item) => (
            <li
              key={item}
              className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <SectionHeading icon={Mail} title="お問い合わせ先" />
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-muted-foreground">担当部署</dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {COMPANY_PROFILE.contact.department}
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              電話番号
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {COMPANY_PROFILE.contact.phone}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              メールアドレス
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              <a
                href={`mailto:${COMPANY_PROFILE.contact.email}`}
                className="text-primary underline underline-offset-2 transition-colors duration-200 hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {COMPANY_PROFILE.contact.email}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
