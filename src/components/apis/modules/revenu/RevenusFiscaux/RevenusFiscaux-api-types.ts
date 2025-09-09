import { type RevenusFiscaux } from "@/apis/types/revenusFiscaux-type";

export type RevenusFiscauxGetResponse = {
  count: number;
  message: string;
  statusCode: number;
  totalPages: number;
  data: RevenusFiscaux[];
};
