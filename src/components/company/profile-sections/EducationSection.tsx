import { GraduationCap } from "lucide-react";
import { EducationList } from "@/components/engineer/profile/EducationList";
import { EDUCATION_SECTION } from "@/constants/engineer-profile";

interface EducationSectionProps {
  educations: {
    id: string;
    schoolName: string;
    department: string | null;
    period: string | null;
    description: string | null;
  }[];
}

/** Shared by Company Engineer Detail and Company Applicant Detail. */
export function EducationSection({ educations }: EducationSectionProps) {
  if (educations.length === 0) return null;

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">{EDUCATION_SECTION.title}</h3>
      </div>
      <div className="mt-5">
        <EducationList items={educations} />
      </div>
    </section>
  );
}
