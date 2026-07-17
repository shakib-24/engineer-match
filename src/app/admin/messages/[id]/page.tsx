import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";
import { AdminMessageDetailView } from "@/components/admin/messages/AdminMessageDetailView";
import { ADMIN_NAV, ADMIN_USER } from "@/constants/admin";
import { ADMIN_MESSAGE_MODERATIONS, ADMIN_MESSAGE_NOT_FOUND } from "@/constants/admin-messages";
import { CONVERSATIONS } from "@/constants/messages";

interface AdminMessageDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return ADMIN_MESSAGE_MODERATIONS.map((moderation) => ({ id: moderation.conversationId }));
}

export async function generateMetadata({
  params,
}: AdminMessageDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const conversation = CONVERSATIONS.find((item) => item.id === id);
  return {
    title: conversation
      ? `${conversation.participantName} | メッセージ管理 | ENGINEER MATCH`
      : `メッセージ管理 | ENGINEER MATCH`,
  };
}

export default async function AdminMessageDetailPage({ params }: AdminMessageDetailPageProps) {
  const { id } = await params;
  const conversation = CONVERSATIONS.find((item) => item.id === id);
  const moderation = ADMIN_MESSAGE_MODERATIONS.find((item) => item.conversationId === id);

  const found = conversation && moderation;

  return (
    <AdminShell
      navItems={ADMIN_NAV}
      activeHref="/admin/messages"
      pageTitle={found ? conversation.participantName : ADMIN_MESSAGE_NOT_FOUND.title}
      userName={ADMIN_USER.name}
      userInitials={ADMIN_USER.initials}
    >
      {found ? (
        <AdminMessageDetailView conversation={conversation} moderation={moderation} />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <AdminEmptyState
            title={ADMIN_MESSAGE_NOT_FOUND.title}
            description={ADMIN_MESSAGE_NOT_FOUND.description}
          />
          <Link
            href={ADMIN_MESSAGE_NOT_FOUND.ctaHref}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {ADMIN_MESSAGE_NOT_FOUND.ctaLabel}
          </Link>
        </div>
      )}
    </AdminShell>
  );
}
