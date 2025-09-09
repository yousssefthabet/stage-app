import { type Comment } from "@/apis/types/comment-types";
import { type User } from "@/apis/types/user-types";

export type CommentGetResponse = {
  statusCode: number;
  message: string;
  data: {
    comments: Comment[];
  };
};

export type updateCommentRequest = {
  id: number;
  userId: number;
  user: User;
  applicationId: number;
  comment: string;
};

export type updateCommenteResponse = {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
  data?: Comment;
};

export type createCommentRequest = {
  userId: string;
  applicationId: string;
  comment: string;
};

export type createCommentResponse = {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
  data?: Comment;
};

export type deleteCommentResponse = {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
  data?: {
    statusCode: number;
  };
};

export type deleteCommentRequest = {
  id: string;
};
