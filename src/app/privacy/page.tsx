import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageHeader } from "@/components/ui/PageHeader";
import { PRIVACY_PAGE } from "@/constants/pages";

export const metadata: Metadata = {
  title: "プライバシーポリシー | ENGINEER MATCH",
  description: "ENGINEER MATCHにおける個人情報の取り扱いについて定めるプライバシーポリシーです。",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <PageHeader title={PRIVACY_PAGE.title} />

      <main>
        <section aria-labelledby="privacy-heading" className="bg-background py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <h2 id="privacy-heading" className="sr-only">
              {PRIVACY_PAGE.title}
            </h2>

            <p className="text-xs text-muted-foreground">{PRIVACY_PAGE.updatedAt}</p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {PRIVACY_PAGE.intro}
            </p>

            <div className="mt-10 flex flex-col gap-10">
              {PRIVACY_PAGE.sections.map((section) => (
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
