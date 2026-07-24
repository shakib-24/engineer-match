"use client";

import { useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  addUserQualification,
  removeUserQualification,
  updateUserQualification,
  type QualificationCatalogItem,
  type QualificationExpirationInput,
  type UserQualificationItem,
} from "@/lib/engineer/qualifications";
import { createClient } from "@/lib/supabase/client";
import { QUALIFICATION_EDITOR_LABELS } from "@/constants/engineer-profile";

const SELECT_CLASS =
  "h-9 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

interface QualificationsManagerProps {
  userId: string;
  initialQualifications: UserQualificationItem[];
  catalog: QualificationCatalogItem[];
}

function isValidYear(value: string): boolean {
  if (!value.trim()) return true;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 1950 && parsed <= 2100;
}

export function QualificationsManager({
  userId,
  initialQualifications,
  catalog,
}: QualificationsManagerProps) {
  const [qualifications, setQualifications] =
    useState<UserQualificationItem[]>(initialQualifications);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const availableToAdd = catalog.filter(
    (item) => !qualifications.some((q) => q.qualificationId === item.id),
  );
  const [newQualificationId, setNewQualificationId] = useState<string>(availableToAdd[0]?.id ?? "");
  const [newYear, setNewYear] = useState<string>("");
  const [newExpirationDate, setNewExpirationDate] = useState<string>("");
  const [newNoExpiration, setNewNoExpiration] = useState(false);

  const [yearDrafts, setYearDrafts] = useState<Record<string, string>>({});
  const [expirationDrafts, setExpirationDrafts] = useState<Record<string, string>>({});

  function yearValue(item: UserQualificationItem): string {
    if (item.id in yearDrafts) return yearDrafts[item.id];
    return item.obtainedYear ? String(item.obtainedYear) : "";
  }

  function expirationValue(item: UserQualificationItem): string {
    if (item.id in expirationDrafts) return expirationDrafts[item.id];
    return item.expirationDate ?? "";
  }

  async function saveQualification(
    id: string,
    patch: Partial<QualificationExpirationInput>,
  ) {
    const current = qualifications.find((q) => q.id === id);
    if (!current) return;

    const input: QualificationExpirationInput = {
      obtainedYear: current.obtainedYear,
      expirationDate: current.expirationDate,
      noExpiration: current.noExpiration,
      ...patch,
    };

    setIsSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error: updateError } = await updateUserQualification(supabase, id, input);

    setIsSubmitting(false);

    if (updateError) {
      console.error("[qualifications] update failed:", updateError);
      setError(QUALIFICATION_EDITOR_LABELS.updateError);
      return;
    }

    setQualifications((prev) => prev.map((q) => (q.id === id ? { ...q, ...input } : q)));
  }

  async function handleAdd() {
    if (isSubmitting || !newQualificationId) return;
    if (!isValidYear(newYear)) {
      setError(QUALIFICATION_EDITOR_LABELS.invalidYear);
      return;
    }
    setIsSubmitting(true);
    setError(null);

    const supabase = createClient();
    const input: QualificationExpirationInput = {
      obtainedYear: newYear.trim() ? Number(newYear) : null,
      expirationDate: newNoExpiration ? null : newExpirationDate.trim() || null,
      noExpiration: newNoExpiration,
    };
    const { data, error: addError } = await addUserQualification(
      supabase,
      userId,
      newQualificationId,
      input,
    );

    setIsSubmitting(false);

    if (addError || !data) {
      console.error("[qualifications] add failed:", addError);
      setError(QUALIFICATION_EDITOR_LABELS.addError);
      return;
    }

    const catalogItem = catalog.find((item) => item.id === newQualificationId);
    const nextQualifications = [
      ...qualifications,
      {
        id: data.id as string,
        qualificationId: newQualificationId,
        name: catalogItem?.name ?? "",
        organization: catalogItem?.organization ?? "",
        ...input,
      },
    ];
    setQualifications(nextQualifications);
    const nextAvailable = catalog.filter(
      (item) => !nextQualifications.some((q) => q.qualificationId === item.id),
    );
    setNewQualificationId(nextAvailable[0]?.id ?? "");
    setNewYear("");
    setNewExpirationDate("");
    setNewNoExpiration(false);
  }

  async function handleYearBlur(id: string) {
    const draft = yearDrafts[id];
    if (draft === undefined) return;
    if (!isValidYear(draft)) {
      setError(QUALIFICATION_EDITOR_LABELS.invalidYear);
      return;
    }
    const obtainedYear = draft.trim() ? Number(draft) : null;
    const current = qualifications.find((q) => q.id === id);
    if (current && current.obtainedYear === obtainedYear) return;
    await saveQualification(id, { obtainedYear });
  }

  async function handleExpirationBlur(id: string) {
    const draft = expirationDrafts[id];
    if (draft === undefined) return;
    const current = qualifications.find((q) => q.id === id);
    if (current?.noExpiration) return;
    const expirationDate = draft.trim() || null;
    if (current && current.expirationDate === expirationDate) return;
    await saveQualification(id, { expirationDate });
  }

  async function handleNoExpirationToggle(id: string, checked: boolean) {
    // Only override expirationDate when *checking* (clear it) -- unchecking
    // leaves whatever date was already stored untouched (patch omits the key,
    // so saveQualification's spread falls back to the current value).
    await saveQualification(id, checked ? { noExpiration: true, expirationDate: null } : { noExpiration: false });
  }

  async function handleRemove(userQualificationId: string) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error: removeError } = await removeUserQualification(supabase, userQualificationId);

    setIsSubmitting(false);

    if (removeError) {
      console.error("[qualifications] remove failed:", removeError);
      setError(QUALIFICATION_EDITOR_LABELS.removeError);
      return;
    }

    setQualifications((prev) => prev.filter((q) => q.id !== userQualificationId));
  }

  return (
    <fieldset className="flex flex-col gap-3">
      {qualifications.length === 0 && (
        <p className="text-sm text-muted-foreground">{QUALIFICATION_EDITOR_LABELS.emptyMessage}</p>
      )}

      {qualifications.map((qualification) => (
        <div
          key={qualification.id}
          className="flex flex-wrap items-end gap-3 rounded-xl border border-border p-3"
        >
          <div className="min-w-40 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">{qualification.name}</p>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {qualification.organization}
            </p>
          </div>
          <div className="flex w-28 flex-col gap-1.5">
            <Label htmlFor={`qual-year-${qualification.id}`} className="sr-only">
              {QUALIFICATION_EDITOR_LABELS.yearLabel}
            </Label>
            <Input
              id={`qual-year-${qualification.id}`}
              type="number"
              inputMode="numeric"
              min={1950}
              max={2100}
              placeholder={QUALIFICATION_EDITOR_LABELS.yearPlaceholder}
              value={yearValue(qualification)}
              disabled={isSubmitting}
              onChange={(event) =>
                setYearDrafts((prev) => ({ ...prev, [qualification.id]: event.target.value }))
              }
              onBlur={() => handleYearBlur(qualification.id)}
              className="h-9"
            />
          </div>
          <div className="flex w-40 flex-col gap-1.5">
            <Label htmlFor={`qual-expiration-${qualification.id}`} className="sr-only">
              {QUALIFICATION_EDITOR_LABELS.expirationDateLabel}
            </Label>
            <Input
              id={`qual-expiration-${qualification.id}`}
              type="date"
              disabled={isSubmitting || qualification.noExpiration}
              value={expirationValue(qualification)}
              onChange={(event) =>
                setExpirationDrafts((prev) => ({ ...prev, [qualification.id]: event.target.value }))
              }
              onBlur={() => handleExpirationBlur(qualification.id)}
              className="h-9"
            />
          </div>
          <label className="flex h-9 shrink-0 cursor-pointer items-center gap-2 text-xs text-foreground">
            <Checkbox
              checked={qualification.noExpiration}
              disabled={isSubmitting}
              onCheckedChange={(checked) => handleNoExpirationToggle(qualification.id, checked)}
            />
            {QUALIFICATION_EDITOR_LABELS.noExpirationLabel}
          </label>
          <button
            type="button"
            onClick={() => handleRemove(qualification.id)}
            disabled={isSubmitting}
            aria-label={`${QUALIFICATION_EDITOR_LABELS.removeLabel}：${qualification.name}`}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-destructive/10 hover:text-destructive focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ))}

      {availableToAdd.length > 0 ? (
        <div className="flex flex-wrap items-end gap-3 rounded-xl border border-dashed border-border p-3">
          <div className="flex min-w-40 flex-1 flex-col gap-1.5">
            <Label htmlFor="new-qualification-name">
              {QUALIFICATION_EDITOR_LABELS.qualificationLabel}
            </Label>
            <select
              id="new-qualification-name"
              value={newQualificationId}
              onChange={(event) => setNewQualificationId(event.target.value)}
              className={SELECT_CLASS}
            >
              {availableToAdd.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}（{item.organization}）
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-28 flex-col gap-1.5">
            <Label htmlFor="new-qualification-year">{QUALIFICATION_EDITOR_LABELS.yearLabel}</Label>
            <Input
              id="new-qualification-year"
              type="number"
              inputMode="numeric"
              min={1950}
              max={2100}
              placeholder={QUALIFICATION_EDITOR_LABELS.yearPlaceholder}
              value={newYear}
              onChange={(event) => setNewYear(event.target.value)}
              className="h-9"
            />
          </div>
          <div className="flex w-40 flex-col gap-1.5">
            <Label htmlFor="new-qualification-expiration">
              {QUALIFICATION_EDITOR_LABELS.expirationDateLabel}
            </Label>
            <Input
              id="new-qualification-expiration"
              type="date"
              disabled={newNoExpiration}
              value={newExpirationDate}
              onChange={(event) => setNewExpirationDate(event.target.value)}
              className="h-9"
            />
          </div>
          <label className="flex h-9 shrink-0 cursor-pointer items-center gap-2 text-xs text-foreground">
            <Checkbox
              checked={newNoExpiration}
              onCheckedChange={(checked) => {
                setNewNoExpiration(checked);
                if (checked) setNewExpirationDate("");
              }}
            />
            {QUALIFICATION_EDITOR_LABELS.noExpirationLabel}
          </label>
          <button
            type="button"
            onClick={handleAdd}
            disabled={isSubmitting}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-dashed border-border px-3 text-xs font-semibold text-primary transition-colors duration-200 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            ) : (
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {QUALIFICATION_EDITOR_LABELS.addLabel}
          </button>
        </div>
      ) : (
        qualifications.length > 0 && (
          <p className="text-xs text-muted-foreground">
            {QUALIFICATION_EDITOR_LABELS.emptyCatalogMessage}
          </p>
        )
      )}

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </fieldset>
  );
}
