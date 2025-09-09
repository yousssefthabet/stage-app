import { type Mandat } from "@/apis/types/mandat-type";

export type MandatGetResponse = {
  message: string;
  statusCode: number;
  data: Mandat[];
  count: number;
  totalPages: number;
};
