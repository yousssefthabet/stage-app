import { City } from "@/apis/types/city-types";
import { DpeType } from "../detail-projet-financement/detail-projet-financement.types";

export interface CreditRequest {
  id?: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  initialAmount?: number;
  remainingCapital?: number;
  interestRate?: number;
  ignoreForDebtRatio?: boolean;
  lissable?: boolean;
  lessThan6Months?: boolean;
  devenirPretId?: number; // from "devenir_pret"
  mortgageLoan?: boolean; // from "pret_hypo"
  internalLoan?: boolean; // from "pret_interne"
  creditTauxType?: string; // from "type_taux"
  lenderId?: number;
  creditTypeId?: number;
  customerIds: number[];
  paliers?: PalierRequest[];
}

export interface PalierRequest {
  id?: string;

  name?: string;
  mensualite?: number;
  duration?: number;
  endDate?: string;
  mensualiteHa?: number;
  mensualiteA?: number;
}

export type CreditUpdateRequest = Partial<CreditRequest>;
export type PalierUpdateRequest = Partial<PalierRequest>;

export interface PatrimoineRequest {
  countryId: string;
  typeLogementId: string;
  purchaseDate: string;
  purchasePrice: string;
  currentMarketValue: string;
  streetName?: string;
  complement?: string;
  cityId?: number | null;
  isPaid: boolean;
  isRelais: boolean;
  customerIds: number[];
  credits: CreditRequest[];
  dpe: DpeType;
}
export type PatrimoineUpdateRequest = Partial<PatrimoineRequest>;

export interface Credit {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  initialAmount: number;
  remainingCapital: number;
  interestRate: number;
  ignoreForDebtRatio: boolean;
  lissable: boolean;
  lessThan6Months: boolean;
  prepaid: boolean;
  crdRachete: boolean;
  devenirPretId: number;
  mortgageLoan: boolean;
  internalLoan: boolean;
  creditTauxType: CreditTauxType;
  lenderId: number;
  creditTypeId: number;
  customerIds: number[];
  monthlyPayment: number;
  Palier: Palier[];
  duree?: number;
}

export interface Palier {
  id: string;
  name: string;
  mensualite: number;
  duration: number;
  endDate: string;
  mensualiteHa: number;
  mensualiteA: number;
}

export type PatrimoineListResponse = {
  count: number;
  totalPages: number;
  data: PatrimoineResponse[];
};

export type PatrimoineListPaginatedResponse = {
  data: PatrimoineListResponse;
};

export interface PatrimoineResponse {
  id: string;
  countryId: string;
  typeLogement: TypeLogement;
  purchaseDate: string; // ISO string
  purchasePrice: number; // you showed 0.01 number, so number type
  currentMarketValue: number;
  isPaid: boolean;
  isRelais: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  revenuLocatif: string;
  typeRevenuLocatid: string;
  dpe: DpeType | null;
  streetName?: string;
  complement?: string;
  cityId?: number | null;
  city?: City;
  credits: Credit[];
  customers: Customer[];
}

export interface CreditResponse {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  initialAmount: number;
  remainingCapital: number;
  interestRate: number;
  ignoreForDebtRatio: boolean;
  lissable: boolean;
  lessThan6Months: boolean;
  prepaid: boolean;
  crdRachete: boolean;
  devenirPretId: string;
  mortgageLoan: boolean;
  internalLoan: boolean;
  creditTauxType: CreditTauxType;
  lenderId: string;
  creditTypeId: string;
  monthlyPayment: string;
  customerIds: number[];

  Palier: Palier[];
}

export type CreditsListResponse = {
  count: number;
  totalPages: number;
  data: Credit[];
};
export interface TypeLogement {
  id: string;
  name: string;
}
export interface AddressResponse {
  id: string;
  streetNumber: string;
  streetName: string;
  complement: string;
  latitude: number;
  longitude: number;
  cityId: string;
  postalCodeId: string;

  city: City;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  civilite: string;
  email: string | null;
  // add other customer fields you expect here
}

export enum CreditTauxType {
  fixe = "fixe",
  revisable = "revisable",
}
