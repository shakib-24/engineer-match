"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, Menu, X } from "lucide-react";
import {
  DashboardNavLinks,
  type DashboardNavItem,
} from "@/components/dashboard/DashboardSidebar";
import { BRAND } from "@/constants/lp";
import { COMPANY_NAV, DASHBOARD_LOGOUT, ENGINEER_NAV } from "@/constants/dashboard";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface DashboardTopbarProps {
  items: readonly DashboardNavItem[];
  activeHref: string;
  pageTitle: string;
  userName: string;
  userInitials: string;
}

export function DashboardTopbar({
  items,
  activeHref,
  pageTitle,
  userName,
  userInitials,
}: DashboardTopbarProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  // Sign-out is wired up when this shared topbar is rendered with the
  // engineer or company nav, so behavior for admin callers is unchanged.
  // There is no dedicated engineer/company-only header component. Matched
  // by content (not reference) since HMR/bundling can give ENGINEER_NAV /
  // COMPANY_NAV multiple module instances in dev.
  const hasWorkingLogout = items.some(
    (item) =>
      item.href === ENGINEER_NAV[0].href || item.href === COMPANY_NAV[0].href,
  );
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  async function handleSignOut() {
    if (isSigningOut) return;
    setLogoutError(null);
    setIsSigningOut(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("[logout] signOut failed:", error);
        setLogoutError(DASHBOARD_LOGOUT.errorMessage);
        setIsSigningOut(false);
        return;
      }

      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("[logout] unexpected error:", err);
      setLogoutError(DASHBOARD_LOGOUT.errorMessage);
      setIsSigningOut(false);
    }
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex h-[72px] shrink-0 items-center justify-between border-b border-border bg-surface/90 px-4 backdrop-blur-md md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="メニューを開く"
            aria-expanded={isMenuOpen}
            className="inline-flex items-center justify-center rounded-xl p-2 text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          <h1 className="text-base font-semibold text-foreground sm:text-lg">
            {pageTitle}
          </h1>
        </div>

        {hasWorkingLogout ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsUserMenuOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={isUserMenuOpen}
              className="flex items-center gap-2 rounded-full border border-border py-1.5 pr-3 pl-1.5 transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {userInitials}
              </div>
              <span className="hidden text-sm font-medium text-foreground sm:inline">
                {userName}
              </span>
            </button>

            {isUserMenuOpen && (
              <>
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label="メニューを閉じる"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="fixed inset-0 z-30 cursor-default"
                />
                <div
                  role="menu"
                  className="absolute top-full right-0 z-40 mt-2 w-48 rounded-xl border border-border bg-surface py-1.5 shadow-lg"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    aria-busy={isSigningOut}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:opacity-60"
                  >
                    {isSigningOut ? (
                      <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
                    ) : (
                      <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
                    )}
                    {isSigningOut
                      ? DASHBOARD_LOGOUT.loadingLabel
                      : DASHBOARD_LOGOUT.label}
                  </button>
                  {logoutError && (
                    <p
                      role="alert"
                      aria-live="assertive"
                      className="px-4 pt-1.5 pb-1 text-xs text-red-600"
                    >
                      {logoutError}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-full border border-border py-1.5 pr-3 pl-1.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {userInitials}
            </div>
            <span className="hidden text-sm font-medium text-foreground sm:inline">
              {userName}
            </span>
          </div>
        )}
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <button
          type="button"
          aria-label="メニューを閉じる"
          tabIndex={isMenuOpen ? 0 : -1}
          onClick={closeMenu}
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity duration-200",
            isMenuOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-hidden={!isMenuOpen}
          aria-label="ナビゲーションメニュー"
          className={cn(
            "absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-surface shadow-xl transition-transform duration-200",
            isMenuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-border px-4">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex flex-col leading-tight"
            >
              <span className="text-base font-bold tracking-tight text-foreground">
                {BRAND.name}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {BRAND.subtitle}
              </span>
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="メニューを閉じる"
              className="inline-flex items-center justify-center rounded-xl p-2 text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <DashboardNavLinks
              items={items}
              activeHref={activeHref}
              onNavigate={closeMenu}
            />
          </div>
        </div>
      </div>
    </>
  );
}
