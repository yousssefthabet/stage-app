import { z } from "zod";

export type PhoneNumber = {
  number: string;
  category: PhoneCategory;
  countryId?: string;
};
export enum PhoneCategory {
  DOMICILE = "DOMICILE",
  MOBILE = "MOBILE",
  BUREAU = "BUREAU",
}

export const phoneNumberCountrySchema = z.object({
  iso2: z.string({ required_error: "Code ISO2 requis" }),
  iso3: z.string({ required_error: "Code ISO3 requis" }),
  numericCode: z.string({ required_error: "Code numérique requis" }),
  phoneCode: z.string({ required_error: "Indicatif téléphonique requis" }),
  name: z.string({ required_error: "Nom requis" }),
  officialName: z.string({ required_error: "Nom officiel requis" }),
  latitude: z.number({ required_error: "Latitude requise" }),
  region: z.string({ required_error: "Région requise" }),
  subregion: z.string({ required_error: "Sous-région requise" }),
  timezones: z.array(z.string(), { required_error: "Fuseaux horaires requis" }),
  currencies: z.array(z.string(), { required_error: "Devises requises" }),
  emoji: z.string().nullable(),
  emojiU: z.string().nullable(),
  tld: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const phoneNumberSchema = z.object({
  id: z.string(),
  number: z.string({ required_error: "Numéro requis" }),
  category: z.enum(["DOMICILE", "MOBILE", "BUREAU"], {
    required_error: "Catégorie requise",
  }),
  countryId: z.string({ required_error: "ID du pays requis" }),
  country: phoneNumberCountrySchema,
  updatedAt: z.string({ required_error: "Date de mise à jour requise" }),
});
