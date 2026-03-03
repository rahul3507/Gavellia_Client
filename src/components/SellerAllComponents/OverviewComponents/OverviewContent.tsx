/** @format */
"use client";

import React from "react";
import StatsCards from "./StatsCards";
import RevenueChart from "./RevenueChart";
import QuickActions from "./QuickActions";
import RecentActivity from "./RecentActivity";
import { Landmark, Package, ListChecks, TrendingUp } from "lucide-react";

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
  return (
    <div className="w-full px-2 md:px-4 xl:px-6 mb-12 ">
      {/* Stats Cards */}
      <StatsCards statsCards={statsCards} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <RevenueChart revenueData={revenueData} />

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Quick Actions */}
          <QuickActions />

          {/* Recent Activity */}
          <RecentActivity activities={recentActivities} />
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;
