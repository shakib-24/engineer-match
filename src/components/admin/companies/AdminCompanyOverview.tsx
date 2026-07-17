import {
  AdminDetailField,
  AdminDetailGrid,
  AdminDetailSection,
} from "@/components/admin/shared/AdminDetailSection";
import { ADMIN_COMPANY_DETAIL_SECTIONS, type AdminCompany } from "@/constants/admin-companies";

interface AdminCompanyOverviewProps {
  company: AdminCompany;
}

export function AdminCompanyOverview({ company }: AdminCompanyOverviewProps) {
  return (
    <div className="flex flex-col gap-6">
      <AdminDetailSection title={ADMIN_COMPANY_DETAIL_SECTIONS.basicInfo}>
        <AdminDetailGrid>
          <AdminDetailField label="企業名" value={company.name} />
          <AdminDetailField label="企業ID" value={company.id} />
          <AdminDetailField label="代表者" value={company.representativeName} />
          <AdminDetailField label="業種" value={company.industry} />
          <AdminDetailField label="企業規模" value={company.companySize} />
          <AdminDetailField label="所在地" value={company.address} />
          <AdminDetailField label="コーポレートサイト" value={company.website} />
          <AdminDetailField label="登録日" value={company.registeredDateLabel} />
        </AdminDetailGrid>
      </AdminDetailSection>

      <AdminDetailSection title={ADMIN_COMPANY_DETAIL_SECTIONS.contactInfo}>
        <AdminDetailGrid>
          <AdminDetailField label="担当者名" value={company.contactName} />
          <AdminDetailField label="メールアドレス" value={company.contactEmail} />
          <AdminDetailField label="電話番号" value={company.contactPhone} />
        </AdminDetailGrid>
      </AdminDetailSection>

      <AdminDetailSection title={ADMIN_COMPANY_DETAIL_SECTIONS.profile}>
        <p className="text-sm text-foreground">{company.description}</p>
      </AdminDetailSection>
    </div>
  );
}
