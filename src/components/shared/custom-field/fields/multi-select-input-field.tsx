import { Label } from "../../../ui/label";
import type { MultiSelectField } from "../custom-fields-types";
import { MultiSelect } from "../../multiselect-component";
import { cn } from "../../../lib/utils";

export const MultiSelectInputField = ({
  label,
  required,
  value,
  className,
  onChange,
  possibleValues,
}: MultiSelectField) => {
  return (
    <div className={cn(className)}>
      <Label className="mb-2 font-semibold capitalize">{label}</Label>
      <MultiSelect
        value={value}
        onValueChange={onChange}
        options={possibleValues}
        aria-required={required}
      />
    </div>
  );
};
