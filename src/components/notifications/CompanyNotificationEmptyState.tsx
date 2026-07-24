import { BellOff } from "lucide-react";
import { COMPANY_NOTIFICATION_EMPTY_STATE_LABELS } from "@/constants/company-notifications";

export function CompanyNotificationEmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <BellOff className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">
          {COMPANY_NOTIFICATION_EMPTY_STATE_LABELS.title}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {COMPANY_NOTIFICATION_EMPTY_STATE_LABELS.description}
        </p>
      </div>
    </div>
  );
}
