/** @format */
import React from "react";
import Image from "next/image";
import { CalendarDays, Video } from "lucide-react";

interface LiveAuction {
  id: number;
  title: string;
  image: string;
  date: string;
}

const demoAuctions: LiveAuction[] = [
  {
    id: 1,
    title: "VINTAGE LEATHER JACKET",
    image: "/productImage/Bowling_SS_Bag.png",
    date: "Starts on Aug 28, 2025 at 9:00 PM (GTM+6)",
  },
  {
    id: 2,
    title: "VINTAGE LEATHER JACKET",
    image: "/productImage/Bowling_SS_Bag.png",
    date: "Starts on Aug 28, 2025 at 9:00 PM (GTM+6)",
  },
];

const LiveAuctionStartingSoon = () => {
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
        {demoAuctions.map((auction) => (
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
