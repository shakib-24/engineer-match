"use client";

import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { CONTACT_PAGE } from "@/constants/pages";

const INPUT_CLASSES =
  "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export function ContactForm() {
  const { form } = CONTACT_PAGE;
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form
      className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-10"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor="companyName" className="text-sm font-semibold text-foreground">
            {form.companyName.label}
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            placeholder={form.companyName.placeholder}
            className={`mt-2 ${INPUT_CLASSES}`}
          />
        </div>

        <div>
          <label htmlFor="name" className="text-sm font-semibold text-foreground">
            {form.name.label}
            {form.name.required && <span className="ml-1 text-destructive">*</span>}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required={form.name.required}
            placeholder={form.name.placeholder}
            className={`mt-2 ${INPUT_CLASSES}`}
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-semibold text-foreground">
            {form.email.label}
            {form.email.required && <span className="ml-1 text-destructive">*</span>}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required={form.email.required}
            placeholder={form.email.placeholder}
            className={`mt-2 ${INPUT_CLASSES}`}
          />
        </div>

        <div>
          <label htmlFor="inquiryType" className="text-sm font-semibold text-foreground">
            {form.inquiryType.label}
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            defaultValue={form.inquiryType.options[0]}
            className={`mt-2 ${INPUT_CLASSES}`}
          >
            {form.inquiryType.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="text-sm font-semibold text-foreground">
            {form.message.label}
            {form.message.required && <span className="ml-1 text-destructive">*</span>}
          </label>
          <textarea
            id="message"
            name="message"
            required={form.message.required}
            placeholder={form.message.placeholder}
            rows={6}
            className={`mt-2 resize-none ${INPUT_CLASSES}`}
          />
        </div>

        {submitted && (
          <div className="flex items-center justify-between gap-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            <span>{CONTACT_PAGE.submittedMessage}</span>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              aria-label="送信完了メッセージを閉じる"
              className="shrink-0 rounded-lg p-1 transition-colors duration-200 hover:bg-green-100 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}

        <button
          type="submit"
          className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto"
        >
          {form.submitLabel}
        </button>

        <p className="text-xs text-muted-foreground">{CONTACT_PAGE.formNote}</p>
      </div>
    </form>
  );
}
