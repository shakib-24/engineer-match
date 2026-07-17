"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AdminSearchInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function AdminSearchInput({
  id,
  label,
  value,
  onChange,
  placeholder,
}: AdminSearchInputProps) {
  return (
    <div className="relative flex-1">
      <Search
        className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 pl-9"
      />
    </div>
  );
}
