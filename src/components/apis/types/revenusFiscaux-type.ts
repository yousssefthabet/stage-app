import { type RevenusDetails } from "./revenusDetails-type";

export type RevenusFiscaux = {
  id?: string;
  montantImpot?: number | null;
  revenuFoncier?: number | null;
  montant?: number;
  numeroFiscale?: string;
  annee?: string;

  customerId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  revenusDetails?: RevenusDetails;
};
