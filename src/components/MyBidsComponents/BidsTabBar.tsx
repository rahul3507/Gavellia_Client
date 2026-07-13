"use client";

import React from "react";
import { BidTab } from "@/types/allTypes";

interface BidsTabBarProps {
  activeTab: BidTab;
  onTabChange: (tab: BidTab) => void;
  tabCounts: {
    active: number;
    won: number;
    lost: number;
  };
}

const tabs: { label: string; value: BidTab }[] = [
  { label: "ACTIVE", value: "active" },
  { label: "WON", value: "won" },
  { label: "LOST", value: "lost" },
];

const BidsTabBar = ({ activeTab, onTabChange, tabCounts }: BidsTabBarProps) => {
  return (
    <div className="flex gap-0 border border-gray-200 rounded-md overflow-hidden w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold transition cursor-pointer ${
            activeTab === tab.value
              ? "bg-white text-primary border-b-2 border-primary"
              : "bg-gray-50 text-muted-foreground hover:bg-gray-100"
          }`}
        >
          {tab.label} ({tabCounts[tab.value]})
        </button>
      ))}
    </div>
  );
};

export default BidsTabBar;
