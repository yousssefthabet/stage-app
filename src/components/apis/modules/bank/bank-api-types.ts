import { type Bank } from "@/apis/types/bank-type";

export type banksGetResponse = {
  statusCode: number;
  message: string;
  data: Bank[];
};
