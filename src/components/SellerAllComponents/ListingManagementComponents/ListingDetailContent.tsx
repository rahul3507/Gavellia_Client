/** @format */
"use client";

import React from "react";
import { Clock } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Participant {
  name: string;
  avatar: string;
  bid: number;
}

const demoParticipants: Participant[] = Array.from({ length: 7 }, () => ({
  name: "Guy Hawkins",
  avatar: "/productImage/Bowling_SS_Bag.png",
  bid: 8250,
}));

interface ListingDetailContentProps {
  listingId: string;
}

const ListingDetailContent = ({ listingId }: ListingDetailContentProps) => {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 ">
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-8 border-b border-gray-100">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary font-serif">
            Item Title
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Lot #{listingId}</p>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-3">
            <Clock className="w-4 h-4" />
            00d:12h:29 sec left
          </div>
        </div>

        {/* Participants Table */}
        <div className="p-5 sm:p-8">
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-4 pb-3 border-b border-gray-200 mb-2">
            <span className="text-sm font-semibold text-primary">
              Participants ({demoParticipants.length})
            </span>
            <span className="text-sm font-semibold text-primary">Bids</span>
            <span className="text-sm font-semibold text-primary text-right">
              Action
            </span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-100">
            {demoParticipants.map((participant, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 items-center py-4"
              >
                {/* Name + Avatar */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0">
                    <Image
                      src={participant.avatar}
                      alt={participant.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm text-primary truncate">
                    {participant.name}
                  </span>
                </div>

                {/* Bid */}
                <span className="text-sm text-primary">
                  £ {participant.bid.toLocaleString()}
                </span>

                {/* Action */}
                <div className="flex justify-end">
                  <Button
                    className={`text-xs font-semibold px-4 py-2 rounded-sm cursor-pointer ${
                      index === 0
                        ? "bg-primary text-white hover:bg-primary/90"
                        : "bg-gray-200 text-muted-foreground hover:bg-gray-300"
                    }`}
                  >
                    DECLARE WINNER
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailContent;
