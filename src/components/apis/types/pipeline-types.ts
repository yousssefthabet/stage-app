import { type Role } from "@/apis/types/role-types";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

export type Pipeline = {
  id: string;
  name: string | null;
  totalTasks: string | null;
  role: Role;
  roleId: string;
  steps: Step[];
};

export type SubStep = {
  id: number;
  name: string;
  order: number;
  ident?: string | null;
};

export type Step = {
  id: number;
  name: string;
  order: number;
  pipelineId: number;
  subSteps: SubStep[];
  totalTasks: number | null;
};

export type PipelineStepProps = {
  pipelineId: number;
  step: Step;
  stepId: number;
  listeners?: SyntheticListenerMap;
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
};
