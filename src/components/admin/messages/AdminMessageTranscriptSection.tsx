import { MessageBubble } from "@/components/messages/MessageBubble";
import { AdminDetailField, AdminDetailGrid, AdminDetailSection } from "@/components/admin/shared/AdminDetailSection";
import { ADMIN_MESSAGE_DETAIL_SECTIONS } from "@/constants/admin-messages";
import type { Conversation } from "@/constants/messages";
import { cn } from "@/lib/utils";

interface AdminMessageTranscriptSectionProps {
  conversation: Conversation;
  reportedMessageIds: string[];
}

export function AdminMessageTranscriptSection({
  conversation,
  reportedMessageIds,
}: AdminMessageTranscriptSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <AdminDetailSection title={ADMIN_MESSAGE_DETAIL_SECTIONS.participants}>
        <AdminDetailGrid>
          <AdminDetailField label="参加者" value={conversation.participantName} />
          <AdminDetailField label="役職" value={conversation.participantRole} />
          <AdminDetailField label="企業名" value={conversation.participantCompany} />
          <AdminDetailField label="会話種別" value={conversation.status} />
        </AdminDetailGrid>
      </AdminDetailSection>

      <AdminDetailSection title={ADMIN_MESSAGE_DETAIL_SECTIONS.relatedOpportunity}>
        <p className="text-sm text-foreground">{conversation.jobTitle}</p>
      </AdminDetailSection>

      <AdminDetailSection title={ADMIN_MESSAGE_DETAIL_SECTIONS.transcript}>
        <div className="flex flex-col gap-4">
          {conversation.messages.map((message) => {
            const isReported = reportedMessageIds.includes(message.id);
            return (
              <div
                key={message.id}
                className={cn(
                  isReported && "rounded-2xl bg-red-50/60 p-2 ring-1 ring-red-300",
                )}
              >
                {isReported && (
                  <p className="mb-1 px-1 text-[11px] font-semibold text-red-600">
                    通報対象のメッセージ
                  </p>
                )}
                <MessageBubble message={message} isOwnMessage={message.senderRole === "engineer"} />
              </div>
            );
          })}
        </div>
      </AdminDetailSection>
    </div>
  );
}
