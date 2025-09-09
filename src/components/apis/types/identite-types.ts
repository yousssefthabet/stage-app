import { type City } from "./city-types";

export enum MaritalStatusEnum {
  MARIE = "Marié(e)",
  MARIE_AND_BIENS = "Marié(e) comm. de biens",
  CELIBATAIRE = "Célibataire",
  DIVORCE = "Divorcé(e)",
  SEPARE = "Séparé(e)",
  VEUF = "Veuf(ve)",
  UNION_LIBRE = "Union libre",
  PACS = "PACS",
}
export type Identite = {
  id?: string;
  isSci?: boolean; // optional with default false
  customerId?: string;
  firstName: string; // required
  lastName?: string; // optional
  civilite: "M" | "MME"; // match CiviliteEnum
  applicationId?: number;
  maritalStatus?: MaritalStatusEnum;
  isExternalBirthPlace?: boolean;
  isExternalWeddingPlace?: boolean;
  weddingPlace?: string;
  birthPlace?: string;
  nationalityId?: string | null;
  countryLivingId?: string | null;

  domicileNumber?: {
    countryId: string;
    number: string;
    category: string;
  };

  mobileNumber?: {
    countryId: string;
    number: string;
    category: string;
  };

  bureauNumber?: {
    countryId: string;
    number: string;
    category: string;
  };

  email?: string;

  addresses?: {
    id?: string;
    streetNumber?: string;
    streetName?: string;
    complement?: string;
    cityId?: number | null;

    postalCodeId?: string;
    city?: City;
  }[];

  isEmpOrCoemp?: boolean; // optional with default false
  sciPercent?: number;
  isCaution?: boolean; // optional with default false
  isSolidaire?: boolean; // optional with default false
  isHypotecaire?: boolean; // optional with default false
  menageWith?: string;
  parentFirstRelation?: string;
  birthday?: string;
  age?: string;
  weddingDate?: string;
  weddingContractDate?: string;
  divorceDate?: string;
  cp?: string;

  masterBirthPlace?: City;
  birthPlaceId?: number | null;

  masterWeddingPlace?: City;
  weddingPlaceId?: number | null;

  matrimonialRegimes?: string;
  nomJeuneFille?: string;

  countryLiving?: { name?: string | undefined } | undefined;
  customerType?: CustomerType;
};

export enum CustomerType {
  emp = "emp",
  coemp = "coemp",
  employee = "employee",
}
