import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Eye, Heart, MessageCircle, Send } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  ENGINEER_NAV,
  ENGINEER_PROFILE_COMPLETION,
  ENGINEER_RECENT_APPLICATIONS,
  ENGINEER_RECENT_MESSAGES,
  ENGINEER_RECOMMENDED_OPPORTUNITIES,
  ENGINEER_SKILL_SUMMARY,
  ENGINEER_STATS,
  ENGINEER_WELCOME,
  USER_MENU,
} from "@/constants/dashboard";

export const metadata: Metadata = {
  title: "ダッシュボード | ENGINEER MATCH",
  description: "エンジニア向けダッシュボードです。",
};

const STAT_ICON_MAP = {
  send: Send,
  clock: Clock,
  heart: Heart,
  eye: Eye,
} as const;

const APPLICATION_STATUS_STYLES = {
  書類選考中: "bg-blue-50 text-blue-700",
  面接調整中: "bg-amber-50 text-amber-700",
  内定: "bg-green-50 text-green-700",
  不採用: "bg-muted text-muted-foreground",
} as const;

export default function EngineerDashboardPage() {
  const user = USER_MENU.engineer;

  return (
    <DashboardShell
      navItems={ENGINEER_NAV}
      activeHref="/engineer/dashboard"
      pageTitle="ダッシュボード"
      userName={user.name}
      userInitials={user.initials}
    >
      <div>
        <h2 className="text-2xl leading-tight font-bold tracking-tight text-foreground">
          {ENGINEER_WELCOME.greeting}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {ENGINEER_WELCOME.subtitle}
        </p>
      </div>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              {ENGINEER_PROFILE_COMPLETION.title}
            </h2>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              {ENGINEER_PROFILE_COMPLETION.description}
            </p>
          </div>
          <Link
            href={ENGINEER_PROFILE_COMPLETION.ctaHref}
            className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {ENGINEER_PROFILE_COMPLETION.ctaLabel}
          </Link>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">達成度</span>
            <span className="font-semibold text-primary">
              {ENGINEER_PROFILE_COMPLETION.percentage}%
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={ENGINEER_PROFILE_COMPLETION.percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={ENGINEER_PROFILE_COMPLETION.title}
            className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white"
          >
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${ENGINEER_PROFILE_COMPLETION.percentage}%` }}
            />
          </div>
        </div>

        <ul className="mt-5 flex flex-wrap gap-2">
          {ENGINEER_PROFILE_COMPLETION.missingItems.map((item) => (
            <li
              key={item}
              className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ENGINEER_STATS.map((stat) => (
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
        title={ENGINEER_RECOMMENDED_OPPORTUNITIES.title}
        description={ENGINEER_RECOMMENDED_OPPORTUNITIES.description}
        action={{
          label: ENGINEER_RECOMMENDED_OPPORTUNITIES.viewAllLabel,
          href: ENGINEER_RECOMMENDED_OPPORTUNITIES.viewAllHref,
        }}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {ENGINEER_RECOMMENDED_OPPORTUNITIES.items.map((item) => (
            <div
              key={`${item.company}-${item.title}`}
              className="flex h-full flex-col rounded-xl border border-border p-4 transition-colors duration-200 hover:border-primary/40"
            >
              <p className="text-xs text-muted-foreground">{item.company}</p>
              <h3 className="mt-1 text-sm font-semibold text-foreground">
                {item.title}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {item.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
              <div className="mt-auto space-y-0.5 pt-4 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">
                  {item.compensation}
                </p>
                <p>{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard
          title={ENGINEER_RECENT_APPLICATIONS.title}
          description={ENGINEER_RECENT_APPLICATIONS.description}
          action={{
            label: ENGINEER_RECENT_APPLICATIONS.viewAllLabel,
            href: ENGINEER_RECENT_APPLICATIONS.viewAllHref,
          }}
        >
          <ul className="flex flex-col divide-y divide-border">
            {ENGINEER_RECENT_APPLICATIONS.items.map((item) => (
              <li
                key={`${item.company}-${item.title}`}
                className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {item.company} ・ {item.appliedAt}
                  </p>
                </div>
                <span
                  className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${APPLICATION_STATUS_STYLES[item.status as keyof typeof APPLICATION_STATUS_STYLES]}`}
                >
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          title={ENGINEER_RECENT_MESSAGES.title}
          action={{
            label: ENGINEER_RECENT_MESSAGES.viewAllLabel,
            href: ENGINEER_RECENT_MESSAGES.viewAllHref,
          }}
        >
          <ul className="flex flex-col divide-y divide-border">
            {ENGINEER_RECENT_MESSAGES.items.map((item) => (
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
      </div>

      <SectionCard
        title={ENGINEER_SKILL_SUMMARY.title}
        description={ENGINEER_SKILL_SUMMARY.description}
        action={{
          label: ENGINEER_SKILL_SUMMARY.ctaLabel,
          href: ENGINEER_SKILL_SUMMARY.ctaHref,
        }}
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 rounded-xl border border-border p-4 sm:shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
              {ENGINEER_SKILL_SUMMARY.itssLevel}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">ITSSレベル</p>
              <p className="text-sm font-semibold text-foreground">
                {ENGINEER_SKILL_SUMMARY.itssLevelLabel}
              </p>
            </div>
          </div>

          <ul className="flex flex-wrap gap-2">
            {ENGINEER_SKILL_SUMMARY.topSkills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </SectionCard>
    </DashboardShell>
  );
}
