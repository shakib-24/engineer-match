import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ProfileEditForm } from "@/components/engineer/profile/ProfileEditForm";
import { ENGINEER_NAV, USER_MENU } from "@/constants/dashboard";
import { PROFILE_EDIT_META } from "@/constants/engineer-profile";

export const metadata: Metadata = {
  title: "プロフィール編集 | ENGINEER MATCH",
  description: "エンジニアのプロフィール編集ページです。",
};

export default function EngineerProfileEditPage() {
  const user = USER_MENU.engineer;

  return (
    <DashboardShell
      navItems={ENGINEER_NAV}
      activeHref="/engineer/profile"
      pageTitle={PROFILE_EDIT_META.pageTitle}
      userName={user.name}
      userInitials={user.initials}
    >
      <div>
        <Link
          href={PROFILE_EDIT_META.cancelHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {PROFILE_EDIT_META.backLabel}
        </Link>
      </div>

      <ProfileEditForm />
    </DashboardShell>
  );
}
