export type Regelement = {
  id: string;
  factureId: string;
  reference: string;
  montant: number;
  mode: string;
  statut: string;
  dateReglement: string | null;
  note: string | null;
  echeanceReglement: string | null;
  numeroCheque: string | null;
  commissionMandataireId: string | null;
  rejetPrelevement: boolean;
  fraisRejet: number | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export type CommissionMandataire = {
  id: string;
  name: string;
  caAffecte: number;
  commissionDirect: number;
  dateAffectation: string;
  commentaire: string | null;
  taux: number;
  type: string;
  applicationId: string;
  userId: string | null;
  reglements: Regelement[];
  createdAt: string | null;
  updatedAt: string | null;
};
