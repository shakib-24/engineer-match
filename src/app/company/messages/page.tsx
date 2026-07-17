import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ConversationList } from "@/components/messages/ConversationList";
import { EmptyConversation } from "@/components/messages/EmptyConversation";
import { COMPANY_NAV, USER_MENU } from "@/constants/dashboard";
import { CONVERSATIONS, MESSAGES_PAGE_COMPANY } from "@/constants/messages";

export const metadata: Metadata = {
  title: `${MESSAGES_PAGE_COMPANY.title} | ENGINEER MATCH`,
};

export default function CompanyMessagesPage() {
  const user = USER_MENU.company;

  return (
    <DashboardShell
      navItems={COMPANY_NAV}
      activeHref="/company/messages"
      pageTitle={MESSAGES_PAGE_COMPANY.title}
      userName={user.name}
      userInitials={user.initials}
    >
      <p className="text-sm text-muted-foreground">
        {MESSAGES_PAGE_COMPANY.description}
      </p>

      <div className="grid grid-cols-1 gap-6 lg:h-[calc(100svh-220px)] lg:min-h-[520px] lg:grid-cols-[380px_1fr] lg:grid-rows-[minmax(0,1fr)]">
        <div className="lg:h-full lg:min-h-0">
          <ConversationList
            conversations={CONVERSATIONS}
            basePath="/company/messages"
          />
        </div>
        <div className="hidden lg:block lg:h-full lg:min-h-0">
          <EmptyConversation />
        </div>
      </div>
    </DashboardShell>
  );
}
