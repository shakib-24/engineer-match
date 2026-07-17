import { Ban, Building2, ShieldCheck, UserPlus, UserRound, Users } from "lucide-react";
import { AdminSummaryCard } from "@/components/admin/shared/AdminSummaryCard";
import { ADMIN_USER_SUMMARY_LABELS, type AdminUser } from "@/constants/admin-users";

const CURRENT_MONTH_PREFIX = "2026-07";

interface AdminUserSummaryCardsProps {
  users: AdminUser[];
}

export function AdminUserSummaryCards({ users }: AdminUserSummaryCardsProps) {
  const total = users.length;
  const engineers = users.filter((user) => user.role === "エンジニア").length;
  const companyStaff = users.filter((user) => user.role === "企業担当者").length;
  const admins = users.filter((user) => user.role === "管理者").length;
  const suspended = users.filter((user) => user.accountStatus === "利用停止中").length;
  const newThisMonth = users.filter((user) =>
    user.registeredDateISO.startsWith(CURRENT_MONTH_PREFIX),
  ).length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <AdminSummaryCard
        label={ADMIN_USER_SUMMARY_LABELS.total}
        value={`${total}人`}
        icon={Users}
      />
      <AdminSummaryCard
        label={ADMIN_USER_SUMMARY_LABELS.engineers}
        value={`${engineers}人`}
        icon={UserRound}
      />
      <AdminSummaryCard
        label={ADMIN_USER_SUMMARY_LABELS.companyStaff}
        value={`${companyStaff}人`}
        icon={Building2}
      />
      <AdminSummaryCard
        label={ADMIN_USER_SUMMARY_LABELS.admins}
        value={`${admins}人`}
        icon={ShieldCheck}
      />
      <AdminSummaryCard
        label={ADMIN_USER_SUMMARY_LABELS.suspended}
        value={`${suspended}人`}
        icon={Ban}
        tone="negative"
      />
      <AdminSummaryCard
        label={ADMIN_USER_SUMMARY_LABELS.newThisMonth}
        value={`${newThisMonth}人`}
        icon={UserPlus}
        tone="positive"
      />
    </div>
  );
}
