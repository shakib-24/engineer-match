import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  Clock,
  FilePlus2,
  MessageCircle,
  Search,
  UserPlus,
  Users,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  COMPANY_ACTIVE_OPPORTUNITIES,
  COMPANY_CANDIDATE_RECOMMENDATIONS,
  COMPANY_NAV,
  COMPANY_QUICK_ACTIONS,
  COMPANY_RECENT_APPLICANTS,
  COMPANY_RECENT_MESSAGES,
  COMPANY_STATS,
  COMPANY_WELCOME,
  USER_MENU,
} from "@/constants/dashboard";

export const metadata: Metadata = {
  title: "ダッシュボード | ENGINEER MATCH",
  description: "企業向けダッシュボードです。",
};

const STAT_ICON_MAP = {
  briefcase: Briefcase,
  users: Users,
  clock: Clock,
  userPlus: UserPlus,
} as const;

const QUICK_ACTION_ICON_MAP = {
  filePlus2: FilePlus2,
  users: Users,
  search: Search,
} as const;

const APPLICANT_STATUS_STYLES = {
  書類選考中: "bg-blue-50 text-blue-700",
  面接調整中: "bg-amber-50 text-amber-700",
} as const;

export default function CompanyDashboardPage() {
  const user = USER_MENU.company;

  return (
    <DashboardShell
      navItems={COMPANY_NAV}
      activeHref="/company/dashboard"
      pageTitle="ダッシュボード"
      userName={user.name}
      userInitials={user.initials}
    >
      <div>
        <h2 className="text-2xl leading-tight font-bold tracking-tight text-foreground">
          {COMPANY_WELCOME.greeting}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {COMPANY_WELCOME.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {COMPANY_STATS.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            helper={stat.helper}
            icon={STAT_ICON_MAP[stat.icon as keyof typeof STAT_ICON_MAP]}
          />
        ))}
      </div>

      <SectionCard
        title={COMPANY_ACTIVE_OPPORTUNITIES.title}
        description={COMPANY_ACTIVE_OPPORTUNITIES.description}
        action={{
          label: COMPANY_ACTIVE_OPPORTUNITIES.viewAllLabel,
          href: COMPANY_ACTIVE_OPPORTUNITIES.viewAllHref,
        }}
      >
        <ul className="flex flex-col divide-y divide-border">
          {COMPANY_ACTIVE_OPPORTUNITIES.items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {item.contractType} ・ 応募者 {item.applicantCount}名 ・{" "}
                  {item.postedAt}
                </p>
              </div>
              <span className="w-fit shrink-0 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                {item.status}
              </span>
            </li>
          ))}
        </ul>
      </SectionCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard
          title={COMPANY_RECENT_APPLICANTS.title}
          description={COMPANY_RECENT_APPLICANTS.description}
          action={{
            label: COMPANY_RECENT_APPLICANTS.viewAllLabel,
            href: COMPANY_RECENT_APPLICANTS.viewAllHref,
          }}
        >
          <ul className="flex flex-col divide-y divide-border">
            {COMPANY_RECENT_APPLICANTS.items.map((item) => (
              <li
                key={`${item.name}-${item.title}`}
                className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {item.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {item.title} ・ {item.appliedAt}
                  </p>
                </div>
                <span
                  className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${APPLICANT_STATUS_STYLES[item.status as keyof typeof APPLICANT_STATUS_STYLES]}`}
                >
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          title={COMPANY_CANDIDATE_RECOMMENDATIONS.title}
          description={COMPANY_CANDIDATE_RECOMMENDATIONS.description}
          action={{
            label: COMPANY_CANDIDATE_RECOMMENDATIONS.viewAllLabel,
            href: COMPANY_CANDIDATE_RECOMMENDATIONS.viewAllHref,
          }}
        >
          <ul className="flex flex-col divide-y divide-border">
            {COMPANY_CANDIDATE_RECOMMENDATIONS.items.map((item) => (
              <li
                key={item.name}
                className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {item.itssLevel}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {item.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {item.skills.join(" / ")} ・ {item.location}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <SectionCard
          title={COMPANY_RECENT_MESSAGES.title}
          action={{
            label: COMPANY_RECENT_MESSAGES.viewAllLabel,
            href: COMPANY_RECENT_MESSAGES.viewAllHref,
          }}
        >
          <ul className="flex flex-col divide-y divide-border">
            {COMPANY_RECENT_MESSAGES.items.map((item) => (
              <li key={item.sender} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle
                    className="h-4 w-4 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {item.sender}
                    </p>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {item.time}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {item.preview}
                  </p>
                </div>
                {item.unread && (
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary"
                    aria-label="未読"
                  />
                )}
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title={COMPANY_QUICK_ACTIONS.title}>
          <div className="flex flex-col gap-3">
            {COMPANY_QUICK_ACTIONS.items.map((action) => {
              const Icon =
                QUICK_ACTION_ICON_MAP[
                  action.icon as keyof typeof QUICK_ACTION_ICON_MAP
                ];
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 rounded-xl border border-border p-3 text-sm font-medium text-foreground transition-colors duration-200 hover:border-primary/40 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                  {action.label}
                </Link>
              );
            })}
          </div>
        </SectionCard>
      </div>
    </DashboardShell>
  );
}
