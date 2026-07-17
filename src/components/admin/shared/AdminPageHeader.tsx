import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface AdminPageHeaderAction {
  label: string;
  href: string;
  icon?: LucideIcon;
}

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  action?: AdminPageHeaderAction;
}

export function AdminPageHeader({ title, description, action }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {action.icon && <action.icon className="h-4 w-4" aria-hidden="true" />}
          {action.label}
        </Link>
      )}
    </div>
  );
}
