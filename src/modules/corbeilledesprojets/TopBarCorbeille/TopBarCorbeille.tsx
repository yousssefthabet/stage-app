"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import CorbeilleFilter from "./CorbeilleFilter";

export default function TopBarCorbeille() {
  const [showFilters, setShowFilters] = useState(false);
  const [periode, setPeriode] = useState("Ce mois-ci");

  return (
    <div className="bg-gray-100 px-10 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap">
        <h2 className="text-lg font-bold text-cyan-700 uppercase tracking-wide">
          corbeille des projets
        </h2>

        <div className="flex items-center gap-3">
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
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="mt-4">
          <CorbeilleFilter onApply={(f) => console.log("Prêts filters:", f)} />
        </div>
      )}
    </div>
  );
}
