"use client";

import { apiClientWithAuth, customInstance } from "@/server/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AuditLogGetResponse,
  SmsHistoryGetResponse,
  TaskHistoryGetResponse,
} from "./historiques-api-types";
import {
  auditLogKey,
  smsHistoryKey,
  taskHistoryKey,
} from "./historiques-constants";

export async function getTaskHistory() {
  const response = await customInstance<TaskHistoryGetResponse>({
    url: `/task/history`,
    method: "GET",
  });
  return response.data;
}

export const useTaskHistory = () => {
  return useQuery({
    queryKey: taskHistoryKey,
    queryFn: () => getTaskHistory(),
  });
};

export async function getSmsHistory() {
  const response = await customInstance<SmsHistoryGetResponse>({
    url: `/sms/history`,
    method: "GET",
  });
  return response.data;
}

export const useSmsHistory = () => {
  return useQuery({
    queryKey: smsHistoryKey,
    queryFn: () => getSmsHistory(),
  });
};

export async function getAuditLogHistory(page = 1, perPage = 10) {
  const response = await customInstance<AuditLogGetResponse>({
    url: "audit-log",
    method: "GET",
    params: {
      page,
      perPage,
    },
  });
  return {
    data: response.data,
    meta: {
      currentPage: page,
      perPage: perPage,
      totalPages: response.totalPages || 1,
      count: response.count || 0,
    },
  };
}

export const useAuditLogHistory = (page = 1, perPage = 10) => {
  return useQuery({
    queryKey: [...auditLogKey, page, perPage],
    queryFn: () => getAuditLogHistory(page, perPage),
  });
};

export async function deleteAllAuditLogs() {
  const client = await apiClientWithAuth();
  return client.delete("/audit-log");
}

export const useDeleteAllAuditLogs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteAllAuditLogs(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: auditLogKey });
    },
  });
};
