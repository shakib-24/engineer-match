import { AlertCircle, CheckCircle2, Clock, MessagesSquare, Sparkles } from "lucide-react";
import { AdminSummaryCard } from "@/components/admin/shared/AdminSummaryCard";
import {
  ADMIN_MESSAGE_SUMMARY_LABELS,
  type AdminMessageModeration,
} from "@/constants/admin-messages";
import type { Conversation } from "@/constants/messages";

const CURRENT_DATE_PREFIX = "2026-07-17";

interface AdminMessageSummaryCardsProps {
  moderations: AdminMessageModeration[];
  conversations: Conversation[];
}

export function AdminMessageSummaryCards({
  moderations,
  conversations,
}: AdminMessageSummaryCardsProps) {
  const total = moderations.length;
  const newToday = conversations.filter((c) => c.lastUpdatedISO.startsWith(CURRENT_DATE_PREFIX))
    .length;
  const unhandledReports = moderations.filter(
    (m) => m.reportCount > 0 && m.handlingStatus === "未対応",
  ).length;
  const needsReview = moderations.filter((m) => m.handlingStatus === "要確認").length;
  const handled = moderations.filter((m) => m.handlingStatus === "対応済み").length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <AdminSummaryCard
        label={ADMIN_MESSAGE_SUMMARY_LABELS.total}
        value={`${total}件`}
        icon={MessagesSquare}
      />
      <AdminSummaryCard
        label={ADMIN_MESSAGE_SUMMARY_LABELS.newToday}
        value={`${newToday}件`}
        icon={Sparkles}
        tone="positive"
      />
      <AdminSummaryCard
        label={ADMIN_MESSAGE_SUMMARY_LABELS.unhandledReports}
        value={`${unhandledReports}件`}
        icon={AlertCircle}
        tone="negative"
      />
      <AdminSummaryCard
        label={ADMIN_MESSAGE_SUMMARY_LABELS.needsReview}
        value={`${needsReview}件`}
        icon={Clock}
        tone="warning"
      />
      <AdminSummaryCard
        label={ADMIN_MESSAGE_SUMMARY_LABELS.handled}
        value={`${handled}件`}
        icon={CheckCircle2}
        tone="positive"
      />
    </div>
  );
}
