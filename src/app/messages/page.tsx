import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ConversationList } from "@/components/messages/ConversationList";
import { EmptyConversation } from "@/components/messages/EmptyConversation";
import { ENGINEER_NAV, USER_MENU } from "@/constants/dashboard";
import { CONVERSATIONS, MESSAGES_PAGE } from "@/constants/messages";

export const metadata: Metadata = {
  title: `${MESSAGES_PAGE.title} | ENGINEER MATCH`,
};

export default function MessagesPage() {
  const user = USER_MENU.engineer;

  return (
    <DashboardShell
      navItems={ENGINEER_NAV}
      activeHref="/messages"
      pageTitle={MESSAGES_PAGE.title}
      userName={user.name}
      userInitials={user.initials}
    >
      <p className="text-sm text-muted-foreground">{MESSAGES_PAGE.description}</p>

      <div className="grid grid-cols-1 gap-6 lg:h-[calc(100svh-220px)] lg:min-h-[520px] lg:grid-cols-[380px_1fr] lg:grid-rows-[minmax(0,1fr)]">
        <div className="lg:h-full lg:min-h-0">
          <ConversationList conversations={CONVERSATIONS} />
        </div>
        <div className="hidden lg:block lg:h-full lg:min-h-0">
          <EmptyConversation />
        </div>
      </div>
    </DashboardShell>
  );
}
