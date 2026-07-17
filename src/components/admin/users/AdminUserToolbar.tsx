"use client";

import { AdminSearchInput } from "@/components/admin/shared/AdminSearchInput";
import { ADMIN_USER_SEARCH_LABELS } from "@/constants/admin-users";

interface AdminUserToolbarProps {
  value: string;
  onChange: (value: string) => void;
}

export function AdminUserToolbar({ value, onChange }: AdminUserToolbarProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
      <AdminSearchInput
        id="admin-user-search"
        label={ADMIN_USER_SEARCH_LABELS.label}
        value={value}
        onChange={onChange}
        placeholder={ADMIN_USER_SEARCH_LABELS.placeholder}
      />
    </div>
  );
}
