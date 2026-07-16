import { Settings2 } from "lucide-react";
import {
  ENGINEER_DETAIL_META,
  PREFERRED_CONDITIONS_LABELS,
  type Engineer,
} from "@/constants/company-engineers";

interface EngineerPreferredConditionsProps {
  engineer: Engineer;
}

export function EngineerPreferredConditions({ engineer }: EngineerPreferredConditionsProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Settings2 className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">
          {ENGINEER_DETAIL_META.preferredConditionsTitle}
        </h3>
      </div>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <dt className="text-xs text-muted-foreground">
            {PREFERRED_CONDITIONS_LABELS.contractTypes}
          </dt>
          <dd className="mt-1.5 flex flex-wrap gap-1.5">
            {engineer.preferredContractTypes.map((type) => (
              <span
                key={type}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
              >
                {type}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">
            {PREFERRED_CONDITIONS_LABELS.locations}
          </dt>
          <dd className="mt-1.5 flex flex-wrap gap-1.5">
            {engineer.preferredLocations.map((location) => (
              <span
                key={location}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground"
              >
                {location}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">
            {PREFERRED_CONDITIONS_LABELS.workStyles}
          </dt>
          <dd className="mt-1.5 flex flex-wrap gap-1.5">
            {engineer.preferredWorkStyles.map((style) => (
              <span
                key={style}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground"
              >
                {style}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">
            {PREFERRED_CONDITIONS_LABELS.availability}
          </dt>
          <dd className="mt-1.5 text-sm font-semibold text-foreground">
            {engineer.availability}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">
            {PREFERRED_CONDITIONS_LABELS.availableFrom}
          </dt>
          <dd className="mt-1.5 text-sm font-semibold text-foreground">
            {engineer.availableFrom}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">
            {PREFERRED_CONDITIONS_LABELS.desiredAnnualIncome}
          </dt>
          <dd className="mt-1.5 text-sm font-semibold text-foreground">
            {engineer.expectedAnnualSalary}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">
            {PREFERRED_CONDITIONS_LABELS.desiredMonthlyRate}
          </dt>
          <dd className="mt-1.5 text-sm font-semibold text-foreground">
            {engineer.expectedMonthlyRate}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">
            {PREFERRED_CONDITIONS_LABELS.desiredHourlyRate}
          </dt>
          <dd className="mt-1.5 text-sm font-semibold text-foreground">
            {engineer.expectedHourlyRate}
          </dd>
        </div>
      </dl>
    </section>
  );
}
