import Link from "next/link";
import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import {
  ADMIN_OPPORTUNITY_ACTION_LABELS,
  ADMIN_OPPORTUNITY_PUBLICATION_STATUS_TONE,
  ADMIN_OPPORTUNITY_RECRUITMENT_STATUS_TONE,
  ADMIN_OPPORTUNITY_TABLE_COLUMNS,
  type AdminOpportunity,
} from "@/constants/admin-opportunities";
import type { AdminOpportunityDialogMode } from "@/components/admin/opportunities/AdminOpportunityStatusDialog";

interface AdminOpportunityTableProps {
  opportunities: AdminOpportunity[];
  onAction: (id: string, mode: Exclude<AdminOpportunityDialogMode, null>) => void;
}

export function AdminOpportunityTable({ opportunities, onAction }: AdminOpportunityTableProps) {
  return (
    <AdminDataTable
      columns={[...ADMIN_OPPORTUNITY_TABLE_COLUMNS]}
      caption={ADMIN_OPPORTUNITY_TABLE_COLUMNS.join("、")}
    >
      {opportunities.map((opp) => (
        <tr key={opp.id} className="align-top">
          <td className="px-4 py-3">
            <Link
              href={`/admin/opportunities/${opp.id}`}
              className="line-clamp-2 max-w-xs text-sm font-semibold text-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none rounded"
            >
              {opp.title}
            </Link>
          </td>
          <td className="px-4 py-3 text-sm whitespace-nowrap text-foreground">{opp.company}</td>
          <td className="px-4 py-3 text-sm whitespace-nowrap text-muted-foreground">
            {opp.serviceCategory}
          </td>
          <td className="px-4 py-3 text-sm whitespace-nowrap text-muted-foreground">
            {opp.contractType}
          </td>
          <td className="px-4 py-3 text-sm whitespace-nowrap text-foreground">
            {opp.applicantCount}名
          </td>
          <td className="px-4 py-3">
            <AdminStatusBadge
              label={opp.publicationStatus}
              tone={ADMIN_OPPORTUNITY_PUBLICATION_STATUS_TONE[opp.publicationStatus]}
            />
          </td>
          <td className="px-4 py-3">
            <AdminStatusBadge
              label={opp.recruitmentStatus}
              tone={ADMIN_OPPORTUNITY_RECRUITMENT_STATUS_TONE[opp.recruitmentStatus]}
            />
          </td>
          <td className="px-4 py-3 text-sm whitespace-nowrap text-muted-foreground">
            {opp.postedDateLabel}
          </td>
          <td className="px-4 py-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
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
                  className="rounded text-xs font-semibold text-emerald-600 hover:text-emerald-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  {ADMIN_OPPORTUNITY_ACTION_LABELS.publish}
                </button>
              )}
              {opp.publicationStatus === "公開中" && (
                <>
                  <button
                    type="button"
                    onClick={() => onAction(opp.id, "unpublish")}
                    className="rounded text-xs font-semibold text-amber-600 hover:text-amber-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    {ADMIN_OPPORTUNITY_ACTION_LABELS.unpublish}
                  </button>
                  <button
                    type="button"
                    onClick={() => onAction(opp.id, "suspend")}
                    className="rounded text-xs font-semibold text-red-600 hover:text-red-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    {ADMIN_OPPORTUNITY_ACTION_LABELS.suspend}
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => onAction(opp.id, "requestEdit")}
                className="rounded text-xs font-semibold text-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {ADMIN_OPPORTUNITY_ACTION_LABELS.requestEdit}
              </button>
              <button
                type="button"
                onClick={() => onAction(opp.id, "delete")}
                className="rounded text-xs font-semibold text-red-600 hover:text-red-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {ADMIN_OPPORTUNITY_ACTION_LABELS.delete}
              </button>
            </div>
          </td>
        </tr>
      ))}
    </AdminDataTable>
  );
}
