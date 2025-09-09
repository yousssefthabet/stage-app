import { type CommissionMandataire } from "@/apis/types/commission-mandataire-types";

export type CommissionMandataireGetResponse = {
  message: string;
  statusCode: number;
  data: CommissionMandataire[];
  count: number;
  totalPages: number;
};
