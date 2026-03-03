/** @format */
import React from "react";
import { Gem, Heart, Trophy, CreditCard } from "lucide-react";

const stats = [
  {
    label: "Currently Bidding",
    value: "05 BIDS",
    icon: Gem,
    extra: null,
  },
  {
    label: "Saved",
    value: "12 ITEMS",
    icon: Heart,
    extra: null,
  },
  {
    label: "Needs Payment",
    value: "2 WON",
    icon: Trophy,
    extra: null,
  },
  {
    label: "Spent",
    value: "£890.00",
    icon: CreditCard,
    extra: "THIS MONTH",
  },
];

const OverviewStatsCards = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-500 rounded-2xl p-6 sm:p-8 text-white">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((stat, i) => (
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
