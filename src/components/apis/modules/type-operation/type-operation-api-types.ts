import { type TypeOperation } from "@/apis/types/type-operation-types";

export type TypeOperationsGetResponse = {
  data: {
    data: TypeOperation[];
  };
};

export type TypeOperationsGetOneResponse = {
  data: TypeOperation;
};
