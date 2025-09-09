import { TextInputField } from "./fields/text-input-field";
import type { CustomFieldProps } from "./custom-fields-types";
import { TextAreaInputField } from "./fields/textArea-input-field";
import { CheckboxInputField } from "./fields/checkBox-input-field";
import { SelectInputField } from "./fields/select-input-field";
import { RadioInputField } from "./fields/radio-input-field";
import { MultiSelectInputField } from "./fields/multi-select-input-field";
import { NumberInputField } from "./fields/number-input-field";
import { TelInputField } from "./fields/tel-input-field";
import { DateTimeInputField } from "../date-time-input";
import { DateTimeRangeInputField } from "../date-time-with-range-input";

/**
 * CustomField
 *
 * A flexible and extensible form field component that renders various input types
 * (text, textarea, checkbox, select, radio, date, date range, date-time, multi-select, etc.)
 * based on the provided `type` prop. Supports dynamic options, value management, and custom labels.
 *
 * ## Props
 * @param {string} label
 *   - The label to display above the input field.
 * @param {CustomFieldType} type
 *   - The type of input to render. Supported types: "text", "email", "password", "tel", "textArea",
 *     "number", "checkbox", "select", "radio", "date", "dateRange", "dateTime", "dateTimeRange", "multiSelect".
 * @param {CustomFieldValue} value
 *   - The current value of the field :string | number | boolean | string[] | Date | DateRange.
 * @param {Array<string | { label: string; value: string }>} possibleValues
 *   - The list of possible values for select, radio, and multi-select fields.
 * @param {boolean} required
 *   - Whether the field is required.
 * @param {(value: CustomFieldValue) => void} onChange
 *   - Callback function called when the field value changes.
 *
 * ## Usage
 * Use `CustomField` to render a form field that adapts to the given type and props.
 */

export function CustomField(props: CustomFieldProps) {
  switch (props.type) {
    case "text":
      return <TextInputField {...props} />;
    case "email":
      return <TextInputField {...props} />;
    case "password":
      return <TextInputField {...props} />;
    case "tel":
      return <TelInputField {...props} />;
    case "textArea":
      return <TextAreaInputField {...props} />;
    case "number":
      return <NumberInputField {...props} />;

    case "checkbox":
      return <CheckboxInputField {...props} />;

    case "select":
      return <SelectInputField {...props} />;

    case "radio":
      return <RadioInputField {...props} />;

    case "date":
      return <DateTimeInputField {...props} />;

    case "dateRange":
      return <DateTimeRangeInputField {...props} />;

    case "dateTime":
      return <DateTimeInputField {...props} />;

    case "dateTimeRange":
      return <DateTimeRangeInputField {...props} />;

    case "multiSelect":
      return <MultiSelectInputField {...props} />;

    default:
      return null;
  }
}
