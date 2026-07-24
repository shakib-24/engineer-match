"use client";

import { useEffect, useId, useRef, useState } from "react";
import { TriangleAlert } from "lucide-react";
import { COMPANY_DANGER_ZONE, COMPANY_SETTINGS_UNAVAILABLE_NOTE } from "@/constants/company-settings";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}

function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    confirmButtonRef.current?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label={COMPANY_DANGER_ZONE.cancelLabel}
        onClick={onCancel}
        className="absolute inset-0 bg-black/40"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative flex w-full max-w-sm flex-col gap-5 rounded-2xl bg-surface p-6 shadow-xl"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
            <TriangleAlert className="h-5 w-5 text-red-600" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2 id={titleId} className="text-base font-semibold text-foreground">
              {title}
            </h2>
            <p id={descriptionId} className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {COMPANY_DANGER_ZONE.cancelLabel}
          </button>
          <button
            type="button"
            ref={confirmButtonRef}
            onClick={onConfirm}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

type DangerAction = "deactivate" | "delete" | null;

export function CompanyDangerZone() {
  const [activeDialog, setActiveDialog] = useState<DangerAction>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function handleConfirm() {
    setActiveDialog(null);
    setToastMessage(COMPANY_SETTINGS_UNAVAILABLE_NOTE);
    window.setTimeout(() => setToastMessage(null), 3000);
  }

  return (
    <section className="rounded-2xl border border-red-200 bg-red-50/40 p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-semibold text-red-700">{COMPANY_DANGER_ZONE.title}</h2>
      <p className="mt-1 text-sm text-red-700/80">{COMPANY_DANGER_ZONE.description}</p>

      <div className="mt-6 flex flex-col divide-y divide-red-200">
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 first:pt-0">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              {COMPANY_DANGER_ZONE.deactivate.label}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {COMPANY_DANGER_ZONE.deactivate.description}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveDialog("deactivate")}
            className="inline-flex h-9 shrink-0 items-center justify-center rounded-xl border border-red-300 bg-white px-4 text-sm font-semibold text-red-600 transition-colors duration-200 hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {COMPANY_DANGER_ZONE.deactivate.buttonLabel}
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 py-4 last:pb-0">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              {COMPANY_DANGER_ZONE.delete.label}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {COMPANY_DANGER_ZONE.delete.description}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveDialog("delete")}
            className="inline-flex h-9 shrink-0 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {COMPANY_DANGER_ZONE.delete.buttonLabel}
          </button>
        </div>
      </div>

      <p className="mt-5 text-xs text-red-700/70">{COMPANY_SETTINGS_UNAVAILABLE_NOTE}</p>

      <ConfirmDialog
        isOpen={activeDialog === "deactivate"}
        title={COMPANY_DANGER_ZONE.deactivate.dialogTitle}
        description={COMPANY_DANGER_ZONE.deactivate.dialogDescription}
        confirmLabel={COMPANY_DANGER_ZONE.deactivate.confirmLabel}
        onCancel={() => setActiveDialog(null)}
        onConfirm={handleConfirm}
      />
      <ConfirmDialog
        isOpen={activeDialog === "delete"}
        title={COMPANY_DANGER_ZONE.delete.dialogTitle}
        description={COMPANY_DANGER_ZONE.delete.dialogDescription}
        confirmLabel={COMPANY_DANGER_ZONE.delete.confirmLabel}
        onCancel={() => setActiveDialog(null)}
        onConfirm={handleConfirm}
      />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 sm:justify-end sm:pr-6"
        >
          <div className="flex items-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-white shadow-lg">
            {toastMessage}
          </div>
        </div>
      )}
    </section>
  );
}
