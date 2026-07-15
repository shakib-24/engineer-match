"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  BadgeCheck,
  Building2,
  FilePlus2,
  MessageCircle,
  MessagesSquare,
  Search,
  UserPlus,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOW_IT_WORKS, HOW_IT_WORKS_STEPS } from "@/constants/lp";

const ICON_MAP = {
  userPlus: UserPlus,
  badgeCheck: BadgeCheck,
  search: Search,
  messagesSquare: MessagesSquare,
  building2: Building2,
  filePlus2: FilePlus2,
  users: Users,
  messageCircle: MessageCircle,
} as const;

type Audience = "engineer" | "company";

const TAB_KEYS: readonly Audience[] = ["engineer", "company"];

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState<Audience>("engineer");
  const prefersReducedMotion = useReducedMotion();
  const steps = HOW_IT_WORKS_STEPS[activeTab];

  const fadeVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 8 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: prefersReducedMotion ? 0 : -8 },
  };

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="scroll-mt-[72px] bg-surface py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          headingId="how-it-works-heading"
          label={HOW_IT_WORKS.label}
          title={HOW_IT_WORKS.title}
          description={HOW_IT_WORKS.description}
          align="center"
        />

        <div
          role="tablist"
          aria-label={HOW_IT_WORKS.title}
          className="mt-10 flex justify-center gap-2"
        >
          {TAB_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              id={`how-it-works-tab-${key}`}
              aria-selected={activeTab === key}
              aria-controls="how-it-works-panel"
              tabIndex={activeTab === key ? 0 : -1}
              onClick={() => setActiveTab(key)}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none ${
                activeTab === key
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {HOW_IT_WORKS.tabs[key]}
            </button>
          ))}
        </div>

        <div
          id="how-it-works-panel"
          role="tabpanel"
          aria-labelledby={`how-it-works-tab-${activeTab}`}
          className="mt-12"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeVariants}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.3,
                ease: "easeOut",
              }}
            >
              {/* Desktop: horizontal steps with a connecting line behind the number badges */}
              <div className="relative hidden lg:block">
                <div
                  className="absolute inset-x-0 top-7 h-px bg-border"
                  aria-hidden="true"
                />
                <ol className="relative grid grid-cols-4 gap-6">
                  {steps.map((step, index) => {
                    const Icon = ICON_MAP[step.icon];
                    return (
                      <li
                        key={step.title}
                        className="flex flex-col items-center text-center"
                      >
                        <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                          {index + 1}
                        </span>
                        <div className="mt-4 flex w-full flex-col items-center rounded-2xl border border-border bg-surface p-6 text-center shadow-sm">
                          <Icon
                            className="h-6 w-6 text-primary"
                            aria-hidden="true"
                          />
                          <p className="mt-3 text-sm font-semibold text-foreground">
                            {step.title}
                          </p>
                          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Mobile / tablet: vertical steps with a connecting line on the left */}
              <div className="relative lg:hidden">
                <div
                  className="absolute top-0 bottom-0 left-6 w-px bg-border"
                  aria-hidden="true"
                />
                <ol className="relative flex flex-col gap-4">
                  {steps.map((step, index) => {
                    const Icon = ICON_MAP[step.icon];
                    return (
                      <li
                        key={step.title}
                        className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm"
                      >
                        <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                          {index + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <Icon
                              className="h-5 w-5 text-primary"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-semibold text-foreground">
                              {step.title}
                            </p>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
