import { JobCard } from "@/components/jobs/JobCard";
import { JOB_LIST_META, type Job } from "@/constants/jobs";

interface JobListProps {
  jobs: Job[];
}

export function JobList({ jobs }: JobListProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        {jobs.length}
        {JOB_LIST_META.resultsSuffix}
      </p>
      <ul className="flex flex-col gap-4">
        {jobs.map((job) => (
          <li key={job.id}>
            <JobCard job={job} />
          </li>
        ))}
      </ul>
    </div>
  );
}
