"use client";

import { useMemo, useState } from "react";
import { AdminReportSummaryCards } from "@/components/admin/reports/AdminReportSummaryCards";
import { AdminReportToolbar } from "@/components/admin/reports/AdminReportToolbar";
import { AdminReportFilters } from "@/components/admin/reports/AdminReportFilters";
import { AdminReportTable } from "@/components/admin/reports/AdminReportTable";
import { AdminReportMobileCards } from "@/components/admin/reports/AdminReportMobileCards";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";
import { AdminPagination } from "@/components/admin/shared/AdminPagination";
import {
  ADMIN_REPORT_RESULTS_META,
  DEFAULT_ADMIN_REPORT_FILTER_STATE,
  type AdminReport,
  type AdminReportFilterState,
} from "@/constants/admin-reports";

const PAGE_SIZE = 8;
const REFERENCE_NOW_MS = new Date("2026-07-17T12:00:00").getTime();

function daysSince(iso: string): number {
  return Math.floor((REFERENCE_NOW_MS - new Date(iso).getTime()) / (1000 * 60 * 60 * 24));
}

interface AdminReportListProps {
  initialReports: AdminReport[];
}

export function AdminReportList({ initialReports }: AdminReportListProps) {
  const [reports] = useState<AdminReport[]>(initialReports);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<AdminReportFilterState>(DEFAULT_ADMIN_REPORT_FILTER_STATE);
  const [currentPage, setCurrentPage] = useState(1);

  function handleFilterChange(patch: Partial<AdminReportFilterState>) {
    setFilters((prev) => ({ ...prev, ...patch }));
    setCurrentPage(1);
  }

  function handleResetAll() {
    setSearchQuery("");
    setFilters(DEFAULT_ADMIN_REPORT_FILTER_STATE);
    setCurrentPage(1);
  }

  const filteredReports = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return reports.filter((report) => {
      if (query) {
        const haystack = `${report.reporterName} ${report.targetLabel} ${report.id}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      if (filters.categories.length > 0 && !filters.categories.includes(report.category)) {
        return false;
      }
      if (filters.priorities.length > 0 && !filters.priorities.includes(report.priority)) {
        return false;
      }
      if (filters.statuses.length > 0 && !filters.statuses.includes(report.status)) {
        return false;
      }
      if (filters.targetTypes.length > 0 && !filters.targetTypes.includes(report.targetType)) {
        return false;
      }
      if (
        filters.reportedWithinDays !== null &&
        daysSince(report.reportedDateISO) > filters.reportedWithinDays
      ) {
        return false;
      }
      return true;
    });
  }, [reports, searchQuery, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredReports.length / PAGE_SIZE));
  const pagedReports = filteredReports.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-6">
      <AdminReportSummaryCards reports={reports} />
      <AdminReportToolbar
        value={searchQuery}
        onChange={(value) => {
          setSearchQuery(value);
          setCurrentPage(1);
        }}
      />
      <AdminReportFilters filters={filters} onChange={handleFilterChange} />

      <p className="text-sm text-muted-foreground">
        {filteredReports.length}
        {ADMIN_REPORT_RESULTS_META.resultsSuffix}
      </p>

      {filteredReports.length === 0 ? (
        <AdminEmptyState
          title="条件に一致する通報が見つかりませんでした。"
          description="検索キーワードや絞り込み条件を変更してお試しください。"
          action={{ label: "条件をリセット", onClick: handleResetAll }}
        />
      ) : (
        <>
          <AdminReportTable reports={pagedReports} />
          <AdminReportMobileCards reports={pagedReports} />
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
    </div>
  );
}
