import type { Metadata } from "next";
import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { FavoriteHeader } from "@/components/favorites/FavoriteHeader";
import { FavoriteList } from "@/components/favorites/FavoriteList";
import { ENGINEER_NAV, USER_MENU } from "@/constants/dashboard";
import { FAVORITES_PAGE, SIGN_IN_REQUIRED_LABELS } from "@/constants/favorites";
import { createClient } from "@/lib/supabase/server";
import { listMyFavoriteOpportunities } from "@/lib/engineer/favorites";

export const metadata: Metadata = {
  title: `${FAVORITES_PAGE.title} | ENGINEER MATCH`,
  description: FAVORITES_PAGE.description,
};

export default async function EngineerFavoritesPage() {
  const user = USER_MENU.engineer;
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  return (
    <DashboardShell
      navItems={ENGINEER_NAV}
      activeHref="/engineer/favorites"
      pageTitle={FAVORITES_PAGE.title}
      userName={user.name}
      userInitials={user.initials}
    >
      <FavoriteHeader />

      {authUser ? (
        <FavoriteList
          favorites={await listMyFavoriteOpportunities(supabase, authUser.id)}
          userId={authUser.id}
        />
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center shadow-sm">
          <p className="text-sm font-semibold text-foreground">{SIGN_IN_REQUIRED_LABELS.title}</p>
          <p className="text-sm text-muted-foreground">{SIGN_IN_REQUIRED_LABELS.description}</p>
          <Link
            href={SIGN_IN_REQUIRED_LABELS.ctaHref}
            className="mt-2 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {SIGN_IN_REQUIRED_LABELS.ctaLabel}
          </Link>
        </div>
      )}
    </DashboardShell>
  );
}
