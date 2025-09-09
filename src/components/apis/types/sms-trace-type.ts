import { type User } from "@/types/User";
import { type Application } from "./application-type";
import { type SubStep } from "@/app/(private)/projet/[id]/historique/_components/tache/type";

export enum SmsDestTypeEnum {
  CLIENT = "CLIENT",
  COURTIER = "COURTIER",
  COMMERCIAL = "COMMERCIAL",
  PRESCRIPTEUR = "PRESCRIPTEUR",
  OTHER = "OTHER",
}

export enum SmsCategoryEnum {
  GENERIC = "GENERIC",
  COMMERCIAL = "COMMERCIAL",
  PRESCRIPTEUR = "PRESCRIPTEUR",
}

export type SmsTrace = {
  id: number;
  destPhone: string;
  smsBody: string;
  destType: SmsDestTypeEnum;
  category: SmsCategoryEnum;
  applicationId?: string | null;
  tacheEtapeId?: number | null;
  etapeId?: number | null;
  currentUserId?: string | null;
  relatedUserId?: string | null;
  createdAt: string;
  updatedAt: string;
  related_user?: User | null;
  current_user?: User | null;
  application?: Application | null;
  etape?: SubStep | null;
};
