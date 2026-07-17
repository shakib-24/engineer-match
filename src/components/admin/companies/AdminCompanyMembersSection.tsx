import { AdminDetailSection } from "@/components/admin/shared/AdminDetailSection";
import { ADMIN_COMPANY_DETAIL_SECTIONS, type AdminCompany } from "@/constants/admin-companies";

interface AdminCompanyMembersSectionProps {
  company: AdminCompany;
}

export function AdminCompanyMembersSection({ company }: AdminCompanyMembersSectionProps) {
  return (
    <AdminDetailSection title={ADMIN_COMPANY_DETAIL_SECTIONS.members}>
      <ul className="flex flex-col divide-y divide-border">
        {company.members.map((member) => (
          <li key={member.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{member.name}</p>
              <p className="truncate text-xs text-muted-foreground">{member.email}</p>
            </div>
            <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-foreground">
              {member.role}
            </span>
          </li>
        ))}
      </ul>
    </AdminDetailSection>
  );
}
