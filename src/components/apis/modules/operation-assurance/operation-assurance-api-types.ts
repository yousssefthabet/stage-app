import { type OperationAssurance } from "@/apis/types/operation-assurance-type";

export type operationAssuranceGetResponse = {
  statusCode: number;
  message: string;
  data: OperationAssurance[];
};
