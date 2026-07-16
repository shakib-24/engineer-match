import { Code2 } from "lucide-react";
import { JOB_DETAIL_SECTION_LABELS } from "@/constants/jobs";

interface RequiredSkillsProps {
  skills: string[];
}

export function RequiredSkills({ skills }: RequiredSkillsProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Code2 className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">
          {JOB_DETAIL_SECTION_LABELS.requiredSkillsTitle}
        </h3>
      </div>
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <li key={skill}>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              {skill}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
