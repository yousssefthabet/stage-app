import { type ApplicationProjectCostRequest } from "./application-project-cost-request.type";

export interface ApplicationProjectCostResponse
  extends ApplicationProjectCostRequest {
  id: string;
  applicationId: string;
}

export type ApplicationProjectCostListResponse = {
  data: ApplicationProjectCostResponse;
};
