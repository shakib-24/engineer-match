import { APPLICATION_STATUS_BADGE_STYLES, APPLICATION_STATUS_LABEL } from "@/constants/applications";
import { cn } from "@/lib/utils";

interface ApplicationStatusBadgeProps {
  status: string;
  className?: string;
}

export function ApplicationStatusBadge({ status, className }: ApplicationStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        APPLICATION_STATUS_BADGE_STYLES[status],
        className,
      )}
    >
      {APPLICATION_STATUS_LABEL[status] ?? status}
    </span>
  );
}
