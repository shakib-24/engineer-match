"use client";

import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  COMPANY_ACCOUNT_SETTINGS,
  COMPANY_ACCOUNT_TEXT_FIELDS,
  COMPANY_LANGUAGE_OPTIONS,
  COMPANY_SETTINGS_DEMO_NOTE,
  COMPANY_TIMEZONE_OPTIONS,
} from "@/constants/company-settings";

const SELECT_CLASS =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export function CompanyAccountSettings() {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      COMPANY_ACCOUNT_TEXT_FIELDS.map((field) => [field.id, field.defaultValue]),
    ),
  );
  const [timezone, setTimezone] = useState<string>(COMPANY_TIMEZONE_OPTIONS[0]);
  const [language, setLanguage] = useState<string>(COMPANY_LANGUAGE_OPTIONS[0]);
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <SectionCard
      title={COMPANY_ACCOUNT_SETTINGS.title}
      description={COMPANY_ACCOUNT_SETTINGS.description}
    >
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {COMPANY_ACCOUNT_TEXT_FIELDS.map((field) => (
            <div key={field.id} className="flex flex-col gap-2">
              <Label htmlFor={`account-${field.id}`}>{field.label}</Label>
              <Input
                id={`account-${field.id}`}
                type={field.type}
                autoComplete={field.autoComplete}
                value={values[field.id]}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, [field.id]: event.target.value }))
                }
              />
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <Label htmlFor="account-timezone">
              {COMPANY_ACCOUNT_SETTINGS.timezoneLabel}
            </Label>
            <select
              id="account-timezone"
              value={timezone}
              onChange={(event) => setTimezone(event.target.value)}
              className={SELECT_CLASS}
            >
              {COMPANY_TIMEZONE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="account-language">
              {COMPANY_ACCOUNT_SETTINGS.languageLabel}
            </Label>
            <select
              id="account-language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className={SELECT_CLASS}
            >
              {COMPANY_LANGUAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {saved && (
          <div className="flex items-center justify-between gap-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            <span>{COMPANY_ACCOUNT_SETTINGS.savedMessage}</span>
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

        <p className="text-xs text-muted-foreground">{COMPANY_SETTINGS_DEMO_NOTE}</p>

        <button
          type="submit"
          className="inline-flex h-10 w-fit items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {COMPANY_ACCOUNT_SETTINGS.saveLabel}
        </button>
      </form>
    </SectionCard>
  );
}
