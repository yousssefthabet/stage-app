"use client";
import { Textarea } from "../../../ui/textarea";
import { Label } from "../../../ui/label";
import type { TextAreaField } from "../custom-fields-types";
import { cn } from "../../../lib/utils";

export function TextAreaInputField({
  label,
  className,
  value,
  required,
  onChange,
}: TextAreaField) {
  return (
    <div className={cn(className)}>
      <Label className="mb-2 font-semibold capitalize">{label}</Label>
      <Textarea
        placeholder={label}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
      />
    </div>
  );
}
