import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Heart, MessageCircle, Send } from "lucide-react";
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
  ENGINEER_STATS_LABELS,
  ENGINEER_WELCOME,
} from "@/constants/dashboard";
import { APPLICATION_STATUS_LABEL } from "@/constants/applications";
import { ITSS_LEVELS } from "@/constants/lp";
import { formatDateJa, formatSalaryLabel } from "@/lib/engineer/format";
import { createClient } from "@/lib/supabase/server";
import { getEngineerDashboardData } from "@/lib/engineer/dashboard";

export const metadata: Metadata = {
  title: "ダッシュボード | ENGINEER MATCH",
  description: "エンジニア向けダッシュボードです。",
};

export default async function EngineerDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  const [{ data: userRow }, dashboard] = authUser
    ? await Promise.all([
        supabase.from("users").select("name").eq("id", authUser.id).maybeSingle(),
        getEngineerDashboardData(supabase, authUser.id),
      ])
    : [{ data: null }, null];

  const name = (userRow?.name as string | undefined) ?? "";
  const email = authUser?.email ?? "";
  const itssLevelInfo = dashboard?.maxItssLevel
    ? ITSS_LEVELS.find((item) => item.level === dashboard.maxItssLevel)
    : null;

  return (
    <DashboardShell
      navItems={ENGINEER_NAV}
      activeHref="/engineer/dashboard"
      pageTitle="ダッシュボード"
      userName={name || "エンジニア"}
      userInitials={name ? name.charAt(0) : "?"}
      userEmail={email}
    >
      <div>
        <h2 className="text-2xl leading-tight font-bold tracking-tight text-foreground">
          {name ? `おかえりなさい、${name}さん` : "おかえりなさい"}
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
              {dashboard?.profileCompletion.percentage ?? 0}%
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={dashboard?.profileCompletion.percentage ?? 0}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={ENGINEER_PROFILE_COMPLETION.title}
            className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white"
          >
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${dashboard?.profileCompletion.percentage ?? 0}%` }}
            />
          </div>
        </div>

        {dashboard && dashboard.profileCompletion.missingItems.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {dashboard.profileCompletion.missingItems.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label={ENGINEER_STATS_LABELS.applications.label}
          value={String(dashboard?.applicationsCount ?? 0)}
          helper={ENGINEER_STATS_LABELS.applications.helper}
          icon={Send}
        />
        <StatCard
          label={ENGINEER_STATS_LABELS.screening.label}
          value={String(dashboard?.screeningCount ?? 0)}
          helper={ENGINEER_STATS_LABELS.screening.helper}
          icon={Clock}
        />
        <StatCard
          label={ENGINEER_STATS_LABELS.favorites.label}
          value={String(dashboard?.favoritesCount ?? 0)}
          helper={ENGINEER_STATS_LABELS.favorites.helper}
          icon={Heart}
        />
      </div>

      <SectionCard
        title={ENGINEER_RECOMMENDED_OPPORTUNITIES.title}
        description={ENGINEER_RECOMMENDED_OPPORTUNITIES.description}
        action={{
          label: ENGINEER_RECOMMENDED_OPPORTUNITIES.viewAllLabel,
          href: ENGINEER_RECOMMENDED_OPPORTUNITIES.viewAllHref,
        }}
      >
        {!dashboard || dashboard.recommendedOpportunities.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {ENGINEER_RECOMMENDED_OPPORTUNITIES.emptyMessage}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {dashboard.recommendedOpportunities.map((item) => (
              <Link
                key={item.id}
                href={`/engineer/jobs/${item.id}`}
                className="flex h-full flex-col rounded-xl border border-border p-4 transition-colors duration-200 hover:border-primary/40"
              >
                <p className="text-xs text-muted-foreground">{item.companyName}</p>
                <h3 className="mt-1 text-sm font-semibold text-foreground">{item.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {item.requiredSkillNames.slice(0, 4).map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto space-y-0.5 pt-4 text-xs text-muted-foreground">
                  <p className="font-semibold text-foreground">{formatSalaryLabel(item)}</p>
                  {item.workStyle && <p>{item.workStyle}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
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
          {!dashboard || dashboard.recentApplications.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {ENGINEER_RECENT_APPLICATIONS.emptyMessage}
            </p>
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {dashboard.recentApplications.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/engineer/applications/${item.id}`}
                      className="truncate text-sm font-semibold text-foreground hover:underline"
                    >
                      {item.opportunityTitle}
                    </Link>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {item.companyName} ・ {formatDateJa(item.applied_at)}
                    </p>
                  </div>
                  <span className="w-fit shrink-0 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground">
                    {APPLICATION_STATUS_LABEL[item.status] ?? item.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard
          title={ENGINEER_RECENT_MESSAGES.title}
          action={{
            label: ENGINEER_RECENT_MESSAGES.viewAllLabel,
            href: ENGINEER_RECENT_MESSAGES.viewAllHref,
          }}
        >
          {!dashboard || dashboard.recentConversations.length === 0 ? (
            <p className="text-sm text-muted-foreground">{ENGINEER_RECENT_MESSAGES.emptyMessage}</p>
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {dashboard.recentConversations.map((item) => (
                <li key={item.chatRoomId} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <MessageCircle className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                  <Link
                    href={`/messages/${item.applicationId}`}
                    className="min-w-0 flex-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {item.companyName}
                      </p>
                      {item.unreadCount > 0 && (
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" aria-label="未読" />
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {item.lastMessageBody ?? ""}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
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
        {!dashboard || dashboard.topSkills.length === 0 ? (
          <p className="text-sm text-muted-foreground">{ENGINEER_SKILL_SUMMARY.emptyMessage}</p>
        ) : (
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3 rounded-xl border border-border p-4 sm:shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                {dashboard.maxItssLevel ?? "-"}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">ITSSレベル</p>
                <p className="text-sm font-semibold text-foreground">
                  {itssLevelInfo?.title ?? ""}
                </p>
              </div>
            </div>

            <ul className="flex flex-wrap gap-2">
              {dashboard.topSkills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
      </SectionCard>
    </DashboardShell>
  );
}
