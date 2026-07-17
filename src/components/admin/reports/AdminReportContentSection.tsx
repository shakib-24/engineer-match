import Link from "next/link";
import { FileText } from "lucide-react";
import {
  AdminDetailField,
  AdminDetailGrid,
  AdminDetailSection,
} from "@/components/admin/shared/AdminDetailSection";
import { ADMIN_REPORT_DETAIL_SECTIONS, type AdminReport } from "@/constants/admin-reports";

interface AdminReportContentSectionProps {
  report: AdminReport;
}

export function AdminReportContentSection({ report }: AdminReportContentSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <AdminDetailSection title={ADMIN_REPORT_DETAIL_SECTIONS.content}>
        <p className="text-sm text-foreground">{report.description}</p>
      </AdminDetailSection>

      <AdminDetailSection title={ADMIN_REPORT_DETAIL_SECTIONS.reporter}>
        <AdminDetailGrid>
          <AdminDetailField label="通報者" value={report.reporterName} />
          <AdminDetailField label="通報日" value={report.reportedDateLabel} />
        </AdminDetailGrid>
        {report.reporterId && (
          <Link
            href={`/admin/users/${report.reporterId}`}
            className="mt-3 inline-block rounded text-sm font-semibold text-primary hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            通報者アカウントを開く
          </Link>
        )}
      </AdminDetailSection>

      <AdminDetailSection title={ADMIN_REPORT_DETAIL_SECTIONS.target}>
        <AdminDetailGrid>
          <AdminDetailField label="対象種別" value={report.targetType} />
          <AdminDetailField label="対象" value={report.targetLabel} />
        </AdminDetailGrid>
        {report.targetHref && (
          <Link
            href={report.targetHref}
            className="mt-3 inline-block rounded text-sm font-semibold text-primary hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            対象の詳細を開く
          </Link>
        )}
      </AdminDetailSection>

      {report.relatedOpportunityTitle && (
        <AdminDetailSection title={ADMIN_REPORT_DETAIL_SECTIONS.relatedOpportunity}>
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-foreground">
              {report.relatedOpportunityTitle}
            </span>
            {report.relatedOpportunityHref && (
              <Link
                href={report.relatedOpportunityHref}
                className="rounded text-sm font-semibold text-primary hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                求人詳細を見る
              </Link>
            )}
          </div>
        </AdminDetailSection>
      )}

      {report.relatedMessageHref && (
        <AdminDetailSection title={ADMIN_REPORT_DETAIL_SECTIONS.relatedMessage}>
          <Link
            href={report.relatedMessageHref}
            className="rounded text-sm font-semibold text-primary hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            関連する会話を確認する
          </Link>
        </AdminDetailSection>
      )}

      <AdminDetailSection title={ADMIN_REPORT_DETAIL_SECTIONS.evidence}>
        {report.evidence.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {report.evidence.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                <FileText className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">証拠・添付ファイルはありません。</p>
        )}
      </AdminDetailSection>
    </div>
  );
}
