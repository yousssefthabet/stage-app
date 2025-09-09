import React, { useState } from "react";
import PeriodDropdown from "../../components/PeriodDropdown";

import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Cell,
  Trapezoid,
} from "recharts";


const rawFunnel = [
  { name: "Nouveaux leads", value: 95, fill: "#D66D6B" },
  
 
  { name: "En banque", value: 20, fill: "#F97316" },
];

const funnelData = rawFunnel
  .filter((d) => d.value > 0)
  .map((d) => ({ ...d, label: `${d.name} ${d.value}` }));

const lineData = [
  { m: "Jan", v: 3500 },  { m: "Févr.", v: 2800 }, { m: "Mars", v: 4200 },
  { m: "Avril", v: 4100 },{ m: "Mai", v: 8200 },   { m: "Juin", v: 4600 },
  { m: "Juil", v: 300 },  { m: "Août", v: 0 },     { m: "Sept", v: 0 },
  { m: "Oct", v: 0 },     { m: "Nov", v: 0 },      { m: "Déc.", v: 0 },
];


const RectOnlyForSome = (props) => {
  const name = props?.payload?.name;
  const makeRect = name === "Mandat envoyé" || name === "En banque" || name === "En banque";

  if (makeRect) {
    const w = props.upperWidth ?? props.topWidth ?? 0;
    return <Trapezoid {...props} lowerWidth={w} bottomWidth={w} />;
  }
  return <Trapezoid {...props} />;
};

export default function StatProjetsChart() {
  const [periode, setPeriode] = useState("Ce mois");

  return (
    <div className="bg-white p-4 lg:p-6 rounded-md shadow max-w-[83rem] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Funnel + period */}
        <div className="lg:col-span-4">
          <div className="mb-2 ml-4">
            <PeriodDropdown value={periode} onChange={setPeriode} />
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip
                  formatter={(_, __, payload) => payload?.payload?.label}
                  contentStyle={{ fontSize: 12 }}
                />
                <Funnel
                  data={funnelData}
                  dataKey="value"
                  nameKey="name"
                  shape={<RectOnlyForSome />}   // <- only two will be rectangles
                  isAnimationActive={false}
                >
                  {funnelData.map((entry, i) => (
                    <Cell
                      key={i}
                      stroke={entry.fill}
                      strokeWidth={2}
                      fill={entry.fill}
                      fillOpacity={0.2}
                    />
                  ))}
                  <LabelList
                    dataKey="label"
                    position="right"
                    fill="#4B5563"
                    stroke="none"
                    fontSize={12}
                  />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line chart */}
        <div className="lg:col-span-8">
          <div className="h-72 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="m" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke="#942309"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#942309" }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
