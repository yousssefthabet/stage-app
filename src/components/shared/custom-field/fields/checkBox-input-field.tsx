"use client";
import { Label } from "../../../ui/label";
import type { CheckboxField } from "../custom-fields-types";
import { cn } from "../../../lib/utils";
import { Checkbox } from "../../../ui/checkbox";

export function CheckboxInputField({
  label,
  id,
  className,
  value,
  required,
  onChange,
}: CheckboxField) {
  return (
    <div className={cn(className)}>
      <Checkbox
        id={id}
        checked={value}
        onCheckedChange={onChange}
        required={required}
        className="min-h-[18px] min-w-[18px] cursor-pointer"
      />
      <Label htmlFor={id} className="cursor-pointer font-semibold capitalize">
        {label}
      </Label>
    </div>
  );
}
