"use client";

import React, { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { fetchOverview } from "@/redux/feature/overviewSlice";
import OverviewStatsCards from "./OverviewStatsCards";
import InspiredByBids from "./InspiredByBids";
import LiveAuctionStartingSoon from "./LiveAuctionStartingSoon";
import OverviewRecentActivity from "./OverviewRecentActivity";

const OverviewContent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOverview());
  }, [dispatch]);

  return (
    <div className="w-full px-2 md:px-4 xl:px-6 mb-12">
      <OverviewStatsCards />
      <InspiredByBids />

      {/* Bottom Grid: Live Auction + Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <LiveAuctionStartingSoon />
        <OverviewRecentActivity />
      </div>
    </div>
  );
};

export default OverviewContent;
