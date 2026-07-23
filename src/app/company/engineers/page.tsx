import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { EngineerList } from "@/components/company/engineers/EngineerList";
import { COMPANY_NAV, USER_MENU } from "@/constants/dashboard";
import { createClient } from "@/lib/supabase/server";
import { listSearchableEngineers } from "@/lib/company/engineers";

export const metadata: Metadata = {
  title: "エンジニア検索 | ENGINEER MATCH",
  description: "スキル・経験・希望条件から、自社に合うエンジニアを検索できます。",
};

export default async function CompanyEngineersPage() {
  const user = USER_MENU.company;
  const supabase = await createClient();
  const engineers = await listSearchableEngineers(supabase);

  return (
    <DashboardShell
      navItems={COMPANY_NAV}
      activeHref="/company/engineers"
      pageTitle="エンジニア検索"
      userName={user.name}
      userInitials={user.initials}
    >
      <EngineerList engineers={engineers} />
    </DashboardShell>
  );
}
