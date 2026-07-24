import { BriefcaseBusiness } from "lucide-react";
import { WorkExperienceTimeline } from "@/components/engineer/profile/WorkExperienceTimeline";
import { EMPLOYMENT_TYPE_OPTIONS, WORK_EXPERIENCE_SECTION } from "@/constants/engineer-profile";

interface WorkExperienceSectionProps {
  workExperiences: {
    id: string;
    companyName: string;
    position: string | null;
    period: string | null;
    employmentType: string | null;
    summary: string | null;
    technologies: string[];
  }[];
}

/** Shared by Company Engineer Detail and Company Applicant Detail. */
export function WorkExperienceSection({ workExperiences }: WorkExperienceSectionProps) {
  if (workExperiences.length === 0) return null;

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <BriefcaseBusiness className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">{WORK_EXPERIENCE_SECTION.title}</h3>
      </div>
      <div className="mt-5">
        <WorkExperienceTimeline
          items={workExperiences.map((item) => ({
            id: item.id,
            companyName: item.companyName,
            position: item.position,
            period: item.period,
            employmentTypeLabel:
              EMPLOYMENT_TYPE_OPTIONS.find((option) => option.value === item.employmentType)?.label ??
              null,
            summary: item.summary,
            technologies: item.technologies,
          }))}
        />
      </div>
    </section>
  );
}
