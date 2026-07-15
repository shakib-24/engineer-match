import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageHeader } from "@/components/ui/PageHeader";
import { CONTACT_PAGE } from "@/constants/pages";

export const metadata: Metadata = {
  title: "お問い合わせ | ENGINEER MATCH",
  description: CONTACT_PAGE.hero.description,
};

const INPUT_CLASSES =
  "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export default function ContactPage() {
  const { form } = CONTACT_PAGE;

  return (
    <>
      <Header />
      <PageHeader
        title={CONTACT_PAGE.hero.title}
        description={CONTACT_PAGE.hero.description}
      />

      <main>
        <section
          aria-labelledby="contact-form-heading"
          className="bg-background py-16 md:py-24"
        >
          <div className="mx-auto max-w-2xl px-4 md:px-6">
            <h2 id="contact-form-heading" className="sr-only">
              お問い合わせフォーム
            </h2>

            <form className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-10">
              <div className="flex flex-col gap-6">
                <div>
                  <label
                    htmlFor="companyName"
                    className="text-sm font-semibold text-foreground"
                  >
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
                    {form.name.required && (
                      <span className="ml-1 text-destructive">*</span>
                    )}
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
                    {form.email.required && (
                      <span className="ml-1 text-destructive">*</span>
                    )}
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
                  <label
                    htmlFor="inquiryType"
                    className="text-sm font-semibold text-foreground"
                  >
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
                  <label
                    htmlFor="message"
                    className="text-sm font-semibold text-foreground"
                  >
                    {form.message.label}
                    {form.message.required && (
                      <span className="ml-1 text-destructive">*</span>
                    )}
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

                <button
                  type="button"
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto"
                >
                  {form.submitLabel}
                </button>

                <p className="text-xs text-muted-foreground">
                  {CONTACT_PAGE.formNote}
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
