import { BrainCircuit, Code2, Users } from "lucide-react";
import { SkillCard } from "@/components/engineer/profile/SkillCard";
import {
  ENGINEER_DETAIL_META,
  SKILLS_SECTION_LABELS,
  type EngineerRatedSkill,
  type EngineerTechnicalSkill,
} from "@/constants/company-engineers";

interface EngineerProfileSkillsProps {
  technicalSkills: EngineerTechnicalSkill[];
  humanSkills: EngineerRatedSkill[];
  businessSkills: EngineerRatedSkill[];
}

export function EngineerProfileSkills({
  technicalSkills,
  humanSkills,
  businessSkills,
}: EngineerProfileSkillsProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Code2 className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">
          {ENGINEER_DETAIL_META.skillsTitle}
        </h3>
      </div>

      <div className="mt-5 flex flex-col gap-8">
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Code2 className="h-4 w-4 text-primary" aria-hidden="true" />
            {SKILLS_SECTION_LABELS.technicalTitle}
          </h4>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {technicalSkills.map((skill) => (
              <SkillCard
                key={skill.name}
                variant="technical"
                name={skill.name}
                itssLevel={skill.itssLevel as 1 | 2 | 3 | 4 | 5 | 6 | 7}
                experienceYears={skill.experienceYears}
              />
            ))}
          </div>
        </div>

        {humanSkills.length > 0 && (
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Users className="h-4 w-4 text-primary" aria-hidden="true" />
              {SKILLS_SECTION_LABELS.humanTitle}
            </h4>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {humanSkills.map((skill) => (
                <SkillCard
                  key={skill.name}
                  variant="rated"
                  name={skill.name}
                  rating={skill.rating as 1 | 2 | 3 | 4 | 5}
                />
              ))}
            </div>
          </div>
        )}

        {businessSkills.length > 0 && (
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <BrainCircuit className="h-4 w-4 text-primary" aria-hidden="true" />
              {SKILLS_SECTION_LABELS.businessTitle}
            </h4>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {businessSkills.map((skill) => (
                <SkillCard
                  key={skill.name}
                  variant="rated"
                  name={skill.name}
                  rating={skill.rating as 1 | 2 | 3 | 4 | 5}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
