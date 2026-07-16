import { Star } from "lucide-react";
import {
  APPLICANT_DETAIL_META,
  EVALUATION_LABELS,
  type ApplicantEvaluationData,
} from "@/constants/company-applicants";

function RatingRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-foreground">{label}</span>
      <div className="flex items-center gap-1" role="img" aria-label={`${label} ${value} / 5`}>
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            aria-hidden="true"
            className={`h-4 w-4 ${
              index < value ? "fill-primary text-primary" : "fill-muted text-muted"
            }`}
          />
        ))}
        <span className="ml-1.5 text-xs font-medium text-muted-foreground">{value}/5</span>
      </div>
    </div>
  );
}

interface ApplicantEvaluationProps {
  evaluation: ApplicantEvaluationData | null;
}

export function ApplicantEvaluation({ evaluation }: ApplicantEvaluationProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <h3 className="text-base font-semibold text-foreground">
        {APPLICANT_DETAIL_META.evaluationTitle}
      </h3>

      {evaluation ? (
        <>
          <div className="mt-5 flex flex-col gap-3">
            <RatingRow label={EVALUATION_LABELS.overall} value={evaluation.overall} />
            <RatingRow label={EVALUATION_LABELS.technical} value={evaluation.technical} />
            <RatingRow
              label={EVALUATION_LABELS.communication}
              value={evaluation.communication}
            />
            <RatingRow label={EVALUATION_LABELS.business} value={evaluation.business} />
          </div>
          <div className="mt-5 border-t border-border pt-5">
            <h4 className="text-xs text-muted-foreground">{EVALUATION_LABELS.comment}</h4>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground">
              {evaluation.comment}
            </p>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            {EVALUATION_LABELS.readOnlyNote}
          </p>
        </>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          {EVALUATION_LABELS.notEvaluatedMessage}
        </p>
      )}
    </section>
  );
}
