"use client";

import { useState } from "react";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ADMIN_SETTINGS_DEMO_NOTE, type AdminSettingsToggle } from "@/constants/admin-settings";

interface AdminSettingsToggleListProps {
  idPrefix: string;
  title: string;
  description: string;
  toggles: AdminSettingsToggle[];
  savedMessage: string;
}

export function AdminSettingsToggleList({
  idPrefix,
  title,
  description,
  toggles,
  savedMessage,
}: AdminSettingsToggleListProps) {
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(toggles.map((toggle) => [toggle.id, toggle.defaultChecked])),
  );
  const [saved, setSaved] = useState(false);

  function handleToggle(id: string, checked: boolean) {
    setCheckedMap((prev) => ({ ...prev, [id]: checked }));
    setSaved(true);
  }

  return (
    <SectionCard title={title} description={description}>
      <ul className="flex flex-col divide-y divide-border">
        {toggles.map((toggle) => (
          <li key={toggle.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
            <div className="min-w-0">
              <Label htmlFor={`${idPrefix}-${toggle.id}`} className="text-foreground">
                {toggle.label}
              </Label>
              <p className="mt-0.5 text-xs text-muted-foreground">{toggle.description}</p>
            </div>
            <Switch
              id={`${idPrefix}-${toggle.id}`}
              checked={checkedMap[toggle.id]}
              onCheckedChange={(checked) => handleToggle(toggle.id, checked)}
            />
          </li>
        ))}
      </ul>

      {saved && (
        <div
          role="status"
          aria-live="polite"
          className="mt-5 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
        >
          {savedMessage}
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">{ADMIN_SETTINGS_DEMO_NOTE}</p>
    </SectionCard>
  );
}
