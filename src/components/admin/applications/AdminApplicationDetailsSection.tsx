import { AlertTriangle, FileText, MessageCircle, Star } from "lucide-react";
import { AdminDetailSection } from "@/components/admin/shared/AdminDetailSection";
import {
  ADMIN_APPLICATION_DETAIL_SECTIONS,
  type AdminApplication,
} from "@/constants/admin-applications";

interface AdminApplicationDetailsSectionProps {
  application: AdminApplication;
}

export function AdminApplicationDetailsSection({
  application,
}: AdminApplicationDetailsSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <AdminDetailSection title={ADMIN_APPLICATION_DETAIL_SECTIONS.messages}>
        <div className="flex items-start gap-2">
          <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <p className="text-sm text-foreground">{application.messageSummary}</p>
        </div>
      </AdminDetailSection>

      <AdminDetailSection title={ADMIN_APPLICATION_DETAIL_SECTIONS.interview}>
        <p className="text-sm text-foreground">
          {application.interviewInfo ?? "現時点で面接予定はありません。"}
        </p>
      </AdminDetailSection>

      <AdminDetailSection title={ADMIN_APPLICATION_DETAIL_SECTIONS.evaluation}>
        {application.evaluationSummary ? (
          <div className="flex items-start gap-2">
            <Star className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
            <p className="text-sm text-foreground">{application.evaluationSummary}</p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">評価はまだ登録されていません。</p>
        )}
      </AdminDetailSection>

      <AdminDetailSection title={ADMIN_APPLICATION_DETAIL_SECTIONS.attachments}>
        {application.attachments.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {application.attachments.map((attachment) => (
              <li key={attachment} className="flex items-center gap-2 text-sm text-foreground">
                <FileText className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                {attachment}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">添付書類はありません。</p>
        )}
      </AdminDetailSection>

      <AdminDetailSection title={ADMIN_APPLICATION_DETAIL_SECTIONS.problemReport}>
        {application.hasProblemReport ? (
          <div className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-hidden="true" />
            <p className="text-sm text-red-700">{application.problemReportSummary}</p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">問題報告はありません。</p>
        )}
      </AdminDetailSection>
    </div>
  );
}
