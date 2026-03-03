/** @format */
"use client";

import React from "react";

type BidTab = "active" | "won" | "lost";

interface BidsTabBarProps {
  activeTab: BidTab;
  onTabChange: (tab: BidTab) => void;
}

const tabs: { label: string; value: BidTab; count: number }[] = [
  { label: "ACTIVE", value: "active", count: 13 },
  { label: "WON", value: "won", count: 2 },
  { label: "LOST", value: "lost", count: 39 },
];

const BidsTabBar = ({ activeTab, onTabChange }: BidsTabBarProps) => {
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
          {tab.label} ({tab.count})
        </button>
      ))}
    </div>
  );
};

export default BidsTabBar;
