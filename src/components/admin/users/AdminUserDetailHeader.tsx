import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import {
  ADMIN_USER_ACCOUNT_STATUS_TONE,
  ADMIN_USER_ACTION_LABELS,
  ADMIN_USER_ROLE_STYLES,
  ADMIN_USER_VERIFICATION_STATUS_TONE,
  type AdminUser,
  type AdminUserAccountStatus,
} from "@/constants/admin-users";
import { cn } from "@/lib/utils";

interface AdminUserDetailHeaderProps {
  user: AdminUser;
  accountStatus: AdminUserAccountStatus;
  onEdit: () => void;
  onSuspend: () => void;
  onReinstate: () => void;
  onDelete: () => void;
}

export function AdminUserDetailHeader({
  user,
  accountStatus,
  onEdit,
  onSuspend,
  onReinstate,
  onDelete,
}: AdminUserDetailHeaderProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary"
            aria-hidden="true"
          >
            {user.avatarInitials}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-foreground">{user.name}</h2>
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
                  ADMIN_USER_ROLE_STYLES[user.role],
                )}
              >
                {user.role}
              </span>
              <AdminStatusBadge
                label={accountStatus}
                tone={ADMIN_USER_ACCOUNT_STATUS_TONE[accountStatus]}
              />
              <AdminStatusBadge
                label={user.verificationStatus}
                tone={ADMIN_USER_VERIFICATION_STATUS_TONE[user.verificationStatus]}
              />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
            {user.companyName && (
              <p className="text-sm text-muted-foreground">{user.companyName}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex h-9 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {ADMIN_USER_ACTION_LABELS.edit}
          </button>
          {accountStatus === "利用停止中" ? (
            <button
              type="button"
              onClick={onReinstate}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-emerald-300 bg-white px-4 text-sm font-semibold text-emerald-600 transition-colors duration-200 hover:bg-emerald-50 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {ADMIN_USER_ACTION_LABELS.reinstate}
            </button>
          ) : (
            <button
              type="button"
              onClick={onSuspend}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-amber-300 bg-white px-4 text-sm font-semibold text-amber-600 transition-colors duration-200 hover:bg-amber-50 focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {ADMIN_USER_ACTION_LABELS.suspend}
            </button>
          )}
          <button
            type="button"
            onClick={onDelete}
            className="inline-flex h-9 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {ADMIN_USER_ACTION_LABELS.delete}
          </button>
        </div>
      </div>
    </div>
  );
}
