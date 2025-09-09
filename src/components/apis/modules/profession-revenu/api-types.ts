import {
  type ProfessionCategory,
  type RiskyProfession,
  type ProfessionActivity,
  type customerProfession,
} from "@/apis/types/profession-revenu-types";
import { type Societe } from "@/apis/types/societe-types";

export type getProfessionsCustomerApiResponse = {
  statusCode: number;
  message: string;
  data: customerProfession[];
};

export type getProfessionsActivityApiResponse = {
  statusCode: number;
  message: string;
  data: ProfessionActivity[];
};

export type getProfessionsCategoryApiResponse = {
  statusCode: number;
  message: string;
  data: {
    count: number;
    lastPage: number;
    data: ProfessionCategory[];
  };
};

export type getRiskyProfessionsApiResponse = {
  statusCode: number;
  message: string;
  data: {
    count: number;
    lastPage: number;
    data: RiskyProfession[];
  };
};

export type createProfessionApiRequest = {
  data: customerProfession;
};

export type createProfessionApiResponse = {
  statusCode: number;
  message: string;
  data: customerProfession;
};

export type updateProfessionApiRequest = {
  data: customerProfession;
};

export type updateProfessionApiResponse = {
  statusCode: number;
  message: string;
  data: customerProfession;
};

export type deleteProfessionApiResponse = {
  statusCode: number;
  message: string;
};

export type createSocieteProfessionApiRequest = {
  data: Partial<Societe>;
};

export type creatSocieteProfessionApiResponse = {
  statusCode: number;
  message: string;
  data: Societe;
};

export type getSocieteForProfessionApiResponse = {
  statusCode: number;
  message: string;
  data: Societe;
};
