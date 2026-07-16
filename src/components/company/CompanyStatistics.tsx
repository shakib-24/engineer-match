import {
  Archive,
  Award,
  Briefcase,
  CalendarCheck,
  Clock,
  Eye,
  FilePenLine,
  MessagesSquare,
  UserCheck,
  Users,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

const ICON_MAP = {
  briefcase: Briefcase,
  users: Users,
  clock: Clock,
  userCheck: UserCheck,
  eye: Eye,
  award: Award,
  archive: Archive,
  filePenLine: FilePenLine,
  messagesSquare: MessagesSquare,
  calendarCheck: CalendarCheck,
} as const;

export interface CompanyStatisticsItem {
  label: string;
  value: string;
  icon: string;
  helper?: string;
}

interface CompanyStatisticsProps {
  title?: string;
  items: CompanyStatisticsItem[];
}

export function CompanyStatistics({ title, items }: CompanyStatisticsProps) {
  return (
    <div className="flex flex-col gap-4">
      {title && <h3 className="text-base font-semibold text-foreground">{title}</h3>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <StatCard
            key={item.label}
            label={item.label}
            value={item.value}
            helper={item.helper}
            icon={ICON_MAP[item.icon as keyof typeof ICON_MAP]}
          />
        ))}
      </div>
    </div>
  );
}
