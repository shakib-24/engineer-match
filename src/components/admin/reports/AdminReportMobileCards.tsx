import Link from "next/link";
import { AdminMobileCardList } from "@/components/admin/shared/AdminMobileCardList";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import {
  ADMIN_REPORT_ACTION_LABELS,
  ADMIN_REPORT_PRIORITY_TONE,
  ADMIN_REPORT_STATUS_TONE,
  type AdminReport,
} from "@/constants/admin-reports";

interface AdminReportMobileCardsProps {
  reports: AdminReport[];
}

export function AdminReportMobileCards({ reports }: AdminReportMobileCardsProps) {
  return (
    <AdminMobileCardList>
      {reports.map((report) => (
        <div key={report.id} className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-muted-foreground">{report.id}</p>
              <p className="truncate text-sm font-semibold text-foreground">{report.targetLabel}</p>
            </div>
            <AdminStatusBadge label={report.priority} tone={ADMIN_REPORT_PRIORITY_TONE[report.priority]} />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>{report.category}</span>
            <span>・</span>
            <span>通報者：{report.reporterName}</span>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{report.reportedDateLabel}</span>
            <AdminStatusBadge label={report.status} tone={ADMIN_REPORT_STATUS_TONE[report.status]} />
          </div>

          <div className="mt-4 border-t border-border pt-3">
            <Link
              href={`/admin/reports/${report.id}`}
              className="rounded text-xs font-semibold text-primary hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {ADMIN_REPORT_ACTION_LABELS.viewDetails}
            </Link>
          </div>
        </div>
      ))}
    </AdminMobileCardList>
  );
}
