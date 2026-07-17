import type { ReactNode } from "react";

interface AdminDataTableProps {
  columns: string[];
  children: ReactNode;
  caption?: string;
}

export function AdminDataTable({ columns, children, caption }: AdminDataTableProps) {
  return (
    <div className="hidden overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm lg:block">
      <table className="w-full min-w-[720px] text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="px-4 py-3 text-xs font-semibold whitespace-nowrap text-muted-foreground"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">{children}</tbody>
      </table>
    </div>
  );
}
