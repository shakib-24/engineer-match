import { Archive, Briefcase, Clock, EyeOff, FileEdit, Send } from "lucide-react";
import { AdminSummaryCard } from "@/components/admin/shared/AdminSummaryCard";
import {
  ADMIN_OPPORTUNITY_SUMMARY_LABELS,
  type AdminOpportunity,
} from "@/constants/admin-opportunities";

interface AdminOpportunitySummaryCardsProps {
  opportunities: AdminOpportunity[];
}

export function AdminOpportunitySummaryCards({
  opportunities,
}: AdminOpportunitySummaryCardsProps) {
  const total = opportunities.length;
  const published = opportunities.filter((o) => o.publicationStatus === "公開中").length;
  const draft = opportunities.filter((o) => o.publicationStatus === "下書き").length;
  const underReview = opportunities.filter((o) => o.publicationStatus === "審査中").length;
  const closed = opportunities.filter((o) => o.recruitmentStatus === "募集終了").length;
  const unpublished = opportunities.filter((o) => o.publicationStatus === "非公開").length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <AdminSummaryCard
        label={ADMIN_OPPORTUNITY_SUMMARY_LABELS.total}
        value={`${total}件`}
        icon={Briefcase}
      />
      <AdminSummaryCard
        label={ADMIN_OPPORTUNITY_SUMMARY_LABELS.published}
        value={`${published}件`}
        icon={Send}
        tone="positive"
      />
      <AdminSummaryCard
        label={ADMIN_OPPORTUNITY_SUMMARY_LABELS.draft}
        value={`${draft}件`}
        icon={FileEdit}
      />
      <AdminSummaryCard
        label={ADMIN_OPPORTUNITY_SUMMARY_LABELS.underReview}
        value={`${underReview}件`}
        icon={Clock}
        tone="warning"
      />
      <AdminSummaryCard
        label={ADMIN_OPPORTUNITY_SUMMARY_LABELS.closed}
        value={`${closed}件`}
        icon={Archive}
      />
      <AdminSummaryCard
        label={ADMIN_OPPORTUNITY_SUMMARY_LABELS.unpublished}
        value={`${unpublished}件`}
        icon={EyeOff}
        tone="negative"
      />
    </div>
  );
}
