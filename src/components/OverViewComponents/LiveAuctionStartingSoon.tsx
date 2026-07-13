"use client";

import React from "react";
import Image from "next/image";
import { CalendarDays, Video } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

const LiveAuctionStartingSoon = () => {
  const { liveAuctionStartingSoon, loading } = useAppSelector((state) => state.overview);

  if (loading) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 w-48 bg-gray-200 rounded" />
          <div className="h-4 w-12 bg-gray-200 rounded" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gray-200" />
              <div className="space-y-2 flex-1">
                <div className="h-3 w-16 bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-3 w-1/2 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-primary">
          Live Auction Starting Soon
        </h3>
        <div className="flex items-center gap-1.5 text-red-500 text-xs font-semibold">
          <Video className="w-4 h-4" />
          LIVE
        </div>
      </div>

      <div className="space-y-4">
        {liveAuctionStartingSoon.map((auction) => (
          <div key={auction.id} className="flex items-center gap-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
              <Image
                src={auction.image}
                alt={auction.title}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-xs font-medium px-1.5 py-0.5 rounded bg-gray-100 text-muted-foreground">
                Upcoming
              </span>
              <h4 className="text-sm font-bold text-primary mt-1 truncate">
                {auction.title}
              </h4>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <CalendarDays className="w-3 h-3 shrink-0" />
                <span className="truncate">{auction.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveAuctionStartingSoon;
