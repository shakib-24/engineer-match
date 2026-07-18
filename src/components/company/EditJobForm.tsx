"use client";

import { useState, type SubmitEvent } from "react";
import {
  JobFormActions,
  JobFormFields,
  buildInitialFormState,
  focusFirstEmploymentError,
  getEmploymentErrors,
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
  const [employmentErrors, setEmploymentErrors] = useState<Record<string, string>>({});
  const idPrefix = `edit-${job.id}`;

  function updateState(patch: Partial<JobFormState>) {
    setState((prev) => ({ ...prev, ...patch }));
  }

  function attemptSave(onValid: () => void) {
    const errors = getEmploymentErrors(state);
    if (Object.keys(errors).length > 0) {
      setEmploymentErrors(errors);
      focusFirstEmploymentError(errors, idPrefix);
      return;
    }
    setEmploymentErrors({});
    onValid();
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    attemptSave(() => setSavedMessage(EDIT_JOB_META.saveSuccessMessage));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-4xl flex-col gap-6"
    >
      <JobFormFields
        state={state}
        onChange={updateState}
        idPrefix={idPrefix}
        employmentErrors={employmentErrors}
      />
      <JobFormActions
        state={state}
        onSave={() => attemptSave(() => setSavedMessage(EDIT_JOB_META.saveSuccessMessage))}
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
