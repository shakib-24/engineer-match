"use client";

import { useState } from "react";
import { Download, Eye, FileText } from "lucide-react";
import {
  APPLICANT_DETAIL_META,
  DOCUMENT_LABELS,
  type ApplicantDocuments as ApplicantDocumentsData,
} from "@/constants/company-applicants";

interface ApplicantDocumentsProps {
  documents: ApplicantDocumentsData;
}

export function ApplicantDocuments({ documents }: ApplicantDocumentsProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const documentEntries = [
    { key: "resume", label: DOCUMENT_LABELS.resume, submitted: documents.resume },
    {
      key: "workHistory",
      label: DOCUMENT_LABELS.workHistory,
      submitted: documents.workHistory,
    },
    {
      key: "portfolio",
      label: DOCUMENT_LABELS.portfolio,
      submitted: documents.portfolio,
    },
    {
      key: "coverLetter",
      label: DOCUMENT_LABELS.coverLetter,
      submitted: documents.coverLetter,
    },
  ];

  function handleDemoAction(action: string, label: string) {
    setToastMessage(`${label}を${action}しました。（デモ表示のため実際のファイルはありません）`);
    window.setTimeout(() => setToastMessage(null), 3000);
  }

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">
          {APPLICANT_DETAIL_META.documentsTitle}
        </h3>
      </div>

      <ul className="mt-5 flex flex-col divide-y divide-border">
        {documentEntries.map((doc) => (
          <li
            key={doc.key}
            className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
          >
            <span className="text-sm font-medium text-foreground">{doc.label}</span>
            {doc.submitted ? (
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoAction("閲覧", doc.label)}
                  className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-xs font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                  {DOCUMENT_LABELS.viewLabel}
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoAction("ダウンロード", doc.label)}
                  className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-xs font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  {DOCUMENT_LABELS.downloadLabel}
                </button>
              </div>
            ) : (
              <span className="shrink-0 text-xs text-muted-foreground">
                {DOCUMENT_LABELS.notSubmittedLabel}
              </span>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-muted-foreground">{DOCUMENT_LABELS.demoNote}</p>

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 sm:justify-end sm:pr-6"
        >
          <div className="flex items-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-white shadow-lg">
            {toastMessage}
          </div>
        </div>
      )}
    </section>
  );
}
