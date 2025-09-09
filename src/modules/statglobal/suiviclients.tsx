// components/overview/suiviclients.jsx
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

// Example data for Suivi clients (bar chart)
const suiviData = [
  { client: "Client A", accord: 4, refus: 2 },
  { client: "Client B", accord: 3, refus: 1 },
  { client: "Client C", accord: 5, refus: 2 },
  { client: "Client D", accord: 2, refus: 3 },
  { client: "Client E", accord: 6, refus: 1 },
];

// Example data for Répartition (pie chart)
const repartitionData = [
  { name: "Apporteur 1", value: 20 },
  { name: "Apporteur 2", value: 30 },
  { name: "Apporteur 3", value: 25 },
  { name: "Apporteur 4", value: 25 },
];

const colors = ["#0e879c", "#36b2b2", "#5ccccc", "#88e0e0"];

export default function SuiviClients() {
  return (
    <div className="grid grid-cols-12 gap-4 ">
      {/* Suivi clients - 8 cols */}
      <div className="col-span-12 lg:col-span-8 bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        <h3 className="text-[15px] font-semibold text-gray-700 text-center mb-2">
          Suivi clients
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={suiviData}
              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="client"
                tick={{ fontSize: 12 }}
                interval={0}
                height={60}
              />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend verticalAlign="top" align="right" />
              <Bar
                dataKey="accord"
                name="Accord client"
                fill="#0e879c"
                barSize={22}
                radius={[4, 4, 0, 0]}
              >
                <LabelList dataKey="accord" position="top" />
              </Bar>
              <Bar
                dataKey="refus"
                name="Refus client"
                fill="#f59e0b"
                barSize={22}
                radius={[4, 4, 0, 0]}
              >
                <LabelList dataKey="refus" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Répartition - 4 cols */}
      <div className="col-span-12 lg:col-span-4 bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        <h3 className="text-[15px] font-semibold text-gray-700 text-center mb-2">
          Répartition des accord clients par apporteur
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={repartitionData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                label
              >
                {repartitionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
