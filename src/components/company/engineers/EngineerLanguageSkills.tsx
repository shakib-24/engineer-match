import { Languages } from "lucide-react";
import { ENGINEER_DETAIL_META, type EngineerLanguage } from "@/constants/company-engineers";

interface EngineerLanguageSkillsProps {
  languages: EngineerLanguage[];
}

export function EngineerLanguageSkills({ languages }: EngineerLanguageSkillsProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Languages className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">
          {ENGINEER_DETAIL_META.languagesTitle}
        </h3>
      </div>
      <ul className="mt-5 flex flex-col gap-3">
        {languages.map((language) => (
          <li
            key={language.name}
            className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3"
          >
            <span className="text-sm font-medium text-foreground">{language.name}</span>
            <span className="text-xs text-muted-foreground">{language.level}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
