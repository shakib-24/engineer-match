import { MapPin } from "lucide-react";
import { WORK_STYLE_LABEL } from "@/constants/jobs";
import { ENGINEER_CARD_LABELS } from "@/constants/company-engineers";
import type { EngineerDetail } from "@/lib/company/engineers";

interface EngineerProfileHeroProps {
  engineer: EngineerDetail;
}

export function EngineerProfileHero({ engineer }: EngineerProfileHeroProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex min-w-0 items-start gap-4">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary sm:h-20 sm:w-20 sm:text-2xl"
          aria-hidden="true"
        >
          {engineer.name.trim().charAt(0) || "?"}
        </div>
        <div className="min-w-0">
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {engineer.name}
          </h2>
          <dl className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
            {engineer.prefecture && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <dt className="sr-only">勤務地</dt>
                <dd>{engineer.prefecture}</dd>
              </div>
            )}
            {engineer.yearsOfExperience !== null && (
              <div>
                <dt className="sr-only">経験年数</dt>
                <dd>
                  経験{engineer.yearsOfExperience}
                  {ENGINEER_CARD_LABELS.experienceSuffix}
                </dd>
              </div>
            )}
            {engineer.workStyle && (
              <div>
                <dt className="sr-only">希望の働き方</dt>
                <dd>
                  <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-primary">
                    {WORK_STYLE_LABEL[engineer.workStyle]}
                  </span>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
