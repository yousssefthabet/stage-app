import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import React from "react";
import { FaGear } from "react-icons/fa6";
import { useRouter } from "next/navigation";

function SettingsButton() {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-primary-dark hover:bg-primary-dark hover:text-secondary-clr h-10 w-10 cursor-pointer rounded-full border-0"
        >
          <FaGear />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>Configuration sous-agences</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/users")}>
          Rôles Utilisateurs
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/configuration/banques")}>
          Banques - Informations
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/configuration/agences")}>
          Banques - Coordonnées
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/banques-config")}>
          Banques - Configuration
        </DropdownMenuItem>
        <DropdownMenuItem>Banques RAC - Configuration</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/plafond-revenus")}>
          Prêts à taux zéro & Frais Notaire
        </DropdownMenuItem>{" "}
        <DropdownMenuItem>Baréme Pinel</DropdownMenuItem>
        <DropdownMenuItem>Leads - Affectations</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/email")}>
          Email - SMS
        </DropdownMenuItem>
        <DropdownMenuItem>Envoie des Emails</DropdownMenuItem>
        <DropdownMenuItem>Facture - Configuration</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/configuration/pipeline")}
        >
          Pipeline - Configuration
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/users/mandat")}>
          Mandats - Configuration
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/configuration-formation")}
        >
          Formations - Configuration
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/configuration/documents-pochettes")}
        >
          Pochettes - Configuration
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SettingsButton;
