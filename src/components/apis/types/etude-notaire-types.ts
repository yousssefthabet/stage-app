import { type City } from "./city-types";
import { type Notaire } from "./notaire-types";

export type PhoneNumberCountry = {
  iso2: string;
  iso3: string;
  numericCode: string;
  phoneCode: string;
  name: string;
  officialName: string;
  latitude: number;
  region: string;
  subregion: string;
  timezones: string[];
  currencies: string[];
  emoji: string | null;
  emojiU: string | null;
  tld: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PhoneNumber = {
  id: string;
  number: string;
  category: "DOMICILE" | "MOBILE" | "BUREAU";
  countryId: string;
  country: PhoneNumberCountry;
  updatedAt: string;
};

export type EtudeNotaire = {
  id?: string | null;
  nom: string;
  nomImprimer: string;
  clerc: string;
  numeroEtude: string;
  bp: string | null;
  cedex: string | null;
  npai: boolean;
  archive: boolean;
  note?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  streetName?: string;
  complement?: string;
  cityId?: number | null;
  city?: City;
  phoneNumberId?: string | null;
  phoneNumber?: PhoneNumber | null;
  faxId?: string | null;
  fax?: PhoneNumber | null;
  email?: string | null;
  notaires?: Notaire[] | null;
};
