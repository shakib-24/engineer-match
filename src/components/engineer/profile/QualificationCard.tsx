import { Award } from "lucide-react";

interface QualificationCardProps {
  name: string;
  organization: string;
  obtainedYear: number | null;
}

export function QualificationCard({ name, organization, obtainedYear }: QualificationCardProps) {
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
      </div>
    </div>
  );
}
