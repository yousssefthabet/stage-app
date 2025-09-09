export interface ApplicationProjectCostRequest {
  apport?: number;
  courtage?: number;
  logemet?: number;
  terrain?: number;
  viabilisation?: number;
  travaux?: number;
  etablissement?: number;
  expertise?: number;
  agence?: number;
  crdRefinance?: number;
  notaire?: number;
  pretRachete?: number;
  decouvertBlanc?: number;
  indemiteRa?: number;
  frLeveHypo?: number;
  financeSpeciaux?: number;
  mobilier?: number;
  soulte?: number;
  rmTotal?: number;
  apportDisponible?: number;
  rfN1?: number;
  rfN2?: number;
  mlExistants?: number;
  mlPersistants?: number;
  mlPersistantsRevenu?: number;
  dateRelev?: string;
  tresorie?: number;
  courtageManually?: boolean;
}

export type ApplicationProjectCostUpdateRequest =
  Partial<ApplicationProjectCostRequest>;
