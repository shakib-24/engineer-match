import { Circle } from "lucide-react";
import { AVAILABILITY_BADGE_STYLES } from "@/constants/company-engineers";
import { cn } from "@/lib/utils";

interface EngineerStatusBadgeProps {
  availability: string;
  className?: string;
}

export function EngineerStatusBadge({ availability, className }: EngineerStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        AVAILABILITY_BADGE_STYLES[availability] ?? "bg-muted text-muted-foreground",
        className,
      )}
    >
      <Circle className="h-2 w-2 shrink-0 fill-current" aria-hidden="true" />
      {availability}
    </span>
  );
}
