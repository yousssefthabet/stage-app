import React, { useState } from "react";
import PretsFilter from "./PretsFilter";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FaFileExport } from "react-icons/fa6";

export default function TopBarPrets() {
  const [showFilters, setShowFilters] = useState(false);
  const [periode, setPeriode] = useState("Ce mois-ci");

  return (
    <div className="bg-gray-100 px-10 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap">
        <h2 className="text-sm font-bold text-cyan-700 uppercase tracking-wide">
          Suivi des demandes de prêts
        </h2>

        <div className="flex items-center gap-3">
          {/* Excel */}
          <button className="bg-cyan-600 text-white text-sm px-5 h-[30px] rounded hover:bg-cyan-800 transition flex items-center gap-2">
            <span><FaFileExport/></span>
            <span>Excel</span>
          </button>

          {/* Toggle Filters with rotating chevron */}
          <button
            onClick={() => setShowFilters((v) => !v)}
            aria-expanded={showFilters}
            className="border border-gray-900 text-sm px-4 h-[30px] rounded bg-white text-gray-900 hover:bg-cyan-50 transition flex items-center gap-1"
          >
            Filtres
            <ChevronDownIcon
              className={`w-4 h-4 transform transition-transform duration-200 ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Period select with chevron */}
          <div className="relative">
            <select
              value={periode}
              onChange={(e) => setPeriode(e.target.value)}
              className="appearance-none border border-gray-900 text-sm h-[30px] rounded bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-cyan-600 pr-8 pl-3"
            >
              <option value="ce-mois-ci">Ce mois-ci</option>
              <option value="retard">Retard</option>
              <option value="aujourdhui">Aujourd'hui</option>
              <option value="demain">Demain</option>
              <option value="cette-semaine">Cette semaine</option>
              <option value="mois-dernier">Le mois dernier</option>
              <option value="cette-annee">Cette année</option>
              <option value="toute-periode">Toute la période</option>
              <option value="annee-derniere">L'année dernière</option>
              <option value="personnalise">Date Personnaliser</option>
            </select>
            <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-900" />
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="mt-4">
          <PretsFilter onApply={(f) => console.log("Prêts filters:", f)} />
        </div>
      )}
    </div>
  );
}
