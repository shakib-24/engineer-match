import Link from "next/link";
import {
  Briefcase,
  Building2,
  Flag,
  Megaphone,
  Send,
  SlidersHorizontal,
  UserCog,
  UserRound,
} from "lucide-react";
import { SectionCard } from "@/components/dashboard/SectionCard";
import {
  ADMIN_ACTIVITY_TYPE_ICONS,
  ADMIN_ACTIVITY_TYPE_STYLES,
  ADMIN_RECENT_ACTIVITY,
  ADMIN_RECENT_ACTIVITY_SECTION,
} from "@/constants/admin";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  userRound: UserRound,
  building2: Building2,
  briefcase: Briefcase,
  send: Send,
  megaphone: Megaphone,
  flag: Flag,
  userCog: UserCog,
  slidersHorizontal: SlidersHorizontal,
} as const;

export function AdminRecentActivity() {
  return (
    <SectionCard
      title={ADMIN_RECENT_ACTIVITY_SECTION.title}
      description={ADMIN_RECENT_ACTIVITY_SECTION.description}
    >
      <ul className="flex max-h-[32rem] flex-col divide-y divide-border overflow-y-auto">
        {ADMIN_RECENT_ACTIVITY.map((item) => {
          const Icon =
            ICON_MAP[
              ADMIN_ACTIVITY_TYPE_ICONS[item.type] as keyof typeof ICON_MAP
            ];
          return (
            <li key={item.id} className="flex gap-3 py-4 first:pt-0 last:pb-0">
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                  ADMIN_ACTIVITY_TYPE_STYLES[item.type],
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  {item.relatedHref ? (
                    <Link
                      href={item.relatedHref}
                      className="rounded-sm text-sm font-semibold text-foreground hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  )}
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {item.dateLabel}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.description}
                </p>
                <p className="mt-1 text-xs font-medium text-foreground">
                  {item.actor}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}
