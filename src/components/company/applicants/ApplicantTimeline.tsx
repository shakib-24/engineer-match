"use client";

import { CheckCircle2, Circle, X } from "lucide-react";
import { useApplicantStatusContext } from "@/components/company/applicants/ApplicantStatusBadge";
import {
  APPLICANT_DETAIL_META,
  TIMELINE_STEPS,
  type ApplicantStatus,
} from "@/constants/company-applicants";

const NEGATIVE_STATUSES: readonly ApplicantStatus[] = ["不採用", "辞退"];
const AUTO_COMPLETE_STATUSES: readonly ApplicantStatus[] = ["採用"];

type StepState = "completed" | "current" | "terminated" | "upcoming";

function getStepState(
  stepIndex: number,
  currentStepIndex: number,
  status: ApplicantStatus,
): StepState {
  if (stepIndex < currentStepIndex) return "completed";
  if (stepIndex > currentStepIndex) return "upcoming";
  if (NEGATIVE_STATUSES.includes(status)) return "terminated";
  if (AUTO_COMPLETE_STATUSES.includes(status)) return "completed";
  return "current";
}

interface ApplicantTimelineProps {
  status: ApplicantStatus;
  currentStepIndex: number;
}

export function ApplicantTimeline({ status, currentStepIndex }: ApplicantTimelineProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <h3 className="text-base font-semibold text-foreground">
        {APPLICANT_DETAIL_META.timelineTitle}
      </h3>
      <ol className="mt-6 flex flex-col">
        {TIMELINE_STEPS.map((step, index) => {
          const state = getStepState(index, currentStepIndex, status);
          const isLast = index === TIMELINE_STEPS.length - 1;

          return (
            <li key={step} className="relative flex gap-4 pb-8 last:pb-0">
              <div className="flex flex-col items-center">
                {state === "completed" && (
                  <CheckCircle2
                    className="h-6 w-6 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                )}
                {state === "current" && (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                    <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                  </span>
                )}
                {state === "terminated" && (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100">
                    <X className="h-3.5 w-3.5 text-red-600" aria-hidden="true" />
                  </span>
                )}
                {state === "upcoming" && (
                  <Circle className="h-6 w-6 shrink-0 text-border" aria-hidden="true" />
                )}
                {!isLast && (
                  <span
                    className={`mt-1 w-px flex-1 ${
                      state === "completed" ? "bg-primary/40" : "bg-border"
                    }`}
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <p
                  className={`text-sm font-semibold ${
                    state === "upcoming"
                      ? "text-muted-foreground"
                      : state === "terminated"
                        ? "text-red-700"
                        : "text-foreground"
                  }`}
                >
                  {step}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {state === "completed" && "完了"}
                  {state === "current" && "選考中"}
                  {state === "terminated" && "選考終了"}
                  {state === "upcoming" && "未実施"}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

interface LiveApplicantTimelineProps {
  currentStepIndex: number;
}

export function LiveApplicantTimeline({ currentStepIndex }: LiveApplicantTimelineProps) {
  const { status } = useApplicantStatusContext();
  return <ApplicantTimeline status={status} currentStepIndex={currentStepIndex} />;
}
