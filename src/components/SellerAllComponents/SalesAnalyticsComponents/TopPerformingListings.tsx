/** @format */
import React from "react";

const topListings = [
  { name: "Vintage Rolex Submariner", amount: 4800 },
  { name: "Antique Oil Painting", amount: 3200 },
  { name: "Designer Handbag", amount: 1500 },
];

const TopPerformingListings = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
        TOP PERFORMING LISTINGS
      </h3>
      <div className="space-y-4">
        {topListings.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
              <span className="text-primary truncate">{item.name}</span>
            </div>
            <span className="text-primary font-semibold shrink-0 ml-2">
              £{item.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPerformingListings;
