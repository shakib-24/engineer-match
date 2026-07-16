"use client";

import { useEffect, useId, useRef } from "react";
import { ArrowRight, CircleCheck } from "lucide-react";
import {
  STATUS_CHANGE_DIALOG_LABELS,
  type ApplicantStatus,
} from "@/constants/company-applicants";

interface StatusChangeDialogProps {
  isOpen: boolean;
  currentStatus: ApplicantStatus;
  nextStatus: ApplicantStatus;
  onCancel: () => void;
  onConfirm: () => void;
}

export function StatusChangeDialog({
  isOpen,
  currentStatus,
  nextStatus,
  onCancel,
  onConfirm,
}: StatusChangeDialogProps) {
  const titleId = useId();
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    confirmButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCancel();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label={STATUS_CHANGE_DIALOG_LABELS.cancelLabel}
        onClick={onCancel}
        className="absolute inset-0 bg-black/40"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex w-full max-w-sm flex-col gap-5 rounded-2xl bg-surface p-6 shadow-xl"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <CircleCheck className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2 id={titleId} className="text-base font-semibold text-foreground">
              {STATUS_CHANGE_DIALOG_LABELS.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {STATUS_CHANGE_DIALOG_LABELS.descriptionPrefix}
            </p>
            <div className="mt-2 flex items-center gap-2 text-sm font-semibold">
              <span className="text-muted-foreground">{currentStatus}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <span className="text-primary">{nextStatus}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {STATUS_CHANGE_DIALOG_LABELS.cancelLabel}
          </button>
          <button
            type="button"
            ref={confirmButtonRef}
            onClick={onConfirm}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {STATUS_CHANGE_DIALOG_LABELS.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
