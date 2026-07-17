import {
  ArrowDownRight,
  ArrowUpRight,
  Briefcase,
  Building2,
  Minus,
  Send,
  ShieldAlert,
  UserPlus,
  UserRound,
} from "lucide-react";
import {
  ADMIN_SUMMARY_CARDS,
  type AdminSummaryCard,
  type AdminTrendTone,
} from "@/constants/admin";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  userRound: UserRound,
  building2: Building2,
  briefcase: Briefcase,
  send: Send,
  shieldAlert: ShieldAlert,
  userPlus: UserPlus,
} as const;

const TREND_ICON_MAP = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: Minus,
} as const;

const TONE_STYLES: Record<AdminTrendTone, string> = {
  positive: "text-emerald-700",
  negative: "text-red-700",
  neutral: "text-muted-foreground",
};

function AdminSummaryCardItem({ card }: { card: AdminSummaryCard }) {
  const Icon = ICON_MAP[card.icon as keyof typeof ICON_MAP];
  const TrendIcon = TREND_ICON_MAP[card.trend];

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{card.label}</p>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-4 text-3xl font-bold tracking-tight text-foreground">
        {card.value}
      </p>
      <p
        className={cn(
          "mt-1 flex items-center gap-1 text-xs font-medium",
          TONE_STYLES[card.tone],
        )}
      >
        <TrendIcon className="h-3.5 w-3.5" aria-hidden="true" />
        {card.comparisonLabel}
      </p>
    </div>
  );
}

export function AdminSummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ADMIN_SUMMARY_CARDS.map((card) => (
        <AdminSummaryCardItem key={card.id} card={card} />
      ))}
    </div>
  );
}
