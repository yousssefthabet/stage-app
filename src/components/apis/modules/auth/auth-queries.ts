import { customInstance } from "@/server/axios";
import { useQuery } from "@tanstack/react-query";
import { type whoAmIResponse } from "@/apis/modules/auth/auth-api-types";

export const whoAmI = async (cookie?: string) => {
  return await customInstance<whoAmIResponse>({
    url: "/auth/whoami",
    method: "GET",
  });
};

export const useWhoAmI = () => {
  return useQuery({
    queryKey: ["whoAmI"],
    queryFn: () => whoAmI(),
  });
};
