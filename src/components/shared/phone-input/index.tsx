"use client";
import { useMemo, useState } from "react";
import {
  type E164Number,
  parsePhoneNumberWithError,
  getExampleNumber,
} from "libphonenumber-js";
import type { PhoneNumber } from "libphonenumber-js";
import * as i18nIsoCountries from "i18n-iso-countries";
import enCountries from "i18n-iso-countries/langs/en.json";
import PhoneInput, { type Country } from "react-phone-number-input/input";
import examples from "libphonenumber-js/mobile/examples";

import { ComboboxCountryInput } from "./combobox";
import {
  getCountriesOptions,
  flagImage,
  replaceNumbersWithZeros,
} from "./helpers";
import { cn } from "../../lib/utils";
import { Input } from "../../ui/input";
import type { CountryOption, PhoneInputProps } from "./type";

i18nIsoCountries.registerLocale(enCountries);

/**
 * Composant React pour un input de numéro de téléphone avec sélection de pays.
 *
 * Utilise la bibliothèque `react-phone-number-input` combinée à un combobox personnalisé
 * pour sélectionner le pays via un drapeau et le code indicatif.
 * Valide le numéro selon le pays et selon un type spécifique (Mobile, Domicile, Bureau) pour la France.
 *
 * Le placeholder est automatiquement généré avec un exemple de numéro correspondant au pays sélectionné.
 *
 * @param {Object} props - Propriétés du composant:
 * @param {"Mobile" | "Domicile" | "Bureau"} props.type - Type de numéro attendu (permet de filtrer la validation pour la France)
 * @param {string | undefined} props.value - Valeur du numéro de téléphone au format E.164 (ex: "+33606060606")
 * @param {boolean | undefined} props.required - Si le champ est requis (attribut ARIA)
 * @param {(value: string) => void} props.onChange - Callback appelé lors du changement de valeur du numéro
 *
 * @returns {JSX.Element} Le composant JSX affichant un combobox pour choisir le pays avec son drapeau
 *                        et un champ input pour saisir le numéro de téléphone
 *
 * @example
 * ```tsx
 * <PhoneInputShadcnUiPhoneInput
 *    type="Mobile"
 *    value={phone}
 *    required={true}
 *    onChange={(val) => setPhone(val)}
 * />
 * ```
 */
export const PhoneInputShadcnUiPhoneInput = ({
  type,
  value,
  required,
  onChange,
  onBlur,
}: PhoneInputProps) => {
  const options = useMemo(() => getCountriesOptions(), []);
  const phoneNumber: PhoneNumber = parsePhoneNumberWithError("+33606060606");
  const defaultCountry = phoneNumber.country;
  const defaultCountryOption =
    options.find((option) => option.value === defaultCountry) ?? options[0]!;
  const [country, setCountry] = useState<CountryOption>(defaultCountryOption);
  const [validation, setValidation] = useState<boolean>(false);

  const placeholder = useMemo(() => {
    const example = getExampleNumber(country.value, examples) as
      | { number: string }
      | undefined;

    return replaceNumbersWithZeros(
      example?.number ?? "",
      country.indicatif,
    ) as E164Number;
  }, [country]);

  const onCountryChange = (newCountry: CountryOption) => {
    setCountry(newCountry);
    const example = getExampleNumber(newCountry.value, examples) as
      | { number: string }
      | undefined;
    const newPlaceholder = example?.number ?? "";

    const formattedNumber = replaceNumbersWithZeros(
      newPlaceholder,
      newCountry.indicatif,
    ) as E164Number;

    onChange({
      number: formattedNumber,
      country: newCountry.value,
    });
  };

  const onNumberPhoneChange = (newValue: E164Number | undefined) => {
    onChange({
      number: newValue ?? ("" as E164Number),
      country: country.value,
    });
  };

  const isTypeValid = useMemo(() => {
    if (!value) return false;
    const strValue = value as string;

    if (!strValue.startsWith("+33")) return true;
    if (!value.startsWith("+33")) return true;

    const suffix = value.replace("+33", "");
    const firstTwo: string = suffix.slice(0, 2);
    const first: string = suffix.charAt(0);

    if (type === "Mobile") {
      return (
        firstTwo === "06" || firstTwo === "07" || first === "6" || first === "7"
      );
    }

    if (type === "Domicile" || type === "Bureau") {
      return (
        firstTwo === "01" ||
        firstTwo === "02" ||
        firstTwo === "03" ||
        firstTwo === "04" ||
        firstTwo === "05" ||
        ["1", "2", "3", "4", "5"].includes(first)
      );
    }

    return false;
  }, [value, type]);

  const isPhoneValidAndTypeMatched = useMemo(() => {
    const isFrench = country.value === "FR";
    return validation && (!isFrench || isTypeValid);
  }, [validation, isTypeValid, country]);

  return (
    <div className="not-prose flex flex-col gap-4">
      <div className="flex gap-2">
        <ComboboxCountryInput
          value={country}
          onValueChange={onCountryChange}
          options={options}
          placeholder="Trouvez votre pays..."
          renderOption={({ option }) => (
            <div className="flex cursor-pointer items-center">
              <span>{flagImage(option.value)}</span>
              <span className="ml-2">{option.label}</span>
            </div>
          )}
          renderValue={(option) => ` ${option.label}`}
          emptyMessage="Aucun pays trouvé."
          aria-required={required}
        />

        <PhoneInput
          international
          withCountryCallingCode
          country={(country.value as string).toUpperCase() as Country}
          value={value ?? ""}
          inputComponent={Input}
          placeholder={placeholder}
          onChange={onNumberPhoneChange}
          aria-required={required}
          className={cn(
            "text-sm",
            isPhoneValidAndTypeMatched ? "text-green-950" : "text-red-950",
          )}
          onBlur={() => {
            if (onBlur) onBlur();
          }}
        />
      </div>
    </div>
  );
};
