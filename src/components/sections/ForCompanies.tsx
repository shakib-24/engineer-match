"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BriefcaseBusiness,
  SearchCheck,
  UsersRound,
} from "lucide-react";
import { FOR_COMPANIES, FOR_COMPANIES_FEATURES } from "@/constants/lp";
import { fadeUpItem, staggerContainer } from "@/lib/motion";

const ICON_MAP = {
  briefcase: BriefcaseBusiness,
  searchCheck: SearchCheck,
  usersRound: UsersRound,
} as const;

// public/image/interview.png doesn't exist; the confirmed existing asset is
// this file (note the source typo "interviwe" in its filename — left as-is).
const INTERVIEW_IMAGE_SRC =
  "/image/ChatGPT Image Jul 13, 2026, 04_46_15 PM interviwe.png";

export function ForCompanies() {
  const prefersReducedMotion = useReducedMotion();
  const container = staggerContainer(prefersReducedMotion, { staggerChildren: 0.08 });
  const item = fadeUpItem(prefersReducedMotion);

  return (
    <section
      id="for-companies"
      aria-labelledby="for-companies-heading"
      className="scroll-mt-[72px] bg-background py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative isolate min-h-[420px] overflow-hidden rounded-[32px] md:min-h-[520px] lg:min-h-[600px]">
          <Image
            src={INTERVIEW_IMAGE_SRC}
            alt="採用担当者とエンジニアが面談で話し合っている様子"
            fill
            priority={false}
            sizes="100vw"
            className="object-cover object-[57%_18%]"
          />

          {/* Left-side dark gradient for text legibility */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,15,30,0.92)_0%,rgba(7,15,30,0.75)_35%,rgba(7,15,30,0.25)_70%,rgba(7,15,30,0.05)_100%)]"
          />
          {/* Soft bottom gradient */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070F1E]/30 via-transparent to-transparent"
          />
          {/* Subtle indigo radial glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(79,70,229,0.12),transparent_60%)]"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            variants={container}
            className="relative flex min-h-[420px] max-w-[520px] flex-col justify-center px-6 py-12 sm:px-10 md:min-h-[520px] lg:min-h-[600px] lg:px-14"
          >
            <motion.p
              variants={item}
              className="text-sm font-semibold tracking-wide text-indigo-300 uppercase"
            >
              {FOR_COMPANIES.label}
            </motion.p>
            <motion.h2
              id="for-companies-heading"
              variants={item}
              className="mt-4 text-3xl leading-tight font-bold tracking-tight whitespace-pre-line text-white sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {FOR_COMPANIES.title}
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-6 max-w-lg text-base leading-relaxed whitespace-pre-line text-white/80"
            >
              {FOR_COMPANIES.description}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {FOR_COMPANIES_FEATURES.map((feature) => {
                const Icon = ICON_MAP[feature.icon];
                return (
                  <div
                    key={feature.title}
                    className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-lg"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/70">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </motion.div>

            <motion.div variants={item} className="mt-8">
              <Link
                href="/signup?role=company"
                className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-[#070F1E] shadow-sm transition-colors duration-200 hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#070F1E] focus-visible:outline-none"
              >
                {FOR_COMPANIES.cta}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
