"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createClient } from "@/lib/supabase/client";
import {
  saveContactDetails,
  savePersonalInfo,
  type EngineerContactDetails,
  type EngineerPersonalInfo,
} from "@/lib/engineer/personal-info";
import { GENDER_OPTIONS, PERSONAL_INFO_FORM_META, PERSONAL_INFO_LABELS } from "@/constants/engineer-profile";

interface PersonalInfoFormProps {
  userId: string;
  personalInfo: EngineerPersonalInfo | null;
  contactDetails: EngineerContactDetails | null;
}

interface FormState {
  birthDate: string;
  gender: string;
  phone: string;
  nearestStation: string;
}

function buildFormState(
  personalInfo: EngineerPersonalInfo | null,
  contactDetails: EngineerContactDetails | null,
): FormState {
  return {
    birthDate: personalInfo?.birth_date ?? "",
    gender: personalInfo?.gender ?? "",
    phone: contactDetails?.phone ?? "",
    nearestStation: contactDetails?.nearest_station ?? "",
  };
}

export function PersonalInfoForm({ userId, personalInfo, contactDetails }: PersonalInfoFormProps) {
  const [form, setForm] = useState<FormState>(() => buildFormState(personalInfo, contactDetails));
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<"error" | "success" | null>(null);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSaving) return;

    setMessage(null);
    setStatus(null);
    setIsSaving(true);

    try {
      const supabase = createClient();

      const [{ error: personalInfoError }, { error: contactDetailsError }] = await Promise.all([
        savePersonalInfo(supabase, userId, {
          birth_date: form.birthDate || null,
          gender: (form.gender || null) as EngineerPersonalInfo["gender"],
        }),
        saveContactDetails(supabase, userId, {
          phone: form.phone.trim() || null,
          nearest_station: form.nearestStation.trim() || null,
        }),
      ]);

      if (personalInfoError || contactDetailsError) {
        console.error(
          "[personal-info] save failed:",
          personalInfoError ?? contactDetailsError,
        );
        setMessage(PERSONAL_INFO_FORM_META.saveFailedMessage);
        setStatus("error");
        return;
      }

      setMessage(PERSONAL_INFO_FORM_META.savedMessage);
      setStatus("success");
    } catch (err) {
      console.error("[personal-info] unexpected save error:", err);
      setMessage(PERSONAL_INFO_FORM_META.saveFailedMessage);
      setStatus("error");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="personal-birth-date">{PERSONAL_INFO_LABELS.birthDate}</Label>
          <Input
            id="personal-birth-date"
            type="date"
            value={form.birthDate}
            onChange={(event) => updateField("birthDate", event.target.value)}
            className="h-9"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="personal-phone">{PERSONAL_INFO_LABELS.phone}</Label>
          <Input
            id="personal-phone"
            type="tel"
            value={form.phone}
            placeholder="090-1234-5678"
            onChange={(event) => updateField("phone", event.target.value)}
            className="h-9"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="personal-nearest-station">{PERSONAL_INFO_LABELS.nearestStation}</Label>
          <Input
            id="personal-nearest-station"
            type="text"
            value={form.nearestStation}
            placeholder="渋谷駅"
            onChange={(event) => updateField("nearestStation", event.target.value)}
            className="h-9"
          />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-sm leading-none font-medium">{PERSONAL_INFO_LABELS.gender}</span>
          <RadioGroup
            value={form.gender}
            onValueChange={(value) => updateField("gender", value)}
            aria-label={PERSONAL_INFO_LABELS.gender}
            className="grid grid-cols-1 gap-2 sm:grid-cols-3"
          >
            {GENDER_OPTIONS.map((option) => (
              <label
                key={option.value}
                htmlFor={`personal-gender-${option.value}`}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground has-[[data-checked]]:border-primary has-[[data-checked]]:bg-primary/5"
              >
                <RadioGroupItem value={option.value} id={`personal-gender-${option.value}`} />
                {option.label}
              </label>
            ))}
          </RadioGroup>
        </div>
      </div>

      {message && (
        <div
          role="alert"
          aria-live="assertive"
          className={
            status === "success"
              ? "rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
              : "rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          }
        >
          {message}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isSaving}
          aria-busy={isSaving}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-primary px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {isSaving ? PERSONAL_INFO_FORM_META.savingLabel : PERSONAL_INFO_FORM_META.saveLabel}
        </button>
      </div>
    </form>
  );
}
