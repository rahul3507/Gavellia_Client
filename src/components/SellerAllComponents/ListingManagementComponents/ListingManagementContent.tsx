"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchListings } from "@/redux/feature/listingsSlice";
import ListingTabBar from "./ListingTabBar";
import ListingCard from "./ListingCard";
import { ListingTabType } from "@/types/allTypes";

const tabs: { label: string; value: ListingTabType }[] = [
  { label: "TIMED AUCTION", value: "timed" },
  { label: "LIVE AUCTION", value: "live" },
  { label: "SOLD", value: "sold" },
  { label: "DRAFT", value: "draft" },
];

const ListingManagementContent = () => {
  const dispatch = useAppDispatch();
  const { listings, tabCounts, loading } = useAppSelector(
    (state) => state.listings
  );

  const [activeTab, setActiveTab] = useState<ListingTabType>("timed");

  useEffect(() => {
    dispatch(fetchListings({ tab: activeTab }));
  }, [dispatch, activeTab]);

  const handleTabChange = (tab: ListingTabType) => {
    setActiveTab(tab);
  };

  const tabsWithCount = tabs.map((tab) => ({
    ...tab,
    count: tabCounts[tab.value],
  }));

  return (
    <div className="w-full px-2 md:px-4 xl:px-6 mb-12">
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
        tabs={tabsWithCount}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Listings Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-card-bg rounded-xl overflow-hidden animate-pulse">
              <div className="aspect-square bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-3 w-1/2 bg-gray-200 rounded" />
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-3 bg-gray-200 rounded" />
                  <div className="h-3 bg-gray-200 rounded" />
                  <div className="h-3 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          {listings.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              No listings found in this category.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ListingManagementContent;
