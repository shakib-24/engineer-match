import { Award } from "lucide-react";

interface CertificationCardProps {
  name: string;
  issuer: string;
  acquiredDate: string;
  expirationDate?: string | null;
}

export function CertificationCard({
  name,
  issuer,
  acquiredDate,
  expirationDate,
}: CertificationCardProps) {
  return (
    <div className="flex gap-3 rounded-xl border border-border p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
        <Award className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-foreground">{name}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">{issuer}</p>
        <dl className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <dt>取得日：</dt>
            <dd>{acquiredDate}</dd>
          </div>
          <div className="flex items-center gap-1">
            <dt>有効期限：</dt>
            <dd>{expirationDate ?? "なし"}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
