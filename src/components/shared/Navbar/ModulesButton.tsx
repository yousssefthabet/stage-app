import React from "react";
import { FaLayerGroup } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import Link from "next/link";

function ModulesButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-primary-dark hover:bg-primary-dark hover:text-secondary-clr h-10 w-10 cursor-pointer rounded-full border-0"
        >
          <FaLayerGroup />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]">
        <DropdownMenuItem>Calendrier</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Nouvelle simulation</DropdownMenuItem>
        <DropdownMenuItem>Projets personnels</DropdownMenuItem>
        <DropdownMenuItem>Liste des factures courtiers</DropdownMenuItem>
        <DropdownMenuItem>Liste des prescripteurs</DropdownMenuItem>
        <DropdownMenuItem>Corbeille des projets</DropdownMenuItem>
        <Link href="/bibliotheque">
          <DropdownMenuItem>Communication</DropdownMenuItem>
        </Link>
        <DropdownMenuItem>
          Formation: Logiciels & Argumentaires
        </DropdownMenuItem>
        <Link href="/facture">
          <DropdownMenuItem>Facturation</DropdownMenuItem>
        </Link>
        <DropdownMenuItem>Suivi Société</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Suivi des demandes de prêts</DropdownMenuItem>
        <DropdownMenuItem>Suivi des mandats</DropdownMenuItem>
        <DropdownMenuItem>Suivi des documents réçus</DropdownMenuItem>
        <DropdownMenuItem>Statistiques factures</DropdownMenuItem>
        <DropdownMenuItem>Statistiques commissionnement</DropdownMenuItem>
        <DropdownMenuItem>Statistiques Projets</DropdownMenuItem>
        <DropdownMenuItem>Espace statistiques</DropdownMenuItem>
        <DropdownMenuItem>Statistiques global</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ModulesButton;
