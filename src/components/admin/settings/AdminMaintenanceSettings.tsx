"use client";

import { useState, type FormEvent } from "react";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ADMIN_MAINTENANCE_SETTINGS_SECTION, ADMIN_SETTINGS_DEMO_NOTE } from "@/constants/admin-settings";

export function AdminMaintenanceSettings() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [message, setMessage] = useState("");
  const [scheduledStart, setScheduledStart] = useState("");
  const [scheduledEnd, setScheduledEnd] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  }

  return (
    <SectionCard
      title={ADMIN_MAINTENANCE_SETTINGS_SECTION.title}
      description={ADMIN_MAINTENANCE_SETTINGS_SECTION.description}
    >
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between gap-4 rounded-xl border border-border p-4">
          <div className="min-w-0">
            <Label htmlFor="maintenance-mode" className="text-foreground">
              {ADMIN_MAINTENANCE_SETTINGS_SECTION.maintenanceModeLabel}
            </Label>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {ADMIN_MAINTENANCE_SETTINGS_SECTION.maintenanceModeDescription}
            </p>
          </div>
          <Switch id="maintenance-mode" checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="maintenance-message">{ADMIN_MAINTENANCE_SETTINGS_SECTION.messageLabel}</Label>
          <Textarea
            id="maintenance-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={ADMIN_MAINTENANCE_SETTINGS_SECTION.messagePlaceholder}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="maintenance-start">
              {ADMIN_MAINTENANCE_SETTINGS_SECTION.scheduledStartLabel}
            </Label>
            <Input
              id="maintenance-start"
              type="datetime-local"
              value={scheduledStart}
              onChange={(event) => setScheduledStart(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="maintenance-end">{ADMIN_MAINTENANCE_SETTINGS_SECTION.scheduledEndLabel}</Label>
            <Input
              id="maintenance-end"
              type="datetime-local"
              value={scheduledEnd}
              onChange={(event) => setScheduledEnd(event.target.value)}
            />
          </div>
        </div>

        {saved && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
          >
            {ADMIN_MAINTENANCE_SETTINGS_SECTION.savedMessage}
          </div>
        )}

        <p className="text-xs text-muted-foreground">{ADMIN_SETTINGS_DEMO_NOTE}</p>

        <button
          type="submit"
          className="inline-flex h-10 w-fit items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {ADMIN_MAINTENANCE_SETTINGS_SECTION.saveLabel}
        </button>
      </form>
    </SectionCard>
  );
}
