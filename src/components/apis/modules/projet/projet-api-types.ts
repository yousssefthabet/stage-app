import { type Application } from "@/apis/types/application-type";
import { type Projet } from "@/apis/types/projet-types";

export type ProjetGetAllResponse = {
  count: number;
  totalPages: number;
  data: Application[];
};

export type ProjetGetResponse = {
  statusCode: number;
  message: string;
  data: Projet;
};

export type UpdateApplication = {
  isLocked?: boolean;
  sourceDetailId?: bigint;
  typeSourceId?: bigint;
};
