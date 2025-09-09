"use client";

import { customInstance } from "@/server/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { discussionsKey } from "@/apis/modules/discussions/constants";
import {
  type DiscussionsCreateResponse,
  type DiscussionsListResponse,
  type MessagesListResponse,
} from "@/apis/modules/discussions/api-types";

// ➕ POST /discussion
export const createDiscussion = async (data: {
  participantId: number | string;
}) => {
  return await customInstance<DiscussionsCreateResponse>({
    url: `/discussion`,
    method: "POST",
    data,
  });
};

export const getDiscussionUsers = async () => {
  return await customInstance<DiscussionsListResponse>({
    url: "/discussion/users",
    method: "GET",
  });
};

export const getDiscussionMessages = async (discussionId: number | string) => {
  return await customInstance<MessagesListResponse>({
    url: `/discussion/${discussionId}/messages`,
    method: "GET",
  });
};

export const useDiscussionMessages = (discussionId: number | string) => {
  return useQuery({
    queryKey: [...discussionsKey, discussionId],
    queryFn: () => getDiscussionMessages(discussionId),
    enabled: !!discussionId,
  });
};

// Hook: useCreateDiscussion()
export const useCreateDiscussion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDiscussion,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...discussionsKey] });
    },
  });
};

export const useDiscussionUsers = () =>
  useQuery({
    queryKey: [...discussionsKey],
    queryFn: () => getDiscussionUsers(),
  });
