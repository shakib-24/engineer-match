"use client";

import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ADMIN_ACCOUNT_SETTINGS,
  ADMIN_ACCOUNT_TEXT_FIELDS,
  ADMIN_LANGUAGE_OPTIONS,
  ADMIN_SETTINGS_DEMO_NOTE,
  ADMIN_TIMEZONE_OPTIONS,
} from "@/constants/admin-settings";

const SELECT_CLASS =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export function AdminAccountSettings() {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(ADMIN_ACCOUNT_TEXT_FIELDS.map((field) => [field.id, field.defaultValue])),
  );
  const [timezone, setTimezone] = useState<string>(ADMIN_TIMEZONE_OPTIONS[0]);
  const [language, setLanguage] = useState<string>(ADMIN_LANGUAGE_OPTIONS[0]);
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <SectionCard title={ADMIN_ACCOUNT_SETTINGS.title} description={ADMIN_ACCOUNT_SETTINGS.description}>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {ADMIN_ACCOUNT_TEXT_FIELDS.map((field) => (
            <div key={field.id} className="flex flex-col gap-2">
              <Label htmlFor={`admin-account-${field.id}`}>{field.label}</Label>
              <Input
                id={`admin-account-${field.id}`}
                type={field.type}
                autoComplete={field.autoComplete}
                readOnly={field.id === "role"}
                value={values[field.id]}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, [field.id]: event.target.value }))
                }
              />
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <Label htmlFor="admin-account-timezone">{ADMIN_ACCOUNT_SETTINGS.timezoneLabel}</Label>
            <select
              id="admin-account-timezone"
              value={timezone}
              onChange={(event) => setTimezone(event.target.value)}
              className={SELECT_CLASS}
            >
              {ADMIN_TIMEZONE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="admin-account-language">{ADMIN_ACCOUNT_SETTINGS.languageLabel}</Label>
            <select
              id="admin-account-language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className={SELECT_CLASS}
            >
              {ADMIN_LANGUAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {saved && (
          <div className="flex items-center justify-between gap-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            <span>{ADMIN_ACCOUNT_SETTINGS.savedMessage}</span>
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

        <p className="text-xs text-muted-foreground">{ADMIN_SETTINGS_DEMO_NOTE}</p>

        <button
          type="submit"
          className="inline-flex h-10 w-fit items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {ADMIN_ACCOUNT_SETTINGS.saveLabel}
        </button>
      </form>
    </SectionCard>
  );
}
