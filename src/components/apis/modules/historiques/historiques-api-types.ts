import { type AuditLog } from "@/apis/types/edit-logs";
import { type SmsTrace } from "@/apis/types/sms-trace-type";
import { type TaskSnapshot } from "@/apis/types/task-snapshot-type";

export type TaskHistoryGetResponse = {
  statusCode: number;
  message: string;
  data: TaskSnapshot[];
};

export type SmsHistoryGetResponse = {
  statusCode: number;
  message: string;
  data: SmsTrace[];
};

export type AuditLogGetResponse = {
  statusCode: number;
  message: string;
  data: AuditLog[];
  totalPages: number;
  count: number;
};
