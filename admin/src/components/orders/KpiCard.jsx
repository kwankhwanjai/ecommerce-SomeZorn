import React from "react";

export default function KpiCard({ icon, title, value, accent, subtitle }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-2">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${accent}`}
        >
          {icon}
        </div>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          {title}
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
    </div>
  );
}
