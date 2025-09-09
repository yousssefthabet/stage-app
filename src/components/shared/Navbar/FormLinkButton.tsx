"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { toast } from "react-hot-toast";
import { Modal } from "../ModalComponent";
import { Paperclip } from "lucide-react";
import SharedButton from "./SharedButton";

function FormLinkButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        "https://app.credit-wiin.com/formulaire?code=v7vPPe1w2e3Wg982&provenance=1122",
      );
      toast.success("Url copiée dans le presse-papier");
    } catch (err: unknown) {
      toast.error(
        `Échec de la copie de l'URL : ${err instanceof Error ? err?.message : ""}`,
      );
    }
  };

  return (
    <>
      <SharedButton
        className="cursor-pointer text-white"
        onClick={() => setIsModalOpen(true)}
      >
        <Paperclip />
      </SharedButton>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Génération url formulaire"
        width="50vw"
        height="40vh"
        headerColor="primary"
      >
        <div>
          <h2>Deux méthodes pour copier le Url Formulaire :</h2>
          <div className="mb-5 p-2">
            <p className="text-sm">
              1. Sélection du code au survol puis CTRL+C ou clic droit puis «
              copier »
            </p>
            <p className="text-sm">2. Cliquez sur le bouton « Copier »</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <input
              type="text"
              disabled
              value="https://app.credit-wiin.com/formulaire?code=v7vPPe1w2e3Wg982&provenance=1122"
              className="w-full rounded-md border border-gray-300 p-2"
            />
            <Button
              className="bg-primary-dark hover:bg-secondary cursor-pointer rounded-md p-2 text-white transition-all duration-300 ease-in-out"
              onClick={copyToClipboard}
            >
              Copier
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default FormLinkButton;
