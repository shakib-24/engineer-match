"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, MapPin, Pencil } from "lucide-react";
import { PROFILE_HEADER } from "@/constants/engineer-profile";

export function ProfileHeader() {
  const {
    name,
    role,
    location,
    experienceYears,
    availability,
    avatarInitials,
    editLabel,
    editHref,
    previewLabel,
  } = PROFILE_HEADER;
  const [demoMessage, setDemoMessage] = useState<string | null>(null);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary sm:h-20 sm:w-20 sm:text-xl"
            aria-hidden="true"
          >
            {avatarInitials}
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {name}
            </h2>
            <p className="mt-1 text-sm font-medium text-primary">{role}</p>
            <dl className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                <dt className="sr-only">居住地</dt>
                <dd>{location}</dd>
              </div>
              <div className="flex items-center gap-1">
                <dt className="sr-only">経験年数</dt>
                <dd>経験 {experienceYears}</dd>
              </div>
              <div className="flex items-center gap-1">
                <dt className="sr-only">稼働状況</dt>
                <dd className="font-semibold text-primary">{availability}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              setDemoMessage("この機能はデモ版のため準備中です（公開プレビューは今後実装予定）。")
            }
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            {previewLabel}
          </button>
          <Link
            href={editHref}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Pencil className="h-4 w-4" aria-hidden="true" />
            {editLabel}
          </Link>
        </div>
      </div>

      {demoMessage && (
        <p
          role="status"
          className="mt-4 rounded-xl bg-muted px-4 py-2.5 text-xs text-muted-foreground"
        >
          {demoMessage}
        </p>
      )}
    </div>
  );
}
