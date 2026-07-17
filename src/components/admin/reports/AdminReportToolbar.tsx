"use client";

import { AdminSearchInput } from "@/components/admin/shared/AdminSearchInput";
import { ADMIN_REPORT_SEARCH_LABELS } from "@/constants/admin-reports";

interface AdminReportToolbarProps {
  value: string;
  onChange: (value: string) => void;
}

export function AdminReportToolbar({ value, onChange }: AdminReportToolbarProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
      <AdminSearchInput
        id="admin-report-search"
        label={ADMIN_REPORT_SEARCH_LABELS.label}
        value={value}
        onChange={onChange}
        placeholder={ADMIN_REPORT_SEARCH_LABELS.placeholder}
      />
    </div>
  );
}
