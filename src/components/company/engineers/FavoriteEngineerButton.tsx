"use client";

import { Heart } from "lucide-react";
import { ENGINEER_CARD_LABELS } from "@/constants/company-engineers";
import { cn } from "@/lib/utils";

interface FavoriteEngineerButtonProps {
  isFavorited: boolean;
  onToggle: () => void;
  engineerName: string;
  className?: string;
  size?: "sm" | "md";
}

export function FavoriteEngineerButton({
  isFavorited,
  onToggle,
  engineerName,
  className,
  size = "md",
}: FavoriteEngineerButtonProps) {
  const label = isFavorited
    ? `${ENGINEER_CARD_LABELS.favoritedLabel}：${engineerName}`
    : `${ENGINEER_CARD_LABELS.favoriteLabel}：${engineerName}`;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isFavorited}
      aria-label={label}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
        size === "sm" ? "h-9 w-9" : "h-10 w-10",
        className,
      )}
    >
      <Heart
        className={cn(size === "sm" ? "h-4 w-4" : "h-5 w-5", isFavorited && "fill-primary text-primary")}
        aria-hidden="true"
      />
    </button>
  );
}
