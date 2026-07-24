"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

/** Interactive 1-5 star picker for the Company review-creation form. */
export function StarRatingInput({ value, onChange, disabled }: StarRatingInputProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const displayValue = hovered ?? value;

  return (
    <div role="radiogroup" aria-label="評価" className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star}`}
          disabled={disabled}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onChange(star)}
          className="rounded p-0.5 transition-transform duration-150 hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Star
            className={cn(
              "h-7 w-7",
              star <= displayValue ? "fill-amber-400 text-amber-400" : "fill-none text-muted-foreground/40",
            )}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}
