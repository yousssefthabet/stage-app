import { type LucideIcon } from "lucide-react";

export type NylasConnectUrlResponse = {
  url: string;
};

export type NylasTokenResponse = {
  data: {
    access_token: string;
    expires_in: number;
    grantId: string;
  };
};

export type NylasFolder = {
  attributes?: string[];
  grantId?: string;
  id: string;
  name: string;
  object: string;
  systemFolder: boolean;
  totalCount: number;
  unreadCount: number;
};

export type SystemFolder = {
  id: string;
  name: string;
  display_name: string;
  icon?: LucideIcon;
  isActive?: boolean;
  system_folder: boolean;
  object?: "folder";
};

export type CustomFolder = {
  id: string;
  name: string;
  display_name: string;
  icon?: LucideIcon;
  count?: number;
  isActive?: boolean;
  system_folder?: boolean;
};
export type Folder = NylasFolder | SystemFolder | CustomFolder;

export type NylasAttachment = {
  id: string;
  filename: string;
  size: number;
  content_type: string;
  grant_id: string;
  message_id: string;
};

export type NylasEmail = {
  data: string;
  attachments?: NylasAttachment[];
  bcc?: string[];
  body: string;
  cc?: string[];
  date: number;
  folders: string[];
  from?: Array<{ address: string; name: string }>;
  grantId: string;
  id: string;
  object: string;
  replyTo: string[];
  snippet: string;
  starred: boolean;
  subject: string;
  threadId: string;
  to: Array<{ email: string; name: string | null }>;
  unread: boolean;
};

// Additional interfaces for send email functionality
export type SendEmailRequest = {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  replyToMessageId?: string;
};
export type EmailAttachment = {
  id: string;
  name: string;
  size: number;
  contentType: string;
  file?: File;
};
export type ComposeEmailData = {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  attachments?: EmailAttachment[];
  replyToMessageId?: string;
};

export type NylasEmailsResponse = {
  data: NylasEmail[];
  nextPageToken?: string;
  totalCount?: number;
};
export type MailListAccountResponse = {
  data: Account[];
};
export type Account = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isActive?: boolean;
  grantId: string;
};

export interface NylasApiResponse {
  message: string;
  status: string;
  data: {
    messages: {
      data: NylasEmail[];
      nextCursor?: number | null;
      prevCursor?: number | null;
      nextPageToken?: number | null;
      status: {
        messages: number;
        unseen: number;
      };
    };
  };
}

export interface NylasEmailResponse {
  data: NylasEmail;
}
export interface SendEmailParams {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  replyToMessageId?: string;
  attachments?: File[];
}

export interface SendEmailResponse {
  status: string;
  message: string;
  data?: {
    id: string;
    // Other fields returned by the API
  };
}

export interface DeleteEmailResponse {
  status: string;
  message: string;
}

export interface AttachmentResponse {
  status: string;
  message: string;
  data: {
    attachment: {
      data: NylasAttachment;
    };
  };
}

export const folderTranslations: Record<string, string> = {
  INBOX: "Boîte de réception",
  Sent: "Messages envoyés",
  SentItems: "Messages envoyés",
  Trash: "Corbeille",
  Deleted: "Corbeille",
  Junk: "Courrier indésirable",
  Spam: "Courrier indésirable",
  Drafts: "Brouillons",
  Archive: "Archives",
  // Ajoute d’autres si besoin
};
