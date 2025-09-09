import { type EtatProjetImmobilier } from "@/apis/types/etat-projet-immobilier-types";

export type EtatProjetImmobilierGetResponse = {
  data: {
    data: EtatProjetImmobilier[];
  };
};
