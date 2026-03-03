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
  PieChart,
  Pie,
  Cell,
  Legend,
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

const topListings = [
  { name: "Vintage Rolex Submariner", amount: 4800 },
  { name: "Antique Oil Painting", amount: 3200 },
  { name: "Designer Handbag", amount: 1500 },
];

const categoryData = [
  { name: "Watches (45%)", value: 45, color: "#4f46e5" },
  { name: "Fashion (30%)", value: 30, color: "#22c55e" },
  { name: "Art (15%)", value: 15, color: "#f59e0b" },
  { name: "Other (10%)", value: 10, color: "#ef4444" },
];

const SalesAnalyticsContent = () => {
  const [period, setPeriod] = useState("Yearly");

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary italic font-serif">
            Sales & Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your performance and revenue insights
          </p>
        </div>
        <div className="flex gap-2 self-start">
          <button
            className="flex items-center gap-1 border border-gray-200 rounded-md px-3 py-1.5 text-sm text-primary"
            onClick={() =>
              setPeriod(period === "Yearly" ? "Monthly" : "Yearly")
            }
          >
            {period} <ChevronDown className="w-4 h-4" />
          </button>
          <button className="bg-primary text-white text-sm px-4 py-1.5 rounded-md hover:bg-primary/90 transition">
            EXPORT CSV
          </button>
        </div>
      </div>

      {/* Revenue Chart */}
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

      {/* Bottom Grid: Stats + Top Performing + Category Pie */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Summary Stats */}
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="space-y-5">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Total Sales
              </p>
              <p className="text-2xl font-bold text-primary mt-1">142</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Average Sale Price
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-3 h-3 bg-green-500 rounded-sm" />
                <span className="text-lg font-bold text-primary">£47.29</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Total Revenue
              </p>
              <p className="text-2xl font-bold text-primary mt-1">£6,715.00</p>
            </div>
          </div>
        </div>

        {/* Top Performing Listings */}
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            TOP PERFORMING LISTINGS
          </h3>
          <div className="space-y-4">
            {topListings.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  <span className="text-primary truncate">{item.name}</span>
                </div>
                <span className="text-primary font-semibold shrink-0 ml-2">
                  £{item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sales by Category */}
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
      </div>
    </div>
  );
};

export default SalesAnalyticsContent;
