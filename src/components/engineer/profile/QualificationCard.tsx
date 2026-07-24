import { Award } from "lucide-react";

interface QualificationCardProps {
  name: string;
  organization: string;
  obtainedYear: number | null;
  /** user_qualifications.expiration_date / .no_expiration, per 043_user_qualifications_expiration.sql. */
  expirationDate?: string | null;
  noExpiration?: boolean;
}

export function QualificationCard({
  name,
  organization,
  obtainedYear,
  expirationDate,
  noExpiration,
}: QualificationCardProps) {
  return (
    <div className="flex gap-3 rounded-xl border border-border p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
        <Award className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-foreground">{name}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {organization}
          {obtainedYear && ` ・ 取得年：${obtainedYear}年`}
        </p>
        {(noExpiration || expirationDate) && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            有効期限：{noExpiration ? "なし" : expirationDate}
          </p>
        )}
      </div>
    </div>
  );
}
