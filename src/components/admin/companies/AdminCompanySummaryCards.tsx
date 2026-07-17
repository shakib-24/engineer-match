import { Ban, Building2, CheckCircle2, Clock, RotateCcw, UserPlus } from "lucide-react";
import { AdminSummaryCard } from "@/components/admin/shared/AdminSummaryCard";
import { ADMIN_COMPANY_SUMMARY_LABELS, type AdminCompany } from "@/constants/admin-companies";

const CURRENT_MONTH_PREFIX = "2026-07";

interface AdminCompanySummaryCardsProps {
  companies: AdminCompany[];
}

export function AdminCompanySummaryCards({ companies }: AdminCompanySummaryCardsProps) {
  const total = companies.length;
  const approved = companies.filter((c) => c.reviewStatus === "承認済み").length;
  const underReview = companies.filter((c) => c.reviewStatus === "審査中").length;
  const returned = companies.filter((c) => c.reviewStatus === "差し戻し").length;
  const suspended = companies.filter((c) => c.usageStatus === "利用停止中").length;
  const newThisMonth = companies.filter((c) =>
    c.registeredDateISO.startsWith(CURRENT_MONTH_PREFIX),
  ).length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <AdminSummaryCard label={ADMIN_COMPANY_SUMMARY_LABELS.total} value={`${total}社`} icon={Building2} />
      <AdminSummaryCard
        label={ADMIN_COMPANY_SUMMARY_LABELS.approved}
        value={`${approved}社`}
        icon={CheckCircle2}
        tone="positive"
      />
      <AdminSummaryCard
        label={ADMIN_COMPANY_SUMMARY_LABELS.underReview}
        value={`${underReview}社`}
        icon={Clock}
        tone="warning"
      />
      <AdminSummaryCard
        label={ADMIN_COMPANY_SUMMARY_LABELS.returned}
        value={`${returned}社`}
        icon={RotateCcw}
        tone="warning"
      />
      <AdminSummaryCard
        label={ADMIN_COMPANY_SUMMARY_LABELS.suspended}
        value={`${suspended}社`}
        icon={Ban}
        tone="negative"
      />
      <AdminSummaryCard
        label={ADMIN_COMPANY_SUMMARY_LABELS.newThisMonth}
        value={`${newThisMonth}社`}
        icon={UserPlus}
        tone="positive"
      />
    </div>
  );
}
