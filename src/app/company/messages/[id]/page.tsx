import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ConversationList } from "@/components/messages/ConversationList";
import { MessageThread } from "@/components/messages/MessageThread";
import { COMPANY_NAV, USER_MENU } from "@/constants/dashboard";
import { CONVERSATIONS, MESSAGES_PAGE_COMPANY } from "@/constants/messages";

interface CompanyConversationPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return CONVERSATIONS.map((conversation) => ({ id: conversation.id }));
}

export async function generateMetadata({
  params,
}: CompanyConversationPageProps): Promise<Metadata> {
  const { id } = await params;
  const conversation = CONVERSATIONS.find((item) => item.id === id);

  return {
    title: conversation
      ? `${conversation.participantName} | ${MESSAGES_PAGE_COMPANY.title} | ENGINEER MATCH`
      : `${MESSAGES_PAGE_COMPANY.title} | ENGINEER MATCH`,
  };
}

export default async function CompanyConversationPage({
  params,
}: CompanyConversationPageProps) {
  const { id } = await params;
  const conversation = CONVERSATIONS.find((item) => item.id === id);

  if (!conversation) {
    notFound();
  }

  const user = USER_MENU.company;

  return (
    <DashboardShell
      navItems={COMPANY_NAV}
      activeHref="/company/messages"
      pageTitle={conversation.participantName}
      userName={user.name}
      userInitials={user.initials}
    >
      <p className="hidden text-sm text-muted-foreground lg:block">
        {MESSAGES_PAGE_COMPANY.description}
      </p>

      <div className="grid grid-cols-1 gap-6 lg:h-[calc(100svh-220px)] lg:min-h-[520px] lg:grid-cols-[380px_1fr] lg:grid-rows-[minmax(0,1fr)]">
        <div className="hidden lg:block lg:h-full lg:min-h-0">
          <ConversationList
            conversations={CONVERSATIONS}
            activeId={conversation.id}
            basePath="/company/messages"
          />
        </div>
        <div className="h-[calc(100svh-160px)] min-h-[480px] lg:h-full lg:min-h-0">
          <MessageThread conversation={conversation} basePath="/company/messages" />
        </div>
      </div>
    </DashboardShell>
  );
}
