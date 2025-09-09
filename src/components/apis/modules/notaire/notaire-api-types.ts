import { type Notaire } from "@/apis/types/notaire-types";

export type NotaireGetResponse = {
  statusCode: number;
  message: string;
  data: Notaire[];
};

export type updateNotaireRequest = {
  // Backend uses URL id; body should not include id
  // Allow linking to an etude via etudeId
  data: Omit<Notaire, "id"> & { etudeId?: number | null };
};

export type updateNotaireResponse = {
  statusCode: number;
  message: string;
  data: Notaire;
};

export type createNotaireRequest = {
  // Creating should not send id in body
  // Allow linking to an etude via etudeId
  data: Omit<Notaire, "id"> & { etudeId?: number | null };
};

export type createNotaireResponse = {
  statusCode: number;
  message: string;
  data: Notaire;
};
