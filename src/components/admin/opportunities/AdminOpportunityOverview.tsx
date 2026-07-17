import Link from "next/link";
import {
  AdminDetailField,
  AdminDetailGrid,
  AdminDetailSection,
} from "@/components/admin/shared/AdminDetailSection";
import {
  ADMIN_OPPORTUNITY_DETAIL_SECTIONS,
  type AdminOpportunity,
} from "@/constants/admin-opportunities";

interface AdminOpportunityOverviewProps {
  opportunity: AdminOpportunity;
}

export function AdminOpportunityOverview({ opportunity }: AdminOpportunityOverviewProps) {
  return (
    <div className="flex flex-col gap-6">
      <AdminDetailSection title={ADMIN_OPPORTUNITY_DETAIL_SECTIONS.basicInfo}>
        <AdminDetailGrid>
          <AdminDetailField label="求人・案件ID" value={opportunity.id} />
          <AdminDetailField label="サービス区分" value={opportunity.serviceCategory} />
          <AdminDetailField label="契約形態" value={opportunity.contractType} />
          <AdminDetailField label="勤務地" value={opportunity.location} />
          <AdminDetailField label="勤務形態" value={opportunity.workStyle} />
          <AdminDetailField label="投稿日" value={opportunity.postedDateLabel} />
        </AdminDetailGrid>
      </AdminDetailSection>

      <AdminDetailSection title={ADMIN_OPPORTUNITY_DETAIL_SECTIONS.recruitmentContent}>
        <p className="text-sm text-foreground">{opportunity.description}</p>
      </AdminDetailSection>

      <AdminDetailSection title={ADMIN_OPPORTUNITY_DETAIL_SECTIONS.contractConditions}>
        <AdminDetailGrid>
          <AdminDetailField label="給与・単価" value={opportunity.salaryLabel} />
          <AdminDetailField label="契約形態" value={opportunity.contractType} />
        </AdminDetailGrid>
      </AdminDetailSection>

      <AdminDetailSection title={ADMIN_OPPORTUNITY_DETAIL_SECTIONS.requiredSkills}>
        <ul className="flex flex-wrap gap-2">
          {opportunity.requiredSkills.map((skill) => (
            <li
              key={skill}
              className="rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground"
            >
              {skill}
            </li>
          ))}
        </ul>
      </AdminDetailSection>

      <AdminDetailSection title={ADMIN_OPPORTUNITY_DETAIL_SECTIONS.company}>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-foreground">{opportunity.company}</span>
          {opportunity.companyId && (
            <Link
              href={`/admin/companies/${opportunity.companyId}`}
              className="rounded text-sm font-semibold text-primary hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              企業詳細を見る
            </Link>
          )}
        </div>
      </AdminDetailSection>
    </div>
  );
}
