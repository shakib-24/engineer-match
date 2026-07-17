import type { ReactNode } from "react";
import { AdminSidebar, type AdminNavItem } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

interface AdminShellProps {
  navItems: readonly AdminNavItem[];
  activeHref: string;
  pageTitle: string;
  userName: string;
  userInitials: string;
  children: ReactNode;
}

export function AdminShell({
  navItems,
  activeHref,
  pageTitle,
  userName,
  userInitials,
  children,
}: AdminShellProps) {
  return (
    <div className="flex min-h-svh bg-background">
      <AdminSidebar items={navItems} activeHref={activeHref} />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar
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
