"use client";

import { Download, Upload } from "lucide-react";
import { MASTER_DATA_IMPORT_LABELS } from "@/constants/admin-master-data";

interface MasterDataImportPanelProps {
  onImportClick: () => void;
  onExportClick: () => void;
}

export function MasterDataImportPanel({ onImportClick, onExportClick }: MasterDataImportPanelProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-foreground">{MASTER_DATA_IMPORT_LABELS.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{MASTER_DATA_IMPORT_LABELS.description}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onImportClick}
          className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-border bg-surface px-3.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <Upload className="h-4 w-4" aria-hidden="true" />
          {MASTER_DATA_IMPORT_LABELS.importLabel}
        </button>
        <button
          type="button"
          onClick={onExportClick}
          className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-border bg-surface px-3.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          {MASTER_DATA_IMPORT_LABELS.exportLabel}
        </button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{MASTER_DATA_IMPORT_LABELS.demoNote}</p>
    </div>
  );
}
