import { FolderGit2 } from "lucide-react";
import { PortfolioProjectCard } from "@/components/engineer/profile/PortfolioProjectCard";
import { PORTFOLIO_SECTION } from "@/constants/engineer-profile";

interface PortfolioSectionProps {
  portfolioProjects: {
    id: string;
    title: string;
    role: string | null;
    description: string | null;
    url: string | null;
    period: string | null;
    technologies: string[];
  }[];
}

/** Shared by Company Engineer Detail and Company Applicant Detail. */
export function PortfolioSection({ portfolioProjects }: PortfolioSectionProps) {
  if (portfolioProjects.length === 0) return null;

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <FolderGit2 className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">{PORTFOLIO_SECTION.title}</h3>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {portfolioProjects.map((project) => (
          <PortfolioProjectCard
            key={project.id}
            title={project.title}
            role={project.role}
            description={project.description}
            technologies={project.technologies}
            url={project.url}
            period={project.period}
          />
        ))}
      </div>
    </section>
  );
}
