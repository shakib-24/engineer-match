import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageHeader } from "@/components/ui/PageHeader";
import { TERMS_PAGE } from "@/constants/pages";

export const metadata: Metadata = {
  title: "利用規約 | ENGINEER MATCH",
  description: "ENGINEER MATCHのご利用条件を定める利用規約です。",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <PageHeader title={TERMS_PAGE.title} />

      <main>
        <section aria-labelledby="terms-heading" className="bg-background py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <h2 id="terms-heading" className="sr-only">
              {TERMS_PAGE.title}
            </h2>

            <p className="text-xs text-muted-foreground">{TERMS_PAGE.updatedAt}</p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {TERMS_PAGE.intro}
            </p>

            <div className="mt-10 flex flex-col gap-10">
              {TERMS_PAGE.sections.map((section) => (
                <div key={section.heading}>
                  <h3 className="text-lg font-bold text-foreground">
                    {section.heading}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
