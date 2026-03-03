/** @format */
"use client";

import React, { useState } from "react";
import PurchasesTabBar, { PurchaseTab } from "./PurchasesTabBar";
import PurchaseListItem, { PurchaseItem } from "./PurchaseListItem";

const toPayItems: PurchaseItem[] = [
  {
    id: 1,
    title: "Vintage Leather Jacket",
    lot: "#C4567",
    image: "/productImage/Bowling_SS_Bag.png",
    myBid: 8500,
    auctionWonDate: "17 Sep, 2025",
    paymentDueDate: "19 Sep, 2025",
    amount: 8500,
  },
  {
    id: 2,
    title: "Vintage Leather Jacket",
    lot: "#C4567",
    image: "/productImage/Bowling_SS_Bag.png",
    myBid: 8500,
    auctionWonDate: "17 Sep, 2025",
    paymentDueDate: "19 Sep, 2025",
    amount: 8500,
  },
];

const PurchasesContent = () => {
  const [activeTab, setActiveTab] = useState<PurchaseTab>("to-pay");

  const itemsMap: Record<PurchaseTab, PurchaseItem[]> = {
    "to-pay": toPayItems,
    "to-ship": [],
    "in-transit": [],
    completed: [],
  };

  const currentItems = itemsMap[activeTab];

  return (
    <div className="w-full px-2 md:px-4 xl:px-6 mb-12">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary font-serif italic">
          My Purchases
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your orders and manage your purchases history
        </p>
      </div>

      {/* Tabs */}
      <PurchasesTabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Items */}
      <div className="bg-white border border-gray-100 rounded-xl mt-6 px-4 sm:px-6">
        <div className="py-4 border-b border-gray-200">
          <h3 className="text-sm sm:text-base font-semibold text-primary">
            Items
          </h3>
        </div>

        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <PurchaseListItem key={item.id} item={item} />
          ))
        ) : (
          <div className="py-12 text-center text-muted-foreground text-sm">
            No items found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchasesContent;
