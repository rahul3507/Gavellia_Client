"use client";

import React from "react";
import { Gem, Heart, Trophy, CreditCard } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

const OverviewStatsCards = () => {
  const { stats, loading } = useAppSelector((state) => state.overview);

  const statsData = [
    {
      label: "Currently Bidding",
      value: `${String(stats.currentlyBidding).padStart(2, "0")} BIDS`,
      icon: Gem,
      extra: null,
    },
    {
      label: "Saved",
      value: `${stats.saved} ITEMS`,
      icon: Heart,
      extra: null,
    },
    {
      label: "Needs Payment",
      value: `${stats.needsPayment} WON`,
      icon: Trophy,
      extra: null,
    },
    {
      label: "Spent",
      value: `£${stats.spent.toLocaleString()}`,
      icon: CreditCard,
      extra: "THIS MONTH",
    },
  ];

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-indigo-600 to-purple-500 rounded-2xl p-6 sm:p-8 text-white animate-pulse">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/20" />
              <div className="space-y-1">
                <div className="h-3 w-20 bg-white/20 rounded" />
                <div className="h-5 w-16 bg-white/20 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-500 rounded-2xl p-6 sm:p-8 text-white">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {statsData.map((stat, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-white/20 shrink-0">
              <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-white/70">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-base sm:text-lg font-bold">
                  {stat.value}
                </span>
                {stat.extra && (
                  <span className="text-[9px] sm:text-[10px] uppercase text-white/60 bg-white/15 px-1.5 py-0.5 rounded">
                    {stat.extra}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewStatsCards;
