"use client";
import React from "react";
import { FaBell } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";

interface NotificationsButtonProps {
  NotificationsNumber: number;
}

const NotificationButton: React.FC<NotificationsButtonProps> = ({
  NotificationsNumber = 0,
}) => {
  const notifications = [
    {
      title: "Nouvelle mise à jour disponible",
      description:
        "Une mise à jour importante a été appliquée à votre espace client.",
      date: "14/03/2025 - 08:45",
    },
    {
      title: "Message non lu",
      description:
        "Vous avez reçu un nouveau message de DUPONT Jean concernant votre dossier.",
      date: "15/03/2025 - 14:30",
    },
    {
      title: "Rendez-vous confirmé",
      description:
        "Votre rendez-vous avec l'expert immobilier est confirmé pour le 18/03/2025 à 10h00.",
      date: "16/03/2025 - 09:15",
    },
    {
      title: "Nouvelle facture disponible",
      description:
        "Votre facture du mois de mars est disponible dans votre espace client.",
      date: "16/03/2025 - 12:50",
    },
    {
      title: "Modification de dossier",
      description:
        "Les documents de votre dossier ont été mis à jour par MARTIN Sophie.",
      date: "17/03/2025 - 16:20",
    },
    {
      title: "Signature requise",
      description:
        "Une signature est requise sur un document avant le 20/03/2025.",
      date: "17/03/2025 - 18:10",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-primary-dark hover:bg-primary-dark hover:text-secondary-clr relative h-10 w-10 cursor-pointer rounded-full border-0"
        >
          <span className="bg-secondary-clr absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full text-[9px] text-white">
            {NotificationsNumber > 9 ? "9+" : NotificationsNumber}
          </span>
          <FaBell />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[400px] w-[300px] overflow-y-auto">
        {notifications.map((notification, index) => (
          <React.Fragment key={index}>
            <DropdownMenuItem>
              <div className="text-xs">
                <h4 className="mb-1 font-bold">{notification.title}</h4>
                <p className="mb-1">{notification.description}</p>
                <span className="text-gray-400">{notification.date}</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator key={`separator-${index}`} />
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationButton;
