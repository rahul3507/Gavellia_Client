/** @format */
"use client";

import React from "react";

interface StatItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  change: string;
}

const StatItem: React.FC<StatItemProps> = ({
  icon: Icon,
  label,
  value,
  change,
}) => (
  <div className="flex flex-col items-center gap-2 flex-1">
    <div className="flex items-center gap-3 w-full">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/20">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-white/70">
          {label}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-white">{value}</span>
          <span className="text-xs font-medium text-green-200">{change}</span>
        </div>
      </div>
    </div>
  </div>
);

interface StatsCardsProps {
  statsCards: Array<{
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    change: string;
    positive: boolean;
  }>;
}

const StatsCards: React.FC<StatsCardsProps> = ({ statsCards }) => (
  <div className="bg-gradient-to-r from-indigo-600 to-purple-500 rounded-2xl p-8 mb-8 text-white">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {statsCards.map((stat, index) => (
        <StatItem key={index} {...stat} />
      ))}
    </div>
  </div>
);

export default StatsCards;
