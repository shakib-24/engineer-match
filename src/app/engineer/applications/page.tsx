import type { Metadata } from "next";
import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ApplicationList } from "@/components/applications/ApplicationList";
import { ENGINEER_NAV } from "@/constants/dashboard";
import { APPLICATIONS_PAGE, SIGN_IN_REQUIRED_LABELS } from "@/constants/applications";
import { createClient } from "@/lib/supabase/server";
import { getEngineerHeaderIdentity } from "@/lib/engineer/profile";
import { listMyApplications } from "@/lib/engineer/applications";

export const metadata: Metadata = {
  title: "応募管理 | ENGINEER MATCH",
  description: "応募した求人・案件を確認できます。",
};

export default async function EngineerApplicationsPage() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();
  const identity = await getEngineerHeaderIdentity(supabase, authUser);

  return (
    <DashboardShell
      navItems={ENGINEER_NAV}
      activeHref="/engineer/applications"
      pageTitle={APPLICATIONS_PAGE.title}
      userName={identity.name}
      userInitials={identity.initials}
      userEmail={identity.email}
    >
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {APPLICATIONS_PAGE.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{APPLICATIONS_PAGE.description}</p>
      </div>

      {authUser ? (
        <ApplicationList applications={await listMyApplications(supabase, authUser.id)} />
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center shadow-sm">
          <p className="text-sm font-semibold text-foreground">{SIGN_IN_REQUIRED_LABELS.title}</p>
          <p className="text-sm text-muted-foreground">{SIGN_IN_REQUIRED_LABELS.description}</p>
          <Link
            href={SIGN_IN_REQUIRED_LABELS.ctaHref}
            className="mt-2 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {SIGN_IN_REQUIRED_LABELS.ctaLabel}
          </Link>
        </div>
      )}
    </DashboardShell>
  );
}
