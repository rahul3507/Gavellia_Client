/** @format */
"use client";

import React, { useState } from "react";
import {
  Landmark,
  Package,
  ListChecks,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
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

const statsCards = [
  {
    icon: Landmark,
    label: "Total Earnings",
    value: "£12,4000",
    change: "+9.68%",
    positive: true,
  },
  {
    icon: Package,
    label: "Item Sold",
    value: "13",
    change: "+9.68%",
    positive: true,
  },
  {
    icon: ListChecks,
    label: "Active Listings",
    value: "29",
    change: "+3 NEW",
    positive: true,
  },
  {
    icon: TrendingUp,
    label: "Conversation Rate",
    value: "18%",
    change: "+2.1%",
    positive: true,
  },
];

const recentActivities = [
  {
    icon: "🏷️",
    color: "bg-amber-100",
    text: 'Your "Rolex Daytona" sold for £8,200',
    time: "2 hr ago",
  },
  {
    icon: "💬",
    color: "bg-blue-100",
    text: "You have received a message from Vintage Jacket",
    time: "2 hr ago",
  },
  {
    icon: "⏰",
    color: "bg-red-100",
    text: 'Your listing "Abstract Painting" is ending in 6 hours 30 minutes',
    time: "2 hr ago",
  },
];

const OverviewContent = () => {
  const [period, setPeriod] = useState("Yearly");

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 py-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl p-5 flex flex-col gap-3 ${
              index === 0
                ? "bg-gradient-to-r from-indigo-600 to-purple-500 text-white"
                : "bg-card-bg"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                index === 0 ? "bg-white/20" : "bg-white"
              }`}
            >
              <stat.icon
                className={`w-5 h-5 ${
                  index === 0 ? "text-white" : "text-indigo-600"
                }`}
              />
            </div>
            <p
              className={`text-xs font-medium uppercase tracking-wide ${
                index === 0 ? "text-white/70" : "text-muted-foreground"
              }`}
            >
              {stat.label}
            </p>
            <div className="flex items-end justify-between">
              <span
                className={`text-2xl font-bold ${
                  index === 0 ? "text-white" : "text-primary"
                }`}
              >
                {stat.value}
              </span>
              <span
                className={`text-xs font-medium ${
                  index === 0 ? "text-green-200" : "text-green-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
                REVENUE LAST 12 MONTHS
              </h3>
              <p className="text-2xl font-bold text-green-600 mt-1">
                £6,790.00
              </p>
            </div>
            <button
              className="flex items-center gap-1 border border-gray-200 rounded-md px-3 py-1.5 text-sm text-primary self-start"
              onClick={() =>
                setPeriod(period === "Yearly" ? "Monthly" : "Yearly")
              }
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

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Quick Actions */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              QUICK ACTION
            </h3>
            <div className="flex flex-col gap-3">
              <Link
                href="/create-lot"
                className="flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3 px-4 rounded-md hover:bg-primary/90 transition"
              >
                + NEW LISTING
              </Link>
              <button className="flex items-center justify-center gap-2 bg-red-500 text-white text-sm font-semibold py-3 px-4 rounded-md hover:bg-red-600 transition">
                ▷ GO LIVE
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              RECENT ACTIVITY
            </h3>
            <div className="flex flex-col gap-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${activity.color}`}
                  >
                    {activity.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-primary leading-snug">
                      {activity.text}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;
