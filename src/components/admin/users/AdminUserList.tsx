"use client";

import { useMemo, useState } from "react";
import { AdminUserSummaryCards } from "@/components/admin/users/AdminUserSummaryCards";
import { AdminUserToolbar } from "@/components/admin/users/AdminUserToolbar";
import { AdminUserFilters } from "@/components/admin/users/AdminUserFilters";
import { AdminUserTable } from "@/components/admin/users/AdminUserTable";
import { AdminUserMobileCards } from "@/components/admin/users/AdminUserMobileCards";
import { AdminUserStatusDialog } from "@/components/admin/users/AdminUserStatusDialog";
import { AdminUserDeleteDialog } from "@/components/admin/users/AdminUserDeleteDialog";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";
import { AdminPagination } from "@/components/admin/shared/AdminPagination";
import {
  ADMIN_USER_DEMO_NOTE,
  ADMIN_USER_RESULTS_META,
  ADMIN_USER_TOAST_MESSAGES,
  DEFAULT_ADMIN_USER_FILTER_STATE,
  type AdminUser,
  type AdminUserFilterState,
} from "@/constants/admin-users";

const PAGE_SIZE = 8;
const REFERENCE_NOW_MS = new Date("2026-07-17T12:00:00").getTime();

function daysSince(iso: string): number {
  return Math.floor((REFERENCE_NOW_MS - new Date(iso).getTime()) / (1000 * 60 * 60 * 24));
}

interface AdminUserListProps {
  initialUsers: AdminUser[];
}

type DialogState =
  | { type: "suspend"; userId: string }
  | { type: "reinstate"; userId: string }
  | { type: "delete"; userId: string }
  | null;

export function AdminUserList({ initialUsers }: AdminUserListProps) {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<AdminUserFilterState>(DEFAULT_ADMIN_USER_FILTER_STATE);
  const [currentPage, setCurrentPage] = useState(1);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 3000);
  }

  function handleFilterChange(patch: Partial<AdminUserFilterState>) {
    setFilters((prev) => ({ ...prev, ...patch }));
    setCurrentPage(1);
  }

  function handleResetAll() {
    setSearchQuery("");
    setFilters(DEFAULT_ADMIN_USER_FILTER_STATE);
    setCurrentPage(1);
  }

  function handleEdit() {
    showToast(ADMIN_USER_DEMO_NOTE);
  }

  function closeDialog() {
    setDialog(null);
  }

  function confirmDialog() {
    if (!dialog) return;
    if (dialog.type === "suspend") {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === dialog.userId ? { ...user, accountStatus: "利用停止中" } : user,
        ),
      );
      showToast(ADMIN_USER_TOAST_MESSAGES.suspended);
    } else if (dialog.type === "reinstate") {
      setUsers((prev) =>
        prev.map((user) => (user.id === dialog.userId ? { ...user, accountStatus: "有効" } : user)),
      );
      showToast(ADMIN_USER_TOAST_MESSAGES.reinstated);
    } else if (dialog.type === "delete") {
      setUsers((prev) => prev.filter((user) => user.id !== dialog.userId));
      showToast(ADMIN_USER_TOAST_MESSAGES.deleted);
    }
    setDialog(null);
  }

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return users.filter((user) => {
      if (query) {
        const haystack = `${user.name} ${user.email} ${user.id} ${user.companyName ?? ""}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      if (filters.roles.length > 0 && !filters.roles.includes(user.role)) return false;
      if (
        filters.accountStatuses.length > 0 &&
        !filters.accountStatuses.includes(user.accountStatus)
      ) {
        return false;
      }
      if (
        filters.verificationStatuses.length > 0 &&
        !filters.verificationStatuses.includes(user.verificationStatus)
      ) {
        return false;
      }
      if (
        filters.registeredWithinDays !== null &&
        daysSince(user.registeredDateISO) > filters.registeredWithinDays
      ) {
        return false;
      }
      if (
        filters.lastLoginWithinDays !== null &&
        daysSince(user.lastLoginISO) > filters.lastLoginWithinDays
      ) {
        return false;
      }
      return true;
    });
  }, [users, searchQuery, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const pagedUsers = filteredUsers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-6">
      <AdminUserSummaryCards users={users} />
      <AdminUserToolbar
        value={searchQuery}
        onChange={(value) => {
          setSearchQuery(value);
          setCurrentPage(1);
        }}
      />
      <AdminUserFilters filters={filters} onChange={handleFilterChange} />

      <p className="text-sm text-muted-foreground">
        {filteredUsers.length}
        {ADMIN_USER_RESULTS_META.resultsSuffix}
      </p>

      {filteredUsers.length === 0 ? (
        <AdminEmptyState
          title="条件に一致するユーザーが見つかりませんでした。"
          description="検索キーワードや絞り込み条件を変更してお試しください。"
          action={{ label: "条件をリセット", onClick: handleResetAll }}
        />
      ) : (
        <>
          <AdminUserTable
            users={pagedUsers}
            onEdit={handleEdit}
            onSuspend={(id) => setDialog({ type: "suspend", userId: id })}
            onReinstate={(id) => setDialog({ type: "reinstate", userId: id })}
            onDelete={(id) => setDialog({ type: "delete", userId: id })}
          />
          <AdminUserMobileCards
            users={pagedUsers}
            onEdit={handleEdit}
            onSuspend={(id) => setDialog({ type: "suspend", userId: id })}
            onReinstate={(id) => setDialog({ type: "reinstate", userId: id })}
            onDelete={(id) => setDialog({ type: "delete", userId: id })}
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

      <AdminUserStatusDialog
        mode={
          dialog?.type === "suspend" ? "suspend" : dialog?.type === "reinstate" ? "reinstate" : null
        }
        onCancel={closeDialog}
        onConfirm={confirmDialog}
      />
      <AdminUserDeleteDialog
        isOpen={dialog?.type === "delete"}
        onCancel={closeDialog}
        onConfirm={confirmDialog}
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
