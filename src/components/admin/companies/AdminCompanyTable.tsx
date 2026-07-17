import Link from "next/link";
import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import {
  ADMIN_COMPANY_ACTION_LABELS,
  ADMIN_COMPANY_REVIEW_STATUS_TONE,
  ADMIN_COMPANY_TABLE_COLUMNS,
  ADMIN_COMPANY_USAGE_STATUS_TONE,
  type AdminCompany,
} from "@/constants/admin-companies";
import type { AdminCompanyDialogMode } from "@/components/admin/companies/AdminCompanyStatusDialog";

interface AdminCompanyTableProps {
  companies: AdminCompany[];
  onAction: (id: string, mode: Exclude<AdminCompanyDialogMode, null>) => void;
}

export function AdminCompanyTable({ companies, onAction }: AdminCompanyTableProps) {
  return (
    <AdminDataTable
      columns={[...ADMIN_COMPANY_TABLE_COLUMNS]}
      caption={ADMIN_COMPANY_TABLE_COLUMNS.join("、")}
    >
      {companies.map((company) => (
        <tr key={company.id} className="align-top">
          <td className="px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{company.name}</p>
              <p className="truncate text-xs text-muted-foreground">{company.contactName}</p>
            </div>
          </td>
          <td className="px-4 py-3 text-sm whitespace-nowrap text-foreground">{company.industry}</td>
          <td className="px-4 py-3 text-sm whitespace-nowrap text-foreground">{company.contactName}</td>
          <td className="px-4 py-3 text-sm whitespace-nowrap text-foreground">{company.jobCount}件</td>
          <td className="px-4 py-3 text-sm whitespace-nowrap text-muted-foreground">
            {company.registeredDateLabel}
          </td>
          <td className="px-4 py-3">
            <AdminStatusBadge
              label={company.reviewStatus}
              tone={ADMIN_COMPANY_REVIEW_STATUS_TONE[company.reviewStatus]}
            />
          </td>
          <td className="px-4 py-3">
            <AdminStatusBadge
              label={company.usageStatus}
              tone={ADMIN_COMPANY_USAGE_STATUS_TONE[company.usageStatus]}
            />
          </td>
          <td className="px-4 py-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Link
                href={`/admin/companies/${company.id}`}
                className="rounded text-xs font-semibold text-primary hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {ADMIN_COMPANY_ACTION_LABELS.viewDetails}
              </Link>
              {company.reviewStatus !== "承認済み" && (
                <button
                  type="button"
                  onClick={() => onAction(company.id, "approve")}
                  className="rounded text-xs font-semibold text-emerald-600 hover:text-emerald-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  {ADMIN_COMPANY_ACTION_LABELS.approve}
                </button>
              )}
              {company.reviewStatus === "審査中" && (
                <>
                  <button
                    type="button"
                    onClick={() => onAction(company.id, "return")}
                    className="rounded text-xs font-semibold text-amber-600 hover:text-amber-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    {ADMIN_COMPANY_ACTION_LABELS.return}
                  </button>
                  <button
                    type="button"
                    onClick={() => onAction(company.id, "reject")}
                    className="rounded text-xs font-semibold text-red-600 hover:text-red-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    {ADMIN_COMPANY_ACTION_LABELS.reject}
                  </button>
                </>
              )}
              {company.reviewStatus === "承認済み" &&
                (company.usageStatus === "利用停止中" ? (
                  <button
                    type="button"
                    onClick={() => onAction(company.id, "reinstate")}
                    className="rounded text-xs font-semibold text-emerald-600 hover:text-emerald-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    {ADMIN_COMPANY_ACTION_LABELS.reinstate}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onAction(company.id, "suspend")}
                    className="rounded text-xs font-semibold text-red-600 hover:text-red-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    {ADMIN_COMPANY_ACTION_LABELS.suspend}
                  </button>
                ))}
            </div>
          </td>
        </tr>
      ))}
    </AdminDataTable>
  );
}
