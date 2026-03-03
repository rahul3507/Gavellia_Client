/** @format */
"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RevenueData {
  month: string;
  revenue: number;
}

interface RevenueChartProps {
  revenueData: RevenueData[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ revenueData }) => {
  const [period, setPeriod] = useState("Yearly");

  return (
    <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
            REVENUE LAST 12 MONTHS
          </h3>
          <p className="text-2xl font-bold text-green-600 mt-1">£6,790.00</p>
        </div>
        <button
          className="flex items-center gap-1 border border-gray-200 rounded-md px-3 py-1.5 text-sm text-primary self-start"
          onClick={() => setPeriod(period === "Yearly" ? "Monthly" : "Yearly")}
        >
          {period} <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value) => [
                `£${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
            />
            <Bar dataKey="revenue" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
