"use client";

import { useState } from "react";
import { FavoriteJobCard } from "@/components/favorites/FavoriteJobCard";
import { FavoriteEmptyState } from "@/components/favorites/FavoriteEmptyState";
import { RemoveFavoriteDialog } from "@/components/favorites/RemoveFavoriteDialog";
import {
  FAVORITE_RESULTS_META,
  REMOVE_FAVORITE_DIALOG_LABELS,
  REMOVE_FAVORITE_TOAST_MESSAGE,
} from "@/constants/favorites";
import { removeFavorite, type FavoriteOpportunity } from "@/lib/engineer/favorites";
import { createClient } from "@/lib/supabase/client";

interface FavoriteListProps {
  favorites: FavoriteOpportunity[];
  userId: string;
}

export function FavoriteList({ favorites: initialFavorites, userId }: FavoriteListProps) {
  const [favorites, setFavorites] = useState(initialFavorites);
  const [removeTargetId, setRemoveTargetId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function handleRequestRemove(opportunityId: string) {
    setRemoveTargetId(opportunityId);
  }

  function handleCancelRemove() {
    setRemoveTargetId(null);
  }

  async function handleConfirmRemove() {
    const targetId = removeTargetId;
    setRemoveTargetId(null);
    if (!targetId) return;

    const supabase = createClient();
    const { error } = await removeFavorite(supabase, userId, targetId);

    if (error) {
      console.error("[favorite-list] remove failed:", error);
      setToastMessage(REMOVE_FAVORITE_DIALOG_LABELS.errorMessage);
      window.setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    setFavorites((prev) => prev.filter((item) => item.id !== targetId));
    setToastMessage(REMOVE_FAVORITE_TOAST_MESSAGE);
    window.setTimeout(() => setToastMessage(null), 3000);
  }

  if (favorites.length === 0) {
    return <FavoriteEmptyState />;
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-muted-foreground">
        {favorites.length}
        {FAVORITE_RESULTS_META.resultsSuffix}
      </p>

      <ul className="flex flex-col gap-4">
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            <FavoriteJobCard favorite={favorite} onRequestRemove={handleRequestRemove} />
          </li>
        ))}
      </ul>

      <RemoveFavoriteDialog
        isOpen={removeTargetId !== null}
        onCancel={handleCancelRemove}
        onConfirm={handleConfirmRemove}
      />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 sm:justify-end sm:pr-6"
        >
          <div className="flex items-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-white shadow-lg">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}
