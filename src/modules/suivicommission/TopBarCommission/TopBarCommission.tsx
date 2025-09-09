import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import CommissionFilter from "./CommissionFilter";
import { FaFileExport } from "react-icons/fa6";
import PeriodDropdowncommission from "./PeriodDropdowncommission";

export default function TopBarCommission() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-gray-100 px-20 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap">
        <h2 className="text-sm font-bold text-cyan-700 uppercase tracking-wide flex items-center gap-2">
          Suivi des Commissionnements
          <button
            aria-label="Rafraîchir"
            className="w-5 h-5 border border-cyan-700 rounded-full flex items-center justify-center text-cyan-700 hover:bg-teal-50"
          >
            <img src="/rafraichir.png" alt="" className="w-3 h-3" />
          </button>
        </h2>

        <div className="flex items-center gap-3">
          <button className="bg-cyan-600 text-white text-sm px-4 h-[30px] rounded hover:bg-cyan-500 transition flex items-center justify-center">
            <span className="flex items-center gap-2"><FaFileExport/><span>Excel</span></span>
          </button>

          <button
            onClick={() => setShowFilters((v) => !v)}
            aria-expanded={showFilters}
            aria-controls="commission-filters"
            className="border border-gray-600 text-sm px-4 h-[30px] rounded bg-white text-gray-600 hover:bg-cyan-50 transition flex items-center gap-1"
          >
            Filtres
            <FiChevronDown
              size={16}
              className={`transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`}
            />
          </button>

          <div className="text-sm text-cyan-700 cursor-default select-none">
                          <PeriodDropdowncommission value="Ce mois" onChange={(v) => console.log("period:", v)} />
          </div>
        </div>
      </div>

      <div
        id="commission-filters"
        className={`transition-[max-height,opacity] duration-300 ease-out overflow-hidden ${
          showFilters ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        {showFilters && (
          <CommissionFilter
            onApply={(f) =>
              console.log("Apply filters:", {
                ...f,
                
              })
            }
          />
        )}
      </div>
    </div>
  );
}
