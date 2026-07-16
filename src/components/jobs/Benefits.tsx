import { Gift } from "lucide-react";
import { JOB_DETAIL_SECTION_LABELS } from "@/constants/jobs";

interface BenefitsProps {
  benefits: string[];
}

export function Benefits({ benefits }: BenefitsProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Gift className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">
          {JOB_DETAIL_SECTION_LABELS.benefitsTitle}
        </h3>
      </div>
      <ul className="mt-5 flex flex-col gap-2">
        {benefits.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-foreground">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
