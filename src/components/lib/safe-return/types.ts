import type { AxiosResponse } from "axios";

export type BackEndError = {
  statusCode: number;
  message: string;
  error: string;
  errors?: never;
};

export type BackEndErrors = {
  statusCode: number;
  message: string;
  errors: {
    field: string;
    errors: string[];
  }[];
  error?: never;
};

export type BackEndErrorResponse = BackEndError | BackEndErrors;

export type BackEndSuccess<T> = {
  statusCode: number;
  message: string;
  data: T;
};

export type returnType<T> = BackEndSuccess<T>;

export type CustomAxiosResponse<T> = Omit<AxiosResponse, "data"> & {
  data: returnType<T>;
};

export type SerializedBackEndError =
  | ({ _tag: "BackEndApiError" } & BackEndError)
  | ({ _tag: "BackEndApiErrors" } & BackEndErrors)
  | { _tag: "UnknownError"; message: string };
