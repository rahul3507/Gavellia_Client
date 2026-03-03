/** @format */
import React from "react";
import { Gem, Heart, Trophy, CreditCard } from "lucide-react";

const stats = [
  {
    label: "Currently Bidding",
    value: "05 BIDS",
    icon: Gem,
  },
  {
    label: "Saved",
    value: "12 ITEMS",
    icon: Heart,
  },
  {
    label: "Needs Payment",
    value: "2 WON",
    icon: Trophy,
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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-gradient-to-br from-indigo-600 to-violet-500 rounded-xl p-4 sm:p-5 text-white flex flex-col justify-between min-h-[110px] sm:min-h-[120px]"
        >
          <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 opacity-90" />
          <div className="mt-3">
            <p className="text-[10px] sm:text-xs uppercase tracking-wide opacity-80">
              {stat.label}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-lg sm:text-xl lg:text-2xl font-bold">
                {stat.value}
              </p>
              {stat.extra && (
                <span className="text-[9px] sm:text-[10px] uppercase opacity-70 bg-white/15 px-1.5 py-0.5 rounded">
                  {stat.extra}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewStatsCards;
