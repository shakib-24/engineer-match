import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminMessageList } from "@/components/admin/messages/AdminMessageList";
import { ADMIN_NAV, ADMIN_USER } from "@/constants/admin";
import { ADMIN_MESSAGES_PAGE, ADMIN_MESSAGE_MODERATIONS } from "@/constants/admin-messages";
import { CONVERSATIONS } from "@/constants/messages";

export const metadata: Metadata = {
  title: `${ADMIN_MESSAGES_PAGE.title} | ENGINEER MATCH`,
  description: ADMIN_MESSAGES_PAGE.description,
};

export default function AdminMessagesPage() {
  return (
    <AdminShell
      navItems={ADMIN_NAV}
      activeHref="/admin/messages"
      pageTitle={ADMIN_MESSAGES_PAGE.title}
      userName={ADMIN_USER.name}
      userInitials={ADMIN_USER.initials}
    >
      <AdminPageHeader
        title={ADMIN_MESSAGES_PAGE.title}
        description={ADMIN_MESSAGES_PAGE.description}
      />
      <p className="mt-4 rounded-xl bg-muted px-4 py-3 text-xs text-muted-foreground">
        {ADMIN_MESSAGES_PAGE.moderationNote}
      </p>
      <div className="mt-6">
        <AdminMessageList moderations={ADMIN_MESSAGE_MODERATIONS} conversations={CONVERSATIONS} />
      </div>
    </AdminShell>
  );
}
