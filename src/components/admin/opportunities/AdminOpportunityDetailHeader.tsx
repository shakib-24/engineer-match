import { Briefcase } from "lucide-react";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import {
  ADMIN_OPPORTUNITY_ACTION_LABELS,
  ADMIN_OPPORTUNITY_PUBLICATION_STATUS_TONE,
  ADMIN_OPPORTUNITY_RECRUITMENT_STATUS_TONE,
  type AdminOpportunity,
  type AdminOpportunityPublicationStatus,
} from "@/constants/admin-opportunities";
import type { AdminOpportunityDialogMode } from "@/components/admin/opportunities/AdminOpportunityStatusDialog";

interface AdminOpportunityDetailHeaderProps {
  opportunity: AdminOpportunity;
  publicationStatus: AdminOpportunityPublicationStatus;
  onAction: (mode: Exclude<AdminOpportunityDialogMode, null | "delete">) => void;
}

export function AdminOpportunityDetailHeader({
  opportunity,
  publicationStatus,
  onAction,
}: AdminOpportunityDetailHeaderProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10"
            aria-hidden="true"
          >
            <Briefcase className="h-6 w-6 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-foreground">{opportunity.title}</h2>
              <AdminStatusBadge
                label={publicationStatus}
                tone={ADMIN_OPPORTUNITY_PUBLICATION_STATUS_TONE[publicationStatus]}
              />
              <AdminStatusBadge
                label={opportunity.recruitmentStatus}
                tone={ADMIN_OPPORTUNITY_RECRUITMENT_STATUS_TONE[opportunity.recruitmentStatus]}
              />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {opportunity.company} ・ {opportunity.serviceCategory}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {publicationStatus !== "公開中" && (
            <button
              type="button"
              onClick={() => onAction("publish")}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-emerald-300 bg-white px-4 text-sm font-semibold text-emerald-600 transition-colors duration-200 hover:bg-emerald-50 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {ADMIN_OPPORTUNITY_ACTION_LABELS.publish}
            </button>
          )}
          {publicationStatus === "公開中" && (
            <>
              <button
                type="button"
                onClick={() => onAction("unpublish")}
                className="inline-flex h-9 items-center justify-center rounded-xl border border-amber-300 bg-white px-4 text-sm font-semibold text-amber-600 transition-colors duration-200 hover:bg-amber-50 focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {ADMIN_OPPORTUNITY_ACTION_LABELS.unpublish}
              </button>
              <button
                type="button"
                onClick={() => onAction("suspend")}
                className="inline-flex h-9 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {ADMIN_OPPORTUNITY_ACTION_LABELS.suspend}
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => onAction("requestEdit")}
            className="inline-flex h-9 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {ADMIN_OPPORTUNITY_ACTION_LABELS.requestEdit}
          </button>
        </div>
      </div>
    </div>
  );
}
