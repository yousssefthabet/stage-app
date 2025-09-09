import { type DossierGeneral } from "@/apis/types/dossier-general-types";

export type DossierGeneralGetResponse = {
  statusCode: number;
  message: string;
  data: DossierGeneral;
};

export type updateDossierGeneralRequest = {
  data: DossierGeneral;
};

export type updateDossierGeneralResponse = {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
  data?: DossierGeneral;
};

export type createDossierGeneralRequest = {
  data: DossierGeneral;
};

export type createDossierGeneralResponse = {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
  data?: DossierGeneral;
};
