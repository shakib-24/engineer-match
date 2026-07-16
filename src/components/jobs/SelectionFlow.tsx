import { ShieldCheck } from "lucide-react";
import { JOB_DETAIL_SECTION_LABELS } from "@/constants/jobs";

interface SelectionFlowProps {
  steps: string[];
}

export function SelectionFlow({ steps }: SelectionFlowProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">
          {JOB_DETAIL_SECTION_LABELS.selectionFlowTitle}
        </h3>
      </div>
      <ol className="mt-5 flex flex-col gap-3">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {index + 1}
            </span>
            <span className="text-sm text-foreground">{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
