import { History, MessageCircle, Send } from "lucide-react";
import { AdminDetailSection } from "@/components/admin/shared/AdminDetailSection";
import { ADMIN_USER_DETAIL_SECTIONS, type AdminUser } from "@/constants/admin-users";

interface AdminUserActivitySectionProps {
  user: AdminUser;
}

export function AdminUserActivitySection({ user }: AdminUserActivitySectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <AdminDetailSection title={ADMIN_USER_DETAIL_SECTIONS.activityHistory}>
        {user.activityHistory.length > 0 ? (
          <ul className="flex flex-col divide-y divide-border">
            {user.activityHistory.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Send className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {entry.title}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {entry.type} ・ {entry.counterpart}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs font-semibold text-foreground">{entry.status}</p>
                  <p className="text-xs text-muted-foreground">{entry.dateLabel}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">応募・スカウト履歴はありません。</p>
        )}
      </AdminDetailSection>

      <AdminDetailSection title={ADMIN_USER_DETAIL_SECTIONS.messageHistory}>
        {user.messageSummary.length > 0 ? (
          <ul className="flex flex-col divide-y divide-border">
            {user.messageSummary.map((entry) => (
              <li key={entry.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle className="h-4 w-4 text-primary" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {entry.participant}
                    </p>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {entry.dateLabel}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {entry.preview}
                  </p>
                </div>
                {entry.unread && (
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary"
                    aria-label="未読"
                  />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">メッセージ履歴はありません。</p>
        )}
      </AdminDetailSection>

      <AdminDetailSection title={ADMIN_USER_DETAIL_SECTIONS.activityLog}>
        {user.activityLog.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {user.activityLog.map((entry) => (
              <li key={entry.id} className="flex items-start gap-3">
                <History
                  className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{entry.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {entry.detail} ・ {entry.dateLabel}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">アクティビティログはありません。</p>
        )}
      </AdminDetailSection>
    </div>
  );
}
