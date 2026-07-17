import { Award, CalendarClock, ClipboardList, Send, XCircle } from "lucide-react";
import { AdminSummaryCard } from "@/components/admin/shared/AdminSummaryCard";
import {
  ADMIN_APPLICATION_SUMMARY_LABELS,
  type AdminApplication,
} from "@/constants/admin-applications";

interface AdminApplicationSummaryCardsProps {
  applications: AdminApplication[];
}

export function AdminApplicationSummaryCards({
  applications,
}: AdminApplicationSummaryCardsProps) {
  const total = applications.length;
  const underReview = applications.filter((a) => a.status === "選考中").length;
  const interview = applications.filter((a) => a.status === "面接予定").length;
  const offer = applications.filter((a) => a.status === "内定").length;
  const rejected = applications.filter((a) => a.status === "不採用").length;
  const withdrawn = applications.filter((a) => a.status === "辞退").length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <AdminSummaryCard
        label={ADMIN_APPLICATION_SUMMARY_LABELS.total}
        value={`${total}件`}
        icon={Send}
      />
      <AdminSummaryCard
        label={ADMIN_APPLICATION_SUMMARY_LABELS.underReview}
        value={`${underReview}件`}
        icon={ClipboardList}
      />
      <AdminSummaryCard
        label={ADMIN_APPLICATION_SUMMARY_LABELS.interview}
        value={`${interview}件`}
        icon={CalendarClock}
        tone="warning"
      />
      <AdminSummaryCard
        label={ADMIN_APPLICATION_SUMMARY_LABELS.offer}
        value={`${offer}件`}
        icon={Award}
        tone="positive"
      />
      <AdminSummaryCard
        label={ADMIN_APPLICATION_SUMMARY_LABELS.rejected}
        value={`${rejected}件`}
        icon={XCircle}
        tone="negative"
      />
      <AdminSummaryCard
        label={ADMIN_APPLICATION_SUMMARY_LABELS.withdrawn}
        value={`${withdrawn}件`}
        icon={XCircle}
      />
    </div>
  );
}
