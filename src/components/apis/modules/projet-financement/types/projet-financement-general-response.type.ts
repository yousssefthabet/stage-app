import { type OperationType } from "@/apis/types/header-projet-type";
import { type ProjectsChoixClientEnum } from "./projet-financement-general-request.type";

export interface PretRelaisRequest {
  currentBienPrice?: number;
  duration?: number;
  isWithDiff?: boolean;
  isPercentCsLeve?: boolean;
}

export interface PretRelais extends PretRelaisRequest {
  id: string; // only present in response
}
export interface ProjetFinancementGeneralResponse {
  id: string;
  etatProjetImmobilierId: number;
  compromiseSignatureDate?: string;
  suspensiveConditionsDate?: string;
  notaireSignatureDate?: string;
  applicationId: string;
  choixClient: ProjectsChoixClientEnum;
  dateSignature?: string;
  usageLogementId: number;
  operationType: OperationType;
  apport: string;
  pretRelais?: PretRelais;
  customerIds?: string[];
}

export interface ProjetFinancementGeneralResponseList {
  data: ProjetFinancementGeneralResponse;
}
