import { type PretRelaisRequest } from "./projet-financement-general-response.type";

export enum ProjectsChoixClientEnum {
  aucun = "aucun",
  acquisition = "acquisition",
  capaciteAchatMax = "capaciteAchatMax",
  rachat = "rachat",
  regroupement = "regroupement",
}

export interface ProjetFinancementGeneralRequest {
  etatProjetImmobilierId: number;
  compromiseSignatureDate?: string;
  suspensiveConditionsDate?: string;
  notaireSignatureDate?: string;
  dateSignature?: string;
  choixClient: ProjectsChoixClientEnum;
  usageLogementId: number;
  operationTypeId: number;
  apport: string;
  pretRelais?: PretRelaisRequest;
  customerIds?: string[];
}

export type ProjetFinancementGeneralUpdateRequest =
  Partial<ProjetFinancementGeneralRequest>;
