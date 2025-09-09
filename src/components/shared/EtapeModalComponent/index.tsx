"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import EtapeModalComponentForm from "./form";
import { Modal } from "../ModalComponent";
import { type HeaderProjet } from "@/apis/types/header-projet-type";

function EtapeModalComponent({
  etapeName,
  customerName,
  data,
}: {
  etapeName: string;
  customerName: string;
  data: HeaderProjet;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="border-none bg-transparent text-gray-500 underline shadow-none hover:bg-transparent hover:text-gray-700"
        onClick={() => setIsOpen(true)}
      >
        {etapeName}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`Nom du compte : ${customerName}`}
        width="800px"
        maxWidth="40vw"
      >
        <EtapeModalComponentForm onClose={() => setIsOpen(false)} data={data} />
      </Modal>
    </>
  );
}

export default EtapeModalComponent;
