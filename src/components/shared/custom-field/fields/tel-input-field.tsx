"use client";
import { Label } from "../../../ui/label";
import type { TelField } from "../custom-fields-types";
import { cn } from "../../../lib/utils";
import { Input } from "../../../ui/input";

export function TelInputField({
  id,
  label,
  type,
  value,
  required,
  className,
  onChange,
}: TelField) {
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
