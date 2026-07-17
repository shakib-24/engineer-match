import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type AdminSummaryTone = "neutral" | "positive" | "negative" | "warning";

const TONE_STYLES: Record<AdminSummaryTone, string> = {
  neutral: "bg-primary/10 text-primary",
  positive: "bg-emerald-50 text-emerald-600",
  negative: "bg-red-50 text-red-600",
  warning: "bg-amber-50 text-amber-600",
};

interface AdminSummaryCardProps {
  label: string;
  value: string;
  helper?: string;
  icon: LucideIcon;
  tone?: AdminSummaryTone;
}

export function AdminSummaryCard({
  label,
  value,
  helper,
  icon: Icon,
  tone = "neutral",
}: AdminSummaryCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            TONE_STYLES[tone],
          )}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-foreground">{value}</p>
      {helper && <p className="mt-1 text-xs text-muted-foreground">{helper}</p>}
    </div>
  );
}
