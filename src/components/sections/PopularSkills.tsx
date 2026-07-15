import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SKILL_LIST, SKILLS } from "@/constants/lp";

export function PopularSkills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-[72px] bg-surface py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          headingId="skills-heading"
          label={SKILLS.label}
          title={SKILLS.title}
          description={SKILLS.description}
          align="center"
        />

        <FadeIn className="mt-12">
          <ul className="flex flex-wrap justify-center gap-3">
            {SKILL_LIST.map((skill) => (
              <li key={skill}>
                <button
                  type="button"
                  className="rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  {skill}
                </button>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
