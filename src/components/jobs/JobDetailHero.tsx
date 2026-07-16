import { Building2, MapPin } from "lucide-react";
import {
  APPLY_SIDEBAR_LABELS,
  CONTRACT_TYPE_BADGE_STYLES,
  STATUS_BADGE_STYLES,
  WORK_STYLE_BADGE_STYLES,
  type Job,
} from "@/constants/jobs";

interface JobDetailHeroProps {
  job: Job;
}

export function JobDetailHero({ job }: JobDetailHeroProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${CONTRACT_TYPE_BADGE_STYLES[job.contractType]}`}
        >
          {job.contractType}
        </span>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${WORK_STYLE_BADGE_STYLES[job.workStyle]}`}
        >
          {job.workStyle}
        </span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_BADGE_STYLES[job.status]}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
          {job.status}
        </span>
      </div>

      <h2 className="mt-3 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {job.title}
      </h2>

      <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Building2 className="h-4 w-4" aria-hidden="true" />
          <dt className="sr-only">会社名</dt>
          <dd>{job.company}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          <dt className="sr-only">勤務地</dt>
          <dd>{job.location}</dd>
        </div>
        <div>
          <dt className="sr-only">{APPLY_SIDEBAR_LABELS.updatedLabel}</dt>
          <dd>
            {APPLY_SIDEBAR_LABELS.updatedLabel}：{job.updatedLabel}
          </dd>
        </div>
      </dl>

      <p className="mt-4 text-lg font-semibold text-primary">{job.salaryLabel}</p>
    </div>
  );
}
