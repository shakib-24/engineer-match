import { SearchX } from "lucide-react";
import { EMPTY_STATE_LABELS } from "@/constants/company-engineers";

interface EngineerEmptyStateProps {
  onReset: () => void;
}

export function EngineerEmptyState({ onReset }: EngineerEmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <SearchX className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold text-foreground">{EMPTY_STATE_LABELS.title}</p>
      <p className="text-sm text-muted-foreground">{EMPTY_STATE_LABELS.description}</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 inline-flex h-10 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {EMPTY_STATE_LABELS.resetLabel}
      </button>
    </div>
  );
}
