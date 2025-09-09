import React from "react";
import FactureparSource from "../modules/facture/FactureparSource";
import StatBoxFacture from "../modules/facture/StatBoxFacture";
import TopBarFacture from "../modules/facture/TopBarFacture/TopBarFacture";
import FactureTable from "../modules/facture/FactureTable";
import TotalFacture from "../modules/facture/TotalFacture";
import type { JSX } from "react";

type StatItem = {
  value: number;
  label?: string;
  isPrimary?: boolean;
  format?: "eur";
};

type Box = {
  title: string;
  items: StatItem[];
};

export default function Facture(): JSX.Element {
  const boxes: Box[] = [
    {
      title: "Total Facture",
      items: [
        { value: 3, isPrimary: true },
        { label: "2L", value: 1 },
        { label: "Mandataires", value: 2 },
      ],
    },
    {
      title: "Total CA",
      items: [
        { value: 8500, isPrimary: true, format: "eur" },
        { label: "2L", value: 2500, format: "eur" },
        { label: "Mandataires", value: 6000, format: "eur" },
      ],
    },
    {
      title: "CA Réglé",
      items: [
        { value: 8500, isPrimary: true, format: "eur" },
        { label: "2L", value: 2500, format: "eur" },
        { label: "Mandataires", value: 6000, format: "eur" },
      ],
    },
    {
      title: "CA à encaisser",
      items: [
        { value: 0, isPrimary: true, format: "eur" },
        { label: "2L", value: 0, format: "eur" },
        { label: "Mandataires", value: 0, format: "eur" },
      ],
    },
  ];

  return (
    <div className="bg-gray-100 text-black">
      <div className="mt-1">
        <FactureparSource />
      </div>

      <div className="px-4 lg:px-8 py-6">
        <div className="max-w-[70rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {boxes.map((b, i) => (
            <StatBoxFacture key={i} title={b.title} items={b.items} />
          ))}
        </div>
      </div>

      <div className="mt-1">
        <TopBarFacture />
      </div>

      <div className="mt-1">
        <FactureTable />
      </div>

      <div className="-mt-6">
        <TotalFacture />
      </div>
    </div>
  );
}
