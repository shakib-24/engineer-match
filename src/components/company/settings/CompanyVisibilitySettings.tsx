"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  COMPANY_SETTINGS_UNAVAILABLE_NOTE,
  COMPANY_VISIBILITY_SETTINGS,
  COMPANY_VISIBILITY_TOGGLES,
} from "@/constants/company-settings";

export function CompanyVisibilitySettings() {
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      COMPANY_VISIBILITY_TOGGLES.map((toggle) => [toggle.id, toggle.defaultChecked]),
    ),
  );

  return (
    <SectionCard
      title={COMPANY_VISIBILITY_SETTINGS.title}
      description={COMPANY_VISIBILITY_SETTINGS.description}
    >
      <div className="flex flex-col divide-y divide-border">
        <div className="flex items-center justify-between gap-4 py-4 first:pt-0">
          <div className="min-w-0">
            <Label htmlFor="visibility-profile-public" className="text-foreground">
              {COMPANY_VISIBILITY_SETTINGS.profilePublicLabel}
            </Label>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {COMPANY_VISIBILITY_SETTINGS.profilePublicNote}
            </p>
          </div>
          <Switch id="visibility-profile-public" checked disabled />
        </div>

        <div className="flex items-center justify-between gap-4 py-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              {COMPANY_VISIBILITY_SETTINGS.jobsPublicLabel}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {COMPANY_VISIBILITY_SETTINGS.jobsPublicNote}
            </p>
          </div>
          <Link
            href={COMPANY_VISIBILITY_SETTINGS.jobsPublicHref}
            className="inline-flex h-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            求人・案件管理へ
          </Link>
        </div>

        {COMPANY_VISIBILITY_TOGGLES.map((toggle) => (
          <div key={toggle.id} className="flex items-center justify-between gap-4 py-4 last:pb-0">
            <div className="min-w-0">
              <Label htmlFor={`visibility-${toggle.id}`} className="text-foreground">
                {toggle.label}
              </Label>
              <p className="mt-0.5 text-xs text-muted-foreground">{toggle.description}</p>
            </div>
            <Switch
              id={`visibility-${toggle.id}`}
              checked={checkedMap[toggle.id]}
              onCheckedChange={(checked) =>
                setCheckedMap((prev) => ({ ...prev, [toggle.id]: checked }))
              }
            />
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">{COMPANY_SETTINGS_UNAVAILABLE_NOTE}</p>
    </SectionCard>
  );
}
