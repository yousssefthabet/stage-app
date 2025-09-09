import type { Country } from "react-phone-number-input/input";
import type {
  CountryCallingCode,
  CountryCode,
  E164Number,
} from "libphonenumber-js";

export type PhoneInputProps = {
  type: string;
  value: string | E164Number;
  required: boolean;
  onChange: (value: { number: E164Number; country: CountryCode }) => void;
  onBlur?: () => void;
};

export type CountryOption = {
  value: Country;
  label: string;
  indicatif: CountryCallingCode;
};
