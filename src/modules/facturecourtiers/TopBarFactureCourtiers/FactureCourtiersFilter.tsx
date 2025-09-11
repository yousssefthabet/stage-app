import React, { useState } from "react";

type Filters = {
  nature: string;
  courtier: string;
};

type Props = {
  defaultValues?: Partial<Filters>;
  onApply?: (f: Filters) => void;
};

export default function FactureCourtiersFilter({ defaultValues, onApply }: Props) {
  const [filters, setFilters] = useState<Filters>({
    nature: defaultValues?.nature ?? "",
    courtier: defaultValues?.courtier ?? "",
  });

  const update = (k: keyof Filters, v: string) =>
    setFilters((f) => ({ ...f, [k]: v }));

  const apply = () => onApply?.(filters);
  const reset = () => setFilters({ nature: "", courtier: "" });

  return (
    <div className="bg-white rounded-md border border-cyan-600 px-4 py-4 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nature */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            Nature
          </div>
          <input
            value={filters.nature}
            onChange={(e) => update("nature", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && apply()}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Courtier */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            Courtier
          </div>
          <input
            value={filters.courtier}
            onChange={(e) => update("courtier", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && apply()}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
      </div>
    </div>
  );
}
