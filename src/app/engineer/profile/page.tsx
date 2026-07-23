import type { Metadata } from "next";
import { Award, BrainCircuit, Code2, Eye, Users } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ProfileHeader } from "@/components/engineer/profile/ProfileHeader";
import { ProfileSection } from "@/components/engineer/profile/ProfileSection";
import { ProfileCompletion } from "@/components/engineer/profile/ProfileCompletion";
import { SkillCard } from "@/components/engineer/profile/SkillCard";
import { HumanSkillAssessmentCard } from "@/components/engineer/profile/HumanSkillAssessmentCard";
import { QualificationCard } from "@/components/engineer/profile/QualificationCard";
import { ENGINEER_NAV, USER_MENU } from "@/constants/dashboard";
import {
  BASIC_INFO_LABELS,
  BASIC_INFO_SECTION,
  PROFILE_VISIBILITY_SECTION,
  QUALIFICATIONS_SECTION,
  QUALIFICATION_EDITOR_LABELS,
  SKILLS_SECTION,
  TECHNICAL_SKILLS_EMPTY_MESSAGE,
  VISIBILITY_STATUS_LABEL,
} from "@/constants/engineer-profile";
import { WORK_STYLE_LABEL } from "@/constants/jobs";
import { createClient } from "@/lib/supabase/server";
import {
  computeProfileCompletion,
  getEngineerProfile,
} from "@/lib/engineer/profile";
import { listUserSkills } from "@/lib/engineer/skills";
import { listUserQualifications } from "@/lib/engineer/qualifications";
import {
  listBusinessAssessments,
  listHumanAssessments,
  listLatestAttempts,
} from "@/lib/engineer/skill-assessments";

export const metadata: Metadata = {
  title: "プロフィール | ENGINEER MATCH",
  description: "エンジニアのプロフィールページです。",
};

const VISIBILITY_STYLES: Record<string, string> = {
  [VISIBILITY_STATUS_LABEL.public]: "bg-green-50 text-green-700",
  [VISIBILITY_STATUS_LABEL.private]: "bg-muted text-muted-foreground",
};

export default async function EngineerProfilePage() {
  const user = USER_MENU.engineer;
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  const [profile, userRow, technicalSkills, qualifications, humanAssessments, businessAssessments] =
    await Promise.all([
      authUser ? getEngineerProfile(supabase, authUser.id) : Promise.resolve(null),
      authUser
        ? supabase.from("users").select("name").eq("id", authUser.id).maybeSingle()
        : Promise.resolve({ data: null }),
      authUser ? listUserSkills(supabase, authUser.id) : Promise.resolve([]),
      authUser ? listUserQualifications(supabase, authUser.id) : Promise.resolve([]),
      listHumanAssessments(supabase),
      listBusinessAssessments(supabase),
    ]);

  const latestAttempts = authUser
    ? await listLatestAttempts(
        supabase,
        authUser.id,
        [...humanAssessments, ...businessAssessments].map((assessment) => assessment.id),
      )
    : new Map();

  const name = (userRow?.data?.name as string | undefined) ?? "";
  const email = authUser?.email ?? "";
  const isPublic = profile?.is_public ?? true;

  const completion = computeProfileCompletion({
    hasSelfPr: Boolean(profile?.self_pr),
    hasPrefecture: Boolean(profile?.prefecture),
    hasYearsOfExperience: profile?.years_of_experience !== null && profile?.years_of_experience !== undefined,
    hasWorkStyle: Boolean(profile?.work_style),
    hasDesiredRate: Boolean(profile?.desired_rate_min && profile?.desired_rate_max),
    hasTechnicalSkill: technicalSkills.length > 0,
    hasQualification: qualifications.length > 0,
  });

  const desiredRateLabel =
    profile?.desired_rate_min && profile?.desired_rate_max
      ? `${profile.desired_rate_min}万円〜${profile.desired_rate_max}万円`
      : BASIC_INFO_LABELS.unset;

  return (
    <DashboardShell
      navItems={ENGINEER_NAV}
      activeHref="/engineer/profile"
      pageTitle="プロフィール"
      userName={user.name}
      userInitials={user.initials}
    >
      <ProfileHeader
        name={name}
        prefecture={profile?.prefecture ?? null}
        yearsOfExperience={profile?.years_of_experience ?? null}
        isPublic={isPublic}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
          <ProfileSection title={BASIC_INFO_SECTION.title} icon={Users}>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {BASIC_INFO_LABELS.bio}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {profile?.self_pr || BASIC_INFO_LABELS.bioEmpty}
              </p>
            </div>
            <dl className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-muted-foreground">
                  {BASIC_INFO_LABELS.email}
                </dt>
                <dd className="mt-1.5 truncate text-sm font-medium text-foreground">
                  {email}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">
                  {BASIC_INFO_LABELS.prefecture}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-foreground">
                  {profile?.prefecture || BASIC_INFO_LABELS.unset}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">
                  {BASIC_INFO_LABELS.yearsOfExperience}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-foreground">
                  {profile?.years_of_experience !== null && profile?.years_of_experience !== undefined
                    ? `${profile.years_of_experience}年`
                    : BASIC_INFO_LABELS.unset}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">
                  {BASIC_INFO_LABELS.workStyle}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-foreground">
                  {profile?.work_style ? WORK_STYLE_LABEL[profile.work_style] : BASIC_INFO_LABELS.unset}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">
                  {BASIC_INFO_LABELS.desiredRate}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-foreground">{desiredRateLabel}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-xs text-muted-foreground">
                  {BASIC_INFO_LABELS.portfolioUrl}
                </dt>
                <dd className="mt-1.5 truncate text-sm font-medium">
                  {profile?.portfolio_url ? (
                    <a
                      href={profile.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-2 transition-colors duration-200 hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      {profile.portfolio_url}
                    </a>
                  ) : (
                    <span className="text-foreground">{BASIC_INFO_LABELS.unset}</span>
                  )}
                </dd>
              </div>
            </dl>
          </ProfileSection>

          <ProfileSection title={SKILLS_SECTION.title} icon={Code2}>
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Code2 className="h-4 w-4 text-primary" aria-hidden="true" />
                  {SKILLS_SECTION.technicalTitle}
                </h3>
                {technicalSkills.length === 0 ? (
                  <p className="mt-3 text-sm text-muted-foreground">
                    {TECHNICAL_SKILLS_EMPTY_MESSAGE}
                  </p>
                ) : (
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {technicalSkills.map((skill) => (
                      <SkillCard
                        key={skill.id}
                        variant="technical"
                        name={skill.name}
                        itssLevel={(skill.level ?? 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Users className="h-4 w-4 text-primary" aria-hidden="true" />
                  {SKILLS_SECTION.humanTitle}
                </h3>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {humanAssessments.map((assessment) => (
                    <HumanSkillAssessmentCard
                      key={assessment.id}
                      name={assessment.name}
                      code={assessment.code}
                      finalLevel={latestAttempts.get(assessment.id)?.final_level ?? null}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <BrainCircuit className="h-4 w-4 text-primary" aria-hidden="true" />
                  {SKILLS_SECTION.businessTitle}
                </h3>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {businessAssessments.map((assessment) => (
                    <HumanSkillAssessmentCard
                      key={assessment.id}
                      name={assessment.name}
                      code={assessment.code}
                      finalLevel={latestAttempts.get(assessment.id)?.final_level ?? null}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ProfileSection>

          <ProfileSection title={QUALIFICATIONS_SECTION.title} icon={Award}>
            {qualifications.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {QUALIFICATION_EDITOR_LABELS.emptyMessage}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {qualifications.map((qualification) => (
                  <QualificationCard
                    key={qualification.id}
                    name={qualification.name}
                    organization={qualification.organization}
                    obtainedYear={qualification.obtainedYear}
                  />
                ))}
              </div>
            )}
          </ProfileSection>
        </div>

        <div className="flex flex-col gap-6">
          <ProfileCompletion percentage={completion.percentage} missingItems={completion.missingItems} />

          <ProfileSection title={PROFILE_VISIBILITY_SECTION.title} icon={Eye}>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                VISIBILITY_STYLES[isPublic ? VISIBILITY_STATUS_LABEL.public : VISIBILITY_STATUS_LABEL.private]
              }`}
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-current"
                aria-hidden="true"
              />
              {isPublic ? VISIBILITY_STATUS_LABEL.public : VISIBILITY_STATUS_LABEL.private}
            </span>
            <p className="mt-3 text-sm text-muted-foreground">
              {PROFILE_VISIBILITY_SECTION.description}
            </p>
          </ProfileSection>
        </div>
      </div>
    </DashboardShell>
  );
}
