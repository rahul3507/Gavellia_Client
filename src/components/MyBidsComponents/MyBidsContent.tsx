/** @format */
"use client";

import React, { useState } from "react";
import BidsTabBar from "./BidsTabBar";
import BidListItem, { BidItem, BidTab } from "./BidListItem";
import BidsPagination from "./BidsPagination";

const activeBids: BidItem[] = [
  {
    id: 1,
    title: "Vintage Leather Jacket",
    lot: "#C4567",
    image: "/productImage/Bowling_SS_Bag.png",
    myBid: 8500,
    isHighest: true,
    status: "Winning",
    time: "2 hr ago",
  },
  {
    id: 2,
    title: "Vintage Leather Jacket",
    lot: "#C4567",
    image: "/productImage/Bowling_SS_Bag.png",
    myBid: 8500,
    isHighest: false,
    status: "Outbid",
    time: "2 hr ago",
  },
  {
    id: 3,
    title: "Vintage Leather Jacket",
    lot: "#C4567",
    image: "/productImage/Bowling_SS_Bag.png",
    myBid: 8500,
    isHighest: true,
    status: "Winning",
    time: "2 hr ago",
  },
  {
    id: 4,
    title: "Vintage Leather Jacket",
    lot: "#C4567",
    image: "/productImage/Bowling_SS_Bag.png",
    myBid: 8500,
    isHighest: true,
    status: "Winning",
    time: "2 hr ago",
  },
];

const wonBids: BidItem[] = [
  {
    id: 10,
    title: "Vintage Leather Jacket",
    lot: "#C4567",
    image: "/productImage/Bowling_SS_Bag.png",
    myBid: 8500,
    isHighest: true,
    status: "Winner",
    time: "2 hr ago",
    finalAmount: 8500,
  },
  {
    id: 11,
    title: "Vintage Leather Jacket",
    lot: "#C4567",
    image: "/productImage/Bowling_SS_Bag.png",
    myBid: 8500,
    isHighest: true,
    status: "Winner",
    time: "2 hr ago",
    finalAmount: 8500,
  },
];

const lostBids: BidItem[] = [
  {
    id: 20,
    title: "Vintage Leather Jacket",
    lot: "#C4567",
    image: "/productImage/Bowling_SS_Bag.png",
    myBid: 8500,
    isHighest: false,
    status: "Lost",
    time: "2 hr ago",
  },
];

const MyBidsContent = () => {
  const [activeTab, setActiveTab] = useState<BidTab>("active");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8;

  const bidsMap: Record<BidTab, BidItem[]> = {
    active: activeBids,
    won: wonBids,
    lost: lostBids,
  };

  const currentBids = bidsMap[activeTab];

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
      <BidsTabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Items */}
      <div className="bg-white border border-gray-100 rounded-xl mt-6 px-4 sm:px-6">
        <div className="py-4 border-b border-gray-200">
          <h3 className="text-sm sm:text-base font-semibold text-primary">
            Items
          </h3>
        </div>

        {currentBids.length > 0 ? (
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
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default MyBidsContent;
