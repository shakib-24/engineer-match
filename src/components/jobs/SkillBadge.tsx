interface SkillBadgeProps {
  label: string;
  tone?: "default" | "required" | "preferred";
}

const TONE_STYLES: Record<NonNullable<SkillBadgeProps["tone"]>, string> = {
  default: "bg-muted text-muted-foreground",
  required: "bg-primary/10 text-primary",
  preferred: "bg-accent text-accent-foreground",
};

export function SkillBadge({ label, tone = "default" }: SkillBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${TONE_STYLES[tone]}`}
    >
      {label}
    </span>
  );
}
