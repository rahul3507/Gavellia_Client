/** @format */
"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: "Feb", revenue: 2500 },
  { month: "Mar", revenue: 5800 },
  { month: "Apr", revenue: 4200 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 7200 },
  { month: "Jul", revenue: 8500 },
  { month: "Aug", revenue: 9200 },
  { month: "Sep", revenue: 7800 },
  { month: "Oct", revenue: 6500 },
  { month: "Nov", revenue: 5000 },
  { month: "Dec", revenue: 3200 },
];

const RevenueChartCard = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 sm:p-6 mb-8">
      <div className="mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
          REVENUE LAST 12 MONTHS
        </h3>
        <p className="text-2xl font-bold text-green-600 mt-1">£6,790.00</p>
      </div>
      <div className="w-full h-64 sm:h-80">
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

export default RevenueChartCard;
