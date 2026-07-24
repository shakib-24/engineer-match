"use client";

import { useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import {
  addPreferredContractType,
  addPreferredLocation,
  removePreferredContractType,
  removePreferredLocation,
  type ContractType,
  type PreferredContractTypeItem,
  type PreferredLocationItem,
} from "@/lib/engineer/preferred-conditions";
import {
  CONTRACT_TYPE_OPTIONS,
  PREFERRED_CONDITIONS_EDITOR_LABELS,
  PREFERRED_CONDITIONS_FORM_FIELDS,
} from "@/constants/engineer-profile";

interface PreferredConditionsManagerProps {
  userId: string;
  initialContractTypes: PreferredContractTypeItem[];
  initialLocations: PreferredLocationItem[];
}

export function PreferredConditionsManager({
  userId,
  initialContractTypes,
  initialLocations,
}: PreferredConditionsManagerProps) {
  const [contractTypes, setContractTypes] = useState<PreferredContractTypeItem[]>(initialContractTypes);
  const [locations, setLocations] = useState<PreferredLocationItem[]>(initialLocations);
  const [newLocation, setNewLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function toggleContractType(contractType: ContractType, checked: boolean) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    const supabase = createClient();

    if (checked) {
      const { data, error: addError } = await addPreferredContractType(supabase, userId, contractType);
      setIsSubmitting(false);
      if (addError || !data) {
        console.error("[preferred-conditions] add contract type failed:", addError);
        setError(PREFERRED_CONDITIONS_EDITOR_LABELS.addError);
        return;
      }
      setContractTypes((prev) => [...prev, { id: data.id as string, contractType }]);
    } else {
      const existing = contractTypes.find((item) => item.contractType === contractType);
      if (!existing) {
        setIsSubmitting(false);
        return;
      }
      const { error: removeError } = await removePreferredContractType(supabase, existing.id);
      setIsSubmitting(false);
      if (removeError) {
        console.error("[preferred-conditions] remove contract type failed:", removeError);
        setError(PREFERRED_CONDITIONS_EDITOR_LABELS.addError);
        return;
      }
      setContractTypes((prev) => prev.filter((item) => item.id !== existing.id));
    }
  }

  async function handleAddLocation() {
    if (isSubmitting || !newLocation.trim()) return;
    setIsSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { data, error: addError } = await addPreferredLocation(supabase, userId, newLocation.trim());

    setIsSubmitting(false);

    if (addError || !data) {
      console.error("[preferred-conditions] add location failed:", addError);
      setError(PREFERRED_CONDITIONS_EDITOR_LABELS.addError);
      return;
    }

    setLocations((prev) => [...prev, { id: data.id as string, location: newLocation.trim() }]);
    setNewLocation("");
  }

  async function handleRemoveLocation(id: string) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error: removeError } = await removePreferredLocation(supabase, id);

    setIsSubmitting(false);

    if (removeError) {
      console.error("[preferred-conditions] remove location failed:", removeError);
      setError(PREFERRED_CONDITIONS_EDITOR_LABELS.addError);
      return;
    }

    setLocations((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <span className="text-sm leading-none font-medium">
          {PREFERRED_CONDITIONS_FORM_FIELDS.contractTypes}
        </span>
        <div className="flex flex-wrap gap-4">
          {CONTRACT_TYPE_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
            >
              <Checkbox
                checked={contractTypes.some((item) => item.contractType === option.value)}
                disabled={isSubmitting}
                onCheckedChange={(checked) => toggleContractType(option.value, checked)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>{PREFERRED_CONDITIONS_FORM_FIELDS.locations}</Label>
        {locations.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {PREFERRED_CONDITIONS_EDITOR_LABELS.emptyLocationsMessage}
          </p>
        ) : (
          <ul className="flex flex-wrap gap-1.5">
            {locations.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-1.5 rounded-full border border-border py-1 pr-1.5 pl-3 text-xs font-medium text-foreground"
              >
                {item.location}
                <button
                  type="button"
                  onClick={() => handleRemoveLocation(item.id)}
                  disabled={isSubmitting}
                  aria-label={`${PREFERRED_CONDITIONS_EDITOR_LABELS.removeLocationLabel}：${item.location}`}
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-destructive/10 hover:text-destructive disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Trash2 className="h-3 w-3" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-1 flex gap-2">
          <Input
            type="text"
            value={newLocation}
            placeholder={PREFERRED_CONDITIONS_FORM_FIELDS.locationPlaceholder}
            onChange={(event) => setNewLocation(event.target.value)}
            className="h-9"
          />
          <button
            type="button"
            onClick={handleAddLocation}
            disabled={isSubmitting || !newLocation.trim()}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-dashed border-border px-3 text-xs font-semibold text-primary transition-colors duration-200 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            ) : (
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {PREFERRED_CONDITIONS_EDITOR_LABELS.addLocationLabel}
          </button>
        </div>
      </div>

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}
