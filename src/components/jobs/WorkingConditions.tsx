import { Clock } from "lucide-react";
import { JOB_DETAIL_SECTION_LABELS, type WorkCondition } from "@/constants/jobs";

interface WorkingConditionsProps {
  conditions: WorkCondition[];
}

export function WorkingConditions({ conditions }: WorkingConditionsProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">
          {JOB_DETAIL_SECTION_LABELS.workConditionsTitle}
        </h3>
      </div>
      <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {conditions.map((condition) => (
          <div key={condition.label}>
            <dt className="text-xs text-muted-foreground">{condition.label}</dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {condition.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
