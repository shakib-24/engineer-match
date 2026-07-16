import { FolderGit2 } from "lucide-react";
import { PortfolioCard } from "@/components/engineer/profile/PortfolioCard";
import { ENGINEER_DETAIL_META, type EngineerPortfolioItem } from "@/constants/company-engineers";

interface EngineerProfilePortfolioProps {
  portfolio: EngineerPortfolioItem[];
}

export function EngineerProfilePortfolio({ portfolio }: EngineerProfilePortfolioProps) {
  if (portfolio.length === 0) return null;

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <FolderGit2 className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">
          {ENGINEER_DETAIL_META.portfolioTitle}
        </h3>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {portfolio.map((project) => (
          <PortfolioCard
            key={project.title}
            title={project.title}
            role={project.role}
            description={project.description}
            skills={project.skills}
            url={project.url}
            period={project.period}
          />
        ))}
      </div>
    </section>
  );
}
