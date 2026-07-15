"use client";

import {
  BriefcaseBusiness,
  Handshake,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WHY_CHOOSE_US, WHY_CHOOSE_US_ITEMS } from "@/constants/lp";
import { fadeUpItem, staggerContainer } from "@/lib/motion";

const ICON_MAP = {
  handshake: Handshake,
  searchCheck: SearchCheck,
  briefcase: BriefcaseBusiness,
  shieldCheck: ShieldCheck,
} as const;

export function WhyChooseUs() {
  const prefersReducedMotion = useReducedMotion();
  const container = staggerContainer(prefersReducedMotion, { staggerChildren: 0.08 });
  const item = fadeUpItem(prefersReducedMotion);

  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="scroll-mt-[72px] bg-surface py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          headingId="why-us-heading"
          label={WHY_CHOOSE_US.label}
          title={WHY_CHOOSE_US.title}
          description={WHY_CHOOSE_US.description}
          align="center"
        />

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={container}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {WHY_CHOOSE_US_ITEMS.map((entry) => {
            const Icon = ICON_MAP[entry.icon];
            return (
              <motion.li
                key={entry.title}
                variants={item}
                className="rounded-2xl border border-border bg-surface p-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">
                  {entry.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {entry.description}
                </p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
