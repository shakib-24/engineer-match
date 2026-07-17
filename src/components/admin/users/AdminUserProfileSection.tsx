import {
  AdminDetailField,
  AdminDetailGrid,
  AdminDetailSection,
} from "@/components/admin/shared/AdminDetailSection";
import { ADMIN_USER_DETAIL_SECTIONS, type AdminUser } from "@/constants/admin-users";

interface AdminUserProfileSectionProps {
  user: AdminUser;
}

export function AdminUserProfileSection({ user }: AdminUserProfileSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <AdminDetailSection title={ADMIN_USER_DETAIL_SECTIONS.basicInfo}>
        <AdminDetailGrid>
          <AdminDetailField label="氏名" value={user.name} />
          <AdminDetailField label="メールアドレス" value={user.email} />
          <AdminDetailField label="電話番号" value={user.phone} />
          <AdminDetailField label="居住地" value={user.location} />
          <AdminDetailField label="ユーザーID" value={user.id} />
          <AdminDetailField label="所属企業" value={user.companyName ?? "—"} />
        </AdminDetailGrid>
      </AdminDetailSection>

      <AdminDetailSection title={ADMIN_USER_DETAIL_SECTIONS.profileInfo}>
        <AdminDetailGrid>
          <AdminDetailField label="役職・職種" value={user.jobTitle ?? "—"} />
          <AdminDetailField
            label="プロフィール充足度"
            value={`${user.profileCompletionPercent}%`}
          />
        </AdminDetailGrid>
        <p className="mt-4 text-sm text-foreground">{user.bio}</p>
      </AdminDetailSection>

      <AdminDetailSection title={ADMIN_USER_DETAIL_SECTIONS.registrationStatus}>
        <AdminDetailGrid>
          <AdminDetailField label="登録日" value={user.registeredDateLabel} />
          <AdminDetailField label="登録経路" value={user.registrationSource} />
          <AdminDetailField label="最終ログイン" value={user.lastLoginLabel} />
          <AdminDetailField label="本人確認状態" value={user.verificationStatus} />
        </AdminDetailGrid>
      </AdminDetailSection>
    </div>
  );
}
