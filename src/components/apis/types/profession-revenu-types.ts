import { type City } from "./city-types";

export type ProfessionCategory = {
  id: bigint;
  ident: string;
  name: string;
  group: "salarie_privee" | "salarie_public" | "not_salarie" | "autres";
  requiresCompanyInfo: boolean;
};

export type ProfessionActivity = {
  id: bigint;
  name: string;
  value?: number | null;
};

export type Address = {
  id?: string | null;
  streetNumber?: string | null;
  streetName?: string | null;
  complement?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  cityId?: string | null;
  postalCodeId?: string | null;
  city: City | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type RiskyProfession = {
  id: bigint;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type customerProfession = {
  id?: number | null;
  customerId?: number | null;
  categoryId?: number | null;
  professionActivityId?: number | null;
  title: string | null;
  salary?: number | null;
  salaryCalculationType?: string | null;
  nbrMonthSalary?: number | null;
  nbrYearsWork?: number | null;
  nbrMonthWork?: number | null;
  hiringDate?: string | null;
  employerName?: string | null;
  isMutuelleFonctionnaire?: boolean | null;
  isTrialPeriodCompleted?: boolean | null;
  idtCil?: string | null;
  class?: string | null;
  natureEmploi: string | null;
  baBicBnc?: number | null;
  societeId?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
  streetName?: string;
  complement?: string;
  cityId?: number | null;
  city?: City;
};
