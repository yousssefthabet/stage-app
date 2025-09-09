import { z } from "zod";

export enum TenueCompteStatusEnum {
  TENU_ATTENTE_JUSTIFICATION = "TENU_ATTENTE_JUSTIFICATION",
  TENU_NON_JUSTIFIER = "TENU_NON_JUSTIFIER",
  TENU_JUSTIFIER = "TENU_JUSTIFIER",
}

export enum TenueCompteProvenanceEnum {
  LIVRET_A = "LIVRET_A",
  LDD = "LDD",
  PEL = "PEL",
  VENTE_D_UN_BIEN = "VENTE_D_UN_BIEN",
  DONATION = "DONATION",
  SEQUESTRE_NOTAIRE = "SEQUESTRE_NOTAIRE",
  COMPTE_COURANT = "COMPTE_COURANT",
}
export enum LoanRequestStatusEnum {
  DRAFT = "DRAFT",
  SENT = "SENT",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  FUNDED = "FUNDED",
}

export enum MailTemplateEnum {
  INITIAL_REQUEST = "INITIAL_REQUEST",
  REMINDER = "REMINDER",
  APPROVAL = "APPROVAL",
  REJECTION = "REJECTION",
}

export enum TenueCompteDetailsChqVirEnum {
  CHEQUE = "CHEQUE",
  VIREMENT = "VIREMENT",
}

const CustomerEntitySchema = z.object({
  id: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export interface Detenteur {
  id: string;
  firstName?: string;
  lastName?: string;
}

export const TenueCompteDetailSchema = z.object({
  id: z.string(),
  date: z
    .string()
    .transform((val) => (val ? new Date(val) : undefined))
    .optional(),
  numCompte: z.string().optional(),
  detenteurs: z.array(CustomerEntitySchema).optional(),
  montant: z.number().optional(),
  montantFp: z.number().optional(),

  nbrCommission: z.number().optional(),
  accompte: z.number().optional(),

  status: z
    .enum([
      TenueCompteStatusEnum.TENU_ATTENTE_JUSTIFICATION,
      TenueCompteStatusEnum.TENU_NON_JUSTIFIER,
      TenueCompteStatusEnum.TENU_JUSTIFIER,
    ])
    .optional(),
  montantQuittance: z.number().optional(),
  salaireRecu: z.number().optional(),
  loyerRegle: z.number().optional(),
  chqVir: z
    .enum([
      TenueCompteDetailsChqVirEnum.CHEQUE,
      TenueCompteDetailsChqVirEnum.VIREMENT,
    ])
    .optional(),
  ecart: z.number().optional(),
  solde: z.number().optional(),
  month: z.string().optional(),
  commentaire: z.string().optional(),
  provenance: z
    .enum([
      TenueCompteProvenanceEnum.LIVRET_A,
      TenueCompteProvenanceEnum.LDD,
      TenueCompteProvenanceEnum.PEL,
      TenueCompteProvenanceEnum.VENTE_D_UN_BIEN,
      TenueCompteProvenanceEnum.DONATION,
      TenueCompteProvenanceEnum.SEQUESTRE_NOTAIRE,
      TenueCompteProvenanceEnum.COMPTE_COURANT,
    ])
    .optional(),
  bankId: z.number().optional(),
  detenteurIds: z.array(z.number()).optional(),
});

export type TenueCompteDetailValues = z.infer<typeof TenueCompteDetailSchema>;
export interface tenueComptesDataCopy {
  id: string;
  provenance?: TenueCompteProvenanceEnum | null;
  date?: Date;
  numCompte?: string;
  detenteurs?: Detenteur[];
  montant?: number;
  montantFp?: number;
  salaireRecu?: number;
  month?: string;
  nbrCommission?: number;
  bankId?: number;
  montant_fiche_paie?: string;
  accompte?: number;
  salaire_recu?: string;
  chqVir?: TenueCompteDetailsChqVirEnum | null;
  ecart?: number;
  status?: TenueCompteStatusEnum | null;
  commentaire?: string;
  montantQuittance?: number;
  loyerRegle?: number;
  solde?: number;
  mode?: string;
  libelle?: string;
  detenteurIds?: number[];
}

export interface Eparge {
  epargne?: string;
  apport?: string;
  epargne_apres_operation?: string;
  epargneListe?: tenueComptesDataCopy[];
}

export const EpargeSchema = z.object({
  // Epargne
  epargne: z.string().optional(),
  apport: z.string().optional(),
  epargne_apres_operation: z.string().optional(),
  epargneListe: z
    .array(
      z.object({
        provenance: z.string().optional(),
        date: z.string().optional(),
        banque: z.string().optional(),
        num_compte: z.string().optional(),
        detenteur: z.string().optional(),
        montant: z.string().optional(),
      }),
    )
    .optional(),
});

export type EpargeValues = z.infer<typeof EpargeSchema>;

export interface tenueComptesListResponse {
  data: tenueComptesDataCopy[];
}

export interface tenueComptesData {
  id: string;
  provenance?: string;
  date?: string;
  num_compte?: string;
  detenteur?: string;
  montant?: string;
  nb_commissions?: string;
  banque?: string;
  banque_interlocuteur?: string;
  banque_telephone?: string;
  montant_fiche_paie?: string;
  accompte?: string;
  salaire_recu?: string;
  chq_vrt?: string;
  ecart?: string;
  status?: string;
  current_step?: number;
  commentaire?: string;
  montant_quittance?: number;
  loyer_regle?: string;
  solde?: string;
  mode?: string;
  libelle?: string;
  apport?: number;
  last_email_sent?: string;
  email_template_used?: MailTemplateEnum;
}
