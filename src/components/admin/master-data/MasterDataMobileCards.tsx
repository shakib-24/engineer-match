import { ArrowDown, ArrowUp, Pencil, Power, Trash2 } from "lucide-react";
import { AdminMobileCardList } from "@/components/admin/shared/AdminMobileCardList";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import { MASTER_DATA_LABELS, type MasterDataItem } from "@/constants/admin-master-data";

interface MasterDataMobileCardsProps {
  items: MasterDataItem[];
  onEdit: (item: MasterDataItem) => void;
  onDelete: (item: MasterDataItem) => void;
  onToggleActive: (item: MasterDataItem) => void;
  onMoveUp: (item: MasterDataItem) => void;
  onMoveDown: (item: MasterDataItem) => void;
}

export function MasterDataMobileCards({
  items,
  onEdit,
  onDelete,
  onToggleActive,
  onMoveUp,
  onMoveDown,
}: MasterDataMobileCardsProps) {
  return (
    <AdminMobileCardList>
      {items.map((item, index) => (
        <div key={item.id} className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-semibold text-foreground">{item.displayName}</p>
              <p className="text-xs text-muted-foreground">{item.internalCode}</p>
            </div>
            <AdminStatusBadge
              label={item.active ? "有効" : "無効"}
              tone={item.active ? "positive" : "neutral"}
            />
          </div>
          {item.category && <p className="mt-2 text-xs text-muted-foreground">カテゴリ：{item.category}</p>}
          {item.description && <p className="mt-1 text-sm text-foreground">{item.description}</p>}
          <p className="mt-2 text-xs text-muted-foreground">利用件数：{item.usageCount}</p>

          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-3">
            <button
              type="button"
              onClick={() => onMoveUp(item)}
              disabled={index === 0}
              className="inline-flex h-8 items-center gap-1 rounded-lg border border-border px-2.5 text-xs font-semibold text-foreground transition-colors duration-200 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              {MASTER_DATA_LABELS.moveUpLabel}
            </button>
            <button
              type="button"
              onClick={() => onMoveDown(item)}
              disabled={index === items.length - 1}
              className="inline-flex h-8 items-center gap-1 rounded-lg border border-border px-2.5 text-xs font-semibold text-foreground transition-colors duration-200 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
              {MASTER_DATA_LABELS.moveDownLabel}
            </button>
            <button
              type="button"
              onClick={() => onEdit(item)}
              className="inline-flex h-8 items-center gap-1 rounded-lg border border-border px-2.5 text-xs font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
              {MASTER_DATA_LABELS.editLabel}
            </button>
            <button
              type="button"
              onClick={() => onToggleActive(item)}
              className="inline-flex h-8 items-center gap-1 rounded-lg border border-border px-2.5 text-xs font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <Power className="h-3.5 w-3.5" aria-hidden="true" />
              {item.active ? MASTER_DATA_LABELS.disableLabel : MASTER_DATA_LABELS.enableLabel}
            </button>
            <button
              type="button"
              onClick={() => onDelete(item)}
              className="inline-flex h-8 items-center gap-1 rounded-lg border border-red-200 px-2.5 text-xs font-semibold text-red-600 transition-colors duration-200 hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              {MASTER_DATA_LABELS.deleteLabel}
            </button>
          </div>
        </div>
      ))}
    </AdminMobileCardList>
  );
}
