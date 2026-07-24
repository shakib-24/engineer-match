import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingDisplayProps {
  rating: number;
  size?: "sm" | "md";
  className?: string;
}

/** Read-only 5-star display. Supports fractional ratings (e.g. 4.6 average). */
export function StarRatingDisplay({ rating, size = "md", className }: StarRatingDisplayProps) {
  const dimension = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      aria-label={`評価 ${rating.toFixed(1)} / 5`}
    >
      {[1, 2, 3, 4, 5].map((value) => {
        const filled = rating >= value - 0.25;
        return (
          <Star
            key={value}
            className={cn(dimension, filled ? "fill-amber-400 text-amber-400" : "fill-none text-muted-foreground/40")}
            aria-hidden="true"
          />
        );
      })}
    </span>
  );
}
