import { Building2 } from "lucide-react";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import {
  ADMIN_COMPANY_ACTION_LABELS,
  ADMIN_COMPANY_REVIEW_STATUS_TONE,
  ADMIN_COMPANY_USAGE_STATUS_TONE,
  type AdminCompany,
  type AdminCompanyReviewStatus,
  type AdminCompanyUsageStatus,
} from "@/constants/admin-companies";
import type { AdminCompanyDialogMode } from "@/components/admin/companies/AdminCompanyStatusDialog";

interface AdminCompanyDetailHeaderProps {
  company: AdminCompany;
  reviewStatus: AdminCompanyReviewStatus;
  usageStatus: AdminCompanyUsageStatus;
  onAction: (mode: Exclude<AdminCompanyDialogMode, null>) => void;
}

export function AdminCompanyDetailHeader({
  company,
  reviewStatus,
  usageStatus,
  onAction,
}: AdminCompanyDetailHeaderProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10"
            aria-hidden="true"
          >
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-foreground">{company.name}</h2>
              <AdminStatusBadge
                label={reviewStatus}
                tone={ADMIN_COMPANY_REVIEW_STATUS_TONE[reviewStatus]}
              />
              <AdminStatusBadge
                label={usageStatus}
                tone={ADMIN_COMPANY_USAGE_STATUS_TONE[usageStatus]}
              />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {company.industry} ・ {company.companySize}
            </p>
            <p className="text-sm text-muted-foreground">{company.contactName}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {reviewStatus !== "承認済み" && (
            <button
              type="button"
              onClick={() => onAction("approve")}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-emerald-300 bg-white px-4 text-sm font-semibold text-emerald-600 transition-colors duration-200 hover:bg-emerald-50 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {ADMIN_COMPANY_ACTION_LABELS.approve}
            </button>
          )}
          {reviewStatus === "審査中" && (
            <>
              <button
                type="button"
                onClick={() => onAction("return")}
                className="inline-flex h-9 items-center justify-center rounded-xl border border-amber-300 bg-white px-4 text-sm font-semibold text-amber-600 transition-colors duration-200 hover:bg-amber-50 focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {ADMIN_COMPANY_ACTION_LABELS.return}
              </button>
              <button
                type="button"
                onClick={() => onAction("reject")}
                className="inline-flex h-9 items-center justify-center rounded-xl border border-red-300 bg-white px-4 text-sm font-semibold text-red-600 transition-colors duration-200 hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {ADMIN_COMPANY_ACTION_LABELS.reject}
              </button>
            </>
          )}
          {reviewStatus === "承認済み" &&
            (usageStatus === "利用停止中" ? (
              <button
                type="button"
                onClick={() => onAction("reinstate")}
                className="inline-flex h-9 items-center justify-center rounded-xl border border-emerald-300 bg-white px-4 text-sm font-semibold text-emerald-600 transition-colors duration-200 hover:bg-emerald-50 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {ADMIN_COMPANY_ACTION_LABELS.reinstate}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onAction("suspend")}
                className="inline-flex h-9 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {ADMIN_COMPANY_ACTION_LABELS.suspend}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
