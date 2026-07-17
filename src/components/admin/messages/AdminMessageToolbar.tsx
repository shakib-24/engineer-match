"use client";

import { AdminSearchInput } from "@/components/admin/shared/AdminSearchInput";
import { ADMIN_MESSAGE_SEARCH_LABELS } from "@/constants/admin-messages";

interface AdminMessageToolbarProps {
  value: string;
  onChange: (value: string) => void;
}

export function AdminMessageToolbar({ value, onChange }: AdminMessageToolbarProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
      <AdminSearchInput
        id="admin-message-search"
        label={ADMIN_MESSAGE_SEARCH_LABELS.label}
        value={value}
        onChange={onChange}
        placeholder={ADMIN_MESSAGE_SEARCH_LABELS.placeholder}
      />
    </div>
  );
}
