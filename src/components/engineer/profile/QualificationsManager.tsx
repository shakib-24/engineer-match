"use client";

import { useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  addUserQualification,
  removeUserQualification,
  updateUserQualificationYear,
  type QualificationCatalogItem,
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
  const [yearDrafts, setYearDrafts] = useState<Record<string, string>>({});

  function yearValue(item: UserQualificationItem): string {
    if (item.id in yearDrafts) return yearDrafts[item.id];
    return item.obtainedYear ? String(item.obtainedYear) : "";
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
    const obtainedYear = newYear.trim() ? Number(newYear) : null;
    const { data, error: addError } = await addUserQualification(
      supabase,
      userId,
      newQualificationId,
      obtainedYear,
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
        obtainedYear,
      },
    ];
    setQualifications(nextQualifications);
    const nextAvailable = catalog.filter(
      (item) => !nextQualifications.some((q) => q.qualificationId === item.id),
    );
    setNewQualificationId(nextAvailable[0]?.id ?? "");
    setNewYear("");
  }

  async function handleYearBlur(userQualificationId: string) {
    const draft = yearDrafts[userQualificationId];
    if (draft === undefined) return;
    if (!isValidYear(draft)) {
      setError(QUALIFICATION_EDITOR_LABELS.invalidYear);
      return;
    }

    const current = qualifications.find((q) => q.id === userQualificationId);
    const obtainedYear = draft.trim() ? Number(draft) : null;
    if (current && current.obtainedYear === obtainedYear) return;

    setIsSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error: updateError } = await updateUserQualificationYear(
      supabase,
      userQualificationId,
      obtainedYear,
    );

    setIsSubmitting(false);

    if (updateError) {
      console.error("[qualifications] year update failed:", updateError);
      setError(QUALIFICATION_EDITOR_LABELS.updateError);
      return;
    }

    setQualifications((prev) =>
      prev.map((q) => (q.id === userQualificationId ? { ...q, obtainedYear } : q)),
    );
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
