"use client";

import React from "react";
import { PurchaseTab } from "@/types/allTypes";

interface PurchasesTabBarProps {
  activeTab: PurchaseTab;
  onTabChange: (tab: PurchaseTab) => void;
  tabCounts: {
    toPay: number;
    toShip: number;
    inTransit: number;
    completed: number;
  };
}

const tabs: { label: string; value: PurchaseTab }[] = [
  { label: "TO PAY", value: "to-pay" },
  { label: "TO SHIP", value: "to-ship" },
  { label: "IN TRANSIT", value: "in-transit" },
  { label: "COMPLETED", value: "completed" },
];

const PurchasesTabBar = ({ activeTab, onTabChange, tabCounts }: PurchasesTabBarProps) => {
  return (
    <div className="flex gap-0 border border-gray-200 rounded-md overflow-hidden w-fit flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`px-3 sm:px-6 py-2 text-[10px] sm:text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
            activeTab === tab.value
              ? "bg-white text-primary border-b-2 border-primary"
              : "bg-gray-50 text-muted-foreground hover:bg-gray-100"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default PurchasesTabBar;
