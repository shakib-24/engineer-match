"use client";

import { useEffect, useId, useRef, useState } from "react";
import { TriangleAlert } from "lucide-react";
import { ADMIN_DANGER_ZONE_SECTION, ADMIN_SETTINGS_DEMO_NOTE } from "@/constants/admin-settings";

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
        aria-label={ADMIN_DANGER_ZONE_SECTION.cancelLabel}
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
            {ADMIN_DANGER_ZONE_SECTION.cancelLabel}
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

type DangerAction = "disableAccount" | "resetDemoData" | "resetPlatformSettings" | null;

export function AdminSettingsDangerZone() {
  const [activeDialog, setActiveDialog] = useState<DangerAction>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function handleConfirm() {
    setActiveDialog(null);
    setToastMessage(ADMIN_SETTINGS_DEMO_NOTE);
    window.setTimeout(() => setToastMessage(null), 3000);
  }

  const actions = [
    { key: "disableAccount" as const, config: ADMIN_DANGER_ZONE_SECTION.disableAccount },
    { key: "resetDemoData" as const, config: ADMIN_DANGER_ZONE_SECTION.resetDemoData },
    { key: "resetPlatformSettings" as const, config: ADMIN_DANGER_ZONE_SECTION.resetPlatformSettings },
  ];

  return (
    <section className="rounded-2xl border border-red-200 bg-red-50/40 p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-semibold text-red-700">{ADMIN_DANGER_ZONE_SECTION.title}</h2>
      <p className="mt-1 text-sm text-red-700/80">{ADMIN_DANGER_ZONE_SECTION.description}</p>

      <div className="mt-6 flex flex-col divide-y divide-red-200">
        {actions.map(({ key, config }) => (
          <div
            key={key}
            className="flex flex-wrap items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">{config.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{config.description}</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveDialog(key)}
              className="inline-flex h-9 shrink-0 items-center justify-center rounded-xl border border-red-300 bg-white px-4 text-sm font-semibold text-red-600 transition-colors duration-200 hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {config.buttonLabel}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs text-red-700/70">{ADMIN_SETTINGS_DEMO_NOTE}</p>

      {actions.map(({ key, config }) => (
        <ConfirmDialog
          key={key}
          isOpen={activeDialog === key}
          title={config.dialogTitle}
          description={config.dialogDescription}
          confirmLabel={config.confirmLabel}
          onCancel={() => setActiveDialog(null)}
          onConfirm={handleConfirm}
        />
      ))}

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
