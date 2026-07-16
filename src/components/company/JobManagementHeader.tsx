import Link from "next/link";
import { Plus } from "lucide-react";
import { JOB_MANAGEMENT_META } from "@/constants/company-jobs";

export function JobManagementHeader() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {JOB_MANAGEMENT_META.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {JOB_MANAGEMENT_META.description}
        </p>
      </div>
      <Link
        href={JOB_MANAGEMENT_META.createHref}
        className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        {JOB_MANAGEMENT_META.createLabel}
      </Link>
    </div>
  );
}
