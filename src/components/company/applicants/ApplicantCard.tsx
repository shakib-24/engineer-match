import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { ItssBadge } from "@/components/engineer/profile/ItssBadge";
import { ApplicantStatusBadge } from "@/components/company/applicants/ApplicantStatusBadge";
import { APPLICANT_LIST_META, type Applicant } from "@/constants/company-applicants";

interface ApplicantCardProps {
  applicant: Applicant;
}

export function ApplicantCard({ applicant }: ApplicantCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary"
            aria-hidden="true"
          >
            {applicant.photoInitials}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-foreground">
              {applicant.name}
            </h3>
            <p className="mt-0.5 truncate text-sm text-muted-foreground">
              {applicant.appliedJobTitle}
            </p>
          </div>
        </div>
        <ApplicantStatusBadge status={applicant.status} className="shrink-0" />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5">
        <span className="text-xs text-muted-foreground">
          経験 {applicant.experienceYears}年
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {applicant.location}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <ItssBadge level={applicant.itssLevel} size="sm" />
          ITSSレベル{applicant.itssLevel}
        </span>
      </div>

      <ul className="mt-3 flex flex-wrap gap-1.5">
        {applicant.skills.slice(0, 5).map((skill) => (
          <li
            key={skill}
            className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
          >
            {skill}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
          {APPLICANT_LIST_META.appliedPrefix}
          {applicant.appliedDateLabel}
        </span>
        <Link
          href={`/company/applicants/${applicant.id}`}
          className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {APPLICANT_LIST_META.detailButtonLabel}
        </Link>
      </div>
    </div>
  );
}
