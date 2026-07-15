import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  FEATURED_OPPORTUNITIES,
  OPPORTUNITIES,
  OPPORTUNITY_CTA_LABEL,
} from "@/constants/lp";

const CONTRACT_BADGE_STYLES = {
  就職: "bg-blue-50 text-blue-700",
  案件: "bg-green-50 text-green-700",
  時間清算: "bg-amber-50 text-amber-700",
} as const;

export function FeaturedOpportunities() {
  return (
    <section
      id="opportunities"
      aria-labelledby="opportunities-heading"
      className="scroll-mt-[72px] bg-background py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          headingId="opportunities-heading"
          label={FEATURED_OPPORTUNITIES.label}
          title={FEATURED_OPPORTUNITIES.title}
          description={FEATURED_OPPORTUNITIES.description}
          align="center"
        />

        <FadeIn className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {OPPORTUNITIES.map((opportunity) => (
            <div
              key={`${opportunity.company}-${opportunity.title}`}
              className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <p className="text-sm text-muted-foreground">
                {opportunity.company}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">
                {opportunity.title}
              </h3>

              <span
                className={`mt-3 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${CONTRACT_BADGE_STYLES[opportunity.contractType]}`}
              >
                {opportunity.contractType}
              </span>

              <ul className="mt-4 flex flex-wrap gap-2">
                {opportunity.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-col gap-1 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">
                  {opportunity.compensation}
                </p>
                <p>勤務地：{opportunity.location}</p>
                <p>公開日：{opportunity.postedAt}</p>
              </div>

              <div className="mt-auto pt-6">
                <button
                  type="button"
                  className="w-fit rounded-lg text-sm font-semibold text-primary transition-colors duration-200 hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  {OPPORTUNITY_CTA_LABEL}
                </button>
              </div>
            </div>
          ))}
        </FadeIn>

        <div className="mt-12 flex justify-center">
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-6 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {FEATURED_OPPORTUNITIES.viewAllCta}
          </button>
        </div>
      </div>
    </section>
  );
}
