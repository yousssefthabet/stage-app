import { type Bank } from "./bank-type";
import { type Notaire } from "./notaire-types";
import { type User } from "./user-types";

export type AplicationInstructionEtat =
  | "en_cours"
  | "envisage"
  | "realise"
  | "abandonne"
  | "avant_compromis"
  | "compromis_signe"
  | "acte_signe"
  | "abandon";

export type ApplicationInstructionCauseAbandon =
  | "desistement_client"
  | "autre_cas"
  | "coord_manquante"
  | "coord_fausse"
  | "injoignable"
  | "financement_concurrent"
  | "refus_banque"
  | "fin_non_realisable"
  | "mdt_denoncer_courtier"
  | "mdt_denoncer_client"
  | "desistement_projet";

export type ApplicationInstructionEtatAssurance =
  | "abandonne"
  | "qs_remis_client"
  | "qs_recue_non_ok"
  | "qs_recu_ok"
  | "qs_envoye"
  | "ok_da_attente_op"
  | "ok_da_envoye"
  | "ok_da_incomplet"
  | "ok_en_gestion"
  | "refuse"
  | "desistement_client";

export type ApplicationInstructionEtatDossier =
  | "realise"
  | "abandon"
  | "nouveau"
  | "instruction"
  | "envoye_banque"
  | "accorde"
  | "accepte"
  | "facture"
  | "cloture"
  | "valide_siege";

export type ApplicationInstructionEtatOffre = "emise" | "acceptee" | "refusee";

export type DossierGeneral = {
  id: string;
  applicationId: string;
  dateCreation: Date | null;
  dateInstruction: Date | null;
  numeroAffaire: string | null;
  code: string | null;
  commerciale: User | null;
  agentBackoffice: User | null;
  apporteur: User | null;
  notaire: Notaire | null;
  refDossierEnBanque: string | null;
  venteDistance: boolean;
  etat: AplicationInstructionEtat;
  enCoursDepuis: Date | null;
  dateActe: Date | null;
  etatOffre: ApplicationInstructionEtatOffre;
  dateDemission: Date | null;
  dateSignature: Date | null;
  etatDossier: ApplicationInstructionEtatDossier;
  dateAcceptation: Date | null;
  dateDabandon: Date | null;
  dateCloture: Date | null;
  causeAbandon: ApplicationInstructionCauseAbandon;
  archive: boolean;
  etatAssurance: ApplicationInstructionEtatAssurance;
  dateQs: Date | null;
  nomAffaire: string;
  pasHonoraire: boolean;
  pasCommissionBancaire: boolean;
  pasRistourne: boolean;
  ponderation: number | null;
  bank: Bank | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
