import React from "react";
import TopBarMandats from "../modules/mandats/TopBarMandats/TopBarMandats";
import MandatsparSource from "../modules/mandats/MandatsparSource";
import MandatsTable from "../modules/mandats/MandatsTable";
import StatBoxMandats from "../modules/mandats/StatBoxMandats";
import type { JSX } from "react";

export default function Mandat(): JSX.Element {
  // 1) Total mandat Envoyé
  const boxEnvoye = [
    { label: "Total mandat Envoyé", value: 0, isPrimary: true },
    { label: "2L", value: 0 },
    { label: "Mandataires", value: 0 },
  ];

  // 2) Total mandat reçu
  const boxRecu = [
    { label: "Total mandat reçu", value: 0, isPrimary: true },
    { label: "2L", value: 0 },
    { label: "Mandataires", value: 0 },
  ];

  // 3) Total Taux de transformation
  const boxTaux = [
    { label: "Total Taux de transformation", value: 0, suffix: "%", isPrimary: true },
    { label: "2L", value: 0, suffix: "%" },
    { label: "Mandataires", value: 0, suffix: "%" },
  ];

  // 4) Potentiel mandat à recevoir
  const boxPotentiel = [
    { label: "Potentiel mandat à recevoir", value: "0 / 0", isPrimary: true },
    { label: "2L", value: 0 },
    { label: "Mandataires", value: 0 },
  ];

  return (
    <div className="bg-gray-100 text-black min-h-screen">
      {/* KPI strip — same order and compact spacing as the screenshot */}
      <div className="px-6 pt-6">
       <MandatsparSource />
      </div>

      <div className="px-24 pt-6">
        <div className="flex flex-wrap gap-2">
          <StatBoxMandats title="Total mandat Envoyé" items={boxEnvoye} />
          <StatBoxMandats title="Total mandat reçu" items={boxRecu} />
          <StatBoxMandats title="Total Taux de transformation" items={boxTaux} />
          <StatBoxMandats title="Potentiel mandat à recevoir" items={boxPotentiel} />
        </div>
      </div>
      

      <div className="px-2 pt-4">
        <TopBarMandats />
      </div>

      <div className="px-2 pt-4 pb-8">
        <MandatsTable />
      </div>
    </div>
  );
}
