import { Flag } from "lucide-react";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import {
  ADMIN_REPORT_ACTION_LABELS,
  ADMIN_REPORT_PRIORITY_TONE,
  ADMIN_REPORT_STATUS_TONE,
  type AdminReport,
  type AdminReportStatus,
} from "@/constants/admin-reports";
import type { AdminReportDialogMode } from "@/components/admin/reports/AdminReportStatusDialog";

interface AdminReportDetailHeaderProps {
  report: AdminReport;
  status: AdminReportStatus;
  onAction: (mode: Exclude<AdminReportDialogMode, null>) => void;
}

export function AdminReportDetailHeader({ report, status, onAction }: AdminReportDetailHeaderProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-50"
            aria-hidden="true"
          >
            <Flag className="h-6 w-6 text-red-600" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-foreground">{report.id}</h2>
              <AdminStatusBadge label={report.priority} tone={ADMIN_REPORT_PRIORITY_TONE[report.priority]} />
              <AdminStatusBadge label={status} tone={ADMIN_REPORT_STATUS_TONE[status]} />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{report.category}</p>
            <p className="text-sm text-muted-foreground">対象：{report.targetLabel}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {status === "未対応" && (
            <button
              type="button"
              onClick={() => onAction("startHandling")}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-primary/40 bg-white px-4 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {ADMIN_REPORT_ACTION_LABELS.startHandling}
            </button>
          )}
          <button
            type="button"
            onClick={() => onAction("warn")}
            className="inline-flex h-9 items-center justify-center rounded-xl border border-amber-300 bg-white px-4 text-sm font-semibold text-amber-600 transition-colors duration-200 hover:bg-amber-50 focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {ADMIN_REPORT_ACTION_LABELS.warn}
          </button>
          <button
            type="button"
            onClick={() => onAction("unpublishContent")}
            className="inline-flex h-9 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {ADMIN_REPORT_ACTION_LABELS.unpublishContent}
          </button>
          <button
            type="button"
            onClick={() => onAction("suspendAccount")}
            className="inline-flex h-9 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {ADMIN_REPORT_ACTION_LABELS.suspendAccount}
          </button>
          {status !== "解決済み" && status !== "却下" && (
            <>
              <button
                type="button"
                onClick={() => onAction("dismiss")}
                className="inline-flex h-9 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {ADMIN_REPORT_ACTION_LABELS.dismiss}
              </button>
              <button
                type="button"
                onClick={() => onAction("resolve")}
                className="inline-flex h-9 items-center justify-center rounded-xl border border-emerald-300 bg-white px-4 text-sm font-semibold text-emerald-600 transition-colors duration-200 hover:bg-emerald-50 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {ADMIN_REPORT_ACTION_LABELS.resolve}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
