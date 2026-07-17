import {
  AdminDetailField,
  AdminDetailGrid,
  AdminDetailSection,
} from "@/components/admin/shared/AdminDetailSection";
import {
  ADMIN_APPLICATION_DETAIL_SECTIONS,
  type AdminApplication,
} from "@/constants/admin-applications";

interface AdminApplicationInfoSectionProps {
  application: AdminApplication;
}

export function AdminApplicationInfoSection({ application }: AdminApplicationInfoSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <AdminDetailSection title={ADMIN_APPLICATION_DETAIL_SECTIONS.applicantInfo}>
        <AdminDetailGrid>
          <AdminDetailField label="氏名" value={application.applicantName} />
          <AdminDetailField label="応募ID" value={application.id} />
          <AdminDetailField label="応募日" value={application.appliedDateLabel} />
          <AdminDetailField label="最終更新" value={application.lastUpdatedLabel} />
        </AdminDetailGrid>
      </AdminDetailSection>

      <AdminDetailSection title={ADMIN_APPLICATION_DETAIL_SECTIONS.opportunityInfo}>
        <AdminDetailGrid>
          <AdminDetailField label="求人・案件名" value={application.jobTitle} />
          <AdminDetailField label="企業名" value={application.company} />
          <AdminDetailField label="サービス区分" value={application.serviceCategory} />
        </AdminDetailGrid>
      </AdminDetailSection>
    </div>
  );
}
