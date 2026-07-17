"use client";

import { MASTER_DATA_CATEGORIES, type MasterDataCategoryKey } from "@/constants/admin-master-data";
import { cn } from "@/lib/utils";

interface MasterDataTabsProps {
  active: MasterDataCategoryKey;
  onChange: (category: MasterDataCategoryKey) => void;
}

export function MasterDataTabs({ active, onChange }: MasterDataTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="マスタデータのカテゴリ"
      className="flex flex-wrap gap-2 border-b border-border pb-3"
    >
      {MASTER_DATA_CATEGORIES.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            role="tab"
            id={`master-data-tab-${category}`}
            aria-selected={isActive}
            aria-controls="master-data-panel"
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(category)}
            className={cn(
              "inline-flex h-9 items-center justify-center rounded-xl px-3.5 text-sm font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
              isActive
                ? "bg-primary text-white"
                : "border border-border bg-surface text-muted-foreground hover:bg-muted",
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
