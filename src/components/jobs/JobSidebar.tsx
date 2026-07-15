import Link from "next/link";
import { ProfileCompletion } from "@/components/engineer/profile/ProfileCompletion";
import {
  JOB_SIDEBAR_LABELS,
  RECOMMENDED_SKILLS,
  SAVED_JOBS_MOCK,
} from "@/constants/jobs";

export function JobSidebar() {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-base font-semibold text-foreground">
          {JOB_SIDEBAR_LABELS.recommendedSkillsTitle}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {JOB_SIDEBAR_LABELS.recommendedSkillsDescription}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {RECOMMENDED_SKILLS.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-base font-semibold text-foreground">
          {JOB_SIDEBAR_LABELS.savedJobsTitle}
        </h2>
        {SAVED_JOBS_MOCK.length > 0 ? (
          <ul className="mt-4 flex flex-col divide-y divide-border">
            {SAVED_JOBS_MOCK.map((job) => (
              <li key={job.id} className="py-3 first:pt-0 last:pb-0">
                <Link
                  href={`/engineer/jobs/${job.id}`}
                  className="block min-w-0 rounded-lg transition-colors duration-200 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <p className="truncate text-sm font-semibold text-foreground">
                    {job.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {job.company}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            {JOB_SIDEBAR_LABELS.savedJobsEmptyMessage}
          </p>
        )}
      </div>

      <ProfileCompletion />
    </div>
  );
}
