"use client";

import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordInputProps {
  label: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  id?: string;
}

export function PasswordInput({
  label,
  placeholder,
  autoComplete = "current-password",
  required = false,
  id,
}: PasswordInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={inputId} className="text-white/90">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="relative">
        <Input
          id={inputId}
          name={inputId}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className="h-12 rounded-xl border-white/20 bg-white/10 pr-11 text-sm text-white placeholder:text-white/40 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30 focus-visible:border-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-300/30"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "パスワードを非表示にする" : "パスワードを表示する"}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-xl text-white/60 transition-colors duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:outline-none"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
