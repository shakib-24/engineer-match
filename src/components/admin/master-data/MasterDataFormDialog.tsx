"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Pencil, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MASTER_DATA_FORM_LABELS, type MasterDataItem } from "@/constants/admin-master-data";

export interface MasterDataFormValues {
  displayName: string;
  internalCode: string;
  category: string;
  description: string;
  active: boolean;
}

interface MasterDataFormDialogProps {
  mode: "add" | "edit" | null;
  initial?: MasterDataItem;
  onCancel: () => void;
  onSave: (values: MasterDataFormValues) => void;
}

export function MasterDataFormDialog({ mode, initial, onCancel, onSave }: MasterDataFormDialogProps) {
  const titleId = useId();
  const displayNameId = useId();
  const internalCodeId = useId();
  const categoryId = useId();
  const descriptionId = useId();
  const activeId = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState("");
  const [internalCode, setInternalCode] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);

  const openKey = mode ? `${mode}:${initial?.id ?? "new"}` : null;
  const [prevOpenKey, setPrevOpenKey] = useState(openKey);

  if (openKey !== prevOpenKey) {
    setPrevOpenKey(openKey);
    if (openKey) {
      setDisplayName(initial?.displayName ?? "");
      setInternalCode(initial?.internalCode ?? "");
      setCategory(initial?.category ?? "");
      setDescription(initial?.description ?? "");
      setActive(initial?.active ?? true);
    }
  }

  useEffect(() => {
    if (!mode) return;
    firstFieldRef.current?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mode, initial, onCancel]);

  if (!mode) return null;

  const canSave = displayName.trim().length > 0 && internalCode.trim().length > 0;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canSave) return;
    onSave({
      displayName: displayName.trim(),
      internalCode: internalCode.trim(),
      category: category.trim(),
      description: description.trim(),
      active,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label={MASTER_DATA_FORM_LABELS.cancelLabel}
        onClick={onCancel}
        className="absolute inset-0 bg-black/40"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex w-full max-w-lg flex-col gap-5 rounded-2xl bg-surface p-6 shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            {mode === "add" ? (
              <Plus className="h-5 w-5 text-primary" aria-hidden="true" />
            ) : (
              <Pencil className="h-5 w-5 text-primary" aria-hidden="true" />
            )}
          </div>
          <h2 id={titleId} className="text-base font-semibold text-foreground">
            {mode === "add" ? MASTER_DATA_FORM_LABELS.addTitle : MASTER_DATA_FORM_LABELS.editTitle}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor={displayNameId}>
              {MASTER_DATA_FORM_LABELS.displayNameLabel}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id={displayNameId}
              ref={firstFieldRef}
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor={internalCodeId}>
              {MASTER_DATA_FORM_LABELS.internalCodeLabel}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id={internalCodeId}
              value={internalCode}
              onChange={(event) => setInternalCode(event.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor={categoryId}>{MASTER_DATA_FORM_LABELS.categoryLabel}</Label>
            <Input id={categoryId} value={category} onChange={(event) => setCategory(event.target.value)} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor={descriptionId}>{MASTER_DATA_FORM_LABELS.descriptionLabel}</Label>
            <Textarea
              id={descriptionId}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border p-3">
            <Label htmlFor={activeId}>{MASTER_DATA_FORM_LABELS.activeLabel}</Label>
            <Switch id={activeId} checked={active} onCheckedChange={setActive} />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {MASTER_DATA_FORM_LABELS.cancelLabel}
            </button>
            <button
              type="submit"
              disabled={!canSave}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {MASTER_DATA_FORM_LABELS.saveLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
