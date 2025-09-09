"use client";
import { Label } from "../../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";
import type { RadioField } from "../custom-fields-types";
import { cn } from "../../../lib/utils";

export function RadioInputField({
  onChange,
  required,
  value,
  label,
  className,
  possibleValues,
}: RadioField) {
  return (
    <div className={cn(className)}>
      <Label className="mb-2 font-semibold capitalize">{label}</Label>
      <RadioGroup value={value} onValueChange={onChange}>
        {possibleValues.map((option, idx) => {
          const id = `radio-${label}-${idx}`;
          return (
            <div key={option.value} className="flex items-center gap-2">
              <RadioGroupItem
                value={option.value}
                id={id}
                required={required}
              />
              <Label htmlFor={id} className="ms-1">
                {option.label}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
