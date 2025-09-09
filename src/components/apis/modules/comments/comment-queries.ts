"use client";

import { apiClientWithAuth } from "@/server/axios";
import { useQuery } from "@tanstack/react-query";
import { commentKey } from "./comment-constants";
import { type CommentGetResponse } from "./comment-api-types";

export async function getComment(id: string) {
  const client = await apiClientWithAuth();
  const result = await client.get<CommentGetResponse>(
    `/customer/comment/${id}`,
  );
  return result.data.data.comments;
}

export const useComment = (id: string) => {
  return useQuery({
    queryKey: commentKey,
    queryFn: () => getComment(id),
  });
};
