import Link from "next/link";
import { PROFILE_COMPLETION_META } from "@/constants/engineer-profile";

interface ProfileCompletionProps {
  percentage: number;
  missingItems: string[];
}

export function ProfileCompletion({ percentage, missingItems }: ProfileCompletionProps) {
  const { title, description, ctaLabel, ctaHref } = PROFILE_COMPLETION_META;

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>

      <div className="mt-5">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">達成度</span>
          <span className="font-semibold text-primary">{percentage}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={title}
          className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white"
        >
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {missingItems.length > 0 && (
        <ul className="mt-4 flex flex-col gap-1.5">
          {missingItems.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      )}

      <Link
        href={ctaHref}
        className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
