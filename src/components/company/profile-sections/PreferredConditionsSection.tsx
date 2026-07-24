import { Settings2 } from "lucide-react";
import { PreferredConditionsDisplay } from "@/components/engineer/profile/PreferredConditionsDisplay";
import { CONTRACT_TYPE_OPTIONS } from "@/constants/engineer-profile";
import { WORK_STYLE_LABEL } from "@/constants/jobs";

interface PreferredConditionsSectionProps {
  preferredContractTypes: string[];
  preferredLocations: string[];
  workStyle: "REMOTE" | "ONSITE" | "HYBRID" | null;
  availableFrom: string | null;
  desiredRateMin: number | null;
  desiredRateMax: number | null;
  desiredAnnualIncomeMin: number | null;
  desiredAnnualIncomeMax: number | null;
  desiredHourlyRateMin: number | null;
  desiredHourlyRateMax: number | null;
}

/** Shared by Company Engineer Detail and Company Applicant Detail. */
export function PreferredConditionsSection({
  preferredContractTypes,
  preferredLocations,
  workStyle,
  availableFrom,
  desiredRateMin,
  desiredRateMax,
  desiredAnnualIncomeMin,
  desiredAnnualIncomeMax,
  desiredHourlyRateMin,
  desiredHourlyRateMax,
}: PreferredConditionsSectionProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Settings2 className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">希望条件</h3>
      </div>
      <div className="mt-5">
        <PreferredConditionsDisplay
          contractTypeLabels={preferredContractTypes.flatMap((type) => {
            const label = CONTRACT_TYPE_OPTIONS.find((option) => option.value === type)?.label;
            return label ? [label] : [];
          })}
          locations={preferredLocations}
          workStyleLabel={workStyle ? WORK_STYLE_LABEL[workStyle] : null}
          availableFrom={availableFrom}
          desiredRateMin={desiredRateMin}
          desiredRateMax={desiredRateMax}
          desiredAnnualIncomeMin={desiredAnnualIncomeMin}
          desiredAnnualIncomeMax={desiredAnnualIncomeMax}
          desiredHourlyRateMin={desiredHourlyRateMin}
          desiredHourlyRateMax={desiredHourlyRateMax}
        />
      </div>
    </section>
  );
}
