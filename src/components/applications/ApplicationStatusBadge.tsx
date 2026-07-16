import {
  APPLICATION_STATUS_BADGE_STYLES,
  type ApplicationStatus,
} from "@/constants/applications";
import { cn } from "@/lib/utils";

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

export function ApplicationStatusBadge({
  status,
  className,
}: ApplicationStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        APPLICATION_STATUS_BADGE_STYLES[status],
        className,
      )}
    >
      {status}
    </span>
  );
}
