interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  headingId?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  headingId,
}: SectionHeadingProps) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto flex max-w-2xl flex-col items-center gap-3 text-center"
          : "flex max-w-2xl flex-col gap-3 text-left"
      }
    >
      {label && (
        <span className="text-sm font-semibold tracking-wide text-primary uppercase">
          {label}
        </span>
      )}
      <h2
        id={headingId}
        className="text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed whitespace-pre-line text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
