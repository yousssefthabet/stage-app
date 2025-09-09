import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type { JSX } from "react";

type BarRow = { bank: string; accord: number; refus: number };
type PieRow = { name: string; value: number };

const barData: BarRow[] = [
  { bank: "LCL", accord: 3, refus: 1 },
  { bank: "Caisse d'Epargne Hauts de France", accord: 1, refus: 4 },
  { bank: "BNP", accord: 1, refus: 1 },
  { bank: "SG", accord: 1, refus: 1 },
  { bank: "CIC", accord: 1, refus: 1 },
  { bank: "Crédit Mutuel", accord: 1, refus: 1 },
  { bank: "Crédit Agricole", accord: 1, refus: 2 },
  { bank: "Autres", accord: 1, refus: 1 },
];

const pieData: PieRow[] = [
  { name: "CIC", value: 1 },
  { name: "Banque Populaire Aquitaine Centre Atlantique", value: 1 },
  { name: "Crédit Mutuel", value: 1 },
  { name: "Crédit Mutuel Centre", value: 1 },
  { name: "CREDIT AGRICOLE IDF", value: 1 },
  { name: "Banque Populaire Occitane / Caisse d’Epargne Languedoc-Roussillon", value: 1 },
];

const COLORS = ["#0e879c", "#147d8e", "#1e6f80", "#2a6272", "#3d7f8f", "#5aa0ae"];

export default function BankDecision(): JSX.Element {
  const total = pieData.reduce((s, d) => s + d.value, 0);

  // Recharts' `label` can take a function; using `any` avoids tight coupling to internal types.
  const renderPieLabel = (d: any) =>
    total ? `${((Number(d?.value) / total) * 100).toFixed(2)}%` : "0%";

  return (
    <div className="max-w-[85rem] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Pie */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <h3 className="text-[15px] font-semibold text-gray-700 text-center mb-2">
            Suivi des DDP envoyées en banque
          </h3>
          <div className="h-[330px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  outerRadius={90}
                  label={renderPieLabel}
                  labelLine={false}
                  isAnimationActive={false}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  wrapperStyle={{ fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT: Bar */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <h3 className="text-[15px] font-semibold text-gray-700 text-center mb-2">
            Décision bancaire
          </h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bank" tick={{ fontSize: 12 }} interval={0} height={60} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend verticalAlign="top" align="right" />
                <Bar dataKey="accord" name="Accord" fill="#0e879c" barSize={20}>
                  <LabelList dataKey="accord" position="top" />
                </Bar>
                <Bar dataKey="refus" name="Refus" fill="#f59e0b" barSize={20}>
                  <LabelList dataKey="refus" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
