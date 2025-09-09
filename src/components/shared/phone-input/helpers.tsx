import {
  type CountryCallingCode,
  type CountryCode,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";
import i18nIsoCountries from "i18n-iso-countries";

/**
 * Returns a React `<img>` element displaying the flag image for the given ISO country code.
 * The flag image is loaded from flagcdn.com.
 *
 * @param isoCode - The ISO 3166-1 alpha-2 country code (e.g., "fr", "us", "de").
 *                  Case-insensitive, will be converted to lowercase.
 * @returns A React `<img>` element with the flag image, fixed width 16px and height 12px.
 *
 * @example
 * // Returns an image of the French flag
 * flagImage("FR");
 *
 * @see https://flagcdn.com for flag image sources
 */
export function flagImage(isoCode: string) {
  return (
    <img
      src={`https://flagcdn.com/16x12/${isoCode.toLowerCase()}.png`}
      width="16"
      height="12"
      alt={isoCode}
    />
  );
}

/**
 * Get all countries options
 * @returns {Array<{ value: CountryCode; label: string; indicatif: CountryCallingCode }>}
 *
 * @example
 * getCountriesOptions() // [{value: "DE", label: "Germany", indicatif: "+49"}, ...]
 */
export function getCountriesOptions(): {
  value: CountryCode;
  label: string;
  indicatif: CountryCallingCode;
}[] {
  const countries = getCountries();

  return countries
    .map((country) => {
      const upperCountry = country.toUpperCase() as CountryCode;
      const label = i18nIsoCountries.getName(upperCountry, "en", {
        select: "official",
      });

      if (!label) return null;

      return {
        value: country,
        label,
        indicatif: `+${getCountryCallingCode(country)}` as CountryCallingCode,
      };
    })
    .filter(
      (
        option,
      ): option is {
        value: CountryCode;
        label: string;
        indicatif: CountryCallingCode;
      } => option !== null,
    );
}

/**
 *
 * @param phoneNumber international phone number
 * @returns phone number with digits replaced with zeros
 *
 * @example
 * replaceNumbersWithZeros("+1 123 456 7890") // +1 000 000 0000
 */
export function replaceNumbersWithZeros(
  phoneNumber: string,
  countryCode: string,
): string {
  // Normalize both inputs
  const normalizedPhone = phoneNumber.replace(/\s+/g, "");
  const normalizedCode = countryCode.replace(/\s+/g, "");

  // If phone number starts with the country code, remove it
  const restOfNumber = normalizedPhone.startsWith(normalizedCode)
    ? normalizedPhone.slice(normalizedCode.length)
    : normalizedPhone;

  // Replace all digits in the rest of the number with zeros
  const zeroPart = restOfNumber.replace(/\d/g, "0");

  // Return full masked number with the country code
  return `${normalizedCode}${zeroPart}`;
}
