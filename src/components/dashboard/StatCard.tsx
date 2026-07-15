import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  helper?: string;
  icon: LucideIcon;
}

export function StatCard({ label, value, helper, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-4 text-3xl font-bold tracking-tight text-foreground">
        {value}
      </p>
      {helper && (
        <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
      )}
    </div>
  );
}
