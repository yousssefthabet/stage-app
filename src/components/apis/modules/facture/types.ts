import { type Facture } from "@/apis/types/facture-type";

export type FacturesGetResponse = {
  message: string;
  statusCode: number;
  data: Facture[];
  count: number;
  totalPages: number;
};
