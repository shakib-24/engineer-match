import { Phone } from "lucide-react";
import { PERSONAL_INFO_LABELS } from "@/constants/engineer-profile";

interface ContactDetailsSectionProps {
  phone: string | null;
  nearestStation: string | null;
}

/**
 * Company Applicant Detail ONLY -- never rendered on Company Engineer Search
 * or Company Engineer Detail (pre-application discovery). Shows phone +
 * nearest station only -- birth date and gender (engineer_personal_info)
 * are never company-visible at all, applicant or not, and have no
 * corresponding section here by design.
 */
export function ContactDetailsSection({ phone, nearestStation }: ContactDetailsSectionProps) {
  if (!phone && !nearestStation) return null;

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">連絡先</h3>
      </div>
      <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {phone && (
          <div>
            <dt className="text-xs text-muted-foreground">{PERSONAL_INFO_LABELS.phone}</dt>
            <dd className="mt-1 text-sm font-medium text-foreground">{phone}</dd>
          </div>
        )}
        {nearestStation && (
          <div>
            <dt className="text-xs text-muted-foreground">{PERSONAL_INFO_LABELS.nearestStation}</dt>
            <dd className="mt-1 text-sm font-medium text-foreground">{nearestStation}</dd>
          </div>
        )}
      </dl>
    </section>
  );
}
