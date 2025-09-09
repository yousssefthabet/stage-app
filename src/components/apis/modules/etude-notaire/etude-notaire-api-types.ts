import { type EtudeNotaire } from "@/apis/types/etude-notaire-types";

export type EtudeNotaireGetResponse = {
  statusCode: number;
  message: string;
  data: EtudeNotaire[];
};

export type updateEtudeNotaireRequest = {
  data: EtudeNotaire;
};

export type createEtudeNotaireRequest = {
  data: EtudeNotaire;
};

export type updateEtudeNotaireResponse = {
  statusCode: number;
  message: string;
  data: EtudeNotaire;
};

export type createEtudeNotaireResponse = {
  statusCode: number;
  message: string;
  data: EtudeNotaire;
};
