import Link from "next/link";
import { AdminMobileCardList } from "@/components/admin/shared/AdminMobileCardList";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import {
  ADMIN_OPPORTUNITY_ACTION_LABELS,
  ADMIN_OPPORTUNITY_PUBLICATION_STATUS_TONE,
  ADMIN_OPPORTUNITY_RECRUITMENT_STATUS_TONE,
  type AdminOpportunity,
} from "@/constants/admin-opportunities";
import type { AdminOpportunityDialogMode } from "@/components/admin/opportunities/AdminOpportunityStatusDialog";

interface AdminOpportunityMobileCardsProps {
  opportunities: AdminOpportunity[];
  onAction: (id: string, mode: Exclude<AdminOpportunityDialogMode, null>) => void;
}

export function AdminOpportunityMobileCards({
  opportunities,
  onAction,
}: AdminOpportunityMobileCardsProps) {
  return (
    <AdminMobileCardList>
      {opportunities.map((opp) => (
        <div key={opp.id} className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link
                href={`/admin/opportunities/${opp.id}`}
                className="text-sm font-semibold text-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none rounded"
              >
                {opp.title}
              </Link>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{opp.company}</p>
            </div>
            <AdminStatusBadge
              label={opp.publicationStatus}
              tone={ADMIN_OPPORTUNITY_PUBLICATION_STATUS_TONE[opp.publicationStatus]}
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>{opp.serviceCategory}</span>
            <span>・</span>
            <span>応募 {opp.applicantCount}名</span>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{opp.postedDateLabel}</span>
            <AdminStatusBadge
              label={opp.recruitmentStatus}
              tone={ADMIN_OPPORTUNITY_RECRUITMENT_STATUS_TONE[opp.recruitmentStatus]}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-3">
            <Link
              href={`/admin/opportunities/${opp.id}`}
              className="rounded text-xs font-semibold text-primary hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {ADMIN_OPPORTUNITY_ACTION_LABELS.viewDetails}
            </Link>
            {opp.publicationStatus !== "公開中" && (
              <button
                type="button"
                onClick={() => onAction(opp.id, "publish")}
                className="rounded text-xs font-semibold text-emerald-600 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {ADMIN_OPPORTUNITY_ACTION_LABELS.publish}
              </button>
            )}
            {opp.publicationStatus === "公開中" && (
              <button
                type="button"
                onClick={() => onAction(opp.id, "suspend")}
                className="rounded text-xs font-semibold text-red-600 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {ADMIN_OPPORTUNITY_ACTION_LABELS.suspend}
              </button>
            )}
            <button
              type="button"
              onClick={() => onAction(opp.id, "delete")}
              className="rounded text-xs font-semibold text-red-600 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {ADMIN_OPPORTUNITY_ACTION_LABELS.delete}
            </button>
          </div>
        </div>
      ))}
    </AdminMobileCardList>
  );
}
