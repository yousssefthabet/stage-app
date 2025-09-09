import { type User } from "@/apis/types/user-types";

export type Message = {
  id: number;

  discussionId: bigint;
  userId: bigint;
  message: string;
  sentAt: Date;
  readAt: Date | null;
  createdAt: Date;

  from: "me" | "user";
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
};

export type Discussion = {
  id: number;
  unreadCount: number;
  user: User;
  messages: Message[];
};
