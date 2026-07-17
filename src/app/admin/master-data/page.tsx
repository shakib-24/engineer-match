import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { MasterDataList } from "@/components/admin/master-data/MasterDataList";
import { ADMIN_NAV, ADMIN_USER } from "@/constants/admin";
import { ADMIN_MASTER_DATA_PAGE } from "@/constants/admin-master-data";

export const metadata: Metadata = {
  title: `${ADMIN_MASTER_DATA_PAGE.title} | ENGINEER MATCH`,
  description: ADMIN_MASTER_DATA_PAGE.description,
};

export default function AdminMasterDataPage() {
  return (
    <AdminShell
      navItems={ADMIN_NAV}
      activeHref="/admin/master-data"
      pageTitle={ADMIN_MASTER_DATA_PAGE.title}
      userName={ADMIN_USER.name}
      userInitials={ADMIN_USER.initials}
    >
      <AdminPageHeader
        title={ADMIN_MASTER_DATA_PAGE.title}
        description={ADMIN_MASTER_DATA_PAGE.description}
      />
      <div className="mt-6">
        <MasterDataList />
      </div>
    </AdminShell>
  );
}
