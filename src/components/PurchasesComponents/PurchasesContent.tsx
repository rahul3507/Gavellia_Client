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
          <div className="py-12 text-center text-muted-foreground text-sm">
            Loading...
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
