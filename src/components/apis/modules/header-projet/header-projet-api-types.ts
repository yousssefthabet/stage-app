import { type HeaderProjet } from "@/apis/types/header-projet-type";

export type HeaderProjetGetResponse = {
  statusCode: number;
  message: string;
  data: HeaderProjet;
};

export type HeaderProjetRequest = {
  isLocked: boolean;
  sourceDetailId: string;
  typeSourceId: string;
};

export type updateComplementRequest = {
  data: HeaderProjet;
  customerId: number;
};

export type updateComplementResponse = {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
};
