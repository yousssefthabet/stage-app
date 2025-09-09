import { type City } from "./city-types";
import {
  type PhoneNumber,
  type EtudeNotaire,
  // type Address,
} from "./etude-notaire-types";

export type Notaire = {
  id: string;
  civilite: "M" | "MME";
  nom: string;
  prenom: string;
  email: string;
  notes?: string | null;
  fax?: PhoneNumber | null;
  phoneNumber?: PhoneNumber | null;
  etude: EtudeNotaire | null;
  etudeId: number | null;
  // addresses?: Address[] | null;
  streetName?: string;
  complement?: string;
  city?: City | null;
  cityId?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
};
