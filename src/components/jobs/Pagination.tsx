import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGINATION_LABELS } from "@/constants/jobs";

const PAGES = [1, 2, 3] as const;

export function Pagination() {
  return (
    <nav
      aria-label="ページネーション"
      className="flex items-center justify-center gap-1.5"
    >
      <button
        type="button"
        aria-disabled="true"
        aria-label={PAGINATION_LABELS.previousLabel}
        className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">{PAGINATION_LABELS.previousLabel}</span>
      </button>

      {PAGES.map((page) => (
        <button
          key={page}
          type="button"
          aria-current={page === 1 ? "page" : undefined}
          aria-label={`${PAGINATION_LABELS.pageLabelPrefix} ${page}`}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none ${
            page === 1
              ? "bg-primary text-white"
              : "border border-border text-foreground hover:bg-muted"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        aria-label={PAGINATION_LABELS.nextLabel}
        className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <span className="hidden sm:inline">{PAGINATION_LABELS.nextLabel}</span>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
