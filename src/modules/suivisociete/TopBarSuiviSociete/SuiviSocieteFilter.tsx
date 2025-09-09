import React, { useState } from "react";
import type { JSX } from "react";

type Filters = { societe: string };

type Props = {
  onApply?: (filters: Filters) => void;
};

export default function SuiviSocieteFilter({ onApply }: Props): JSX.Element {
  const [filters, setFilters] = useState<Filters>({ societe: "" });

  const update = (v: string) => setFilters({ societe: v });
  const apply = () => onApply?.(filters);

  return (
    <div className="bg-white rounded-md border border-cyan-600 px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            Société
          </div>
          <input
            value={filters.societe}
            onChange={(e) => update(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && apply()}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
      </div>
    </div>
  );
}
