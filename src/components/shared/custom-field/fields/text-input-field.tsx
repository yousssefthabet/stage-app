"use client";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import type { TextField } from "../custom-fields-types";
import { cn } from "../../../lib/utils";

export function TextInputField({
  id,
  label,
  type,
  value,
  required,
  className,
  onChange,
}: TextField) {
  return (
    <div className={cn(className)}>
      <Label htmlFor={id} className="mb-2 font-semibold capitalize">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
      />
    </div>
  );
}
