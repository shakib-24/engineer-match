"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Building2, CheckCircle2, UserRound } from "lucide-react";
import { AuthHero } from "@/components/auth/AuthHero";
import { DemoAuthNotice } from "@/components/auth/DemoAuthNotice";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  REGISTER_COMPLETION,
  REGISTER_ERRORS,
  REGISTER_FORM,
  REGISTER_VISUAL,
} from "@/constants/auth";
import { fadeUpItem } from "@/lib/motion";
import { getDashboardPath } from "@/lib/demo-auth";

export type AccountType = "engineer" | "company";

const ACCOUNT_TYPE_OPTIONS = [
  { ...REGISTER_FORM.accountTypes.engineer, icon: UserRound },
  { ...REGISTER_FORM.accountTypes.company, icon: Building2 },
] as const;

function AgreeTerms({ id }: { id: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <Checkbox id={id} name={id} required className="mt-0.5" />
      <Label htmlFor={id} className="font-normal text-white/60">
        <Link
          href="/terms"
          className="rounded text-cyan-300 underline-offset-2 hover:underline hover:text-cyan-200 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:outline-none"
        >
          {REGISTER_FORM.agreeTermsTermsLabel}
        </Link>
        {REGISTER_FORM.agreeTermsMiddle}
        <Link
          href="/privacy"
          className="rounded text-cyan-300 underline-offset-2 hover:underline hover:text-cyan-200 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:outline-none"
        >
          {REGISTER_FORM.agreeTermsPrivacyLabel}
        </Link>
        {REGISTER_FORM.agreeTermsSuffix}
      </Label>
    </div>
  );
}

interface RegisterCardProps {
  initialAccountType?: AccountType;
  blockedRole?: "admin";
}

export function RegisterCard({ initialAccountType, blockedRole }: RegisterCardProps) {
  const [accountType, setAccountType] = useState<AccountType | null>(
    initialAccountType ?? null,
  );
  const [selectorResetKey, setSelectorResetKey] = useState(0);
  const resetAccountType = () => {
    setAccountType(null);
    setSelectorResetKey((key) => key + 1);
  };
  const [submittedRole, setSubmittedRole] = useState<AccountType | null>(null);
  const completionHeadingRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const entrance = fadeUpItem(prefersReducedMotion, { duration: 0.5 });

  useEffect(() => {
    if (submittedRole) {
      completionHeadingRef.current?.focus();
    }
  }, [submittedRole]);

  function handleRegisterSubmit(event: FormEvent<HTMLFormElement>, role: AccountType) {
    event.preventDefault();
    setSubmittedRole(role);
  }

  const stepVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, x: prefersReducedMotion ? 0 : 20 },
      visible: { opacity: 1, x: 0, transition: { duration: prefersReducedMotion ? 0 : 0.35, ease: "easeOut" } },
      exit: { opacity: 0, x: prefersReducedMotion ? 0 : -20, transition: { duration: prefersReducedMotion ? 0 : 0.25, ease: "easeOut" } },
    }),
    [prefersReducedMotion],
  );

  return (
    <AuthHero
      imageSrc={REGISTER_VISUAL.imageSrc}
      imageAlt={REGISTER_VISUAL.imageAlt}
      imagePosition="65% 25%"
      imageFlip
      headline={REGISTER_VISUAL.title}
      description={REGISTER_VISUAL.description}
      bullets={REGISTER_VISUAL.bullets}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={entrance}
        className="w-full max-w-md lg:max-w-[500px]"
      >
        <div className="rounded-[28px] border border-white/20 bg-slate-900/55 p-7 text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:p-9">
          <h1 className="text-2xl font-bold tracking-tight text-white">{REGISTER_FORM.title}</h1>
          <p className="mt-1.5 text-sm text-white/70">
            {REGISTER_FORM.description}
          </p>

          <div className="mt-5">
            <DemoAuthNotice />
          </div>

          <div>
            {submittedRole ? (
              <motion.div
                key="completion"
                initial="hidden"
                animate="visible"
                variants={stepVariants}
                className="mt-6 flex flex-col items-start gap-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/15">
                  <CheckCircle2
                    className="h-6 w-6 text-cyan-300"
                    aria-hidden="true"
                  />
                </div>
                <h2
                  ref={completionHeadingRef}
                  tabIndex={-1}
                  aria-live="polite"
                  className="text-lg font-semibold text-white focus:outline-none"
                >
                  {REGISTER_COMPLETION.title}
                </h2>
                <p className="text-sm text-white/70">{REGISTER_COMPLETION.note}</p>
                <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row">
                  <Link
                    href={REGISTER_FORM.loginHref}
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-white/30 bg-white/10 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
                  >
                    {REGISTER_COMPLETION.loginCta}
                  </Link>
                  <Link
                    href={getDashboardPath(submittedRole)}
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#2563EB] text-sm font-semibold text-white shadow-lg shadow-indigo-950/20 transition-[filter] duration-200 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
                  >
                    {REGISTER_COMPLETION.dashboardCta}
                  </Link>
                </div>
              </motion.div>
            ) : accountType === null ? (
              <motion.div
                key={`select-${selectorResetKey}`}
                initial="hidden"
                animate="visible"
                variants={stepVariants}
                className="mt-6"
              >
                {blockedRole === "admin" && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="mb-4 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                  >
                    {REGISTER_ERRORS.adminNotAllowed}
                  </div>
                )}
                <RadioGroup
                  key={selectorResetKey}
                  aria-label={REGISTER_FORM.accountTypeLabel}
                  value={accountType}
                  onValueChange={(value) => setAccountType(value as AccountType)}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  {ACCOUNT_TYPE_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      htmlFor={option.value}
                      onClick={() => setAccountType(option.value as AccountType)}
                      className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-white/20 bg-white/10 p-5 text-left transition-colors duration-200 hover:bg-white/15 has-[[data-checked]]:border-cyan-300 has-[[data-checked]]:bg-cyan-400/15 has-[[data-checked]]:ring-2 has-[[data-checked]]:ring-cyan-300/30"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                          <option.icon
                            className="h-6 w-6 text-cyan-300"
                            aria-hidden="true"
                          />
                        </div>
                        <RadioGroupItem value={option.value} id={option.value} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {option.title}
                        </p>
                        <p className="mt-1 text-xs text-white/60">
                          {option.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
              </motion.div>
            ) : accountType === "engineer" ? (
              <motion.form
                key="engineer"
                initial="hidden"
                animate="visible"
                variants={stepVariants}
                className="mt-6 space-y-5"
                onSubmit={(event) => handleRegisterSubmit(event, "engineer")}
              >
                <button
                  type="button"
                  onClick={resetAccountType}
                  className="w-fit rounded text-xs font-medium text-white/60 transition-colors duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:outline-none"
                >
                  ← {REGISTER_FORM.backLabel}
                </button>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="engineer-name" className="text-white/90">
                    {REGISTER_FORM.engineerFields.name.label}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="engineer-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder={REGISTER_FORM.engineerFields.name.placeholder}
                    className="h-12 rounded-xl border-white/20 bg-white/10 text-sm text-white placeholder:text-white/40 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30 focus-visible:border-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-300/30"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="engineer-email" className="text-white/90">
                    {REGISTER_FORM.engineerFields.email.label}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="engineer-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={REGISTER_FORM.engineerFields.email.placeholder}
                    className="h-12 rounded-xl border-white/20 bg-white/10 text-sm text-white placeholder:text-white/40 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30 focus-visible:border-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-300/30"
                  />
                </div>

                <PasswordInput
                  id="engineer-password"
                  label={REGISTER_FORM.engineerFields.password.label}
                  placeholder={REGISTER_FORM.engineerFields.password.placeholder}
                  required
                  autoComplete="new-password"
                />
                <PasswordInput
                  id="engineer-confirm-password"
                  label={REGISTER_FORM.engineerFields.confirmPassword.label}
                  placeholder={REGISTER_FORM.engineerFields.confirmPassword.placeholder}
                  required
                  autoComplete="new-password"
                />

                <AgreeTerms id="engineer-agree-terms" />

                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#2563EB] text-sm font-semibold text-white shadow-lg shadow-indigo-950/20 hover:brightness-110"
                >
                  {REGISTER_FORM.engineerFields.submitLabel}
                </Button>
              </motion.form>
            ) : (
              <motion.form
                key="company"
                initial="hidden"
                animate="visible"
                variants={stepVariants}
                className="mt-6 space-y-5"
                onSubmit={(event) => handleRegisterSubmit(event, "company")}
              >
                <button
                  type="button"
                  onClick={resetAccountType}
                  className="w-fit rounded text-xs font-medium text-white/60 transition-colors duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:outline-none"
                >
                  ← {REGISTER_FORM.backLabel}
                </button>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="company-name" className="text-white/90">
                    {REGISTER_FORM.companyFields.companyName.label}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="company-name"
                    name="companyName"
                    type="text"
                    required
                    autoComplete="organization"
                    placeholder={REGISTER_FORM.companyFields.companyName.placeholder}
                    className="h-12 rounded-xl border-white/20 bg-white/10 text-sm text-white placeholder:text-white/40 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30 focus-visible:border-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-300/30"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="company-representative" className="text-white/90">
                    {REGISTER_FORM.companyFields.representative.label}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="company-representative"
                    name="representative"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder={REGISTER_FORM.companyFields.representative.placeholder}
                    className="h-12 rounded-xl border-white/20 bg-white/10 text-sm text-white placeholder:text-white/40 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30 focus-visible:border-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-300/30"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="company-email" className="text-white/90">
                    {REGISTER_FORM.companyFields.email.label}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="company-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={REGISTER_FORM.companyFields.email.placeholder}
                    className="h-12 rounded-xl border-white/20 bg-white/10 text-sm text-white placeholder:text-white/40 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30 focus-visible:border-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-300/30"
                  />
                </div>

                <PasswordInput
                  id="company-password"
                  label={REGISTER_FORM.companyFields.password.label}
                  placeholder={REGISTER_FORM.companyFields.password.placeholder}
                  required
                  autoComplete="new-password"
                />
                <PasswordInput
                  id="company-confirm-password"
                  label={REGISTER_FORM.companyFields.confirmPassword.label}
                  placeholder={REGISTER_FORM.companyFields.confirmPassword.placeholder}
                  required
                  autoComplete="new-password"
                />

                <AgreeTerms id="company-agree-terms" />

                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#2563EB] text-sm font-semibold text-white shadow-lg shadow-indigo-950/20 hover:brightness-110"
                >
                  {REGISTER_FORM.companyFields.submitLabel}
                </Button>
              </motion.form>
            )}
          </div>
        </div>

        <p className="mt-5 text-center text-sm text-white/70">
          {REGISTER_FORM.hasAccount}{" "}
          <Link
            href={REGISTER_FORM.loginHref}
            className="rounded font-semibold text-white underline underline-offset-2 transition-colors duration-200 hover:text-white/80 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            {REGISTER_FORM.loginCta}
          </Link>
        </p>
      </motion.div>
    </AuthHero>
  );
}
