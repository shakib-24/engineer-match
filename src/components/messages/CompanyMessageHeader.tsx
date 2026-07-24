import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { COMPANY_MESSAGE_HEADER_LABELS } from "@/constants/company-messages";

interface CompanyMessageHeaderProps {
  engineerName: string;
  opportunityTitle: string;
}

function initialsFor(name: string): string {
  return name.trim().slice(0, 2) || "?";
}

export function CompanyMessageHeader({
  engineerName,
  opportunityTitle,
}: CompanyMessageHeaderProps) {
  return (
    <div className="flex shrink-0 items-center gap-3 border-b border-border bg-surface px-4 py-3 sm:px-6">
      <Link
        href="/company/messages"
        aria-label={COMPANY_MESSAGE_HEADER_LABELS.backLabel}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none lg:hidden"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      </Link>
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary"
        aria-hidden="true"
      >
        {initialsFor(engineerName)}
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-sm font-semibold text-foreground">{engineerName}</h2>
        <p className="truncate text-xs text-muted-foreground">{opportunityTitle}</p>
      </div>
    </div>
  );
}
