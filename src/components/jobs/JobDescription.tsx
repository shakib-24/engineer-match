import { Briefcase } from "lucide-react";
import { JOB_DETAIL_SECTION_LABELS } from "@/constants/jobs";

interface JobDescriptionProps {
  description: string;
}

export function JobDescription({ description }: JobDescriptionProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Briefcase className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">
          {JOB_DETAIL_SECTION_LABELS.descriptionTitle}
        </h3>
      </div>
      <p className="mt-5 text-sm leading-relaxed whitespace-pre-line text-foreground">
        {description}
      </p>
    </section>
  );
}
