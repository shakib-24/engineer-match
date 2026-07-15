import type { ReactNode } from "react";
import {
  DashboardSidebar,
  type DashboardNavItem,
} from "@/components/dashboard/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";

interface DashboardShellProps {
  navItems: readonly DashboardNavItem[];
  activeHref: string;
  pageTitle: string;
  userName: string;
  userInitials: string;
  children: ReactNode;
}

export function DashboardShell({
  navItems,
  activeHref,
  pageTitle,
  userName,
  userInitials,
  children,
}: DashboardShellProps) {
  return (
    <div className="flex min-h-svh bg-background">
      <DashboardSidebar items={navItems} activeHref={activeHref} />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar
          items={navItems}
          activeHref={activeHref}
          pageTitle={pageTitle}
          userName={userName}
          userInitials={userInitials}
        />

        <main className="flex-1 px-4 py-6 md:px-6 md:py-8 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
