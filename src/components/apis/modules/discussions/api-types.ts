import { type Discussion, type Message } from "@/apis/types/discussion-types";

export type DiscussionsListResponse = {
  data: Discussion[];
};

export type MessagesListResponse = {
  data: Message[];
};

export type DiscussionsCreateResponse = {
  data: Discussion;
};
