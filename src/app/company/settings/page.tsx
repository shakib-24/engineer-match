import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CompanyAccountSettings } from "@/components/company/settings/CompanyAccountSettings";
import { CompanyNotificationSettings } from "@/components/company/settings/CompanyNotificationSettings";
import { CompanySecuritySettings } from "@/components/company/settings/CompanySecuritySettings";
import { CompanyVisibilitySettings } from "@/components/company/settings/CompanyVisibilitySettings";
import { CompanyDangerZone } from "@/components/company/settings/CompanyDangerZone";
import { COMPANY_NAV } from "@/constants/dashboard";
import { COMPANY_SETTINGS_PAGE } from "@/constants/company-settings";
import { createClient } from "@/lib/supabase/server";
import { getCompanyHeaderIdentity, getCompanyProfile } from "@/lib/company/profile";

export const metadata: Metadata = {
  title: `${COMPANY_SETTINGS_PAGE.title} | ENGINEER MATCH`,
  description: COMPANY_SETTINGS_PAGE.description,
};

export default async function CompanySettingsPage() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();
  const [identity, profile] = await Promise.all([
    getCompanyHeaderIdentity(supabase, authUser),
    authUser ? getCompanyProfile(supabase, authUser.id) : Promise.resolve(null),
  ]);

  return (
    <DashboardShell
      navItems={COMPANY_NAV}
      activeHref="/company/settings"
      pageTitle={COMPANY_SETTINGS_PAGE.title}
      userName={identity.name}
      userInitials={identity.initials}
      userEmail={identity.email}
    >
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {COMPANY_SETTINGS_PAGE.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {COMPANY_SETTINGS_PAGE.description}
        </p>
      </div>

      <CompanyAccountSettings
        companyName={profile?.company_name ?? null}
        contactPerson={profile?.contact_person ?? null}
        email={identity.email}
      />
      <CompanyNotificationSettings />
      <CompanySecuritySettings />
      <CompanyVisibilitySettings />
      <CompanyDangerZone />
    </DashboardShell>
  );
}
