"use client";

import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "sonner";
import { queryClient } from "../../lib/react-query";

function UserButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const clearCookie = (name: string) => {
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  };

  const handleLogout = () => {
    startTransition(() => {
      clearCookie("access_token"); // 👈 clear client-side cookie
      toast.success("Déconnexion réussie");
      router.push("/login");

      // Vider le cache React Query
      queryClient.clear();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-primary-dark hover:bg-primary-dark hover:text-secondary-clr h-10 w-10 cursor-pointer rounded-full border-0"
        >
          <FaUser />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={() => router.push("/compte/profile")}>
          Mon Compte
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <span>Se déconnecter</span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
