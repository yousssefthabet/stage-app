export type Customer = {
  id: string;
  firstName: string;
  lastName?: string;
  customerType: string;
  sex?: string;
  civilite: string;
  email?: string;
  birthday?: Date;
  maritalStatus?: string;
  matrimonialRegimes?: string;
  weddingDate?: Date;
  weddingContractDate?: Date;
  divorceDate?: Date;
  nomJeuneFille?: string;
  parentFirstRelation?: string;
  menageWith?: string;
  isEmpOrCoemp: boolean;
  isSci: boolean;
  sciPercent?: number;
  isCaution: boolean;
  isSolidaire: boolean;
  isHypotecaire: boolean;
  diplomeGrandEcole?: boolean;
  codeParrainage?: string;
  codeParrain?: string;
  locationFilledFromAvis: boolean;
  cniRectoScannedOcr: boolean;
  budgetInsightLink?: string;
  userId?: string;
  birthPlaceId?: string;
  weddingPlaceId?: string;
  countryLivingId?: string; // ISO2
  nationalityId?: string; // ISO2
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};
