"use client";

import { AdminSearchInput } from "@/components/admin/shared/AdminSearchInput";
import { ADMIN_APPLICATION_SEARCH_LABELS } from "@/constants/admin-applications";

interface AdminApplicationToolbarProps {
  value: string;
  onChange: (value: string) => void;
}

export function AdminApplicationToolbar({ value, onChange }: AdminApplicationToolbarProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
      <AdminSearchInput
        id="admin-application-search"
        label={ADMIN_APPLICATION_SEARCH_LABELS.label}
        value={value}
        onChange={onChange}
        placeholder={ADMIN_APPLICATION_SEARCH_LABELS.placeholder}
      />
    </div>
  );
}
