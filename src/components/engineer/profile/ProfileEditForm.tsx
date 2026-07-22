"use client";

import { useRef, useState, type SubmitEvent } from "react";
import Link from "next/link";
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
  Plus,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { ProfileSection } from "@/components/engineer/profile/ProfileSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  AVAILABILITY_OPTIONS,
  BASIC_INFO,
  BASIC_INFO_FORM_FIELDS,
  BASIC_INFO_LABELS,
  BUSINESS_SKILLS,
  BUSINESS_SKILL_OPTIONS,
  CERTIFICATIONS,
  CERTIFICATION_FORM_FIELDS,
  CONTRACT_TYPE_OPTIONS,
  EDUCATION,
  EDUCATION_FORM_FIELDS,
  EMPLOYMENT_TYPE_OPTIONS,
  GENDER_OPTIONS,
  HUMAN_SKILL_EDIT_NOTE,
  ITSS_LEVEL_OPTIONS,
  LANGUAGES,
  LANGUAGE_LEVEL_OPTIONS,
  LANGUAGE_OPTIONS,
  LANGUAGE_ROW_LABELS,
  PORTFOLIO_FORM_FIELDS,
  PORTFOLIO_PROJECTS,
  PREFERRED_CONDITIONS,
  PREFERRED_CONDITIONS_FORM_FIELDS,
  PREVIEW_PANEL_LABELS,
  PROFILE_EDIT_META,
  PROFILE_EDIT_SECTIONS,
  PROFILE_HEADER,
  PROFILE_VISIBILITY,
  RATING_OPTIONS,
  REMOTE_PREFERENCE_OPTIONS,
  SKILLS_SECTION,
  SKILL_OPTIONS,
  SKILL_ROW_LABELS,
  TECHNICAL_SKILLS,
  VISIBILITY_FORM_LABEL,
  VISIBILITY_OPTIONS,
  WORK_EXPERIENCE,
  WORK_EXPERIENCE_FORM_FIELDS,
} from "@/constants/engineer-profile";

const SELECT_CLASS =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

interface BasicInfoState {
  name: string;
  role: string;
  location: string;
  experienceYears: string;
  availability: string;
  birthDate: string;
  gender: string;
  phone: string;
  email: string;
  nearestStation: string;
  github: string;
  portfolioUrl: string;
}

interface TechnicalSkillRow {
  id: string;
  name: string;
  itssLevel: number;
  experienceYears: number;
}

interface RatedSkillRow {
  id: string;
  name: string;
  rating: number;
}

interface WorkExperienceRow {
  company: string;
  position: string;
  period: string;
  employmentType: string;
  summary: string;
  technologies: string;
}

interface EducationRow {
  school: string;
  department: string;
  period: string;
  description: string;
}

interface CertificationRow {
  name: string;
  issuer: string;
  acquiredDate: string;
  expirationDate: string;
  noExpiration: boolean;
}

interface PortfolioRow {
  title: string;
  role: string;
  description: string;
  skills: string;
  url: string;
  period: string;
}

interface LanguageRow {
  id: string;
  name: string;
  level: string;
}

interface PreferredConditionsState {
  contractTypes: string[];
  locations: string;
  remotePreference: string;
  desiredAnnualIncome: string;
  desiredMonthlyRate: string;
  desiredHourlyRate: string;
  availableFrom: string;
}

function useTechnicalSkillRows(initialRows: TechnicalSkillRow[]) {
  const [rows, setRows] = useState<TechnicalSkillRow[]>(initialRows);
  const counter = useRef(0);

  function add() {
    counter.current += 1;
    setRows((prev) => [
      ...prev,
      {
        id: `tech-new-${counter.current}`,
        name: SKILL_OPTIONS[0],
        itssLevel: 1,
        experienceYears: 0,
      },
    ]);
  }

  function remove(id: string) {
    setRows((prev) => prev.filter((row) => row.id !== id));
  }

  function update(id: string, patch: Partial<TechnicalSkillRow>) {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...patch } : row)),
    );
  }

  return { rows, add, remove, update };
}

function useRatedSkillRows(initialRows: RatedSkillRow[], idPrefix: string, defaultOption: string) {
  const [rows, setRows] = useState<RatedSkillRow[]>(initialRows);
  const counter = useRef(0);

  function add() {
    counter.current += 1;
    setRows((prev) => [
      ...prev,
      { id: `${idPrefix}-new-${counter.current}`, name: defaultOption, rating: 3 },
    ]);
  }

  function remove(id: string) {
    setRows((prev) => prev.filter((row) => row.id !== id));
  }

  function update(id: string, patch: Partial<RatedSkillRow>) {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...patch } : row)),
    );
  }

  return { rows, add, remove, update };
}

function useLanguageRows(initialRows: LanguageRow[]) {
  const [rows, setRows] = useState<LanguageRow[]>(initialRows);
  const counter = useRef(0);

  function add() {
    counter.current += 1;
    setRows((prev) => [
      ...prev,
      {
        id: `lang-new-${counter.current}`,
        name: LANGUAGE_OPTIONS[0],
        level: LANGUAGE_LEVEL_OPTIONS[0],
      },
    ]);
  }

  function remove(id: string) {
    setRows((prev) => prev.filter((row) => row.id !== id));
  }

  function update(id: string, patch: Partial<LanguageRow>) {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...patch } : row)),
    );
  }

  return { rows, add, remove, update };
}

interface TechnicalSkillEditorProps {
  rows: TechnicalSkillRow[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, patch: Partial<TechnicalSkillRow>) => void;
}

function TechnicalSkillEditor({
  rows,
  onAdd,
  onRemove,
  onChange,
}: TechnicalSkillEditorProps) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Code2 className="h-4 w-4 text-primary" aria-hidden="true" />
        {SKILLS_SECTION.technicalTitle}
      </legend>
      {rows.map((row) => (
        <div
          key={row.id}
          className="flex flex-wrap items-end gap-3 rounded-xl border border-border p-3"
        >
          <div className="flex min-w-40 flex-1 flex-col gap-1.5">
            <Label htmlFor={`${row.id}-name`}>{SKILL_ROW_LABELS.skillLabel}</Label>
            <select
              id={`${row.id}-name`}
              value={row.name}
              onChange={(event) => onChange(row.id, { name: event.target.value })}
              className={SELECT_CLASS}
            >
              {SKILL_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-28 flex-col gap-1.5">
            <Label htmlFor={`${row.id}-level`}>
              {SKILL_ROW_LABELS.itssLevelLabel}
            </Label>
            <select
              id={`${row.id}-level`}
              value={row.itssLevel}
              onChange={(event) =>
                onChange(row.id, { itssLevel: Number(event.target.value) })
              }
              className={SELECT_CLASS}
            >
              {ITSS_LEVEL_OPTIONS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-32 flex-col gap-1.5">
            <Label htmlFor={`${row.id}-years`}>
              {SKILL_ROW_LABELS.experienceYearsLabel}
            </Label>
            <Input
              id={`${row.id}-years`}
              type="number"
              min={0}
              max={50}
              value={row.experienceYears}
              onChange={(event) =>
                onChange(row.id, { experienceYears: Number(event.target.value) })
              }
              className="h-8"
            />
          </div>
          <button
            type="button"
            onClick={() => onRemove(row.id)}
            aria-label={`${SKILL_ROW_LABELS.removeLabel}：${row.name}`}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-destructive/10 hover:text-destructive focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-1.5 text-xs font-semibold text-primary transition-colors duration-200 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        {SKILL_ROW_LABELS.addTechnicalLabel}
      </button>
    </fieldset>
  );
}

interface RatedSkillEditorProps {
  legend: string;
  legendIcon: typeof Users;
  addLabel: string;
  options: readonly string[];
  rows: RatedSkillRow[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, patch: Partial<RatedSkillRow>) => void;
}

function RatedSkillEditor({
  legend,
  legendIcon: LegendIcon,
  addLabel,
  options,
  rows,
  onAdd,
  onRemove,
  onChange,
}: RatedSkillEditorProps) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <LegendIcon className="h-4 w-4 text-primary" aria-hidden="true" />
        {legend}
      </legend>
      {rows.map((row) => (
        <div
          key={row.id}
          className="flex flex-wrap items-end gap-3 rounded-xl border border-border p-3"
        >
          <div className="flex min-w-40 flex-1 flex-col gap-1.5">
            <Label htmlFor={`${row.id}-name`}>{SKILL_ROW_LABELS.skillLabel}</Label>
            <select
              id={`${row.id}-name`}
              value={row.name}
              onChange={(event) => onChange(row.id, { name: event.target.value })}
              className={SELECT_CLASS}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-28 flex-col gap-1.5">
            <Label htmlFor={`${row.id}-rating`}>
              {SKILL_ROW_LABELS.ratingLabel}
            </Label>
            <select
              id={`${row.id}-rating`}
              value={row.rating}
              onChange={(event) =>
                onChange(row.id, { rating: Number(event.target.value) })
              }
              className={SELECT_CLASS}
            >
              {RATING_OPTIONS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => onRemove(row.id)}
            aria-label={`${SKILL_ROW_LABELS.removeLabel}：${row.name}`}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-destructive/10 hover:text-destructive focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-1.5 text-xs font-semibold text-primary transition-colors duration-200 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        {addLabel}
      </button>
    </fieldset>
  );
}

export function ProfileEditForm() {
  const [basicInfo, setBasicInfo] = useState<BasicInfoState>(() => ({
    name: PROFILE_HEADER.name,
    role: PROFILE_HEADER.role,
    location: PROFILE_HEADER.location,
    experienceYears: PROFILE_HEADER.experienceYears.replace("年", ""),
    availability: PROFILE_HEADER.availability,
    birthDate: "1994-05-12",
    gender: BASIC_INFO.gender,
    phone: BASIC_INFO.phone,
    email: BASIC_INFO.email,
    nearestStation: BASIC_INFO.nearestStation,
    github: BASIC_INFO.github,
    portfolioUrl: BASIC_INFO.portfolioUrl,
  }));

  function updateBasicInfo<K extends keyof BasicInfoState>(
    key: K,
    value: BasicInfoState[K],
  ) {
    setBasicInfo((prev) => ({ ...prev, [key]: value }));
  }

  const [bio, setBio] = useState<string>(BASIC_INFO.bio);

  const technicalSkills = useTechnicalSkillRows(
    TECHNICAL_SKILLS.map((skill, index) => ({
      id: `tech-${index}`,
      name: skill.name,
      itssLevel: skill.itssLevel,
      experienceYears: skill.experienceYears,
    })),
  );
  const businessSkills = useRatedSkillRows(
    BUSINESS_SKILLS.map((skill, index) => ({
      id: `business-${index}`,
      name: skill.name,
      rating: skill.rating,
    })),
    "business",
    BUSINESS_SKILL_OPTIONS[0],
  );

  const [workExperience, setWorkExperience] = useState<WorkExperienceRow[]>(() =>
    WORK_EXPERIENCE.map((item) => ({
      ...item,
      technologies: item.technologies.join(", "),
    })),
  );
  function updateWorkExperience(index: number, patch: Partial<WorkExperienceRow>) {
    setWorkExperience((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );
  }

  const [education, setEducation] = useState<EducationRow[]>(() => [...EDUCATION]);
  function updateEducation(index: number, patch: Partial<EducationRow>) {
    setEducation((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );
  }

  const [certifications, setCertifications] = useState<CertificationRow[]>(() =>
    CERTIFICATIONS.map((cert) => ({
      name: cert.name,
      issuer: cert.issuer,
      acquiredDate: cert.acquiredDate,
      expirationDate: cert.expirationDate ?? "",
      noExpiration: cert.expirationDate === null,
    })),
  );
  function updateCertification(index: number, patch: Partial<CertificationRow>) {
    setCertifications((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );
  }

  const [portfolio, setPortfolio] = useState<PortfolioRow[]>(() =>
    PORTFOLIO_PROJECTS.map((project) => ({
      ...project,
      skills: project.skills.join(", "),
    })),
  );
  function updatePortfolio(index: number, patch: Partial<PortfolioRow>) {
    setPortfolio((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );
  }

  const languages = useLanguageRows(
    LANGUAGES.map((lang, index) => ({
      id: `lang-${index}`,
      name: lang.name,
      level: lang.level,
    })),
  );

  const [preferredConditions, setPreferredConditions] =
    useState<PreferredConditionsState>(() => ({
      contractTypes: [...PREFERRED_CONDITIONS.contractTypes],
      locations: PREFERRED_CONDITIONS.locations.join(", "),
      remotePreference: PREFERRED_CONDITIONS.remotePreference,
      desiredAnnualIncome: PREFERRED_CONDITIONS.desiredAnnualIncome,
      desiredMonthlyRate: PREFERRED_CONDITIONS.desiredMonthlyRate,
      desiredHourlyRate: PREFERRED_CONDITIONS.desiredHourlyRate,
      availableFrom: "2026-08-01",
    }));

  function toggleContractType(type: string, checked: boolean) {
    setPreferredConditions((prev) => ({
      ...prev,
      contractTypes: checked
        ? [...prev.contractTypes, type]
        : prev.contractTypes.filter((item) => item !== type),
    }));
  }

  const [visibility, setVisibility] = useState<string>(PROFILE_VISIBILITY.status);
  const [saved, setSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-4xl flex-col gap-6"
    >
      <ProfileSection title={PROFILE_EDIT_SECTIONS.basicInfo} icon={Users}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="basic-name">{BASIC_INFO_FORM_FIELDS.name.label}</Label>
            <Input
              id="basic-name"
              type="text"
              value={basicInfo.name}
              placeholder={BASIC_INFO_FORM_FIELDS.name.placeholder}
              onChange={(event) => updateBasicInfo("name", event.target.value)}
              className="h-9"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="basic-role">{BASIC_INFO_FORM_FIELDS.role.label}</Label>
            <Input
              id="basic-role"
              type="text"
              value={basicInfo.role}
              placeholder={BASIC_INFO_FORM_FIELDS.role.placeholder}
              onChange={(event) => updateBasicInfo("role", event.target.value)}
              className="h-9"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="basic-location">
              {BASIC_INFO_FORM_FIELDS.location.label}
            </Label>
            <Input
              id="basic-location"
              type="text"
              value={basicInfo.location}
              placeholder={BASIC_INFO_FORM_FIELDS.location.placeholder}
              onChange={(event) => updateBasicInfo("location", event.target.value)}
              className="h-9"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="basic-experience-years">
              {BASIC_INFO_FORM_FIELDS.experienceYears.label}
            </Label>
            <Input
              id="basic-experience-years"
              type="number"
              min={0}
              max={60}
              value={basicInfo.experienceYears}
              onChange={(event) =>
                updateBasicInfo("experienceYears", event.target.value)
              }
              className="h-9"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="basic-availability">
              {BASIC_INFO_FORM_FIELDS.availability.label}
            </Label>
            <select
              id="basic-availability"
              value={basicInfo.availability}
              onChange={(event) =>
                updateBasicInfo("availability", event.target.value)
              }
              className={SELECT_CLASS.replace("h-8", "h-9")}
            >
              {AVAILABILITY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="basic-birth-date">
              {BASIC_INFO_FORM_FIELDS.birthDate.label}
            </Label>
            <Input
              id="basic-birth-date"
              type="date"
              value={basicInfo.birthDate}
              onChange={(event) => updateBasicInfo("birthDate", event.target.value)}
              className="h-9"
            />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-sm leading-none font-medium">
              {BASIC_INFO_FORM_FIELDS.gender.label}
            </span>
            <RadioGroup
              value={basicInfo.gender}
              onValueChange={(value) => updateBasicInfo("gender", value)}
              aria-label={BASIC_INFO_FORM_FIELDS.gender.label}
              className="grid grid-cols-1 gap-2 sm:grid-cols-3"
            >
              {GENDER_OPTIONS.map((option) => (
                <label
                  key={option}
                  htmlFor={`gender-${option}`}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground has-[[data-checked]]:border-primary has-[[data-checked]]:bg-primary/5"
                >
                  <RadioGroupItem value={option} id={`gender-${option}`} />
                  {option}
                </label>
              ))}
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="basic-phone">{BASIC_INFO_FORM_FIELDS.phone.label}</Label>
            <Input
              id="basic-phone"
              type="tel"
              value={basicInfo.phone}
              placeholder={BASIC_INFO_FORM_FIELDS.phone.placeholder}
              onChange={(event) => updateBasicInfo("phone", event.target.value)}
              className="h-9"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="basic-email">{BASIC_INFO_FORM_FIELDS.email.label}</Label>
            <Input
              id="basic-email"
              type="email"
              value={basicInfo.email}
              placeholder={BASIC_INFO_FORM_FIELDS.email.placeholder}
              onChange={(event) => updateBasicInfo("email", event.target.value)}
              className="h-9"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="basic-nearest-station">
              {BASIC_INFO_FORM_FIELDS.nearestStation.label}
            </Label>
            <Input
              id="basic-nearest-station"
              type="text"
              value={basicInfo.nearestStation}
              placeholder={BASIC_INFO_FORM_FIELDS.nearestStation.placeholder}
              onChange={(event) =>
                updateBasicInfo("nearestStation", event.target.value)
              }
              className="h-9"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="basic-github">{BASIC_INFO_FORM_FIELDS.github.label}</Label>
            <Input
              id="basic-github"
              type="text"
              value={basicInfo.github}
              placeholder={BASIC_INFO_FORM_FIELDS.github.placeholder}
              onChange={(event) => updateBasicInfo("github", event.target.value)}
              className="h-9"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="basic-portfolio-url">
              {BASIC_INFO_FORM_FIELDS.portfolioUrl.label}
            </Label>
            <Input
              id="basic-portfolio-url"
              type="text"
              value={basicInfo.portfolioUrl}
              placeholder={BASIC_INFO_FORM_FIELDS.portfolioUrl.placeholder}
              onChange={(event) =>
                updateBasicInfo("portfolioUrl", event.target.value)
              }
              className="h-9"
            />
          </div>
        </div>
      </ProfileSection>

      <ProfileSection title={PROFILE_EDIT_SECTIONS.bio} icon={Users}>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="bio">{BASIC_INFO_LABELS.bio}</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            rows={5}
          />
        </div>
      </ProfileSection>

      <ProfileSection title={PROFILE_EDIT_SECTIONS.skills} icon={Code2}>
        <div className="flex flex-col gap-8">
          <TechnicalSkillEditor
            rows={technicalSkills.rows}
            onAdd={technicalSkills.add}
            onRemove={technicalSkills.remove}
            onChange={technicalSkills.update}
          />
          <fieldset className="flex flex-col gap-3">
            <legend className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Users className="h-4 w-4 text-primary" aria-hidden="true" />
              {SKILLS_SECTION.humanTitle}
            </legend>
            <div className="rounded-xl border border-dashed border-border p-4">
              <p className="text-sm text-muted-foreground">
                {HUMAN_SKILL_EDIT_NOTE.description}
              </p>
              <Link
                href={HUMAN_SKILL_EDIT_NOTE.ctaHref}
                className="mt-3 inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {HUMAN_SKILL_EDIT_NOTE.ctaLabel}
              </Link>
            </div>
          </fieldset>
          <RatedSkillEditor
            legend={SKILLS_SECTION.businessTitle}
            legendIcon={BrainCircuit}
            addLabel={SKILL_ROW_LABELS.addBusinessLabel}
            options={BUSINESS_SKILL_OPTIONS}
            rows={businessSkills.rows}
            onAdd={businessSkills.add}
            onRemove={businessSkills.remove}
            onChange={businessSkills.update}
          />
        </div>
      </ProfileSection>

      <ProfileSection
        title={PROFILE_EDIT_SECTIONS.experience}
        icon={BriefcaseBusiness}
      >
        <div className="flex flex-col gap-5">
          {workExperience.map((row, index) => (
            <div
               
              key={index}
              className="flex flex-col gap-4 rounded-xl border border-border p-4"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={`exp-company-${index}`}>
                    {WORK_EXPERIENCE_FORM_FIELDS.company}
                  </Label>
                  <Input
                    id={`exp-company-${index}`}
                    type="text"
                    value={row.company}
                    onChange={(event) =>
                      updateWorkExperience(index, { company: event.target.value })
                    }
                    className="h-9"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={`exp-position-${index}`}>
                    {WORK_EXPERIENCE_FORM_FIELDS.position}
                  </Label>
                  <Input
                    id={`exp-position-${index}`}
                    type="text"
                    value={row.position}
                    onChange={(event) =>
                      updateWorkExperience(index, { position: event.target.value })
                    }
                    className="h-9"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={`exp-period-${index}`}>
                    {WORK_EXPERIENCE_FORM_FIELDS.period}
                  </Label>
                  <Input
                    id={`exp-period-${index}`}
                    type="text"
                    value={row.period}
                    onChange={(event) =>
                      updateWorkExperience(index, { period: event.target.value })
                    }
                    className="h-9"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={`exp-employment-type-${index}`}>
                    {WORK_EXPERIENCE_FORM_FIELDS.employmentType}
                  </Label>
                  <select
                    id={`exp-employment-type-${index}`}
                    value={row.employmentType}
                    onChange={(event) =>
                      updateWorkExperience(index, {
                        employmentType: event.target.value,
                      })
                    }
                    className={SELECT_CLASS.replace("h-8", "h-9")}
                  >
                    {EMPLOYMENT_TYPE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`exp-summary-${index}`}>
                  {WORK_EXPERIENCE_FORM_FIELDS.summary}
                </Label>
                <Textarea
                  id={`exp-summary-${index}`}
                  value={row.summary}
                  onChange={(event) =>
                    updateWorkExperience(index, { summary: event.target.value })
                  }
                  rows={3}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`exp-technologies-${index}`}>
                  {WORK_EXPERIENCE_FORM_FIELDS.technologies}
                </Label>
                <Input
                  id={`exp-technologies-${index}`}
                  type="text"
                  value={row.technologies}
                  onChange={(event) =>
                    updateWorkExperience(index, { technologies: event.target.value })
                  }
                  className="h-9"
                />
              </div>
            </div>
          ))}
        </div>
      </ProfileSection>

      <ProfileSection title={PROFILE_EDIT_SECTIONS.education} icon={GraduationCap}>
        <div className="flex flex-col gap-5">
          {education.map((row, index) => (
            <div
               
              key={index}
              className="flex flex-col gap-4 rounded-xl border border-border p-4"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={`edu-school-${index}`}>
                    {EDUCATION_FORM_FIELDS.school}
                  </Label>
                  <Input
                    id={`edu-school-${index}`}
                    type="text"
                    value={row.school}
                    onChange={(event) =>
                      updateEducation(index, { school: event.target.value })
                    }
                    className="h-9"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={`edu-department-${index}`}>
                    {EDUCATION_FORM_FIELDS.department}
                  </Label>
                  <Input
                    id={`edu-department-${index}`}
                    type="text"
                    value={row.department}
                    onChange={(event) =>
                      updateEducation(index, { department: event.target.value })
                    }
                    className="h-9"
                  />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor={`edu-period-${index}`}>
                    {EDUCATION_FORM_FIELDS.period}
                  </Label>
                  <Input
                    id={`edu-period-${index}`}
                    type="text"
                    value={row.period}
                    onChange={(event) =>
                      updateEducation(index, { period: event.target.value })
                    }
                    className="h-9"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`edu-description-${index}`}>
                  {EDUCATION_FORM_FIELDS.description}
                </Label>
                <Textarea
                  id={`edu-description-${index}`}
                  value={row.description}
                  onChange={(event) =>
                    updateEducation(index, { description: event.target.value })
                  }
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      </ProfileSection>

      <ProfileSection title={PROFILE_EDIT_SECTIONS.certifications} icon={Award}>
        <div className="flex flex-col gap-5">
          {certifications.map((row, index) => (
            <div
               
              key={index}
              className="flex flex-col gap-4 rounded-xl border border-border p-4"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={`cert-name-${index}`}>
                    {CERTIFICATION_FORM_FIELDS.name}
                  </Label>
                  <Input
                    id={`cert-name-${index}`}
                    type="text"
                    value={row.name}
                    onChange={(event) =>
                      updateCertification(index, { name: event.target.value })
                    }
                    className="h-9"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={`cert-issuer-${index}`}>
                    {CERTIFICATION_FORM_FIELDS.issuer}
                  </Label>
                  <Input
                    id={`cert-issuer-${index}`}
                    type="text"
                    value={row.issuer}
                    onChange={(event) =>
                      updateCertification(index, { issuer: event.target.value })
                    }
                    className="h-9"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={`cert-acquired-${index}`}>
                    {CERTIFICATION_FORM_FIELDS.acquiredDate}
                  </Label>
                  <Input
                    id={`cert-acquired-${index}`}
                    type="text"
                    value={row.acquiredDate}
                    onChange={(event) =>
                      updateCertification(index, { acquiredDate: event.target.value })
                    }
                    className="h-9"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={`cert-expiration-${index}`}>
                    {CERTIFICATION_FORM_FIELDS.expirationDate}
                  </Label>
                  <Input
                    id={`cert-expiration-${index}`}
                    type="text"
                    value={row.expirationDate}
                    disabled={row.noExpiration}
                    onChange={(event) =>
                      updateCertification(index, {
                        expirationDate: event.target.value,
                      })
                    }
                    className="h-9"
                  />
                </div>
              </div>
              <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-foreground">
                <Checkbox
                  checked={row.noExpiration}
                  onCheckedChange={(checked) =>
                    updateCertification(index, {
                      noExpiration: checked,
                      expirationDate: checked ? "" : row.expirationDate,
                    })
                  }
                />
                {CERTIFICATION_FORM_FIELDS.noExpiration}
              </label>
            </div>
          ))}
        </div>
      </ProfileSection>

      <ProfileSection title={PROFILE_EDIT_SECTIONS.portfolio} icon={FolderGit2}>
        <div className="flex flex-col gap-5">
          {portfolio.map((row, index) => (
            <div
               
              key={index}
              className="flex flex-col gap-4 rounded-xl border border-border p-4"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={`portfolio-title-${index}`}>
                    {PORTFOLIO_FORM_FIELDS.title}
                  </Label>
                  <Input
                    id={`portfolio-title-${index}`}
                    type="text"
                    value={row.title}
                    onChange={(event) =>
                      updatePortfolio(index, { title: event.target.value })
                    }
                    className="h-9"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={`portfolio-role-${index}`}>
                    {PORTFOLIO_FORM_FIELDS.role}
                  </Label>
                  <Input
                    id={`portfolio-role-${index}`}
                    type="text"
                    value={row.role}
                    onChange={(event) =>
                      updatePortfolio(index, { role: event.target.value })
                    }
                    className="h-9"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={`portfolio-url-${index}`}>
                    {PORTFOLIO_FORM_FIELDS.url}
                  </Label>
                  <Input
                    id={`portfolio-url-${index}`}
                    type="url"
                    value={row.url}
                    onChange={(event) =>
                      updatePortfolio(index, { url: event.target.value })
                    }
                    className="h-9"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={`portfolio-period-${index}`}>
                    {PORTFOLIO_FORM_FIELDS.period}
                  </Label>
                  <Input
                    id={`portfolio-period-${index}`}
                    type="text"
                    value={row.period}
                    onChange={(event) =>
                      updatePortfolio(index, { period: event.target.value })
                    }
                    className="h-9"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`portfolio-description-${index}`}>
                  {PORTFOLIO_FORM_FIELDS.description}
                </Label>
                <Textarea
                  id={`portfolio-description-${index}`}
                  value={row.description}
                  onChange={(event) =>
                    updatePortfolio(index, { description: event.target.value })
                  }
                  rows={3}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`portfolio-skills-${index}`}>
                  {PORTFOLIO_FORM_FIELDS.skills}
                </Label>
                <Input
                  id={`portfolio-skills-${index}`}
                  type="text"
                  value={row.skills}
                  onChange={(event) =>
                    updatePortfolio(index, { skills: event.target.value })
                  }
                  className="h-9"
                />
              </div>
            </div>
          ))}
        </div>
      </ProfileSection>

      <ProfileSection title={PROFILE_EDIT_SECTIONS.languages} icon={LanguagesIcon}>
        <div className="flex flex-col gap-3">
          {languages.rows.map((row) => (
            <div
              key={row.id}
              className="flex flex-wrap items-end gap-3 rounded-xl border border-border p-3"
            >
              <div className="flex min-w-40 flex-1 flex-col gap-1.5">
                <Label htmlFor={`${row.id}-name`}>
                  {LANGUAGE_ROW_LABELS.languageLabel}
                </Label>
                <select
                  id={`${row.id}-name`}
                  value={row.name}
                  onChange={(event) =>
                    languages.update(row.id, { name: event.target.value })
                  }
                  className={SELECT_CLASS.replace("h-8", "h-9")}
                >
                  {LANGUAGE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex w-48 flex-col gap-1.5">
                <Label htmlFor={`${row.id}-level`}>
                  {LANGUAGE_ROW_LABELS.levelLabel}
                </Label>
                <select
                  id={`${row.id}-level`}
                  value={row.level}
                  onChange={(event) =>
                    languages.update(row.id, { level: event.target.value })
                  }
                  className={SELECT_CLASS.replace("h-8", "h-9")}
                >
                  {LANGUAGE_LEVEL_OPTIONS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => languages.remove(row.id)}
                aria-label={`${LANGUAGE_ROW_LABELS.removeLabel}：${row.name}`}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-destructive/10 hover:text-destructive focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={languages.add}
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-1.5 text-xs font-semibold text-primary transition-colors duration-200 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {LANGUAGE_ROW_LABELS.addLabel}
          </button>
        </div>
      </ProfileSection>

      <ProfileSection
        title={PROFILE_EDIT_SECTIONS.preferredConditions}
        icon={MapPin}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-sm leading-none font-medium">
              {PREFERRED_CONDITIONS_FORM_FIELDS.contractTypes}
            </span>
            <div className="flex flex-wrap gap-4">
              {CONTRACT_TYPE_OPTIONS.map((type) => (
                <label
                  key={type}
                  className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
                >
                  <Checkbox
                    checked={preferredConditions.contractTypes.includes(type)}
                    onCheckedChange={(checked) => toggleContractType(type, checked)}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor="pref-locations">
              {PREFERRED_CONDITIONS_FORM_FIELDS.locations}
            </Label>
            <Input
              id="pref-locations"
              type="text"
              value={preferredConditions.locations}
              onChange={(event) =>
                setPreferredConditions((prev) => ({
                  ...prev,
                  locations: event.target.value,
                }))
              }
              className="h-9"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pref-remote">
              {PREFERRED_CONDITIONS_FORM_FIELDS.remotePreference}
            </Label>
            <select
              id="pref-remote"
              value={preferredConditions.remotePreference}
              onChange={(event) =>
                setPreferredConditions((prev) => ({
                  ...prev,
                  remotePreference: event.target.value,
                }))
              }
              className={SELECT_CLASS.replace("h-8", "h-9")}
            >
              {REMOTE_PREFERENCE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pref-available-from">
              {PREFERRED_CONDITIONS_FORM_FIELDS.availableFrom}
            </Label>
            <Input
              id="pref-available-from"
              type="date"
              value={preferredConditions.availableFrom}
              onChange={(event) =>
                setPreferredConditions((prev) => ({
                  ...prev,
                  availableFrom: event.target.value,
                }))
              }
              className="h-9"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pref-annual-income">
              {PREFERRED_CONDITIONS_FORM_FIELDS.desiredAnnualIncome}
            </Label>
            <Input
              id="pref-annual-income"
              type="text"
              value={preferredConditions.desiredAnnualIncome}
              onChange={(event) =>
                setPreferredConditions((prev) => ({
                  ...prev,
                  desiredAnnualIncome: event.target.value,
                }))
              }
              className="h-9"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pref-monthly-rate">
              {PREFERRED_CONDITIONS_FORM_FIELDS.desiredMonthlyRate}
            </Label>
            <Input
              id="pref-monthly-rate"
              type="text"
              value={preferredConditions.desiredMonthlyRate}
              onChange={(event) =>
                setPreferredConditions((prev) => ({
                  ...prev,
                  desiredMonthlyRate: event.target.value,
                }))
              }
              className="h-9"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pref-hourly-rate">
              {PREFERRED_CONDITIONS_FORM_FIELDS.desiredHourlyRate}
            </Label>
            <Input
              id="pref-hourly-rate"
              type="text"
              value={preferredConditions.desiredHourlyRate}
              onChange={(event) =>
                setPreferredConditions((prev) => ({
                  ...prev,
                  desiredHourlyRate: event.target.value,
                }))
              }
              className="h-9"
            />
          </div>
        </div>
      </ProfileSection>

      <ProfileSection title={PROFILE_EDIT_SECTIONS.visibility} icon={Eye}>
        <RadioGroup
          value={visibility}
          onValueChange={setVisibility}
          aria-label={VISIBILITY_FORM_LABEL}
          className="grid grid-cols-1 gap-2 sm:grid-cols-2"
        >
          {VISIBILITY_OPTIONS.map((option) => (
            <label
              key={option}
              htmlFor={`visibility-${option}`}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground has-[[data-checked]]:border-primary has-[[data-checked]]:bg-primary/5"
            >
              <RadioGroupItem value={option} id={`visibility-${option}`} />
              {option}
            </label>
          ))}
        </RadioGroup>
        <p className="mt-3 text-sm text-muted-foreground">
          {PROFILE_VISIBILITY.description}
        </p>
      </ProfileSection>

      {showPreview && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                {PREVIEW_PANEL_LABELS.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {PREVIEW_PANEL_LABELS.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              aria-label={PREVIEW_PANEL_LABELS.closeLabel}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">
                {BASIC_INFO_FORM_FIELDS.name.label}
              </dt>
              <dd className="text-sm font-semibold text-foreground">
                {basicInfo.name}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">
                {BASIC_INFO_FORM_FIELDS.role.label}
              </dt>
              <dd className="text-sm font-semibold text-foreground">
                {basicInfo.role}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs text-muted-foreground">
                {BASIC_INFO_LABELS.bio}
              </dt>
              <dd className="text-sm text-foreground">{bio}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">
                {SKILLS_SECTION.technicalTitle}
              </dt>
              <dd className="text-sm font-semibold text-foreground">
                {technicalSkills.rows.length}件登録
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">
                {PROFILE_EDIT_SECTIONS.visibility}
              </dt>
              <dd className="text-sm font-semibold text-foreground">{visibility}</dd>
            </div>
          </dl>
        </div>
      )}

      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm">
        {saved && (
          <div className="flex items-center justify-between gap-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            <span>{PROFILE_EDIT_META.saveSuccessMessage}</span>
            <button
              type="button"
              onClick={() => setSaved(false)}
              aria-label="保存メッセージを閉じる"
              className="shrink-0 rounded-lg p-1 transition-colors duration-200 hover:bg-green-100 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
        <p className="text-xs text-muted-foreground">{PROFILE_EDIT_META.demoNote}</p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {PROFILE_EDIT_META.saveLabel}
          </button>
          <button
            type="button"
            onClick={() => setShowPreview((prev) => !prev)}
            aria-pressed={showPreview}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            {PROFILE_EDIT_META.previewLabel}
          </button>
          <Link
            href={PROFILE_EDIT_META.cancelHref}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {PROFILE_EDIT_META.cancelLabel}
          </Link>
        </div>
      </div>
    </form>
  );
}
