"use client";

import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Modal } from "../ModalComponent";
import SourceModalComponentForm from "./form";
import { useTypeSources } from "../../apis/modules/type-source/type-source-queries";
import { useDetailsSources } from "../../apis/modules/details-source/details-source-queries";

export default function SourceModalComponent({
  sourceId,
  detailsSourceId,
}: {
  sourceId: string | null;
  detailsSourceId: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { data: TypeSourcesData } = useTypeSources();
  const { data: DetailsSourcesData } = useDetailsSources();

  const sources =
    TypeSourcesData?.map((source) => ({
      value: source.id,
      label: source.name,
      sourceType: source.valueSourceType,
    })) ?? [];

  const detailsSources =
    DetailsSourcesData?.map((detail) => ({
      value: detail.id,
      label: detail.label ?? "Aucun label",
      sourceType: detail.typeSourceId,
    })) ?? [];

  const source = TypeSourcesData?.find((s) => s.id === sourceId) ?? null;

  return (
    <>
      <Button
        variant="outline"
        className="border-none bg-transparent text-gray-500 underline shadow-none hover:bg-transparent hover:text-gray-700"
        onClick={() => setIsOpen(true)}
      >
        {source?.name}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Provenance"
        width="800px"
        maxWidth="40vw"
      >
        <SourceModalComponentForm
          sourceId={sourceId}
          detailsSourceId={detailsSourceId}
          rawSources={TypeSourcesData ?? []}
          sources={sources}
          detailsSources={detailsSources}
          onClose={() => setIsOpen(false)}
        />
      </Modal>
    </>
  );
}
