import { type User } from "@/apis/types/user-types";
import { type CreatePhoneNumber } from "../PhoneNumber/phoneNumber-api-types";

export type UsersGetResponse = {
  data: {
    data: User[];
    lastPage: number;
    total: number;
  };
};

export type UsersWithRoleGetResponse = {
  message: string;
  statusCode: number;
  data: { data: User[] };
};

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  organizationId: string;
  roleId?: string;
  backofficeId?: number;
  commercialId?: number;
  category?: "PERSONNE_PHYSIQUE" | "PERSONNE_MORALE";
  gender?: "MALE" | "FEMALE";
  calendlyUrl?: string;
  phoneNumbers?: CreatePhoneNumber[];
}
export interface updateUserRequest {
  data: {
    username?: string;
    password?: string;
    organizationId: number;
    user: User;
  };
}

export type whoAmIGetResponse = {
  statusCode: number;
  message: string;
  data: {
    user: User;
  };
};
