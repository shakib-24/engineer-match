"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarClock, Languages, MapPin } from "lucide-react";
import { EngineerStatusBadge } from "@/components/company/engineers/EngineerStatusBadge";
import { EngineerSkillSummary } from "@/components/company/engineers/EngineerSkillSummary";
import { FavoriteEngineerButton } from "@/components/company/engineers/FavoriteEngineerButton";
import { ScoutDialog, type ScoutFormDetails } from "@/components/company/engineers/ScoutDialog";
import { ENGINEER_CARD_LABELS, type Engineer } from "@/constants/company-engineers";

interface EngineerCardProps {
  engineer: Engineer;
  isFavorited: boolean;
  isScouted: boolean;
  onToggleFavorite: (id: string) => void;
  onScout: (id: string, details: ScoutFormDetails) => void;
}

function getExpectedCompensation(engineer: Engineer): string {
  if (engineer.expectedAnnualSalary !== "—") return `年収 ${engineer.expectedAnnualSalary}`;
  if (engineer.expectedMonthlyRate !== "—") return `月額 ${engineer.expectedMonthlyRate}`;
  if (engineer.expectedHourlyRate !== "—") return `時間単価 ${engineer.expectedHourlyRate}`;
  return "応相談";
}

export function EngineerCard({
  engineer,
  isFavorited,
  isScouted,
  onToggleFavorite,
  onScout,
}: EngineerCardProps) {
  const [isScoutDialogOpen, setIsScoutDialogOpen] = useState(false);
  const maxItssLevel = Math.max(...engineer.technicalSkills.map((skill) => skill.itssLevel), 1);
  const mainSkills = engineer.technicalSkills.map((skill) => skill.name);

  function handleScoutConfirm(details: ScoutFormDetails) {
    onScout(engineer.id, details);
    setIsScoutDialogOpen(false);
  }

  return (
    <div className="relative rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <FavoriteEngineerButton
        isFavorited={isFavorited}
        onToggle={() => onToggleFavorite(engineer.id)}
        engineerName={engineer.name}
        className="absolute top-4 right-4"
      />

      <div className="flex min-w-0 items-start gap-3 pr-10">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary"
          aria-hidden="true"
        >
          {engineer.avatarInitials}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-foreground">{engineer.name}</h3>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">{engineer.title}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {engineer.location}
        </span>
        <span className="text-xs text-muted-foreground">
          経験{engineer.experienceYears}
          {ENGINEER_CARD_LABELS.experienceSuffix}
        </span>
        <EngineerStatusBadge availability={engineer.availability} />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {engineer.preferredContractTypes.map((type) => (
          <span
            key={type}
            className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-primary"
          >
            {type}
          </span>
        ))}
      </div>

      <div className="mt-3">
        <EngineerSkillSummary skills={mainSkills} maxItssLevel={maxItssLevel} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Languages className="h-3.5 w-3.5" aria-hidden="true" />
          {engineer.languages.map((lang) => lang.name).join(" / ")}
        </span>
        <span>{getExpectedCompensation(engineer)}</span>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <div className="flex min-w-0 flex-col gap-1">
          <span className="flex items-center gap-1 text-xs whitespace-nowrap text-muted-foreground">
            <CalendarClock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {ENGINEER_CARD_LABELS.lastActivePrefix}
            {engineer.lastActiveDateLabel}
          </span>
          <span className="text-xs whitespace-nowrap text-muted-foreground">
            {ENGINEER_CARD_LABELS.profileCompletionLabel}：{engineer.profileCompletion}%
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          {isScouted && (
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              {ENGINEER_CARD_LABELS.scoutedLabel}
            </span>
          )}
          <button
            type="button"
            onClick={() => setIsScoutDialogOpen(true)}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-3 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {ENGINEER_CARD_LABELS.scoutLabel}
          </button>
          <Link
            href={`/company/engineers/${engineer.id}`}
            className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {ENGINEER_CARD_LABELS.detailLabel}
          </Link>
        </div>
      </div>

      <ScoutDialog
        isOpen={isScoutDialogOpen}
        engineerName={engineer.name}
        isAlreadyScouted={isScouted}
        onCancel={() => setIsScoutDialogOpen(false)}
        onConfirm={handleScoutConfirm}
      />
    </div>
  );
}
