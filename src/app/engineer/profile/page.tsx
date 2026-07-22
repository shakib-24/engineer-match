import type { Metadata } from "next";
import {
  Award,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Eye,
  FolderGit2,
  GraduationCap,
  Languages as LanguagesIcon,
  MapPin,
  Users,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ProfileHeader } from "@/components/engineer/profile/ProfileHeader";
import { ProfileSection } from "@/components/engineer/profile/ProfileSection";
import { ProfileCompletion } from "@/components/engineer/profile/ProfileCompletion";
import { SkillCard } from "@/components/engineer/profile/SkillCard";
import { HumanSkillAssessmentCard } from "@/components/engineer/profile/HumanSkillAssessmentCard";
import { ExperienceTimeline } from "@/components/engineer/profile/ExperienceTimeline";
import { CertificationCard } from "@/components/engineer/profile/CertificationCard";
import { PortfolioCard } from "@/components/engineer/profile/PortfolioCard";
import { PreferredConditions } from "@/components/engineer/profile/PreferredConditions";
import { ENGINEER_NAV, USER_MENU } from "@/constants/dashboard";
import {
  BASIC_INFO,
  BASIC_INFO_LABELS,
  BUSINESS_SKILLS,
  CERTIFICATIONS,
  CERTIFICATIONS_SECTION,
  EDUCATION,
  EDUCATION_SECTION,
  LANGUAGES,
  LANGUAGES_SECTION,
  PORTFOLIO_PROJECTS,
  PORTFOLIO_SECTION,
  PREFERRED_CONDITIONS,
  PREFERRED_CONDITIONS_LABELS,
  PREFERRED_CONDITIONS_SECTION,
  PROFILE_VISIBILITY,
  SKILLS_SECTION,
  TECHNICAL_SKILLS,
  WORK_EXPERIENCE,
  WORK_EXPERIENCE_SECTION,
} from "@/constants/engineer-profile";
import { createClient } from "@/lib/supabase/server";
import { listHumanAssessments, listLatestAttempts } from "@/lib/engineer/skill-assessments";

export const metadata: Metadata = {
  title: "プロフィール | ENGINEER MATCH",
  description: "エンジニアのプロフィールページです。",
};

const VISIBILITY_STYLES: Record<string, string> = {
  公開: "bg-green-50 text-green-700",
  非公開: "bg-muted text-muted-foreground",
};

export default async function EngineerProfilePage() {
  const user = USER_MENU.engineer;
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  const humanAssessments = await listHumanAssessments(supabase);
  const latestAttempts = authUser
    ? await listLatestAttempts(
        supabase,
        authUser.id,
        humanAssessments.map((assessment) => assessment.id),
      )
    : new Map();

  return (
    <DashboardShell
      navItems={ENGINEER_NAV}
      activeHref="/engineer/profile"
      pageTitle="プロフィール"
      userName={user.name}
      userInitials={user.initials}
    >
      <ProfileHeader />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
          <ProfileSection title={BASIC_INFO.title} icon={Users}>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {BASIC_INFO_LABELS.bio}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {BASIC_INFO.bio}
              </p>
            </div>
            <dl className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-muted-foreground">
                  {BASIC_INFO_LABELS.birthDate}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-foreground">
                  {BASIC_INFO.birthDate}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">
                  {BASIC_INFO_LABELS.gender}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-foreground">
                  {BASIC_INFO.gender}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">
                  {BASIC_INFO_LABELS.phone}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-foreground">
                  {BASIC_INFO.phone}
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-xs text-muted-foreground">
                  {BASIC_INFO_LABELS.email}
                </dt>
                <dd className="mt-1.5 truncate text-sm font-medium text-foreground">
                  {BASIC_INFO.email}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">
                  {BASIC_INFO_LABELS.location}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-foreground">
                  {BASIC_INFO.location}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">
                  {BASIC_INFO_LABELS.nearestStation}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-foreground">
                  {BASIC_INFO.nearestStation}
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-xs text-muted-foreground">
                  {BASIC_INFO_LABELS.github}
                </dt>
                <dd className="mt-1.5 truncate text-sm font-medium">
                  <a
                    href={BASIC_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 transition-colors duration-200 hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    {BASIC_INFO.github}
                  </a>
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-xs text-muted-foreground">
                  {BASIC_INFO_LABELS.portfolioUrl}
                </dt>
                <dd className="mt-1.5 truncate text-sm font-medium">
                  <a
                    href={BASIC_INFO.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 transition-colors duration-200 hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    {BASIC_INFO.portfolioUrl}
                  </a>
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
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {TECHNICAL_SKILLS.map((skill) => (
                    <SkillCard
                      key={skill.name}
                      variant="technical"
                      name={skill.name}
                      itssLevel={skill.itssLevel}
                      experienceYears={skill.experienceYears}
                    />
                  ))}
                </div>
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
                  {BUSINESS_SKILLS.map((skill) => (
                    <SkillCard
                      key={skill.name}
                      variant="rated"
                      name={skill.name}
                      rating={skill.rating}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ProfileSection>

          <ProfileSection
            title={WORK_EXPERIENCE_SECTION.title}
            icon={BriefcaseBusiness}
          >
            <ExperienceTimeline items={WORK_EXPERIENCE} />
          </ProfileSection>

          <ProfileSection title={EDUCATION_SECTION.title} icon={GraduationCap}>
            <ul className="flex flex-col gap-4">
              {EDUCATION.map((edu) => (
                <li
                  key={edu.school}
                  className="rounded-xl border border-border p-4"
                >
                  <h3 className="text-sm font-semibold text-foreground">
                    {edu.school}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {edu.department} ・ {edu.period}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {edu.description}
                  </p>
                </li>
              ))}
            </ul>
          </ProfileSection>

          <ProfileSection title={CERTIFICATIONS_SECTION.title} icon={Award}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {CERTIFICATIONS.map((cert) => (
                <CertificationCard
                  key={cert.name}
                  name={cert.name}
                  issuer={cert.issuer}
                  acquiredDate={cert.acquiredDate}
                  expirationDate={cert.expirationDate}
                />
              ))}
            </div>
          </ProfileSection>

          <ProfileSection title={PORTFOLIO_SECTION.title} icon={FolderGit2}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {PORTFOLIO_PROJECTS.map((project) => (
                <PortfolioCard
                  key={project.title}
                  title={project.title}
                  role={project.role}
                  description={project.description}
                  skills={project.skills}
                  url={project.url}
                  period={project.period}
                />
              ))}
            </div>
          </ProfileSection>

          <ProfileSection title={LANGUAGES_SECTION.title} icon={LanguagesIcon}>
            <ul className="flex flex-col gap-3">
              {LANGUAGES.map((lang) => (
                <li
                  key={lang.name}
                  className="flex items-center justify-between rounded-xl border border-border px-4 py-3"
                >
                  <span className="text-sm font-semibold text-foreground">
                    {lang.name}
                  </span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {lang.level}
                  </span>
                </li>
              ))}
            </ul>
          </ProfileSection>

          <ProfileSection
            title={PREFERRED_CONDITIONS_SECTION.title}
            icon={MapPin}
          >
            <PreferredConditions
              contractTypes={PREFERRED_CONDITIONS.contractTypes}
              locations={PREFERRED_CONDITIONS.locations}
              remotePreference={PREFERRED_CONDITIONS.remotePreference}
              desiredAnnualIncome={PREFERRED_CONDITIONS.desiredAnnualIncome}
              desiredMonthlyRate={PREFERRED_CONDITIONS.desiredMonthlyRate}
              desiredHourlyRate={PREFERRED_CONDITIONS.desiredHourlyRate}
              availableFrom={PREFERRED_CONDITIONS.availableFrom}
              labels={PREFERRED_CONDITIONS_LABELS}
            />
          </ProfileSection>
        </div>

        <div className="flex flex-col gap-6">
          <ProfileCompletion />

          <ProfileSection title={PROFILE_VISIBILITY.title} icon={Eye}>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${VISIBILITY_STYLES[PROFILE_VISIBILITY.status]}`}
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-current"
                aria-hidden="true"
              />
              {PROFILE_VISIBILITY.status}
            </span>
            <p className="mt-3 text-sm text-muted-foreground">
              {PROFILE_VISIBILITY.description}
            </p>
          </ProfileSection>
        </div>
      </div>
    </DashboardShell>
  );
}
