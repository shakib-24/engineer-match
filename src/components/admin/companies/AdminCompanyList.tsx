"use client";

import { useMemo, useState } from "react";
import { AdminCompanySummaryCards } from "@/components/admin/companies/AdminCompanySummaryCards";
import { AdminCompanyToolbar } from "@/components/admin/companies/AdminCompanyToolbar";
import { AdminCompanyFilters } from "@/components/admin/companies/AdminCompanyFilters";
import { AdminCompanyTable } from "@/components/admin/companies/AdminCompanyTable";
import { AdminCompanyMobileCards } from "@/components/admin/companies/AdminCompanyMobileCards";
import {
  AdminCompanyStatusDialog,
  type AdminCompanyDialogMode,
} from "@/components/admin/companies/AdminCompanyStatusDialog";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";
import { AdminPagination } from "@/components/admin/shared/AdminPagination";
import {
  ADMIN_COMPANY_RESULTS_META,
  ADMIN_COMPANY_TOAST_MESSAGES,
  DEFAULT_ADMIN_COMPANY_FILTER_STATE,
  type AdminCompany,
  type AdminCompanyFilterState,
} from "@/constants/admin-companies";

const PAGE_SIZE = 8;
const REFERENCE_NOW_MS = new Date("2026-07-17T12:00:00").getTime();

function daysSince(iso: string): number {
  return Math.floor((REFERENCE_NOW_MS - new Date(iso).getTime()) / (1000 * 60 * 60 * 24));
}

interface AdminCompanyListProps {
  initialCompanies: AdminCompany[];
}

export function AdminCompanyList({ initialCompanies }: AdminCompanyListProps) {
  const [companies, setCompanies] = useState<AdminCompany[]>(initialCompanies);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<AdminCompanyFilterState>(
    DEFAULT_ADMIN_COMPANY_FILTER_STATE,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [dialog, setDialog] = useState<{
    mode: Exclude<AdminCompanyDialogMode, null>;
    companyId: string;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 3000);
  }

  function handleFilterChange(patch: Partial<AdminCompanyFilterState>) {
    setFilters((prev) => ({ ...prev, ...patch }));
    setCurrentPage(1);
  }

  function handleResetAll() {
    setSearchQuery("");
    setFilters(DEFAULT_ADMIN_COMPANY_FILTER_STATE);
    setCurrentPage(1);
  }

  function handleConfirmDialog(reason?: string) {
    if (!dialog) return;
    const { mode, companyId } = dialog;
    setCompanies((prev) =>
      prev.map((company) => {
        if (company.id !== companyId) return company;
        const historyEntry = {
          id: `rh-${company.reviewHistory.length + 1}-${company.id}`,
          action:
            mode === "approve"
              ? "承認"
              : mode === "return"
                ? "差し戻し"
                : mode === "reject"
                  ? "却下"
                  : mode === "suspend"
                    ? "利用停止"
                    : "利用再開",
          actor: "佐々木 玲奈（管理者）",
          reason: reason ?? null,
          dateLabel: "たった今",
        };
        if (mode === "approve") {
          return { ...company, reviewStatus: "承認済み", reviewHistory: [historyEntry, ...company.reviewHistory] };
        }
        if (mode === "return") {
          return { ...company, reviewStatus: "差し戻し", reviewHistory: [historyEntry, ...company.reviewHistory] };
        }
        if (mode === "reject") {
          return { ...company, reviewStatus: "却下", reviewHistory: [historyEntry, ...company.reviewHistory] };
        }
        if (mode === "suspend") {
          return { ...company, usageStatus: "利用停止中", reviewHistory: [historyEntry, ...company.reviewHistory] };
        }
        return { ...company, usageStatus: "有効", reviewHistory: [historyEntry, ...company.reviewHistory] };
      }),
    );
    showToast(ADMIN_COMPANY_TOAST_MESSAGES[
      mode === "approve"
        ? "approved"
        : mode === "return"
          ? "returned"
          : mode === "reject"
            ? "rejected"
            : mode === "suspend"
              ? "suspended"
              : "reinstated"
    ]);
    setDialog(null);
  }

  const filteredCompanies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return companies.filter((company) => {
      if (query) {
        const haystack = `${company.name} ${company.contactName} ${company.id}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      if (
        filters.reviewStatuses.length > 0 &&
        !filters.reviewStatuses.includes(company.reviewStatus)
      ) {
        return false;
      }
      if (
        filters.usageStatuses.length > 0 &&
        !filters.usageStatuses.includes(company.usageStatus)
      ) {
        return false;
      }
      if (filters.industries.length > 0 && !filters.industries.includes(company.industry)) {
        return false;
      }
      if (
        filters.companySizes.length > 0 &&
        !filters.companySizes.includes(company.companySize)
      ) {
        return false;
      }
      if (
        filters.registeredWithinDays !== null &&
        daysSince(company.registeredDateISO) > filters.registeredWithinDays
      ) {
        return false;
      }
      return true;
    });
  }, [companies, searchQuery, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredCompanies.length / PAGE_SIZE));
  const pagedCompanies = filteredCompanies.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="flex flex-col gap-6">
      <AdminCompanySummaryCards companies={companies} />
      <AdminCompanyToolbar
        value={searchQuery}
        onChange={(value) => {
          setSearchQuery(value);
          setCurrentPage(1);
        }}
      />
      <AdminCompanyFilters filters={filters} onChange={handleFilterChange} />

      <p className="text-sm text-muted-foreground">
        {filteredCompanies.length}
        {ADMIN_COMPANY_RESULTS_META.resultsSuffix}
      </p>

      {filteredCompanies.length === 0 ? (
        <AdminEmptyState
          title="条件に一致する企業が見つかりませんでした。"
          description="検索キーワードや絞り込み条件を変更してお試しください。"
          action={{ label: "条件をリセット", onClick: handleResetAll }}
        />
      ) : (
        <>
          <AdminCompanyTable
            companies={pagedCompanies}
            onAction={(id, mode) => setDialog({ mode, companyId: id })}
          />
          <AdminCompanyMobileCards
            companies={pagedCompanies}
            onAction={(id, mode) => setDialog({ mode, companyId: id })}
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

      <AdminCompanyStatusDialog
        mode={dialog?.mode ?? null}
        onCancel={() => setDialog(null)}
        onConfirm={handleConfirmDialog}
      />

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
