import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { EngineerAccountSettings } from "@/components/engineer/settings/EngineerAccountSettings";
import { EngineerNotificationSettings } from "@/components/engineer/settings/EngineerNotificationSettings";
import { EngineerPrivacySettings } from "@/components/engineer/settings/EngineerPrivacySettings";
import { EngineerSecuritySettings } from "@/components/engineer/settings/EngineerSecuritySettings";
import { EngineerDangerZone } from "@/components/engineer/settings/EngineerDangerZone";
import { ENGINEER_NAV, USER_MENU } from "@/constants/dashboard";
import { ENGINEER_SETTINGS_PAGE } from "@/constants/engineer-settings";

export const metadata: Metadata = {
  title: `${ENGINEER_SETTINGS_PAGE.title} | ENGINEER MATCH`,
  description: ENGINEER_SETTINGS_PAGE.description,
};

export default function EngineerSettingsPage() {
  const user = USER_MENU.engineer;

  return (
    <DashboardShell
      navItems={ENGINEER_NAV}
      activeHref="/engineer/settings"
      pageTitle={ENGINEER_SETTINGS_PAGE.title}
      userName={user.name}
      userInitials={user.initials}
    >
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {ENGINEER_SETTINGS_PAGE.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {ENGINEER_SETTINGS_PAGE.description}
        </p>
      </div>

      <EngineerAccountSettings />
      <EngineerNotificationSettings />
      <EngineerPrivacySettings />
      <EngineerSecuritySettings />
      <EngineerDangerZone />
    </DashboardShell>
  );
}
