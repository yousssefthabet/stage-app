export enum AuditLogAction {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export type AuditLog = {
  id: bigint;
  model: string;
  modelId: string;
  action: AuditLogAction;
  description?: string | null;
  attribute?: string | null;
  oldValue?: string | null;
  newValue?: string | null;
  userId?: bigint | null;
  ipAddress?: string | null;
  createdAt: Date;
  updatedAt: Date;
};
