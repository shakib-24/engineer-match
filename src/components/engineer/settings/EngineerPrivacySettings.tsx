"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ENGINEER_PRIVACY_SETTINGS } from "@/constants/engineer-settings";
import { updateProfileVisibility } from "@/lib/engineer/profile";
import { createClient } from "@/lib/supabase/client";

interface EngineerPrivacySettingsProps {
  initialIsPublic: boolean;
}

export function EngineerPrivacySettings({ initialIsPublic }: EngineerPrivacySettingsProps) {
  const [isPublic, setIsPublic] = useState(initialIsPublic);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  async function handleToggle(checked: boolean) {
    const previous = isPublic;
    setIsPublic(checked);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setIsPublic(previous);
      setStatus("error");
      return;
    }

    const { error } = await updateProfileVisibility(supabase, user.id, checked);
    if (error) {
      console.error("[engineer-settings] failed to update profile visibility:", error);
      setIsPublic(previous);
      setStatus("error");
      return;
    }
    setStatus("saved");
  }

  return (
    <SectionCard
      title={ENGINEER_PRIVACY_SETTINGS.title}
      description={ENGINEER_PRIVACY_SETTINGS.description}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <Label htmlFor="privacy-profile-public" className="text-foreground">
            {ENGINEER_PRIVACY_SETTINGS.toggle.label}
          </Label>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {ENGINEER_PRIVACY_SETTINGS.toggle.description}
          </p>
        </div>
        <Switch
          id="privacy-profile-public"
          checked={isPublic}
          onCheckedChange={(checked) => void handleToggle(checked)}
        />
      </div>

      {status === "saved" && (
        <div className="mt-5 flex items-center justify-between gap-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          <span>{ENGINEER_PRIVACY_SETTINGS.savedMessage}</span>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            aria-label="保存メッセージを閉じる"
            className="shrink-0 rounded-lg p-1 transition-colors duration-200 hover:bg-green-100 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {status === "error" && (
        <p className="mt-5 text-sm font-medium text-red-600" role="alert">
          {ENGINEER_PRIVACY_SETTINGS.errorMessage}
        </p>
      )}
    </SectionCard>
  );
}
