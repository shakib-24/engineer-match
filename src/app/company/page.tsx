import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Compass, Target } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { COMPANY_PAGE } from "@/constants/pages";

export const metadata: Metadata = {
  title: "運営会社 | ENGINEER MATCH",
  description: COMPANY_PAGE.hero.description,
};

export default function CompanyPage() {
  return (
    <>
      <Header />
      <PageHeader
        title={COMPANY_PAGE.hero.title}
        description={COMPANY_PAGE.hero.description}
      />

      <main>
        <section
          id="overview"
          aria-labelledby="overview-heading"
          className="bg-background py-16 md:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <SectionHeading
              headingId="overview-heading"
              label={COMPANY_PAGE.overview.label}
              title={COMPANY_PAGE.overview.title}
              align="left"
            />

            <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
              <dl className="divide-y divide-border">
                {COMPANY_PAGE.overview.items.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-1 gap-1 px-6 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6 sm:px-8"
                  >
                    <dt className="text-sm font-semibold text-foreground">
                      {item.label}
                    </dt>
                    <dd className="text-sm leading-relaxed text-muted-foreground">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              {COMPANY_PAGE.overviewNote}
            </p>
          </div>
        </section>

        <section
          id="mission-vision"
          aria-labelledby="mission-vision-heading"
          className="bg-surface py-16 md:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <SectionHeading
              headingId="mission-vision-heading"
              label={COMPANY_PAGE.missionVision.label}
              title={COMPANY_PAGE.missionVision.title}
              align="center"
            />

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Target className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {COMPANY_PAGE.missionVision.mission.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                  {COMPANY_PAGE.missionVision.mission.body}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Compass className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {COMPANY_PAGE.missionVision.vision.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                  {COMPANY_PAGE.missionVision.vision.body}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="business"
          aria-labelledby="business-heading"
          className="bg-background py-16 md:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <SectionHeading
              headingId="business-heading"
              label={COMPANY_PAGE.business.label}
              title={COMPANY_PAGE.business.title}
              align="center"
            />

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {COMPANY_PAGE.business.items.map((item) => (
                <div
                  key={item.title}
                  className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Building2 className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="company-cta-heading"
          className="bg-surface py-16 md:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center rounded-2xl border border-primary/20 bg-primary/5 p-10 text-center md:p-14">
              <h2
                id="company-cta-heading"
                className="text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-3xl"
              >
                {COMPANY_PAGE.cta.title}
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                {COMPANY_PAGE.cta.description}
              </p>
              <Link
                href={COMPANY_PAGE.cta.href}
                className="group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {COMPANY_PAGE.cta.buttonLabel}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
