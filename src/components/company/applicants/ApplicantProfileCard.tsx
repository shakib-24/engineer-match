import { Mail, MapPin, Phone } from "lucide-react";
import { ItssBadge } from "@/components/engineer/profile/ItssBadge";
import { APPLICANT_DETAIL_META, type Applicant } from "@/constants/company-applicants";

interface ApplicantProfileCardProps {
  applicant: Applicant;
}

export function ApplicantProfileCard({ applicant }: ApplicantProfileCardProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <h3 className="text-base font-semibold text-foreground">
        {APPLICANT_DETAIL_META.profileSummaryTitle}
      </h3>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {applicant.bio}
      </p>

      <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs text-muted-foreground">現在の職種</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {applicant.currentTitle}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">経験年数</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {applicant.experienceYears}年
          </dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            勤務地
          </dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {applicant.location}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">ITSSレベル</dt>
          <dd className="mt-1.5">
            <ItssBadge level={applicant.itssLevel} size="sm" />
          </dd>
        </div>
        <div className="min-w-0 sm:col-span-2">
          <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            メールアドレス
          </dt>
          <dd className="mt-1 text-sm font-medium text-foreground break-all">
            <a
              href={`mailto:${applicant.email}`}
              className="text-primary underline underline-offset-2 transition-colors duration-200 hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {applicant.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            電話番号
          </dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {applicant.phone}
          </dd>
        </div>
      </dl>
    </section>
  );
}
