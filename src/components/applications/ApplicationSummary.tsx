import { FileCheck2, FileX2 } from "lucide-react";
import {
  APPLICATION_SUMMARY_LABELS,
  CONTRACT_TYPE_BADGE_STYLES,
  DETAIL_META,
  DOCUMENT_LABELS,
  type Application,
} from "@/constants/applications";

interface ApplicationSummaryProps {
  application: Application;
}

export function ApplicationSummary({ application }: ApplicationSummaryProps) {
  const documentEntries = [
    {
      key: "resume",
      label: DOCUMENT_LABELS.resume,
      submitted: application.documents.resume,
    },
    {
      key: "portfolio",
      label: DOCUMENT_LABELS.portfolio,
      submitted: application.documents.portfolio,
    },
    {
      key: "coverLetter",
      label: DOCUMENT_LABELS.coverLetter,
      submitted: application.documents.coverLetter,
    },
  ];

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <h3 className="text-base font-semibold text-foreground">
        {DETAIL_META.summaryTitle}
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs text-muted-foreground">
            {APPLICATION_SUMMARY_LABELS.positionLabel}
          </dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {application.jobTitle}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">
            {APPLICATION_SUMMARY_LABELS.contractLabel}
          </dt>
          <dd className="mt-1">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${CONTRACT_TYPE_BADGE_STYLES[application.contractType]}`}
            >
              {application.contractType}
            </span>
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">
            {APPLICATION_SUMMARY_LABELS.salaryLabel}
          </dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {application.salaryLabel}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">
            {APPLICATION_SUMMARY_LABELS.workingStyleLabel}
          </dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {application.workingStyle}
          </dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-border pt-6">
        <h4 className="text-sm font-semibold text-foreground">
          {DETAIL_META.documentsTitle}
        </h4>
        <ul className="mt-3 flex flex-col gap-2">
          {documentEntries.map((doc) => (
            <li
              key={doc.key}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="text-foreground">{doc.label}</span>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                  doc.submitted ? "text-emerald-700" : "text-muted-foreground"
                }`}
              >
                {doc.submitted ? (
                  <FileCheck2 className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <FileX2 className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {doc.submitted
                  ? DOCUMENT_LABELS.submittedLabel
                  : DOCUMENT_LABELS.notSubmittedLabel}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          {DOCUMENT_LABELS.demoNote}
        </p>
      </div>
    </section>
  );
}
