import Link from "next/link";
import { Briefcase, Building2, ListChecks, ShieldAlert, Users } from "lucide-react";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { ADMIN_QUICK_ACTIONS } from "@/constants/admin";

const ICON_MAP = {
  users: Users,
  building2: Building2,
  briefcase: Briefcase,
  listChecks: ListChecks,
  shieldAlert: ShieldAlert,
} as const;

export function AdminQuickActions() {
  return (
    <SectionCard title={ADMIN_QUICK_ACTIONS.title}>
      <div className="flex flex-col gap-3">
        {ADMIN_QUICK_ACTIONS.items.map((action) => {
          const Icon = ICON_MAP[action.icon as keyof typeof ICON_MAP];
          return (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center gap-3 rounded-xl border border-border p-3 text-sm font-medium text-foreground transition-colors duration-200 hover:border-primary/40 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              {action.label}
            </Link>
          );
        })}
      </div>
    </SectionCard>
  );
}
