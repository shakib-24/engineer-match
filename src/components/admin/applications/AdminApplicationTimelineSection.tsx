import { CheckCircle2, Circle } from "lucide-react";
import { AdminDetailSection } from "@/components/admin/shared/AdminDetailSection";
import {
  ADMIN_APPLICATION_DETAIL_SECTIONS,
  type AdminApplication,
} from "@/constants/admin-applications";

interface AdminApplicationTimelineSectionProps {
  application: AdminApplication;
}

export function AdminApplicationTimelineSection({
  application,
}: AdminApplicationTimelineSectionProps) {
  return (
    <AdminDetailSection title={ADMIN_APPLICATION_DETAIL_SECTIONS.timeline}>
      <ol className="flex flex-col gap-4">
        {application.timeline.map((step) => (
          <li key={step.label} className="flex items-center gap-3">
            {step.completed ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
            ) : (
              <Circle className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
            )}
            <div className="min-w-0">
              <p
                className={`text-sm font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}
              >
                {step.label}
              </p>
              <p className="text-xs text-muted-foreground">{step.dateLabel}</p>
            </div>
          </li>
        ))}
      </ol>
    </AdminDetailSection>
  );
}
