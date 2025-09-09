import React from "react";
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
  Cell,
} from "recharts";

type MandatRow = { label: string; value: number };
type DDPRow = { name: string; value: number; fill: string };


const mandatsData: MandatRow[] = [
  { label: "Mandats envoyés", value: 0 },
  { label: "Mandats reçus", value: 0 },
  { label: "Mandats en banque", value: 0 },
];


const ddpLegendData: DDPRow[] = [
  { name: "DDP envoyées", value: 1, fill: "#1b8b95" },
  { name: "DDP accordées", value: 1, fill: "#4fb7c1" },
  { name: "DDP refusées", value: 1, fill: "#8fd3da" },
];

export default function MandatsAndDDP() {
  return (
    <div className="max-w-[85rem] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Suivi des mandats */}
        <div className="lg:col-span-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="flex items-center justify-center px-4 pt-3 pb-1">
              <h3 className="text-[15px] font-semibold text-gray-700">
                Suivi des mandats
              </h3>
            </div>

            <div className="px-3 pb-2">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mandatsData}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid stroke="#eaeaea" />
                    <XAxis
                      type="number"
                      domain={[0, 2]}
                      ticks={[0.0, 0.4, 0.8, 1.2, 1.6, 2.0]}
                    />
                    <YAxis
                      type="category"
                      dataKey="label"
                      width={150}
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                    />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3CA5AD" barSize={8} radius={[3, 3, 3, 3]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center gap-10 pt-2 pb-3 text-xs text-gray-500">
                <span>Direct</span>
                <span>Parrainages</span>
                <span>Apporteurs</span>
                <span>Leads</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Suivi DDP */}
        <div className="lg:col-span-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm h-full">
            <div className="flex items-center justify-center px-4 pt-3 pb-1">
              <h3 className="text-[15px] font-semibold text-gray-700">
                Suivi DDP
              </h3>
            </div>

            <div className="px-3 pb-3">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ddpLegendData}
                      dataKey="value"
                      nameKey="name"   // ← lets Legend show the names
                      cx="50%"
                      cy="45%"
                      outerRadius={80}
                      isAnimationActive={false}
                    >
                      {ddpLegendData.map((d) => (
                        <Cell key={d.name} fill={d.fill} />
                      ))}
                    </Pie>
                    {/* Legend now works with no custom payload/types */}
                    <Legend
                      verticalAlign="bottom"
                      align="center"
                      height={36}
                      iconType="circle"
                      wrapperStyle={{ color: "#6b7280", fontSize: 12 }}
                    />
                    <Tooltip />
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
