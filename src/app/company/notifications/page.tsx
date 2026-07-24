import type { Metadata } from "next";
import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CompanyNotificationList } from "@/components/notifications/CompanyNotificationList";
import { COMPANY_NAV } from "@/constants/dashboard";
import {
  COMPANY_NOTIFICATIONS_PAGE,
  COMPANY_NOTIFICATIONS_SIGN_IN_REQUIRED_LABELS,
} from "@/constants/company-notifications";
import { createClient } from "@/lib/supabase/server";
import { listMyNotifications } from "@/lib/engineer/notifications";
import { getCompanyHeaderIdentity } from "@/lib/company/profile";

export const metadata: Metadata = {
  title: `${COMPANY_NOTIFICATIONS_PAGE.title} | ENGINEER MATCH`,
};

export default async function CompanyNotificationsPage() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();
  const identity = await getCompanyHeaderIdentity(supabase, authUser);

  return (
    <DashboardShell
      navItems={COMPANY_NAV}
      activeHref="/company/notifications"
      pageTitle={COMPANY_NOTIFICATIONS_PAGE.title}
      userName={identity.name}
      userInitials={identity.initials}
      userEmail={identity.email}
    >
      <p className="text-sm text-muted-foreground">{COMPANY_NOTIFICATIONS_PAGE.description}</p>

      {authUser ? (
        <CompanyNotificationList
          initialNotifications={await listMyNotifications(supabase, authUser.id)}
        />
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center shadow-sm">
          <p className="text-sm font-semibold text-foreground">
            {COMPANY_NOTIFICATIONS_SIGN_IN_REQUIRED_LABELS.title}
          </p>
          <p className="text-sm text-muted-foreground">
            {COMPANY_NOTIFICATIONS_SIGN_IN_REQUIRED_LABELS.description}
          </p>
          <Link
            href={COMPANY_NOTIFICATIONS_SIGN_IN_REQUIRED_LABELS.ctaHref}
            className="mt-2 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {COMPANY_NOTIFICATIONS_SIGN_IN_REQUIRED_LABELS.ctaLabel}
          </Link>
        </div>
      )}
    </DashboardShell>
  );
}
