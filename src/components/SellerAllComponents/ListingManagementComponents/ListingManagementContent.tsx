/** @format */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import ListingTabBar from "./ListingTabBar";
import ListingCard, { Listing } from "./ListingCard";

type TabType = "timed" | "live" | "sold" | "draft";

const demoListings: Listing[] = Array.from({ length: 8 }, (_, i) => ({
  id: `C${4567 + i}`,
  title: "Bowling SS Bag",
  image: "/productImage/Bowling_SS_Bag.png",
  timeLeft: "00d:12h:29 sec left",
  startingPrice: 48,
  bids: 18,
  highestBid: 370,
  status: i < 5 ? "timed" : i < 6 ? "live" : i < 7 ? "sold" : "draft",
}));

const tabs: { label: string; value: TabType; count: number }[] = [
  { label: "TIMED AUCTION", value: "timed", count: 13 },
  { label: "LIVE AUCTION", value: "live", count: 2 },
  { label: "SOLD", value: "sold", count: 12 },
  { label: "DRAFT", value: "draft", count: 0 },
];

const ListingManagementContent = () => {
  const [activeTab, setActiveTab] = useState<TabType>("timed");

  const filteredListings = demoListings.filter((l) => l.status === activeTab);

  return (
    <div className="w-full px-2 md:px-4 xl:px-6 mb-12 ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary font-serif italic">
            Listing Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage all your auction items and listings
          </p>
        </div>
        <Link
          href="/create-lot"
          className="flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3 px-6 rounded-md hover:bg-primary/90 transition self-start"
        >
          + CREATE NEW LISTING
        </Link>
      </div>

      {/* Tabs */}
      <ListingTabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          No listings found in this category.
        </div>
      )}
    </div>
  );
};

export default ListingManagementContent;
