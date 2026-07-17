import Link from "next/link";
import { Flag } from "lucide-react";
import { AdminMobileCardList } from "@/components/admin/shared/AdminMobileCardList";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import {
  ADMIN_APPLICATION_ACTION_LABELS,
  ADMIN_APPLICATION_STATUS_TONE,
  type AdminApplication,
} from "@/constants/admin-applications";

interface AdminApplicationMobileCardsProps {
  applications: AdminApplication[];
  onToggleHandled: (id: string) => void;
}

export function AdminApplicationMobileCards({
  applications,
  onToggleHandled,
}: AdminApplicationMobileCardsProps) {
  return (
    <AdminMobileCardList>
      {applications.map((app) => (
        <div key={app.id} className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-foreground">
                  {app.applicantName}
                </p>
                {app.hasProblemReport && (
                  <Flag className="h-3.5 w-3.5 shrink-0 text-red-500" aria-label="問題報告あり" />
                )}
              </div>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{app.jobTitle}</p>
            </div>
            <AdminStatusBadge label={app.status} tone={ADMIN_APPLICATION_STATUS_TONE[app.status]} />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>{app.company}</span>
            <span>{app.appliedDateLabel}</span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-3">
            <Link
              href={`/admin/applications/${app.id}`}
              className="rounded text-xs font-semibold text-primary hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {ADMIN_APPLICATION_ACTION_LABELS.viewDetails}
            </Link>
            <button
              type="button"
              onClick={() => onToggleHandled(app.id)}
              className="rounded text-xs font-semibold text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {app.handled
                ? ADMIN_APPLICATION_ACTION_LABELS.markUnhandled
                : ADMIN_APPLICATION_ACTION_LABELS.markHandled}
            </button>
          </div>
        </div>
      ))}
    </AdminMobileCardList>
  );
}
