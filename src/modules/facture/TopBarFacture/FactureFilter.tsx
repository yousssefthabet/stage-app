import React, { useCallback, useMemo, useState } from "react";
import type { JSX } from "react";

type Filters = {
  dateFiltree: string;
  filtrePar: string;
  nature: string;
  commercial: string;
  etatActuel: string;
  societe: string;
};

type Props = {
  onApply?: (filters: Filters) => void;
};

export default function FactureFilter({ onApply }: Props): JSX.Element {
  const initial = useMemo<Filters>(
    () => ({
      dateFiltree: "Date d’émission",
      filtrePar: "",
      nature: "",
      commercial: "",
      etatActuel: "",
      societe: "",
    }),
    []
  );

  const [filters, setFilters] = useState<Filters>(initial);

  const update = useCallback((k: keyof Filters, v: string) => {
    setFilters((f) => ({ ...f, [k]: v }));
  }, []);

  const apply = useCallback(() => {
    onApply?.(filters);
  }, [filters, onApply]);

  return (
    <div className="bg-white rounded-md border border-cyan-700 px-4 py-4 max-w-[90rem] mx-auto">
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {/* Date filtrée */}
        <div className="relative">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            Date filtrée
          </div>
          <select
            value={filters.dateFiltree}
            onChange={(e) => update("dateFiltree", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-[13px] bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option>Date d’émission</option>
            <option>Date de règlement</option>
            <option>Date de création</option>
          </select>
        </div>

        {/* Filtre par */}
        <div className="relative">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            Filtre par
          </div>
          <select
            value={filters.filtrePar}
            onChange={(e) => update("filtrePar", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-[13px] bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value=""> </option>
            <option>Agence</option>
            <option>Commercial</option>
            <option>Nature</option>
          </select>
        </div>

        {/* Nature */}
        <div className="relative">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            Nature
          </div>
          <input
            value={filters.nature}
            onChange={(e) => update("nature", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-[13px] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Commercial */}
        <div className="relative">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            Commercial
          </div>
          <input
            value={filters.commercial}
            onChange={(e) => update("commercial", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-[13px] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* État actuel */}
        <div className="relative">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            État actuel
          </div>
          <select
            value={filters.etatActuel}
            onChange={(e) => update("etatActuel", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-[13px] bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value=""> </option>
            <option>En cours</option>
            <option>Réglée</option>
            <option>Annulée</option>
          </select>
        </div>

        {/* Société */}
        <div className="relative">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            Société
          </div>
          <input
            value={filters.societe}
            onChange={(e) => update("societe", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && apply()}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-[13px] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
      </div>
    </div>
  );
}
