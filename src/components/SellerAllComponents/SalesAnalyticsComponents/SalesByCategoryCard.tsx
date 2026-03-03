/** @format */
"use client";

import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const categoryData = [
  { name: "Watches (45%)", value: 45, color: "#4f46e5" },
  { name: "Fashion (30%)", value: 30, color: "#22c55e" },
  { name: "Art (15%)", value: 15, color: "#f59e0b" },
  { name: "Other (10%)", value: 10, color: "#ef4444" },
];

const SalesByCategoryCard = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
        SALES BY CATEGORY
      </h3>
      <div className="w-full h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-xs text-primary">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesByCategoryCard;
