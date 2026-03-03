/** @format */
"use client";

import React from "react";
import { Clock } from "lucide-react";
import ParticipantsTable from "./ParticipantsTable";

const demoParticipants = Array.from({ length: 7 }, () => ({
  name: "Guy Hawkins",
  avatar: "/productImage/Bowling_SS_Bag.png",
  bid: 8250,
}));

interface ListingDetailContentProps {
  listingId: string;
}

const ListingDetailContent = ({ listingId }: ListingDetailContentProps) => {
  return (
    <div className="w-full px-2 md:px-4 xl:px-6 mb-12">
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
        <ParticipantsTable participants={demoParticipants} />
      </div>
    </div>
  );
};

export default ListingDetailContent;
