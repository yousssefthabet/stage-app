"use client";


import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FaFileExport } from "react-icons/fa6";
import FactureCourtiersFilter from "./FactureCourtiersFilter";
import PeriodDropdownFactureCourtiers from "./PeriodDropDownFactureCourtiers";
import type { JSX } from "react";

export default function TopBarFactureCourtiers(): JSX.Element {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [periode, setPeriode] = useState<string>("Ce mois-ci");

  return (
    <div className="bg-gray-100 px-10 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap">
        <h2 className="text-sm font-bold text-cyan-700 uppercase tracking-wide">
          SUIVI GENERAL DES FACTURES COURTIERS
        </h2>

        <div className="flex items-center gap-3">
          {/* Excel */}
          <button className="bg-cyan-600 text-white text-sm px-5 h-[30px] rounded hover:bg-cyan-800 transition flex items-center gap-2">
            <FaFileExport />
            <span>Excel</span>
          </button>

          {/* Filters toggle */}
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

          {/* Period dropdown */}
          <PeriodDropdownFactureCourtiers
            value={periode}
            onChange={(v) => setPeriode(v)}
          />
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="mt-4">
          <FactureCourtiersFilter onApply={(f: unknown) => console.log("Filtres:", f)} />
        </div>
      )}
    </div>
  );
}
