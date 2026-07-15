interface ExperienceItem {
  readonly company: string;
  readonly position: string;
  readonly period: string;
  readonly employmentType: string;
  readonly summary: string;
  readonly technologies: readonly string[];
}

interface ExperienceTimelineProps {
  items: readonly ExperienceItem[];
}

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  return (
    <ol className="flex flex-col">
      {items.map((item, index) => (
        <li
          key={`${item.company}-${item.position}`}
          className="relative flex gap-4 pb-6 last:pb-0"
        >
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
              <h3 className="text-sm font-semibold text-foreground">
                {item.position}
              </h3>
              <span className="text-xs text-muted-foreground">{item.period}</span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {item.company} ・ {item.employmentType}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.summary}
            </p>
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
          </div>
        </li>
      ))}
    </ol>
  );
}
