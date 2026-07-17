"use client";

import { useMemo, useState } from "react";
import { AdminApplicationSummaryCards } from "@/components/admin/applications/AdminApplicationSummaryCards";
import { AdminApplicationToolbar } from "@/components/admin/applications/AdminApplicationToolbar";
import { AdminApplicationFilters } from "@/components/admin/applications/AdminApplicationFilters";
import { AdminApplicationTable } from "@/components/admin/applications/AdminApplicationTable";
import { AdminApplicationMobileCards } from "@/components/admin/applications/AdminApplicationMobileCards";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";
import { AdminPagination } from "@/components/admin/shared/AdminPagination";
import {
  ADMIN_APPLICATION_RESULTS_META,
  ADMIN_APPLICATION_TOAST_MESSAGES,
  DEFAULT_ADMIN_APPLICATION_FILTER_STATE,
  type AdminApplication,
  type AdminApplicationFilterState,
} from "@/constants/admin-applications";

const PAGE_SIZE = 8;
const REFERENCE_NOW_MS = new Date("2026-07-17T12:00:00").getTime();

function daysSince(iso: string): number {
  return Math.floor((REFERENCE_NOW_MS - new Date(iso).getTime()) / (1000 * 60 * 60 * 24));
}

interface AdminApplicationListProps {
  initialApplications: AdminApplication[];
}

export function AdminApplicationList({ initialApplications }: AdminApplicationListProps) {
  const [applications, setApplications] = useState<AdminApplication[]>(initialApplications);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<AdminApplicationFilterState>(
    DEFAULT_ADMIN_APPLICATION_FILTER_STATE,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const companyOptions = useMemo(
    () => Array.from(new Set(initialApplications.map((app) => app.company))),
    [initialApplications],
  );

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 3000);
  }

  function handleFilterChange(patch: Partial<AdminApplicationFilterState>) {
    setFilters((prev) => ({ ...prev, ...patch }));
    setCurrentPage(1);
  }

  function handleResetAll() {
    setSearchQuery("");
    setFilters(DEFAULT_ADMIN_APPLICATION_FILTER_STATE);
    setCurrentPage(1);
  }

  function handleToggleHandled(id: string) {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, handled: !app.handled } : app)),
    );
    const target = applications.find((app) => app.id === id);
    showToast(
      target?.handled
        ? ADMIN_APPLICATION_TOAST_MESSAGES.unhandled
        : ADMIN_APPLICATION_TOAST_MESSAGES.handled,
    );
  }

  const filteredApplications = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return applications.filter((app) => {
      if (query) {
        const haystack =
          `${app.applicantName} ${app.company} ${app.jobTitle} ${app.id}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      if (filters.statuses.length > 0 && !filters.statuses.includes(app.status)) return false;
      if (
        filters.serviceCategories.length > 0 &&
        !filters.serviceCategories.includes(app.serviceCategory)
      ) {
        return false;
      }
      if (filters.companies.length > 0 && !filters.companies.includes(app.company)) return false;
      if (filters.problemReported.length > 0) {
        const value = app.hasProblemReport ? "あり" : "なし";
        if (!filters.problemReported.includes(value)) return false;
      }
      if (
        filters.appliedWithinDays !== null &&
        daysSince(app.appliedDateISO) > filters.appliedWithinDays
      ) {
        return false;
      }
      return true;
    });
  }, [applications, searchQuery, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredApplications.length / PAGE_SIZE));
  const pagedApplications = filteredApplications.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="flex flex-col gap-6">
      <AdminApplicationSummaryCards applications={applications} />
      <AdminApplicationToolbar
        value={searchQuery}
        onChange={(value) => {
          setSearchQuery(value);
          setCurrentPage(1);
        }}
      />
      <AdminApplicationFilters
        filters={filters}
        onChange={handleFilterChange}
        companyOptions={companyOptions}
      />

      <p className="text-sm text-muted-foreground">
        {filteredApplications.length}
        {ADMIN_APPLICATION_RESULTS_META.resultsSuffix}
      </p>

      {filteredApplications.length === 0 ? (
        <AdminEmptyState
          title="条件に一致する応募が見つかりませんでした。"
          description="検索キーワードや絞り込み条件を変更してお試しください。"
          action={{ label: "条件をリセット", onClick: handleResetAll }}
        />
      ) : (
        <>
          <AdminApplicationTable
            applications={pagedApplications}
            onToggleHandled={handleToggleHandled}
          />
          <AdminApplicationMobileCards
            applications={pagedApplications}
            onToggleHandled={handleToggleHandled}
          />
          <AdminPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            previousLabel="前へ"
            nextLabel="次へ"
            pageLabelPrefix="ページ"
          />
        </>
      )}

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 sm:justify-end sm:pr-6"
        >
          <div className="flex items-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-white shadow-lg">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}
