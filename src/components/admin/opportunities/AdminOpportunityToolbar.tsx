"use client";

import { AdminSearchInput } from "@/components/admin/shared/AdminSearchInput";
import { ADMIN_OPPORTUNITY_SEARCH_LABELS } from "@/constants/admin-opportunities";

interface AdminOpportunityToolbarProps {
  value: string;
  onChange: (value: string) => void;
}

export function AdminOpportunityToolbar({ value, onChange }: AdminOpportunityToolbarProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
      <AdminSearchInput
        id="admin-opportunity-search"
        label={ADMIN_OPPORTUNITY_SEARCH_LABELS.label}
        value={value}
        onChange={onChange}
        placeholder={ADMIN_OPPORTUNITY_SEARCH_LABELS.placeholder}
      />
    </div>
  );
}
