"use client";

import { customInstance, type FichierReponse } from "@/server/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useNylasConnectUrlKey,
  useNylasFoldersKey,
  useNylasEmailsKey,
  useNylasAccountsKey,
} from "./mail-constants";
import {
  type NylasFolder,
  type NylasTokenResponse,
  type NylasEmail,
  type NylasApiResponse,
  type NylasEmailResponse,
  type SendEmailParams,
  type SendEmailResponse,
  type DeleteEmailResponse,
  type MailListAccountResponse,
  type Account,
} from "./mail-types";

export async function nylasConnectUrl() {
  const result = await customInstance({
    url: `/nylas/auth/connecturl`,
    method: "get",
    params: { redirectURI: "http://localhost:3000/espace-mail" },
  });

  return result;
}

export const useNylasConnectUrl = () => {
  return useQuery({
    queryKey: ["nylasConnectUrl"],
    queryFn: () => nylasConnectUrl(),
  });
};

export async function exchangeCodeForToken(code: string | undefined) {
  const result = await customInstance<NylasTokenResponse>({
    url: `/nylas/auth/token`,
    method: "get",
    params: { code, redirectURI: "http://localhost:3000/espace-mail" },
  });
  localStorage.setItem("nylasGrantId", result.data.grantId);

  return result;
}

export const useNylasToken = (code: string | undefined) => {
  return useQuery({
    queryKey: [...useNylasConnectUrlKey, code],
    queryFn: () => {
      if (!code) throw new Error("No authorization code provided");
      return exchangeCodeForToken(code);
    },
    enabled: !!code, // Only run when code exists
  });
};

export async function fetchFolders(refMail: string): Promise<NylasFolder[]> {
  const result = await customInstance<{
    statusCode: number;
    message: string;
    data: {
      folders: {
        data: NylasFolder[];
      };
    };
  }>({
    url: `/ovh/folders/${refMail}`,
    method: "get",
  });

  // Extract the folders array from the nested response
  return result.data.folders.data;
}

export const useNylasFolders = (refMail: string) => {
  return useQuery<NylasFolder[]>({
    queryKey: [...useNylasFoldersKey, refMail],
    queryFn: () => fetchFolders(refMail),
    enabled: !!refMail, // Only fetch when grantId exists
  });
};

export async function fetchEmailsByFolderName(
  refMail: string,
  folderName: string,
  options?: {
    limit?: number;
    offset?: number;
    page_token: number | null;
    mailFilter?: string;
  },
): Promise<{
  data: NylasEmail[];
  nextPageToken: number | null;
  prevCursor: number | null;
  total: number;
  unseen: number;
}> {
  const params: Record<string, string | number | undefined | boolean> = {
    limit: options?.limit ?? 30,
  };

  // Only add offset if it's defined and not 0
  if (options?.offset !== undefined && options.offset !== 0) {
    params.offset = options.offset;
  }

  // Add page_token if provided
  if (options?.page_token) {
    params.pageToken = options.page_token;
  }

  // Handle folder name - for system folders, use the name directly
  // For custom folders, you might need to prefix with "label_"
  if (folderName) {
    params.inQuery = `${folderName}`;
  }
  if (options?.mailFilter === "unread") {
    params.unread = true;
  }

  const result = await customInstance<NylasApiResponse>({
    url: `/ovh/mails/${refMail}`,
    method: "get",
    params,
  });

  return {
    data: result.data.messages.data,
    nextPageToken: result.data.messages.nextCursor ?? null,
    prevCursor: result.data.messages.prevCursor ?? null,
    total: result.data.messages.status.messages,
    unseen: result.data.messages.status.unseen,
  };
}

export const useNylasEmailsByFolderName = (
  refMail: string,
  folderName: string,
  options?: {
    limit?: number;
    offset?: number;
    page_token: number | null;
    mailFilter?: string;
  },
) => {
  return useQuery({
    queryKey: [...useNylasEmailsKey, folderName, options?.page_token],
    queryFn: () => fetchEmailsByFolderName(refMail, folderName, options),
    enabled: !!folderName,
  });
};

export async function fetchEmailDetails(refMail: string, emailId: string) {
  const result = await customInstance<NylasEmailResponse>({
    url: `/ovh/mails/${refMail}/${emailId}`,
    method: "get",
  });

  return result.data;
}

export const useNylasEmailDetails = (refMail: string, emailId: string) => {
  return useQuery<NylasEmail>({
    queryKey: [...useNylasEmailsKey, refMail, emailId],
    queryFn: () => fetchEmailDetails(refMail, emailId),
    enabled: !!refMail && !!emailId,
  });
};

export async function fetchEmailAttachment(
  refMail: string,
  messageId: string,
  attachmentId: string,
) {
  return await customInstance<FichierReponse>({
    url: `/ovh/mails/${refMail}/attachments/${attachmentId}`,
    method: "GET",
    params: { messageId },
    responseType: "blob",
  });
}

export function useDownloadAttachment() {
  return useMutation({
    mutationFn: async (vars: {
      refMail: string;
      messageId: string;
      attachmentId: string;
    }) => {
      const { blob, fileName, contentType } = await fetchEmailAttachment(
        vars.refMail,
        vars.messageId,
        vars.attachmentId,
      );
      // Déclenche le téléchargement
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName ?? "attachment";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      return true;
    },
  });
}

export async function sendEmail(
  refMail: string,
  emailData: SendEmailParams | FormData,
) {
  const result = await customInstance<SendEmailResponse>({
    url: `/ovh/mails/${refMail}/send`,
    method: "post",
    data: emailData,
  });

  return result.data;
}

// NEW: Send Email Mutation Hook
export const useSendEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      refMail,
      emailData,
    }: {
      refMail: string;
      emailData: SendEmailParams | FormData;
    }) => sendEmail(refMail, emailData),
    onSuccess: (data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: [...useNylasEmailsKey],
      });
    },
  });
};

export async function deleteEmail(
  refMail: string,
  emailId: string,
): Promise<DeleteEmailResponse> {
  const result = await customInstance<DeleteEmailResponse>({
    url: `/ovh/mails/${refMail}/${emailId}`,
    method: "delete",
  });
  return result;
}

export const useDeleteEmail = () => {
  const queryClient = useQueryClient();

  return useMutation<
    DeleteEmailResponse,
    Error,
    { refMail: string; emailId: string }
  >({
    mutationFn: ({ refMail, emailId }) => deleteEmail(refMail, emailId),
    onSuccess: (data, variables) => {
      // Invalidate and refetch emails to update the list
      void queryClient.invalidateQueries({
        queryKey: [...useNylasEmailsKey],
      });
    },
  });
};

export async function moveEmailToFolder(
  emailId: string,
  refMail: string,
  folderId: string,
) {
  return await customInstance({
    url: `/ovh/mails/${refMail}/move-email/${emailId}`,
    method: "put",
    data: { folderId },
  });
}

export const useMoveEmailToFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      emailId,
      refMail,
      folderId,
    }: {
      emailId: string;
      refMail: string;
      folderId: string;
    }) => moveEmailToFolder(emailId, refMail, folderId),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: [...useNylasEmailsKey, variables.refMail],
      });
    },
  });
};

export async function listAccount() {
  const res = await customInstance<MailListAccountResponse>({
    url: `ovh/account`,
    method: "GET",
  });
  return res.data;
}

export const useListAccount = () => {
  return useQuery<Account[]>({
    queryKey: [...useNylasAccountsKey],
    queryFn: () => listAccount(),
  });
};
