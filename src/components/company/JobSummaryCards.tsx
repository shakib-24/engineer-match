import { Archive, Briefcase, FilePenLine, Users } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  APPLICANTS_SUMMARY_CARD,
  JOB_SUMMARY_CARD_META,
  type CompanyJob,
} from "@/constants/company-jobs";

const ICON_MAP = {
  briefcase: Briefcase,
  archive: Archive,
  filePenLine: FilePenLine,
  users: Users,
} as const;

interface JobSummaryCardsProps {
  jobs: CompanyJob[];
}

export function JobSummaryCards({ jobs }: JobSummaryCardsProps) {
  const totalApplicants = jobs.reduce((sum, job) => sum + job.applicantCount, 0);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {JOB_SUMMARY_CARD_META.map((card) => {
        const count = jobs.filter((job) => card.statuses.includes(job.status)).length;
        return (
          <StatCard
            key={card.key}
            label={card.label}
            value={String(count)}
            icon={ICON_MAP[card.icon as keyof typeof ICON_MAP]}
          />
        );
      })}
      <StatCard
        label={APPLICANTS_SUMMARY_CARD.label}
        value={String(totalApplicants)}
        icon={ICON_MAP[APPLICANTS_SUMMARY_CARD.icon as keyof typeof ICON_MAP]}
      />
    </div>
  );
}
