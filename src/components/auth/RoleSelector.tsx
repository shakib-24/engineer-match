"use client";

import { Building2, CircleCheck, ShieldCheck, UserRound } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LOGIN_ROLE_LABEL, LOGIN_ROLE_OPTIONS } from "@/constants/auth";
import type { DemoRole } from "@/lib/demo-auth";

const ROLE_OPTIONS = [
  { ...LOGIN_ROLE_OPTIONS.engineer, icon: UserRound },
  { ...LOGIN_ROLE_OPTIONS.company, icon: Building2 },
  { ...LOGIN_ROLE_OPTIONS.admin, icon: ShieldCheck },
] as const;

interface RoleSelectorProps {
  value: DemoRole | null;
  onChange: (role: DemoRole) => void;
  invalid?: boolean;
  errorId?: string;
}

export function RoleSelector({
  value,
  onChange,
  invalid = false,
  errorId,
}: RoleSelectorProps) {
  return (
    <RadioGroup
      aria-label={LOGIN_ROLE_LABEL}
      aria-invalid={invalid}
      aria-describedby={invalid ? errorId : undefined}
      value={value}
      onValueChange={(next) => onChange(next as DemoRole)}
      className="grid grid-cols-1 gap-3 sm:grid-cols-3"
    >
      {ROLE_OPTIONS.map((option) => {
        const isSelected = value === option.value;
        return (
          <label
            key={option.value}
            htmlFor={`login-role-${option.value}`}
            onClick={() => onChange(option.value as DemoRole)}
            className={`flex cursor-pointer flex-col gap-3 rounded-2xl border p-4 text-left transition-colors duration-200 ${
              isSelected
                ? "border-cyan-300 bg-cyan-400/15 ring-2 ring-cyan-300/30"
                : `bg-white/10 hover:bg-white/15 ${
                    invalid ? "border-red-400/50" : "border-white/20"
                  }`
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <option.icon
                  className="h-5 w-5 text-cyan-300"
                  aria-hidden="true"
                />
              </div>
              <div className="flex items-center gap-1.5">
                {isSelected && (
                  <CircleCheck
                    className="h-4 w-4 text-cyan-300"
                    aria-hidden="true"
                  />
                )}
                <RadioGroupItem value={option.value} id={`login-role-${option.value}`} />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{option.title}</p>
              <p className="mt-0.5 text-xs text-white/60">{option.description}</p>
            </div>
          </label>
        );
      })}
    </RadioGroup>
  );
}
