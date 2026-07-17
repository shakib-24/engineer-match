"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { MasterDataTabs } from "@/components/admin/master-data/MasterDataTabs";
import { MasterDataTable } from "@/components/admin/master-data/MasterDataTable";
import { MasterDataMobileCards } from "@/components/admin/master-data/MasterDataMobileCards";
import {
  MasterDataFormDialog,
  type MasterDataFormValues,
} from "@/components/admin/master-data/MasterDataFormDialog";
import { MasterDataDeleteDialog } from "@/components/admin/master-data/MasterDataDeleteDialog";
import { MasterDataImportPanel } from "@/components/admin/master-data/MasterDataImportPanel";
import { AdminSearchInput } from "@/components/admin/shared/AdminSearchInput";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";
import {
  MASTER_DATA_ITEMS,
  MASTER_DATA_LABELS,
  MASTER_DATA_TOAST_MESSAGES,
  type MasterDataCategoryKey,
  type MasterDataItem,
} from "@/constants/admin-master-data";

type ItemsState = Record<MasterDataCategoryKey, MasterDataItem[]>;

function sortByOrder(items: MasterDataItem[]): MasterDataItem[] {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function MasterDataList() {
  const [activeCategory, setActiveCategory] = useState<MasterDataCategoryKey>("スキル");
  const [itemsState, setItemsState] = useState<ItemsState>(MASTER_DATA_ITEMS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeOnly, setActiveOnly] = useState(false);
  const [formDialog, setFormDialog] = useState<{ mode: "add" | "edit"; item?: MasterDataItem } | null>(
    null,
  );
  const [deleteItem, setDeleteItem] = useState<MasterDataItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 3000);
  }

  const categoryItems = sortByOrder(itemsState[activeCategory]);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return categoryItems.filter((item) => {
      if (activeOnly && !item.active) return false;
      if (!query) return true;
      const haystack = `${item.displayName} ${item.internalCode}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [categoryItems, searchQuery, activeOnly]);

  function updateCategoryItems(updater: (items: MasterDataItem[]) => MasterDataItem[]) {
    setItemsState((prev) => ({
      ...prev,
      [activeCategory]: updater(prev[activeCategory]),
    }));
  }

  function handleSaveForm(values: MasterDataFormValues) {
    if (formDialog?.mode === "edit" && formDialog.item) {
      const targetId = formDialog.item.id;
      updateCategoryItems((items) =>
        items.map((item) => (item.id === targetId ? { ...item, ...values } : item)),
      );
      showToast(MASTER_DATA_TOAST_MESSAGES.updated);
    } else {
      updateCategoryItems((items) => {
        const maxOrder = items.reduce((max, item) => Math.max(max, item.sortOrder), 0);
        const newItem: MasterDataItem = {
          id: `${activeCategory}-${Date.now()}`,
          displayName: values.displayName,
          internalCode: values.internalCode,
          category: values.category,
          description: values.description,
          active: values.active,
          sortOrder: maxOrder + 1,
          usageCount: 0,
        };
        return [...items, newItem];
      });
      showToast(MASTER_DATA_TOAST_MESSAGES.added);
    }
    setFormDialog(null);
  }

  function handleConfirmDelete() {
    if (!deleteItem) return;
    const targetId = deleteItem.id;
    updateCategoryItems((items) => items.filter((item) => item.id !== targetId));
    showToast(MASTER_DATA_TOAST_MESSAGES.deleted);
    setDeleteItem(null);
  }

  function handleToggleActive(item: MasterDataItem) {
    updateCategoryItems((items) =>
      items.map((entry) => (entry.id === item.id ? { ...entry, active: !entry.active } : entry)),
    );
    showToast(item.active ? MASTER_DATA_TOAST_MESSAGES.disabled : MASTER_DATA_TOAST_MESSAGES.enabled);
  }

  function handleMove(item: MasterDataItem, direction: "up" | "down") {
    updateCategoryItems((items) => {
      const sorted = sortByOrder(items);
      const index = sorted.findIndex((entry) => entry.id === item.id);
      const swapIndex = direction === "up" ? index - 1 : index + 1;
      if (index === -1 || swapIndex < 0 || swapIndex >= sorted.length) return items;
      const currentOrder = sorted[index].sortOrder;
      const swapOrder = sorted[swapIndex].sortOrder;
      return items.map((entry) => {
        if (entry.id === sorted[index].id) return { ...entry, sortOrder: swapOrder };
        if (entry.id === sorted[swapIndex].id) return { ...entry, sortOrder: currentOrder };
        return entry;
      });
    });
    showToast(MASTER_DATA_TOAST_MESSAGES.reordered);
  }

  function handleResetFilters() {
    setSearchQuery("");
    setActiveOnly(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <MasterDataTabs
        active={activeCategory}
        onChange={(category) => {
          setActiveCategory(category);
          setSearchQuery("");
          setActiveOnly(false);
        }}
      />

      <div id="master-data-panel" role="tabpanel" aria-labelledby={`master-data-tab-${activeCategory}`}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-1 flex-wrap items-center gap-3">
              <AdminSearchInput
                id="master-data-search"
                label={MASTER_DATA_LABELS.searchLabel}
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={MASTER_DATA_LABELS.searchPlaceholder}
              />
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={activeOnly}
                  onChange={(event) => setActiveOnly(event.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-primary"
                />
                {MASTER_DATA_LABELS.activeOnlyLabel}
              </label>
            </div>
            <button
              type="button"
              onClick={() => setFormDialog({ mode: "add" })}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              {MASTER_DATA_LABELS.addLabel}
            </button>
          </div>

          <p className="text-sm text-muted-foreground">
            {filteredItems.length}
            {MASTER_DATA_LABELS.resultsSuffix}
          </p>

          {filteredItems.length === 0 ? (
            <AdminEmptyState
              title="条件に一致するマスタデータが見つかりませんでした。"
              description="検索キーワードや絞り込み条件を変更してお試しください。"
              action={{ label: "条件をリセット", onClick: handleResetFilters }}
            />
          ) : (
            <>
              <MasterDataTable
                items={filteredItems}
                onEdit={(item) => setFormDialog({ mode: "edit", item })}
                onDelete={setDeleteItem}
                onToggleActive={handleToggleActive}
                onMoveUp={(item) => handleMove(item, "up")}
                onMoveDown={(item) => handleMove(item, "down")}
              />
              <MasterDataMobileCards
                items={filteredItems}
                onEdit={(item) => setFormDialog({ mode: "edit", item })}
                onDelete={setDeleteItem}
                onToggleActive={handleToggleActive}
                onMoveUp={(item) => handleMove(item, "up")}
                onMoveDown={(item) => handleMove(item, "down")}
              />
            </>
          )}

          <MasterDataImportPanel
            onImportClick={() => showToast("CSVインポートはUIデモのため実行されません。")}
            onExportClick={() => showToast("CSVエクスポートはUIデモのため実行されません。")}
          />
        </div>
      </div>

      <MasterDataFormDialog
        mode={formDialog?.mode ?? null}
        initial={formDialog?.item}
        onCancel={() => setFormDialog(null)}
        onSave={handleSaveForm}
      />

      <MasterDataDeleteDialog
        item={deleteItem}
        onCancel={() => setDeleteItem(null)}
        onConfirm={handleConfirmDelete}
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
