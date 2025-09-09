"use client";

import React, { useState } from "react";

export type MandatsFilters = {
  parFiltre: string;
  status: string;
  etatDossier: string;
};

type Props = {
  onApply?: (filters: MandatsFilters) => void; 
  className?: string;
};

export default function MandatsFilter({ onApply, className = "" }: Props) {
  const [filters, setFilters] = useState<MandatsFilters>({
    parFiltre: "Tous",
    status: "",
    etatDossier: "",
  });

  const update = <K extends keyof MandatsFilters>(k: K, v: MandatsFilters[K]) =>
    setFilters((f) => ({ ...f, [k]: v }));

  return (
    <div className={`bg-white rounded-md border border-cyan-700 px-4 py-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Par filtre */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            Par filtre
          </div>
          <select
            value={filters.parFiltre}
            onChange={(e) => update("parFiltre", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option>Tous</option>
            <option>DDP par banque</option>
            <option>DDP par commerciale</option>
            <option>DDP par agence</option>
          </select>
        </div>

        {/* Status */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            Status
          </div>
          <input
            value={filters.status}
            onChange={(e) => update("status", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Etat Dossier */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            Etat Dossier
          </div>
          <input
            value={filters.etatDossier}
            onChange={(e) => update("etatDossier", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
      </div>
    </div>
  );
}
