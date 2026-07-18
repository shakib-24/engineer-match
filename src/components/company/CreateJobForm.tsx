"use client";

import { useRef, useState, type SubmitEvent } from "react";
import Link from "next/link";
import {
  Briefcase,
  ClipboardList,
  DollarSign,
  Eye,
  Gift,
  Info,
  Plus,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { ProfileSection } from "@/components/engineer/profile/ProfileSection";
import { EmploymentConditionsFields } from "@/components/company/EmploymentConditionsFields";
import { EmploymentConditionsSummary } from "@/components/jobs/EmploymentConditionsSummary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BASIC_INFO_FIELDS,
  BENEFITS_FIELDS,
  CONTRACT_TYPE_OPTIONS,
  CREATE_JOB_META,
  FORM_BUTTON_LABELS,
  FORM_SECTION_LABELS,
  ITSS_LEVEL_OPTIONS,
  JOB_DESCRIPTION_FIELDS,
  LOCATION_OPTIONS,
  PREVIEW_PANEL_LABELS,
  PUBLISH_SETTINGS_FIELDS,
  SALARY_FIELDS,
  SKILLS_FIELDS,
  WORK_CONDITIONS_FIELDS,
  WORK_STYLE_OPTIONS,
  type CompanyJob,
  type ContractType,
  type JobPostingStatus,
  type WorkStyle,
} from "@/constants/company-jobs";
import { createEmptyEmploymentConditions, type EmploymentConditions } from "@/constants/employment";
import { validateEmploymentConditions } from "@/lib/employment-validation";

const SELECT_CLASS =
  "h-9 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export interface WorkConditionRow {
  id: string;
  label: string;
  value: string;
}

export interface JobFormState {
  title: string;
  category: string;
  contractType: ContractType;
  location: string;
  workStyle: WorkStyle;
  itssLevel: number;
  experienceYearsMin: number;
  description: string;
  responsibilities: string;
  requirements: string;
  requiredSkills: string;
  preferredSkills: string;
  workConditions: WorkConditionRow[];
  salaryLabel: string;
  salaryMin: number;
  salaryMax: number;
  benefits: string;
  status: JobPostingStatus;
  isPublic: boolean;
  employmentConditions: EmploymentConditions;
}

export function buildInitialFormState(job?: CompanyJob): JobFormState {
  if (!job) {
    return {
      title: "",
      category: "",
      contractType: CONTRACT_TYPE_OPTIONS[0],
      location: LOCATION_OPTIONS[0],
      workStyle: WORK_STYLE_OPTIONS[0],
      itssLevel: ITSS_LEVEL_OPTIONS[0],
      experienceYearsMin: 0,
      description: "",
      responsibilities: "",
      requirements: "",
      requiredSkills: "",
      preferredSkills: "",
      workConditions: [{ id: "cond-1", label: "", value: "" }],
      salaryLabel: "",
      salaryMin: 300,
      salaryMax: 600,
      benefits: "",
      status: "下書き",
      isPublic: false,
      employmentConditions: createEmptyEmploymentConditions(),
    };
  }

  return {
    title: job.title,
    category: job.category,
    contractType: job.contractType,
    location: job.location,
    workStyle: job.workStyle,
    itssLevel: job.itssLevel,
    experienceYearsMin: job.experienceYearsMin,
    description: job.description,
    responsibilities: job.responsibilities.join("\n"),
    requirements: job.requirements.join("\n"),
    requiredSkills: job.requiredSkills.join("\n"),
    preferredSkills: job.preferredSkills.join("\n"),
    workConditions: job.workConditions.map((condition, index) => ({
      id: `cond-${index}`,
      label: condition.label,
      value: condition.value,
    })),
    salaryLabel: job.salaryLabel,
    salaryMin: job.salaryMinManYen,
    salaryMax: job.salaryMaxManYen,
    benefits: job.benefits.join("\n"),
    status: job.status,
    isPublic: job.isPublic,
    employmentConditions: job.employmentConditions ?? createEmptyEmploymentConditions(),
  };
}

interface JobFormFieldsProps {
  state: JobFormState;
  onChange: (patch: Partial<JobFormState>) => void;
  idPrefix: string;
  employmentErrors?: Record<string, string>;
}

export function JobFormFields({
  state,
  onChange,
  idPrefix,
  employmentErrors = {},
}: JobFormFieldsProps) {
  const workConditionCounter = useRef(state.workConditions.length);

  function addWorkCondition() {
    workConditionCounter.current += 1;
    onChange({
      workConditions: [
        ...state.workConditions,
        { id: `${idPrefix}-cond-new-${workConditionCounter.current}`, label: "", value: "" },
      ],
    });
  }

  function removeWorkCondition(id: string) {
    onChange({ workConditions: state.workConditions.filter((row) => row.id !== id) });
  }

  function updateWorkCondition(id: string, patch: Partial<WorkConditionRow>) {
    onChange({
      workConditions: state.workConditions.map((row) =>
        row.id === id ? { ...row, ...patch } : row,
      ),
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <ProfileSection title={FORM_SECTION_LABELS.basicInfo} icon={Info}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor={`${idPrefix}-title`}>{BASIC_INFO_FIELDS.title.label}</Label>
            <Input
              id={`${idPrefix}-title`}
              type="text"
              value={state.title}
              placeholder={BASIC_INFO_FIELDS.title.placeholder}
              onChange={(event) => onChange({ title: event.target.value })}
              className="h-9"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${idPrefix}-category`}>
              {BASIC_INFO_FIELDS.category.label}
            </Label>
            <Input
              id={`${idPrefix}-category`}
              type="text"
              value={state.category}
              placeholder={BASIC_INFO_FIELDS.category.placeholder}
              onChange={(event) => onChange({ category: event.target.value })}
              className="h-9"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${idPrefix}-contract-type`}>
              {BASIC_INFO_FIELDS.contractType.label}
            </Label>
            <select
              id={`${idPrefix}-contract-type`}
              value={state.contractType}
              onChange={(event) =>
                onChange({ contractType: event.target.value as ContractType })
              }
              className={SELECT_CLASS}
            >
              {CONTRACT_TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${idPrefix}-location`}>
              {BASIC_INFO_FIELDS.location.label}
            </Label>
            <select
              id={`${idPrefix}-location`}
              value={state.location}
              onChange={(event) => onChange({ location: event.target.value })}
              className={SELECT_CLASS}
            >
              {LOCATION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${idPrefix}-work-style`}>
              {BASIC_INFO_FIELDS.workStyle.label}
            </Label>
            <select
              id={`${idPrefix}-work-style`}
              value={state.workStyle}
              onChange={(event) =>
                onChange({ workStyle: event.target.value as WorkStyle })
              }
              className={SELECT_CLASS}
            >
              {WORK_STYLE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${idPrefix}-itss-level`}>
              {BASIC_INFO_FIELDS.itssLevel.label}
            </Label>
            <select
              id={`${idPrefix}-itss-level`}
              value={state.itssLevel}
              onChange={(event) => onChange({ itssLevel: Number(event.target.value) })}
              className={SELECT_CLASS}
            >
              {ITSS_LEVEL_OPTIONS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${idPrefix}-experience-years`}>
              {BASIC_INFO_FIELDS.experienceYearsMin.label}
            </Label>
            <Input
              id={`${idPrefix}-experience-years`}
              type="number"
              min={0}
              max={30}
              value={state.experienceYearsMin}
              onChange={(event) =>
                onChange({ experienceYearsMin: Number(event.target.value) })
              }
              className="h-9"
            />
          </div>
        </div>
      </ProfileSection>

      <ProfileSection title={FORM_SECTION_LABELS.jobDescription} icon={Briefcase}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${idPrefix}-description`}>
              {JOB_DESCRIPTION_FIELDS.description.label}
            </Label>
            <Textarea
              id={`${idPrefix}-description`}
              value={state.description}
              placeholder={JOB_DESCRIPTION_FIELDS.description.placeholder}
              onChange={(event) => onChange({ description: event.target.value })}
              rows={4}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${idPrefix}-responsibilities`}>
              {JOB_DESCRIPTION_FIELDS.responsibilities.label}
            </Label>
            <Textarea
              id={`${idPrefix}-responsibilities`}
              value={state.responsibilities}
              placeholder={JOB_DESCRIPTION_FIELDS.responsibilities.placeholder}
              onChange={(event) => onChange({ responsibilities: event.target.value })}
              rows={4}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${idPrefix}-requirements`}>
              {JOB_DESCRIPTION_FIELDS.requirements.label}
            </Label>
            <Textarea
              id={`${idPrefix}-requirements`}
              value={state.requirements}
              placeholder={JOB_DESCRIPTION_FIELDS.requirements.placeholder}
              onChange={(event) => onChange({ requirements: event.target.value })}
              rows={4}
            />
          </div>
        </div>
      </ProfileSection>

      {state.contractType === "就職" && (
        <EmploymentConditionsFields
          conditions={state.employmentConditions}
          onChange={(patch) =>
            onChange({ employmentConditions: { ...state.employmentConditions, ...patch } })
          }
          idPrefix={idPrefix}
          errors={employmentErrors}
        />
      )}

      <ProfileSection title={FORM_SECTION_LABELS.requiredSkills} icon={ClipboardList}>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${idPrefix}-required-skills`}>
            {SKILLS_FIELDS.requiredSkills.label}
          </Label>
          <Textarea
            id={`${idPrefix}-required-skills`}
            value={state.requiredSkills}
            placeholder={SKILLS_FIELDS.requiredSkills.placeholder}
            onChange={(event) => onChange({ requiredSkills: event.target.value })}
            rows={4}
          />
        </div>
      </ProfileSection>

      <ProfileSection title={FORM_SECTION_LABELS.preferredSkills} icon={Sparkles}>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${idPrefix}-preferred-skills`}>
            {SKILLS_FIELDS.preferredSkills.label}
          </Label>
          <Textarea
            id={`${idPrefix}-preferred-skills`}
            value={state.preferredSkills}
            placeholder={SKILLS_FIELDS.preferredSkills.placeholder}
            onChange={(event) => onChange({ preferredSkills: event.target.value })}
            rows={4}
          />
        </div>
      </ProfileSection>

      <ProfileSection title={FORM_SECTION_LABELS.workConditions} icon={ClipboardList}>
        <fieldset className="flex flex-col gap-3">
          <legend className="sr-only">{WORK_CONDITIONS_FIELDS.legend}</legend>
          {state.workConditions.map((row) => (
            <div
              key={row.id}
              className="flex flex-wrap items-end gap-3 rounded-xl border border-border p-3"
            >
              <div className="flex min-w-40 flex-1 flex-col gap-1.5">
                <Label htmlFor={`${row.id}-label`}>項目名</Label>
                <Input
                  id={`${row.id}-label`}
                  type="text"
                  value={row.label}
                  placeholder={WORK_CONDITIONS_FIELDS.labelPlaceholder}
                  onChange={(event) =>
                    updateWorkCondition(row.id, { label: event.target.value })
                  }
                  className="h-9"
                />
              </div>
              <div className="flex min-w-40 flex-[2] flex-col gap-1.5">
                <Label htmlFor={`${row.id}-value`}>内容</Label>
                <Input
                  id={`${row.id}-value`}
                  type="text"
                  value={row.value}
                  placeholder={WORK_CONDITIONS_FIELDS.valuePlaceholder}
                  onChange={(event) =>
                    updateWorkCondition(row.id, { value: event.target.value })
                  }
                  className="h-9"
                />
              </div>
              <button
                type="button"
                onClick={() => removeWorkCondition(row.id)}
                aria-label={`${WORK_CONDITIONS_FIELDS.removeLabel}：${row.label || row.id}`}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-destructive/10 hover:text-destructive focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addWorkCondition}
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-1.5 text-xs font-semibold text-primary transition-colors duration-200 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            {WORK_CONDITIONS_FIELDS.addLabel}
          </button>
        </fieldset>
      </ProfileSection>

      <ProfileSection title={FORM_SECTION_LABELS.salary} icon={DollarSign}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor={`${idPrefix}-salary-label`}>
              {SALARY_FIELDS.salaryLabel.label}
            </Label>
            <Input
              id={`${idPrefix}-salary-label`}
              type="text"
              value={state.salaryLabel}
              placeholder={SALARY_FIELDS.salaryLabel.placeholder}
              onChange={(event) => onChange({ salaryLabel: event.target.value })}
              className="h-9"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${idPrefix}-salary-min`}>
              {SALARY_FIELDS.salaryMin.label}
            </Label>
            <Input
              id={`${idPrefix}-salary-min`}
              type="number"
              min={0}
              value={state.salaryMin}
              onChange={(event) => onChange({ salaryMin: Number(event.target.value) })}
              className="h-9"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${idPrefix}-salary-max`}>
              {SALARY_FIELDS.salaryMax.label}
            </Label>
            <Input
              id={`${idPrefix}-salary-max`}
              type="number"
              min={0}
              value={state.salaryMax}
              onChange={(event) => onChange({ salaryMax: Number(event.target.value) })}
              className="h-9"
            />
          </div>
        </div>
      </ProfileSection>

      <ProfileSection title={FORM_SECTION_LABELS.benefits} icon={Gift}>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${idPrefix}-benefits`}>{BENEFITS_FIELDS.benefits.label}</Label>
          <Textarea
            id={`${idPrefix}-benefits`}
            value={state.benefits}
            placeholder={BENEFITS_FIELDS.benefits.placeholder}
            onChange={(event) => onChange({ benefits: event.target.value })}
            rows={4}
          />
        </div>
      </ProfileSection>

      <ProfileSection title={FORM_SECTION_LABELS.publishSettings} icon={Eye}>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
          <div className="flex w-full flex-col gap-1.5 sm:w-56">
            <Label htmlFor={`${idPrefix}-status`}>
              {PUBLISH_SETTINGS_FIELDS.status.label}
            </Label>
            <select
              id={`${idPrefix}-status`}
              value={state.status}
              onChange={(event) =>
                onChange({ status: event.target.value as JobPostingStatus })
              }
              className={SELECT_CLASS}
            >
              <option value="募集中">募集中</option>
              <option value="下書き">下書き</option>
              <option value="募集終了">募集終了</option>
            </select>
          </div>
          <label className="flex h-9 w-fit cursor-pointer items-center gap-2 text-sm text-foreground">
            <Checkbox
              checked={state.isPublic}
              onCheckedChange={(checked) => onChange({ isPublic: checked })}
            />
            {PUBLISH_SETTINGS_FIELDS.isPublic.label}
          </label>
        </div>
      </ProfileSection>
    </div>
  );
}

interface JobFormActionsProps {
  state: JobFormState;
  onSave: () => void;
  onSaveDraft: () => void;
  showPreview: boolean;
  onTogglePreview: () => void;
  savedMessage: string | null;
  onDismissSavedMessage: () => void;
  demoNote: string;
  cancelHref: string;
}

export function JobFormActions({
  state,
  onSave,
  onSaveDraft,
  showPreview,
  onTogglePreview,
  savedMessage,
  onDismissSavedMessage,
  demoNote,
  cancelHref,
}: JobFormActionsProps) {
  return (
    <>
      {showPreview && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                {PREVIEW_PANEL_LABELS.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {PREVIEW_PANEL_LABELS.description}
              </p>
            </div>
            <button
              type="button"
              onClick={onTogglePreview}
              aria-label={PREVIEW_PANEL_LABELS.closeLabel}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">
                {BASIC_INFO_FIELDS.title.label}
              </dt>
              <dd className="text-sm font-semibold text-foreground">
                {state.title || "（未入力）"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">
                {BASIC_INFO_FIELDS.contractType.label}
              </dt>
              <dd className="text-sm font-semibold text-foreground">
                {state.contractType}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">
                {SALARY_FIELDS.salaryLabel.label}
              </dt>
              <dd className="text-sm font-semibold text-foreground">
                {state.salaryLabel || "（未入力）"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">
                {PUBLISH_SETTINGS_FIELDS.status.label}
              </dt>
              <dd className="text-sm font-semibold text-foreground">{state.status}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs text-muted-foreground">
                {SKILLS_FIELDS.requiredSkills.label}
              </dt>
              <dd className="text-sm text-foreground">
                {state.requiredSkills
                  .split("\n")
                  .filter(Boolean)
                  .join(" / ") || "（未入力）"}
              </dd>
            </div>
          </dl>
          {state.contractType === "就職" && (
            <div className="mt-4">
              <EmploymentConditionsSummary conditions={state.employmentConditions} />
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm">
        {savedMessage && (
          <div className="flex items-center justify-between gap-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            <span>{savedMessage}</span>
            <button
              type="button"
              onClick={onDismissSavedMessage}
              aria-label="保存メッセージを閉じる"
              className="shrink-0 rounded-lg p-1 transition-colors duration-200 hover:bg-green-100 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
        <p className="text-xs text-muted-foreground">{demoNote}</p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onSave}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {FORM_BUTTON_LABELS.save}
          </button>
          <button
            type="button"
            onClick={onSaveDraft}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {FORM_BUTTON_LABELS.saveDraft}
          </button>
          <button
            type="button"
            onClick={onTogglePreview}
            aria-pressed={showPreview}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            {FORM_BUTTON_LABELS.preview}
          </button>
          <Link
            href={cancelHref}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {FORM_BUTTON_LABELS.cancel}
          </Link>
        </div>
      </div>
    </>
  );
}

export function getEmploymentErrors(state: JobFormState): Record<string, string> {
  if (state.contractType !== "就職") return {};
  const errors = validateEmploymentConditions(state.employmentConditions);
  return Object.fromEntries(errors.map((error) => [error.fieldId, error.message]));
}

export function focusFirstEmploymentError(errors: Record<string, string>, idPrefix: string) {
  const firstFieldId = Object.keys(errors)[0];
  if (!firstFieldId) return;
  const element = document.getElementById(`${idPrefix}-emp-${firstFieldId}`);
  element?.focus();
}

export function CreateJobForm() {
  const [state, setState] = useState<JobFormState>(() => buildInitialFormState());
  const [showPreview, setShowPreview] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [employmentErrors, setEmploymentErrors] = useState<Record<string, string>>({});

  function updateState(patch: Partial<JobFormState>) {
    setState((prev) => ({ ...prev, ...patch }));
  }

  function attemptSave(onValid: () => void) {
    const errors = getEmploymentErrors(state);
    if (Object.keys(errors).length > 0) {
      setEmploymentErrors(errors);
      focusFirstEmploymentError(errors, "create");
      return;
    }
    setEmploymentErrors({});
    onValid();
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    attemptSave(() => setSavedMessage(CREATE_JOB_META.saveSuccessMessage));
  }

  function handleSaveDraft() {
    setSavedMessage(CREATE_JOB_META.draftSuccessMessage);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-4xl flex-col gap-6"
    >
      <JobFormFields
        state={state}
        onChange={updateState}
        idPrefix="create"
        employmentErrors={employmentErrors}
      />
      <JobFormActions
        state={state}
        onSave={() => attemptSave(() => setSavedMessage(CREATE_JOB_META.saveSuccessMessage))}
        onSaveDraft={handleSaveDraft}
        showPreview={showPreview}
        onTogglePreview={() => setShowPreview((prev) => !prev)}
        savedMessage={savedMessage}
        onDismissSavedMessage={() => setSavedMessage(null)}
        demoNote={CREATE_JOB_META.demoNote}
        cancelHref={CREATE_JOB_META.cancelHref}
      />
    </form>
  );
}
