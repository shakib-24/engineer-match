interface WorkExperienceTimelineItem {
  id: string;
  companyName: string;
  position: string | null;
  period: string | null;
  employmentTypeLabel: string | null;
  summary: string | null;
  technologies: string[];
}

interface WorkExperienceTimelineProps {
  items: WorkExperienceTimelineItem[];
}

/** Shared between the engineer's own profile page and the company detail view -- restores the old ExperienceTimeline.tsx / EngineerProfileExperience.tsx sharing pattern. */
export function WorkExperienceTimeline({ items }: WorkExperienceTimelineProps) {
  return (
    <ol className="flex flex-col">
      {items.map((item, index) => (
        <li key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
          <div className="flex flex-col items-center">
            <span
              className="mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-primary bg-surface"
              aria-hidden="true"
            />
            {index < items.length - 1 && (
              <span className="mt-1 w-px flex-1 bg-border" aria-hidden="true" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h3 className="text-sm font-semibold text-foreground">{item.position}</h3>
              <span className="text-xs text-muted-foreground">{item.period}</span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {[item.companyName, item.employmentTypeLabel].filter(Boolean).join(" ・ ")}
            </p>
            {item.summary && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
            )}
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
  );
}
