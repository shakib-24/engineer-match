"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { MapPin, MessageSquareOff, Send } from "lucide-react";
import { EngineerStatusBadge } from "@/components/company/engineers/EngineerStatusBadge";
import { FavoriteEngineerButton } from "@/components/company/engineers/FavoriteEngineerButton";
import { ScoutDialog } from "@/components/company/engineers/ScoutDialog";
import {
  ENGINEER_CARD_LABELS,
  ENGINEER_DETAIL_META,
  SCOUT_DIALOG_LABELS,
  SIDEBAR_ACTIONS_LABELS,
  type Engineer,
} from "@/constants/company-engineers";

/**
 * Shares the (locally mutable, unpersisted) favorite / scout state between
 * the profile hero and the sticky action sidebar, so toggling either stays
 * in sync across the detail page.
 */
const EngineerActionContext = createContext<{
  isFavorited: boolean;
  isScouted: boolean;
  toggleFavorite: () => void;
  markScouted: () => void;
} | null>(null);

function useEngineerActionContext() {
  const context = useContext(EngineerActionContext);
  if (!context) {
    throw new Error("This component must be rendered within EngineerActionProvider.");
  }
  return context;
}

interface EngineerActionProviderProps {
  initialFavorited: boolean;
  initialScouted: boolean;
  children: ReactNode;
}

export function EngineerActionProvider({
  initialFavorited,
  initialScouted,
  children,
}: EngineerActionProviderProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [isScouted, setIsScouted] = useState(initialScouted);

  return (
    <EngineerActionContext.Provider
      value={{
        isFavorited,
        isScouted,
        toggleFavorite: () => setIsFavorited((prev) => !prev),
        markScouted: () => setIsScouted(true),
      }}
    >
      {children}
    </EngineerActionContext.Provider>
  );
}

interface EngineerProfileHeroProps {
  engineer: Engineer;
}

export function EngineerProfileHero({ engineer }: EngineerProfileHeroProps) {
  const { isFavorited, isScouted, toggleFavorite, markScouted } = useEngineerActionContext();
  const [isScoutDialogOpen, setIsScoutDialogOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function handleScoutConfirm() {
    markScouted();
    setIsScoutDialogOpen(false);
    setToastMessage(`${SCOUT_DIALOG_LABELS.toastTitle} ${SCOUT_DIALOG_LABELS.toastNote}`);
    window.setTimeout(() => setToastMessage(null), 3500);
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex min-w-0 items-start gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary sm:h-20 sm:w-20 sm:text-2xl"
            aria-hidden="true"
          >
            {engineer.avatarInitials}
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {engineer.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{engineer.title}</p>
            <dl className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <dt className="sr-only">勤務地</dt>
                <dd>{engineer.location}</dd>
              </div>
              <div>
                <dt className="sr-only">経験年数</dt>
                <dd>
                  経験{engineer.experienceYears}
                  {ENGINEER_CARD_LABELS.experienceSuffix}
                </dd>
              </div>
              <div>
                <dt className="sr-only">稼働状況</dt>
                <dd>
                  <EngineerStatusBadge availability={engineer.availability} />
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <FavoriteEngineerButton
            isFavorited={isFavorited}
            onToggle={toggleFavorite}
            engineerName={engineer.name}
            className="border border-border"
          />
          <button
            type="button"
            onClick={() => setIsScoutDialogOpen(true)}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {isScouted ? ENGINEER_CARD_LABELS.scoutedLabel : ENGINEER_CARD_LABELS.scoutLabel}
          </button>
        </div>
      </div>

      <ScoutDialog
        isOpen={isScoutDialogOpen}
        engineerName={engineer.name}
        isAlreadyScouted={isScouted}
        onCancel={() => setIsScoutDialogOpen(false)}
        onConfirm={handleScoutConfirm}
      />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 sm:justify-end sm:pr-6"
        >
          <div className="max-w-sm rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-white shadow-lg">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}

interface EngineerStickyActionsProps {
  engineer: Engineer;
}

export function EngineerStickyActions({ engineer }: EngineerStickyActionsProps) {
  const { isFavorited, isScouted, toggleFavorite, markScouted } = useEngineerActionContext();
  const [isScoutDialogOpen, setIsScoutDialogOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setIsScoutDialogOpen(true)}
          className="inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-primary text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          {isScouted ? ENGINEER_CARD_LABELS.scoutedLabel : SIDEBAR_ACTIONS_LABELS.scoutLabel}
        </button>
        <button
          type="button"
          onClick={toggleFavorite}
          aria-pressed={isFavorited}
          className={`inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border text-sm font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none ${
            isFavorited
              ? "border-primary bg-primary/5 text-primary"
              : "border-border bg-surface text-foreground hover:bg-muted"
          }`}
        >
          {isFavorited
            ? SIDEBAR_ACTIONS_LABELS.favoritedLabel
            : SIDEBAR_ACTIONS_LABELS.favoriteLabel}
        </button>
        <button
          type="button"
          disabled
          className="inline-flex h-11 w-full cursor-not-allowed items-center justify-center gap-1.5 rounded-xl border border-border bg-muted text-sm font-semibold text-muted-foreground"
        >
          <MessageSquareOff className="h-4 w-4" aria-hidden="true" />
          {SIDEBAR_ACTIONS_LABELS.messageLabel}
        </button>
        <p className="text-xs text-muted-foreground">{SIDEBAR_ACTIONS_LABELS.messageDemoNote}</p>
      </div>

      <p className="mt-4 border-t border-border pt-4 text-xs text-muted-foreground">
        {ENGINEER_DETAIL_META.updatedPrefix}
        {engineer.lastActiveDateLabel}
      </p>

      <ScoutDialog
        isOpen={isScoutDialogOpen}
        engineerName={engineer.name}
        isAlreadyScouted={isScouted}
        onCancel={() => setIsScoutDialogOpen(false)}
        onConfirm={() => {
          markScouted();
          setIsScoutDialogOpen(false);
        }}
      />
    </div>
  );
}
