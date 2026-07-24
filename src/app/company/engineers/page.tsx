import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { EngineerList } from "@/components/company/engineers/EngineerList";
import { COMPANY_NAV } from "@/constants/dashboard";
import { createClient } from "@/lib/supabase/server";
import { listSearchableEngineers } from "@/lib/company/engineers";
import { getCompanyHeaderIdentity } from "@/lib/company/profile";

export const metadata: Metadata = {
  title: "エンジニア検索 | ENGINEER MATCH",
  description: "スキル・経験・希望条件から、自社に合うエンジニアを検索できます。",
};

export default async function CompanyEngineersPage() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();
  const [engineers, identity] = await Promise.all([
    listSearchableEngineers(supabase),
    getCompanyHeaderIdentity(supabase, authUser),
  ]);

  return (
    <DashboardShell
      navItems={COMPANY_NAV}
      activeHref="/company/engineers"
      pageTitle="エンジニア検索"
      userName={identity.name}
      userInitials={identity.initials}
      userEmail={identity.email}
    >
      <EngineerList engineers={engineers} />
    </DashboardShell>
  );
}
