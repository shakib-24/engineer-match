import Link from "next/link";
import { Heart } from "lucide-react";
import { FAVORITE_EMPTY_STATE_LABELS } from "@/constants/favorites";

export function FavoriteEmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Heart className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold text-foreground">{FAVORITE_EMPTY_STATE_LABELS.title}</p>
      <p className="text-sm text-muted-foreground">{FAVORITE_EMPTY_STATE_LABELS.description}</p>
      <Link
        href={FAVORITE_EMPTY_STATE_LABELS.ctaHref}
        className="mt-2 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {FAVORITE_EMPTY_STATE_LABELS.ctaLabel}
      </Link>
    </div>
  );
}
