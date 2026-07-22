import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGINATION_LABELS } from "@/constants/jobs";

interface PaginationProps {
  page: number;
  pageCount: number;
  buildHref: (page: number) => string;
}

export function Pagination({ page, pageCount, buildHref }: PaginationProps) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  const hasPrevious = page > 1;
  const hasNext = page < pageCount;

  return (
    <nav
      aria-label="ページネーション"
      className="flex items-center justify-center gap-1.5"
    >
      {hasPrevious ? (
        <Link
          href={buildHref(page - 1)}
          aria-label={PAGINATION_LABELS.previousLabel}
          className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">{PAGINATION_LABELS.previousLabel}</span>
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex h-9 cursor-not-allowed items-center justify-center gap-1 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-muted-foreground opacity-50"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">{PAGINATION_LABELS.previousLabel}</span>
        </span>
      )}

      {pages.map((pageNumber) => (
        <Link
          key={pageNumber}
          href={buildHref(pageNumber)}
          aria-current={pageNumber === page ? "page" : undefined}
          aria-label={`${PAGINATION_LABELS.pageLabelPrefix} ${pageNumber}`}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none ${
            pageNumber === page
              ? "bg-primary text-white"
              : "border border-border text-foreground hover:bg-muted"
          }`}
        >
          {pageNumber}
        </Link>
      ))}

      {hasNext ? (
        <Link
          href={buildHref(page + 1)}
          aria-label={PAGINATION_LABELS.nextLabel}
          className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <span className="hidden sm:inline">{PAGINATION_LABELS.nextLabel}</span>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex h-9 cursor-not-allowed items-center justify-center gap-1 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-muted-foreground opacity-50"
        >
          <span className="hidden sm:inline">{PAGINATION_LABELS.nextLabel}</span>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
