import { type Pipeline, type Step } from "@/apis/types/pipeline-types";
import { type Role } from "@/apis/types/role-types";

export type pipelineGetResponse = {
  data: Pipeline[];
};

export interface CreatePipelineRequest {
  name: string;
  role?: Role;
}
export interface updatePipelineRequest {
  data: {
    id: number;
    name?: string;
    roleId?: number;
  };
}

export interface CreatePipelineStepRequest {
  name: string;
  order: number;
  pipelineId: number;
}
export interface updatePipelineStepRequest {
  data: {
    id: number;
    name: string;
    order: number;
    pipelineId?: number;
  };
}
export type CreatePipelineSubStepRequest = {
  name: string;
  order: number;
  category?: Step;
  ident?: string;
  stepId: number;
};
export interface updatePipelineSubStepRequest {
  data: {
    id: number;
    name: string;
    order: number;
    stepId?: number;
  };
}

export type CreateStepResponse = {
  data: {
    id: number;
  };
};

export interface SubStep {
  id: string;
  name: string;
  order: number;
  stepId: string;
  ident: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubStepResponse {
  statusCode: number;
  message: string;
  data: SubStep[];
}

export type StepsResponse = {
  statusCode: number;
  message: string;
  data: Step[];
};
