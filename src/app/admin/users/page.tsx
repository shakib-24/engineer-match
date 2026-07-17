import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminUserList } from "@/components/admin/users/AdminUserList";
import { ADMIN_NAV, ADMIN_USER } from "@/constants/admin";
import { ADMIN_USERS, ADMIN_USERS_PAGE } from "@/constants/admin-users";

export const metadata: Metadata = {
  title: `${ADMIN_USERS_PAGE.title} | ENGINEER MATCH`,
  description: ADMIN_USERS_PAGE.description,
};

export default function AdminUsersPage() {
  return (
    <AdminShell
      navItems={ADMIN_NAV}
      activeHref="/admin/users"
      pageTitle={ADMIN_USERS_PAGE.title}
      userName={ADMIN_USER.name}
      userInitials={ADMIN_USER.initials}
    >
      <AdminPageHeader
        title={ADMIN_USERS_PAGE.title}
        description={ADMIN_USERS_PAGE.description}
      />
      <div className="mt-6">
        <AdminUserList initialUsers={ADMIN_USERS} />
      </div>
    </AdminShell>
  );
}
