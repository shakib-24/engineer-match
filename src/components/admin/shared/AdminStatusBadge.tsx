import {
  AlertTriangle,
  CheckCircle2,
  Circle,
  Info,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type AdminStatusTone = "positive" | "negative" | "neutral" | "warning" | "info";

const TONE_STYLES: Record<AdminStatusTone, string> = {
  positive: "bg-emerald-50 text-emerald-700",
  negative: "bg-red-50 text-red-700",
  neutral: "bg-gray-100 text-gray-600",
  warning: "bg-amber-50 text-amber-700",
  info: "bg-blue-50 text-blue-700",
};

const TONE_ICONS: Record<AdminStatusTone, LucideIcon> = {
  positive: CheckCircle2,
  negative: XCircle,
  neutral: Circle,
  warning: AlertTriangle,
  info: Info,
};

interface AdminStatusBadgeProps {
  label: string;
  tone: AdminStatusTone;
  icon?: LucideIcon;
}

export function AdminStatusBadge({ label, tone, icon }: AdminStatusBadgeProps) {
  const Icon = icon ?? TONE_ICONS[tone];
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
        TONE_STYLES[tone],
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}
