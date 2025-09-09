import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { Label } from "../../../ui/label";
import type { SelectField } from "../custom-fields-types";
import { cn } from "../../../lib/utils";

export function SelectInputField({
  onChange,
  required,
  value,
  label,
  className,
  possibleValues,
  placeholder,
}: SelectField) {
  return (
    <div className={cn(className)}>
      <Label className="mb-2 font-semibold capitalize">{label}</Label>
      <Select value={value} onValueChange={onChange} required={required}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {possibleValues.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
