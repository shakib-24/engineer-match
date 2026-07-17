import { ArrowDown, ArrowUp, Pencil, Power, Trash2 } from "lucide-react";
import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import {
  MASTER_DATA_LABELS,
  MASTER_DATA_TABLE_COLUMNS,
  type MasterDataItem,
} from "@/constants/admin-master-data";

interface MasterDataTableProps {
  items: MasterDataItem[];
  onEdit: (item: MasterDataItem) => void;
  onDelete: (item: MasterDataItem) => void;
  onToggleActive: (item: MasterDataItem) => void;
  onMoveUp: (item: MasterDataItem) => void;
  onMoveDown: (item: MasterDataItem) => void;
}

export function MasterDataTable({
  items,
  onEdit,
  onDelete,
  onToggleActive,
  onMoveUp,
  onMoveDown,
}: MasterDataTableProps) {
  return (
    <AdminDataTable columns={[...MASTER_DATA_TABLE_COLUMNS]} caption="マスタデータ一覧">
      {items.map((item, index) => (
        <tr key={item.id} className="hover:bg-muted/40">
          <td className="px-4 py-3 whitespace-nowrap">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onMoveUp(item)}
                disabled={index === 0}
                aria-label={`${item.displayName}を${MASTER_DATA_LABELS.moveUpLabel}`}
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onMoveDown(item)}
                disabled={index === items.length - 1}
                aria-label={`${item.displayName}を${MASTER_DATA_LABELS.moveDownLabel}`}
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </td>
          <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{item.displayName}</td>
          <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{item.internalCode}</td>
          <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{item.category || "—"}</td>
          <td className="max-w-[220px] px-4 py-3 text-muted-foreground">
            <span className="line-clamp-1">{item.description || "—"}</span>
          </td>
          <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{item.usageCount}</td>
          <td className="px-4 py-3 whitespace-nowrap">
            <AdminStatusBadge
              label={item.active ? "有効" : "無効"}
              tone={item.active ? "positive" : "neutral"}
            />
          </td>
          <td className="px-4 py-3 whitespace-nowrap">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onEdit(item)}
                aria-label={`${item.displayName}を${MASTER_DATA_LABELS.editLabel}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <Pencil className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onToggleActive(item)}
                aria-label={`${item.displayName}を${item.active ? MASTER_DATA_LABELS.disableLabel : MASTER_DATA_LABELS.enableLabel}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <Power className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(item)}
                aria-label={`${item.displayName}を${MASTER_DATA_LABELS.deleteLabel}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-red-600 transition-colors duration-200 hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </AdminDataTable>
  );
}
