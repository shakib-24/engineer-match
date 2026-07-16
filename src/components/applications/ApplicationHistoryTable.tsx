import { ApplicationStatusBadge } from "@/components/applications/ApplicationStatusBadge";
import {
  DETAIL_META,
  type ApplicationTimelineEntry,
} from "@/constants/applications";

interface ApplicationHistoryTableProps {
  entries: ApplicationTimelineEntry[];
}

export function ApplicationHistoryTable({ entries }: ApplicationHistoryTableProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <h3 className="text-base font-semibold text-foreground">
        {DETAIL_META.historyTitle}
      </h3>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th scope="col" className="py-2 pr-4 font-medium">
                日付
              </th>
              <th scope="col" className="py-2 pr-4 font-medium">
                ステータス
              </th>
              <th scope="col" className="py-2 font-medium">
                備考
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {entries.map((entry, index) => (
              <tr key={`${entry.date}-${index}`}>
                <td className="py-3 pr-4 whitespace-nowrap text-muted-foreground">
                  {entry.date}
                </td>
                <td className="py-3 pr-4">
                  <ApplicationStatusBadge status={entry.status} />
                </td>
                <td className="py-3 text-muted-foreground">{entry.note ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
