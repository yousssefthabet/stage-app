import { type UsageLogement } from "@/apis/types/usage-logement-types";

export type UsageLogementGetResponse = {
  data: {
    data: UsageLogement[];
  };
};
