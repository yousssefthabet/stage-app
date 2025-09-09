import { type Complement } from "@/apis/types/complement-types";

export type ComplementssGetResponse = {
  statusCode: number;
  message: string;
  data: Complement;
};

export type updateComplementRequest = {
  data: Partial<Complement>;
  customerId: number;
};

export type updateComplementResponse = {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
};
