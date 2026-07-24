"use client";

import { useState } from "react";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  COMPANY_NOTIFICATION_SETTINGS,
  COMPANY_NOTIFICATION_TOGGLES,
  COMPANY_SETTINGS_UNAVAILABLE_NOTE,
} from "@/constants/company-settings";

export function CompanyNotificationSettings() {
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      COMPANY_NOTIFICATION_TOGGLES.map((toggle) => [toggle.id, toggle.defaultChecked]),
    ),
  );

  function handleToggle(id: string, checked: boolean) {
    setCheckedMap((prev) => ({ ...prev, [id]: checked }));
  }

  return (
    <SectionCard
      title={COMPANY_NOTIFICATION_SETTINGS.title}
      description={COMPANY_NOTIFICATION_SETTINGS.description}
    >
      <ul className="flex flex-col divide-y divide-border">
        {COMPANY_NOTIFICATION_TOGGLES.map((toggle) => (
          <li
            key={toggle.id}
            className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
          >
            <div className="min-w-0">
              <Label htmlFor={`notif-${toggle.id}`} className="text-foreground">
                {toggle.label}
              </Label>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {toggle.description}
              </p>
            </div>
            <Switch
              id={`notif-${toggle.id}`}
              checked={checkedMap[toggle.id]}
              onCheckedChange={(checked) => handleToggle(toggle.id, checked)}
            />
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-muted-foreground">{COMPANY_SETTINGS_UNAVAILABLE_NOTE}</p>
    </SectionCard>
  );
}
