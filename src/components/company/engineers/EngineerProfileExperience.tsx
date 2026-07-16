import { BriefcaseBusiness } from "lucide-react";
import { ENGINEER_DETAIL_META, type EngineerExperienceItem } from "@/constants/company-engineers";

interface EngineerProfileExperienceProps {
  workHistory: EngineerExperienceItem[];
}

export function EngineerProfileExperience({ workHistory }: EngineerProfileExperienceProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <BriefcaseBusiness className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">
          {ENGINEER_DETAIL_META.experienceTitle}
        </h3>
      </div>

      <ol className="mt-5 flex flex-col">
        {workHistory.map((item, index) => (
          <li
            key={`${item.company}-${item.position}`}
            className="relative flex gap-4 pb-6 last:pb-0"
          >
            <div className="flex flex-col items-center">
              <span
                className="mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-primary bg-surface"
                aria-hidden="true"
              />
              {index < workHistory.length - 1 && (
                <span className="mt-1 w-px flex-1 bg-border" aria-hidden="true" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h4 className="text-sm font-semibold text-foreground">{item.position}</h4>
                <span className="text-xs text-muted-foreground">{item.period}</span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {item.company} ・ {item.employmentType}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.summary}
              </p>
              {item.technologies.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {item.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
