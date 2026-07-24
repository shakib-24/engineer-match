import { FolderGit2 } from "lucide-react";

interface PortfolioProjectCardProps {
  title: string;
  role: string | null;
  description: string | null;
  technologies: string[];
  url: string | null;
  period: string | null;
}

/** Shared between the engineer's own profile page and the company detail view -- restores the old PortfolioCard.tsx sharing pattern. */
export function PortfolioProjectCard({
  title,
  role,
  description,
  technologies,
  url,
  period,
}: PortfolioProjectCardProps) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border p-4">
      <div className="flex items-center gap-2">
        <FolderGit2 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      {role && <p className="mt-1 text-xs font-medium text-primary">{role}</p>}
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      )}
      {technologies.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto space-y-1 pt-4 text-xs">
        {period && <p className="text-muted-foreground">{period}</p>}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-semibold text-primary underline underline-offset-2 transition-colors duration-200 hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {url}
          </a>
        )}
      </div>
    </div>
  );
}
