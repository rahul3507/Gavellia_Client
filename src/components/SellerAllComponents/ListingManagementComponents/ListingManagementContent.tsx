/** @format */
"use client";

import React, { useState } from "react";
import { Clock, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type TabType = "timed" | "live" | "sold" | "draft";

interface Listing {
  id: string;
  title: string;
  image: string;
  timeLeft: string;
  startingPrice: number;
  bids: number;
  highestBid: number;
  status: TabType;
}

const demoListings: Listing[] = Array.from({ length: 8 }, (_, i) => ({
  id: `C${4567 + i}`,
  title: "Bowling SS Bag",
  image: "/productImage/Bowling_SS_Bag.png",
  timeLeft: "00d:12h:29 sec left",
  startingPrice: 48,
  bids: 18,
  highestBid: 370,
  status: i < 4 ? "timed" : i < 6 ? "live" : i < 7 ? "sold" : "draft",
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
    <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary font-serif">
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
      <div className="flex flex-wrap gap-0 border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
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

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredListings.map((listing) => (
          <Link
            key={listing.id}
            href={`/listing-management/${listing.id}`}
            className="bg-card-bg rounded-xl overflow-hidden hover:shadow-md transition group"
          >
            {/* Image */}
            <div className="relative aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
              <Image
                src={listing.image}
                alt={listing.title}
                width={300}
                height={300}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform"
              />
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="text-sm font-bold text-primary uppercase">
                {listing.title}
              </h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Clock className="w-3 h-3" />
                {listing.timeLeft}
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                <div>
                  <p className="text-muted-foreground">Starting</p>
                  <p className="font-semibold text-primary">
                    £{listing.startingPrice}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Bids</p>
                  <p className="font-semibold text-primary">
                    {listing.bids} bidder
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Highest bid</p>
                  <p className="font-semibold text-primary">
                    £{listing.highestBid}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-200">
                <button className="text-xs font-bold text-primary hover:underline uppercase cursor-pointer">
                  Promote
                </button>
                <button className="text-xs font-bold text-primary hover:underline uppercase cursor-pointer">
                  Edit
                </button>
                <button className="text-xs font-bold text-red-500 hover:underline uppercase cursor-pointer">
                  Delete
                </button>
              </div>
            </div>
          </Link>
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
