import { ITSS_LEVELS } from "@/constants/lp";

interface ItssBadgeProps {
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  size?: "sm" | "md";
}

const LEVEL_STYLES: Record<number, string> = {
  1: "bg-indigo-100 text-indigo-600",
  2: "bg-indigo-200 text-indigo-700",
  3: "bg-indigo-300 text-indigo-800",
  4: "bg-indigo-400 text-white",
  5: "bg-indigo-500 text-white",
  6: "bg-indigo-600 text-white",
  7: "bg-indigo-700 text-white",
};

export function ItssBadge({ level, size = "md" }: ItssBadgeProps) {
  const levelInfo = ITSS_LEVELS.find((item) => item.level === level);
  const sizeStyles = size === "sm" ? "h-7 w-7 text-xs" : "h-9 w-9 text-sm";

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold ${sizeStyles} ${LEVEL_STYLES[level]}`}
      aria-label={`ITSSレベル ${level}${levelInfo ? `（${levelInfo.title}）` : ""}`}
      title={levelInfo?.title}
    >
      {level}
    </span>
  );
}
