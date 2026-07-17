import Link from "next/link";
import { Flag } from "lucide-react";
import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import {
  ADMIN_APPLICATION_ACTION_LABELS,
  ADMIN_APPLICATION_STATUS_TONE,
  ADMIN_APPLICATION_TABLE_COLUMNS,
  type AdminApplication,
} from "@/constants/admin-applications";

interface AdminApplicationTableProps {
  applications: AdminApplication[];
  onToggleHandled: (id: string) => void;
}

export function AdminApplicationTable({
  applications,
  onToggleHandled,
}: AdminApplicationTableProps) {
  return (
    <AdminDataTable
      columns={[...ADMIN_APPLICATION_TABLE_COLUMNS]}
      caption={ADMIN_APPLICATION_TABLE_COLUMNS.join("、")}
    >
      {applications.map((app) => (
        <tr key={app.id} className="align-top">
          <td className="px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">{app.applicantName}</span>
              {app.hasProblemReport && (
                <Flag className="h-3.5 w-3.5 shrink-0 text-red-500" aria-label="問題報告あり" />
              )}
            </div>
          </td>
          <td className="px-4 py-3">
            <span className="line-clamp-2 max-w-xs text-sm text-foreground">{app.jobTitle}</span>
          </td>
          <td className="px-4 py-3 text-sm whitespace-nowrap text-foreground">{app.company}</td>
          <td className="px-4 py-3 text-sm whitespace-nowrap text-muted-foreground">
            {app.appliedDateLabel}
          </td>
          <td className="px-4 py-3">
            <AdminStatusBadge label={app.status} tone={ADMIN_APPLICATION_STATUS_TONE[app.status]} />
          </td>
          <td className="px-4 py-3 text-sm whitespace-nowrap text-muted-foreground">
            {app.lastUpdatedLabel}
          </td>
          <td className="px-4 py-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Link
                href={`/admin/applications/${app.id}`}
                className="rounded text-xs font-semibold text-primary hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {ADMIN_APPLICATION_ACTION_LABELS.viewDetails}
              </Link>
              <button
                type="button"
                onClick={() => onToggleHandled(app.id)}
                className="rounded text-xs font-semibold text-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {app.handled
                  ? ADMIN_APPLICATION_ACTION_LABELS.markUnhandled
                  : ADMIN_APPLICATION_ACTION_LABELS.markHandled}
              </button>
            </div>
          </td>
        </tr>
      ))}
    </AdminDataTable>
  );
}
