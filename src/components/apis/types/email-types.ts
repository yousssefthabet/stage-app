import { type User } from "@/apis/types/user-types";

export type EmailAttachment = {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
};

export type CreateEmailRequest = {
  subject: string;
  body: string;
  to: string;
  cc: string[];
  bcc: string[];
  isDraft: boolean;
  attachments: File[];
};

export type Email = {
  id: string;
  subject: string;
  body: string;
  sender: User;
  receiver: User;
  createdAt: Date;
  deletedAt: Date | null;
  isOpen: boolean;
  isDraft: boolean;
  attachments: EmailAttachment[];
};
