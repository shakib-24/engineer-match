"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createClient } from "@/lib/supabase/client";
import { saveEngineerProfile, updateUserName, type EngineerProfile } from "@/lib/engineer/profile";
import {
  BASIC_INFO_FORM_FIELDS,
  BASIC_INFO_FORM_META,
  VISIBILITY_FORM_LABEL,
  VISIBILITY_OPTIONS,
  WORK_STYLE_OPTIONS,
} from "@/constants/engineer-profile";

const SELECT_CLASS =
  "h-9 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

interface BasicProfileFormProps {
  userId: string;
  initialName: string;
  email: string;
  profile: EngineerProfile | null;
}

interface FormState {
  name: string;
  prefecture: string;
  yearsOfExperience: string;
  workStyle: string;
  desiredRateMin: string;
  desiredRateMax: string;
  portfolioUrl: string;
  selfPr: string;
  isPublic: boolean;
}

function buildFormState(name: string, profile: EngineerProfile | null): FormState {
  return {
    name,
    prefecture: profile?.prefecture ?? "",
    yearsOfExperience:
      profile?.years_of_experience !== null && profile?.years_of_experience !== undefined
        ? String(profile.years_of_experience)
        : "",
    workStyle: profile?.work_style ?? "",
    desiredRateMin: profile?.desired_rate_min ? String(profile.desired_rate_min) : "",
    desiredRateMax: profile?.desired_rate_max ? String(profile.desired_rate_max) : "",
    portfolioUrl: profile?.portfolio_url ?? "",
    selfPr: profile?.self_pr ?? "",
    isPublic: profile?.is_public ?? true,
  };
}

export function BasicProfileForm({ userId, initialName, email, profile }: BasicProfileFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() => buildFormState(initialName, profile));
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

    const name = form.name.trim();
    if (!name) {
      setMessage(BASIC_INFO_FORM_META.nameRequired);
      setStatus("error");
      return;
    }

    let yearsOfExperience: number | null = null;
    if (form.yearsOfExperience.trim()) {
      const parsed = Number(form.yearsOfExperience);
      if (!Number.isInteger(parsed) || parsed < 0 || parsed > 50) {
        setMessage(BASIC_INFO_FORM_META.invalidYearsOfExperience);
        setStatus("error");
        return;
      }
      yearsOfExperience = parsed;
    }

    let desiredRateMin: number | null = null;
    if (form.desiredRateMin.trim()) {
      const parsed = Number(form.desiredRateMin);
      if (!Number.isInteger(parsed) || parsed < 1 || parsed > 999) {
        setMessage(BASIC_INFO_FORM_META.invalidRate);
        setStatus("error");
        return;
      }
      desiredRateMin = parsed;
    }

    let desiredRateMax: number | null = null;
    if (form.desiredRateMax.trim()) {
      const parsed = Number(form.desiredRateMax);
      if (!Number.isInteger(parsed) || parsed < 1 || parsed > 999) {
        setMessage(BASIC_INFO_FORM_META.invalidRate);
        setStatus("error");
        return;
      }
      desiredRateMax = parsed;
    }

    if (desiredRateMin !== null && desiredRateMax !== null && desiredRateMin > desiredRateMax) {
      setMessage(BASIC_INFO_FORM_META.invalidRateOrder);
      setStatus("error");
      return;
    }

    if (form.selfPr.length > 2000) {
      setMessage(BASIC_INFO_FORM_META.invalidSelfPr);
      setStatus("error");
      return;
    }

    setIsSaving(true);

    try {
      const supabase = createClient();

      const [{ error: nameError }, { error: profileError }] = await Promise.all([
        name !== initialName ? updateUserName(supabase, userId, name) : Promise.resolve({ error: null }),
        saveEngineerProfile(supabase, userId, {
          prefecture: form.prefecture.trim() || null,
          years_of_experience: yearsOfExperience,
          self_pr: form.selfPr.trim() || null,
          work_style: (form.workStyle || null) as EngineerProfile["work_style"],
          desired_rate_min: desiredRateMin,
          desired_rate_max: desiredRateMax,
          portfolio_url: form.portfolioUrl.trim() || null,
          is_public: form.isPublic,
        }),
      ]);

      if (nameError || profileError) {
        console.error("[engineer-profile] save failed:", nameError ?? profileError);
        setMessage(BASIC_INFO_FORM_META.saveFailedMessage);
        setStatus("error");
        return;
      }

      setMessage(BASIC_INFO_FORM_META.savedMessage);
      setStatus("success");
      router.refresh();
    } catch (err) {
      console.error("[engineer-profile] unexpected save error:", err);
      setMessage(BASIC_INFO_FORM_META.saveFailedMessage);
      setStatus("error");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="basic-name">{BASIC_INFO_FORM_FIELDS.name.label}</Label>
          <Input
            id="basic-name"
            type="text"
            value={form.name}
            placeholder={BASIC_INFO_FORM_FIELDS.name.placeholder}
            onChange={(event) => updateField("name", event.target.value)}
            className="h-9"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="basic-email">メールアドレス</Label>
          <Input id="basic-email" type="email" value={email} disabled className="h-9" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="basic-prefecture">{BASIC_INFO_FORM_FIELDS.prefecture.label}</Label>
          <Input
            id="basic-prefecture"
            type="text"
            value={form.prefecture}
            placeholder={BASIC_INFO_FORM_FIELDS.prefecture.placeholder}
            onChange={(event) => updateField("prefecture", event.target.value)}
            className="h-9"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="basic-years">{BASIC_INFO_FORM_FIELDS.yearsOfExperience.label}</Label>
          <Input
            id="basic-years"
            type="number"
            inputMode="numeric"
            min={0}
            max={50}
            placeholder={BASIC_INFO_FORM_FIELDS.yearsOfExperience.placeholder}
            value={form.yearsOfExperience}
            onChange={(event) => updateField("yearsOfExperience", event.target.value)}
            className="h-9"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="basic-work-style">{BASIC_INFO_FORM_FIELDS.workStyle.label}</Label>
          <select
            id="basic-work-style"
            value={form.workStyle}
            onChange={(event) => updateField("workStyle", event.target.value)}
            className={SELECT_CLASS}
          >
            <option value="">選択してください</option>
            {WORK_STYLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="basic-portfolio-url">{BASIC_INFO_FORM_FIELDS.portfolioUrl.label}</Label>
          <Input
            id="basic-portfolio-url"
            type="url"
            value={form.portfolioUrl}
            placeholder={BASIC_INFO_FORM_FIELDS.portfolioUrl.placeholder}
            onChange={(event) => updateField("portfolioUrl", event.target.value)}
            className="h-9"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="basic-rate-min">{BASIC_INFO_FORM_FIELDS.desiredRateMin.label}</Label>
          <Input
            id="basic-rate-min"
            type="number"
            inputMode="numeric"
            min={1}
            max={999}
            placeholder={BASIC_INFO_FORM_FIELDS.desiredRateMin.placeholder}
            value={form.desiredRateMin}
            onChange={(event) => updateField("desiredRateMin", event.target.value)}
            className="h-9"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="basic-rate-max">{BASIC_INFO_FORM_FIELDS.desiredRateMax.label}</Label>
          <Input
            id="basic-rate-max"
            type="number"
            inputMode="numeric"
            min={1}
            max={999}
            placeholder={BASIC_INFO_FORM_FIELDS.desiredRateMax.placeholder}
            value={form.desiredRateMax}
            onChange={(event) => updateField("desiredRateMax", event.target.value)}
            className="h-9"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="basic-self-pr">{BASIC_INFO_FORM_FIELDS.selfPr.label}</Label>
        <Textarea
          id="basic-self-pr"
          value={form.selfPr}
          onChange={(event) => updateField("selfPr", event.target.value)}
          maxLength={2000}
          rows={5}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm leading-none font-medium">{VISIBILITY_FORM_LABEL}</span>
        <RadioGroup
          value={String(form.isPublic)}
          onValueChange={(value) => updateField("isPublic", value === "true")}
          aria-label={VISIBILITY_FORM_LABEL}
          className="grid grid-cols-1 gap-2 sm:grid-cols-2"
        >
          {VISIBILITY_OPTIONS.map((option) => (
            <label
              key={String(option.value)}
              htmlFor={`visibility-${option.value}`}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground has-[[data-checked]]:border-primary has-[[data-checked]]:bg-primary/5"
            >
              <RadioGroupItem value={String(option.value)} id={`visibility-${option.value}`} />
              {option.label}
            </label>
          ))}
        </RadioGroup>
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
          {isSaving ? BASIC_INFO_FORM_META.savingLabel : BASIC_INFO_FORM_META.saveLabel}
        </button>
      </div>
    </form>
  );
}
