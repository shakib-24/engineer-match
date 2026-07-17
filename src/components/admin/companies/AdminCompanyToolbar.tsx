"use client";

import { AdminSearchInput } from "@/components/admin/shared/AdminSearchInput";
import { ADMIN_COMPANY_SEARCH_LABELS } from "@/constants/admin-companies";

interface AdminCompanyToolbarProps {
  value: string;
  onChange: (value: string) => void;
}

export function AdminCompanyToolbar({ value, onChange }: AdminCompanyToolbarProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
      <AdminSearchInput
        id="admin-company-search"
        label={ADMIN_COMPANY_SEARCH_LABELS.label}
        value={value}
        onChange={onChange}
        placeholder={ADMIN_COMPANY_SEARCH_LABELS.placeholder}
      />
    </div>
  );
}
