import { CheckCircle2, Circle, History } from "lucide-react";
import { AdminDetailSection } from "@/components/admin/shared/AdminDetailSection";
import { ADMIN_COMPANY_DETAIL_SECTIONS, type AdminCompany } from "@/constants/admin-companies";

interface AdminCompanyVerificationProps {
  company: AdminCompany;
}

export function AdminCompanyVerification({ company }: AdminCompanyVerificationProps) {
  return (
    <div className="flex flex-col gap-6">
      <AdminDetailSection title={ADMIN_COMPANY_DETAIL_SECTIONS.documents}>
        <ul className="flex flex-col divide-y divide-border">
          {company.documents.map((doc) => (
            <li key={doc.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
              <span className="text-sm text-foreground">{doc.name}</span>
              {doc.submitted ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  提出済み
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
                  <Circle className="h-3.5 w-3.5" aria-hidden="true" />
                  未提出
                </span>
              )}
            </li>
          ))}
        </ul>
      </AdminDetailSection>

      <AdminDetailSection title={ADMIN_COMPANY_DETAIL_SECTIONS.reviewHistory}>
        {company.reviewHistory.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {company.reviewHistory.map((entry) => (
              <li key={entry.id} className="flex items-start gap-3">
                <History className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {entry.action} ・ {entry.actor}
                  </p>
                  {entry.reason && (
                    <p className="mt-0.5 text-xs text-muted-foreground">理由：{entry.reason}</p>
                  )}
                  <p className="mt-0.5 text-xs text-muted-foreground">{entry.dateLabel}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">審査履歴はありません。</p>
        )}
      </AdminDetailSection>
    </div>
  );
}
