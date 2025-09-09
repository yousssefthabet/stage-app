import { type societeBilans } from "@/apis/types/societe-bilans-type";

export type SocieteBilansGetResponse = {
  statusCode: number;
  message: string;
  data: societeBilans[];
};

export type SocieteBilansCreateResponse = {
  statusCode: number;
  message: string;
  data: societeBilans;
};

export type SocieteBilansUpdateResponse = {
  statusCode: number;
  message: string;
  data: societeBilans;
};

export type SocieteBilansDeleteResponse = {
  statusCode: number;
  message: string;
  data: societeBilans | null;
};

export type SocieteBilansUpdateRequest = {
  data: societeBilans;
};

export type SocieteBilansCreateRequest = {
  data: societeBilans;
};

export type createSocieteBilanApiRequest = {
  data: societeBilans;
};

export type updateSocieteBilanApiRequest = {
  data: societeBilans;
};

export type deleteSocieteBilanApiRequest = {
  id: number;
};

export type createSocieteBilanApiResponse = {
  statusCode: number;
  message: string;
  data: societeBilans;
};

export type updateSocieteBilanApiResponse = {
  statusCode: number;
  message: string;
  data: societeBilans;
};

export type deleteSocieteBilanApiResponse = {
  statusCode: number;
  message: string;
  data: societeBilans | null;
};
