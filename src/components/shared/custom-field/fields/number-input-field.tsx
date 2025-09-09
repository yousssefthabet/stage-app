"use client";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import type { NumberField } from "../custom-fields-types";
import { cn } from "../../../lib/utils";

export function NumberInputField({
  label,
  type,
  value,
  required,
  className,
  onChange,
}: NumberField) {
  return (
    <div className={cn(className)}>
      <Label className="mb-2 font-semibold capitalize">{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        required={required}
      />
    </div>
  );
}
