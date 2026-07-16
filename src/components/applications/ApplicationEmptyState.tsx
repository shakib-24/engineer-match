import Link from "next/link";
import { Inbox } from "lucide-react";

interface ApplicationEmptyStateProps {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref?: string;
  onReset?: () => void;
}

export function ApplicationEmptyState({
  title,
  description,
  ctaLabel,
  ctaHref,
  onReset,
}: ApplicationEmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Inbox className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
      {ctaHref ? (
        <Link
          href={ctaHref}
          className="mt-2 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {ctaLabel}
        </Link>
      ) : (
        onReset && (
          <button
            type="button"
            onClick={onReset}
            className="mt-2 inline-flex h-10 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {ctaLabel}
          </button>
        )
      )}
    </div>
  );
}
