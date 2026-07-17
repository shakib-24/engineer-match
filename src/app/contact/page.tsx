import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { CONTACT_PAGE } from "@/constants/pages";

export const metadata: Metadata = {
  title: "お問い合わせ | ENGINEER MATCH",
  description: CONTACT_PAGE.hero.description,
};

export default function ContactPage() {
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
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
