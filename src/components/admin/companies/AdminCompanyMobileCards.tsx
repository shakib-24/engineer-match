import Link from "next/link";
import { AdminMobileCardList } from "@/components/admin/shared/AdminMobileCardList";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import {
  ADMIN_COMPANY_ACTION_LABELS,
  ADMIN_COMPANY_REVIEW_STATUS_TONE,
  ADMIN_COMPANY_USAGE_STATUS_TONE,
  type AdminCompany,
} from "@/constants/admin-companies";
import type { AdminCompanyDialogMode } from "@/components/admin/companies/AdminCompanyStatusDialog";

interface AdminCompanyMobileCardsProps {
  companies: AdminCompany[];
  onAction: (id: string, mode: Exclude<AdminCompanyDialogMode, null>) => void;
}

export function AdminCompanyMobileCards({ companies, onAction }: AdminCompanyMobileCardsProps) {
  return (
    <AdminMobileCardList>
      {companies.map((company) => (
        <div key={company.id} className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{company.name}</p>
              <p className="truncate text-xs text-muted-foreground">{company.contactName}</p>
            </div>
            <AdminStatusBadge
              label={company.reviewStatus}
              tone={ADMIN_COMPANY_REVIEW_STATUS_TONE[company.reviewStatus]}
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>{company.industry}</span>
            <span>・</span>
            <span>{company.jobCount}件の求人</span>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{company.registeredDateLabel}</span>
            <AdminStatusBadge
              label={company.usageStatus}
              tone={ADMIN_COMPANY_USAGE_STATUS_TONE[company.usageStatus]}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-3">
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
                className="rounded text-xs font-semibold text-emerald-600 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {ADMIN_COMPANY_ACTION_LABELS.approve}
              </button>
            )}
            {company.reviewStatus === "審査中" && (
              <>
                <button
                  type="button"
                  onClick={() => onAction(company.id, "return")}
                  className="rounded text-xs font-semibold text-amber-600 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  {ADMIN_COMPANY_ACTION_LABELS.return}
                </button>
                <button
                  type="button"
                  onClick={() => onAction(company.id, "reject")}
                  className="rounded text-xs font-semibold text-red-600 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
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
                  className="rounded text-xs font-semibold text-emerald-600 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  {ADMIN_COMPANY_ACTION_LABELS.reinstate}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onAction(company.id, "suspend")}
                  className="rounded text-xs font-semibold text-red-600 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  {ADMIN_COMPANY_ACTION_LABELS.suspend}
                </button>
              ))}
          </div>
        </div>
      ))}
    </AdminMobileCardList>
  );
}
