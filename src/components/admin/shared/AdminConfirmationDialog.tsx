"use client";

import { useEffect, useId, useRef, useState } from "react";
import { TriangleAlert } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface AdminConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: (reason?: string) => void;
  tone?: "danger" | "primary";
  reasonLabel?: string;
  reasonPlaceholder?: string;
  reasonRequired?: boolean;
}

export function AdminConfirmationDialog({
  isOpen,
  title,
  description,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  tone = "danger",
  reasonLabel,
  reasonPlaceholder,
  reasonRequired = false,
}: AdminConfirmationDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const reasonId = useId();
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const [reason, setReason] = useState("");
  const [wasOpen, setWasOpen] = useState(isOpen);

  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) setReason("");
  }

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

  const needsReason = Boolean(reasonLabel);
  const canConfirm = !reasonRequired || reason.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label={cancelLabel}
        onClick={onCancel}
        className="absolute inset-0 bg-black/40"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative flex w-full max-w-md flex-col gap-5 rounded-2xl bg-surface p-6 shadow-xl"
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
              tone === "danger" ? "bg-red-50" : "bg-primary/10",
            )}
          >
            <TriangleAlert
              className={cn("h-5 w-5", tone === "danger" ? "text-red-600" : "text-primary")}
              aria-hidden="true"
            />
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

        {needsReason && (
          <div className="flex flex-col gap-2">
            <Label htmlFor={reasonId}>
              {reasonLabel}
              {reasonRequired && <span className="text-destructive">*</span>}
            </Label>
            <Textarea
              id={reasonId}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder={reasonPlaceholder}
              rows={3}
            />
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            ref={confirmButtonRef}
            disabled={!canConfirm}
            onClick={() => onConfirm(needsReason ? reason : undefined)}
            className={cn(
              "inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold text-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              tone === "danger"
                ? "bg-red-600 hover:bg-red-700 focus-visible:ring-red-600"
                : "bg-primary hover:bg-indigo-700 focus-visible:ring-primary",
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
