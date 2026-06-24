import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#22c55e", "#f59e0b", "#e5e7eb"];

export default function DonutChart({ paid, pending }) {
  const data = [
    { name: "Paid", value: paid },
    { name: "Pending", value: pending },
  ];

  const total = paid + pending;

  return (
    <div className="relative w-36 h-36">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={65}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-800">{total}</span>
        <span className="text-[10px] text-gray-400 uppercase tracking-wide">
          orders
        </span>
      </div>
    </div>
  );
}
