import { FolderGit2 } from "lucide-react";

interface PortfolioCardProps {
  title: string;
  role: string;
  description: string;
  skills: readonly string[];
  url: string;
  period: string;
}

export function PortfolioCard({
  title,
  role,
  description,
  skills,
  url,
  period,
}: PortfolioCardProps) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border p-4">
      <div className="flex items-center gap-2">
        <FolderGit2 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <p className="mt-1 text-xs font-medium text-primary">{role}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
          >
            {skill}
          </li>
        ))}
      </ul>
      <div className="mt-auto space-y-1 pt-4 text-xs">
        <p className="text-muted-foreground">{period}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-semibold text-primary underline underline-offset-2 transition-colors duration-200 hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {url}
        </a>
      </div>
    </div>
  );
}
