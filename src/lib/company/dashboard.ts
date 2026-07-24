import type { SupabaseClient } from "@supabase/supabase-js";
import { listSearchableEngineers, type EngineerSearchListItem } from "@/lib/company/engineers";
import { listCompanyConversations, type CompanyConversationListItem } from "@/lib/company/chat";
import type { CompanyContractType, JobStatus } from "@/lib/company/jobs";

/**
 * Aggregate counts derived from the company's own public.opportunities /
 * public.applications rows -- replaces the old hardcoded COMPANY_STATS /
 * COMPANY_PROFILE_STATISTICS mock numbers. Used by both the Dashboard (via
 * getCompanyDashboardData below) and the Profile page's statistics strip.
 */
export interface CompanyMetrics {
  publishedCount: number;
  draftCount: number;
  closedCount: number;
  totalApplicants: number;
  /** applications currently in screening or interview. */
  screeningCount: number;
  /** applications still in the initial "applied" state -- not yet screened. */
  newApplicantsCount: number;
  acceptedCount: number;
}

interface OpportunityRow {
  id: string;
  status: JobStatus;
}

interface ApplicationStatusRow {
  status: string;
  opportunity_id: string;
}

export async function getCompanyMetrics(
  supabase: SupabaseClient,
  companyUserId: string,
): Promise<CompanyMetrics> {
  const { data: opportunities, error: opportunitiesError } = await supabase
    .from("opportunities")
    .select("id, status")
    .eq("posted_by", companyUserId)
    .is("deleted_at", null);

  if (opportunitiesError) {
    console.error("[company-dashboard] failed to load opportunities:", opportunitiesError);
  }

  const oppRows = (opportunities ?? []) as OpportunityRow[];
  const opportunityIds = oppRows.map((o) => o.id);
  const publishedCount = oppRows.filter((o) => o.status === "published").length;
  const draftCount = oppRows.filter((o) => o.status === "draft").length;
  const closedCount = oppRows.filter((o) => o.status === "closed").length;

  if (opportunityIds.length === 0) {
    return {
      publishedCount,
      draftCount,
      closedCount,
      totalApplicants: 0,
      screeningCount: 0,
      newApplicantsCount: 0,
      acceptedCount: 0,
    };
  }

  const { data: applications, error: applicationsError } = await supabase
    .from("applications")
    .select("status, opportunity_id")
    .in("opportunity_id", opportunityIds);

  if (applicationsError) {
    console.error("[company-dashboard] failed to load applications:", applicationsError);
  }

  const appRows = (applications ?? []) as ApplicationStatusRow[];

  return {
    publishedCount,
    draftCount,
    closedCount,
    totalApplicants: appRows.length,
    screeningCount: appRows.filter((a) => a.status === "screening" || a.status === "interview").length,
    newApplicantsCount: appRows.filter((a) => a.status === "applied").length,
    acceptedCount: appRows.filter((a) => a.status === "accepted").length,
  };
}

export interface CompanyRecentApplication {
  applicationId: string;
  applicantName: string;
  opportunityTitle: string;
  status: string;
  appliedAt: string;
}

export interface CompanyRecentOpportunity {
  id: string;
  title: string;
  contractType: CompanyContractType;
  status: JobStatus;
  applicantCount: number;
  updatedAt: string;
}

export interface CompanyDashboardData {
  metrics: CompanyMetrics;
  recentApplications: CompanyRecentApplication[];
  recentOpportunities: CompanyRecentOpportunity[];
  /**
   * Real public engineer-search results, most recent first -- there is no
   * recommendation/matching algorithm in this schema, so this is honestly a
   * "recently registered public engineers" list, not a scored recommendation.
   */
  recommendedEngineers: EngineerSearchListItem[];
  recentConversations: CompanyConversationListItem[];
}

/** Everything the Company dashboard needs, real Supabase data only. */
export async function getCompanyDashboardData(
  supabase: SupabaseClient,
  companyUserId: string,
): Promise<CompanyDashboardData> {
  const { data: opportunities, error: opportunitiesError } = await supabase
    .from("opportunities")
    .select("id, title, contract_type, status, updated_at")
    .eq("posted_by", companyUserId)
    .is("deleted_at", null)
    .order("updated_at", { ascending: false });

  if (opportunitiesError) {
    console.error("[company-dashboard] failed to load opportunities:", opportunitiesError);
  }

  const oppRows = (opportunities ?? []) as {
    id: string;
    title: string;
    contract_type: CompanyContractType;
    status: JobStatus;
    updated_at: string;
  }[];
  const opportunityIds = oppRows.map((o) => o.id);
  const opportunityTitleById = new Map(oppRows.map((o) => [o.id, o.title]));

  const [{ data: applications }, recommendedEngineers, recentConversations] = await Promise.all([
    opportunityIds.length > 0
      ? supabase
          .from("applications")
          .select("id, opportunity_id, applicant_id, status, applied_at")
          .in("opportunity_id", opportunityIds)
          .order("applied_at", { ascending: false })
      : Promise.resolve({ data: [] as never[] }),
    listSearchableEngineers(supabase),
    listCompanyConversations(supabase, companyUserId),
  ]);

  const appRows = (applications ?? []) as {
    id: string;
    opportunity_id: string;
    applicant_id: string;
    status: string;
    applied_at: string;
  }[];

  const publishedCount = oppRows.filter((o) => o.status === "published").length;
  const draftCount = oppRows.filter((o) => o.status === "draft").length;
  const closedCount = oppRows.filter((o) => o.status === "closed").length;
  const screeningCount = appRows.filter((a) => a.status === "screening" || a.status === "interview").length;
  const newApplicantsCount = appRows.filter((a) => a.status === "applied").length;
  const acceptedCount = appRows.filter((a) => a.status === "accepted").length;

  const applicantCountByOpportunity = new Map<string, number>();
  for (const a of appRows) {
    applicantCountByOpportunity.set(
      a.opportunity_id,
      (applicantCountByOpportunity.get(a.opportunity_id) ?? 0) + 1,
    );
  }

  const recentAppRows = appRows.slice(0, 5);
  const applicantIds = [...new Set(recentAppRows.map((a) => a.applicant_id))];
  const { data: applicantUsers } =
    applicantIds.length > 0
      ? await supabase.from("users").select("id, name").in("id", applicantIds)
      : { data: [] as { id: string; name: string }[] };
  const applicantNameById = new Map(
    ((applicantUsers ?? []) as { id: string; name: string }[]).map((u) => [u.id, u.name]),
  );

  const recentApplications: CompanyRecentApplication[] = recentAppRows.map((a) => ({
    applicationId: a.id,
    applicantName: applicantNameById.get(a.applicant_id) ?? "",
    opportunityTitle: opportunityTitleById.get(a.opportunity_id) ?? "",
    status: a.status,
    appliedAt: a.applied_at,
  }));

  const recentOpportunities: CompanyRecentOpportunity[] = oppRows.slice(0, 3).map((o) => ({
    id: o.id,
    title: o.title,
    contractType: o.contract_type,
    status: o.status,
    applicantCount: applicantCountByOpportunity.get(o.id) ?? 0,
    updatedAt: o.updated_at,
  }));

  return {
    metrics: {
      publishedCount,
      draftCount,
      closedCount,
      totalApplicants: appRows.length,
      screeningCount,
      newApplicantsCount,
      acceptedCount,
    },
    recentApplications,
    recentOpportunities,
    recommendedEngineers: recommendedEngineers.slice(0, 3),
    recentConversations: recentConversations.slice(0, 3),
  };
}
