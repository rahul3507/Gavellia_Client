"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchPurchases, setCurrentTab } from "@/redux/feature/purchasesSlice";
import PurchasesTabBar from "./PurchasesTabBar";
import PurchaseListItem from "./PurchaseListItem";
import { PurchaseTab } from "@/types/allTypes";

const PurchasesContent = () => {
  const dispatch = useAppDispatch();
  const { currentItems, tabCounts, loading } = useAppSelector(
    (state) => state.purchases
  );

  const [activeTab, setActiveTab] = React.useState<PurchaseTab>("to-pay");

  useEffect(() => {
    dispatch(fetchPurchases());
  }, [dispatch]);

  const handleTabChange = (tab: PurchaseTab) => {
    setActiveTab(tab);
    dispatch(setCurrentTab(tab));
  };

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
      <PurchasesTabBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        tabCounts={tabCounts}
      />

      {/* Items */}
      <div className="bg-white border border-gray-100 rounded-xl mt-6 px-4 sm:px-6">
        <div className="py-4 border-b border-gray-200">
          <h3 className="text-sm sm:text-base font-semibold text-primary">
            Items
          </h3>
        </div>

        {loading ? (
          <div className="divide-y divide-gray-100">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-4 py-4 sm:py-5 animate-pulse">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                  <div className="h-3 w-1/2 bg-gray-200 rounded" />
                  <div className="h-3 w-2/3 bg-gray-200 rounded" />
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <div className="h-6 w-16 bg-gray-200 rounded" />
                  <div className="h-7 w-20 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : currentItems.length > 0 ? (
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
