import React, { useState } from "react";
import SuiviSocieteFilter from "./SuiviSocieteFilter";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function TopBarsuiviSociete() {
  const [showFilters, setShowFilters] = useState(false);
  const [periode, setPeriode] = useState("Ce mois-ci");

  return (
    <div className="bg-gray-100 mx-auto max-w-[90rem]">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap">
        <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wide flex items-center gap-2">
          Suivi des societes
        </h2>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={periode}
              onChange={(e) => setPeriode(e.target.value)}
              className="appearance-none border border-gray-300 text-sm h-[30px] rounded bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-cyan-600 pr-8 pl-3"
            >
              <option>Retard</option>
              <option>Aujourd'hui</option>
              <option>Demain</option>
              <option>Cette semaine</option>
              <option>Ce mois-ci</option>
              <option>Le mois dernier</option>
              <option>Cette année</option>
              <option>Toute la période</option>
              <option>L'année dernière</option>
              <option>Date Personnaliser</option>
            </select>
            <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="border border-gray-300 text-sm px-4 h-[30px] rounded bg-white text-gray-700 hover:bg-cyan-50 transition flex items-center gap-1"
          >
            Filtres
            <ChevronDownIcon
              className={`w-4 h-4 transform transition-transform duration-200 ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
      {showFilters && (
        <div className="mt-4">
          <SuiviSocieteFilter onApply={(f) => console.log("Apply filters:", f)} />
        </div>
      )}
    </div>
  );
}
