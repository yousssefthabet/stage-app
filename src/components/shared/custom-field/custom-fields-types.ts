import type { DateRange } from "react-day-picker";

export type CustomFieldType =
  | "text"
  | "select"
  | "textArea"
  | "email"
  | "password"
  | "tel"
  | "number"
  | "checkbox"
  | "radio"
  | "date"
  | "dateRange"
  | "dateTime"
  | "dateTimeRange"
  | "multiSelect";

export type TimeScrollerPros = {
  value: Date | undefined;
  onChange?: (val: Date) => void;
  className?: string;
};

export type TimeScrollerRangePros = {
  value: DateRange;
  onChange?: (val: DateRange) => void;
  className?: string;
  propRange: string;
};
export type CustomFieldValue =
  | string
  | number
  | boolean
  | string[]
  | Date
  | DateRange;

export type PossibleValuesProps = {
  label: string;
  value: string;
};

type BaseFieldProps<T extends CustomFieldType, V> = {
  label?: string;
  type: T;
  value?: V;
  required?: boolean;
  onChange?: (value: V) => void;
  id?: string;
  className?: string;
  placeholder?: string;
};

export type TextField = BaseFieldProps<"text" | "email" | "password", string>;
export type TelField = BaseFieldProps<"tel", string>;
export type TextAreaField = BaseFieldProps<"textArea", string>;
export type NumberField = BaseFieldProps<"number", number>;
export type CheckboxField = BaseFieldProps<"checkbox", boolean>;
export type RadioField = BaseFieldProps<"radio", string> & {
  possibleValues: PossibleValuesProps[];
};
export type SelectField = BaseFieldProps<"select", string> & {
  possibleValues: PossibleValuesProps[];
};
export type MultiSelectField = BaseFieldProps<"multiSelect", string[]> & {
  possibleValues: PossibleValuesProps[];
};
export type DateField = BaseFieldProps<"date" | "dateTime", Date>;
export type DateRangeField = BaseFieldProps<
  "dateRange" | "dateTimeRange",
  DateRange
>;

// Final union of all valid props
export type CustomFieldProps =
  | TelField
  | TextField
  | NumberField
  | CheckboxField
  | RadioField
  | SelectField
  | MultiSelectField
  | DateField
  | DateRangeField
  | TextAreaField;
