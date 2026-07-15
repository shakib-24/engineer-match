import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface JobInfoCardProps {
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
}

export function JobInfoCard({ title, icon: Icon, children }: JobInfoCardProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
        )}
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
