/** @format */
"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import RevenueChartCard from "./RevenueChartCard";
import SummaryStatsCard from "./SummaryStatsCard";
import TopPerformingListings from "./TopPerformingListings";
import SalesByCategoryCard from "./SalesByCategoryCard";

const SalesAnalyticsContent = () => {
  const [period, setPeriod] = useState("Yearly");

  return (
    <div className="w-full px-2 md:px-4 xl:px-6 mb-12 ">
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
      <RevenueChartCard />

      {/* Bottom Grid: Stats + Top Performing + Category Pie */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryStatsCard />
        <TopPerformingListings />
        <SalesByCategoryCard />
      </div>
    </div>
  );
};

export default SalesAnalyticsContent;
