import Link from "next/link";
import { Award, MapPin } from "lucide-react";
import { EngineerSkillSummary } from "@/components/company/engineers/EngineerSkillSummary";
import { WORK_STYLE_LABEL } from "@/constants/jobs";
import { ENGINEER_CARD_LABELS } from "@/constants/company-engineers";
import type { EngineerSearchListItem } from "@/lib/company/engineers";

interface EngineerCardProps {
  engineer: EngineerSearchListItem;
}

export function EngineerCard({ engineer }: EngineerCardProps) {
  const maxItssLevel = engineer.technicalSkills.reduce(
    (max, skill) => Math.max(max, skill.level ?? 0),
    0,
  );
  const skillNames = engineer.technicalSkills.map((skill) => skill.name);

  return (
    <div className="relative rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex min-w-0 items-start gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary"
          aria-hidden="true"
        >
          {engineer.name.trim().charAt(0) || "?"}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-foreground">{engineer.name}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
            {engineer.prefecture && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {engineer.prefecture}
              </span>
            )}
            {engineer.yearsOfExperience !== null && (
              <span className="text-xs text-muted-foreground">
                経験{engineer.yearsOfExperience}
                {ENGINEER_CARD_LABELS.experienceSuffix}
              </span>
            )}
            {engineer.workStyle && (
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-primary">
                {WORK_STYLE_LABEL[engineer.workStyle]}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3">
        {skillNames.length > 0 ? (
          <EngineerSkillSummary skills={skillNames} maxItssLevel={maxItssLevel} />
        ) : (
          <p className="text-xs text-muted-foreground">{ENGINEER_CARD_LABELS.noSkillsMessage}</p>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {engineer.qualificationCount > 0 && (
          <span className="inline-flex items-center gap-1">
            <Award className="h-3.5 w-3.5" aria-hidden="true" />
            {ENGINEER_CARD_LABELS.qualificationsLabel} {engineer.qualificationCount}件
          </span>
        )}
        {engineer.humanAssessedCount > 0 && (
          <span>
            {ENGINEER_CARD_LABELS.humanSkillLabel} {engineer.humanAssessedCount}
          </span>
        )}
        {engineer.businessAssessedCount > 0 && (
          <span>
            {ENGINEER_CARD_LABELS.businessSkillLabel} {engineer.businessAssessedCount}
          </span>
        )}
      </div>

      <div className="mt-4 flex justify-end border-t border-border pt-4">
        <Link
          href={`/company/engineers/${engineer.id}`}
          className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {ENGINEER_CARD_LABELS.detailLabel}
        </Link>
      </div>
    </div>
  );
}
