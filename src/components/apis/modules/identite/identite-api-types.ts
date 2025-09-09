import { type Identite } from "@/apis/types/identite-types";

export type identiteGetResponse = {
  statusCode: number;
  message: string;
  data: {
    statusCode: number;
    data: Identite;
  };
};

export type updateIdentiteRequest = {
  data: Identite;
};

export type createIdentiteRequest = {
  data: Identite;
};

export type createIdentiteResponse = {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
  data?: Identite;
};

export type updateIdentiteResponse = {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
  data?: {
    statusCode: number;
  };
};
