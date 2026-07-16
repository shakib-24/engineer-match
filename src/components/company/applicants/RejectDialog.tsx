"use client";

import { useEffect, useId, useRef, useState } from "react";
import { TriangleAlert } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  REJECT_DIALOG_LABELS,
  REJECT_REASON_OPTIONS,
} from "@/constants/company-applicants";

const SELECT_CLASS =
  "h-9 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

interface RejectDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (reason: string, comment: string) => void;
}

export function RejectDialog({ isOpen, onCancel, onConfirm }: RejectDialogProps) {
  const titleId = useId();
  const reasonSelectRef = useRef<HTMLSelectElement>(null);
  const [reason, setReason] = useState<string>(REJECT_REASON_OPTIONS[0]);
  const [comment, setComment] = useState("");

  function resetForm() {
    setReason(REJECT_REASON_OPTIONS[0]);
    setComment("");
  }

  function handleCancel() {
    resetForm();
    onCancel();
  }

  function handleConfirm() {
    onConfirm(reason, comment);
    resetForm();
  }

  useEffect(() => {
    if (!isOpen) return;

    reasonSelectRef.current?.focus();

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
        aria-label={REJECT_DIALOG_LABELS.cancelLabel}
        onClick={handleCancel}
        className="absolute inset-0 bg-black/40"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex w-full max-w-md flex-col gap-5 rounded-2xl bg-surface p-6 shadow-xl"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
            <TriangleAlert className="h-5 w-5 text-red-600" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2 id={titleId} className="text-base font-semibold text-foreground">
              {REJECT_DIALOG_LABELS.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {REJECT_DIALOG_LABELS.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="reject-reason">{REJECT_DIALOG_LABELS.reasonLabel}</Label>
            <select
              id="reject-reason"
              ref={reasonSelectRef}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              className={SELECT_CLASS}
            >
              {REJECT_REASON_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="reject-comment">{REJECT_DIALOG_LABELS.commentLabel}</Label>
            <Textarea
              id="reject-comment"
              value={comment}
              placeholder={REJECT_DIALOG_LABELS.commentPlaceholder}
              onChange={(event) => setComment(event.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {REJECT_DIALOG_LABELS.cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {REJECT_DIALOG_LABELS.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
