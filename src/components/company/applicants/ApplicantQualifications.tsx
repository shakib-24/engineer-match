import { Award } from "lucide-react";
import { APPLICANT_DETAIL_META } from "@/constants/company-applicants";

interface QualificationItem {
  name: string;
  organization: string;
  obtainedYear: number | null;
  expirationDate?: string | null;
  noExpiration?: boolean;
}

interface ApplicantQualificationsProps {
  qualifications: QualificationItem[];
}

export function ApplicantQualifications({ qualifications }: ApplicantQualificationsProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Award className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">
          {APPLICANT_DETAIL_META.qualificationsTitle}
        </h3>
      </div>
      {qualifications.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          {APPLICANT_DETAIL_META.noQualificationsMessage}
        </p>
      ) : (
        <ul className="mt-5 flex flex-col gap-3">
          {qualifications.map((qualification) => (
            <li
              key={`${qualification.organization}-${qualification.name}`}
              className="rounded-xl border border-border p-4"
            >
              <p className="text-sm font-semibold text-foreground">{qualification.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {qualification.organization}
                {qualification.obtainedYear && ` ・ 取得年：${qualification.obtainedYear}年`}
              </p>
              {(qualification.noExpiration || qualification.expirationDate) && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  有効期限：{qualification.noExpiration ? "なし" : qualification.expirationDate}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
