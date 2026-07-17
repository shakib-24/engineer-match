"use client";

import { useMemo, useState } from "react";
import { AdminMessageSummaryCards } from "@/components/admin/messages/AdminMessageSummaryCards";
import { AdminMessageToolbar } from "@/components/admin/messages/AdminMessageToolbar";
import { AdminMessageFilters } from "@/components/admin/messages/AdminMessageFilters";
import { AdminMessageTable } from "@/components/admin/messages/AdminMessageTable";
import { AdminMessageMobileCards } from "@/components/admin/messages/AdminMessageMobileCards";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";
import { AdminPagination } from "@/components/admin/shared/AdminPagination";
import {
  ADMIN_MESSAGE_RESULTS_META,
  DEFAULT_ADMIN_MESSAGE_FILTER_STATE,
  type AdminMessageFilterState,
  type AdminMessageModeration,
} from "@/constants/admin-messages";
import type { Conversation } from "@/constants/messages";

const PAGE_SIZE = 8;
const REFERENCE_NOW_MS = new Date("2026-07-17T12:00:00").getTime();

function daysSince(iso: string): number {
  return Math.floor((REFERENCE_NOW_MS - new Date(iso).getTime()) / (1000 * 60 * 60 * 24));
}

interface AdminMessageListProps {
  moderations: AdminMessageModeration[];
  conversations: Conversation[];
}

export function AdminMessageList({ moderations, conversations }: AdminMessageListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<AdminMessageFilterState>(
    DEFAULT_ADMIN_MESSAGE_FILTER_STATE,
  );
  const [currentPage, setCurrentPage] = useState(1);

  const rows = useMemo(() => {
    return moderations
      .map((moderation) => {
        const conversation = conversations.find((c) => c.id === moderation.conversationId);
        return conversation ? { moderation, conversation } : null;
      })
      .filter((row): row is { moderation: AdminMessageModeration; conversation: Conversation } =>
        row !== null,
      );
  }, [moderations, conversations]);

  function handleFilterChange(patch: Partial<AdminMessageFilterState>) {
    setFilters((prev) => ({ ...prev, ...patch }));
    setCurrentPage(1);
  }

  function handleResetAll() {
    setSearchQuery("");
    setFilters(DEFAULT_ADMIN_MESSAGE_FILTER_STATE);
    setCurrentPage(1);
  }

  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return rows.filter(({ moderation, conversation }) => {
      if (query) {
        const haystack =
          `${conversation.participantName} ${conversation.participantCompany} ${conversation.id} ${conversation.lastMessage}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      if (filters.reportStatuses.length > 0) {
        const value = moderation.reportCount > 0 ? "あり" : "なし";
        if (!filters.reportStatuses.includes(value)) return false;
      }
      if (
        filters.handlingStatuses.length > 0 &&
        !filters.handlingStatuses.includes(moderation.handlingStatus)
      ) {
        return false;
      }
      if (
        filters.conversationTypes.length > 0 &&
        !filters.conversationTypes.includes(conversation.status)
      ) {
        return false;
      }
      if (
        filters.updatedWithinDays !== null &&
        daysSince(conversation.lastUpdatedISO) > filters.updatedWithinDays
      ) {
        return false;
      }
      return true;
    });
  }, [rows, searchQuery, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const pagedRows = filteredRows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-6">
      <AdminMessageSummaryCards moderations={moderations} conversations={conversations} />
      <AdminMessageToolbar
        value={searchQuery}
        onChange={(value) => {
          setSearchQuery(value);
          setCurrentPage(1);
        }}
      />
      <AdminMessageFilters filters={filters} onChange={handleFilterChange} />

      <p className="text-sm text-muted-foreground">
        {filteredRows.length}
        {ADMIN_MESSAGE_RESULTS_META.resultsSuffix}
      </p>

      {filteredRows.length === 0 ? (
        <AdminEmptyState
          title="条件に一致する会話が見つかりませんでした。"
          description="検索キーワードや絞り込み条件を変更してお試しください。"
          action={{ label: "条件をリセット", onClick: handleResetAll }}
        />
      ) : (
        <>
          <AdminMessageTable rows={pagedRows} />
          <AdminMessageMobileCards rows={pagedRows} />
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
