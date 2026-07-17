"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  ENGINEER_NOTIFICATION_SETTINGS,
  ENGINEER_NOTIFICATION_TOGGLES,
  ENGINEER_SETTINGS_DEMO_NOTE,
} from "@/constants/engineer-settings";

export function EngineerNotificationSettings() {
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      ENGINEER_NOTIFICATION_TOGGLES.map((toggle) => [toggle.id, toggle.defaultChecked]),
    ),
  );
  const [saved, setSaved] = useState(false);

  function handleToggle(id: string, checked: boolean) {
    setCheckedMap((prev) => ({ ...prev, [id]: checked }));
    setSaved(true);
  }

  return (
    <SectionCard
      title={ENGINEER_NOTIFICATION_SETTINGS.title}
      description={ENGINEER_NOTIFICATION_SETTINGS.description}
    >
      <ul className="flex flex-col divide-y divide-border">
        {ENGINEER_NOTIFICATION_TOGGLES.map((toggle) => (
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

      {saved && (
        <div className="mt-5 flex items-center justify-between gap-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          <span>{ENGINEER_NOTIFICATION_SETTINGS.savedMessage}</span>
          <button
            type="button"
            onClick={() => setSaved(false)}
            aria-label="保存メッセージを閉じる"
            className="shrink-0 rounded-lg p-1 transition-colors duration-200 hover:bg-green-100 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">{ENGINEER_SETTINGS_DEMO_NOTE}</p>
    </SectionCard>
  );
}
