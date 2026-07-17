"use client";

import { useEffect, useId, useRef } from "react";
import { ShieldAlert, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { MASTER_DATA_DELETE_DIALOG_LABELS, type MasterDataItem } from "@/constants/admin-master-data";

interface MasterDataDeleteDialogProps {
  item: MasterDataItem | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export function MasterDataDeleteDialog({ item, onCancel, onConfirm }: MasterDataDeleteDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const primaryButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!item) return;
    primaryButtonRef.current?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [item, onCancel]);

  if (!item) return null;

  const blocked = item.usageCount > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label={MASTER_DATA_DELETE_DIALOG_LABELS.cancelLabel}
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
              blocked ? "bg-amber-50" : "bg-red-50",
            )}
          >
            {blocked ? (
              <ShieldAlert className="h-5 w-5 text-amber-600" aria-hidden="true" />
            ) : (
              <TriangleAlert className="h-5 w-5 text-red-600" aria-hidden="true" />
            )}
          </div>
          <div className="min-w-0">
            <h2 id={titleId} className="text-base font-semibold text-foreground">
              {blocked
                ? MASTER_DATA_DELETE_DIALOG_LABELS.blockedTitle
                : MASTER_DATA_DELETE_DIALOG_LABELS.title}
            </h2>
            <p id={descriptionId} className="mt-1 text-sm text-muted-foreground">
              {blocked
                ? MASTER_DATA_DELETE_DIALOG_LABELS.blockedDescription
                : MASTER_DATA_DELETE_DIALOG_LABELS.description}
            </p>
            <p className="mt-2 text-sm font-medium text-foreground">
              {item.displayName}
              {blocked && (
                <span className="ml-2 text-xs font-normal text-muted-foreground">
                  （利用件数：{item.usageCount}）
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          {blocked ? (
            <button
              type="button"
              ref={primaryButtonRef}
              onClick={onCancel}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {MASTER_DATA_DELETE_DIALOG_LABELS.closeLabel}
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {MASTER_DATA_DELETE_DIALOG_LABELS.cancelLabel}
              </button>
              <button
                type="button"
                ref={primaryButtonRef}
                onClick={onConfirm}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {MASTER_DATA_DELETE_DIALOG_LABELS.confirmLabel}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
