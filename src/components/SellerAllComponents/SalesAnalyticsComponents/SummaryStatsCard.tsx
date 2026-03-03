/** @format */
import React from "react";

const SummaryStatsCard = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <div className="space-y-5">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Total Sales
          </p>
          <p className="text-2xl font-bold text-primary mt-1">142</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Average Sale Price
          </p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-3 h-3 bg-green-500 rounded-sm" />
            <span className="text-lg font-bold text-primary">£47.29</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Total Revenue
          </p>
          <p className="text-2xl font-bold text-primary mt-1">£6,715.00</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryStatsCard;
