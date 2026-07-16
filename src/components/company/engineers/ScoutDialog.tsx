"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Send } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  INTERVIEW_PREFERENCE_OPTIONS,
  SCOUT_DIALOG_LABELS,
  SCOUT_JOB_OPTIONS,
} from "@/constants/company-engineers";

const SELECT_CLASS =
  "h-9 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export interface ScoutFormDetails {
  jobId: string;
  subject: string;
  message: string;
  interviewPreference: string;
  notes: string;
}

interface ScoutDialogProps {
  isOpen: boolean;
  engineerName: string;
  isAlreadyScouted: boolean;
  onCancel: () => void;
  onConfirm: (details: ScoutFormDetails) => void;
}

function buildInitialDetails(): ScoutFormDetails {
  return {
    jobId: SCOUT_JOB_OPTIONS[0]?.id ?? "",
    subject: "",
    message: "",
    interviewPreference: INTERVIEW_PREFERENCE_OPTIONS[0],
    notes: "",
  };
}

export function ScoutDialog({
  isOpen,
  engineerName,
  isAlreadyScouted,
  onCancel,
  onConfirm,
}: ScoutDialogProps) {
  const titleId = useId();
  const jobSelectRef = useRef<HTMLSelectElement>(null);
  const [details, setDetails] = useState<ScoutFormDetails>(buildInitialDetails);

  function updateDetails(patch: Partial<ScoutFormDetails>) {
    setDetails((prev) => ({ ...prev, ...patch }));
  }

  function handleCancel() {
    setDetails(buildInitialDetails());
    onCancel();
  }

  function handleConfirm() {
    onConfirm(details);
    setDetails(buildInitialDetails());
  }

  useEffect(() => {
    if (!isOpen) return;

    jobSelectRef.current?.focus();

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
        aria-label={SCOUT_DIALOG_LABELS.cancelLabel}
        onClick={handleCancel}
        className="absolute inset-0 bg-black/40"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[85vh] w-full max-w-lg flex-col gap-5 overflow-y-auto rounded-2xl bg-surface p-6 shadow-xl"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Send className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2 id={titleId} className="text-base font-semibold text-foreground">
              {SCOUT_DIALOG_LABELS.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {engineerName} ・ {SCOUT_DIALOG_LABELS.description}
            </p>
          </div>
        </div>

        {isAlreadyScouted ? (
          <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {SCOUT_DIALOG_LABELS.alreadyScoutedMessage}
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="scout-job">{SCOUT_DIALOG_LABELS.jobLabel}</Label>
              <select
                id="scout-job"
                ref={jobSelectRef}
                value={details.jobId}
                onChange={(event) => updateDetails({ jobId: event.target.value })}
                className={SELECT_CLASS}
              >
                {SCOUT_JOB_OPTIONS.length === 0 && (
                  <option value="">{SCOUT_DIALOG_LABELS.jobPlaceholder}</option>
                )}
                {SCOUT_JOB_OPTIONS.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="scout-subject">{SCOUT_DIALOG_LABELS.subjectLabel}</Label>
              <Input
                id="scout-subject"
                type="text"
                value={details.subject}
                placeholder={SCOUT_DIALOG_LABELS.subjectPlaceholder}
                onChange={(event) => updateDetails({ subject: event.target.value })}
                className="h-9"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="scout-message">{SCOUT_DIALOG_LABELS.messageLabel}</Label>
              <Textarea
                id="scout-message"
                value={details.message}
                placeholder={SCOUT_DIALOG_LABELS.messagePlaceholder}
                onChange={(event) => updateDetails({ message: event.target.value })}
                rows={4}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="scout-interview">{SCOUT_DIALOG_LABELS.interviewLabel}</Label>
              <select
                id="scout-interview"
                value={details.interviewPreference}
                onChange={(event) => updateDetails({ interviewPreference: event.target.value })}
                className={SELECT_CLASS}
              >
                {INTERVIEW_PREFERENCE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="scout-notes">{SCOUT_DIALOG_LABELS.notesLabel}</Label>
              <Textarea
                id="scout-notes"
                value={details.notes}
                placeholder={SCOUT_DIALOG_LABELS.notesPlaceholder}
                onChange={(event) => updateDetails({ notes: event.target.value })}
                rows={2}
              />
            </div>

            <p className="text-xs text-muted-foreground">{SCOUT_DIALOG_LABELS.demoNote}</p>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {SCOUT_DIALOG_LABELS.cancelLabel}
          </button>
          {!isAlreadyScouted && (
            <button
              type="button"
              onClick={handleConfirm}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              {SCOUT_DIALOG_LABELS.confirmLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
