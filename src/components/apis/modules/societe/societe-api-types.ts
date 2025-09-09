import { type Societe } from "@/apis/types/societe-types";

export type SocietesGetResponse = {
  data: {
    data: Societe[];
  };
};

export type createSocieteApiRequest = {
  data: Societe;
};
