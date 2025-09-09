import {
  type ApplicationCustomers,
  type CustomerProject,
  type Task,
  type TypeSourceDetail,
} from "@/app/(private)/projet/[id]/historique/_components/tache/type";
import { type User } from "@/types/User";

export type Application = {
  id: string;
  userId: string;
  user: User;
  sourceDetailId: string;
  sourceDetail: TypeSourceDetail;
  applicationCustomers: ApplicationCustomers[];
  operationTypeId: string;
  //   operationType: Operation;
  originId?: string | null;
  //   origin?: ApplicationOrigin | null;
  durationInYears: number;
  isFakeApplication: boolean;
  isDuplicateApplication: boolean;
  isFromForm: boolean;
  isLocked: boolean;
  isCompanyCredit: boolean;
  isAccountKeepingVerified: boolean;
  withBien: boolean;
  clientUserId?: string | null;
  clientUser?: User | null;
  apporteurId?: string | null;
  apporteur?: User | null;
  backofficeId?: string | null;
  backofficeUser?: User | null;
  commercialeId?: string | null;
  commercialeUser?: User | null;
  assistanteId?: string | null;
  assistanteUser?: User | null;
  ownerId?: string | null;
  ownerUser?: User | null;
  preteurId?: string | null;
  //   preteur?: Bank | null;
  preferencesId?: string | null;
  //   preferences?: ApplicationPreference | null;
  typeOperationAssuranceId?: string | null;
  //   typeOperationAssurance?: Operation | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  application: ApplicationCustomer[];
  task: Task;
  //   projectCost?: ApplicationProjectCost | null;
  //   applicationInstruction?: ApplicationInstruction | null;
  applicationInstructionId?: string | null;
  customerProjects: CustomerProject | null;
  //   UserApplicationComment: UserApplicationComment[];
  typeSourceId?: string | null;
  //   TypeSource?: TypeSource | null;
  //   property?: ApplicationProperty | null;
};
export type ApplicationCustomer = {
  applicationId: string;
  application: Application;
  customerId: bigint;
};
