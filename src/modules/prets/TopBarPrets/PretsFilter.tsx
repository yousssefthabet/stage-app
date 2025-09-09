// PretsFilter.tsx
import React, { useState } from "react";

export type PretsFilters = {
  agence: string;
  commerciale: string;
  parFiltre: "DDP par banque" | "DDP par commerciale" | "DDP par agence";
  dossierRetenue: "Tous" | "Oui" | "Non";
  ddpRetenue: "Tous" | "Oui" | "Non";
  status: string;
  backoffice: string;
  societe: string;
};

type Props = {
  onApply?: (filters: PretsFilters) => void; // optional, just to “match apply”
  className?: string;
};

export default function PretsFilter({ onApply, className = "" }: Props) {
  const [filters, setFilters] = useState<PretsFilters>({
    agence: "",
    commerciale: "",
    parFiltre: "DDP par banque",
    dossierRetenue: "Tous",
    ddpRetenue: "Tous",
    status: "",
    backoffice: "",
    societe: "",
  });

  const update = <K extends keyof PretsFilters>(k: K, v: PretsFilters[K]) =>
    setFilters((f) => ({ ...f, [k]: v }));

  return (
    <div className={`bg-white rounded-md border border-cyan-700 px-4 py-4 w-full ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Agence */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            Agence
          </div>
          <input
            value={filters.agence}
            onChange={(e) => update("agence", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Commerciale */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            Commerciale
          </div>
          <input
            value={filters.commerciale}
            onChange={(e) => update("commerciale", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Par filtre */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            Par filtre
          </div>
          <select
            value={filters.parFiltre}
            onChange={(e) =>
              update(
                "parFiltre",
                e.target.value as PretsFilters["parFiltre"]
              )
            }
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option>DDP par banque</option>
            <option>DDP par commerciale</option>
            <option>DDP par agence</option>
          </select>
        </div>

        {/* Dossier retenue */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            Dossier retenue
          </div>
          <select
            value={filters.dossierRetenue}
            onChange={(e) =>
              update(
                "dossierRetenue",
                e.target.value as PretsFilters["dossierRetenue"]
              )
            }
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option>Tous</option>
            <option>Oui</option>
            <option>Non</option>
          </select>
        </div>

        {/* DDP retenue */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            DDP retenue
          </div>
          <select
            value={filters.ddpRetenue}
            onChange={(e) =>
              update(
                "ddpRetenue",
                e.target.value as PretsFilters["ddpRetenue"]
              )
            }
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option>Tous</option>
            <option>Oui</option>
            <option>Non</option>
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

        {/* Backoffice */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            Backoffice
          </div>
          <input
            value={filters.backoffice}
            onChange={(e) => update("backoffice", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Société */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            Société
          </div>
          <input
            value={filters.societe}
            onChange={(e) => update("societe", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
      </div>
    </div>
  );
}
