import React, { useState } from "react";

/* ---------- types ---------- */
type Stats = {
  calculCommissionnement: number;
  commissionSurCA: number;
  commissionFixePct: number;
  cpSalaire: number;
  zl: number;
  mandataires: number;
};

type CommissionPanelProps = {
  defaultSource?: string;
  stats?: Stats;
};

type CardProps = {
  title: string;
  className?: string;
  children?: React.ReactNode;
};

type StatProps = {
  label: string;
  value: string | number;
};

/* ---------- data ---------- */
const SOURCE_OPTIONS = [
  "Tous",
  "Formulaire",
  "Appel entrant",
  "Apporteur",
  "Passage",
  "Parrainage",
  "Direct",
] as const;

/* ---------- small components ---------- */
function Card({ title, children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-[#4BA1B1] text-white rounded-md shadow-md h-full flex flex-col ${className}`}
    >
      <div className="text-center font-semibold py-2 text-sm opacity-90">
        {title}
      </div>
      {/* center children vertically & horizontally */}
      <div className="mx-3 mb-3 rounded-sm flex-1 flex items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}

function Stat({ label, value }: StatProps) {
  return (
    <div className="text-center py-3">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-sm opacity-90 mt-1">{label}</div>
    </div>
  );
}

/* ---------- main ---------- */
export default function CommissionPanel({
  defaultSource = "Tous",
  stats = {
    calculCommissionnement: 0,
    commissionSurCA: 0,
    commissionFixePct: 0,
    cpSalaire: 0,
    zl: 0,
    mandataires: 0,
  },
}: CommissionPanelProps) {
  const [source, setSource] = useState<string>(defaultSource);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSource(e.target.value);
  };

  return (
    <div className="px-2 bg-white rounded-md min-h-[140px] flex items-center">
      {/* ⚠️ lg:grid-cols-14 requires extending Tailwind config (by default max is 12) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-14 gap-4 items-stretch w-full">
        <div className="lg:col-span-4 h-full">
          <Card title="Commissionnement par source">
            <div className="relative w-90 flex items-center">
              <select
                value={source}
                onChange={handleChange}
                className="w-full appearance-none bg-white text-black border border-gray-300 rounded-sm h-10 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                {SOURCE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                ▾
              </span>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 h-full">
          <Card
            title={`Calcul du commissionnement : ${stats.calculCommissionnement}`}
          >
            <div className="space-y-1">
              <div className="text-sm">2L: {stats.zl}</div>
              <div className="text-xs">Mandataires : {stats.mandataires}</div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 h-full">
          <Card title={`Commission sur CA : ${stats.commissionSurCA}`}>
            <div className="space-y-1">
              <div className="text-sm">2L: {stats.zl}</div>
              <div className="text-xs">Mandataires : {stats.mandataires}</div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 h-full">
          <Card title={`Commissionnement fixe : ${stats.commissionFixePct} %`}>
            <div className="space-y-1">
              <div className="text-sm">2L: {stats.zl} %</div>
              <div className="text-xs">Mandataires : {stats.mandataires} %</div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 h-full">
          <Card title="Cp / salaire">
            <div className="text-xs">Mandataires : {stats.mandataires}</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
