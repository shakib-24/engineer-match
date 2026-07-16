"use client";

import { useState, type SubmitEvent } from "react";
import {
  JobFormActions,
  JobFormFields,
  buildInitialFormState,
  type JobFormState,
} from "@/components/company/CreateJobForm";
import { EDIT_JOB_META, type CompanyJob } from "@/constants/company-jobs";

interface EditJobFormProps {
  job: CompanyJob;
}

export function EditJobForm({ job }: EditJobFormProps) {
  const [state, setState] = useState<JobFormState>(() => buildInitialFormState(job));
  const [showPreview, setShowPreview] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  function updateState(patch: Partial<JobFormState>) {
    setState((prev) => ({ ...prev, ...patch }));
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavedMessage(EDIT_JOB_META.saveSuccessMessage);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-4xl flex-col gap-6"
    >
      <JobFormFields state={state} onChange={updateState} idPrefix={`edit-${job.id}`} />
      <JobFormActions
        state={state}
        onSave={() => setSavedMessage(EDIT_JOB_META.saveSuccessMessage)}
        onSaveDraft={() => setSavedMessage(EDIT_JOB_META.draftSuccessMessage)}
        showPreview={showPreview}
        onTogglePreview={() => setShowPreview((prev) => !prev)}
        savedMessage={savedMessage}
        onDismissSavedMessage={() => setSavedMessage(null)}
        demoNote={EDIT_JOB_META.demoNote}
        cancelHref={EDIT_JOB_META.cancelHref}
      />
    </form>
  );
}
