import React from "react";
import DdpparSource from "../modules/prets/DdpparSource";
import StatBoxPrets from "../modules/prets/StatBoxPrets";
import TopBarPrets from "../modules/prets/TopBarPrets/TopBarPrets";
import PretsTable from "../modules/prets/PretsTable";
import type { JSX } from "react";

export type StatItem = {
  label?: string;
  value: number | string;
  isPrimary?: boolean;
  suffix?: string;
};

export type Box = {
  title: string;
  items: StatItem[];
};

export default function Prets(): JSX.Element {
  const boxes: Box[] = [
    // 1) Total DDP Envoyées
    {
      title: "Total DDP Envoyées",
      items: [
        { label: "Total DDP Envoyées", value: 0, isPrimary: true },
        { label: "2L", value: 0 },
        { label: "Mandataires", value: 0 },
      ],
    },
    // 2) Total DDP accordées / acceptées
    {
      title: "Total DDP accordées / acceptées",
      items: [
        { label: "Total DDP accordées / acceptées", value: "0 / 0", isPrimary: true },
        { label: "2L, accordées / acceptées", value: "0 / 0" },
        { label: "Mandataires accordées / acceptées", value: "0 / 0" },
      ],
    },
    // 3) Total DDP refusées / abandonnées
    {
      title: "Total DDP refusées / abandonnées",
      items: [
        { label: "Total DDP refusées / abandonnées", value: 0, isPrimary: true },
        { label: "2L", value: 0 },
        { label: "Mandataires", value: 0 },
      ],
    },
    // 4) Total Taux de transformation
    {
      title: "Total Taux de transformation",
      items: [
        { label: "Total Taux de transformation", value: 0, suffix: "%", isPrimary: true },
        { label: "2L", value: 0, suffix: "%" },
        { label: "Mandataires", value: 0, suffix: "%" },
      ],
    },
    // 5) Potentiel accord
    {
      title: "Potentiel accord",
      items: [
        { label: "Potentiel accord", value: "0 / 0", isPrimary: true },
        { label: "2L", value: 0 },
        { label: "Mandataires", value: 0 },
      ],
    },
  ];

  return (
    <div className="bg-gray-100 text-black">
      <div className="px-6 pt-6">
        <DdpparSource />
      </div>

     <div className="px-6 pt-6">
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
         {boxes.map((box, idx) => (
         <StatBoxPrets key={idx} title={box.title} items={box.items} />
        ))}
       </div>
     </div>

      

      <div className="mt-2">
        <TopBarPrets />
      </div>

      <div>
        <PretsTable />
      </div>
    </div>
  );
}
