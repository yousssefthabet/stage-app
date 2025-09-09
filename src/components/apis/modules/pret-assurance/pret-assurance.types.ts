export enum PretAssuranceTypePretEnum {
  AMORTISSABLE = "AMORTISSABLE",
  PTZ = "PTZ",
  PRET_RELAIS = "PRET_RELAIS",
  AMORTISSABLE_TAUX_VARIABLE = "AMORTISSABLE_TAUX_VARIABLE",
  PRET_IN_FINE = "PRET_IN_FINE",
  PRET_ECHEANCES = "PRET_ECHEANCES",
}

export enum PretAssurancePeriodiciteEcheanceEnum {
  ECH_MENSUEL = "ECH_MENSUEL",
  ECH_TRIMESTRIEL = "ECH_TRIMESTRIEL",
  ECH_SEMESTRIEL = "ECH_SEMESTRIEL",
  ECH_ANNUEL = "ECH_ANNUEL",
}

export interface PretAssuranceResponse {
  id: string;
  typePret: PretAssuranceTypePretEnum;
  montant: number;
  taux: number;
  dureePret: number;
  dureeDiffere: number;
  paiementInteret: boolean;
  periodiciteEcheance: PretAssurancePeriodiciteEcheanceEnum;
}

export type PretAssuranceListResponse = {
  data: PretAssuranceResponse[];
};

export interface PretAssuranceRequest {
  typePret: PretAssuranceTypePretEnum;
  montant: number;
  taux: number;
  dureePret: number;
  dureeDiffere?: number;
  paiementInteret?: boolean;
  periodiciteEcheance: PretAssurancePeriodiciteEcheanceEnum;
}

export type UpdatePretAssuranceRequest = Partial<PretAssuranceRequest>;
