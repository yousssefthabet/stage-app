import { type City } from "./city-types";

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

export type Societe = {
  id: string;
  name: string | null;
  secteurActivite: string | null;
  codeNaf: string | null;
  siret: string | null;
  rcsNumber: string | null;
  rcsImm: string | null;
  greffe: string | null;
  formeJuridique: string | null;
  siegeSocial: string | null;
  codeApe: string | null;
  orias: string | null;
  policeAssurance: string | null;
  garantieFinanciere: string | null;
  representantName: string | null;
  nbEmploye: number | null;
  capitale: number | null;
  debutActivite?: string | null;
  moyenneAbattement: number | null;
  moyenneDeducation: number | null;
  revAbattementN1: number | null;
  revAbattementN2: number | null;
  revAbattementN3: number | null;
  revDeducationN1: number | null;
  revDeducationN2: number | null;
  revDeducationN3: number | null;
  revDeducationYearN1: number | null;
  revDeducationYearN2: number | null;
  revDeducationYearN3: number | null;
  streetName?: string;
  complement?: string;
  cityId?: number | null;
  city?: City;

  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
};
