import {
  type SubStep,
  type TypeSourceDetail,
} from "@/app/(private)/projet/[id]/historique/_components/tache/type";
import { type User } from "./user-types";
import { type Application } from "./application-type";

export type TaskSnapshot = {
  id: string;
  actionType: string;
  dateEcheance: string;
  createdAt: string;
  updatedAt: string;
  assignedTo: User;
  currentU: User;
  typeSourceDetail: TypeSourceDetail;
  taskSubStep: SubStep;
  application: Application;
};

export type TaskHistoryGetResponse = {
  statusCode: number;
  message: string;
  data: TaskSnapshot[];
};
