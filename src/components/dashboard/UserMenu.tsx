"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { DASHBOARD_LOGOUT } from "@/constants/dashboard";
import { createClient } from "@/lib/supabase/client";

interface UserMenuProps {
  userName: string;
  userInitials: string;
  userEmail?: string;
}

/**
 * Shared avatar + sign-out dropdown, used by DashboardTopbar (engineer/
 * company) and AdminTopbar. Single source of truth for the real
 * supabase.auth.signOut() call so no caller re-implements it.
 */
export function UserMenu({ userName, userInitials, userEmail }: UserMenuProps) {
  const router = useRouter();
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
            className="absolute top-full right-0 z-40 mt-2 w-56 rounded-xl border border-border bg-surface py-1.5 shadow-lg"
          >
            {userEmail && (
              <p
                className="truncate border-b border-border px-4 pt-1 pb-2 text-xs text-muted-foreground"
                title={userEmail}
              >
                {userEmail}
              </p>
            )}
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
              {isSigningOut ? DASHBOARD_LOGOUT.loadingLabel : DASHBOARD_LOGOUT.label}
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
  );
}
