interface EducationListItem {
  id: string;
  schoolName: string;
  department: string | null;
  period: string | null;
  description: string | null;
}

interface EducationListProps {
  items: EducationListItem[];
}

/** Shared between the engineer's own profile page and the company detail view. */
export function EducationList({ items }: EducationListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((item) => (
        <li key={item.id} className="rounded-xl border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground">{item.schoolName}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {[item.department, item.period].filter(Boolean).join(" ・ ")}
          </p>
          {item.description && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
