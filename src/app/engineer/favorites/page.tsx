import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { FavoriteHeader } from "@/components/favorites/FavoriteHeader";
import { FavoriteList } from "@/components/favorites/FavoriteList";
import { ENGINEER_NAV, USER_MENU } from "@/constants/dashboard";
import { FAVORITES_PAGE } from "@/constants/favorites";
import { JOBS } from "@/constants/jobs";

export const metadata: Metadata = {
  title: `${FAVORITES_PAGE.title} | ENGINEER MATCH`,
  description: FAVORITES_PAGE.description,
};

export default function EngineerFavoritesPage() {
  const user = USER_MENU.engineer;

  return (
    <DashboardShell
      navItems={ENGINEER_NAV}
      activeHref="/engineer/favorites"
      pageTitle={FAVORITES_PAGE.title}
      userName={user.name}
      userInitials={user.initials}
    >
      <FavoriteHeader />
      <FavoriteList jobs={JOBS} />
    </DashboardShell>
  );
}
