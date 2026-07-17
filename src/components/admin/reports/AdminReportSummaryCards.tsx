import { AlertTriangle, CheckCircle2, Clock, Flag, Loader2, Sparkles } from "lucide-react";
import { AdminSummaryCard } from "@/components/admin/shared/AdminSummaryCard";
import { ADMIN_REPORT_SUMMARY_LABELS, type AdminReport } from "@/constants/admin-reports";

const CURRENT_MONTH_PREFIX = "2026-07";

interface AdminReportSummaryCardsProps {
  reports: AdminReport[];
}

export function AdminReportSummaryCards({ reports }: AdminReportSummaryCardsProps) {
  const total = reports.length;
  const unhandled = reports.filter((r) => r.status === "未対応").length;
  const inProgress = reports.filter((r) => r.status === "対応中").length;
  const resolved = reports.filter((r) => r.status === "解決済み").length;
  const urgent = reports.filter((r) => r.priority === "緊急").length;
  const thisMonth = reports.filter((r) => r.reportedDateISO.startsWith(CURRENT_MONTH_PREFIX)).length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <AdminSummaryCard label={ADMIN_REPORT_SUMMARY_LABELS.total} value={`${total}件`} icon={Flag} />
      <AdminSummaryCard
        label={ADMIN_REPORT_SUMMARY_LABELS.unhandled}
        value={`${unhandled}件`}
        icon={Clock}
        tone="negative"
      />
      <AdminSummaryCard
        label={ADMIN_REPORT_SUMMARY_LABELS.inProgress}
        value={`${inProgress}件`}
        icon={Loader2}
        tone="warning"
      />
      <AdminSummaryCard
        label={ADMIN_REPORT_SUMMARY_LABELS.resolved}
        value={`${resolved}件`}
        icon={CheckCircle2}
        tone="positive"
      />
      <AdminSummaryCard
        label={ADMIN_REPORT_SUMMARY_LABELS.urgent}
        value={`${urgent}件`}
        icon={AlertTriangle}
        tone="negative"
      />
      <AdminSummaryCard
        label={ADMIN_REPORT_SUMMARY_LABELS.thisMonth}
        value={`${thisMonth}件`}
        icon={Sparkles}
      />
    </div>
  );
}
