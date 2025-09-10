// components/Stat/ProjectsOverview.jsx
import React from "react";
import PeriodDropdown from "../statglobal/PeriodDropdown";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Legend,
} from "recharts";

const suiviData = [
  { name: "Prospects", value: 0 },
  { name: "Mandat envoyés", value: 0 },
  { name: "Mandat Reçu", value: 0 },
  { name: "En Banque", value: 0 },
  { name: "Accordés banque", value: 0 },
  { name: "Acceptés clients", value: 0 },
  { name: "Facturé", value: 0 },
];

const sourceData = [
  { name: "Leads", value: 1, fill: "#1b8b95" },
  { name: "Apporteurs", value: 1, fill: "#4fb7c1" },
  { name: "Parrainages", value: 1, fill: "#8fd3da" },
  { name: "Directs", value: 1, fill: "#bfe8ec" },
];

export default function ProjectsOverview() {
  return (
    <div className="max-w-[85rem] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT CARD */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-3 pb-1">
              <h3 className="text-[15px] font-semibold text-gray-700 ml-100">
                Suivi des projets
              </h3>
              <div className="text-sm text-cyan-700 cursor-default select-none">
                <PeriodDropdown value="Ce mois" onChange={(v) => console.log("period:", v)} />
                
              </div>
            </div>

            {/* Chart */}
            <div className="px-3 pb-3">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={suiviData}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid stroke="#eaeaea" />
                    <XAxis type="number" domain={[0, 2]} ticks={[0, 0.4, 0.8, 1.2, 1.6, 2.0]} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={150}
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                    />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3CA5AD" barSize={8} radius={[3, 3, 3, 3]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm h-full">
            {/* Header */}
            <div className="px-4 pt-3 pb-1">
              <h3 className="text-[15px] font-semibold text-gray-700 text-center">
                Répartition des prospects par source
              </h3>
            </div>

            {/* Chart + Legend (pie kept tiny; legend at bottom centered) */}
            <div className="px-3 pb-3">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceData}
                      dataKey="value"
                      cx="50%"  
                      cy="45%"
                      outerRadius={60} // small so the card looks mostly empty like screenshot
                      isAnimationActive={false}
                    />
                    <Legend
                      verticalAlign="bottom"
                      align="center"
                      height={36}
                      iconType="circle"
                      wrapperStyle={{ color: "#374151", fontSize: 12 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
