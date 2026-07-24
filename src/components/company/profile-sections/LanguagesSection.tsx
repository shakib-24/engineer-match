import { Languages } from "lucide-react";
import { LanguageList } from "@/components/engineer/profile/LanguageList";
import { LANGUAGES_SECTION, LANGUAGE_LEVEL_OPTIONS } from "@/constants/engineer-profile";

interface LanguagesSectionProps {
  languages: { id: string; languageName: string; level: string }[];
}

/** Shared by Company Engineer Detail and Company Applicant Detail. */
export function LanguagesSection({ languages }: LanguagesSectionProps) {
  if (languages.length === 0) return null;

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Languages className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">{LANGUAGES_SECTION.title}</h3>
      </div>
      <div className="mt-5">
        <LanguageList
          items={languages.map((item) => ({
            id: item.id,
            languageName: item.languageName,
            levelLabel:
              LANGUAGE_LEVEL_OPTIONS.find((option) => option.value === item.level)?.label ?? item.level,
          }))}
        />
      </div>
    </section>
  );
}
