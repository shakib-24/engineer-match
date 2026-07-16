"use client";

import { useState } from "react";
import { ExternalLink, MapPin, SquarePen, Users } from "lucide-react";
import { COMPANY_PROFILE, COMPANY_PROFILE_PAGE } from "@/constants/company";

export function CompanyProfileHeader() {
  const [demoMessage, setDemoMessage] = useState<string | null>(null);

  function showDemoMessage(message: string) {
    setDemoMessage(message);
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex min-w-0 items-start gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-xl font-bold text-primary"
            aria-hidden="true"
          >
            {COMPANY_PROFILE.logoInitials}
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {COMPANY_PROFILE.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {COMPANY_PROFILE.industry}
            </p>
            <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 shrink-0" aria-hidden="true" />
                <dt className="sr-only">従業員数</dt>
                <dd>{COMPANY_PROFILE.employees}</dd>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <dt className="sr-only">本社所在地</dt>
                <dd>{COMPANY_PROFILE.headquarters}</dd>
              </div>
              <div className="flex min-w-0 items-center gap-1.5">
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                <dt className="sr-only">コーポレートサイト</dt>
                <dd className="min-w-0 truncate">
                  <a
                    href={COMPANY_PROFILE.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 transition-colors duration-200 hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    {COMPANY_PROFILE.website}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              showDemoMessage("この機能はデモ版のため準備中です（編集画面は今後実装予定）。")
            }
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <SquarePen className="h-4 w-4" aria-hidden="true" />
            {COMPANY_PROFILE_PAGE.editLabel}
          </button>
          <button
            type="button"
            onClick={() =>
              showDemoMessage("この機能はデモ版のため準備中です（公開ページは今後実装予定）。")
            }
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            {COMPANY_PROFILE_PAGE.previewLabel}
          </button>
        </div>
      </div>

      {demoMessage && (
        <p
          role="status"
          className="mt-4 rounded-xl bg-muted px-4 py-2.5 text-xs text-muted-foreground"
        >
          {demoMessage}
        </p>
      )}
    </div>
  );
}
