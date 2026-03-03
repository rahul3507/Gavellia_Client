/** @format */
import React from "react";

type TabType = "timed" | "live" | "sold" | "draft";

interface Tab {
  label: string;
  value: TabType;
  count: number;
}

interface ListingTabBarProps {
  tabs: Tab[];
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const ListingTabBar = ({
  tabs,
  activeTab,
  onTabChange,
}: ListingTabBarProps) => {
  return (
    <div className="flex flex-wrap gap-0 border-b border-gray-200 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`px-4 py-3 text-xs font-semibold tracking-wide transition border-b-2 cursor-pointer ${
            activeTab === tab.value
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-primary"
          }`}
        >
          {tab.label} ({tab.count})
        </button>
      ))}
    </div>
  );
};

export default ListingTabBar;
