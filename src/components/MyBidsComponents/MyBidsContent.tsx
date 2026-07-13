"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchMyBids } from "@/redux/feature/myBidsSlice";
import BidsTabBar from "./BidsTabBar";
import BidListItem from "./BidListItem";
import BidsPagination from "./BidsPagination";
import { BidTab } from "@/types/allTypes";

const MyBidsContent = () => {
  const dispatch = useAppDispatch();
  const { currentBids, tabCounts, page, totalPages, loading } = useAppSelector(
    (state) => state.myBids
  );

  const [activeTab, setActiveTab] = useState<BidTab>("active");
  const [currentPage, setCurrentPage] = useState(1);

  const loadBids = useCallback(
    (tab: BidTab, pageNum: number) => {
      dispatch(fetchMyBids({ tab, page: pageNum, limit: 10 }));
    },
    [dispatch]
  );

  useEffect(() => {
    loadBids(activeTab, currentPage);
  }, [activeTab, currentPage, loadBids]);

  const handleTabChange = (tab: BidTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="w-full px-2 md:px-4 xl:px-6 mb-12">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary font-serif italic">
          My Bids
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track all your bidding activity
        </p>
      </div>

      {/* Tabs */}
      <BidsTabBar
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
        ) : currentBids.length > 0 ? (
          currentBids.map((item) => (
            <BidListItem key={item.id} item={item} tab={activeTab} />
          ))
        ) : (
          <div className="py-12 text-center text-muted-foreground text-sm">
            No bids found in this category.
          </div>
        )}
      </div>

      {/* Pagination (only on active tab) */}
      {activeTab === "active" && currentBids.length > 0 && (
        <BidsPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default MyBidsContent;
