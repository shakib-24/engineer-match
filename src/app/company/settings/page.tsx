import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CompanyAccountSettings } from "@/components/company/settings/CompanyAccountSettings";
import { CompanyNotificationSettings } from "@/components/company/settings/CompanyNotificationSettings";
import { CompanySecuritySettings } from "@/components/company/settings/CompanySecuritySettings";
import { CompanyVisibilitySettings } from "@/components/company/settings/CompanyVisibilitySettings";
import { CompanyDangerZone } from "@/components/company/settings/CompanyDangerZone";
import { COMPANY_NAV, USER_MENU } from "@/constants/dashboard";
import { COMPANY_SETTINGS_PAGE } from "@/constants/company-settings";

export const metadata: Metadata = {
  title: `${COMPANY_SETTINGS_PAGE.title} | ENGINEER MATCH`,
  description: COMPANY_SETTINGS_PAGE.description,
};

export default function CompanySettingsPage() {
  const user = USER_MENU.company;

  return (
    <DashboardShell
      navItems={COMPANY_NAV}
      activeHref="/company/settings"
      pageTitle={COMPANY_SETTINGS_PAGE.title}
      userName={user.name}
      userInitials={user.initials}
    >
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {COMPANY_SETTINGS_PAGE.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {COMPANY_SETTINGS_PAGE.description}
        </p>
      </div>

      <CompanyAccountSettings />
      <CompanyNotificationSettings />
      <CompanySecuritySettings />
      <CompanyVisibilitySettings />
      <CompanyDangerZone />
    </DashboardShell>
  );
}
