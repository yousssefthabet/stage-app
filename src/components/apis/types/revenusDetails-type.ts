import { type RevenusFiscaux } from "./revenusFiscaux-type";

export type RevenusDetails = {
  id: string;
  revenusFiscauxId: string;
  revenusFiscaux: RevenusFiscaux;
  annee: string;
  montant: string;
  lienJustificatif?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};
