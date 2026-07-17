"use client";

import { useMemo, useState } from "react";
import { AdminOpportunitySummaryCards } from "@/components/admin/opportunities/AdminOpportunitySummaryCards";
import { AdminOpportunityToolbar } from "@/components/admin/opportunities/AdminOpportunityToolbar";
import { AdminOpportunityFilters } from "@/components/admin/opportunities/AdminOpportunityFilters";
import { AdminOpportunityTable } from "@/components/admin/opportunities/AdminOpportunityTable";
import { AdminOpportunityMobileCards } from "@/components/admin/opportunities/AdminOpportunityMobileCards";
import {
  AdminOpportunityStatusDialog,
  type AdminOpportunityDialogMode,
} from "@/components/admin/opportunities/AdminOpportunityStatusDialog";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";
import { AdminPagination } from "@/components/admin/shared/AdminPagination";
import {
  ADMIN_OPPORTUNITY_RESULTS_META,
  ADMIN_OPPORTUNITY_TOAST_MESSAGES,
  DEFAULT_ADMIN_OPPORTUNITY_FILTER_STATE,
  type AdminOpportunity,
  type AdminOpportunityFilterState,
} from "@/constants/admin-opportunities";

const PAGE_SIZE = 8;
const REFERENCE_NOW_MS = new Date("2026-07-17T12:00:00").getTime();

function daysSince(iso: string): number {
  return Math.floor((REFERENCE_NOW_MS - new Date(iso).getTime()) / (1000 * 60 * 60 * 24));
}

interface AdminOpportunityListProps {
  initialOpportunities: AdminOpportunity[];
}

export function AdminOpportunityList({ initialOpportunities }: AdminOpportunityListProps) {
  const [opportunities, setOpportunities] = useState<AdminOpportunity[]>(initialOpportunities);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<AdminOpportunityFilterState>(
    DEFAULT_ADMIN_OPPORTUNITY_FILTER_STATE,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [dialog, setDialog] = useState<{
    mode: Exclude<AdminOpportunityDialogMode, null>;
    opportunityId: string;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 3000);
  }

  function handleFilterChange(patch: Partial<AdminOpportunityFilterState>) {
    setFilters((prev) => ({ ...prev, ...patch }));
    setCurrentPage(1);
  }

  function handleResetAll() {
    setSearchQuery("");
    setFilters(DEFAULT_ADMIN_OPPORTUNITY_FILTER_STATE);
    setCurrentPage(1);
  }

  function handleConfirmDialog(reason?: string) {
    if (!dialog) return;
    const { mode, opportunityId } = dialog;

    if (mode === "delete") {
      setOpportunities((prev) => prev.filter((opp) => opp.id !== opportunityId));
      showToast(ADMIN_OPPORTUNITY_TOAST_MESSAGES.deleted);
      setDialog(null);
      return;
    }

    setOpportunities((prev) =>
      prev.map((opp) => {
        if (opp.id !== opportunityId) return opp;
        const historyEntry = {
          id: `ph-${opp.publicationHistory.length + 1}-${opp.id}`,
          action:
            mode === "publish"
              ? "公開承認"
              : mode === "unpublish"
                ? "非公開化"
                : mode === "suspend"
                  ? "掲載停止"
                  : "編集依頼",
          actor: "佐々木 玲奈（管理者）",
          reason: reason ?? null,
          dateLabel: "たった今",
        };
        if (mode === "publish") {
          return {
            ...opp,
            publicationStatus: "公開中",
            publicationHistory: [historyEntry, ...opp.publicationHistory],
          };
        }
        if (mode === "unpublish" || mode === "suspend") {
          return {
            ...opp,
            publicationStatus: "非公開",
            publicationHistory: [historyEntry, ...opp.publicationHistory],
          };
        }
        return { ...opp, publicationHistory: [historyEntry, ...opp.publicationHistory] };
      }),
    );
    showToast(
      ADMIN_OPPORTUNITY_TOAST_MESSAGES[
        mode === "publish"
          ? "published"
          : mode === "unpublish"
            ? "unpublished"
            : mode === "suspend"
              ? "suspended"
              : "editRequested"
      ],
    );
    setDialog(null);
  }

  const filteredOpportunities = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return opportunities.filter((opp) => {
      if (query) {
        const haystack =
          `${opp.title} ${opp.company} ${opp.requiredSkills.join(" ")} ${opp.id}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      if (
        filters.serviceCategories.length > 0 &&
        !filters.serviceCategories.includes(opp.serviceCategory)
      ) {
        return false;
      }
      if (
        filters.contractTypes.length > 0 &&
        !filters.contractTypes.includes(opp.contractType)
      ) {
        return false;
      }
      if (
        filters.publicationStatuses.length > 0 &&
        !filters.publicationStatuses.includes(opp.publicationStatus)
      ) {
        return false;
      }
      if (
        filters.recruitmentStatuses.length > 0 &&
        !filters.recruitmentStatuses.includes(opp.recruitmentStatus)
      ) {
        return false;
      }
      if (filters.workStyles.length > 0 && !filters.workStyles.includes(opp.workStyle)) {
        return false;
      }
      if (
        filters.postedWithinDays !== null &&
        daysSince(opp.postedDateISO) > filters.postedWithinDays
      ) {
        return false;
      }
      return true;
    });
  }, [opportunities, searchQuery, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredOpportunities.length / PAGE_SIZE));
  const pagedOpportunities = filteredOpportunities.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="flex flex-col gap-6">
      <AdminOpportunitySummaryCards opportunities={opportunities} />
      <AdminOpportunityToolbar
        value={searchQuery}
        onChange={(value) => {
          setSearchQuery(value);
          setCurrentPage(1);
        }}
      />
      <AdminOpportunityFilters filters={filters} onChange={handleFilterChange} />

      <p className="text-sm text-muted-foreground">
        {filteredOpportunities.length}
        {ADMIN_OPPORTUNITY_RESULTS_META.resultsSuffix}
      </p>

      {filteredOpportunities.length === 0 ? (
        <AdminEmptyState
          title="条件に一致する求人・案件が見つかりませんでした。"
          description="検索キーワードや絞り込み条件を変更してお試しください。"
          action={{ label: "条件をリセット", onClick: handleResetAll }}
        />
      ) : (
        <>
          <AdminOpportunityTable
            opportunities={pagedOpportunities}
            onAction={(id, mode) => setDialog({ mode, opportunityId: id })}
          />
          <AdminOpportunityMobileCards
            opportunities={pagedOpportunities}
            onAction={(id, mode) => setDialog({ mode, opportunityId: id })}
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

      <AdminOpportunityStatusDialog
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
