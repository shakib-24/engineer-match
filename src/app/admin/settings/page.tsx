import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminAccountSettings } from "@/components/admin/settings/AdminAccountSettings";
import { AdminSettingsToggleList } from "@/components/admin/settings/AdminSettingsToggleList";
import { AdminSecuritySettings } from "@/components/admin/settings/AdminSecuritySettings";
import { AdminMaintenanceSettings } from "@/components/admin/settings/AdminMaintenanceSettings";
import { AdminSettingsDangerZone } from "@/components/admin/settings/AdminSettingsDangerZone";
import { ADMIN_NAV, ADMIN_USER } from "@/constants/admin";
import {
  ADMIN_NOTIFICATION_SETTINGS_SECTION,
  ADMIN_NOTIFICATION_TOGGLES,
  ADMIN_PLATFORM_SETTINGS_SECTION,
  ADMIN_PLATFORM_TOGGLES,
  ADMIN_SETTINGS_PAGE,
} from "@/constants/admin-settings";

export const metadata: Metadata = {
  title: `${ADMIN_SETTINGS_PAGE.title} | ENGINEER MATCH`,
  description: ADMIN_SETTINGS_PAGE.description,
};

export default function AdminSettingsPage() {
  return (
    <AdminShell
      navItems={ADMIN_NAV}
      activeHref="/admin/settings"
      pageTitle={ADMIN_SETTINGS_PAGE.title}
      userName={ADMIN_USER.name}
      userInitials={ADMIN_USER.initials}
    >
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {ADMIN_SETTINGS_PAGE.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{ADMIN_SETTINGS_PAGE.description}</p>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <AdminAccountSettings />
        <AdminSettingsToggleList
          idPrefix="admin-notif"
          title={ADMIN_NOTIFICATION_SETTINGS_SECTION.title}
          description={ADMIN_NOTIFICATION_SETTINGS_SECTION.description}
          toggles={ADMIN_NOTIFICATION_TOGGLES}
          savedMessage={ADMIN_NOTIFICATION_SETTINGS_SECTION.savedMessage}
        />
        <AdminSecuritySettings />
        <AdminSettingsToggleList
          idPrefix="admin-platform"
          title={ADMIN_PLATFORM_SETTINGS_SECTION.title}
          description={ADMIN_PLATFORM_SETTINGS_SECTION.description}
          toggles={ADMIN_PLATFORM_TOGGLES}
          savedMessage={ADMIN_PLATFORM_SETTINGS_SECTION.savedMessage}
        />
        <AdminMaintenanceSettings />
        <AdminSettingsDangerZone />
      </div>
    </AdminShell>
  );
}
