import { type riskySport } from "@/apis/types/risky-sport-type";

export type roskySportsGetResponse = {
  statusCode: number;
  message: string;
  data: riskySport[];
};
