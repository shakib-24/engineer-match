interface LanguageListItem {
  id: string;
  languageName: string;
  levelLabel: string;
}

interface LanguageListProps {
  items: LanguageListItem[];
}

/** Shared between the engineer's own profile page and the company detail view. */
export function LanguageList({ items }: LanguageListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-between rounded-xl border border-border px-4 py-3"
        >
          <span className="text-sm font-semibold text-foreground">{item.languageName}</span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {item.levelLabel}
          </span>
        </li>
      ))}
    </ul>
  );
}
