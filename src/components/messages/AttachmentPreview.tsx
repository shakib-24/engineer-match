import { FileText, Paperclip } from "lucide-react";
import type { MessageAttachment } from "@/constants/messages";

interface AttachmentPreviewProps {
  attachment: MessageAttachment;
}

export function AttachmentPreview({ attachment }: AttachmentPreviewProps) {
  return (
    <div className="mt-2 flex items-center gap-2.5 rounded-xl border border-border bg-surface px-3 py-2.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-foreground">{attachment.name}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {attachment.fileType.toUpperCase()} ・ {attachment.size}
        </p>
      </div>
      <Paperclip className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
    </div>
  );
}
