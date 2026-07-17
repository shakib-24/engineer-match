import {
  AlertTriangle,
  CheckCircle2,
  Database,
  HardDrive,
  Lock,
  Radio,
  Server,
  XCircle,
} from "lucide-react";
import { SectionCard } from "@/components/dashboard/SectionCard";
import {
  ADMIN_SYSTEM_STATUS_ICONS,
  ADMIN_SYSTEM_STATUS_ITEMS,
  ADMIN_SYSTEM_STATUS_NOTE,
  ADMIN_SYSTEM_STATUS_SECTION,
  ADMIN_SYSTEM_STATUS_STYLES,
} from "@/constants/admin";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  server: Server,
  database: Database,
  lock: Lock,
  hardDrive: HardDrive,
  radio: Radio,
} as const;

const STATUS_ICON_MAP = {
  checkCircle2: CheckCircle2,
  alertTriangle: AlertTriangle,
  xCircle: XCircle,
} as const;

export function AdminSystemStatus() {
  return (
    <SectionCard
      title={ADMIN_SYSTEM_STATUS_SECTION.title}
      description={ADMIN_SYSTEM_STATUS_SECTION.description}
    >
      <ul className="flex flex-col divide-y divide-border">
        {ADMIN_SYSTEM_STATUS_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP];
          const StatusIcon =
            STATUS_ICON_MAP[
              ADMIN_SYSTEM_STATUS_ICONS[
                item.status
              ] as keyof typeof STATUS_ICON_MAP
            ];
          return (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-4 w-4 text-foreground" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {item.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              </div>
              <span
                className={cn(
                  "inline-flex w-fit shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
                  ADMIN_SYSTEM_STATUS_STYLES[item.status],
                )}
              >
                <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
                {item.status}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-xs text-muted-foreground">
        {ADMIN_SYSTEM_STATUS_NOTE}
      </p>
    </SectionCard>
  );
}
