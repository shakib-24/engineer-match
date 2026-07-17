import type { ReactNode } from "react";

interface AdminDetailSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function AdminDetailSection({
  title,
  description,
  children,
}: AdminDetailSectionProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-7">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
      <div className="mt-4">{children}</div>
    </section>
  );
}

interface AdminDetailFieldProps {
  label: string;
  value: ReactNode;
}

export function AdminDetailField({ label, value }: AdminDetailFieldProps) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 truncate text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

export function AdminDetailGrid({ children }: { children: ReactNode }) {
  return <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</dl>;
}
