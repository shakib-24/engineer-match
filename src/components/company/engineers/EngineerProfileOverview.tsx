import { UserRound } from "lucide-react";
import { ENGINEER_DETAIL_META, OVERVIEW_LABELS, type Engineer } from "@/constants/company-engineers";

interface EngineerProfileOverviewProps {
  engineer: Engineer;
}

export function EngineerProfileOverview({ engineer }: EngineerProfileOverviewProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <UserRound className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">
          {ENGINEER_DETAIL_META.overviewTitle}
        </h3>
      </div>

      <div className="mt-5">
        <h4 className="text-xs text-muted-foreground">{OVERVIEW_LABELS.introductionTitle}</h4>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {engineer.selfIntroduction}
        </p>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-border pt-6 sm:grid-cols-2">
        <div>
          <dt className="text-xs text-muted-foreground">{OVERVIEW_LABELS.desiredRole}</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">{engineer.title}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">{OVERVIEW_LABELS.desiredContract}</dt>
          <dd className="mt-1 flex flex-wrap gap-1.5">
            {engineer.preferredContractTypes.map((type) => (
              <span
                key={type}
                className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-primary"
              >
                {type}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">{OVERVIEW_LABELS.desiredWorkStyle}</dt>
          <dd className="mt-1 flex flex-wrap gap-1.5">
            {engineer.preferredWorkStyles.map((style) => (
              <span
                key={style}
                className="inline-flex items-center rounded-full border border-border px-2.5 py-1 text-xs font-medium text-foreground"
              >
                {style}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">{OVERVIEW_LABELS.availableFrom}</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">{engineer.availableFrom}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">
            {OVERVIEW_LABELS.expectedAnnualSalary}
          </dt>
          <dd className="mt-1 text-sm font-semibold text-foreground">
            {engineer.expectedAnnualSalary}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">
            {OVERVIEW_LABELS.expectedMonthlyRate}
          </dt>
          <dd className="mt-1 text-sm font-semibold text-foreground">
            {engineer.expectedMonthlyRate}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">
            {OVERVIEW_LABELS.expectedHourlyRate}
          </dt>
          <dd className="mt-1 text-sm font-semibold text-foreground">
            {engineer.expectedHourlyRate}
          </dd>
        </div>
      </dl>
    </section>
  );
}
