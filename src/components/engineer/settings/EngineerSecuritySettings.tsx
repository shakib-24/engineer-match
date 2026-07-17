"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  ENGINEER_LOGIN_HISTORY,
  ENGINEER_SECURITY_SETTINGS,
  ENGINEER_SETTINGS_DEMO_NOTE,
} from "@/constants/engineer-settings";

export function EngineerSecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(
    ENGINEER_SECURITY_SETTINGS.twoFactor.defaultChecked,
  );
  const [demoMessage, setDemoMessage] = useState<string | null>(null);

  function showDemoNote() {
    setDemoMessage(ENGINEER_SETTINGS_DEMO_NOTE);
    window.setTimeout(() => setDemoMessage(null), 3000);
  }

  return (
    <SectionCard
      title={ENGINEER_SECURITY_SETTINGS.title}
      description={ENGINEER_SECURITY_SETTINGS.description}
    >
      <div className="flex flex-col divide-y divide-border">
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 first:pt-0">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              {ENGINEER_SECURITY_SETTINGS.passwordChange.label}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {ENGINEER_SECURITY_SETTINGS.passwordChange.description}
            </p>
          </div>
          <button
            type="button"
            onClick={showDemoNote}
            className="inline-flex h-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {ENGINEER_SECURITY_SETTINGS.passwordChange.buttonLabel}
          </button>
        </div>

        <div className="flex items-center justify-between gap-4 py-4">
          <div className="min-w-0">
            <Label htmlFor="security-2fa" className="text-foreground">
              {ENGINEER_SECURITY_SETTINGS.twoFactor.label}
            </Label>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {ENGINEER_SECURITY_SETTINGS.twoFactor.description}
            </p>
          </div>
          <Switch
            id="security-2fa"
            checked={twoFactorEnabled}
            onCheckedChange={(checked) => {
              setTwoFactorEnabled(checked);
              showDemoNote();
            }}
          />
        </div>

        <div className="py-4">
          <p className="text-sm font-semibold text-foreground">
            {ENGINEER_SECURITY_SETTINGS.loginHistory.label}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {ENGINEER_SECURITY_SETTINGS.loginHistory.description}
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {ENGINEER_LOGIN_HISTORY.map((item) => (
              <li
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.device}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.location} ・ {item.dateLabel}
                  </p>
                </div>
                {item.isCurrent && (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    {ENGINEER_SECURITY_SETTINGS.loginHistory.currentLabel}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 py-4 last:pb-0">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              {ENGINEER_SECURITY_SETTINGS.sessionManagement.label}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {ENGINEER_SECURITY_SETTINGS.sessionManagement.description}
            </p>
          </div>
          <button
            type="button"
            onClick={showDemoNote}
            className="inline-flex h-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {ENGINEER_SECURITY_SETTINGS.sessionManagement.revokeAllLabel}
          </button>
        </div>
      </div>

      {demoMessage && (
        <div
          role="status"
          aria-live="polite"
          className="mt-5 rounded-xl bg-muted px-4 py-3 text-xs text-muted-foreground"
        >
          {demoMessage}
        </div>
      )}
    </SectionCard>
  );
}
