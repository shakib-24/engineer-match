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
import { COMPANY_NAV, COMPANY_QUICK_ACTIONS } from "@/constants/dashboard";
import {
  APPLICATION_STATUS_BADGE_STYLES,
  APPLICATION_STATUS_LABELS,
} from "@/constants/company-applicants";
import { CONTRACT_TYPE_LABEL, JOB_STATUS_LABEL, JOB_STATUS_BADGE_STYLES } from "@/constants/company-jobs";
import { formatDateJa, formatRelativeDaysJa } from "@/lib/engineer/format";
import { createClient } from "@/lib/supabase/server";
import { getCompanyDashboardData } from "@/lib/company/dashboard";
import { getCompanyHeaderIdentity } from "@/lib/company/profile";

export const metadata: Metadata = {
  title: "ダッシュボード | ENGINEER MATCH",
  description: "企業向けダッシュボードです。",
};

const QUICK_ACTION_ICON_MAP = {
  filePlus2: FilePlus2,
  users: Users,
  search: Search,
} as const;

function maxItssLevel(technicalSkills: { level: number | null }[]): number | null {
  const levels = technicalSkills.map((s) => s.level).filter((l): l is number => l !== null);
  return levels.length > 0 ? Math.max(...levels) : null;
}

export default async function CompanyDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  const [dashboard, identity] = await Promise.all([
    authUser ? getCompanyDashboardData(supabase, authUser.id) : Promise.resolve(null),
    getCompanyHeaderIdentity(supabase, authUser),
  ]);

  const stats = [
    { label: "掲載中の求人・案件", value: String(dashboard?.metrics.publishedCount ?? 0), helper: "公開中", icon: Briefcase },
    { label: "応募者数", value: String(dashboard?.metrics.totalApplicants ?? 0), helper: "累計", icon: Users },
    { label: "選考中", value: String(dashboard?.metrics.screeningCount ?? 0), helper: "対応待ち", icon: Clock },
    { label: "新規応募", value: String(dashboard?.metrics.newApplicantsCount ?? 0), helper: "未対応", icon: UserPlus },
  ];

  return (
    <DashboardShell
      navItems={COMPANY_NAV}
      activeHref="/company/dashboard"
      pageTitle="ダッシュボード"
      userName={identity.name}
      userInitials={identity.initials}
      userEmail={identity.email}
    >
      <div>
        <h2 className="text-2xl leading-tight font-bold tracking-tight text-foreground">
          おかえりなさい、{identity.name}様
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          採用活動の状況を確認しましょう。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            helper={stat.helper}
            icon={stat.icon}
          />
        ))}
      </div>

      <SectionCard
        title="掲載中の求人・案件"
        description="現在募集中の求人・案件と応募状況です。"
        action={{ label: "求人・案件管理へ", href: "/company/jobs" }}
      >
        {!dashboard || dashboard.recentOpportunities.length === 0 ? (
          <p className="text-sm text-muted-foreground">まだ求人・案件が掲載されていません。</p>
        ) : (
          <ul className="flex flex-col divide-y divide-border">
            {dashboard.recentOpportunities.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <Link href={`/company/jobs/${item.id}`} className="min-w-0 hover:underline">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {CONTRACT_TYPE_LABEL[item.contractType]} ・ 応募者 {item.applicantCount}名 ・{" "}
                    {formatDateJa(item.updatedAt)}
                  </p>
                </Link>
                <span
                  className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${JOB_STATUS_BADGE_STYLES[item.status]}`}
                >
                  {JOB_STATUS_LABEL[item.status]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard
          title="最近の応募者"
          description="直近で応募のあったエンジニアです。"
          action={{ label: "応募者管理へ", href: "/company/applicants" }}
        >
          {!dashboard || dashboard.recentApplications.length === 0 ? (
            <p className="text-sm text-muted-foreground">まだ応募はありません。</p>
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {dashboard.recentApplications.map((item) => (
                <li
                  key={item.applicationId}
                  className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <Link
                    href={`/company/applicants/${item.applicationId}`}
                    className="min-w-0 hover:underline"
                  >
                    <p className="truncate text-sm font-semibold text-foreground">
                      {item.applicantName}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {item.opportunityTitle} ・ {formatDateJa(item.appliedAt)}
                    </p>
                  </Link>
                  <span
                    className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${APPLICATION_STATUS_BADGE_STYLES[item.status as keyof typeof APPLICATION_STATUS_BADGE_STYLES] ?? "bg-gray-100 text-gray-600"}`}
                  >
                    {APPLICATION_STATUS_LABELS[item.status as keyof typeof APPLICATION_STATUS_LABELS] ?? item.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard
          title="おすすめのエンジニア"
          description="公開プロフィールのエンジニアをご紹介します。"
          action={{ label: "エンジニアを検索", href: "/company/engineers" }}
        >
          {!dashboard || dashboard.recommendedEngineers.length === 0 ? (
            <p className="text-sm text-muted-foreground">現在ご紹介できるエンジニアがいません。</p>
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {dashboard.recommendedEngineers.map((engineer) => {
                const level = maxItssLevel(engineer.technicalSkills);
                return (
                  <li key={engineer.id} className="flex items-center gap-3 py-4 first:pt-0 last:pb-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                      {level ?? "-"}
                    </div>
                    <Link href={`/company/engineers/${engineer.id}`} className="min-w-0 flex-1 hover:underline">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {engineer.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {engineer.technicalSkills.map((s) => s.name).join(" / ") || "スキル未登録"}
                        {engineer.prefecture ? ` ・ ${engineer.prefecture}` : ""}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <SectionCard title="最近のメッセージ" action={{ label: "メッセージ一覧を見る", href: "/company/messages" }}>
          {!dashboard || dashboard.recentConversations.length === 0 ? (
            <p className="text-sm text-muted-foreground">メッセージはまだありません。</p>
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {dashboard.recentConversations.map((item) => (
                <li key={item.chatRoomId} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <MessageCircle className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                  <Link
                    href={`/company/messages/${item.applicationId}`}
                    className="min-w-0 flex-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {item.engineerName}
                      </p>
                      {item.lastMessageAt && (
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {formatRelativeDaysJa(item.lastMessageAt)}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {item.lastMessageBody ?? ""}
                    </p>
                  </Link>
                  {item.unreadCount > 0 && (
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary"
                      aria-label="未読"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
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
